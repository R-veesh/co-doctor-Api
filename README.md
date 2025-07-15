# 🔐 Auth Service – Co-Doctor System

## ✅ Technologies Used

- Java 17  
- Spring Boot 3.5.4  
- Spring Security (OAuth2 Resource Server)  
- Auth0 (for authentication and authorization)  
- JSON Web Token (JWT)  
- Maven  
- MySQL  
- Postman (for API testing)

  
  START SYSTEM

1. PATIENT REGISTRATION (PC App)
   - Receptionist enters patient details.
   - System generates:
       → Unique Patient Code
       → Booking Time & Queue Number
   - Save in Booking Service.

2. DOCTOR REGISTRATION (PC App)
   - Receptionist registers doctor profile and schedule.
   - Save in Doctor Service.

3. PATIENT VIEWS BOOKING (Mobile App)
   - Patient enters Unique Code.
   - System checks booking data (Booking Service).
   - Display:
       → Doctor Name
       → Booking Time
       → Current Queue Status (Live from Progress Service)

4. DOCTOR LOGIN (Web App)
   - Doctor enters credentials.
   - Auth Service verifies.
   - Display today’s patient list (from Booking Service).

5. CONSULTATION START (Web App)
   - Doctor clicks "Start" on next patient.
   - Progress Service updates:
       → Current Patient Number
       → Status = "In Progress"
   - System fetches:
       → Patient Profile
       → Past History (if available)

6. DOCTOR WRITES PRESCRIPTION
   - Doctor enters medications/suggestions.
   - Saved in History Service.
   - Consultation marked "Completed".

7. NEXT PATIENT ACTIVATED
   - Automatically moves to next queue number.
   - Updates visible on:
       → Doctor Web App
       → Patient Mobile App

8. RETURNING PATIENT (Future Visit)
   - Receptionist re-registers or finds previous record.
   - Doctor can see past prescriptions from History Service.

## API Documentation

### Auth Service (Port: 8083)
- POST `/api/auth/login` - Authenticate user and get JWT token
- POST `/api/auth/register` - Register new user

### Booking Service (Port: 8081)
- POST `/api/bookings/create` - Create new booking
- GET `/api/bookings/status/{code}` - Get booking status
- PUT `/api/bookings/update-status/{code}` - Update booking status

### Doctor Service (Port: 8082)
- POST `/api/doctors/register` - Register new doctor
- GET `/api/doctors/all` - Get all doctors
- GET `/api/doctors/{id}` - Get doctor by ID
- GET `/api/doctors/specialization/{spec}` - Get doctors by specialization

### Progress Service (Port: 8084)
- POST `/api/progress/start` - Start progress tracking
- POST `/api/progress/complete` - Mark progress as complete
- GET `/api/progress/` - Get all progress records
- GET `/api/progress/{bookingCode}` - Get progress by booking code

### History Service (Port: 8085)
- POST `/api/history/add` - Add medical history record
- GET `/api/history/{patientCode}` - Get patient history

## Database Configuration
Each service uses its own MySQL database:
- authServiceDB
- bookingServiceDB
- doctorServiceDB
- progressServiceDB
- historyServiceDB

END SYSTEM
