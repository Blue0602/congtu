const body = document.body;
const garageIntro = document.getElementById('garageIntro');
const welcomePopup = document.getElementById('welcomePopup');
const closeWelcome = document.getElementById('closeWelcome');
const exploreServices = document.getElementById('exploreServices');
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

body.classList.add('intro-lock');

window.addEventListener('load', () => {
  setTimeout(() => {
    garageIntro.classList.add('hide');
    garageIntro.style.opacity = '0';
    garageIntro.style.transition = 'opacity .7s ease';
    welcomePopup.classList.add('show');
    welcomePopup.setAttribute('aria-hidden', 'false');
    setTimeout(() => garageIntro.remove(), 800);
  }, 3300);
});

function closePopup(scrollTarget = null) {
  welcomePopup.classList.remove('show');
  welcomePopup.setAttribute('aria-hidden', 'true');
  body.classList.remove('intro-lock');
  if (scrollTarget) {
    setTimeout(() => document.querySelector(scrollTarget)?.scrollIntoView({ behavior: 'smooth' }), 220);
  }
}

closeWelcome.addEventListener('click', () => closePopup());
exploreServices.addEventListener('click', (e) => {
  e.preventDefault();
  closePopup('#services');
});

menuToggle.addEventListener('click', () => mainNav.classList.toggle('open'));
mainNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => mainNav.classList.remove('open')));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const bookingForm = document.getElementById('bookingForm');
bookingForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const car = document.getElementById('car').value.trim();
  const service = document.getElementById('service').value;
  const date = document.getElementById('date').value || 'Chưa chọn ngày';
  const text = `Xin chào TT WORKSHOP, tôi muốn đặt lịch dịch vụ.\nHọ tên: ${name}\nDòng xe: ${car}\nDịch vụ quan tâm: ${service}\nNgày dự kiến: ${date}`;
  window.location.href = `sms:0902127979?body=${encodeURIComponent(text)}`;
});
