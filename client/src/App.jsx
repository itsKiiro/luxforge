import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import TextGpt from './pages/TextGpt';
import ImageGpt from './pages/ImageGpt';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

function App() {


  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/text" element={<TextGpt />} />
        <Route path="/image" element={<ImageGpt />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </Router>

  )
}

export default App
