// ===== SERVICE WORKER v109 =====
var CACHE_NAME = "krohlupic-v109";
var URLS = [
  "./",
  "./index.html",
  "./style.css",
  "./game.js",
  "./lang.js",
  "./i18n-patch.js",
  "./manifest.json",
  "./krohlupic.jpg",
  "./krohlupic.png",
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

// Установка — кэшируем всё
self.addEventListener("install", function(e){
  e.waitUntil(
    caches.open(CACHE_NAME).then(function(cache){
      return Promise.all(
        URLS.map(function(url){
          return cache.add(url).catch(function(err){
            console.warn("SW: не удалось закэшировать", url);
          });
        })
      );
    })
  );
  // Активируем сразу, не ждём закрытия вкладок
  self.skipWaiting();
});

// Активация — чистим старые кэши
self.addEventListener("activate", function(e){
  e.waitUntil(
    caches.keys().then(function(names){
      return Promise.all(
        names.filter(function(n){ return n !== CACHE_NAME; })
             .map(function(n){
               console.log("SW: удаляю старый кэш", n);
               return caches.delete(n);
             })
      );
    })
  );
  // Берём контроль над всеми вкладками сразу
  self.clients.claim();
});

// Перехват запросов
self.addEventListener("fetch", function(e){
  // Только GET
  if(e.request.method !== "GET") return;

  e.respondWith(
    caches.match(e.request).then(function(r){
      if(r) return r; // Из кэша
      return fetch(e.request).then(function(response){
        // Кэшируем новые ответы на лету (для картинок и т.д.)
        if(response && response.status === 200 && response.type === "basic"){
          var responseClone = response.clone();
          caches.open(CACHE_NAME).then(function(cache){
            cache.put(e.request, responseClone);
          });
        }
        return response;
      }).catch(function(){
        // Если оффлайн и файла нет — отдаём index.html для навигации
        if(e.request.mode === "navigate"){
          return caches.match("./index.html");
        }
      });
    })
  );
});

// Сообщение от страницы — принудительное обновление
self.addEventListener("message", function(e){
  if(e.data === "skipWaiting"){
    self.skipWaiting();
  }
});
