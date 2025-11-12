export default async (request: Request) => {
  const cacheKey = new URL(request.url).pathname;
  const cache = caches.default;
  let response = await cache.match(cacheKey);
  if (!response) {
    response = await fetch(request.url);
    response = new Response(response.body, response);
    response.headers.append("Cache-Control", "s-maxage=3600"); // cache 1 hour
    await cache.put(cacheKey, response.clone());
  }
  return response;
};
