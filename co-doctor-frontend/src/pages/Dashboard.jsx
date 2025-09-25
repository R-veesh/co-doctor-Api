import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Users, Calendar, Activity, Clock, LogOut, User } from 'lucide-react';
import { useAuthStore } from '../contexts/AuthContext';
import { doctorService, progressService } from '../services/authService';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuthStore();
  const [doctors, setDoctors] = useState([]);
  const [progress, setProgress] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (!isAuthenticated) { navigate('/login'); return; }
    fetchDashboardData();
  }, [isAuthenticated, navigate]);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      const [doctorsData, progressData] = await Promise.all([doctorService.getAllDoctors(), progressService.getAllProgress()]);
      setDoctors(doctorsData || []);
      setProgress(progressData || []);
    } catch (error) {
      toast.error('Failed to fetch dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => { logout(); toast.success('Logged out successfully'); navigate('/login'); };

  const stats = [
    { title: 'Total Doctors', value: doctors.length, icon: Users, color: 'bg-blue-100 text-blue-600' },
    { title: 'Active Bookings', value: progress.filter(p => p.status === 'IN_PROGRESS').length, icon: Calendar, color: 'bg-green-100 text-green-600' },
    { title: 'Completed Today', value: progress.filter(p => p.status === 'COMPLETED').length, icon: Activity, color: 'bg-medical-100 text-medical-600' },
    { title: 'Pending Queue', value: progress.filter(p => p.status === 'PENDING').length, icon: Clock, color: 'bg-yellow-100 text-yellow-600' },
  ];

  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-medical-600"></div></div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 z-10">
        <div className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-medical-600 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Co-Doctor</span>
          </div>
        </div>
        <nav className="px-4 pb-4">
          {['overview', 'doctors', 'bookings', 'progress'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors mt-1 capitalize ${activeTab === tab ? 'bg-medical-50 text-medical-700' : 'text-gray-600 hover:bg-gray-50'}`}>
              {tab === 'overview' && <Activity size={20} />}
              {tab === 'doctors' && <Users size={20} />}
              {tab === 'bookings' && <Calendar size={20} />}
              {tab === 'progress' && <Clock size={20} />}
              {tab}
            </button>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-gray-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user?.username || 'Doctor'}</p>
              <p className="text-xs text-gray-500">Medical Professional</p>
            </div>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-2">
            <LogOut size={20} />
            Sign Out
          </button>
        </div>
      </aside>

      <main className="ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening today.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Available Doctors</h2>
              <div className="space-y-4">
                {doctors.slice(0, 5).map((doctor) => (
                  <div key={doctor.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-medical-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-medical-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{doctor.name}</p>
                      <p className="text-sm text-gray-500">{doctor.specialization}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Current Queue</h2>
              <div className="space-y-4">
                {progress.slice(0, 5).map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{item.patientName}</p>
                        <p className="text-sm text-gray-500">Code: {item.bookingCode}</p>
                      </div>
                    </div>
                    <span className={`badge ${item.status === 'IN_PROGRESS' ? 'badge-warning' : item.status === 'COMPLETED' ? 'badge-success' : 'badge-info'}`}>{item.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
