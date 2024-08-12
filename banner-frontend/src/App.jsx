import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Banner from './components/Banner';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';
import ChangePass from './components/ChangePass';
function App() {

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <Router>

        <div className="w-full md:w-64 bg-gray-800 text-white p-5">
          <Sidebar />
        </div>


        <div className="flex-1 p-5 bg-gray-100">
          <Routes>
            <Route path="/" element={<Banner />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* <Route path="/change-password" element={<ChangePass />} /> */}
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
