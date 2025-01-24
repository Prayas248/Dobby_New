import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import JoinRoom from './routes/joinRoom/JoinRoom';
import Room from "./routes/room/Room";
import SocketWrapper from "./components/SocketWrapper";
import RoomGet from "./routes/Video/Vi";
import HomePage from "./home/HomePage";
import { isMobile } from "react-device-detect";
import RestrictedAccess from "./routes/restrictedpage";
const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/join-room",
        element: isMobile ? <RestrictedAccess /> : <JoinRoom />,
    },
    {
        path: "/room/:roomId",
        element: <SocketWrapper><Room /></SocketWrapper>
    },
    {
        path: "/room/getit/:roomId",
        element: <SocketWrapper><RoomGet /></SocketWrapper>
    }
]);

function App() {
    return <RouterProvider router={router} />
}

export default App
