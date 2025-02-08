const express = require('express');
const sequelize = require('./db');
const Activity = require('./models/Activity');
const Feedback = require('./models/Feedback');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());


sequelize.sync({ force: false }) 
  .then(() => console.log('Baza de date sincronizata'))
  .catch(err => console.error('Eroare la sincronizarea bazei de date:', err));


// Endpoint pentru crearea unei activitati
app.post('/api/activities', async (req, res) => {
  const { description, date, duration, code } = req.body;
  try {
    const newActivity = await Activity.create({ description, date, duration, code });
    res.status(201).json(newActivity);
  } catch (error) {
    console.error('Eroare la crearea activității:', error);
    res.status(500).json({ error: 'Nu s-a putut crea activitatea' });
  }
});

// Endpoint pentru obtinere activitati
app.get('/api/activities', async (req, res) => {
  try {
    const activities = await Activity.findAll();
    res.json(activities);
  } catch (error) {
    console.error('Eroare la obținerea activităților:', error);
    res.status(500).json({ error: 'Nu s-au putut obține activitățile' });
  }
});

// Endpoint pentru trimiterea feedback-ului
app.post('/api/feedback',async (req, res) => {
  const { activityCode, emoticon} = req.body;
  const timestamp = new Date().toISOString();
  try {
    const activity = await Activity.findOne({ where: { code: activityCode } });
    if (!activity) {
      return res.status(404).json({ error: 'Activitatea nu a fost găsită' });
    }
    const feedbackEntry = await Feedback.create({ activityId: activity.id, emoji: emoticon, timestamp });
    res.status(201).json(feedbackEntry);
  } catch (error) {
    console.error('Eroare la trimiterea feedback-ului:', error);
    res.status(500).json({ error: 'Nu s-a putut trimite feedback-ul' });
  }
});

// Endpoint pentru obtinerea feedback-ului unei activitati
app.get('/api/activity/:code', async (req, res) => {
  const { code } = req.params;
  try {
    const activity = await Activity.findOne({ where: { code } });
    if (!activity) {
      return res.status(404).json({ error: 'Activitatea nu a fost găsită' });
    }
    console.log(activity)
    res.status(200).json(activity);
    
  } catch (error) {
    console.error('Eroare la obținerea activității:', error);
    res.status(500).json({ error: 'Nu s-a putut obține activitatea' });
  }
});


// Endpoint pentru obținerea feedback-ului unei activitati si numarul de feedback-uri de fiecare tip
app.get('/api/feedback/:activityCode', async (req, res) => {
  const { activityCode } = req.params;
  try {
    const activity = await Activity.findOne({ where: { code: activityCode } });
    if (!activity) {
      return res.status(404).json({ error: 'Activitatea nu a fost găsită' });
    }
    const activityFeedback = await Feedback.findAll({ where: { activityId: activity.id } });

    const feedbackCounts = {
      happy: 0,
      sad: 0,
      surprised: 0,
      confused: 0
    };

    activityFeedback.forEach(feedback => {
      if (feedbackCounts[feedback.emoji] !== undefined) {
        feedbackCounts[feedback.emoji]++;
      }
    });

    res.json({ feedback: activityFeedback, counts: feedbackCounts });
  } catch (error) {
    console.error('Eroare la obținerea feedback-ului:', error);
    res.status(500).json({ error: 'Nu s-a putut obține feedback-ul' });
  }
});

// Pornirea serverului pe portul din env sau 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
