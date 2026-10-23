'use strict';

const VERSION = 'jasapro-v1.2.0';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './styles.css',
  './fonts.css',
  './app.js',
  './logo.js',
  './logo-default.png',
  './pwa.js',
  './intro.js',
  './intro-data.js',
  './html2canvas.min.js',
  './jspdf.umd.min.js',
  './lottie.min.js',
  './favicon-32.png',
  './favicon-64.png',
  './apple-touch-icon.png',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png',
  './screenshot-desktop.png',
  './screenshot-mobile.png',
  './inter-400-6ab57b.woff2',
  './merriweather-400-8d568b.woff2',
  './montserrat-400-49e242.woff2',
  './poppins-400-e6a077.woff2',
  './poppins-500-57e843.woff2',
  './poppins-600-93818c.woff2',
  './poppins-700-742b18.woff2',
  './poppins-800-d0e6a9.woff2'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(VERSION).then(cache => cache.addAll(APP_SHELL)));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== VERSION).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(VERSION).then(cache => cache.put('./index.html', copy));
          }
          return response;
        })
        .catch(async () => (await caches.match('./index.html')) || (await caches.match(request)))
    );
    return;
  }

  event.respondWith(
    caches.match(request, { ignoreSearch: true }).then(cached => {
      if (cached) return cached;
      return fetch(request).then(response => {
        if (response.ok && response.type === 'basic') {
          const copy = response.clone();
          caches.open(VERSION).then(cache => cache.put(request, copy));
        }
        return response;
      });
    })
  );
});
