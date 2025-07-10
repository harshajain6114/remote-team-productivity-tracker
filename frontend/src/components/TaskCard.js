// Reusable card for task display
const TaskCard = ({ task, onStop }) => {
  return (
    <div className="p-4 border shadow-sm rounded bg-white flex justify-between items-center">
      <div>
        <h4 className="font-semibold text-lg">{task.title}</h4>
        <p>{task.description}</p>
        <p className="text-sm text-gray-500">Status: {task.status}</p>
      </div>
      {task.status === 'in-progress' && (
        <button onClick={() => onStop(task._id)} className="bg-red-500 text-white px-3 py-1 rounded">
          Stop
        </button>
      )}
    </div>
  );
};

export default TaskCard;
