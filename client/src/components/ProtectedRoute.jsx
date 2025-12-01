import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { isAuthenticated } from '../utils/auth';

export default function ProtectedRoute(Component) {
  return function Wrapper(props) {
    const router = useRouter();
    const [checked, setChecked] = useState(false);

    useEffect(() => {
      if (!isAuthenticated()) {
        router.replace('/auth/login');
      } else {
        setChecked(true);
      }
    }, [router]);

    if (!checked) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900" />
        </div>
      );
    }

    return <Component {...props} />;
  };
}