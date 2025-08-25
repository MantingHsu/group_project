// client/src/components/Footer.jsx
import { FaTwitter, FaInstagram, FaFacebook } from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-left">
        <p>© {year} Pawfect Match</p>
      </div>

      <div className="footer-center">
        <p>For educational purposes only.</p>
      </div>

      <div className="footer-right">
        <span className="follow-label">Follow</span>
        <div className="social-icons">
          <a href="#" aria-label="Twitter">
            <FaTwitter />
          </a>
          <a href="#" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="#" aria-label="Facebook">
            <FaFacebook />
          </a>
        </div>
      </div>
    </footer>
  );
}
