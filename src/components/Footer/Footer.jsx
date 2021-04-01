import "./Footer.css";

import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import Notifications from "../Notifications/Notifications";
// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

function Footer() {
  return (
    <footer>
      <Notifications />
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
    </footer>
  );
}

export default Footer;
