import React from "react";
import "./Footer.css";

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

function Footer() {
  return (
    <footer style={{fontFamily:"Avenir"}}>
      Powered By{" "}
      <a href="https://www.emergingacademy.org/">Emerging Digital Academy</a>
      <br />
      <div id="linkedin-footer-links-wrapper">
        <a
          href="https://www.linkedin.com/in/bryce-barsness-b70068207/"
          target="_blank"
        >
          linkedin.com/in/bryce-barsness-b70068207
        </a>
        <a href="https://www.linkedin.com/in/masonleonhart/" target="_blank">
          linkedin.com/in/masonleonhart
        </a>
        <a
          href="https://www.linkedin.com/in/quinnjohnsonfargo/"
          target="_blank"
        >
          linkedin.com/in/quinnjohnsonfargo
        </a>
        <a href="https://www.linkedin.com/in/treolsonfargo/" target="_blank">
          linkedin.com/in/treolsonfargo
        </a>
      </div>
    </footer>
  );
}

export default Footer;
