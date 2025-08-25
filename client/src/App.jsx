// client/src/App.jsx
import { NavLink, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Gallery from "./pages/Gallery.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Registration from "./pages/Registration.jsx";
import Footer from "./components/Footer.jsx";
import "./App.scss";

export default function App() {
  return (
    <div id="container">
      {/* Hero header (background set in App.scss) */}
      <header>
        <div className="main-header">
          <div className="logo" aria-label="Pawfect Match">
            {/* Image lives in client/public/images */}
            <img src="/images/pawfect_match.png" alt="Pawfect Match" />
          </div>

          <nav className="main-menu" aria-label="Main Navigation">
            <ul>
              <li>
                <NavLink to="/" end>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/gallery">Gallery</NavLink>
              </li>
              <li>
                <NavLink to="/about">About</NavLink>
              </li>
              <li>
               <NavLink to="/contact">Contact</NavLink>
              </li>
              <li>
                <NavLink to="/registration">Register</NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Page content */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/registration" element={<Registration />} />
        </Routes>
        
      </main>

      {/* Sticky footer component */}
      <Footer />
    </div>
  );
}
