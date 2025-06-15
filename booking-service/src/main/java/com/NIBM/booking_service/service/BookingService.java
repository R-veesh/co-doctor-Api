package com.NIBM.booking_service.service;

import com.NIBM.booking_service.entity.Booking;
import com.NIBM.booking_service.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    public Booking createBooking(String patientName, String doctorId) {
        Booking booking = new Booking();
        booking.setPatientName(patientName);
        booking.setDoctorId(doctorId);
        booking.setBookingCode(UUID.randomUUID().toString().substring(0, 8));
        booking.setBookingTime(LocalDateTime.now());
        booking.setStatus("PENDING");

        return bookingRepository.save(booking);
    }

    public Optional<Booking> getBookingByCode(String code) {
        return bookingRepository.findByBookingCode(code);
    }
}
