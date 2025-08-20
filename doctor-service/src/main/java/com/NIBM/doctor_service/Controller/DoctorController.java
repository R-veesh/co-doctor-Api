package com.NIBM.doctor_service.Controller;

import com.NIBM.doctor_service.Service.DoctorService;
import com.NIBM.doctor_service.entity.Doctor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctors")
public class DoctorController {

    @Autowired
    private DoctorService service;

    @PostMapping("/register")
    public ResponseEntity<Doctor> register(@RequestBody Doctor doctor) {
        return ResponseEntity.ok(service.saveDoctor(doctor));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Doctor>> getAll() {
        return ResponseEntity.ok(service.getAllDoctors());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Doctor> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getDoctorById(id));
    }

    @GetMapping("/specialization/{spec}")
    public ResponseEntity<List<Doctor>> getBySpecialization(@PathVariable String spec) {
        return ResponseEntity.ok(service.getBySpecialization(spec));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.deleteDoctor(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Doctor> update(@PathVariable Long id, @RequestBody Doctor doctor) {
        Doctor existingDoctor = service.getDoctorById(id);
        if (existingDoctor != null) {
            doctor.setId(id);
            return ResponseEntity.ok(service.saveDoctor(doctor));
        }
        return ResponseEntity.notFound().build();
    }
}
