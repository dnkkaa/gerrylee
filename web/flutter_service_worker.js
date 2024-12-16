'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "fbb682dec08259095d6121620278f6c8",
"assets/AssetManifest.bin.json": "629704c5b192161f685deb7d180a601a",
"assets/AssetManifest.json": "678aa817334e1a108985ab1824fe751a",
"assets/assets/background.png": "fea9e6dc9afa5b7030abe2c887354c61",
"assets/assets/background1.gif": "1bfcbe1cd55ec47a442fd2717c258888",
"assets/assets/background2.gif": "df06c0e4f2a5cb69b19ab9f98643f6bf",
"assets/assets/danica.jpg": "8b4d90667754bd7f394b66b14cd88dc4",
"assets/assets/divine.jpg": "b5a406059420be977bdd6ae757cd4eda",
"assets/assets/g3.jpg": "1c4e16f8b3f427062b88ab8e098a1d1b",
"assets/assets/gcash.jpg": "29dd1753aff2469b8f31cadccdf3bb6c",
"assets/assets/joan.jpg": "b5c8d94554c25bd9dbf5e78030bb942f",
"assets/assets/logo.png": "6576088b69ad277c135875f2d81dd063",
"assets/assets/logo2.png": "da9c2c2ada869b8b5c2396469ab9d59f",
"assets/assets/manual/2.png": "ed697fcb8ce635b13a97ffe2a166cacd",
"assets/assets/manual/3.png": "794359953daa18cab9c72166fa5021ab",
"assets/assets/manual/4.png": "51ad08858928ccd177e83410e41b8db9",
"assets/assets/manual/5.png": "6ca3eed06e0ebf2cb8b3083edaa8aa77",
"assets/FontManifest.json": "7b2a36307916a9721811788013e65289",
"assets/fonts/MaterialIcons-Regular.otf": "9327f3ecba75135a8f18cabd20dd6551",
"assets/NOTICES": "6dc764338a44126df76eda1837b7ecf0",
"assets/packages/flutter_image_compress_web/assets/pica.min.js": "6208ed6419908c4b04382adc8a3053a2",
"assets/packages/flutter_map/lib/assets/flutter_map_logo.png": "208d63cc917af9713fc9572bd5c09362",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "32cc31c7f950543ad75e035fcaeb2892",
"canvaskit/canvaskit.js.symbols": "bb7854ddbcaa2e58e5bdef66b58d4b47",
"canvaskit/canvaskit.wasm": "6134e7617dab3bf54500b0a2d94fe17a",
"canvaskit/chromium/canvaskit.js": "6a5bd08897043608cb8858ce71bcdd8a",
"canvaskit/chromium/canvaskit.js.symbols": "f23279209989f44e047062055effde63",
"canvaskit/chromium/canvaskit.wasm": "ad6f889daae572b3fd08afc483572ecd",
"canvaskit/skwasm.js": "e95d3c5713624a52bf0509ccb24a6124",
"canvaskit/skwasm.js.symbols": "dc16cade950cfed532b8c29e0044fe42",
"canvaskit/skwasm.wasm": "aff2178f40209a9841d8d1b47a6e6ec7",
"canvaskit/skwasm.worker.js": "89990e8c92bcb123999aa81f7e203b1c",
"favicon.png": "6576088b69ad277c135875f2d81dd063",
"flutter.js": "5de281a37b2308e43846d3a0b545c921",
"flutter_bootstrap.js": "38b2ffd88b9bae020274318fefddb1cb",
"icons/Icon-192.png": "6576088b69ad277c135875f2d81dd063",
"icons/Icon-512.png": "6576088b69ad277c135875f2d81dd063",
"icons/Icon-maskable-192.png": "6576088b69ad277c135875f2d81dd063",
"icons/Icon-maskable-512.png": "6576088b69ad277c135875f2d81dd063",
"index.html": "787387ca243276cb4ab854689c5216aa",
"/": "787387ca243276cb4ab854689c5216aa",
"main.dart.js": "c8539445b58917e85b81002a1d8fdedc",
"manifest.json": "fa10fbe7033ee8f014abb80420e67a6d",
"splash/img/dark-1x.png": "e3b2dee29c5d5b09fc42ba572af4c361",
"splash/img/dark-2x.png": "0d33c6e140a1f12c0b7d876d51b146a5",
"splash/img/dark-3x.png": "636d7ccb5318e5b8d96b20104cbd7413",
"splash/img/dark-4x.png": "ee05d74af71c5dffbff55138638a39fc",
"splash/img/light-1x.png": "e3b2dee29c5d5b09fc42ba572af4c361",
"splash/img/light-2x.png": "0d33c6e140a1f12c0b7d876d51b146a5",
"splash/img/light-3x.png": "636d7ccb5318e5b8d96b20104cbd7413",
"splash/img/light-4x.png": "ee05d74af71c5dffbff55138638a39fc",
"version.json": "0b5ffa8043c793a80ec0bcdb6d043f29"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
