import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import api from '../utils/api';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

// Validation schema
const schema = yup.object().shape({
  title: yup.string().min(5, 'Title must be at least 5 characters').max(100, 'Title too long').required('Title is required'),
  content: yup.string().min(20, 'Content must be at least 20 characters').required('Content is required'),
  categories: yup.string().max(100, 'Categories too long'),
  tags: yup.string().max(100, 'Tags too long'),
});

export default function PostEditor({ onSubmit, initialData = {} }) {
  const [image, setImage] = useState(initialData.image || '');
  const [uploading, setUploading] = useState(false);

  const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting }, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: initialData.title || '',
      content: initialData.content || '',
      categories: initialData.categories || '',
      tags: initialData.tags || '',
    }
  });

  // For ReactQuill integration
  useEffect(() => {
    setValue('content', initialData.content || '');
  }, [initialData.content, setValue]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await api.post('/posts/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setImage(res.data.url);
    } catch (err) {
      alert('Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';

  const onFormSubmit = (data) => {
    onSubmit({ ...data, image });
    // Optionally reset form after submit
    // reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="bg-white p-6 rounded shadow max-w-3xl mx-auto space-y-4"
    >
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          {...register('title')}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
          placeholder="Post title"
        />
        {errors.title && <p className="text-red-600 text-xs mt-1">{errors.title.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Content</label>
        <ReactQuill
          value={watch('content')}
          onChange={val => setValue('content', val)}
          theme="snow"
        />
        {errors.content && <p className="text-red-600 text-xs mt-1">{errors.content.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Image</label>
        <input type="file" onChange={handleImageUpload} />
        {uploading && <p className="text-xs text-gray-500 mt-1">Uploading...</p>}
        {image && (
          <img
            src={`${backendUrl}${image}`}
            alt="Post"
            className="mt-2 w-48 h-32 object-cover rounded border"
          />
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Categories</label>
          <input
            {...register('categories')}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
            placeholder="e.g. Tech, Programming"
          />
          {errors.categories && <p className="text-red-600 text-xs mt-1">{errors.categories.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tags</label>
          <input
            {...register('tags')}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
            placeholder="e.g. JS, Node, Next.js"
          />
          {errors.tags && <p className="text-red-600 text-xs mt-1">{errors.tags.message}</p>}
        </div>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded"
        >
          {isSubmitting ? 'Saving...' : 'Save Post'}
        </button>
      </div>
    </form>
  );
}