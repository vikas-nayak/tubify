"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Download, GithubIcon } from "lucide-react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { ColourfulText } from "@/components/ui/colourful-text";
import Link from "next/link";

export default function Hero() {
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
        toast.error("Failed to download.");
        return;
      }

      const blob = await response.blob();
      const fileUrl = URL.createObjectURL(blob);
      setDownloadLink(fileUrl);
      toast.success("Downloaded successfully.");
    } catch {
      toast.error("Failed to download.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col px-4 py-6 md:py-12 items-center">

      <div className="w-full flex flex-col sm:flex-row justify-between items-center px-4">
        <p className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500">
          Tubify
        </p>
        <Link
          href="https://github.com/vikas-nayak/tubify"
          target="_blank"
          className="mt-3 sm:mt-0 rounded-full px-4 py-2 bg-neutral-800 text-white flex items-center space-x-2 text-sm sm:text-base"
        >
          <GithubIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>Star this on GitHub ⭐</span>
        </Link>
      </div>


      <div className="text-center flex items-center justify-center mt-12 px-2">
        <h1 className="text-2xl sm:text-4xl max-w-lg font-bold text-white font-sans leading-tight">
          Just a little <ColourfulText text="better" /> YT to MP3 Converter
        </h1>
      </div>


      <div className="flex-grow flex items-center justify-center w-full mt-6">
        <Card className="w-full max-w-md mx-2 sm:mx-0">
          <CardContent className="p-4 space-y-4">
            <Input 
              placeholder="Enter YouTube URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="text-sm sm:text-base"
            />

            <div className="flex space-x-2 justify-center">
              <Button variant={format === "mp4" ? "default" : "outline"} onClick={() => setFormat("mp4")} className="px-4 py-2 sm:px-6 mb-4">
                MP4
              </Button>
              <Button variant={format === "mp3" ? "default" : "outline"} onClick={() => setFormat("mp3")} className="px-4 py-2 sm:px-6 mb-4">
                MP3
              </Button>
            </div>

            <Label className="text-sm sm:text-base">Upload a .txt file containing your cookies (see instructions below).</Label>
            <Input type="file" accept=".txt" onChange={(e) => setCookiesFile(e.target.files?.[0] || null)} />

            <Button onClick={handleDownload} disabled={loading} className="w-full py-2 sm:py-3">
              {loading ? <Loader2 className="animate-spin" /> : <Download />} Convert to {format.toUpperCase()}
            </Button>

            {downloadLink && (
              <a href={downloadLink} download className="block text-blue-500 mt-2 text-center text-sm sm:text-base">
                Click here to download
              </a>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
