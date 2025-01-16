import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import "./styles.css"

function addPropsToReactElement(element, props) {
    if (React.isValidElement(element)) {
        return React.cloneElement(element, props);
    }
    return element;
}

function addPropsToChildren(children, props) {
    if (!Array.isArray(children)) {
        return addPropsToReactElement(children, props);
    }
    return children.map(childElement => addPropsToReactElement(childElement, props));
}

// Backend URL https://dobby-new.onrender.com http://localhost:5000
const SOCKET_URL = process.env.REACT_APP_WEB_SOCKET_URL || "https://dobby-new.onrender.com";

// Singleton socket instance
let socket;

export default function SocketWrapper({ children }) {
    const [isConnected, setIsConnected] = useState(false); // Track socket connection
    const location = useLocation();
    const navigate = useNavigate();
    const { roomId } = useParams();

    useEffect(() => {
        // Initialize the socket only once
        if (!socket) {
            socket = io(SOCKET_URL, { autoConnect: false });
        }

        // Connect to the socket
        socket.connect();

        socket.on("connect", () => {
            setIsConnected(true); // Update state when connected
            console.log("Socket connected:", socket.id);
        });

        socket.on("connect_error", (error) => {
            setIsConnected(false);
            toast.error("Connection error. Please try again.");
            console.error("Socket connection error:", error);
        });

        return () => {
            socket.disconnect(); // Cleanup socket connection on unmount
        };
    }, []);

    useEffect(() => {
        function kickStrangerOut() {
            navigate("/join-room", { replace: true });
            toast.error("No username provided");
        }

        if (isConnected) {
            location.state && location.state.username
                ? socket.emit("when a user joins", { roomId, username: location.state.username })
                : kickStrangerOut();
        }
    }, [isConnected, location.state, roomId, navigate]);

    if (!isConnected) {
        // Show a loading spinner until the connection is established
        return (
            <div className="loading">
                <h2>Connecting to the server...</h2>
                <div className="spinner"></div> {/* Add your spinner styles */}
                <h3>It may take a while..</h3>
            </div>
        );
    }

    return location.state && location.state.username ? (
        <div>{addPropsToChildren(children, { socket, username: location.state.username })}</div>
    ) : (
        <div className="room">
            <h2>No username provided. Please use the form to join a room.</h2>
        </div>
    );
}
