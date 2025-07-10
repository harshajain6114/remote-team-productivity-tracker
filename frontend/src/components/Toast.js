import { useEffect } from 'react';

const Toast = ({ message, onClose, type = 'success' }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`fixed top-5 right-5 px-4 py-2 rounded text-white shadow-md ${
      type === 'error' ? 'bg-red-500' : 'bg-green-500'
    }`}>
      {message}
    </div>
  );
};

export default Toast;
