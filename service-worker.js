/**
 * @see hhttps://serviceworke.rs/strategy-network-or-cache.html
 */

const cacheKey = "network-or-cache"
const timeout = 50000

// Do not pre-cache on install.
self.addEventListener("install", event => fetch(event.request))

// On fetch, use cache only strategy.
self.addEventListener("fetch", event => event
    .respondWith(fromNetwork(event.request, timeout)
    .catch(() => fromCache(event.request))))

/**
 * Time limited network request. If the network fails or the response is not served before timeout,
 * the promise is rejected.
 */
const fromNetwork = (request, timeout) =>
    new Promise((fulfill, reject) => {
        const timeoutId = setTimeout(reject, timeout)

        fetch(request).then(response => {
            clearTimeout(timeoutId)
            fulfill(response)
        }, reject)
    })


/**
 * Open the cache where the assets were stored and search for the requested resource.
 * Notice that in case of no matching, the promise still resolves but it does with undefined as value.
 */
const fromCache = request => caches
    .open(cacheKey)
    .then(cache => cache
        .match(request)
        .then(matching => matching || Promise.reject("no-match")))
