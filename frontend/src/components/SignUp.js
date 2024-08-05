import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUpComponent = ({ setShowSignUp }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      // Passwords do not match, return or handle accordingly
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/users/register', {
        username:username,
        password:password,
        email:email,
        mblnumber:phoneNumber
      });

      // Assuming the token is returned in the response
      const { token } = response.data;
      if (response.status === 200) { // Check for successful response status
        localStorage.setItem('authToken', token);
        setRegistrationSuccess(true);
      }
    } catch (error) {
      console.error('There was an error!', error);
      
      // Handle error accordingly
      // You can show a custom error message here if needed
    }
  };

  useEffect(() => {
    if (registrationSuccess) {
      navigate("/main"); // Navigate to the desired route
    }
  }, [registrationSuccess, navigate]);

  return (
    <section>
      <div className="px-4 py-5 px-md-5 text-center text-lg-start" style={{ backgroundColor: 'hsl(0, 0%, 96%)' }}>
        <div className="container">
          <div className="row gx-lg-5 align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <h1 className="my-5 display-3 fw-bold ls-tight">
                Create Your Account <br />
                <span className="text-primary">Join us today</span>
              </h1>
              <p style={{ color: 'hsl(217, 10%, 50.8%)' }}>
                Fill in the details below to create a new account and get started.
              </p>
            </div>

            <div className="col-lg-6 mb-5 mb-lg-0">
              <div className="card">
                <div className="card-body py-5 px-md-5">
                  <form onSubmit={handleSubmit}>
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
                        type="email"
                        id="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <label className="form-label" htmlFor="email">Email</label>
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
                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        id="confirmPassword"
                        className="form-control"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
                    </div>
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
                      type="submit"
                      className="btn btn-primary btn-block mb-4"
                    >
                      Create Account
                    </button>
                    <div className="text-center mt-4">
                      <p>Already have an account? <button onClick={() => setShowSignUp(false)} className="btn btn-link">Sign in</button></p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUpComponent;
