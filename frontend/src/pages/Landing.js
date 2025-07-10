import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-100 to-blue-300 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
        Remote Team Productivity Tracker
      </h1>
      <p className="text-lg text-gray-700 mb-6 max-w-xl">
        Track your team's productivity, tasks, and progress seamlessly — whether you work remotely or hybrid.
      </p>
      <Link
        to="/login"
        className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition"
      >
        Get Started
      </Link>
    </div>
  );
}
