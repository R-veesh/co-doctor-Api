package com.NIBM.progress_service.controller;

import com.NIBM.progress_service.entity.Progress;
import com.NIBM.progress_service.service.ProgressService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/progress")
public class ProgressController {
    private final ProgressService service;

    public ProgressController(ProgressService service) {
        this.service = service;
    }

    @PostMapping("/start")
    public Progress start(@RequestParam String bookingCode,
                          @RequestParam String doctorId,
                          @RequestParam String patientName) {
        return service.startProgress(bookingCode, doctorId, patientName);
    }

    @PostMapping("/complete")
    public Progress complete(@RequestParam String bookingCode) {
        return service.completeProgress(bookingCode);
    }

    @GetMapping
    public List<Progress> getAll() {
        return service.getAllProgress();
    }

    @GetMapping("/{bookingCode}")
    public Progress getByCode(@PathVariable String bookingCode) {
        return service.getProgressByBookingCode(bookingCode).orElse(null);
    }
}
