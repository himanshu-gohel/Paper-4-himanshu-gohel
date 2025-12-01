import Link from 'next/link';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [search, setSearch] = useState('');
  const router = useRouter();

  useEffect(() => {
    setIsLoggedIn(!!Cookies.get('token'));
  }, [router.pathname]);

  const handleLogout = () => {
    Cookies.remove('token');
    router.push('/auth/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/posts?q=${encodeURIComponent(search.trim())}`);
      setSearch('');
    }
  };

  return (
    <nav className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/" className="font-bold text-lg">
            BlogApp
          </Link>
          <Link href="/posts" className="hover:text-gray-300">
            Posts
          </Link>
          {isLoggedIn && (
            <>
              <Link href="/posts/create" className="hover:text-gray-300">
                Create
              </Link>
              <Link href="/posts/archive" className="hover:text-gray-300">
                Archive
              </Link>
            </>
          )}
        </div>
        {/* Search bar */}
        <form onSubmit={handleSearch} className="flex items-center space-x-2">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search posts..."
            className="px-2 py-1 rounded text-white border border-gray-300 focus:outline-none focus:ring w-36 md:w-48"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm"
          >
            Search
          </button>
        </form>
        <div className="flex items-center space-x-3 ml-4">
          {isLoggedIn ? (
            <>
              <Link href="/profile" className="hover:text-gray-300">
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm"
              >
                Login
              </Link>
              <Link
                href="/auth/signup"
                className="border border-gray-400 px-3 py-1 rounded text-sm hover:bg-gray-800"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}