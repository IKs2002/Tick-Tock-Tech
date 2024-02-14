import React from 'react';
import './TimeSheet.css'

const data = [
  { Day: "Monday", Date: "## XXX ####" , Clockin: "##:## AM" , Clockout: "##:## AM"  , Clockin: "##:## AM", Clockout: "##:## AM", Clockin: "##:## AM", Clockout: "##:## AM", Project: "XXXXXXXXXXXXXX", Regular: "XX hrs", Overtime: "XX hrs"},
  { Day: "Tuesday", Date: "## XXX ####" , Clockin: "##:## AM" , Clockout: "##:## AM"  , Clockin: "##:## AM", Clockout: "##:## AM", Clockin: "##:## AM", Clockout: "##:## AM", Project: "XXXXXXXXXXXXXX", Regular: "XX hrs", Overtime: "XX hrs"},
  { Day: "Wednesday", Date: "## XXX ####" , Clockin: "##:## AM" , Clockout: "##:## AM"  , Clockin: "##:## AM", Clockout: "##:## AM", Clockin: "##:## AM", Clockout: "##:## AM", Project: "XXXXXXXXXXXXXX", Regular: "XX hrs", Overtime: "XX hrs"},
  { Day: "Thursday", Date: "## XXX ####" , Clockin: "##:## AM" , Clockout: "##:## AM"  , Clockin: "##:## AM", Clockout: "##:## AM", Clockin: "##:## AM", Clockout: "##:## AM", Project: "XXXXXXXXXXXXXX", Regular: "XX hrs", Overtime: "XX hrs"},
  { Day: "Friday", Date: "## XXX ####" , Clockin: "##:## AM" , Clockout: "##:## AM"  , Clockin: "##:## AM", Clockout: "##:## AM", Clockin: "##:## AM", Clockout: "##:## AM", Project: "XXXXXXXXXXXXXX", Regular: "XX hrs", Overtime: "XX hrs"},
  { Day: "Saturday", Date: "## XXX ####" , Clockin: "##:## AM" , Clockout: "##:## AM"  , Clockin: "##:## AM", Clockout: "##:## AM", Clockin: "##:## AM", Clockout: "##:## AM", Project: "XXXXXXXXXXXXXX", Regular: "XX hrs", Overtime: "XX hrs"},
  { Day: "Sunday", Date: "## XXX ####" , Clockin: "##:## AM" , Clockout: "##:## AM"  , Clockin: "##:## AM", Clockout: "##:## AM", Clockin: "##:## AM", Clockout: "##:## AM", Project: "XXXXXXXXXXXXXX", Regular: "XX hrs", Overtime: "XX hrs"}
]

const data1 = [
  { Day: "Monday", Date: "## XXX ####" , Clockin: "##:## AM" , Clockout: "##:## AM"  , Clockin: "##:## AM", Clockout: "##:## AM", Clockin: "##:## AM", Clockout: "##:## AM", Project: "XXXXXXXXXXXXXX", Regular: "XX hrs", Overtime: "XX hrs"},
  { Day: "Tuesday", Date: "## XXX ####" , Clockin: "##:## AM" , Clockout: "##:## AM"  , Clockin: "##:## AM", Clockout: "##:## AM", Clockin: "##:## AM", Clockout: "##:## AM", Project: "XXXXXXXXXXXXXX", Regular: "XX hrs", Overtime: "XX hrs"},
  { Day: "Wednesday", Date: "## XXX ####" , Clockin: "##:## AM" , Clockout: "##:## AM"  , Clockin: "##:## AM", Clockout: "##:## AM", Clockin: "##:## AM", Clockout: "##:## AM", Project: "XXXXXXXXXXXXXX", Regular: "XX hrs", Overtime: "XX hrs"},
  { Day: "Thursday", Date: "## XXX ####" , Clockin: "##:## AM" , Clockout: "##:## AM"  , Clockin: "##:## AM", Clockout: "##:## AM", Clockin: "##:## AM", Clockout: "##:## AM", Project: "XXXXXXXXXXXXXX", Regular: "XX hrs", Overtime: "XX hrs"},
  { Day: "Friday", Date: "## XXX ####" , Clockin: "##:## AM" , Clockout: "##:## AM"  , Clockin: "##:## AM", Clockout: "##:## AM", Clockin: "##:## AM", Clockout: "##:## AM", Project: "XXXXXXXXXXXXXX", Regular: "XX hrs", Overtime: "XX hrs"},
  { Day: "Saturday", Date: "## XXX ####" , Clockin: "##:## AM" , Clockout: "##:## AM"  , Clockin: "##:## AM", Clockout: "##:## AM", Clockin: "##:## AM", Clockout: "##:## AM", Project: "XXXXXXXXXXXXXX", Regular: "XX hrs", Overtime: "XX hrs"},
  { Day: "Sunday", Date: "## XXX ####" , Clockin: "##:## AM" , Clockout: "##:## AM"  , Clockin: "##:## AM", Clockout: "##:## AM", Clockin: "##:## AM", Clockout: "##:## AM", Project: "XXXXXXXXXXXXXX", Regular: "XX hrs", Overtime: "XX hrs"}

]
const Paydata = [ 
  {PeriodRegular: "XXX", PeriodOvertime: "XXX"}
]

