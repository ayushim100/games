import Contact from '../components/contact';
import Header from '../components/header';
import React, { useState } from "react";
import DashBoard from '../pages/dashboard';
import './index.css';

function FirstHealth() {
  const [activeComponent, setActiveComponent] = useState<string>('VideoGames');
  return (
    <div className="App">
      <Header activeComponent={activeComponent} setActiveComponent={setActiveComponent}></Header>
      {activeComponent === "Contact" && (
        <Contact/>
      )}
      {activeComponent === "VideoGames" && (
        <DashBoard/>
      )}
    </div>
  );
}

export default FirstHealth;
