import React, { useEffect } from "react";
import "./styles.css"; // Import your styles
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  useEffect(() => {
    // Cursor and blur elements
    const crsr = document.querySelector("#cursor");
    const blr = document.querySelector("#blur");

    // Mousemove animations
    document.addEventListener("mousemove", (dets) => {
      gsap.to(crsr, {
        x: dets.clientX,
        y: dets.clientY,
        duration: 0.8,
      });
      gsap.to(blr, {
        x: dets.clientX,
        y: dets.clientY,
        duration: 1,
        delay: 0.3,
      });
      gsap.to("#colon-div h2", {
        transform: `translate(${-dets.clientX * 0.02}px, ${-dets.clientY * 0.02}px)`,
        duration: 0.5,
      });
    });

    // Navbar background animation
    gsap.to("#nav", {
      backgroundColor: "#000",
      height: "13vh",
      duration: 0.5,
      delay: 0.5,
      scrollTrigger: {
        trigger: "#nav",
        scroller: "body",
        scrub: 1,
        start: "top -20%",
        end: "top -11%",
      },
    });

    // Main section background animation
    gsap.to("#main", {
      backgroundColor: "#000",
      scrollTrigger: {
        trigger: "#main",
        scroller: "body",
        scrub: 1,
        start: "top -30%",
        end: "top -80%",
      },
    });

    // Top colon animation
    gsap.to("#top-colon", {
      top: "10px",
      left: "100px",
      scrollTrigger: {
        trigger: "#top-colon",
        scroller: "body",
        scrub: 1,
        start: "top 70%",
        end: "center center",
      },
    });

    // Bottom colon animation
    gsap.to("#bottom-colon", {
      bottom: "10px",
      right: "120px",
      scrollTrigger: {
        trigger: "#bottom-colon",
        scroller: "body",
        scrub: 1,
        start: "top 100%",
        end: "top 80%",
      },
    });
  }, []);

  return (
    <div>
      {/* Navbar */}
      <div id="nav">
        <img
          src="nothing-logo-white-removebg-preview.png"
          alt="Nothing Logo"
        />
        <div id="menu">
          <h3>NOTHING</h3>
        </div>
        <div id="header_buttons">
          <button>GET STARTED</button>
        </div>
      </div>

      {/* Cursor and Blur Effects */}
      <div id="cursor"></div>
      <div id="blur"></div>

      {/* Main Section */}
      <div id="main">
        {/* Page 1 */}
        <div id="page1">
          <h1>LEARN.CONNECT.INNOVATE</h1>
          <h2>WELCOME TO THE NOTHING APP</h2>
          <p>
            Connect with your classmates, exchange notes, and engage in scholarly
            banter without the hassle of multiple messaging apps.
          </p>
        </div>

        {/* Page 2 */}
        <div id="page2">
          <div id="scroller">
            <div className="scroller-in">
              <h4>LEARN</h4>
              <h4>CONNECT</h4>
              <h4>INNOVATE</h4>
            </div>
            <div className="scroller-in">
              <h4>LEARN</h4>
              <h4>CONNECT</h4>
              <h4>INNOVATE</h4>
            </div>
          </div>
          <div id="about-us">
            <img
              src="https://eiwgew27fhz.exactdn.com/wp-content/uploads/2023/02/home-about-1.jpg?strip=all&lossy=1&sharp=1&w=384&ssl=1"
              alt=""
            />
            <div id="content">
              <h3>ABOUT NOTHING</h3>
              <p>
                Where the absence of complications meets the presence of
                everything. Because who needs a variety of platforms when you can
                have NOTHING? Join the revolution; because in this space, NOTHING
                means everything you need for academic success. Don't just do
                something, do NOTHING!
              </p>
            </div>
            <img
              src="https://eiwgew27fhz.exactdn.com/wp-content/uploads/2023/02/home-about-2.jpg?strip=all&lossy=1&sharp=1&w=384&ssl=1"
              alt=""
            />
          </div>
        </div>

        {/* Page 3 */}
        <div id="page3">
          <div id="cards-container">
            <Card
              id="card1"
              image="https://imgs.search.brave.com/ckfAPmfi7FdofD5ar7RNWojRTVBzTmqu31G5KIVoRBQ/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAzLzA3LzI5LzI5/LzM2MF9GXzMwNzI5/Mjk1Ml9qT1lqelN2/ZjNpaFZ1cVMyWlpi/NHRtSjh5SkJ1QjNt/ay5qcGc"
              title="TEXT"
              description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo recusandae neque repudiandae nostrum sed? Et cumque aliquid ullam odit quidem vero harum accusamus, deserunt non! Dicta est a ipsum. Repellat."
            />
            <Card
              id="card2"
              image="https://imgs.search.brave.com/jMRHW7uLDlZKPJxhXGcuovZwRk-vo36LCSKXgr7a3L8/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/YWdvcmEuaW8vZW4v/d3AtY29udGVudC91/cGxvYWRzLzIwMjMv/MDYvY3VzdG9taXpl/ZC1saXZlLXZvaWNl/LWNoYXQtMTMwMHg4/MDYtMS53ZWJw"
              title="AUDIO"
              description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro ipsum provident hic minus facere veritatis, fuga numquam nostrum voluptatum assumenda dolorum quos non modi nemo distinctio dicta! Quo, sunt repellendus!"
            />
            <Card
              id="card3"
              image="https://imgs.search.brave.com/H0bYTU71bU1yvtZP-VjMoE8Tewzl60EHc75IpFQV3uA/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9yZW1vdGUtY29t/bXVuaWNhdGlvbi1i/bGFjay13b21hbi1t/YWtpbmctdmlkZW8t/Y2FsbC13aXRoLWJv/e..."
              title="VIDEO"
              description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo recusandae neque repudiandae nostrum sed? Et cumque aliquid ullam odit quidem vero harum accusamus, deserunt non! Dicta est a ipsum. Repellat."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Card = ({ id, image, title, description }) => {
  return (
    <div className="card" id={id}>
      <img src={image} alt={title} />
      <div className="overlay">
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default HomePage;
