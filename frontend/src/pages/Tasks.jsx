import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { useAuth } from '../context/AuthContext';

const Events = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axiosInstance.get('/api/tasks', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setEvents(response.data);
      } catch (error) {
        alert('Failed to fetch events.');
      }
    };

    fetchEvents();
  }, [user]);

  return (
    <div className="container mx-auto p-6">
      <TaskForm
        events={events}
        setEvents={setEvents}
        editingEvent={editingEvent}
        setEditingEvent={setEditingEvent}
      />
      <TaskList events={events} setEvents={setEvents} setEditingEvent={setEditingEvent} />
    </div>
  );
};

export default Events;
