import React, { useState } from 'react';
import API from '../api.js';

const CreateActivity = ({onActivityCreated}) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [duration, setDuration] = useState('');
  const [activityCode, setActivityCode] = useState('');

  const createActivity = async (e) => {
    e.preventDefault();
    try {
      const code = Math.random().toString(36).substr(2, 6); // creare cod unic activitate
      const newActivity = { description, date, duration, code };
      const response = await API.post('/activities', newActivity);
      console.log('Activitate creată:', response.data);
      onActivityCreated(response.data);
      setDescription('');
      setDate('');
      setDuration('');
      setActivityCode(code);
    } catch (error) {
      console.error('Eroare la crearea activității:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Activitate noua</h2>
      <form onSubmit={createActivity} className="space-y-4">
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descriere</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">Data</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Durata</label>
          <input
            type="text"
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            required
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            OK
          </button>
        </div>
      </form>
      {activityCode && (
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-700">Activitatea a fost creata cu succes! Cod: <span className="font-bold text-green-500" >{activityCode}</span></p>
        </div>
      )}
    </div>
  );
};

export default CreateActivity;
