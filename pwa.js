(() => {
  'use strict';

  const installButton = document.getElementById('installApp');
  const notify = message => {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(notify.timer);
    notify.timer = setTimeout(() => toast.classList.remove('show'), 3200);
  };

  let installPrompt = null;
  const installed = () => window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;

  window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault();
    installPrompt = event;
    if (installButton && !installed()) installButton.hidden = false;
  });

  installButton?.addEventListener('click', async () => {
    if (!installPrompt) return;
    installButton.disabled = true;
    try {
      await installPrompt.prompt();
      const choice = await installPrompt.userChoice;
      if (choice.outcome === 'accepted') notify('Aplikasi sedang dipasang di perangkat Anda');
    } finally {
      installPrompt = null;
      installButton.hidden = true;
      installButton.disabled = false;
    }
  });

  window.addEventListener('appinstalled', () => {
    installPrompt = null;
    if (installButton) installButton.hidden = true;
    notify('Jasa Pro berhasil dipasang');
  });

  window.addEventListener('offline', () => notify('Mode offline aktif — data dan fitur utama tetap tersedia'));
  window.addEventListener('online', () => notify('Koneksi internet kembali aktif'));

  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    document.querySelectorAll('.mask.show').forEach(modal => modal.classList.remove('show'));
    document.getElementById('side')?.classList.remove('open');
  });

  const canRegister = location.protocol === 'https:' || ['localhost', '127.0.0.1'].includes(location.hostname);
  if ('serviceWorker' in navigator && canRegister) {
    window.addEventListener('load', async () => {
      try {
        const registration = await navigator.serviceWorker.register('./service-worker.js', { scope: './' });
        registration.addEventListener('updatefound', () => {
          const worker = registration.installing;
          worker?.addEventListener('statechange', () => {
            if (worker.state === 'installed' && navigator.serviceWorker.controller) {
              notify('Versi terbaru siap digunakan saat aplikasi dimuat ulang');
            }
          });
        });
      } catch (_) {
        notify('Mode offline belum dapat diaktifkan pada browser ini');
      }
    });
  }
})();
