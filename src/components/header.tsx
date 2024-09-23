import React from "react";

interface HeaderProps {
    activeComponent: string;
    setActiveComponent: (component: string) => void;
}

const Header: React.FC<HeaderProps> = ({activeComponent, setActiveComponent}) => {
  return (
    <div className="bg-gray-900 text-white font-montserrat">

      <header className="flex flex-col lg:flex-row justify-center items-start lg:justify-start p-8">
        <div
          className={`cursor-pointer text-3xl  font-semibold mr-6 mb-4 lg:mb-0 ${
            activeComponent === "VideoGames" ? "text-yellow-500" : "text-white"
          }`}
          onClick={() => setActiveComponent("VideoGames")}
        >
          VIDEO GAMES
        </div>
        <div
          className={`cursor-pointer text-3xl  font-semibold ${
            activeComponent === "Contact" ? "text-yellow-500" : "text-white"
          }`}
          onClick={() => setActiveComponent("Contact")}
        >
          CONTACT
        </div>
      </header>
    </div>
  );
};

export default Header;
