import React from "react"
import "./footer.css"
function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p>SANSKAR VARMA (CSE UNDERGRAD@BITP) ⓒ {year}</p>
    </footer>
  );
}

export default Footer;