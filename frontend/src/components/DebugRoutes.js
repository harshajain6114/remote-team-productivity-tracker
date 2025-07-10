// 📍 src/components/DebugRoutes.js
import { Link } from 'react-router-dom';

export default function DebugRoutes() {
  const routes = [
    { path: '/', name: 'Landing' },
    { path: '/login', name: 'Login' },
    { path: '/register', name: 'Register' },
    { path: '/dashboard', name: 'Dashboard (Employee)' },
    { path: '/admin', name: 'Admin Dashboard' },
    { path: '/random', name: 'NotFound (Random Route)' }
  ];

  return (
    <div style={{ padding: '2rem' }}>
      <h2 className="text-xl font-bold mb-4">⚙️ Debug Route Panel</h2>
      <ul className="list-disc pl-6 space-y-2">
        {routes.map(({ path, name }) => (
          <li key={path}>
            <Link to={path} className="text-blue-600 hover:underline">{name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
