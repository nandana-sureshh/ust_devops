package com.vitacare.appointmentservice.dto;

import lombok.Data;

@Data
public class BookingRequest {
    private Long doctorId;
    private Long patientId;
    private String appointmentDate;
}
