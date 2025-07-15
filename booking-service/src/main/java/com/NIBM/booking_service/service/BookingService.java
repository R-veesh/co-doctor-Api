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

    /**
     * Updates the status of a booking
     * @param bookingCode the unique booking code
     * @param status the new status (PENDING, CONFIRMED, COMPLETED, CANCELLED)
     * @return the updated booking if found
     */
    public Optional<Booking> updateBookingStatus(String bookingCode, String status) {
        Optional<Booking> bookingOpt = bookingRepository.findByBookingCode(bookingCode);
        if (bookingOpt.isPresent()) {
            Booking booking = bookingOpt.get();
            booking.setStatus(status);
            return Optional.of(bookingRepository.save(booking));
        }
        return Optional.empty();
    }
}
