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

END SYSTEM
