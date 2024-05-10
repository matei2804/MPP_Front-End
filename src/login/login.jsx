import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './login.css';
import Button from 'react-bootstrap/Button';

const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const navigate = useNavigate()

  const onLoginButtonClick = async () => { 
    try {

      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      if (!response.ok) {
        throw new Error('Invalid login credentials');
      }

      const data = await response.json();
 
      const token = data.token;
      localStorage.setItem('jwtToken', token);
  

      navigate("/home");
  
    } catch (err) {
      setEmailError('Invalid login credentials. Please try again.');
      setPasswordError('Invalid login credentials. Please try again.');
    }
  }

  const onRegisterButtonClick = () => {
    navigate("/addUser");
  }
  

  return (
    <div className={'mainContainer'}>
      <div className={'titleContainer'}>
        <div>Login</div>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => setEmail(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className={'inputBox'}
          type="password"
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <div className ={'buttons-container'}>
            <Button onClick={onLoginButtonClick} variant="primary">Log in</Button>
            <Button onClick={onRegisterButtonClick} variant="primary">Register</Button>
        </div>
      </div>
    </div>
  )
}

export default Login