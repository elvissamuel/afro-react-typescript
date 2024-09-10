import React, { ReactNode } from 'react';
import HomeNav from './components/HomeNav';
import { Outlet } from 'react-router-dom';


const LayoutWithNavBar: React.FC = () => {
  return (
    <div>
      <HomeNav />
      <main><Outlet /></main>
    </div>
  );
};

export default LayoutWithNavBar;