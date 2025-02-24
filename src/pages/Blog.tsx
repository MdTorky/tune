
const Blog = () => {
  const posts = [
    {
      title: "Getting Started with TuneHunter",
      date: "March 1, 2024",
      excerpt: "Learn how to make the most of TuneHunter's features for managing YouTube playlists.",
      category: "Tutorial"
    },
    {
      title: "Best Practices for Playlist Management",
      date: "February 28, 2024",
      excerpt: "Tips and tricks for organizing and managing your YouTube playlists effectively.",
      category: "Tips"
    },
    {
      title: "New Features Update",
      date: "February 25, 2024",
      excerpt: "Check out the latest features and improvements in TuneHunter.",
      category: "News"
    }
  ];

  return (
    <div className="container mx-auto px-6">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Blog
        </h1>
        <p className="text-lg text-gray-400">
          Latest news, tutorials, and updates from TuneHunter
        </p>
      </div>

      <div className="grid gap-8 max-w-5xl mx-auto">
        {posts.map((post) => (
          <article
            key={post.title}
            className="glass p-8 rounded-xl transition-transform hover:scale-105"
          >
            <div className="text-sm text-primary mb-2">{post.category}</div>
            <h2 className="text-2xl font-bold mb-3">{post.title}</h2>
            <p className="text-gray-400 mb-4">{post.excerpt}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">{post.date}</span>
              <button className="btn-primary">Read More</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Blog;
