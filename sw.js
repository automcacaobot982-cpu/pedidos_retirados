// Service worker do app "Registro de Retirada"
// Guarda os arquivos do app para abrir mesmo sem internet.
// O envio do pedido (POST para o Google) SEMPRE vai pela rede.

const CACHE = 'retirada-v1';

const ARQUIVOS = [
  './',
  './index.html',
  './manifest.json',
  './html5-qrcode.min.js',
  './icon-192.png',
  './icon-512.png'
];

// Instala e guarda os arquivos do app
self.addEventListener('install', function (evento) {
  evento.waitUntil(
    caches.open(CACHE)
      .then(function (cache) { return cache.addAll(ARQUIVOS); })
      .then(function () { return self.skipWaiting(); })
  );
});

// Remove versões antigas do cache
self.addEventListener('activate', function (evento) {
  evento.waitUntil(
    caches.keys().then(function (chaves) {
      return Promise.all(
        chaves.filter(function (c) { return c !== CACHE; })
              .map(function (c) { return caches.delete(c); })
      );
    }).then(function () { return self.clients.claim(); })
  );
});

// Intercepta as requisições
self.addEventListener('fetch', function (evento) {
  var req = evento.request;

  // Só mexe em GET. O envio do pedido é POST -> deixa ir direto pela rede.
  if (req.method !== 'GET') return;

  var url = new URL(req.url);

  // Nunca guarda chamadas do Google Apps Script -> sempre pela rede
  if (url.hostname.indexOf('script.google.com') !== -1 ||
      url.hostname.indexOf('googleusercontent.com') !== -1) {
    return;
  }

  // Para o resto: usa o cache primeiro, e busca na rede se não tiver
  evento.respondWith(
    caches.match(req).then(function (guardado) {
      return guardado || fetch(req).catch(function () { return guardado; });
    })
  );
});
