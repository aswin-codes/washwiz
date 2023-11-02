import React, { useState, useRef } from 'react';
import { Eye, EyeOff } from 'react-feather'; // Import the icons
import { useNavigate } from 'react-router-dom';

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const passwordInputRef = useRef(null);

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
    passwordInputRef.current.type = showPassword ? 'password' : 'text';
  };

  const handleRegistration = () => {
    // Handle the registration logic here, e.g., sending data to your server
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-4">
        <h2 className="text-center text-2xl font-semibold mb-4">Login</h2>
        <div className="bg-white rounded-lg shadow-md p-8">
          <form>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-800 font-semibold">Email:</label>
              <input
                type="email"
                id="email"
                className="w-full p-2 border rounded"
                placeholder="Your Email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-800 font-semibold">Password:</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  className="w-full p-2 border rounded pr-10"
                  placeholder="Your Password"
                  value={password}
                  onChange={handlePasswordChange}
                  ref={passwordInputRef}
                />
                <button
                  type="button"
                  className="absolute top-1/2 transform -translate-y-1/2 right-2 text-gray-600 hover:text-gray-800"
                  onClick={toggleShowPassword}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <button
              type="button"
              className="w-full bg-gray-700 text-white p-2 rounded hover:bg-gray-800"
              onClick={handleRegistration}
            >
              Login
            </button>
          </form>
          <h1 onClick={() => navigate('/signup')} className='text-center text-sm mt-5 '>Don't have an Account ? <span className='font-bold'>Sign Up</span></h1>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
