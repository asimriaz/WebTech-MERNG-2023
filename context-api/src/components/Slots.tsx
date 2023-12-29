import React, { useContext } from "react";
import { HolidayContext } from "../App";

export default function Slots() {
  const { holiday, updateHoliday } = useContext(HolidayContext);
  return (
    <>
      <div>Slot - {holiday.name}</div>
      <button onClick={() => updateHoliday("Bakra Eid")}>Update</button>
      {/* 
      <HolidayContext.Consumer>
        {(state) => <div>Slots - {state.holiday.name}</div>}
      </HolidayContext.Consumer>
       */}
    </>
  );
}
