package com.NIBM.booking_service.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@Entity
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String patientName;
    private String doctorId;
    private String bookingCode;
    private LocalDateTime bookingTime;
    private String status; // PENDING, CONFIRMED, COMPLETED, CANCELLED

    /**
     * Entity representing a patient booking in the Co-Doctor system.
     * Contains patient information, doctor assignment, booking code, and status.
     */

}
