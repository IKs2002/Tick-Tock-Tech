import React, { useRef, useState, useEffect } from "react";
import SaveAsPDFButton from "../Componets/SaveAsPDFButton";
import WeekPicker from "../Componets/WeekPicker.js";
import TimeSheet from "../Componets/TimeSheet.js";
import { startOfWeek, addDays, format as formatDate } from "date-fns";
import moment from "moment";

const PersonalTimeSheet = () => {
  const initialWeekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
  const initialWeekEnd = addDays(initialWeekStart, 13);

  const initialFirstWeekStart = moment(initialWeekStart).startOf("day");
  const initialSecondWeekEnd = moment(initialWeekEnd).endOf("day");

  const [firstWeekStart, setFirstWeekStart] = useState(initialFirstWeekStart.toDate());
  const [secondWeekEnd, setSecondWeekEnd] = useState(initialSecondWeekEnd.toDate());
  const [timeSheetData, setTimeSheetData] = useState([]);

  const handleWeekChange = (weeks) => {
    const newFirstWeekStart = moment.utc(weeks.beginning.firstWeekStart).startOf("day").toDate();
    const newSecondWeekEnd = moment.utc(weeks.ending.secondWeekEnd).endOf("day").toDate();
  
    setFirstWeekStart(newFirstWeekStart);
    setSecondWeekEnd(newSecondWeekEnd);
  };

  const uid = 'test@ddf.com';

  const fetchTimesheetData = async (uid, firstWeekStart, secondWeekEnd) => {
    const url = `http://localhost:5000/api/timeData/get/uid=${uid}&startDate=${firstWeekStart}&endDate=${secondWeekEnd}`;

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
    } else {
      return await response.json();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTimesheetData(uid, formattedFirstWeekStart, formattedSecondWeekEnd);
        if (data && data.timesheets) {
          setTimeSheetData(data.timesheets);
        }
      } catch (error) {
        console.error("Failed to fetch timesheet data:", error);
      }
    };

    fetchData();
  }, [uid, firstWeekStart, secondWeekEnd]);

  const name = "Employee Name";
  const formattedFirstWeekStart = firstWeekStart ? formatDate(firstWeekStart, "MM-dd-yy") : null;
  const formattedSecondWeekEnd = secondWeekEnd ? formatDate(secondWeekEnd, "MM-dd-yy") : null;

  let docToPrint = useRef();

  return (
    <div>
      <SaveAsPDFButton
        ref={docToPrint}
        start={formattedFirstWeekStart}
        end={formattedSecondWeekEnd}
        name={name}
      />
      <div ref={docToPrint}>
        <div>
          <WeekPicker onChange={handleWeekChange} />
        </div>
        <div>
          <label className="EmpName">Employee Name</label>
        </div>
        <div>
          <TimeSheet timeData={timeSheetData} />
        </div>
      </div>
    </div>
  );
};

export default PersonalTimeSheet;