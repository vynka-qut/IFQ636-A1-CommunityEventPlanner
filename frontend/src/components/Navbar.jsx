import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          to="/tasks"
          className="text-2xl font-bold hover:text-blue-100"
        >
          🐶 Social Puppy
        </Link>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link
                to="/tasks"
                className="hover:text-blue-100"
              >
                Events
              </Link>

              <Link
                to="/profile"
                className="hover:text-blue-100"
              >
                Profile
              </Link>

              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:text-blue-100"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-green-500 px-4 py-2 rounded hover:bg-green-600"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;