import { useState, useRef, useEffect } from "react";
import { Element, animateScroll as scroll } from "react-scroll";

import handsIn from "../LandingPage/handsIn.JPG";
import groupPicture2 from "../LandingPage/groupPicture2.jpg";
import LogoPrimary from "./Logo_Primary.png";

import { useMediaQuery, Button } from "@material-ui/core";

import "./LandingPage.css";

function LandingPage() {
  const mobileView = useMediaQuery("(max-width:950px)");
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
    <div id="landing-container">
      <div id="welcome-background">
        {mobileView && (
          <img src={LogoPrimary} style={{ margin: "1rem 0rem" }} />
        )}
        <Element name="welcome">
          <div
            ref={welcomeRef}
            id="welcome-div"
            className={
              !mobileView
                ? `fade-in-section ${welcomeIsVisible ? "is-visible" : ""}`
                : ""
            }
          >
            <div className="landing-content" id="welcome-content">
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
      <Element name="aboutapp">
        <div id="about-background">
          <div className="landing-content">
            <h2>About This App</h2>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                margin: "0 1rem",
                flexDirection: `${mobileView ? "column-reverse" : ""}`,
              }}
            >
              <div>
                <img
                  src={handsIn}
                  style={{ width: "25rem", borderRadius: 10, margin: "1em 0" }}
                />
              </div>
              <div id="about-content">
                <p>
                  This is the "Family Connections" application, a resource meant
                  to connect those who have experienced the loss of a child.
                  Family Connections is meant to be a more private, safe space
                  compared to traditional outlets of communication.
                </p>
                <p>
                  This application can also help you stay connected to us!
                  Events that we host for our amazing community are all
                  available here in a convenient events calendar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Element>
      <Element name="learnmore">
        <div className="landing-content">
          <h2>Learn More</h2>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              margin: "0 1rem",
              flexDirection: `${mobileView ? "column" : ""}`,
            }}
          >
            <div id="learn-content">
              <p>
                If you would like to learn more about who we are and what our
                mission is at Hopeful Heart Project please click below to view
                our main page!
              </p>
              <Button
                color="primary"
                variant="contained"
                component="a"
                href="https://www.hopefulheartproject.org/"
              >
                Learn More
              </Button>
            </div>
            <div>
              <img
                src={groupPicture2}
                style={{ width: "25rem", borderRadius: 10, margin: "1em 0" }}
              />
            </div>
          </div>
          <div>
            <br />
            <Button color='primary' onClick={() => scroll.scrollToTop()}>Back to Top</Button>
            <br />
            <br />
          </div>
        </div>
      </Element>
    </div>
  );
}

export default LandingPage;
