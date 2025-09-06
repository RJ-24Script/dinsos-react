// Helper: format tanggal ID
function formatDateID(d) {
  const date = new Date(d);
  return date.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });
}

document.addEventListener('DOMContentLoaded', () => {
  // Tahun di footer
  document.getElementById('year').textContent = new Date().getFullYear();
  // Statistik last update (contoh: sekarang)
  const stat = document.getElementById('stat-update');
  if (stat) stat.textContent = new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jayapura' });

  // Mobile menu toggle
  const mobileBtn = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  mobileBtn?.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    const expanded = mobileBtn.getAttribute('aria-expanded') === 'true';
    mobileBtn.setAttribute('aria-expanded', String(!expanded));
  });

  // Mobile accordion functionality
  const mobileAccordions = document.querySelectorAll('[data-toggle]');
  mobileAccordions.forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-toggle');
      const target = document.getElementById(targetId);
      const icon = button.querySelector('i');
      
      if (target) {
        target.classList.toggle('hidden');
        icon.style.transform = target.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
      }
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!mobileMenu?.contains(e.target) && !mobileBtn?.contains(e.target)) {
      mobileMenu?.classList.add('hidden');
      mobileBtn?.setAttribute('aria-expanded', 'false');
    }
  });

  // Active navigation highlighting
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath || 
        (currentPath === '/' && link.getAttribute('href') === '/') ||
        (currentPath.includes('index.html') && link.getAttribute('href') === '/')) {
      link.classList.add('bg-blue-700', 'rounded');
    }
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Back to top
  const back = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      back.classList.remove('opacity-0','invisible');
      back.classList.add('opacity-100','visible');
    } else {
      back.classList.add('opacity-0','invisible');
      back.classList.remove('opacity-100','visible');
    }
  });
  back?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Video background handling
  function initVideoBackground() {
    const video = document.getElementById('bg-video');
    console.log('initVideoBackground called');
    if (!video) {
      console.error('Video element not found');
      return;
    }
    console.log('Video element found:', video);

    // Cek apakah file video ada
    const videoSrc = video.querySelector('source').src;
    console.log('Video source:', videoSrc);

    // Force load video
    video.load();

    // Cek apakah browser mendukung autoplay
    const promise = video.play();
    
    if (promise !== undefined) {
      promise.then(() => {
        console.log('Video autoplay success');
      }).catch(error => {
        console.warn('Video autoplay blocked:', error);
        // Fallback ke gambar statis jika autoplay diblokir
        video.style.display = 'none';
        const container = document.querySelector('.video-container');
        if (container) {
          container.style.backgroundImage = "url('./assets/img/background-fallback.jpg')";
          container.style.backgroundSize = "cover";
          container.style.backgroundPosition = "center";
        }
      });
    }

    // Event listeners untuk debugging
    video.addEventListener('loadeddata', () => {
      console.log('Video background loaded successfully');
    });

    video.addEventListener('loadstart', () => {
      console.log('Video loading started');
    });

    // Initialize video background
    initVideoBackground();

    video.addEventListener('error', (e) => {
      console.error('Video background error:', e);
      // Fallback ke gambar statis jika video gagal dimuat
      video.style.display = 'none';
      const container = document.querySelector('.video-container');
      if (container) {
        container.style.backgroundImage = "url('./assets/img/background-fallback.jpg')";
        container.style.backgroundSize = "cover";
        container.style.backgroundPosition = "center";
      }
    });

    video.addEventListener('stalled', () => {
      console.log('Video stalled');
    });

    video.addEventListener('waiting', () => {
      console.log('Video waiting');
    });
  }

  // Render berita & pengumuman dari JSON
  Promise.all([
    fetch('./data/berita.json').then(r=>r.json()).catch(()=>[]),
    fetch('./data/pengumuman.json').then(r=>r.json()).catch(()=>[])
  ]).then(([berita, pengumuman]) => {
    // Berita grid
    const grid = document.getElementById('berita-grid');
    if (grid && Array.isArray(berita)) {
      grid.innerHTML = berita.slice(0, 4).map(item => `
        <article class="bg-white rounded-md overflow-hidden border border-gray-200 card-hover transition">
          <img loading="lazy" src="${item.gambar || 'https://placehold.co/600x400'}" alt="${item.alt || 'Gambar berita'}" class="w-full h-48 object-cover" onerror="this.src='https://placehold.co/600x400?text=Berita'" />
          <div class="p-4">
            <span class="text-xs sm:text-sm text-blue-600 font-medium">${formatDateID(item.tanggal)}</span>
            <h4 class="font-bold text-base sm:text-lg mt-1 mb-2">${item.judul}</h4>
            <p class="text-gray-600 text-xs sm:text-sm line-clamp-2">${item.ringkas}</p>
            <a href="#" class="text-blue-600 text-xs sm:text-sm font-medium hover:underline inline-block mt-3">Baca Selengkapnya</a>
          </div>
        </article>
      `).join('');
    }

    // Pengumuman list
    const list = document.getElementById('pengumuman-list');
    if (list && Array.isArray(pengumuman)) {
      list.innerHTML = pengumuman.slice(0, 5).map(p => `
        <div class="flex items-start border-b border-gray-100 pb-4 last:border-b-0">
          <div class="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center mr-3 shrink-0">
            <i class="fas ${p.icon || 'fa-info-circle'} text-sm"></i>
          </div>
          <div>
            <h5 class="font-bold text-gray-800 text-sm sm:text-base">${p.judul}</h5>
            <p class="text-gray-600 text-xs sm:text-sm">${p.isi}</p>
            <span class="text-xs text-gray-500 mt-1 block">Diposting: ${formatDateID(p.posted)}</span>
          </div>
        </div>
      `).join('');
    }

    // Running text dari pengumuman
    const run = document.getElementById('running-text');
    if (run && Array.isArray(pengumuman)) {
      run.innerHTML = pengumuman.slice(0, 6).map(p => `<span class="mr-8">${p.judul}</span>`).join('');
    }

    
  });
});
