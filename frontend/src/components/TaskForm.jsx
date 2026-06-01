import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const EventForm = ({ events, setEvents, editingEvent, setEditingEvent }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({ title: '', description: '', deadline: '' });

  useEffect(() => {
    if (editingEvent) {
      setFormData({
        title: editingEvent.title,
        description: editingEvent.description,
        deadline: editingEvent.deadline,
      });
    } else {
      setFormData({ title: '', description: '', deadline: '' });
    }
  }, [editingEvent]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingEvent) {
        const response = await axiosInstance.put(`/api/tasks/${editingEvent._id}`, formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setEvents(events.map((event) => (event._id === response.data._id ? response.data : event)));
      } else {
        const response = await axiosInstance.post('/api/tasks', formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setEvents([...events, response.data]);
      }
      setEditingEvent(null);
      setFormData({ title: '', description: '', deadline: '' });
    } catch (error) {
      alert('Failed to save event.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded mb-6">
      <h1 className="text-2xl font-bold mb-4">{editingEvent ? 'Edit Event' : 'Add Event'}</h1>
      <input
        type="text"
        placeholder="Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        type="date"
        value={formData.deadline}
        onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
        {editingEvent ? 'Update Event' : 'Add Event'}
      </button>
    </form>
  );
};

export default EventForm;
