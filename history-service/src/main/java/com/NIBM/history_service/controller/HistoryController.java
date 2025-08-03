package com.NIBM.history_service.controller;

import com.NIBM.history_service.entity.HistoryRecord;
import com.NIBM.history_service.service.HistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/history")
public class HistoryController {

    @Autowired
    private HistoryService service;

    @PostMapping("/add")
    public ResponseEntity<HistoryRecord> addRecord(@RequestBody HistoryRecord record) {
        return ResponseEntity.ok(service.saveRecord(record));
    }

    @GetMapping("/{patientCode}")
    public ResponseEntity<List<HistoryRecord>> getHistory(@PathVariable String patientCode) {
        return ResponseEntity.ok(service.getPatientHistory(patientCode));
    }
}
