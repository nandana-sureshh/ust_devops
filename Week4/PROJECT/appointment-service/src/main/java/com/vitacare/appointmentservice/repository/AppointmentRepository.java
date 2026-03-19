package com.vitacare.appointmentservice.repository;

import com.vitacare.appointmentservice.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByDoctorId(Long doctorId);
    List<Appointment> findByPatientId(Long patientId);
    Optional<Appointment> findByDoctorIdAndAppointmentDate(Long doctorId, String appointmentDate);
}
