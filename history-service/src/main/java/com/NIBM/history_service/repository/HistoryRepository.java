package com.NIBM.history_service.repository;

import com.NIBM.history_service.entity.HistoryRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface HistoryRepository extends JpaRepository<HistoryRecord, Long> {
    List<HistoryRecord> findByPatientCode(String patientCode);
}
