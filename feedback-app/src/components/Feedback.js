import React, { useState } from 'react';
import API from '../api.js';
import happyImg from '../assets/happy.png';
import sadImg from '../assets/sad.png';
import surprisedImg from '../assets/surprised.png';
import confusedImg from '../assets/confused.png';
import styles from './styles/Feedback.module.css';

const emojiMap = {
  happy: happyImg,
  sad: sadImg,
  surprised: surprisedImg,
  confused: confusedImg
};

const Feedback = ({ activity }) => {
  const [selectedEmoticon, setSelectedEmoticon] = useState('');

  const handleFeedbackSubmit = async (emoticon) => {
    setSelectedEmoticon(emoticon);
    try {
      await API.post('/feedback', { activityCode: activity.code, emoticon });
    } catch (error) {
      console.error('Eroare la trimiterea feedback-ului:', error);
    }
  };

  return (
    <div className={styles.container}>
      {console.log('activitate din feedback.js: ', activity)}
      <h2 className={styles.title}>Feedback pentru activitatea {activity.description}</h2>
      <div className={styles.buttonContainer}>
        {Object.keys(emojiMap).map((emoticon) => (
          <button
            key={emoticon}
            className={styles.emojiButton}
            onClick={() => handleFeedbackSubmit(emoticon)}
          >
            <img
              src={emojiMap[emoticon]}
              alt={emoticon}
              className={styles.emojiImage}
            />
          </button>
        ))}
      </div>
      {selectedEmoticon && (
        <p className="flex items-center justify-center font-bold space-x-2 pt-10">
          <span>Ai selectat:</span>
          <img
            src={emojiMap[selectedEmoticon]}
            alt={selectedEmoticon}
            className="inline-block w-8 h-8"
          />
        </p>
      )}
    </div>
  );
};

export default Feedback;
