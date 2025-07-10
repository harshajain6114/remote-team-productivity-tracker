// 📁 components/Navbar.jsx
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/authSlice';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">Team Tracker</Link>
      <div className="space-x-4">
        {user && user.role === 'employee' && (
          <Link to="/dashboard" className="hover:underline">Dashboard</Link>
        )}
        {user && user.role === 'admin' && (
          <Link to="/admin" className="hover:underline">Admin</Link>
        )}
        {user ? (
          <button onClick={handleLogout} className="bg-white text-blue-600 px-3 py-1 rounded">
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
