import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const [user, setUser] = useState<{ name?: string }>({});
    const navigate = useNavigate();

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-3">
                <span className="text-2xl font-bold text-blue-600">📝 TodoApp</span>
            </div>

            <div className="flex items-center space-x-4">
                <span className="text-gray-700 font-medium hidden sm:inline">Hi, {user?.name || 'User'}</span>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Header;
