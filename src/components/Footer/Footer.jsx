import { useRouteMatch } from "react-router-dom";

import "./Footer.css";

import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

function Footer() {
  const routeMatch = useRouteMatch("/landing");

  return (
    <footer>
      <div id="hopeful-heart-footer-info">
        <a href="mailto:info@hopefulheartproject.org">
          info@hopefulheartproject.org
        </a>
        <div id="hopeful-heart-links">
          <a
            href="https://www.facebook.com/hopefulheartproject/"
            target="_blank"
          >
            <FacebookIcon />
          </a>
          <a
            href="https://www.instagram.com/hopefulheartproject/"
            target="_blank"
          >
            <InstagramIcon />
          </a>
        </div>
      </div>
      <div id='eda-footer-info'>
        <p style={{ margin: 0 }}>
          Powered By{" "}
          <a href="https://www.emergingacademy.org/">
            Emerging Digital Academy
          </a>
        </p>
        {routeMatch && (
          <div id="linkedin-footer-links-wrapper">
            <a
              href="https://www.linkedin.com/in/bryce-barsness-b70068207/"
              target="_blank"
            >
              linkedin.com/in/bryce-barsness-b70068207
            </a>
            <a
              href="https://www.linkedin.com/in/masonleonhart/"
              target="_blank"
            >
              linkedin.com/in/masonleonhart
            </a>
            <a
              href="https://www.linkedin.com/in/quinnjohnsonfargo/"
              target="_blank"
            >
              linkedin.com/in/quinnjohnsonfargo
            </a>
            <a
              href="https://www.linkedin.com/in/treolsonfargo/"
              target="_blank"
            >
              linkedin.com/in/treolsonfargo
            </a>
          </div>
        )}
      </div>
    </footer>
  );
}

export default Footer;
