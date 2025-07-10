import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyTasks, startTask, stopTask } from '../redux/taskSlice';

export default function Dashboard() {
  const dispatch = useDispatch();
  const { tasks, loading } = useSelector((state) => state.task);
  const [form, setForm] = useState({ title: '', description: '' });

  const activeTask = tasks.find(t => t.status === 'in-progress');

  const handleStart = (e) => {
    e.preventDefault();
    dispatch(startTask(form));
    setForm({ title: '', description: '' });
  };

  const handleStop = (id) => {
    dispatch(stopTask(id));
  };

  useEffect(() => {
    dispatch(fetchMyTasks());
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Welcome to your dashboard</h2>
      <form onSubmit={handleStart} className="mb-4">
        <input name="title" placeholder="Task Title" className="border p-2 mr-2" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
        <input name="description" placeholder="Task Description" className="border p-2 mr-2" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
        <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit" disabled={!!activeTask}>Start Task</button>
      </form>

      {loading ? <p>Loading tasks...</p> : (
        <ul className="space-y-2">
          {tasks.map(task => (
            <li key={task._id} className="p-3 border rounded shadow-sm bg-white flex justify-between">
              <div>
                <h4 className="font-semibold">{task.title}</h4>
                <p>{task.description}</p>
                <p className="text-sm text-gray-500">Status: {task.status}</p>
              </div>
              {task.status === 'in-progress' && (
                <button onClick={() => handleStop(task._id)} className="bg-red-500 text-white px-3 py-1 rounded self-center">Stop</button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}