FINAL ACTION ITEMS
- Needs to be moved from local host to the ip of AWS
- Better system encryption
- Implementation of API endpoint in chat bot. 

API ENDPOINTS FOR IMPLEMENTING IT INTO THE SYSTEM
# Update Time Sheet from ChatBot
## API Route Details

### Request
- **Method:** GET
- **URL:** /api/timeData/updateTimesheetFromChatbot/:email&:status&:clockin

### Parameters
- **email** (String): User's email address.
- **status** (String): Status of the time entry, valid values include:
  - Meal
  - Break
  - Clocked In
  - Clocked Out
- **clockIn** (String): Time of the clock-in action, formatted as '5:00 PM' or '7:00 AM'.

## Response

### Success Response
- **Status Code:** 201
- **Content:** 
  ```json
  {
    "message": "Timesheet updated successfully.",
    "timesheet": "details"
  }
