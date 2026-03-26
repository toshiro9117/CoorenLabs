import app from "../src/index";

export const config = {
  runtime: "nodejs"
};

const readRequestBody = (req: any): Promise<Uint8Array | undefined> => {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];

    req.on("data", (chunk: Buffer | string) => {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    });

    req.on("end", () => {
      if (chunks.length === 0) {
        resolve(undefined);
        return;
      }

      resolve(Buffer.concat(chunks));
    });

    req.on("error", reject);
  });
};

export default async function handler(req: any, res: any): Promise<void> {
  try {
    const protocol = req.headers["x-forwarded-proto"] || "https";
    const host = req.headers.host || "localhost";
    const path = req.url || "/";
    const url = `${protocol}://${host}${path}`;

    const headers = new Headers();
    for (const [key, value] of Object.entries(req.headers || {})) {
      if (Array.isArray(value)) {
        for (const item of value) {
          headers.append(key, item);
        }
      } else if (value !== undefined) {
        headers.set(key, String(value));
      }
    }

    const method = req.method || "GET";
    const hasBody = method !== "GET" && method !== "HEAD";
    const body = hasBody ? await readRequestBody(req) : undefined;

    const request = new Request(url, {
      method,
      headers,
      body
    });

    const response = await app.fetch(request);

    res.statusCode = response.status;
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    const buffer = Buffer.from(await response.arrayBuffer());
    res.end(buffer);
  } catch (error) {
    console.error("[Vercel Handler] invocation error", error);
    res.statusCode = 500;
    res.setHeader("content-type", "application/json");
    res.end(JSON.stringify({ success: false, error: "Internal Server Error" }));
  }
}
