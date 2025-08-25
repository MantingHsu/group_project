// client/src/pages/Registration.jsx
import { useState } from "react";
import { api } from "../lib/api";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [msg, setMsg] = useState("");

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const { data } = await api.post("/api/register", form);
      setMsg(`Registered! User ID: ${data.userId}`);
      // optional: clear inputs after success
      // setForm({ username: "", email: "", password: "" });
    } catch (err) {
      setMsg(err?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <section id="contact" className="form-wrap">
      <h1>Create account</h1>

      <form onSubmit={onSubmit} className="form-card" noValidate>
        {/* Username */}
        <div className="form-row">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            value={form.username}
            onChange={onChange}
            required
            autoComplete="username"
            placeholder="e.g. pawfan123"
          />
        </div>

        {/* Email */}
        <div className="form-row">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            required
            autoComplete="email"
            placeholder="you@example.com"
            inputMode="email"
          />
        </div>

        {/* Password */}
        <div className="form-row">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={form.password}
            onChange={onChange}
            required
            autoComplete="new-password"
            placeholder="8+ characters"
            minLength={8}
          />
        </div>

        <button type="submit" className="btn-primary">Sign up</button>

        {!!msg && <p className="form-message" role="status">{msg}</p>}
      </form>
    </section>
  );
}
