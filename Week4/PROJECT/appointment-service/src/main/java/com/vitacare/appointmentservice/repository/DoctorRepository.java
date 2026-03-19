package com.vitacare.appointmentservice.repository;

import com.vitacare.appointmentservice.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {
}
