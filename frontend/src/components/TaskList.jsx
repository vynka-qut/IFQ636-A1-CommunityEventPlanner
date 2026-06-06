import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const EventList = ({ events, setEvents, setEditingEvent }) => {
  const { user } = useAuth();

  const handleDelete = async (eventId) => {
    try {
      await axiosInstance.delete(`/api/tasks/${eventId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      setEvents(events.filter((event) => event._id !== eventId));
    } catch (error) {
      alert('Failed to delete event.');
    }
  };

  if (events.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          Upcoming Events
        </h2>

        <p className="text-gray-500">
          No events have been created yet.
        </p>

        <p className="text-gray-400 mt-2">
          Create your first puppy socialisation event using the form on the left.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Upcoming Events
        </h2>

        <p className="text-gray-500">
          {events.length} event{events.length !== 1 ? 's' : ''} scheduled
        </p>
      </div>

      {events.map((event) => (
        <div
          key={event._id}
          className="bg-white rounded-xl shadow-lg p-6 mb-4 border border-gray-100"
        >
          <h3 className="text-xl font-bold text-gray-800">
            {event.title}
          </h3>

          <p className="text-gray-600 mt-2">
            {event.description}
          </p>

          <div className="mt-4 text-sm text-gray-500">
            📅 {new Date(event.deadline).toLocaleDateString()}
          </div>

          <div className="mt-5 flex gap-3">
            <button
              onClick={() => setEditingEvent(event)}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            >
              Edit
            </button>

            <button
              onClick={() => handleDelete(event._id)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventList;