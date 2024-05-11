//     --== NAVIGATION ==--

const heroSection = document.querySelector('.hero');
const aboutSection = document.querySelector('.about');

const observer = new IntersectionObserver(
   function (entries) {
      const ent = entries[0];
      console.log(ent);

      if (!ent.isIntersecting) {
         document.querySelector('.nav').classList.add('sticky');
      }

      if (ent.isIntersecting) {
         document.querySelector('.nav').classList.remove('sticky');
      }
   },
   {
      root: null,
      threshold: 0,
      rootMargin: '-430px',
   }
);

observer.observe(heroSection);

//     --== ACCORDION ==--

document.querySelectorAll('.accordion__item').forEach((acc, i) => {
   acc.addEventListener('click', () => {
      acc.classList.toggle('acc-open');
   });
});

//     --== GALLERY MODAL ==--

const lightBox = document.getElementById('Lightbox');

function openLightbox() {
   lightBox.classList.add('open-lightbox');
}

function closeLightbox() {
   lightBox.classList.remove('open-lightbox');
}

let slideIndex = 1;
showSlide(slideIndex);

function changeSlide(n) {
   showSlide((slideIndex += n));
}

function toSlide(n) {
   showSlide((slideIndex = n));
}

// - This logic decides which slide to show and which preview is active.

function showSlide(n) {
   const slides = document.getElementsByClassName('modal__image-box');
   let modalImages = document.getElementsByClassName('modal__image');
   let modalPreviews = document.getElementsByClassName('modal__preview');

   if (n > slides.length) {
      slideIndex = 1;
   }

   if (n < 1) {
      slideIndex = slides.length;
   }

   for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
   }

   for (let i = 0; i < modalImages.length; i++) {
      modalImages[i].className = modalImages[i].className.replace(
         ' active',
         ''
      );
   }

   slides[slideIndex - 1].style.display = 'block';
   modalImages[slideIndex - 1].className += ' active';

   // - Highlighting current preview

   for (let i = 0; i < modalPreviews.length; i++) {
      modalPreviews[i].className = modalPreviews[i].className.replace(
         ' active-preview',
         ''
      );
   }

   modalPreviews[slideIndex - 1].className += ' active-preview';
}

// - Exiting modal when ESC is pressed and switching between images with arrows buttons

document.addEventListener('keydown', function (e) {
   if (e.key === 'Escape' && lightBox.classList.contains('modal')) {
      closeLightbox();
   }

   if (e.key === 'ArrowLeft') {
      changeSlide(-1);
   }

   if (e.key === 'ArrowRight') {
      changeSlide(1);
   }
});

// - Exiting lightbox by clicking outside of the elements

const modalSlides = document.querySelectorAll('.modal__image-box');
const modalPreviews = document.querySelectorAll('.modal__previews');
const chevrons = document.querySelectorAll('.modal__chevrons');

lightBox.addEventListener('click', function (e) {
   if (e.currentTarget === lightBox) {
      closeLightbox();
   }
});

modalSlides.forEach((slide) => {
   slide.addEventListener('click', (e) => {
      e.stopPropagation();
   });
});

modalPreviews.forEach((preview) => {
   preview.addEventListener('click', (e) => {
      e.stopPropagation();
   });
});

chevrons.forEach((chevron) => {
   chevron.addEventListener('click', (e) => {
      e.stopPropagation();
   });
});

//     --== SLIDER ==--

const slides = document.querySelectorAll('.t-slide');
const btnLeft = document.querySelector('.t-slider__chevrons--1');
const btnRight = document.querySelector('.t-slider__chevrons--2');

let curSlide = 0;
const maxSlide = slides.length;

const goToSlide = function (slide) {
   slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
   );
};

goToSlide(0);

// - Next slide

const nextSlide = function () {
   if (curSlide === maxSlide - 1) {
      curSlide = 0;
   } else {
      curSlide++;
   }

   goToSlide(curSlide);
};

const prevSlide = function () {
   if (curSlide === 0) {
      curSlide = maxSlide - 1;
   } else {
      curSlide--;
   }

   goToSlide(curSlide);
};

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

//     --== PHONE OBSERVER ==--

const footer = document.querySelector('.footer');
const phoneBtn = document.querySelector('.phone-sticky');

const observePhone = new IntersectionObserver(
   function (entries) {
      const ent = entries[0];

      if (!ent.isIntersecting) {
         phoneBtn.classList.add('phone-sticky-active');
      }

      if (ent.isIntersecting) {
         phoneBtn.classList.remove('phone-sticky-active');
      }
   },
   {
      root: null,
      threshold: 0,
      rootMargin: '-115px',
   }
);

observePhone.observe(heroSection);
observePhone.observe(footer);

//      --== MOBILE NAVIGATION ==--

const headerEl = document.querySelector('.header');
const mobileBtn = document.querySelector('.mobile-nav__btn');

mobileBtn.addEventListener('click', function () {
   headerEl.classList.toggle('nav-open');
});

// - Close mobile nav on section click

const navItems = document.querySelectorAll('.nav__item');
const navLogo = document.querySelector('.nav__logo');

navItems.forEach((item) => {
   item.addEventListener('click', () => {
      headerEl.classList.remove('nav-open');
   });
});

navLogo.addEventListener('click', () => {
   headerEl.classList.remove('nav-open');
});

//     --== HAMBURGER OBSERVER ==--

const hamburger = document.querySelector('.mobile-nav');

const observeHam = new IntersectionObserver(
   function (entries) {
      const ent = entries[0];

      if (!ent.isIntersecting) {
         hamburger.classList.add('ham-sticky-active');
      }
   },
   {
      root: null,
      threshold: 0,
      rootMargin: '-1px',
   }
);

observeHam.observe(heroSection);
