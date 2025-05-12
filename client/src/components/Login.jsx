import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const blue = "bg-blue-600";
  const hoverBlue = "hover:bg-blue-700";

  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const usernameRef = useRef(null);

  React.useEffect(() => {
    usernameRef.current?.focus();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!formData.username || !formData.password) {
      setError('Both fields are required');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');

      // Store token & user securely
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      setLoading(false);
      navigate('/home');
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Login error');
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${blue}`}>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl w-full max-w-sm shadow-xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>

        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

        <input
          type="text"
          name="username"
          ref={usernameRef}
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          className="w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div className="relative mb-5">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <span
            className="absolute right-3 top-2.5 text-sm text-gray-500 cursor-pointer select-none"
            onClick={() => setShowPassword(prev => !prev)}
          >
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>
        {/* <Link to='/forget'>forgetpassword</Link> */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full ${blue} text-white py-2 rounded ${hoverBlue} transition mb-4 disabled:opacity-50`}
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>

        <Link to="/" className="text-blue-600 hover:underline text-center block">
          Don&apos;t have an account?
        </Link>
      </form>
    </div>
  );
};

export default Login;