
import { Download, Search, Video, Calendar, Filter } from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Advanced Search",
    description: "Search playlists by keywords, categories, duration, and more",
  },
  {
    icon: Video,
    title: "Video Management",
    description: "Download videos, thumbnails, and transcripts in various formats",
  },
  {
    icon: Download,
    title: "Bulk Downloads",
    description: "Download entire playlists with just one click",
  },
  {
    icon: Calendar,
    title: "Latest Content",
    description: "Filter playlists by publication date and stay up to date",
  },
  {
    icon: Filter,
    title: "Smart Filters",
    description: "Find exactly what you need with our powerful filtering system",
  },
];

const Features = () => {
  return (
    <div className="container mx-auto px-6">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Features
        </h1>
        <p className="text-lg text-gray-400">
          Discover what makes TuneHunter the best YouTube playlist management tool
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {features.map((feature, index) => (
          <div
            key={index}
            className="glass p-6 rounded-xl transition-transform hover:scale-105"
          >
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <feature.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-400">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
