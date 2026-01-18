
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

  // ---------------------------
  // Site-wide under-construction overlay (opaque + self-healing)
  // Reads /site-config.json; when `underConstruction: true` hides page content
  // (removes it from layout) and shows an opaque overlay. A MutationObserver
  // and periodic check attempt to restore the overlay if removed from devtools.
  (function checkSiteConfig(){
    try {
      fetch('/site-config.json', { cache: 'no-store' })
        .then(function(res){ if (!res.ok) throw new Error('no config'); return res.json(); })
        .then(function(cfg){
          if (!cfg || !cfg.underConstruction) return;
          var msg = cfg.message || 'This site is under construction. Please check back soon.';
          var bg = cfg.backgroundColor || '#ffffff';
          var fg = cfg.textColor || '#000000';

          // create overlay element (keep reference so we can re-append)
          var overlay = document.getElementById('site-under-construction') || document.createElement('div');
          overlay.id = 'site-under-construction';
          overlay.setAttribute('role', 'dialog');
          overlay.setAttribute('aria-modal', 'true');
          overlay.setAttribute('tabindex', '-1');
          // inline styles to make tampering slightly harder
          overlay.style.position = 'fixed';
          overlay.style.top = '0';
          overlay.style.left = '0';
          overlay.style.width = '100%';
          overlay.style.height = '100%';
          overlay.style.background = bg;
          overlay.style.color = fg;
          overlay.style.zIndex = '2147483647';
          overlay.style.display = 'flex';
          overlay.style.flexDirection = 'column';
          overlay.style.alignItems = 'center';
          overlay.style.justifyContent = 'center';
          overlay.style.textAlign = 'center';
          overlay.style.padding = '24px';
          overlay.style.overflow = 'auto';

          overlay.innerHTML = '<div style="max-width:900px; margin: 0 12px">' +
            '<h1 style="font-size:32px; margin-bottom:12px">Under Construction</h1>' +
            '<p style="font-size:18px; margin-bottom:18px; line-height:1.4">' + escapeHtml(msg) + '</p>' +
            '</div>';

          // Hide all other body children from layout and accessibility tree
          Array.from(document.body.children).forEach(function(child){
            if (child === overlay) return;
            try {
              child.setAttribute('data-hidden-by-uc','true');
              child.setAttribute('aria-hidden','true');
              child.style.display = 'none';
            } catch (e) {}
          });

          // Inject high-specificity CSS rule with !important as a defense-in-depth
          var cssId = 'site-under-construction-inline-style';
          if (!document.getElementById(cssId)){
            try {
              var styleEl = document.createElement('style');
              styleEl.id = cssId;
              styleEl.appendChild(document.createTextNode('\n#site-under-construction{position:fixed !important; inset:0 !important; z-index:2147483647 !important; display:flex !important;}\n'));
              (document.head || document.documentElement).appendChild(styleEl);
            } catch (e) {}
          }

          // Append overlay as last child so it sits above everything
          if (!document.getElementById('site-under-construction')) document.body.appendChild(overlay);
          try { overlay.focus(); } catch (e) {}

          // Self-healing: restore overlay if removed or hidden
          var restoreOverlay = function(){
            if (!document.getElementById('site-under-construction')) {
              try { document.body.appendChild(overlay); } catch (e) {}
            } else {
              var o = document.getElementById('site-under-construction');
              if (o.style.display === 'none') o.style.display = 'flex';
            }
            // re-hide underlying content
            Array.from(document.body.children).forEach(function(child){ if (child !== overlay){ try { child.setAttribute('data-hidden-by-uc','true'); child.setAttribute('aria-hidden','true'); child.style.display='none'; } catch(e){} }});
          };

          var mo = new MutationObserver(function(muts){ restoreOverlay(); });
          mo.observe(document.documentElement, { childList: true, subtree: true, attributes: true });

          // periodic fallback
          var intervalId = setInterval(restoreOverlay, 2000);

          // keep references on overlay for potential debugging
          overlay.__uc = { restore: restoreOverlay, observer: mo, intervalId: intervalId };
        })
        .catch(function(){ /* missing config or fetch error - normal site */ });
    } catch (e) {
      // ignore
    }

    function escapeHtml(s){
      return String(s).replace(/[&<>"']/g, function(m){
        return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m];
      });
    }
  })();

});
