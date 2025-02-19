"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Download } from "lucide-react";
import { toast } from "sonner"
import { Label } from "@/components/ui/label";

export default function YoutubeDownloader() {
  const [url, setUrl] = useState("");
  const [format, setFormat] = useState("mp4");
  const [loading, setLoading] = useState(false);
  const [downloadLink, setDownloadLink] = useState("");
  const [cookiesFile, setCookiesFile] = useState<File | null>(null);

  const handleDownload = async () => {
    if (!url || !cookiesFile) {
      toast.error("Please provide both a YouTube URL and cookies file.");
      return;
    }

    setLoading(true);
    setDownloadLink("");

    const formData = new FormData();
    formData.append("url", url);
    formData.append("format", format);
    formData.append("cookieFile", cookiesFile);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/download-video/`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        toast.error("Failed to download video.");
        return;
      }

      const blob = await response.blob();
      const fileUrl = URL.createObjectURL(blob);
      setDownloadLink(fileUrl);
      toast.success("Video downloaded successfully.");
    } catch (error) {
      toast.error("Failed to download video.");
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
            >
              MP4
            </Button>
            <Button
              variant={format === "mp3" ? "default" : "outline"}
              onClick={() => setFormat("mp3")}
            >
              MP3
            </Button>
          </div>
          <Label className="mb-2 block">Upload cookie files (.txt)*</Label>
          <Input
            type="file"
            accept=".txt"
            onChange={(e) => setCookiesFile(e.target.files?.[0] || null)}
          />
          <Button onClick={handleDownload} disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : <Download />} Convert to {format.toUpperCase()}
          </Button>
          {downloadLink && (
            <a
              href={downloadLink}
              download
              className="block text-blue-500 mt-2 text-center"
            >
              Click here to download
            </a>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
