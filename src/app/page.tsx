"use client";
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

  const handleDownload = async () => {
    if (!url) return;
    setLoading(true);
    setDownloadLink("");

    try {
      const response = await fetch(`https://tubify-backend.onrender.com?url=${encodeURIComponent(url)}&format=${format}`);
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
