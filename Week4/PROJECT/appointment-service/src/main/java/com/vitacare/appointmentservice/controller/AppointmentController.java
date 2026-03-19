package com.vitacare.appointmentservice.controller;

import com.vitacare.appointmentservice.dto.BookingRequest;
import com.vitacare.appointmentservice.entity.Appointment;
import com.vitacare.appointmentservice.entity.Doctor;
import com.vitacare.appointmentservice.repository.AppointmentRepository;
import com.vitacare.appointmentservice.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "*")
public class AppointmentController {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @GetMapping("/health")
    public String health() {
        return "appointment-service is healthy";
    }

    @GetMapping("/doctors")
    public ResponseEntity<List<Doctor>> getDoctors() {
        return ResponseEntity.ok(doctorRepository.findAll());
    }

    @PostMapping("/doctors")
    public ResponseEntity<Doctor> addDoctor(@RequestBody Doctor doctor) {
        return ResponseEntity.ok(doctorRepository.save(doctor));
    }

    @PostMapping("/book")
    public ResponseEntity<?> bookAppointment(@RequestBody BookingRequest request) {
        // Simple logic to prevent double-booking
        if (appointmentRepository.findByDoctorIdAndAppointmentDate(
                request.getDoctorId(), request.getAppointmentDate()).isPresent()) {
            return ResponseEntity.badRequest().body("Slot is already booked");
        }
        
        // Ensure Doctor exists
        if (doctorRepository.findById(request.getDoctorId()).isEmpty()) {
            return ResponseEntity.badRequest().body("Doctor not found");
        }

        Appointment appt = new Appointment();
        appt.setDoctorId(request.getDoctorId());
        appt.setPatientId(request.getPatientId());
        appt.setAppointmentDate(request.getAppointmentDate());
        appt.setStatus("BOOKED");
        appointmentRepository.save(appt);

        return ResponseEntity.ok(appt);
    }
}
