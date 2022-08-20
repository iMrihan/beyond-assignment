import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import SignUp from "./components/SignUp";
import PrivateComponent from "./components/PrivateComponent";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import AdminPanel from "./components/AdminPanel";
function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route element={<PrivateComponent />}>
          <Route path="/" element={<HomePage />} />

          <Route path="/admin-panel" element={<AdminPanel />} />
          <Route path="/logout" element={<h1>Logout Component</h1>} />
        </Route>

        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
