import { useRouter } from 'next/router';
import api from '../../utils/api';
import { setToken } from '../../utils/auth';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';


const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

export default function Login() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema)
  });
  const [error, setError] = useState('');
  const router = useRouter();

  const onSubmit = async (data) => {
    setError('');
    try {
      const res = await api.post('/auth/login', data);
      setToken(res.data.token);
      router.push('/posts');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 max-w-md w-full"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && (
          <div className="bg-red-100 text-red-700 px-3 py-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            {...register('email')}
            type="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring"
            autoComplete="email"
          />
          {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-1">Password</label>
          <input
            {...register('password')}
            type="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring"
            autoComplete="current-password"
          />
          {errors.password && <p className="text-red-600 text-xs mt-1">{errors.password.message}</p>}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
        <div className="mt-4 text-center">
          <Link href="/auth/signup" className="text-blue-600 hover:underline">
            Not registered?
          </Link>
        </div>
      </form>
    </div>
  );
}