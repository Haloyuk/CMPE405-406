import { Navigate, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginForm from "./Component/LoginForm/LoginForm";
import RegisterForm from "./Component/RegisterForm/RegisterForm";
import HomeForm from "./Component/HomeForm/HomeForm";
import ProfilePage from "./Component/ProfilePage/ProfilePage";
import ChatPage from "./Component/ChatPage/ChatPage";
import MailVerificationPage from "./Component/MailVerificationPage/MailVerificationPage";
// import ForgotPage from "./Component/ForgotPage/ForgotPage";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";


function App() {
    const { authUser } = useAuthContext();
    const isUserVerified = authUser?.isVerified;
    
    return (
        <div className="App">
            <Routes>
                <Route
                    path="/"
                    element={
                       isUserVerified && authUser ? <HomeForm /> : <Navigate to={"/login"} />
                    }
                />

              <Route
                    path="/login"
                    element={
                        isUserVerified && authUser ? (
                            <Navigate to="/" />
                        ) 
                        : authUser && !isUserVerified ? (
                            <Navigate to="/verification" />
                        )
                        : (
                            <LoginForm />
                        )
                    }
                    
                />
                <Route
                    path="/register"
                    element={authUser ? <Navigate to="/verification" />:<RegisterForm />}
                />
                <Route
                    path="/profile"
                    element={isUserVerified && authUser ? (
                        <ProfilePage />
                    ) : authUser && !isUserVerified ? (
                        < Navigate to = '/verification' />
                    ) : (
                        <Navigate to="/login" />
                    ) }
                />
                <Route
                    path="/chat"
                    element={authUser && isUserVerified ? <ChatPage /> : <Navigate to="/login" /> }
                />
                <Route
                    path="/verification"
                    element={authUser ? <MailVerificationPage /> : <Navigate to="/login" /> }
                />
                 {/* <Route
                    path="/changepassword"
                    element={ <ForgotPage /> }
                /> */}
                
            </Routes>
            <Toaster />
        </div>
    );
}

export default App;

