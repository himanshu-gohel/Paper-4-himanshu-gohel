import { useEffect, useState } from 'react';
import api from '../utils/api';
import ProtectedRoute from '../components/ProtectedRoute';

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/auth/me')
      .then(res => setUser(res.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);


  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-xl mx-auto bg-white rounded shadow p-6">
        <h1 className="text-2xl font-bold mb-2">Profile</h1>
        <p className="text-red-600">Could not load user info.</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto bg-white rounded shadow p-6">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="mb-6">
        <div className="mb-2">
          <span className="font-semibold">Name:</span> {user.name}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Email:</span> {user.email}
        </div>
      </div>
    </div>
  );
}

export default ProtectedRoute(ProfilePage);