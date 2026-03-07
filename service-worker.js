const CACHE_NAME = 'silabas-magicas-v1';
const urlsToCache = [
  './index.html',
  './estilos.css',
  './scripts.js',
  './words.json',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;600;700;800&family=Nunito:wght@400;600;700;800&display=swap'
];

// Instalar el service worker y cachear recursos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache).catch(err => {
          console.warn('Algunos recursos no pudieron cachearse:', err);
          // Cachear al menos los archivos locales
          return cache.addAll([
            './index.html',
            './estilos.css',
            './scripts.js',
            './words.json',
            './manifest.json'
          ]);
        });
      })
  );
  self.skipWaiting();
});

// Activar el service worker y limpiar cachés antiguas
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Interceptar requests y servir desde caché
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si está en caché, devolverlo
        if (response) {
          return response;
        }

        // Si no está en caché, hacer la request y cachearla
        return fetch(event.request).then(response => {
          // No cachear requests que no sean exitosas
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clonar la response para cachearla
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });

          return response;
        });
      })
      .catch(() => {
        // Si falla la request y no tiene caché, devolver una página offline
        return caches.match('./index.html');
      })
  );
});
