import Link from 'next/link';

export default function PostCard({ post }) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';

  return (
    <div className="bg-white rounded shadow p-4 flex flex-col md:flex-row gap-4 hover:shadow-md transition">
      {post.image && (
        <img
          src={`${backendUrl}${post.image}`}
          alt={post.title}
          className="w-32 h-24 object-cover rounded border"
        />
      )}
      <div className="flex-1">
        <Link
          href={`/posts/${post.id}`}
          className="text-lg font-semibold text-blue-700 hover:underline"
        >
          {post.title}
        </Link>
        <p className="text-sm text-gray-500 mt-1">
          {post.categories || 'Uncategorized'}
        </p>
        <p
          className="text-sm text-gray-700 mt-2 line-clamp-2"
          dangerouslySetInnerHTML={{
            __html: (post.content || '').slice(0, 150) + '...',
          }}
        />
      </div>
    </div>
  );
}