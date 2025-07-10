import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/authSlice';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

 const handleSubmit = async (e) => {
  e.preventDefault();
  const res = await dispatch(loginUser(form));

  if (res.meta.requestStatus === 'fulfilled') {
    const role = res.payload.role;  // ✅ FIXED: user is already unwrapped in payload
    navigate(role === 'admin' ? '/admin' : '/dashboard');
  }
};


  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white shadow-md p-8 rounded-xl w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input type="email" name="email" placeholder="Email" className="w-full mb-3 p-2 border rounded" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" className="w-full mb-4 p-2 border rounded" onChange={handleChange} required />
        <button type="submit" className="bg-blue-600 w-full py-2 rounded text-white hover:bg-blue-700">
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <p className="text-sm text-center mt-4">New here? <a href="/register" className="text-blue-600">Register</a></p>
      </form>
    </div>
  );
}
