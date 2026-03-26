import app from "../src/index";

export const config = {
  runtime: "nodejs"
};

export default async function handler(request: Request): Promise<Response> {
  return app.fetch(request);
}
