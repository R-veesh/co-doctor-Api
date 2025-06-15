package com.NIBM.progress_service.service;

import com.NIBM.progress_service.entity.Progress;
import com.NIBM.progress_service.repository.ProgressRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ProgressService {
    private final ProgressRepository repository;

    public ProgressService(ProgressRepository repository) {
        this.repository = repository;
    }

    public Progress startProgress(String bookingCode, String doctorId, String patientName) {
        Progress progress = new Progress();
        progress.setBookingCode(bookingCode);
        progress.setDoctorId(doctorId);
        progress.setPatientName(patientName);
        progress.setStartTime(LocalDateTime.now());
        progress.setStatus("IN_PROGRESS");
        return repository.save(progress);
    }

    public Progress completeProgress(String bookingCode) {
        Optional<Progress> progressOpt = repository.findByBookingCode(bookingCode);
        if (progressOpt.isPresent()) {
            Progress progress = progressOpt.get();
            progress.setStatus("COMPLETED");
            return repository.save(progress);
        }
        return null;
    }

    public List<Progress> getAllProgress() {
        return repository.findAll();
    }

    public Optional<Progress> getProgressByBookingCode(String bookingCode) {
        return repository.findByBookingCode(bookingCode);
    }
}
