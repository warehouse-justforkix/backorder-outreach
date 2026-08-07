// v2 — network-first: always load the latest app, no manual hard-refresh needed.
self.addEventListener("install", function(e){ self.skipWaiting(); });
self.addEventListener("activate", function(e){ e.waitUntil(self.clients.claim()); });
self.addEventListener("fetch", function(e){
  if (e.request.method !== "GET") return;
  if (e.request.mode === "navigate" || e.request.destination === "document") {
    // force a fresh copy of the page from the network, bypassing the HTTP cache
    e.respondWith(
      fetch(e.request, {cache: "reload"}).catch(function(){ return fetch(e.request); })
    );
  }
});
