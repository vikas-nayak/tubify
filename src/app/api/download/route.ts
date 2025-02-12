export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get("url");
    const format = searchParams.get("format") || "mp4";
  
    if (!url) {
      return new Response(JSON.stringify({ error: "Missing URL" }), { status: 400 });
    }
  
    const apiUrl = `https://railway.com/project/7b02454d-2364-4e9c-9db3-306db6e3a1a1/service/060ce2d9-72b6-4d86-bc4e-3a162c761f22?id=4c42fc6d-1f94-4919-9080-0faadc9fcb2c&/download?url=${encodeURIComponent(url)}&format=${format}`;
    const response = await fetch(apiUrl);
  
    if (!response.ok) {
      return new Response(JSON.stringify({ error: "Download failed" }), { status: 500 });
    }
  
    return response;
  }
  