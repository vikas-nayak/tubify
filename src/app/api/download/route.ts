export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get("url");
    const format = searchParams.get("format") || "mp4";
  
    if (!url) {
      return new Response(JSON.stringify({ error: "Missing URL" }), { status: 400 });
    }
  
    const apiUrl = `https://tubify-atp5.onrender.com/download?url=${encodeURIComponent(url)}&format=${format}`;
    const response = await fetch(apiUrl);
  
    if (!response.ok) {
      return new Response(JSON.stringify({ error: "Download failed" }), { status: 500 });
    }
  
    return response;
  }
  