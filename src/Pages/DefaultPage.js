import React from "react";
import Header from "./Header";
import Tabs from "../Componets/Tabs";
import "./DefaultPage.css"
import TimesheetEdit from "../TabContent/TimesheetEditing.js";
import PersonalTimeSheet from "../TabContent/PersonalTimeSheet.js";
import AdminDashboard from "../TabContent/AdminDashboard.js";
import TimesheetViewing from "../TabContent/TimesheetViewing";


const DefaultPage = () => {
  const tabData = [
    { label: "Personal Timesheet", content: <React.Fragment>
    <PersonalTimeSheet/>
</React.Fragment> },
    { label: "Admin Dashboard", content: <React.Fragment>
    <AdminDashboard/>
</React.Fragment> },
    { label: "Timesheet Viewing", content: <React.Fragment>
        <TimesheetViewing/>
    </React.Fragment> },
    { label: "Timesheet Editing", content: <React.Fragment>
    <TimesheetEdit/>
</React.Fragment> },
  ];

  return (
    <body>
      <div>
        <Header />
        <body className="App">
          <Tabs  tabs={tabData}/>
        </body>
      </div>
    </body>
  );
};

export default DefaultPage;
