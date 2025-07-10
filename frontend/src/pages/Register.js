import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/authSlice';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'employee' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(registerUser(form));
    
    if (res.meta.requestStatus === 'fulfilled') {
      const role = res.payload?.user?.role;
      if (role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white shadow-md p-8 rounded-xl w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input type="text" name="name" placeholder="Name" className="w-full mb-3 p-2 border rounded" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" className="w-full mb-3 p-2 border rounded" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" className="w-full mb-3 p-2 border rounded" onChange={handleChange} required />
        <select name="role" className="w-full mb-4 p-2 border rounded" onChange={handleChange}>
          <option value="employee">Employee</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="bg-blue-600 w-full py-2 rounded text-white hover:bg-blue-700">
          {loading ? 'Registering...' : 'Register'}
        </button>
        <p className="text-sm text-center mt-4">Already registered? <a href="/login" className="text-blue-600">Login</a></p>
      </form>
    </div>
  );
}
