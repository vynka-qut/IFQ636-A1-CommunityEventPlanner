import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const EventForm = ({ events, setEvents, editingEvent, setEditingEvent }) => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: '',
  });

  useEffect(() => {
    if (editingEvent) {
      setFormData({
        title: editingEvent.title,
        description: editingEvent.description,
        deadline: editingEvent.deadline,
      });
    } else {
      setFormData({
        title: '',
        description: '',
        deadline: '',
      });
    }
  }, [editingEvent]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingEvent) {
        const response = await axiosInstance.put(
          `/api/tasks/${editingEvent._id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        setEvents(
          events.map((event) =>
            event._id === response.data._id ? response.data : event
          )
        );
      } else {
        const response = await axiosInstance.post(
          '/api/tasks',
          formData,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        setEvents([...events, response.data]);
      }

      setEditingEvent(null);

      setFormData({
        title: '',
        description: '',
        deadline: '',
      });
    } catch (error) {
      alert('Failed to save event.');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold text-gray-800">
          {editingEvent ? 'Edit Event' : 'Create Event'}
        </h2>

        <p className="text-gray-500 mt-1">
          Add a puppy-friendly community event.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-4">

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Event Title
          </label>

          <input
            type="text"
            placeholder="Sunday Puppy Playgroup"
            value={formData.title}
            onChange={(e) =>
              setFormData({
                ...formData,
                title: e.target.value,
              })
            }
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Event Description
          </label>

          <textarea
            rows="4"
            placeholder="Describe the event..."
            value={formData.description}
            onChange={(e) =>
              setFormData({
                ...formData,
                description: e.target.value,
              })
            }
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Event Date
          </label>

          <input
            type="date"
            value={formData.deadline}
            onChange={(e) =>
              setFormData({
                ...formData,
                deadline: e.target.value,
              })
            }
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          {editingEvent ? 'Update Event' : 'Create Event'}
        </button>
      </form>
    </div>
  );
};

export default EventForm;