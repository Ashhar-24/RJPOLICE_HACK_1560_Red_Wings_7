import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import MoneyFlow from './components/moneyFlow';
import './App.css';
import head from './images/header.png';
import logo from './images/Rajasthan-Police.png'
import SuspiciousActivity from './components/SuspiciousActivitiesPage';
function LoginPage() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };
  if (isLoggedIn) {
    return <Navigate to="/moneyflow" />;
  }

  return (
    <div className="container">
    <div className='class0'>
      <div className=" class1">
      <div className='head '>
         <img src={head} className='head_img'></img>
         <p >Police Login</p>
      </div>
     <div className='class2'>
     <img src={logo}></img>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-center">Fraud Detection Login</h5>
              <form>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Enter your username"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter your password"
                  />
                </div>
                <div className="d-grid gap-2">
                  <button
                    type="button"  // Change to button type
                    className="btn btn-primary"
                    onClick={handleLogin} // Call handleLogin on click
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

      
        </div>
      </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/moneyflow" element={<MoneyFlow />} />
      <Route path="/" element={<LoginPage />} />
      <Route path="/suspiciousActivity" element={<SuspiciousActivity/>} />
    </Routes>
  );
}

export default App;
