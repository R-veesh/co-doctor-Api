package com.NIBM.progress_service.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Setter
@Getter
@Entity
public class Progress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String bookingCode;
    private String doctorId;
    private String patientName;
    private LocalDateTime startTime;
    private String status; // e.g., IN_PROGRESS, COMPLETED

    // Getters and setters

}
