import { useState, useRef, useEffect } from "react";
import { Element } from "react-scroll";

import handsIn from "../LandingPage/handsIn.JPG";
import groupPicture2 from "../LandingPage/groupPicture2.jpg";
import logoPrimary from "./Logo_Primary.png";

import "./LandingPage.css";

function LandingPage() {
  const [welcomeIsVisible, setWelcomeVisible] = useState(false);
  const welcomeRef = useRef();

  useEffect(() => {
    const welcomeObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => setWelcomeVisible(entry.isIntersecting));
    });
    welcomeObserver.observe(welcomeRef.current);
    return () =>
      welcomeRef.current && welcomeObserver.unobserve(welcomeRef.current);
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <div id="welcome-background">
        <Element name="welcome">
          <div
            ref={welcomeRef}
            id="welcome-div"
            className={`fade-in-section ${
              welcomeIsVisible ? "is-visible" : ""
            }`}
          >
            <div id="welcome-content">
              <h2>Welcome</h2>
              <p>
                Welcome to Hopeful Heart Project, a non-profit organization
                dedicated to providing hope, healing, and support to parents who
                have endured the tremendous loss of a child.
              </p>
              <p>
                In honor of the children we have lost, it is our mission to
                ensure no parent must walk this path alone. We strive to educate
                families in their options, provide them with the resources and
                comfort they may need, and create events centered around
                self-care and healing.
              </p>
              <p>
                Please do not hesitate to connect with us. We all have a story
                to be told, and we are longing to hear yours. Sending love from
                two mamas to another.
              </p>
            </div>
          </div>
        </Element>
      </div>
      <br />
      <Element name="aboutapp">
        <h2>About This App</h2>
        <p>
          This is the "Family Connections" application, an application meant to
          connect those who have experienced the loss of a child. We all know
          that this experience is difficult to go through alone, but it can also
          be hard to stay connected with those we love. Family Connections is
          meant to help with that, connecting you to others going through a
          similar as you. This application can also help you stay connected to
          us! Events that we host for our amazing community are all available
          here in a convenient calendar view.
        </p>
        {/* <img src={handsIn} /> */}
      </Element>
      <br />
      <Element name="learnmore">
        <h2>Learn More</h2>
        <p>
          If you would like to learn more about who we are and what our mission
          is here at Hopeful Heart Project please click below to view our main
          page!
        </p>
        {/* <img src={groupPicture2} /> */}
        <form action="https://www.hopefulheartproject.org/">
          <button
            style={{
              width: 100,
              height: 30,
              backgroundColor: "#414042",
              color: "white",
              borderRadius: 4,
            }}
            type="submit"
          >
            Learn More
          </button>
        </form>
      </Element>
    </div>
  );
}

export default LandingPage;
