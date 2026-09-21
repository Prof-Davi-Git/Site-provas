const CACHE_NAME = "site-provas-v20260921-07";
const ARQUIVOS = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./forms-config.js",
  "./forms-envio.js",
  "./questoes-frontend.js",
  "./questoes-mobile.js",
  "./questoes-versionamento.js",
  "./questoes-banco-dados.js",
  "./questoes-carreiras.js",
  "./questoes-redes.js",
  "./material-interno.js",
  "./prova-joao-prado.js",
  "./recuperacao.js",
  "./bloqueio-local.js",
  "./backend-apps-script.js",
  "./envio-oficial.js"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ARQUIVOS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(chaves => Promise.all(chaves.filter(chave => chave !== CACHE_NAME).map(chave => caches.delete(chave))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);

  if (url.origin === self.location.origin && url.pathname.endsWith("/ping.txt")) {
    event.respondWith(fetch(request));
    return;
  }

  if (url.origin !== self.location.origin) return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    try {
      const resposta = await fetch(request, { cache: "no-store" });
      if (resposta && resposta.ok) cache.put(request, resposta.clone());
      return resposta;
    } catch (e) {
      const emCache = await cache.match(request, { ignoreSearch: true });
      if (emCache) return emCache;
      if (request.mode === "navigate") {
        const pagina = await cache.match("./index.html", { ignoreSearch: true });
        if (pagina) return pagina;
      }
      throw e;
    }
  })());
});
