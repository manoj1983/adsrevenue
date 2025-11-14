// netlify/edge-functions/notion-cache.ts

// 💡 1. 'Context' ko import karein
import type { Context } from "@netlify/edge-functions";

// 💡 2. 'context' ko function parameters mein add karein
export default async (request: Request, context: Context) => {
  const cacheKey = new URL(request.url).pathname;
  const cache = caches.default;

  let response = await cache.match(cacheKey);

  if (!response) {
    console.log(`Cache miss for ${cacheKey}, fetching from origin...`);
    
    // 💡 3. FIX: 'fetch(request.url)' ki jagah 'context.next()' ka istemaal karein
    // Yeh request ko asli 'notion-proxy' function tak bhejega.
    response = await context.next(); 

    // Response milne ke baad, use cache mein daalein
    response = new Response(response.body, response);
    response.headers.append("Cache-Control", "s-maxage=3600"); // 1 ghante ke liye cache karein
    await cache.put(cacheKey, response.clone());
  } else {
    console.log(`Cache hit for ${cacheKey}`);
  }
  
  return response;
};
