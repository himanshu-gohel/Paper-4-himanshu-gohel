import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import api from '../../../utils/api';
import PostEditor from '../../../components/PostEditor';
import VersionHistory from '../../../components/VersionHistory';
import ProtectedRoute from '../../../components/ProtectedRoute';

function EditPostPage() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState(null);
  const [versions, setVersions] = useState([]);

  useEffect(() => {
    if (!id) return;
    api.get(`/posts/${id}`).then((res) => setPost(res.data));
    api.get(`/posts/${id}/versions`).then((res) => setVersions(res.data));
  }, [id]);

  const handleSubmit = async (data) => {
    await api.put(`/posts/${id}`, data);
    router.push(`/posts/${id}`);
  };

  if (!post) {
    return (
      <div className="flex justify-center py-10">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Edit Post</h1>
      <PostEditor onSubmit={handleSubmit} initialData={post} />
      <VersionHistory versions={versions} />
    </div>
  );
}

export default ProtectedRoute(EditPostPage);