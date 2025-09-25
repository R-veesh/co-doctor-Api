import api from './api';

export const authService = {
  login: async (username, password) => {
    const response = await api.post('/api/auth/login', { username, password });
    return response.data;
  },
  register: async (userData) => {
    const response = await api.post('/api/auth/register', userData);
    return response.data;
  },
};

export const doctorService = {
  getAllDoctors: async () => {
    const response = await api.get('/api/doctors/all');
    return response.data;
  },
  getDoctorById: async (id) => {
    const response = await api.get(`/api/doctors/${id}`);
    return response.data;
  },
  registerDoctor: async (doctorData) => {
    const response = await api.post('/api/doctors/register', doctorData);
    return response.data;
  },
};

export const bookingService = {
  createBooking: async (patientName, doctorId) => {
    const response = await api.post('/api/bookings/create', null, { params: { patientName, doctorId } });
    return response.data;
  },
  getBookingByCode: async (code) => {
    const response = await api.get(`/api/bookings/status/${code}`);
    return response.data;
  },
};

export const progressService = {
  getAllProgress: async () => {
    const response = await api.get('/api/progress/');
    return response.data;
  },
};

export const historyService = {
  getPatientHistory: async (patientCode) => {
    const response = await api.get(`/api/history/${patientCode}`);
    return response.data;
  },
};
