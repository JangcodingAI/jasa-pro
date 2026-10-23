(() => {
  'use strict';

  const root = document.documentElement;
  const measure = () => {
    const top = document.getElementById('top');
    const height = top && getComputedStyle(top).display !== 'none' ? top.offsetHeight : 0;
    root.style.setProperty('--topH', height + 'px');
    const heading = document.querySelector('.page.on .ph');
    root.style.setProperty('--phH', (heading ? heading.offsetHeight : 0) + 'px');
  };

  measure();
  addEventListener('resize', measure);
  addEventListener('orientationchange', () => setTimeout(measure, 250));
  if (window.ResizeObserver) {
    const observer = new ResizeObserver(measure);
    document.querySelectorAll('.ph,#top').forEach(element => observer.observe(element));
  }
  document.querySelectorAll('.nav,[data-go]').forEach(element => {
    element.addEventListener('click', () => setTimeout(measure, 30));
  });

  const loads = {};
  const loadScript = src => loads[src] || (loads[src] = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = resolve;
    script.onerror = () => {
      delete loads[src];
      reject(new Error('intro-library'));
    };
    document.head.appendChild(script);
  }));

  let playing = false;
  let animation = null;
  let overlay = null;

  const stop = () => {
    if (!overlay) return;
    const current = overlay;
    overlay = null;
    playing = false;
    current.classList.add('hide');
    root.classList.remove('intro-lock');
    setTimeout(() => {
      try { animation?.destroy(); } catch (_) {}
      animation = null;
      current.remove();
      if (window.fit) window.fit();
    }, 300);
  };

  const play = async () => {
    if (playing) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      const toast = document.getElementById('toast');
      if (toast) {
        toast.textContent = 'Intro tidak diputar karena preferensi gerak dikurangi aktif';
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2800);
      }
      return;
    }

    playing = true;
    root.classList.add('intro-lock');
    overlay = document.createElement('div');
    overlay.id = 'intro';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-label', 'Intro Jasa Pro');
    overlay.setAttribute('aria-live', 'polite');
    overlay.innerHTML = '<div class="stagei"><div id="introAnim"></div><div id="introLoad"></div></div><button aria-label="Lewati intro" id="introSkip" type="button">Lewati ›</button><div class="ibar"><i id="introBar"></i></div>';
    document.body.prepend(overlay);
    document.getElementById('introSkip').addEventListener('click', event => {
      event.stopPropagation();
      stop();
    });
    overlay.addEventListener('click', stop);

    try {
      if (!window.lottie) await loadScript('./lottie.min.js');
      if (!window.INTRO_DATA) await loadScript('./intro-data.js');
      if (!overlay) return;
      const bar = document.getElementById('introBar');
      animation = window.lottie.loadAnimation({
        container: document.getElementById('introAnim'),
        renderer: 'svg',
        loop: false,
        autoplay: false,
        animationData: window.INTRO_DATA,
        rendererSettings: { preserveAspectRatio: 'xMidYMid meet', progressiveLoad: true }
      });
      animation.addEventListener('DOMLoaded', () => {
        if (!overlay || !animation) return;
        document.getElementById('introLoad')?.remove();
        document.getElementById('introAnim')?.classList.add('ready');
        animation.play();
      });
      animation.addEventListener('enterFrame', () => {
        if (bar && animation) bar.style.width = (animation.currentFrame / animation.totalFrames * 100) + '%';
      });
      animation.addEventListener('complete', () => {
        if (bar) bar.style.width = '100%';
        setTimeout(stop, 250);
      });
      animation.addEventListener('data_failed', stop);
    } catch (_) {
      stop();
    }
  };

  document.getElementById('playIntro')?.addEventListener('click', play);
  document.addEventListener('keydown', event => {
    if (playing && ['Escape', 'Enter', ' '].includes(event.key)) {
      event.preventDefault();
      stop();
    }
  });
})();
