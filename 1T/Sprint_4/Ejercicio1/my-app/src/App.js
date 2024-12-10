import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppHeader from './Components/General/AppHeader/AppHeader'; 
import AppFooter from './Components/General/AppFooter/AppFooter';
import GuildMemberManagement from './Components/GuildMemberManagement/GuildMemberManagement';

const App = () => {
  return (
    <Router>
      <AppHeader />
      <Routes>
        <Route path="/" element={<GuildMemberManagement />} />
      </Routes>
      <AppFooter />
    </Router>
  );
};

export default App;