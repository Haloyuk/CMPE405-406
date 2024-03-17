import { Routes, Route } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import LoginForm from "./Component/LoginForm/LoginForm";
import RegisterForm from "./Component/RegisterForm/RegisterForm";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
            </Routes>
        </div>
    );
}

export default App;
