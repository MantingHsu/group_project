export default function About() {
  return (
    <section id="about" className="about-wrap">
      <div className="about-card">
        <h1>About Pawfect Match</h1>
        <p className="lead">
          Pawfect Match connects loving families with adoptable pets. Our mission
          is to match animals in need with safe, happy, forever homes.
        </p>

        <div className="about-grid">
          <div className="about-item">
            <h3>What we do</h3>
            <p>
              We showcase adoptable pets and make it easy to learn about each one—
              personality, needs, and history—so you can find the perfect fit.
            </p>
          </div>
          <div className="about-item">
            <h3>How it works</h3>
            <ol>
              <li>Browse pets in the Gallery</li>
              <li>Review details & readiness</li>
              <li>Register to start adoption</li>
            </ol>
          </div>
          <div className="about-item">
            <h3>Our values</h3>
            <ul>
              <li>Animal wellbeing first</li>
              <li>Transparent, kind guidance</li>
              <li>Support for new pet parents</li>
            </ul>
          </div>
        </div>

        <p className="closing">
          Browse the gallery, learn about each pet, and register to start the adoption process.
        </p>
      </div>
    </section>
  );
}
