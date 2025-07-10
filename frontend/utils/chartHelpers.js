export function getDailyTaskChartData(tasks) {
  const chartData = {};

  tasks.forEach(task => {
    const date = new Date(task.startTime).toLocaleDateString();
    if (!chartData[date]) chartData[date] = 0;
    chartData[date]++;
  });

  return {
    labels: Object.keys(chartData),
    data: Object.values(chartData),
  };
}

export function getTopUsersData(taskSummaries) {
  const labels = taskSummaries.map(summary => summary.name);
  const data = taskSummaries.map(summary => summary.taskCount);

  return { labels, data };
}
