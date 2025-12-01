import { useRouter } from 'next/router';
import PostEditor from '../../components/PostEditor';
import api from '../../utils/api';
import ProtectedRoute from '../../components/ProtectedRoute';

function CreatePostPage() {
  const router = useRouter();

  const handleSubmit = async (data) => {
    await api.post('/posts', data);
    router.push('/posts');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center">Create New Post</h1>
      <PostEditor onSubmit={handleSubmit} />
    </div>
  );
}

export default ProtectedRoute(CreatePostPage);