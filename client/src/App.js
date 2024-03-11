// App.js

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Doctor from './Doctor';
import Patient from './Patient';
import Home from './Home';
import Navigation from './Navigation';

class App extends React.Component{
  render(){
   return(
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/doctors" element={<Doctor/>} />
        <Route path="/patients" element={<Patient/>} />
      </Routes>
    </BrowserRouter>
   )
  }
}
export default App