document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.site_header_nav');
  const menuBtn = document.createElement('button');
  const mobileNav = document.createElement('div');
  
  // Setup mobile nav container
  mobileNav.className = 'mobile-nav';
  
  // Clone navigation items for mobile menu
  const mobileNavContent = nav.querySelector('ul').cloneNode(true);
  mobileNav.appendChild(mobileNavContent);
  
  // Only append mobile nav if we're on mobile
  if (window.innerWidth <= 768) {
    document.body.appendChild(mobileNav);
    document.body.appendChild(menuBtn);
  }
  
  // Setup menu button
  menuBtn.className = 'menu-btn';
  menuBtn.innerHTML = '☰';
  menuBtn.setAttribute('aria-label', 'Toggle navigation menu');
  
  // Toggle menu and button icon
  menuBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
    menuBtn.innerHTML = mobileNav.classList.contains('active') ? '✕' : '☰';
    document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
  });
  
  const closeMenu = () => {
    mobileNav.classList.remove('active');
    menuBtn.innerHTML = '☰';
    document.body.style.overflow = '';
  };

  // Close menu when clicking on a link
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
  
  // Close menu when clicking outside
  mobileNav.addEventListener('click', (e) => {
    if (e.target === mobileNav) {
      closeMenu();
    }
  });

  // Handle resize events
  window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
      if (!document.body.contains(mobileNav)) {
        document.body.appendChild(mobileNav);
        document.body.appendChild(menuBtn);
      }
    } else {
      mobileNav.remove();
      menuBtn.remove();
    }
  });
});