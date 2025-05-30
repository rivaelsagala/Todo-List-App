import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from "./components/auth/loginForm";
import RegisterForm from './components/auth/registerForm';
import App from './App';

// Component untuk protected route
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
    const token = localStorage.getItem('token');

    if (token) {
        return <Navigate to="/app" replace />;
    }

    return <>{children}</>;
};



function Index() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />

                {/* Public Routes */}
                <Route path="/login" element={
                    <PublicRoute>
                        <LoginForm />
                    </PublicRoute>
                } />

                <Route path="/register" element={
                    <PublicRoute>
                        <RegisterForm />
                    </PublicRoute>
                } />

                {/* Protected Routes */}
                <Route path="/app" element={
                    <ProtectedRoute>
                        <App />
                    </ProtectedRoute>
                } />

                {/* Catch all route */}
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </Router>
    );
}
export default Index;



// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import LoginForm from "./components/auth/loginForm";
// import RegisterForm from './components/auth/registerForm';
// import App from './App';

// function Index() {
//     return (
//         <Router>
//             <Routes>
//                 <Route path="/" element={<Navigate to="/login" replace />} />
//                 <Route path="/login" element={<LoginForm />} />
//                 <Route path="/register" element={<RegisterForm />} />
//                 <Route path="/App" element={<App />} />
//             </Routes>
//         </Router>
//     );
// }

// export default Index;
