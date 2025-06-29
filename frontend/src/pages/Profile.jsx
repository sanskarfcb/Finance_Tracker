import React, { useEffect, useState } from 'react';
import API from '../services/api';
import Navbar from '../components/Navbar';

const Profile = () => {
  const [user, setUser] = useState({ name: '', email: '' });
  const [newName, setNewName] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await API.get('/user/profile');
      setUser(res.data);
      setNewName(res.data.name);
    } catch (err) {
      alert('Failed to load profile');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await API.put('/user/profile', { name: newName });
      alert('Profile updated');
      fetchProfile();
    } catch (err) {
      alert('Failed to update profile');
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: '600px', margin: 'auto', padding: '2rem' }}>
        <h2>User Profile</h2>
        <p><strong>Email:</strong> {user.email}</p>

        <form onSubmit={handleUpdate} style={{ marginTop: '1rem' }}>
          <label>
            <strong>Name:</strong>
          </label>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            style={{ display: 'block', marginTop: '0.5rem', marginBottom: '1rem', padding: '0.5rem', width: '100%' }}
          />
          <button type="submit">Update Name</button>
        </form>
      </div>
    </>
  );
};

export default Profile;