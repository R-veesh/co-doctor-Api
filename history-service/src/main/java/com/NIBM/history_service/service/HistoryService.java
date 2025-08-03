package com.NIBM.history_service.service;

import com.NIBM.history_service.entity.HistoryRecord;
import com.NIBM.history_service.repository.HistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class HistoryService {

    @Autowired
    private HistoryRepository repository;

    public HistoryRecord saveRecord(HistoryRecord record) {
        record.setVisitDate(LocalDateTime.now());
        return repository.save(record);
    }

    public List<HistoryRecord> getPatientHistory(String patientCode) {
        return repository.findByPatientCode(patientCode);
    }
}
