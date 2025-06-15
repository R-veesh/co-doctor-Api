package com.NIBM.doctor_service.Service;

import com.NIBM.doctor_service.Repository.DoctorRepository;
import com.NIBM.doctor_service.entity.Doctor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorService {

    @Autowired
    private DoctorRepository repository;

    public Doctor saveDoctor(Doctor doctor) {
        return repository.save(doctor);
    }

    public List<Doctor> getAllDoctors() {
        return repository.findAll();
    }

    public Doctor getDoctorById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public List<Doctor> getBySpecialization(String spec) {
        return repository.findBySpecialization(spec);
    }

    public void deleteDoctor(Long id) {
        repository.deleteById(id);
    }
}
