import { useState } from 'react'
import { api } from '../lib/api'

export default function Login(){
  const [form, setForm] = useState({ email:'', password:'' })
  const [msg, setMsg] = useState('')

  const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = async e => {
    e.preventDefault()
    try {
      const { data } = await api.post('/api/login', form)
      setMsg(`Welcome! User ID: ${data.userId}`)
    } catch (err) {
      setMsg(err?.response?.data?.message || 'Login failed')
    }
  }

  return (
    <section style={{maxWidth:'520px', margin:'2rem auto'}}>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <label>Email<input type="email" name="email" value={form.email} onChange={onChange} required/></label>
        <label>Password<input type="password" name="password" value={form.password} onChange={onChange} required/></label>
        <button type="submit">Login</button>
      </form>
      {!!msg && <p style={{marginTop:'1rem'}}>{msg}</p>}
    </section>
  )
}
