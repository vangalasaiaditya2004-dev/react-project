import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Signup.css'

function Signup() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    fullName: '',
    username: '',
    password: '',
  })

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  }

  function handleSubmit(event) {
    event.preventDefault()

    localStorage.setItem('signupData', JSON.stringify(formData))
    alert('Signup successful')
    navigate('/login')
  }

  return (
    <section className="signup-page">
      <div className="signup-box">
        <h1>Instagram Signup</h1>
        <p>Create your account</p>

        <form className="signup-form" onSubmit={handleSubmit}>
          <label>Mobile Number or Email</label>
          <input
            type="text"
            name="emailOrPhone"
            value={formData.emailOrPhone}
            onChange={handleChange}
          />

          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />

          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />

          <button type="submit">Sign Up</button>
        </form>

        <p className="bottom-text">
          Already have an account?{' '}
          <button
            type="button"
            className="link-button"
            onClick={() => navigate('/login')}
          >
            Log in
          </button>
        </p>
      </div>
    </section>
  )
}

export default Signup
