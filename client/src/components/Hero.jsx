import Link  from "next/link";

export default function Hero() {
  return (
    <section className=" py-16 px-4 text-center ">
      <h1 className="text-4xl md:text-5xl font-extrabold text-blue-800 mb-4">
        Blog App
      </h1>
      <p className="text-lg md:text-xl text-blue-700 mb-6 max-w-2xl mx-auto">
        Share your thoughts, ideas, and stories with the world.  
        Create, edit, and manage your posts with ease.  
        <span className="block mt-2">Start your blogging journey today!</span>
      </p>
      <div className="flex justify-center gap-4">
        <Link
          href="/posts/create"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded shadow transition"
        >
          Create a Post
        </Link>
        <Link
          href="/posts"
          className="bg-white border border-blue-600 text-blue-700 font-semibold px-6 py-3 rounded shadow hover:bg-blue-50 transition"
        >
          View Posts
        </Link>
      </div>
    </section>
  );
}