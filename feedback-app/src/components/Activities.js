import React, { useEffect, useState } from 'react';
import API from '../api.js';
import happyImg from '../assets/happy.png';
import sadImg from '../assets/sad.png';
import surprisedImg from '../assets/surprised.png';
import confusedImg from '../assets/confused.png';
import FeedbackBarChart from './FeedbackBarChart.js';

// mapare imagini
const emojiMap = {
  happy: happyImg,
  sad: sadImg,
  surprised: surprisedImg,
  confused: confusedImg
};

const Activities = ({ activities }) => {
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [feedback, setFeedback] = useState([]);
  const [feedbackCounts, setFeedbackCounts] = useState({
    happy: 0,
    sad: 0,
    surprised: 0,
    confused: 0
  });

  const fetchFeedback = async (activityCode) => {
    try {
      const response = await API.get(`/feedback/${activityCode}`);
      setFeedback(response.data.feedback);
      setFeedbackCounts(response.data.counts);
      console.log(response.data);
    } catch (error) {
      console.error('Eroare la obținerea feedback-ului:', error);
    }
  };

  const handleActivityClick = (activityCode) => {
    setSelectedActivity(activityCode);
    fetchFeedback(activityCode);
  };

  //daca vrem ca feedback-ul sa fie actualizat la fiecare 5 secunde
  useEffect(() => {
    if (selectedActivity) {
      const intervalId = setInterval(() => {
        fetchFeedback(selectedActivity);
      }, 5000); // setam intervalul de refresh

      return () => clearInterval(intervalId); // Oprim executia la demontarea componentei sau schimbarea activitatii selectate
    }
  }, [selectedActivity]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('ro-RO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    return `${formattedDate}`;
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('ro-RO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }); 
    const formattedTime = date.toLocaleTimeString('ro-RO', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }); 
    return `${formattedDate} - ${formattedTime}`;
  };

  const getRecentFeedback = (feedback) => {
    return feedback
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 6);
  };

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Activități</h1>
      <ul className='list-disc pl-5'>
        {activities.map((activity) => (
          <li key={activity.code} className='cursor-pointer text-primary hover:underline' onClick={() => handleActivityClick(activity.code)}>
            {activity.description} - {formatDate(activity.date)}
          </li>
        ))}
      </ul>

      {selectedActivity && (
        <div className='mt-6 flex'>
          <div className='w-1/2 pr-4'>
          <h2 className='text-xl font-semibold mb-2'>Feedback pentru activitatea {selectedActivity}</h2>
            <ul className='list-disc pl-5'>
              {getRecentFeedback(feedback).map((entry) => (
                <li key={entry.id} className='flex items-center mb-2'> 
                  <img src={emojiMap[entry.emoji]} width={50} height={50} alt={entry.emoji} className='mr-2' /> - {formatDateTime(entry.timestamp)}
                </li>
              ))}
            </ul>
          </div>
          <div className='w-1/2 pl-4 border-l border-gray-300'>
            <h2 className='text-xl font-semibold mb-2'>Counter feedback</h2>
            <FeedbackBarChart feedbackCounts={feedbackCounts} />
          </div>
        </div>
      )}
    </div>
  );
};
export default Activities;