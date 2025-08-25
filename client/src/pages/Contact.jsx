import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    petType: "",
    contactMethod: "Email",
    reason: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // same behavior you had: simple “thank you” alert
    alert(`Thank you for contacting us, ${form.name || "friend"}!`);
    // optionally clear:
    // setForm({ name:"", email:"", phone:"", petType:"", contactMethod:"Email", reason:"" })
  };

  return (
    <section id="contact" className="contact-wrap">
      <div className="contact-card">
        <h1>Get in Touch With Us</h1>
        <p className="lead">
          We're here to help you find your perfect pet companion! If you have any
          questions about our adoption process, available pets, or upcoming events,
          don't hesitate to reach out.
        </p>

        <form className="contact-form" onSubmit={onSubmit} noValidate>
          <fieldset style={{ border: "none", padding: 0, margin: 0 }}>
            <legend className="sr-only">User Personal Information</legend>

            <div className="form-row">
              <label htmlFor="name">Enter your full name:</label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={onChange}
                placeholder="Your full name"
                required
              />
            </div>

            <div className="form-row">
              <label htmlFor="email">Enter your email:</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="form-row">
              <label htmlFor="phone">Enter your phone:</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={onChange}
                placeholder="(555) 555-5555"
              />
            </div>

            <div className="form-row">
              <label>Select Pet Types</label>
              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                <label>
                  <input
                    type="radio"
                    name="petType"
                    value="Dogs"
                    checked={form.petType === "Dogs"}
                    onChange={onChange}
                  />{" "}
                  Dogs
                </label>
                <label>
                  <input
                    type="radio"
                    name="petType"
                    value="Cats"
                    checked={form.petType === "Cats"}
                    onChange={onChange}
                  />{" "}
                  Cats
                </label>
                <label>
                  <input
                    type="radio"
                    name="petType"
                    value="Others"
                    checked={form.petType === "Others"}
                    onChange={onChange}
                  />{" "}
                  Others
                </label>
              </div>
            </div>

            <div className="form-row">
              <label htmlFor="contactMethod">How should we contact you?</label>
              <select
                id="contactMethod"
                name="contactMethod"
                value={form.contactMethod}
                onChange={onChange}
              >
                <option value="Email">Email</option>
                <option value="Phone">Phone</option>
              </select>
            </div>

            <div className="form-row">
              <label htmlFor="reason">Tell us the reason of your visit today:</label>
              <textarea
                id="reason"
                name="reason"
                rows="5"
                value={form.reason}
                onChange={onChange}
                placeholder="Write your message..."
                required
              />
            </div>

            <button type="submit" className="btn-primary">Submit</button>
          </fieldset>
        </form>
      </div>
    </section>
  );
}
