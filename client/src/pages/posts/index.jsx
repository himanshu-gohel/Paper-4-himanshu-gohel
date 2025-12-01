import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import api from '../../utils/api';
import PostCard from '../../components/PostCard';
import Link from 'next/link';

export default function Posts() {
  const router = useRouter();
  const { q } = router.query; 
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api
      .get('/posts', { params: { q } }) 
      .then((res) => setPosts(res.data.posts || res.data)) 
      .finally(() => setLoading(false));
  }, [q]); 

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All Posts</h1>
        <Link
          href="/posts/create"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
        >
          New Post
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900" />
        </div>
      ) : posts.length ? (
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No posts found.</p>
      )}
    </div>
  );
}