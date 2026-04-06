import { useNavigate } from 'react-router-dom'
import './ForgotPassword.css'

function ForgotPassword() {
  const navigate = useNavigate()

  return (
    <section className="forgot-page">
      <div className="forgot-box">
        <h1>Forgot Password</h1>
        <p>Enter your email or username to reset your password.</p>

        <form className="forgot-form">
          <label>Email or Username</label>
          <input type="text" />

          <button type="submit">Send Reset Link</button>
        </form>

        <button
          type="button"
          className="forgot-back-button"
          onClick={() => navigate('/login')}
        >
          Back to Login
        </button>
      </div>
    </section>
  )
}

export default ForgotPassword
