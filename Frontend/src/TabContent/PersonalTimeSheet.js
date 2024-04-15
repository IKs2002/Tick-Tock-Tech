import React, { useRef, useState } from "react";
import SaveAsPDFButton from "../Componets/SaveAsPDFButton";
import WeekPicker from "../Componets/WeekPicker.js";
import TimeSheet from "../Componets/TimeSheet.js";
import { format as formatDate } from "date-fns";
import moment from "moment";

const PersonalTimeSheet = ({userName, userEmail}) => {
  const [firstWeekStart, setFirstWeekStart] = useState(null);
  const [secondWeekEnd, setSecondWeekEnd] = useState(null);
  const [timeSheetData, setTimeSheetData] = useState([]);

  const uid = userEmail;

  const handleWeekChange = (weeks) => {
    const newFirstWeekStart = moment.utc(weeks.beginning.firstWeekStart).toDate();
    const newSecondWeekEnd = moment.utc(weeks.ending.secondWeekEnd).toDate();
    setFirstWeekStart(newFirstWeekStart);
    setSecondWeekEnd(newSecondWeekEnd);
    const formattedFirstWeekStart = formatDate(newFirstWeekStart, "MM-dd-yy");
    const formattedSecondWeekEnd = formatDate(newSecondWeekEnd, "MM-dd-yy");
    const fetchTimesheetData = async () => {
      try {
        const url = `http://localhost:5000/api/timeData/get/uid=${uid}&startDate=${formattedFirstWeekStart}&endDate=${formattedSecondWeekEnd}`;
        const response = await fetch(url, {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data && data.timesheets) {
          setTimeSheetData(data.timesheets);
        }
      } catch (error) {
        console.error("Failed to fetch timesheet data:", error);
      }
    };

    fetchTimesheetData();
  };

  const formattedFirstWeekStart = firstWeekStart ? formatDate(firstWeekStart, "MM-dd-yy") : null;
  const formattedSecondWeekEnd = secondWeekEnd ? formatDate(secondWeekEnd, "MM-dd-yy") : null;

  let docToPrint = useRef();

  return (
    <div>
      <SaveAsPDFButton
        ref={docToPrint}
        start={formattedFirstWeekStart}
        end={formattedSecondWeekEnd}
        name={userName}
      />
      <div ref={docToPrint}>
        <div>
          <WeekPicker onChange={handleWeekChange} />
        </div>
        <div>
          <label className="EmpName">{userName}</label>
        </div>
        <div>
          {timeSheetData.length > 0 && <TimeSheet timeData={timeSheetData} />}
          {timeSheetData.length === 0 &&  <div></div>}
        </div>
      </div>
    </div>
  );
};

export default PersonalTimeSheet;
