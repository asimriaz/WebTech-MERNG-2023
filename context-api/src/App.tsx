import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Schedule from "./components/Schedule";

type Holiday = {
  name: string;
};

type HolidayContextType = {
  holiday: Holiday;
  updateHoliday: (value: string) => void;
};

export const HolidayContext = React.createContext<HolidayContextType>(
  {} as HolidayContextType
);

function App() {
  const [holiday, setHoliday] = useState<Holiday>({ name: "Eid" });

  const updateHoliday = (value: string) => {
    setHoliday({ name: value });
  };

  return (
    <>
      <HolidayContext.Provider value={{ holiday, updateHoliday }}>
        <Schedule />
      </HolidayContext.Provider>
    </>
  );
}

export default App;
