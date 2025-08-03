package com.NIBM.booking_service.controller;

import com.NIBM.booking_service.entity.Booking;
import com.NIBM.booking_service.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping("/create")
    public Booking create(@RequestParam String patientName, @RequestParam String doctorId) {
        return bookingService.createBooking(patientName, doctorId);
    }

    @GetMapping("/status/{code}")
    public Optional<Booking> getStatus(@PathVariable String code) {
        return bookingService.getBookingByCode(code);
    }
}
