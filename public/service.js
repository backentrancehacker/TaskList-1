const CACHE_NAME = "version-1";
const urlsToCache = [
    'index.html',
    'prevent.js',
	'register.js'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request).then((response) => {
					cache.put(event.request, response.clone());
					return response;
				})
            }
        )
    );
});

self.addEventListener('activate', (event) => {
    let cacheWhitelist = []; 
    cacheWhitelist.push(CACHE_NAME);
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName))  return caches.delete(cacheName);
                })
            );
        })
    );
});
