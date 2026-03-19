package com.vitacare.appointmentservice.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "appointments")
@Data
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long doctorId;
    private Long patientId; // Corresponds to user_id from User Service

    @Column(nullable = false)
    private String appointmentDate; // Ex: "2023-11-01T10:00:00"

    private String status; // BOOKED, CANCELLED, COMPLETED
}
