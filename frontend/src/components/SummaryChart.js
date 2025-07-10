import { Bar, Line } from 'react-chartjs-2';

const SummaryChart = ({ data, type = 'bar', title }) => {
  const chartData = {
    labels: data.map((d) => d.label),
    datasets: [
      {
        label: title,
        data: data.map((d) => d.value),
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
        borderColor: 'rgba(59, 130, 246, 1)',
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      {type === 'bar' ? <Bar data={chartData} /> : <Line data={chartData} />}
    </div>
  );
};

export default SummaryChart;
