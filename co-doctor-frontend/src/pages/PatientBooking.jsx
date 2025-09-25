import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Calendar, User, Stethoscope, CheckCircle, ArrowLeft } from 'lucide-react';
import { bookingService, doctorService } from '../services/authService';

export default function PatientBooking() {
  const [step, setStep] = useState(1);
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingResult, setBookingResult] = useState(null);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const selectedDoctor = watch('doctorId');

  const fetchDoctors = async () => {
    try {
      const data = await doctorService.getAllDoctors();
      setDoctors(data || []);
    } catch (error) {
      toast.error('Failed to fetch doctors');
    }
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const result = await bookingService.createBooking(data.patientName, data.doctorId);
      setBookingResult(result);
      setStep(3);
      toast.success('Booking created successfully!');
    } catch (error) {
      toast.error(error.response?.data || 'Failed to create booking');
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => { if (step === 1) fetchDoctors(); setStep(step + 1); };
  const prevStep = () => setStep(step - 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-50 to-primary-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="card">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-medical-100 rounded-full mb-4">
              <Calendar className="w-8 h-8 text-medical-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Book an Appointment</h1>
            <p className="text-gray-600 mt-2">Schedule your medical consultation</p>
          </div>

          <div className="flex items-center justify-center mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${step >= s ? 'bg-medical-600 text-white' : 'bg-gray-200 text-gray-600'}`}>{s}</div>
                {s < 3 && <div className={`w-16 h-1 mx-2 ${step > s ? 'bg-medical-600' : 'bg-gray-200'}`} />}
              </div>
            ))}
          </div>

          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Patient Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input type="text" {...register('patientName', { required: 'Patient name is required' })} className="input pl-10" placeholder="Enter patient full name" />
                </div>
                {errors.patientName && <p className="mt-1 text-sm text-red-600">{errors.patientName.message}</p>}
              </div>
              <button onClick={nextStep} className="w-full btn-medical">Continue</button>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">Select a Doctor</label>
                <div className="grid grid-cols-1 gap-4">
                  {doctors.map((doctor) => (
                    <label key={doctor.id} className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${selectedDoctor === String(doctor.id) ? 'border-medical-500 bg-medical-50' : 'border-gray-200 hover:border-medical-300'}`}>
                      <input type="radio" {...register('doctorId', { required: 'Please select a doctor' })} value={doctor.id} className="sr-only" />
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-12 h-12 bg-medical-100 rounded-full flex items-center justify-center">
                          <Stethoscope className="w-6 h-6 text-medical-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{doctor.name}</p>
                          <p className="text-sm text-medical-600">{doctor.specialization}</p>
                        </div>
                        {selectedDoctor === String(doctor.id) && <CheckCircle className="w-6 h-6 text-medical-600" />}
                      </div>
                    </label>
                  ))}
                </div>
                {errors.doctorId && <p className="mt-2 text-sm text-red-600">{errors.doctorId.message}</p>}
              </div>
              <div className="flex gap-4">
                <button type="button" onClick={prevStep} className="flex-1 btn-secondary flex items-center justify-center gap-2"><ArrowLeft size={20} /> Back</button>
                <button type="submit" disabled={isLoading} className="flex-1 btn-medical disabled:opacity-50">{isLoading ? 'Creating...' : 'Book Appointment'}</button>
              </div>
            </form>
          )}

          {step === 3 && bookingResult && (
            <div className="text-center space-y-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Booking Confirmed!</h2>
                <p className="text-gray-600 mt-2">Your appointment has been scheduled successfully.</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 text-left space-y-3">
                <div className="flex justify-between"><span className="text-gray-600">Booking Code:</span><span className="font-mono font-bold text-medical-600">{bookingResult.bookingCode}</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Patient:</span><span className="font-medium">{bookingResult.patientName}</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Status:</span><span className="badge badge-warning">{bookingResult.status}</span></div>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800"><strong>Important:</strong> Please save your booking code <strong>{bookingResult.bookingCode}</strong>.</p>
              </div>
              <button onClick={() => window.location.reload()} className="w-full btn-primary">Book Another Appointment</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
