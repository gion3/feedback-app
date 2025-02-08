import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const FeedbackBarChart = ({ feedbackCounts }) => {
  const data = {
    labels: ['Happy', 'Sad', 'Surprised', 'Confused'],
    datasets: [
      {
        label: 'Feedback Count',
        data: [feedbackCounts.happy, feedbackCounts.sad, feedbackCounts.surprised, feedbackCounts.confused],
        backgroundColor: ['#4CAF50', '#F44336', '#FFC107', '#2196F3'],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default FeedbackBarChart;