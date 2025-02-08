import React, { useState, useEffect } from 'react';
import CreateActivity from './components/CreateActivity';
import Activities from './components/Activities';
import Login from './components/Login.js';
import Feedback from './components/Feedback';
import API from './api.js';
import './styles.css';

function App() {
  const [activities, setActivities] = useState([]);
  const [role, setRole] = useState('');
  const [activityCode, setActivityCode] = useState('');
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [error, setError] = useState(''); 
  // Actualizare activitati
  const fetchActivities = async () => {
    try {
      const response = await API.get('/activities');
      setActivities(response.data);
    } catch (error) {
      console.error('Eroare la obținerea activităților:', error);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const handleRoleSelect = (selectedRole) => {
    //console.log('Selected role:', selectedRole);
    setRole(selectedRole);
  }
  const handleLogout = () => {
    setRole('');
  };
  //Adaugare activitate in lista
  const handleActivityCreated = (newActivity) => {
    setActivities((prevActivities) => [...prevActivities, newActivity]);
  };
  const handleActivityCodeSubmit = (code) => {
    console.log('Codul activității:', code);
    const foundActivity = activities.find(activity => activity.code === code);
    if (foundActivity) {
      setSelectedActivity(foundActivity);  // Setam activitatea pe baza codului
      setError(''); 
    } else {
      setSelectedActivity(null);  
      setError('Codul activității nu este valid. Introduceti alt cod.'); 
    }
  };
  return (
    <div>
      {!role ? (
        <Login onRoleSelect={handleRoleSelect} />
      ) : (
        <>
        <button
            onClick={handleLogout}
            className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
          >Logout</button>
          <h1 className='text-3xl font-bold text-center text-primary my-4'>Feedback app - interfata {role === 'professor' ? 'profesor' : 'student'}</h1>
          {role === 'professor' ? (<>
            <CreateActivity onActivityCreated = {handleActivityCreated}/>
            <Activities activities={activities} />
            </>
        ) : (
          <>
          {!selectedActivity ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <h2 className="text-xl font-semibold mb-4">Introduceți codul activității</h2>
                  <input 
                    type="text"
                    value={activityCode}
                    onChange={(e) => setActivityCode(e.target.value)}
                    placeholder="Cod activitate"
                    className="mb-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  />
                  <button
                    onClick={() => handleActivityCodeSubmit(activityCode)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Verifică activitatea
                  </button>
                  {error && <div className="text-red-500 mt-4">{error}</div>}
                </div>
              ) : (
                <Feedback activity={selectedActivity} />
              )}
        </>
        )}
        </>
      )}
    </div>
  );
}

export default App;