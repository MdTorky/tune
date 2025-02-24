import { useState } from "react";
import { Search, Download, Save, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [duration, setDuration] = useState("all");
  const [sortBy, setSortBy] = useState("relevance");
  const apiKey = import.meta.env.VITE_APP_API_KEY;
  const [results, setResults] = useState<any[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<any | null>(null);
  const [playlistVideos, setPlaylistVideos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [downloadOptions, setDownloadOptions] = useState({
    videoFormats: [],
    audioFormats: [],
    selectedVideoId: null,
  });

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your YouTube API key to search for playlists",
        variant: "destructive",
      });
      return;
    }
    if (!searchQuery.trim()) {
      toast({
        title: "Search Query Required",
        description: "Please enter a search term",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=playlist&q=${encodeURIComponent(
          searchQuery
        )}&order=${sortBy}&maxResults=10&key=${apiKey}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch playlists");
      }
      const data = await response.json();

      // Fetch additional playlist details
      const playlistIds = data.items.map((item: any) => item.id.playlistId);
      const playlistDetailsResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/playlists?part=contentDetails,snippet&id=${playlistIds.join(
          ","
        )}&key=${apiKey}`
      );
      if (!playlistDetailsResponse.ok) {
        throw new Error("Failed to fetch playlist details");
      }
      const playlistDetailsData = await playlistDetailsResponse.json();

      // Merge playlist details with search results
      const enrichedResults = data.items.map((item: any) => {
        const details = playlistDetailsData.items.find(
          (detail: any) => detail.id === item.id.playlistId
        );
        return {
          ...item,
          contentDetails: details?.contentDetails || {},
        };
      });

      setResults(enrichedResults);

      if (data.items.length === 0) {
        toast({
          title: "No Results",
          description: "No playlists found for your search query",
          variant: "default",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          "Failed to search playlists. Please check your API key and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };



  const fetchPlaylistVideos = async (playlistId: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=50&key=${apiKey}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch playlist items");
      }
      const data = await response.json();
      console.log("Playlist Videos API Response:", data);

      const videoIds = data.items.map((item: any) => item.snippet.resourceId.videoId);

      const videoDetailsResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoIds.join(",")}&key=${apiKey}`
      );
      if (!videoDetailsResponse.ok) {
        throw new Error("Failed to fetch video details");
      }
      const videoDetailsData = await videoDetailsResponse.json();

      const enrichedVideos = data.items.map((item: any) => {
        const videoDetails = videoDetailsData.items.find(
          (detail: any) => detail.id === item.snippet.resourceId.videoId
        );
        return {
          ...item,
          details: videoDetails || {},
        };
      });

      setPlaylistVideos(enrichedVideos);
      setSelectedPlaylist(playlistId);

      setTimeout(() => {
        const playlistSection = document.getElementById("playlist-videos");
        if (playlistSection) {
          playlistSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);

      toast({
        title: "Playlist Loaded",
        description: "The playlist videos have been successfully loaded.",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch playlist videos. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSavePlaylist = () => {
    // Implement saving logic here (e.g., store in localStorage or backend)
    toast({
      title: "Playlist Saved",
      description: "The playlist has been saved successfully.",
      variant: "success",
    });
  };

  const fetchDownloadOptions = async (videoId: string) => {
    try {
      const response = await fetch(`/api/download-options/${videoId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch download options");
      }
      const data = await response.json();
      setDownloadOptions({ ...data, selectedVideoId: videoId });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch download options. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDownloadVideo = async (formatId: string) => {
    const { selectedVideoId } = downloadOptions;
    if (!selectedVideoId) {
      toast({
        title: "Error",
        description: "No video selected for download.",
        variant: "destructive",
      });
      return;
    }

    window.location.href = `/api/download/${selectedVideoId}?formatId=${formatId}`;
  };

  const handleDownloadThumbnail = (thumbnailUrl: string, format: string) => {
    // Implement thumbnail download logic here
    window.open(thumbnailUrl, "_blank");
    toast({
      title: "Thumbnail Downloaded",
      description: `Downloading thumbnail in ${format} format.`,
      variant: "success",
    });
  };

  const handleDownloadMetadata = (video: any, format: string) => {
    const { snippet, details } = video;

    // Extract detailed metadata
    const title = snippet.title;
    const description = snippet.description || "N/A";
    const channelTitle = snippet.channelTitle;
    const tags = snippet.tags ? snippet.tags.join(", ") : "N/A";
    const categoryId = snippet.categoryId || "N/A";
    const publishedAt = snippet.publishedAt;

    // Extract statistics
    const viewCount = details.statistics?.viewCount || "N/A";
    const likeCount = details.statistics?.likeCount || "N/A";
    const commentCount = details.statistics?.commentCount || "N/A";

    // Extract content details
    const duration = details.contentDetails?.duration || "N/A"; // ISO 8601 format (e.g., PT1H30M)
    const formattedDuration = formatDuration(duration); // Helper function to format duration

    // Generate metadata
    const metadata = `
      Title: ${title}
      Description: ${description}
      Views: ${viewCount}
      Likes: ${likeCount}
      Comments: ${commentCount}
      Channel: ${channelTitle}
      Tags: ${tags}
      Category ID: ${categoryId}
      Length: ${formattedDuration}
      Published At: ${publishedAt}
    `;

    const blob = new Blob([metadata], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `metadata.${format}`;
    a.click();

    toast({
      title: "Metadata Downloaded",
      description: `Downloading metadata in ${format} format.`,
      variant: "default", // Use "default" instead of "success"
    });
  };

  // Helper function to format ISO 8601 duration (e.g., PT1H30M -> 1 hour 30 minutes)
  const formatDuration = (isoDuration: string): string => {
    const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return "N/A";

    const hours = match[1] ? `${match[1]} hour(s)` : "";
    const minutes = match[2] ? `${match[2]} minute(s)` : "";
    const seconds = match[3] ? `${match[3]} second(s)` : "";

    return [hours, minutes, seconds].filter(Boolean).join(" ");
  };

  return (
    <div className="container mx-auto px-6">
      <div className="max-w-4xl mx-auto text-center mb-12 animate-fadeIn">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Discover YouTube Playlists
        </h1>
        <p className="text-lg text-gray-400 mb-8">
          Search, analyze, and manage YouTube playlists with powerful tools
        </p>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="glass p-6 rounded-xl space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search for playlists..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border-white/10"
              />
            </div>
            <Button type="submit" className="btn-primary" disabled={isLoading}>
              <Search className="w-4 h-4 mr-2" />
              {isLoading ? "Searching..." : "Search"}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Durations</SelectItem>
                  <SelectItem value="short">Under 4 minutes</SelectItem>
                  <SelectItem value="medium">4-20 minutes</SelectItem>
                  <SelectItem value="long">Over 20 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sortBy">Sort By</Label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="viewCount">View Count</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>

        {/* Playlist Results */}
        {results.length > 0 && (
          <div className="mt-8 space-y-4">
            {results.map((item) => (
              <div
                key={item.id.playlistId}
                className="glass p-4 rounded-lg flex gap-4"
              >
                <img
                  src={item.snippet.thumbnails.default.url}
                  alt={item.snippet.title}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1 text-left w-[85%]">
                  <h3 className="font-semibold">{item.snippet.title}</h3>
                  <p className="text-sm text-gray-400">
                    {item.snippet.channelTitle}
                  </p>
                  <p className="text-sm text-gray-400 mt-2">
                    Videos: {item.contentDetails?.itemCount || "N/A"}
                  </p>
                  <div className="flex flex-col md:flex-row gap-2 mt-2">
                    <Button
                      onClick={() => fetchPlaylistVideos(item.id.playlistId)}
                      className="btn-primary"
                    >
                      Open Playlist
                    </Button>
                    <Button onClick={handleSavePlaylist} className="btn-secondary">
                      Save Playlist
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Playlist Videos */}
        {selectedPlaylist && (
          <div id="playlist-videos" className="mt-8 space-y-4">
            <h2 className="text-2xl font-semibold">Playlist Videos</h2>
            {playlistVideos
              .filter((video) => video.snippet?.thumbnails?.default?.url) // Filter out videos without thumbnails
              .map((video) => {
                const { snippet, details } = video;

                // Extract detailed metadata
                const viewCount = details.statistics?.viewCount || "N/A";
                const duration = details.contentDetails?.duration || "N/A"; // ISO 8601 format (e.g., PT1H30M)
                const formattedDuration = formatDuration(duration); // Helper function to format duration

                return (
                  <div
                    key={video.id}
                    className="glass p-4 rounded-lg flex md:flex-row flex-col gap-4 items-center"
                  >
                    {/* Video Thumbnail */}
                    <img
                      src={snippet.thumbnails.default.url || "/placeholder.jpg"}
                      alt={snippet.title || "No title available"}
                      className="w-[200px] h-[150px] md:w-20 md:h-20 object-cover rounded"
                    />

                    {/* Video Details */}
                    <div className="flex-1">
                      <h4 className="font-semibold">{snippet.title}</h4>
                      <p className="text-sm text-gray-400">{snippet.channelTitle}</p>
                      <p className="text-sm text-gray-400">
                        <span className="font-medium">Views:</span> {viewCount}
                      </p>
                      <p className="text-sm text-gray-400">
                        <span className="font-medium">Length:</span> {formattedDuration}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2">
                      {/* Download Video Button */}
                      <Button
                        onClick={() => fetchDownloadOptions(video.snippet.resourceId.videoId)}
                      >
                        <Download className="w-4 h-4 mr-2" /> Download Video
                      </Button>

                      {/* Download Thumbnail Button */}
                      <Button
                        onClick={() =>
                          handleDownloadThumbnail(snippet.thumbnails.default.url, "jpg")
                        }
                      >
                        <Download className="w-4 h-4 mr-2" /> Download Thumbnail
                      </Button>

                      {/* Download Metadata Button */}
                      <Button
                        onClick={() => handleDownloadMetadata(video, "txt")}
                        className="btn-secondary"
                      >
                        <Download className="w-4 h-4 mr-2" /> Download Metadata
                      </Button>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
      {downloadOptions.selectedVideoId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[400px]">
            <h3 className="text-xl font-semibold mb-4">Download Options</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">Video with Audio</h4>
                {downloadOptions.videoFormats.map((format: any) => (
                  <Button
                    key={format.format_id}
                    onClick={() => handleDownloadVideo(format.format_id)}
                    className="w-full mt-2"
                  >
                    {format.format_note || "Unknown Quality"}
                  </Button>
                ))}
              </div>
              <div>
                <h4 className="font-medium">Audio Only</h4>
                {downloadOptions.audioFormats.map((format: any) => (
                  <Button
                    key={format.format_id}
                    onClick={() => handleDownloadVideo(format.format_id)}
                    className="w-full mt-2"
                  >
                    {format.format_note || "Unknown Quality"}
                  </Button>
                ))}
              </div>
            </div>
            <Button
              onClick={() => setDownloadOptions({ videoFormats: [], audioFormats: [], selectedVideoId: null })}
              className="mt-4 w-full"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;