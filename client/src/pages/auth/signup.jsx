import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import api from '../../utils/api';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Link  from 'next/link';

const schema = yup.object().shape({
  name: yup.string().min(3).max(30).required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Must contain an uppercase letter')
    .matches(/[a-z]/, 'Must contain a lowercase letter')
    .matches(/[0-9]/, 'Must contain a number')
    .matches(/[@$!%*?&#]/, 'Must contain a special character')
    .required('Password is required'),
});

export default function Signup() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema)
  });
  const [error, setError] = useState('');
  const router = useRouter();

  const onSubmit = async (data) => {
    setError('');
    try {
      await api.post('/auth/signup', data);
      router.push('/auth/login');
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        {error && <div className="bg-red-100 text-red-700 px-3 py-2 rounded mb-4 text-sm">{error}</div>}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Name</label>
          <input {...register('name')} className="shadow border rounded w-full py-2 px-3" />
          {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Email</label>
          <input {...register('email')} type="email" className="shadow border rounded w-full py-2 px-3" />
          {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-1">Password</label>
          <input {...register('password')} type="password" className="shadow border rounded w-full py-2 px-3" />
          {errors.password && <p className="text-red-600 text-xs mt-1">{errors.password.message}</p>}
        </div>
        <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          {isSubmitting ? 'Signing up...' : 'Sign Up'}
        </button>
         <div className="mt-4 text-center">
          <Link href="/auth/login" className="text-blue-600 hover:underline">
            Already registered?
          </Link>
        </div>
      </form>
    </div>
  );
}