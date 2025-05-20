package com.NIBM.progress_service.repository;

import com.NIBM.progress_service.entity.Progress;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProgressRepository extends JpaRepository<Progress, Long> {
    Optional<Progress> findByBookingCode(String bookingCode);
}
