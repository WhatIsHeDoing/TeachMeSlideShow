/**
 * @see https://serviceworke.rs/strategy-cache-only.html
 */

const cacheKey = "cache-only";

// Do not pre-cache on install.
self.addEventListener("install", event => fetch(event.request));

// On fetch, use cache only strategy.
self.addEventListener("fetch", event => event.respondWith(fromCache(event.request)));

/**
 * Open the cache where the assets were stored and search for the requested resource.
 * Notice that in case of no matching, the promise still resolves but it does with undefined as value.
 */
const fromCache = request => caches
    .open(cacheKey)
    .then(cache => cache
        .match(request)
        .then(matching => matching || Promise.reject("no-match")))
