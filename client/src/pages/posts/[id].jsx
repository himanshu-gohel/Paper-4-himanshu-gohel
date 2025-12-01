import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import api from '../../utils/api';
import Link from 'next/link';
import ConfirmDialog from '../../components/ConfirmDialog';
import { isAuthenticated } from '../../utils/auth';

export default function PostDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [archiveOpen, setArchiveOpen] = useState(false);

  useEffect(() => {
    if (!id) return;
    api.get(`/posts/${id}`).then((res) => setPost(res.data));
  }, [id]);

  if (!post) {
    return (
      <div className="flex justify-center py-10">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900" />
      </div>
    );
  }

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';

 const handleArchive = async () => {
    await api.patch(`/posts/${id}/archive`);
    setArchiveOpen(false);
    router.push('/posts/archive');
  };

  const handleDelete = async () => {
    await api.delete(`/posts/${id}`);
    setDeleteOpen(false);
    router.push('/posts');
  };


  return (
    <div className="max-w-3xl mx-auto bg-white rounded shadow p-6">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-4">
        Created: {new Date(post.createdAt).toLocaleString()}
      </p>
      {post.image && (
        <img
          src={`${backendUrl}${post.image}`}
          alt={post.title}
          className="w-full max-h-96 object-cover rounded mb-4"
        />
      )}
      <div
        className="prose max-w-none mb-4"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      <div className="flex flex-wrap gap-4 text-sm text-gray-700">
        <span>
          <span className="font-semibold">Categories:</span>{' '}
          {post.categories || 'None'}
        </span>
        <span>
          <span className="font-semibold">Tags:</span> {post.tags || 'None'}
        </span>
        <span>
          <span className="font-semibold">Created by:</span> {post.author?.name}
        </span>
      </div>

      {isAuthenticated() && (
        <div className="mt-6 flex space-x-3">
          <Link
            href={`/posts/edit/${post.id}`}
            className="px-4 py-2 rounded bg-blue-600 text-white text-sm hover:bg-blue-700"
          >
            Edit
          </Link>
         <button
        onClick={() => setArchiveOpen(true)}
        className="px-4 py-2 rounded bg-yellow-500 text-white text-sm hover:bg-yellow-600"
      >
        Archive
      </button>
      <button
        onClick={() => setDeleteOpen(true)}
        className="px-4 py-2 rounded bg-red-600 text-white text-sm hover:bg-red-700"
      >
        Delete
      </button>
        </div>
      )}

      <ConfirmDialog
    open={archiveOpen}
    title="Archive Post"
    message="Are you sure you want to archive this post? It will be hidden but not permanently deleted."
    onConfirm={handleArchive}
    onCancel={() => setArchiveOpen(false)}
  />

  <ConfirmDialog
    open={deleteOpen}
    title="Delete Post"
    message="Are you sure you want to permanently delete this post? This action cannot be undone."
    onConfirm={handleDelete}
    onCancel={() => setDeleteOpen(false)}
  />
    </div>
  );
}