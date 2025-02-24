
// import { useState } from "react";
// import { Search } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useToast } from "@/components/ui/use-toast";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// const Index = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [duration, setDuration] = useState("all");
//   const [sortBy, setSortBy] = useState("relevance");
//   // const [apiKey, setApiKey] = useState("");
//   const apiKey = import.meta.env.VITE_APP_API_KEY;
//   const [results, setResults] = useState<any[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const { toast } = useToast();

// console.log(apiKey)

//   const handleSearch = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!apiKey) {
//       toast({
//         title: "API Key Required",
//         description: "Please enter your YouTube API key to search for playlists",
//         variant: "destructive"
//       });
//       return;
//     }

//     if (!searchQuery.trim()) {
//       toast({
//         title: "Search Query Required",
//         description: "Please enter a search term",
//         variant: "destructive"
//       });
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const response = await fetch(
//         `https://www.googleapis.com/youtube/v3/search?part=snippet&type=playlist&q=${encodeURIComponent(
//           searchQuery
//         )}&order=${sortBy}&maxResults=10&key=${apiKey}`
//       );

//       if (!response.ok) {
//         throw new Error('Failed to fetch playlists');
//       }

//       const data = await response.json();
//       setResults(data.items);
      
//       if (data.items.length === 0) {
//         toast({
//           title: "No Results",
//           description: "No playlists found for your search query",
//           variant: "default"
//         });
//       }
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to search playlists. Please check your API key and try again.",
//         variant: "destructive"
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="container mx-auto px-6">
//       <div className="max-w-4xl mx-auto text-center mb-12 animate-fadeIn">
//         <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
//           Discover YouTube Playlists
//         </h1>
//         <p className="text-lg text-gray-400 mb-8">
//           Search, analyze, and manage YouTube playlists with powerful tools
//         </p>
        
//         <form onSubmit={handleSearch} className="glass p-6 rounded-xl space-y-4">
//           <div className="flex items-center gap-4">
//             <div className="flex-1">
//               <Input
//                 type="text"
//                 placeholder="Search for playlists..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full bg-white/5 border-white/10"
//               />
//             </div>
//             <Button type="submit" className="btn-primary" disabled={isLoading}>
//               <Search className="w-4 h-4 mr-2" />
//               {isLoading ? "Searching..." : "Search"}
//             </Button>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
//             <div className="space-y-2">
//               <Label htmlFor="duration">Duration</Label>
//               <Select value={duration} onValueChange={setDuration}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select duration" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">All Durations</SelectItem>
//                   <SelectItem value="short">Under 4 minutes</SelectItem>
//                   <SelectItem value="medium">4-20 minutes</SelectItem>
//                   <SelectItem value="long">Over 20 minutes</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
            
//             <div className="space-y-2">
//               <Label htmlFor="sortBy">Sort By</Label>
//               <Select value={sortBy} onValueChange={setSortBy}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Sort by..." />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="relevance">Relevance</SelectItem>
//                   <SelectItem value="date">Date</SelectItem>
//                   <SelectItem value="viewCount">View Count</SelectItem>
//                   <SelectItem value="rating">Rating</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//         </form>

//         {results.length > 0 && (
//           <div className="mt-8 space-y-4">
//             {results.map((item) => (
//               <div key={item.id.playlistId} className="glass p-4 rounded-lg flex gap-4">
//                 <img
//                   src={item.snippet.thumbnails.default.url}
//                   alt={item.snippet.title}
//                   className="w-24 h-24 object-cover rounded"
//                 />
//                 <div className="flex-1 text-left">
//                   <h3 className="font-semibold">{item.snippet.title}</h3>
//                   <p className="text-sm text-gray-400">{item.snippet.channelTitle}</p>
//                   <p className="text-sm text-gray-400 mt-2">{item.snippet.description}</p>
//                   <a
//                     href={`https://www.youtube.com/playlist?list=${item.id.playlistId}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-primary hover:underline text-sm"
//                   >
//                     View Playlist
//                   </a>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         <div className="mt-16 text-center">
//           <h2 className="text-2xl font-semibold mb-4">Start Your Free Trial</h2>
//           <p className="text-gray-400 mb-6">
//             Try TuneHunter free for 3 days. No credit card required.
//           </p>
//           <Button className="btn-primary">Start Free Trial</Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Index;



