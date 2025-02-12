"use client"
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Download } from "lucide-react";

export default function YoutubeDownloader() {
  const [url, setUrl] = useState("");
  const [format, setFormat] = useState("mp4");
  const [loading, setLoading] = useState(false);
  const [downloadLink, setDownloadLink] = useState("");

  const API_BASE_URL = "https://railway.com/project/7b02454d-2364-4e9c-9db3-306db6e3a1a1/service/060ce2d9-72b6-4d86-bc4e-3a162c761f22?id=4c42fc6d-1f94-4919-9080-0faadc9fcb2c&";

  const handleDownload = async () => {
    if (!url) return;
    setLoading(true);
    setDownloadLink("");

    try {
      const response = await fetch(`${API_BASE_URL}/download?url=${encodeURIComponent(url)}&format=${format}`);
      if (!response.ok) throw new Error("Failed to download");
      
      const blob = await response.blob();
      const fileUrl = URL.createObjectURL(blob);
      setDownloadLink(fileUrl);
    } catch (error) {
      console.error("Download error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <Card>
        <CardContent className="p-4 space-y-4">
          <Input 
            placeholder="Enter YouTube URL" 
            value={url} 
            onChange={(e) => setUrl(e.target.value)}
          />
          <div className="flex space-x-2">
            <Button 
              variant={format === "mp4" ? "default" : "outline"} 
              onClick={() => setFormat("mp4")}
            >MP4</Button>
            <Button 
              variant={format === "mp3" ? "default" : "outline"} 
              onClick={() => setFormat("mp3")}
            >MP3</Button>
          </div>
          <Button onClick={handleDownload} disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : <Download />} Download
          </Button>
          {downloadLink && (
            <a 
              href={downloadLink} 
              download
              className="block text-blue-500 mt-2 text-center"
            >Click here to download</a>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
