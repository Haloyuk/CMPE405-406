import { Routes, Route } from "react-router-dom";
import "./App.css";
import LoginForm from "./Component/LoginForm/LoginForm";
import RegisterForm from "./Component/RegisterForm/RegisterForm";
import { Toaster } from "react-hot-toast";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
            </Routes>
            <Toaster />
        </div>
    );
}

export default App;
