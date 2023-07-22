'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "3042ab7978d640d4fe10836c3f136b97",
"assets/AssetManifest.json": "b767f797e64b5ab27259d93034b0a7be",
"assets/assets/apple_store_dl.png": "e0ea48342b9ed547afc5162b9747af5d",
"assets/assets/app_icon.png": "c9d725b4d481b2a2ccf58b251e429eb5",
"assets/assets/bus_icon.png": "83fea2543f78210376c690e261a8eb37",
"assets/assets/bus_icon_w.png": "a82a5e495f1f1cb3ca6f9e299634fa21",
"assets/assets/bus_stop.png": "7601d177a1d33eabcdac036bdf841aef",
"assets/assets/google_play_dl.png": "1d0d137f655bf04e5c7ff07c8d297f86",
"assets/assets/logo.png": "edcbfb619e59137ec8705c3ade45e149",
"assets/assets/logo_foreground.png": "3ce3fb1c2db5e3585b296ce2c6c29d00",
"assets/assets/map_dark_style.json": "d78ed66632798d4dec00e53f69a24a74",
"assets/assets/minibus_stop.png": "fff4d06f474c5f0726e626f68395052b",
"assets/assets/mtr.png": "91f1982120583f16b9b20f7fa8893509",
"assets/assets/openai-icon.png": "e0e18b278d1d33e4dea7ae5a42dbdbd6",
"assets/assets/pin-blue.png": "f43500536ee99e121b4b63a0441f2f6e",
"assets/assets/pin-blue_s.png": "a265573850576eeef698cc00dc0e3924",
"assets/assets/train_icon.png": "b1ee79759a4d80af0dfca6816498f2df",
"assets/assets/train_icon_w.png": "64914c64059cd757b2d5c9d4e1f49ef6",
"assets/assets/translations/en.json": "a82b3e97e479ea3644824cf98453be24",
"assets/assets/translations/zh.json": "1a05a619cfa71e03167509624facfede",
"assets/assets/warning_marker.png": "9218df48ddfff3b4695925dc5e93533a",
"assets/assets/warning_marker_s.png": "8fb90b4a8858f69e3aba1674161bb8b5",
"assets/FontManifest.json": "89ecea84fd4c13e2bf6595c4a0c8ac0b",
"assets/fonts/Helvetica.ttf": "1b580d980532792578c54897ca387e2c",
"assets/fonts/MaterialIcons-Regular.otf": "f4b214cf6ac0a1e61e16b6c48e00b81e",
"assets/fonts/mid-black.ttc": "009c935498d8d2b22ce5873cd528253d",
"assets/NOTICES": "0df10707386c021666c2d65e27fe87e1",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "57d849d738900cfd590e9adc7e208250",
"assets/packages/easy_localization/i18n/ar-DZ.json": "acc0a8eebb2fcee312764600f7cc41ec",
"assets/packages/easy_localization/i18n/ar.json": "acc0a8eebb2fcee312764600f7cc41ec",
"assets/packages/easy_localization/i18n/en-US.json": "5f5fda8715e8bf5116f77f469c5cf493",
"assets/packages/easy_localization/i18n/en.json": "5f5fda8715e8bf5116f77f469c5cf493",
"assets/packages/fluttertoast/assets/toastify.css": "a85675050054f179444bc5ad70ffc635",
"assets/packages/fluttertoast/assets/toastify.js": "56e2c9cedd97f10e7e5f1cebd85d53e3",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"canvaskit/canvaskit.js": "76f7d822f42397160c5dfc69cbc9b2de",
"canvaskit/canvaskit.wasm": "f48eaf57cada79163ec6dec7929486ea",
"canvaskit/chromium/canvaskit.js": "8c8392ce4a4364cbb240aa09b5652e05",
"canvaskit/chromium/canvaskit.wasm": "fc18c3010856029414b70cae1afc5cd9",
"canvaskit/skwasm.js": "1df4d741f441fa1a4d10530ced463ef8",
"canvaskit/skwasm.wasm": "6711032e17bf49924b2b001cef0d3ea3",
"canvaskit/skwasm.worker.js": "19659053a277272607529ef87acf9d8a",
"favicon.ico": "9fb999efe52223b175b83604446fbcf0",
"flutter.js": "6b515e434cea20006b3ef1726d2c8894",
"icons/Icon-192.png": "d9a551985e91e5d65a5eb696ac43f238",
"icons/Icon-512.png": "edcbfb619e59137ec8705c3ade45e149",
"icons/Icon-maskable-192.png": "d9a551985e91e5d65a5eb696ac43f238",
"icons/Icon-maskable-512.png": "edcbfb619e59137ec8705c3ade45e149",
"index.html": "afd1b39c9a9684f8f16dc82e4ca43fe9",
"/": "afd1b39c9a9684f8f16dc82e4ca43fe9",
"main.dart.js": "0b6a86ed1f22ff674ab323d0ad133cc0",
"manifest.json": "1a31d551f870f7b5ed267903476e79a6",
"version.json": "461d25b80bd57cd7e62b99483e6421e7"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
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
