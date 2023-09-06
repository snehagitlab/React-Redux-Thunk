import {BrowserRouter as Router,Routes,Route } from 'react-router-dom'
//import 'https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css'
import './index.css';
import Home from './Pages/Home';
import Login from './Pages/Login';
import {Slide,  ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toastStyles = {
  autoClose: 3000,
  transition: Slide,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
}

function App() {
  return (
    <div className="App">
    <ToastContainer {...toastStyles} />
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
