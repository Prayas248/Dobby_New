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
                <h1>TRUST.</h1>
                <h1>ACCURACY.</h1>
                <h1>INNOVATION.</h1>
            </div>
            <div id="fixed-image"></div>
            <div id="main">
                <div id="page1">
                    <nav>
                        <img src="/Dwight/src/images/pop-ups/dwight_logo_white.png" alt="Dwight Logo" />
                        <div className="nav-part2">
                            <h4><a href="#">About Us</a></h4>
                        </div>
                        <h3>Menu</h3>
                    </nav>
                    <div id="center">
                        <div id="left">
                            <h3>
                                Dwight ensures responsible use of Chatgpt through AI-powered monitoring, real-time risk detection, and compliance with regulations.
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
                                TRUST. <br /> ACCURACY. <br /> INNOVATION.
                            </h1>
                        </div>
                    </div>
                    <div id="hero-shape">
                        <div id="hero-1"></div>
                        <div id="hero-2"></div>
                        <div id="hero-3"></div>
                    </div>
                    <img
                        src="/Dwight/src/images/dwight_sample.png"
                        alt="Dwight Sample Screenshot"
                    />
                </div>
                <div id="page2">
                    <div id="moving-text">
                        {Array(3)
                            .fill(null)
                            .map((_, i) => (
                                <div className="con" key={i}>
                                    <h1>MONITORING</h1>
                                    <div id="gola"></div>
                                    <h1>NO RISK</h1>
                                    <div id="gola"></div>
                                    <h1>ENVIRONMENT</h1>
                                    <div id="gola"></div>
                                </div>
                            ))}
                    </div>
                    <div id="page2-bottom">
                        <h1>
                            We are a group of design-driven, goal-focused students, coders, and hackers who believe that the details make all the difference.
                        </h1>
                        <div id="bottom-part2">
                            <img
                                src="https://cdn.dribbble.com/users/410253/screenshots/16819588/media/d3848a3edbd12ba3107347ffb559e03d.png?resize=1000x750&vertical=center"
                                alt=""
                            />
                            <p>
                                We love to create, solve, collaborate, and turn amazing ideas into reality. We’re here to partner with you through every step of the process, knowing that relationships are the most important things we build.
                            </p>
                        </div>
                    </div>
                    <div id="gooey"></div>
                </div>
                <div id="page3">
                    <div id="elem-container">
                        {[{ id: 1, image: "", title: "Working" },
                        { id: 2, image: "", title: "IDE" },
                        { id: 3, image: "", title: "Conference" },
                        { id: 4, image: "", title: "Chat" }
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
                <h1>Dwight</h1>
                <div id="footer-bottom"></div>
            </div>
        </div>
    );
};

export default HomePage;
