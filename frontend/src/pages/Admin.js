// 📍 pages/Admin.jsx
import { useEffect, useState } from 'react';
import axios from '../api/axiosInstance';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Admin() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('/dashboard/summary');
      setSummary(res.data);
    };
    fetchData();
  }, []);

  if (!summary) return <p className="p-6">Loading admin dashboard...</p>;

  const barData = {
    labels: summary.topUsers.map(u => u.name),
    datasets: [
      {
        label: 'Tasks Completed',
        data: summary.topUsers.map(u => u.count),
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
      },
    ],
  };

  const lineData = {
    labels: summary.daily.map(d => d.date),
    datasets: [
      {
        label: 'Daily Task Count',
        data: summary.daily.map(d => d.count),
        borderColor: 'rgba(34,197,94,1)',
        fill: false,
      },
    ],
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-xl font-semibold mb-2">Top Performers (This Week)</h3>
          <Bar data={barData} />
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-xl font-semibold mb-2">Daily Task Count</h3>
          <Line data={lineData} />
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow mt-8">
        <h3 className="text-xl font-semibold mb-2">All Tasks</h3>
        <table className="w-full table-auto border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-1">User</th>
              <th className="border px-2 py-1">Title</th>
              <th className="border px-2 py-1">Status</th>
              <th className="border px-2 py-1">Start</th>
              <th className="border px-2 py-1">End</th>
            </tr>
          </thead>
          <tbody>
            {summary.allTasks.map(task => (
              <tr key={task._id}>
                <td className="border px-2 py-1">{task.user.name}</td>
                <td className="border px-2 py-1">{task.title}</td>
                <td className="border px-2 py-1">{task.status}</td>
                <td className="border px-2 py-1">{task.startTime?.slice(0,10)}</td>
                <td className="border px-2 py-1">{task.endTime?.slice(0,10) || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
