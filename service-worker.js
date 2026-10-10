// ===== SERVICE WORKER v220 =====
var CACHE_NAME = "krohlupic-v220";
var URLS = [
  "./",
  "./index.html",
  "./style.css",
  "./game.js",
  "./lang.js",
  "./manifest.json",
  "./krohlupic.jpg",
  "./corridor.jpg",
  "./power.png",
  "./icon-192.png",
  "./icon-512.png",
  "./sounds/click.mp3",
  "./sounds/ui.mp3",
  "./sounds/achievement.mp3",
  "./sounds/music.mp3",
  "./sounds/music2.mp3",
  "./sounds/alarm.mp3",
  "./sounds/chest.mp3",
  "./sounds/boss.mp3",
  "./sounds/eat.mp3"
];

self.addEventListener("install", function(e){
  e.waitUntil(
    caches.open(CACHE_NAME).then(function(cache){
      return Promise.all(URLS.map(function(url){
        return cache.add(url).catch(function(){});
      }));
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", function(e){
  e.waitUntil(
    caches.keys().then(function(names){
      return Promise.all(names.filter(function(n){return n!==CACHE_NAME;}).map(function(n){return caches.delete(n);}));
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", function(e){
  if(e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request).then(function(r){
      if(r) return r;
      return fetch(e.request).then(function(response){
        if(response && response.status === 200 && response.type === "basic"){
          var clone = response.clone();
          caches.open(CACHE_NAME).then(function(cache){cache.put(e.request, clone);});
        }
        return response;
      }).catch(function(){
        if(e.request.mode === "navigate") return caches.match("./index.html");
      });
    })
  );
});

self.addEventListener("message", function(e){
  if(e.data === "skipWaiting") self.skipWaiting();
});
