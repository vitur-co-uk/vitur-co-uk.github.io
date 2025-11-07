
document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }
  
  // ---------------------------
  // Client-side cache-busting for images
  // This appends a cache-busting query parameter to image URLs on page load.
  // Notes:
  // - Uses a short-lived timestamp so images are re-fetched each page load.
  // - Good for debugging / forcing fresh images immediately.
  // - For production, prefer server-side Cache-Control headers, a CDN, or
  //   content-hashed filenames for efficient long-term caching.
  // To disable this behavior, remove or comment out the block below.
  (function bustImageCache() {
    try {
      const imgs = document.querySelectorAll('img');
      if (!imgs || imgs.length === 0) return;
      // Use a build timestamp if available to avoid re-downloading every nav.
      // window.__BUILD_TS can be injected at build-time; fallback to Date.now()
      const ts = (window.__BUILD_TS && String(window.__BUILD_TS)) || String(Date.now());
      imgs.forEach(img => {
        // skip data URLs and SVGs inlined
        const src = img.getAttribute('src');
        if (!src || src.startsWith('data:') || src.startsWith('blob:')) return;
        // Only modify same-origin or absolute URLs that point to site assets
        // Change the condition below if you have images from other hosts you want to affect.
        try {
          const url = new URL(src, window.location.href);
          // only target image paths on this site (adjust pathname prefix if needed)
          // e.g., '/assets/' or relative paths
          // We'll skip untouched external CDN images by default — except for
          // specific hosts listed in `allowedExternalHosts` below.
          const allowedExternalHosts = ['static.photos'];
          const isAllowedExternal = allowedExternalHosts.some(h => url.hostname.includes(h));
          if (url.origin !== window.location.origin && !isAllowedExternal) return;
          // If already has a cache-bust param we replace it, else append
          url.searchParams.set('cb', ts);
          // For external images we must use the full href, keep pathname for same-origin
          const newSrc = (isAllowedExternal) ? url.href : (url.pathname + url.search + url.hash);
          img.setAttribute('src', newSrc);
        } catch (e) {
          // If URL parsing fails (unlikely), fallback to naive append
          const sep = src.includes('?') ? '&' : '?';
          img.setAttribute('src', src + sep + 'cb=' + ts);
        }
      });
    } catch (e) {
      // silently ignore any errors to avoid breaking the page
      // console.warn('Image cache-bust failed', e);
    }
  })();

});
