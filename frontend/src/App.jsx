import { Navigate, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginForm from "./Component/LoginForm/LoginForm";
import RegisterForm  from "./Component/RegisterForm/RegisterForm";
import HomeForm from "./Component/HomeForm/HomeForm";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";

function App() {
    const { authUser } = useAuthContext();
    return (
        <div className="App">
            <Routes>
                <Route
                    path="/"
                    element={
                        authUser ? <HomeForm /> : <Navigate to={"/login"} />
                    }
                />
                <Route
                    path="/login"
                    element={authUser ? <Navigate to="/" /> : <LoginForm />}
                />
                <Route
                    path="/register"
                    element={authUser ? <Navigate to="/" /> : <RegisterForm />}
                />
            </Routes>
            <Toaster />
        </div>
    );
}

export default App;
