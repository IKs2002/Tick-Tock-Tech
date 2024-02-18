import React from 'react';
import './TimeSheet.css'

const data = [
  { Day: "Monday", Date: "## XXX ####" , Clockin1: "##:## AM" , Clockout1: "##:## AM"  , Clockin2: "##:## AM", Clockout2: "##:## AM", Clockin3: "##:## AM", Clockout3: "##:## AM", Project: "XXXXXXXXXXXXXX", Regular: "XX hrs", Overtime: "XX hrs"},
  { Day: "Tuesday", Date: "## XXX ####" , Clockin1: "##:## AM" , Clockout1: "##:## AM"  , Clockin2: "##:## AM", Clockout2: "##:## AM", Clockin3: "##:## AM", Clockout3: "##:## AM", Project: "XXXXXXXXXXXXXX", Regular: "XX hrs", Overtime: "XX hrs"},
  { Day: "Wednesday", Date: "## XXX ####" , Clockin1: "##:## AM" , Clockout1: "##:## AM"  , Clockin2: "##:## AM", Clockout2: "##:## AM", Clockin3: "##:## AM", Clockout3: "##:## AM", Project: "XXXXXXXXXXXXXX", Regular: "XX hrs", Overtime: "XX hrs"},
  { Day: "Thursday", Date: "## XXX ####" , Clockin1: "##:## AM" , Clockout1: "##:## AM"  , Clockin2: "##:## AM", Clockout2: "##:## AM", Clockin3: "##:## AM", Clockout3: "##:## AM", Project: "XXXXXXXXXXXXXX", Regular: "XX hrs", Overtime: "XX hrs"},
  { Day: "Friday", Date: "## XXX ####" , Clockin1: "##:## AM" , Clockout1: "##:## AM"  , Clockin2: "##:## AM", Clockout2: "##:## AM", Clockin3: "##:## AM", Clockout3: "##:## AM", Project: "XXXXXXXXXXXXXX", Regular: "XX hrs", Overtime: "XX hrs"},
  { Day: "Saturday", Date: "## XXX ####" , Clockin1: "##:## AM" , Clockout1: "##:## AM"  , Clockin2: "##:## AM", Clockout2: "##:## AM", Clockin3: "##:## AM", Clockout3: "##:## AM", Project: "XXXXXXXXXXXXXX", Regular: "XX hrs", Overtime: "XX hrs"},
  { Day: "Sunday", Date: "## XXX ####" , Clockin1: "##:## AM" , Clockout1: "##:## AM"  , Clockin2: "##:## AM", Clockout2: "##:## AM", Clockin3: "##:## AM", Clockout3: "##:## AM", Project: "XXXXXXXXXXXXXX", Regular: "XX hrs", Overtime: "XX hrs"}
]

const data1 = [
  { Day: "Monday", Date: "## XXX ####" , Clockin1: "##:## AM" , Clockout1: "##:## AM"  , Clockin2: "##:## AM", Clockout2: "##:## AM", Clockin3: "##:## AM", Clockout3: "##:## AM", Project: "XXXXXXXXXXXXXX", Regular: "XX hrs", Overtime: "XX hrs"},
  { Day: "Tuesday", Date: "## XXX ####" , Clockin1: "##:## AM" , Clockout1: "##:## AM"  , Clockin2: "##:## AM", Clockout2: "##:## AM", Clockin3: "##:## AM", Clockout3: "##:## AM", Project: "XXXXXXXXXXXXXX", Regular: "XX hrs", Overtime: "XX hrs"},
  { Day: "Wednesday", Date: "## XXX ####" , Clockin1: "##:## AM" , Clockout1: "##:## AM"  , Clockin2: "##:## AM", Clockout2: "##:## AM", Clockin3: "##:## AM", Clockout3: "##:## AM", Project: "XXXXXXXXXXXXXX", Regular: "XX hrs", Overtime: "XX hrs"},
  { Day: "Thursday", Date: "## XXX ####" , Clockin1: "##:## AM" , Clockout1: "##:## AM"  , Clockin2: "##:## AM", Clockout2: "##:## AM", Clockin3: "##:## AM", Clockout3: "##:## AM", Project: "XXXXXXXXXXXXXX", Regular: "XX hrs", Overtime: "XX hrs"},
  { Day: "Friday", Date: "## XXX ####" , Clockin1: "##:## AM" , Clockout1: "##:## AM"  , Clockin2: "##:## AM", Clockout2: "##:## AM", Clockin3: "##:## AM", Clockout3: "##:## AM", Project: "XXXXXXXXXXXXXX", Regular: "XX hrs", Overtime: "XX hrs"},
  { Day: "Saturday", Date: "## XXX ####" , Clockin1: "##:## AM" , Clockout1: "##:## AM"  , Clockin2: "##:## AM", Clockout2: "##:## AM", Clockin3: "##:## AM", Clockout3: "##:## AM", Project: "XXXXXXXXXXXXXX", Regular: "XX hrs", Overtime: "XX hrs"},
  { Day: "Sunday", Date: "## XXX ####" , Clockin1: "##:## AM" , Clockout1: "##:## AM"  , Clockin2: "##:## AM", Clockout2: "##:## AM", Clockin3: "##:## AM", Clockout3: "##:## AM", Project: "XXXXXXXXXXXXXX", Regular: "XX hrs", Overtime: "XX hrs"}

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
  <section className='Timesheet-Table'>
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
               <td>{val.Clockin1}</td>
               <td>{val.Clockout1}</td>
               <td></td>
               <td>{val.Clockin2}</td>
               <td>{val.Clockout2}</td>
               <td></td>
               <td>{val.Clockin3}</td>
               <td>{val.Clockout3}</td>
               <td></td>
               <td>{val.Project}</td>
               <td>{val.Regular}</td>
               <td>{val.Overtime}</td>
             </tr>
             )
         })}

     </table>
   </section>


   <section className='Timesheet-TotalHours'>
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


   <section className='Timesheet-Table'>
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
            <td>{val.Clockin1}</td>
            <td>{val.Clockout1}</td>
            <td></td>
            <td>{val.Clockin2}</td>
            <td>{val.Clockout2}</td>
            <td></td>
            <td>{val.Clockin3}</td>
            <td>{val.Clockout3}</td>
            <td></td>
            <td>{val.Project}</td>
            <td>{val.Regular}</td>
            <td>{val.Overtime}</td>
          </tr>
             )
         })}

     </table>
   </section>


   <section className='Timesheet-TotalHours'>
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

      
   <section className='Timesheet-PayPeriod'>
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