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

    if (user?.token) {
      fetchEvents();
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <p className="uppercase tracking-wide text-sm text-blue-100 font-semibold">
            Community Event Planner
          </p>
          <h1 className="text-4xl font-bold mt-2">
            Puppy-friendly social events
          </h1>
          <p className="mt-3 max-w-2xl text-blue-100">
            Create, view and manage safe socialisation events for the Social Puppy community.
          </p>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-1">
          <TaskForm
            events={events}
            setEvents={setEvents}
            editingEvent={editingEvent}
            setEditingEvent={setEditingEvent}
          />
        </section>

        <section className="lg:col-span-2">
          <TaskList
            events={events}
            setEvents={setEvents}
            setEditingEvent={setEditingEvent}
          />
        </section>
      </main>
    </div>
  );
};

export default Events;