const WeekTotal = [ 
  {Regular: "XXX", Overtime: "XXX"}
]

function TimeSheet(){
  return (
<div className="App">
  <section className='App-Timesheet'>
     <table>
       <tr>
         <th>Day of the Week</th>
         <th>Date</th> 
         <th>Clock In</th>
         <th>Clock out</th>  
         <th></th>
         <th>Clock In</th>
         <th>Clock out</th>
         <th></th>
         <th>Clock In</th>
         <th>Clock out</th>
         <th></th>
         <th>Project</th>
         <th>Regular</th>
         <th>Overtime</th>
       </tr>
         {data.map((val, key) => {
           return (
             <tr key={key}>
               <td>{val.Day}</td>
               <td>{val.Date}</td>
               <td>{val.Clockin}</td>
               <td>{val.Clockout}</td>
               <td></td>
               <td>{val.Clockin}</td>
               <td>{val.Clockout}</td>
               <td></td>
               <td>{val.Clockin}</td>
               <td>{val.Clockout}</td>
               <td></td>
               <td>{val.Project}</td>
               <td>{val.Regular}</td>
               <td>{val.Overtime}</td>
             </tr>
             )
         })}

     </table>
   </section>


   <section className='App-TotalHours'>
   <table>
     <tr> 
       <th></th>
       <th>Regular Hours</th>
       <th>Overtime Hours</th>
     </tr>
     {WeekTotal.map((val, key) => {
       return (
         <tr key={key}>
           <th>Total this Week</th>
           <th>{val.Regular}</th>
           <th>{val.Overtime}</th>
         </tr>
             )
     })}
   </table>
   </section>


   <section className='App-Timesheet'>
     <table>
       <tr>
         <th>Day of the Week</th>
         <th>Date</th> 
         <th>Clock In</th>
         <th>Clock out</th>  
         <th></th>
         <th>Clock In</th>
         <th>Clock out</th>
         <th></th>
         <th>Clock In</th>
         <th>Clock out</th>
         <th></th>
         <th>Project</th>
         <th>Regular</th>
         <th>Overtime</th>
       </tr>
         {data1.map((val, key) => {
           return (
             <tr key={key}>
               <td>{val.Day}</td>
               <td>{val.Date}</td>
               <td>{val.Clockin}</td>
               <td>{val.Clockout}</td>
               <td></td>
               <td>{val.Clockin}</td>
               <td>{val.Clockout}</td>
               <td></td>
               <td>{val.Clockin}</td>
               <td>{val.Clockout}</td>
               <td></td>
               <td>{val.Project}</td>
               <td>{val.Regular}</td>
               <td>{val.Overtime}</td>
             </tr>
             )
         })}

     </table>
   </section>


   <section className='App-TotalHours'>
   <table>
     <tr> 
       <th></th>
       <th>Regular Hours</th>
       <th>Overtime Hours</th>
     </tr>
     {WeekTotal.map((val, key) => {
       return (
         <tr key={key}>
           <th>Total this Week</th>
           <th>{val.Regular}</th>
           <th>{val.Overtime}</th>
         </tr>
             )
     })}
   </table>
   </section>

      
   <section className='App-PayPeriod'>
     <table>
       <tr> 
         <th></th>
         <th>Regular Hours</th>
         <th>Overtime Hours</th>
       </tr>
       {Paydata.map((val, key) => {
         return (
           <tr key={key}>
             <td>Total Per Period</td>
             <td>{val.PeriodRegular}</td>
             <td>{val.PeriodOvertime}</td>
           </tr>
               )
       })}
     </table>
   </section>


</div>
  )}

export default TimeSheet; 