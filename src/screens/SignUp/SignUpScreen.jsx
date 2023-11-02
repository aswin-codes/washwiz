import React, { useState } from "react";
import { Eye, EyeOff } from "react-feather";
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const phoneRegex = /^\d{10}$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSignup = () => {
    // Validation
    const validationErrors = {};

    if (!username.trim()) {
      validationErrors.username = "Username is required";
    }

    if (!emailRegex.test(email)) {
      validationErrors.email = "Invalid email address";
    }

    if (!phoneRegex.test(phone)) {
      validationErrors.phone = "Invalid phone number (10 digits)";
    }

    if (!passwordRegex.test(password)) {
      validationErrors.password =
        "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one number.";
    }

    if (password !== confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // Handle signup logic here, e.g., sending data to your server
      console.log("Username:", username);
      console.log("Email:", email);
      console.log("Phone:", phone);
      console.log("Password:", password);
      console.log("Confirm Password:", confirmPassword);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-4">
        <h2 className="text-center text-2xl font-semibold mb-4">
          Create Account
        </h2>
        <div className="bg-white rounded-lg shadow-md p-8">
          <form>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-gray-800 font-semibold"
              >
                Username:
              </label>
              <input
                type="text"
                id="username"
                className={`w-full p-2 border rounded ${
                  errors.username ? "border-red-500" : ""
                }`}
                placeholder="Your Username"
                value={username}
                onChange={handleUsernameChange}
              />
              {errors.username && (
                <p className="text-red-500 text-sm">{errors.username}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-800 font-semibold"
              >
                Email:
              </label>
              <input
                type="text"
                id="email"
                className={`w-full p-2 border rounded ${
                  errors.email ? "border-red-500" : ""
                }`}
                placeholder="Your Email"
                value={email}
                onChange={handleEmailChange}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-gray-800 font-semibold"
              >
                Phone Number (10 digits):
              </label>
              <input
                type="text"
                id="phone"
                className={`w-full p-2 border rounded ${
                  errors.phone ? "border-red-500" : ""
                }`}
                placeholder="Your Phone Number"
                value={phone}
                onChange={handlePhoneChange}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-800 font-semibold"
              >
                Password:
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className={`w-full p-2 border rounded pr-10 ${
                    errors.password ? "border-red-500" : ""
                  }`}
                  placeholder="Your Password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <button
                  type="button"
                  className="absolute top-1/2 transform -translate-y-1/2 right-2 text-gray-600 hover:text-gray-800"
                  onClick={toggleShowPassword}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-800 font-semibold"
              >
                Confirm Password:
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  className={`w-full p-2 border rounded pr-10 ${
                    errors.confirmPassword ? "border-red-500" : ""
                  }`}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
                <button
                  type="button"
                  className="absolute top-1/2 transform -translate-y-1/2 right-2 text-gray-600 hover:text-gray-800"
                  onClick={toggleShowConfirmPassword}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
              )}
            </div>
            <button
              type="button"
              className="w-full bg-gray-700 text-white p-2 rounded hover:bg-gray-800"
              onClick={handleSignup}
            >
              Create Account
            </button>
          </form>
          <h1 onClick={() => navigate("/login")} className="text-center text-sm mt-5 ">
            Already have an Account ? <span className="font-bold">Login</span>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
