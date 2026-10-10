const CACHE_NAME='aikolin-home-v1-1-cache-v5';

self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const response = await fetch(event.request, { cache: 'no-store' });
        const url = new URL(event.request.url);
        if (!response.ok || !response.headers.get('content-type')?.includes('text/html')) return response;
        if (!(url.pathname.endsWith('/') || url.pathname.endsWith('/index.html'))) return response;
        const html = await response.text();
        const injected = html.replace('</body>', '<script src="./approval-review-link.js"></script><script src="./today-control-link.js"></script></body>');
        return new Response(injected, {status: response.status, statusText: response.statusText, headers: response.headers});
      } catch (err) {
        return caches.match(event.request);
      }
    })());
    return;
  }

  event.respondWith(fetch(event.request));
});