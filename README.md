
## FUTURE WORKS
- Needs to be moved from local host to the ip of AWS
- Better system encryption
- Implementation of API endpoint in chat bot. 
## SET-UP
-------------------------------------------------------
- After placing the downloaded repository into a directory open two terminals at the present working Directory
- Navigate in the terminals to the Backend and Frontend folders
- To start the application use the command "npm start"

## Configuration/Dependencies
- Each API call will need to be edited to a specific IP or it will just run on localhost port 5000 for the Backend and port 3000 for Frontend
- node.js will be required for the application to run
- All packages required for the application can be installed by using the command "npm install" in the Backend and Frontend terminals.

API ENDPOINTS FOR IMPLEMENTING IT INTO THE SYSTEM
-------------------------------------------------------
# Update Time Sheet from ChatBot
### API Route Details

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

### Response

### Success Response
- **Status Code:** 201
- **Content:** 
  ```json
  {
    "message": "Timesheet updated successfully.",
    "timesheet": "details"
  }
----------------------------------------------------

# User Endpoints
## Create User

## API Route Details

### Request
- **Method:** POST
- **URL:** /api/userData/post

### Parameters
- **Name** (String): Full name of the user.
- **Email** (String): Email address of the user. This must be included with almost all client requests to validate the request.
- **Password** (String): Password for the user account, which should be securely and randomly generated.
- **Role** (String): Role of the user within the system. Valid roles include:
  - Admin
  - Manager
  - Employee

## Response

### Success Response
- **Status Code:** 201
- **Content:** 
  ```json
  {
    "user": {
      "name": "John Doe",
      "email": "john.doe@example.com",
      "role": "Employee"
    }
  }

----------------------------------------------------
# Login

## API Route Details

### Request
- **Method:** POST
- **URL:** /api/userData/login/

### Parameters
- **Email** (String): Email address of the user. This parameter is crucial for almost all client requests as it helps the server to validate the request.
- **Password** (String): Password for the user's account.

## Response

### Success Response
- **Status Code:** 200
- **Content:** 
  ```json
  {
    "email": "user.email",
    "name": "user.name",
    "status": "user.status || 'Clocked Out'",
    "locked": "user.locked",
    "role": "user.role"
  }
----------------------------------------------------
# Get All Users

## API Route Details

### Request
- **Method:** POST
- **URL:** /api/userData/getAll

### Parameters
- None required for this request.

## Response

### Success Response
- **Status Code:** 200
- **Content:**
  ```json
  [
    {
      "id": "<The user's email>",
      "name": "<The user's name>",
      "status": "<The user's status>",
      "role": "<The user's role>",
      "locked": "<The user's access lock status>"
    }
  ]
----------------------------------------------------
# Toggle User Lock

## API Route Details

### Request
- **Method:** POST
- **URL:** /api/userData/toggleLock/:email

### Parameters
- **email** (String): The email address of the user whose lock status is to be toggled. This is included in the URL as a path parameter.

## Response

### Success Response
- **Status Code:** 200
- **Content:**
  ```json
  {
    "user": {
      "_id": "user's MongoDB ObjectId",
      "email": "user@example.com",
      "name": "User's Name",
      "role": "User's Role",
      "accessLock": true or false // Reflects the new lock state
    }
  }
----------------------------------------------------
# Toggle All User Locks

## API Route Details

### Request
- **Method:** PATCH
- **URL:** /api/userData/toggleAllLocks

### Parameters
- None required for this request.

## Response

### Success Response
- **Status Code:** 200
- **Content:**
  ```json
  {
    "message": "All users have been ${lockAll ? 'locked' : 'unlocked'}"
  }

----------------------------------------------------
# Delete User Data

## API Route Details

### Request
- **Method:** DELETE
- **URL:** /api/userData/delete

### Parameters
- **email** (String): The email address of the user whose data is to be deleted. This is included as a query parameter.

## Response

### Success Response
- **Status Code:** 200
- **Content:**
  ```json
  {
    "message": "User and timesheets updated successfully."
  }
----------------------------------------------------
# Edit User Data

## API Route Details

### Request
- **Method:** PATCH
- **URL:** /api/userData/patchUser/:email

### Parameters
- **Email** (Path Parameter): The email address of the user to be updated. This should be included in the URL.
- **Updated Data** (Body):
  ```json
  {
    "name": "string",
    "email": "string",
    "role": "admin|manager|employee"
  other user fields BUT NOT PASSWORD
  }
----------------------------------------------------

