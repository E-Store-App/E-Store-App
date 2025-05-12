import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signin = () => {
  const blue = 'bg-blue-600';
  const hoverBlue = 'hover:bg-blue-700';
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    agreed: false,
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password || !formData.agreed) {
      setError('Please fill out all fields and agree to the terms.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const text = await res.text();
      let data = {};
      try {
        data = text ? JSON.parse(text) : {};
      } catch (jsonErr) {
        console.error('Invalid JSON from server:', text);
      }

      if (!res.ok) throw new Error(data.message || 'Signup failed.');
      setError('');
      navigate('/home');//
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${blue}`}>
      <form onSubmit={handleSubmit} className="bg-gray-100 p-8 rounded-3xl w-full max-w-sm shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign up</h2>

        {error && <p className="text-red-600 mb-4 text-sm">{error}</p>}

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 border rounded focus:outline-none"
        />

        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 border rounded focus:outline-none"
        />
         

        <input
          type="password"
          name="password"
          placeholder="Password (min 8 characters)"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-5 border rounded focus:outline-none"
        />

        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            name="agreed"
            checked={formData.agreed}
            onChange={handleChange}
            className="mr-2"
          />
          <p className="text-sm text-gray-600">
            I have read and agree to the{' '}
            <Link to="/privacy" className="text-blue-600 underline">
              Privacy policy and terms
            </Link>
          </p>
        </div>

        <button
          type="submit"
          className={`w-full ${blue} text-white py-2 rounded ${hoverBlue} transition mb-4`}
        >
          Sign up
        </button>

        <p className="text-sm text-center mb-4">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-700 underline">
            Log in
          </Link>
        </p>

        <button
          type="button"
          className="w-full bg-white text-gray-700 border py-2 rounded flex items-center justify-center"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png"
            alt="Google"
            className="w-5 h-5 mr-2"
          />
          Continue with Google
        </button>
      </form>
    </div>
  );
};

export default Signin;

// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
//   import { GoogleLogin } from '@react-oauth/google';
// import jwtDecode from 'jwt-decode';


// const Signin = () => {
//   const blue = 'bg-blue-600';
//   const hoverBlue = 'hover:bg-blue-700';
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     agreed: false,
//   });
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === 'checkbox' ? checked : value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.username || !formData.email || !formData.password || !formData.agreed) {
//       setError('Please fill out all fields and agree to the terms.');
//       return;
//     }

//     try {
//       const res = await fetch('http://localhost:5000/api/auth/signup', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });

//       const text = await res.text();
//       let data = {};
//       try {
//         data = text ? JSON.parse(text) : {};
//       } catch (jsonErr) {
//         console.error('Invalid JSON from server:', text);
//       }

//       if (!res.ok) throw new Error(data.message || 'Signup failed.');
//       setError('');
//       navigate('/verify');
//     } catch (err) {
//       setError(err.message);
//     }
//   };


// const handleGoogleSuccess = async (credentialResponse) => {
//   try {
//     const decoded = jwtDecode(credentialResponse.credential);
//     const googleEmail = decoded.email;

//     if (!googleEmail.endsWith('@gmail.com')) {
//       setError('Only Gmail addresses are allowed.');
//       return;
//     }

//     // Optional: Call your backend to verify token and proceed
//     const res = await fetch('http://localhost:5000/api/auth/google-signin', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ token: credentialResponse.credential }),
//     });

//     const data = await res.json();
//     if (!res.ok) throw new Error(data.message || 'Google sign-in failed.');

//     // Use the verified email
//     setFormData((prev) => ({
//       ...prev,
//       email: googleEmail,
//     }));
//     setError('');
//   } catch (err) {
//     console.error('Google Login Error:', err);
//     setError('Google login failed.');
//   }
// };

//   return (
//     <div className={`min-h-screen flex items-center justify-center ${blue}`}>
//       <form onSubmit={handleSubmit} className="bg-gray-100 p-8 rounded-3xl w-full max-w-sm shadow-lg">
//         <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign up</h2>

//         {error && <p className="text-red-600 mb-4 text-sm">{error}</p>}

//         <input
//           type="text"
//           name="username"
//           placeholder="Username"
//           value={formData.username}
//           onChange={handleChange}
//           className="w-full px-4 py-2 mb-4 border rounded focus:outline-none"
//         />

//         <input
//           type="email"
//           name="email"
//           placeholder="E-mail"
//           value={formData.email}
//           onChange={handleChange}
//           className="w-full px-4 py-2 mb-4 border rounded focus:outline-none"
//         />
// <GoogleLogin
//   onSuccess={handleGoogleSuccess}
//   onError={() => setError('Google login failed')}
// />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password (min 8 characters)"
//           value={formData.password}
//           onChange={handleChange}
//           className="w-full px-4 py-2 mb-5 border rounded focus:outline-none"
//         />

//         {/* <GoogleLogin
//           onSuccess={handleGoogleSuccess}
//           onError={() => setError('Google login failed')}
//         /> */}

//         <div className="flex items-center mb-4 mt-4">
//           <input
//             type="checkbox"
//             name="agreed"
//             checked={formData.agreed}
//             onChange={handleChange}
//             className="mr-2"
//           />
//           <p className="text-sm text-gray-600">
//             I have read and agree to the{' '}
//             <Link to="/privacypolicy" className="text-blue-600 underline">
//               Privacy policy and terms
//             </Link>
//           </p>
//         </div>

//         <button
//           type="submit"
//           className={`w-full ${blue} text-white py-2 rounded ${hoverBlue} transition mb-4`}
//         >
//           Sign up
//         </button>

//         <p className="text-sm text-center mb-4">
//           Already have an account?{' '}
//           <Link to="/login" className="text-blue-700 underline">
//             Log in
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Signin;