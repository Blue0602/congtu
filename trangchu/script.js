(() => {
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];

  const loader = $('#garageLoader');
  const welcome = $('#welcomeModal');
  const closeWelcome = $('#closeWelcome');
  const exploreServices = $('#exploreServices');

  function showWelcome() {
    if (welcome) welcome.classList.add('show');
    document.body.style.overflow = 'hidden';
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  function hideWelcome() {
    if (welcome) welcome.classList.remove('show');
    document.body.style.overflow = '';
  }

  function finishLoader() {
    if (loader) loader.classList.add('done');
    setTimeout(showWelcome, 140);
  }

  const heroImg = new Image();
  heroImg.src = 'images/ttworkshop.jpg';
  let opened = false;
  const safeOpen = () => {
    if (opened) return;
    opened = true;
    setTimeout(finishLoader, 1220);
  };
  heroImg.onload = safeOpen;
  heroImg.onerror = safeOpen;
  setTimeout(safeOpen, 900);

  closeWelcome?.addEventListener('click', () => {
    hideWelcome();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  exploreServices?.addEventListener('click', () => {
    hideWelcome();
    setTimeout(() => $('#services')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120);
  });

  welcome?.addEventListener('click', (e) => {
    if (e.target === welcome) {
      hideWelcome();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });


  // Logo fallback: ưu tiên logo trong /trangchu/images/, nếu thiếu thì thử logo ở thư mục gốc.
  $$('.brand-logo').forEach((logo) => {
    logo.addEventListener('error', () => {
      const fallback = logo.dataset.fallback;
      if (fallback && logo.src !== new URL(fallback, window.location.origin).href) {
        logo.src = fallback;
      } else {
        logo.classList.add('logo-hidden');
      }
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  $$('.reveal').forEach((el) => observer.observe(el));

  // Ảnh thiếu thì không làm vỡ bố cục, thay bằng khung cập nhật.
  $$('img').forEach((img) => {
    img.addEventListener('error', () => {
      const card = img.closest('.media-card');
      if (!card) return;
      img.remove();
      if (!card.querySelector('.missing-text')) {
        const span = document.createElement('span');
        span.className = 'missing-text';
        span.textContent = 'Đang cập nhật hình ảnh';
        card.appendChild(span);
      }
    }, { once: true });
  });

  const videoModal = $('#videoModal');
  const videoFrame = $('#videoFrame');
  const closeVideo = $('#closeVideo');

  function openVideo(src) {
    if (!src) {
      alert('Video này đang được cập nhật.');
      return;
    }
    const autoplay = src.includes('?') ? '&autoplay=1' : '?autoplay=1';
    videoFrame.src = src + autoplay;
    videoModal.classList.add('show');
    videoModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeVideoModal() {
    videoModal.classList.remove('show');
    videoModal.setAttribute('aria-hidden', 'true');
    videoFrame.src = '';
    document.body.style.overflow = welcome?.classList.contains('show') ? 'hidden' : '';
  }

  $$('.video-trigger').forEach((btn) => {
    btn.addEventListener('click', () => openVideo(btn.dataset.video || ''));
  });
  closeVideo?.addEventListener('click', closeVideoModal);
  videoModal?.addEventListener('click', (e) => {
    if (e.target === videoModal) closeVideoModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (videoModal?.classList.contains('show')) closeVideoModal();
      else if (welcome?.classList.contains('show')) hideWelcome();
    }
  });

  const bookingForm = $('#bookingForm');
  bookingForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(bookingForm);
    const text = `TT WORKSHOP - Đặt lịch dịch vụ%0A` +
      `Họ tên: ${encodeURIComponent(data.get('name') || '')}%0A` +
      `Dòng xe: ${encodeURIComponent(data.get('car') || '')}%0A` +
      `Dịch vụ: ${encodeURIComponent(data.get('service') || '')}%0A` +
      `Ngày dự kiến: ${encodeURIComponent(data.get('date') || '')}`;
    window.location.href = `sms:0902127979?body=${text}`;
  });
})();
