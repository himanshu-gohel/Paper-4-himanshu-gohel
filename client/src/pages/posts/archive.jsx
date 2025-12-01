import { useEffect, useState } from 'react';
import api from '../../utils/api';
import PostCard from '../../components/PostCard';
import ProtectedRoute from '../../components/ProtectedRoute';

function ArchivePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch only archived (soft-deleted) posts
    api
      .get('/posts', { params: { archived: true } }) // backend should return posts where isDeleted: true
      .then((res) => setPosts(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Archived Posts</h1>
      {loading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900" />
        </div>
      ) : posts.length ? (
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} showRestore showDelete />
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No archived posts.</p>
      )}
    </div>
  );
}

export default ProtectedRoute(ArchivePage);