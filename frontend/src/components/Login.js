import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaUser } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import SignUpComponent from './SignUp';
import { useNavigate } from 'react-router-dom';

const Message = ({ text }) => {
  if (!text) return null;
  return <p className="text-danger">{text}</p>;
};

const SignupForm = () => {
  const [formType, setFormType] = useState('username');
  const [showSignUp, setShowSignUp] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpEmail, setOtpEmail] = useState('');
  const [otpPhone, setOtpPhone] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  let response;

  const handleSendOtpPhone = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/login/phone', { mblnumber: phoneNumber });
      console.log(response.data);
      setMessage('OTP sent to phone number');
    } catch (error) {
      console.error('Error sending OTP to phone number', error);
      setMessage(error.response?.data?.msg || 'Failed to send OTP to phone number');
    }
  };

  const handleSendOtpEmail = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/login/mail', { email });
      console.log(response.data);
      setMessage('OTP sent to email');
    } catch (error) {
      console.error('Error sending OTP to email', error);
      setMessage(error.response?.data?.msg || 'Failed to send OTP to email');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear previous messages

    let data = {};
    if (formType === 'username') {
      data = { username, password };
      try {
         response = await axios.post('http://localhost:5000/api/users/login/username', data);
        if (response.data.status === "success" ) {
          console.log(response.data);
          const { token } = response.data;
          localStorage.setItem('authToken', token);
          console.log(1)
          navigate("/main");
        }else if(response.data.status === "success"){ setMessage(response?.data?.msg || 'Registration failed');
          console.log(message)}
      } catch (error) {
        setMessage(error.response?.data?.msg || 'Registration failed')
      
        console.log(message)
        console.error('Error during registration', error)}
       
      
    } else if (formType === 'email') {
      data = { mail: email, otp: otpEmail };
      try {
       response = await axios.post('http://localhost:5000/api/users/login/checkOtp', data);
       console.log(response)
        if (response.data.status === "success" ) {
          console.log(response.data);
          const { token } = response.data;
          localStorage.setItem('authToken', token);
          console.log("hi")
          navigate("/main");
        }else if (response.data.status === "fail"){  setMessage(response?.data?.msg || 'Registration failed');
          console.log(response)
          console.log(message)}
      } catch (error) {
        setMessage(error.response?.data?.msg || 'Registration failed')
      
        console.log(message)
        console.error('Error during registration', error);}
      
      
    } else if (formType === 'phone') {
      data = { phoneNumber, password, otp: otpPhone };
      try {
         response = await axios.post('http://localhost:5000/api/users/login/checkOtp', data);
        if (response.data.status ==="success" ) {
          console.log(response.data);
          const { token } = response.data;
          localStorage.setItem('authToken', token);
          console.log(1)
          navigate("/main");
        }else if(response.data.status ==="fail" ){setMessage(response?.data?.msg || 'Registration failed')
          console.log(1)
          console.log(message);}
      } catch (error) {
        setMessage(error.response?.data?.msg || 'Registration failed')
      
        console.log(message)
        console.error('Error during registration', error)
       ;}
       
     
    }else{
      navigate("/")
    }
  };

  return (
    <section>
      {showSignUp ? (
        <SignUpComponent setShowSignUp={setShowSignUp} />
      ) : (
        <div className="px-4 py-5 px-md-5 text-center text-lg-start" style={{ backgroundColor: 'hsl(0, 0%, 96%)' }}>
          <div className="container">
            <div className="row gx-lg-5 align-items-center">
              <div className="col-lg-6 mb-5 mb-lg-0">
                <h1 className="my-5 display-3 fw-bold ls-tight">
                  <span className="animated-text">
                    <span className="word">Chat</span>
                    <span> </span>
                    <span className="word">Crafters</span>
                  </span>
                  <br />
                  <span className="text-primary">Empower Conversations</span>
                </h1>
                <p style={{ color: 'hsl(217, 10%, 50.8%)' }}>
                  Empowering Your Digital Conversations with Intelligent Solutions
                </p>
              </div>

              <div className="col-lg-6 mb-5 mb-lg-0">
                <div className="card">
                  <div className="card-body py-5 px-md-5">
                    <form onSubmit={handleSubmit}>
                      {formType === 'username' && (
                        <>
                          <div className="form-outline mb-4">
                            <input
                              type="text"
                              id="username"
                              className="form-control"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                            />
                            <label className="form-label" htmlFor="username">Username</label>
                          </div>
                          <div className="form-outline mb-4">
                            <input
                              type="password"
                              id="password"
                              className="form-control"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                            <label className="form-label" htmlFor="password">Password</label>
                          </div>
                          <Message text={message} />
                        </>
                      )}

                      {formType === 'email' && (
                        <>
                          <div className="form-outline mb-4">
                            <input
                              type="email"
                              id="email"
                              className="form-control"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                            <label className="form-label" htmlFor="email">Email</label>
                          </div>
                          <button
                            type="button"
                            className="btn btn-primary mb-4"
                            onClick={handleSendOtpEmail}
                          >
                            Send OTP
                          </button>
                          <div className="form-outline mb-2">
                            <input
                              type="password"
                              id="otpEmail"
                              className="form-control"
                              value={otpEmail}
                              onChange={(e) => setOtpEmail(e.target.value)}
                            />
                            <label className="form-label" htmlFor="otpEmail">OTP</label>
                          </div>
                          <Message text={message} />
                        </>
                      )}

                      {formType === 'phone' && (
                        <>
                          <div className="form-outline mb-4">
                            <input
                              type="text"
                              id="phoneNumber"
                              className="form-control"
                              value={phoneNumber}
                              onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                            <label className="form-label" htmlFor="phoneNumber">Phone Number</label>
                          </div>
                          <button
                            type="button"
                            className="btn btn-primary mb-4"
                            onClick={handleSendOtpPhone}
                          >
                            Send OTP
                          </button>
                          <div className="form-outline mb-4">
                            <input
                              type="password"
                              id="otpPhone"
                              className="form-control"
                              value={otpPhone}
                              onChange={(e) => setOtpPhone(e.target.value)}
                            />
                            <label className="form-label" htmlFor="otpPhone">OTP</label>
                          </div>
                          <Message text={message} />
                        </>
                      )}

                      <button
                        type="submit"
                        className="btn btn-primary btn-block mb-4"
                      >
                        Sign up
                      </button>

                      <div className="text-center">
                        <p>or sign up with:</p>
                        <button
                          type="button"
                          className="btn btn-link btn-floating mx-1"
                          onClick={() => setFormType('username')}
                        >
                          <FaUser /> {/* Username icon */}
                        </button>
                        <button
                          type="button"
                          className="btn btn-link btn-floating mx-1"
                          onClick={() => setFormType('email')}
                        >
                          <FaEnvelope /> {/* Email icon */}
                        </button>
                        <button
                          type="button"
                          className="btn btn-link btn-floating mx-1"
                          onClick={() => setFormType('phone')}
                        >
                          <FaPhone /> {/* Phone icon */}
                        </button>
                      </div>
                    </form>
                    <div className="text-center mt-6" style={{marginTop:"23px"}}>
                      <p>Don't have an account? <button   onClick={() => setShowSignUp(true)} className="btn btn-link ">Create one</button></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SignupForm;
