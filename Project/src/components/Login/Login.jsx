import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'

function Login() {
  const navigate = useNavigate()
  const [loginData, setLoginData] = useState({
    userInput: '',
    password: '',
  })
  const [error, setError] = useState('')

  function handleChange(event) {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value,
    })
  }

  function handleSubmit(event) {
    event.preventDefault()

    const savedData = JSON.parse(localStorage.getItem('signupData'))

    if (!savedData) {
      setError('Please sign up first')
      return
    }

    const userMatched =
      loginData.userInput === savedData.emailOrPhone ||
      loginData.userInput === savedData.username

    const passwordMatched = loginData.password === savedData.password

    if (userMatched && passwordMatched) {
      localStorage.setItem('isLoggedIn', 'true')
      navigate('/home')
    } else {
      setError('Invalid login details')
    }
  }

  return (
    <section className="login-page">
      <div className="login-panel">
        <div className="login-card">
          <h1 className="login-logo">Instagram</h1>

          <form className="login-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="userInput"
              placeholder="Phone number, username, or email"
              value={loginData.userInput}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={handleChange}
            />
            <button type="submit">Log in</button>
          </form>

          {error && <p className="error-text">{error}</p>}

          <button
            type="button"
            className="forgot-link-button"
            onClick={() => navigate('/forgot-password')}
          >
            Forgot password?
          </button>
        </div>

        <div className="signup-card">
          <p>
            Don&apos;t have an account?{' '}
            <button
              type="button"
              className="login-link-button"
              onClick={() => navigate('/signup')}
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </section>
  )
}

export default Login
