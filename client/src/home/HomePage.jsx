import React, { useEffect } from "react";
import LocomotiveScroll from "locomotive-scroll";
import "swiper/css";
import "swiper/css/navigation"; // For navigation module styles
import "locomotive-scroll/dist/locomotive-scroll.css";
import "./styles.css";
import { Link } from "react-router-dom";

const HomePage = () => {
    useEffect(() => {
        // Initialize Locomotive Scroll
        const scroll = new LocomotiveScroll({
            el: document.querySelector("#main"),
            smooth: true,
        });

        // Page 4 Animation
        const elemContainer = document.querySelector("#elem-container");
        const fixedImage = document.querySelector("#fixed-image");

        elemContainer.addEventListener("mouseenter", () => {
            fixedImage.style.display = "block";
        });

        elemContainer.addEventListener("mouseleave", () => {
            fixedImage.style.display = "none";
        });

        const elems = document.querySelectorAll(".elem");
        elems.forEach((e) => {
            e.addEventListener("mouseenter", () => {
                const image = e.getAttribute("data-image");
                fixedImage.style.backgroundImage = `url(${image})`;
            });
        });

        // Menu Animation
        const menu = document.querySelector("nav h3");
        const fullScreen = document.querySelector("#full-scr");
        const navImg = document.querySelector("nav img");
        let flag = 0;

        menu.addEventListener("click", () => {
            if (flag === 0) {
                fullScreen.style.top = 0;
                navImg.style.opacity = 0;
                flag = 1;
            } else {
                fullScreen.style.top = "-100%";
                navImg.style.opacity = 1;
                flag = 0;
            }
        });

        // Loader Animation
        const loader = document.querySelector("#loader");
        setTimeout(() => {
            loader.style.top = "-100%";
        }, 4200);

        return () => {
            scroll.destroy();
        };
    }, []);

    return (
        <div>
            <div id="loader">
                <h1>CREATIVITY.</h1>
                <h1>INNOVATION.</h1>
                <h1>COLLABORATION.</h1>
            </div>
            <div id="fixed-image"></div>
            <div id="main">
                <div id="page1">
                    <nav>
                        
                       {/* <div className="nav-part2">
                            <h4><a href="#">About Us</a></h4>
                        </div> */}
                        <h3>Menu</h3>
                    </nav>
                    <div id="center">
                        <div id="left">
                            <h3>
                                Dobby is a collaborative platform offering features like a code editor, video conferencing, a chat application, and a whiteboard with AI-driven suggestions to enhance productivity.
                            </h3>
                            <button className="main-button">
                                <h4>
                                    <Link to="/join-room">
                                        Proceed
                                    </Link>
                                </h4>
                            </button>   
                        </div>
                        <div id="right">
                            <h1>
                                INNOVATION <br /> COLLABORATION <br /> PRODUCTIVITY 
                            </h1>
                        </div>
                    </div>
                    <div id="hero-shape">
                        <div id="hero-1"></div>
                        <div id="hero-2"></div>
                        <div id="hero-3"></div>
                    </div>
                   
                </div>
                <div id="page2">
                    <div id="moving-text">
                        {Array(3)
                            .fill(null)
                            .map((_, i) => (
                                <div className="con" key={i}>
                                    <h1>CODE COLLABORATION</h1>
                                    <div id="gola"></div>
                                    <h1>REAL-TIME COMMUNICATION</h1>
                                    <div id="gola"></div>
                                    <h1>PRODUCTIVITY BOOST</h1>
                                    <div id="gola"></div>
                                </div>
                            ))}
                    </div>
                    <div id="page2-bottom">
                        <h1>
                            Dobby is designed to bring teams together, fostering collaboration and enhancing productivity. With real-time updates, AI-driven suggestions, and an easy-to-use interface, it's built for the future of work.
                        </h1>
                        <div id="bottom-part2">
                            <img
                                src="https://cdn.dribbble.com/users/410253/screenshots/16819588/media/d3848a3edbd12ba3107347ffb559e03d.png?resize=1000x750&vertical=center"
                                alt=""
                            />
                            <p>
                                At Dobby, we believe in the power of collaboration. Whether it's writing code, brainstorming ideas on a whiteboard, or staying connected through video calls, Dobby makes it all seamless and efficient.
                            </p>
                        </div>
                    </div>
                    <div id="gooey"></div>
                </div>
                <div id="page3">
                    <div id="elem-container">
                        {[{ id: 1, image: "", title: "Code Editor" },
                        { id: 2, image: "", title: "Video Conferencing" },
                        { id: 3, image: "", title: "Whiteboard" },
                        { id: 4, image: "", title: "AI Suggestions" }
                        ].map((elem) => (
                            <div className="elem" data-image={elem.image} key={elem.id}>
                                <div className="overlay"></div>
                                <h2>{elem.title}</h2>
                            </div>
                        ))}
                    </div>
                </div>

                <div id="page5"></div>
                <div id="full-scr">
                    <div id="full-div1"></div>
                </div>
            </div>
            <div id="footer">
                <div id="footer-div"></div>
                <h1>Dobby</h1>
                <div id="footer-bottom"></div>
            </div>
        </div>
    );
};

export default HomePage;
