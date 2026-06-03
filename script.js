const popup = document.getElementById('welcomePopup');
const garage = document.getElementById('garageIntro');
const closePopup = document.getElementById('closePopup');
const openButtons = document.querySelectorAll('.popup-open-site');

function openGarageExperience(e){
  if(e) e.preventDefault();
  popup.classList.add('hide');
  garage.classList.add('active');
  setTimeout(()=>{
    garage.classList.remove('active');
    const services = document.querySelector('#services');
    if(e && e.currentTarget.classList.contains('popup-open-site')) services.scrollIntoView({behavior:'smooth'});
  }, 1350);
}
closePopup.addEventListener('click', openGarageExperience);
openButtons.forEach(btn=>btn.addEventListener('click', openGarageExperience));

const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
menuToggle.addEventListener('click',()=> navMenu.classList.toggle('active'));
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>navMenu.classList.remove('active')));

const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{ if(entry.isIntersecting) entry.target.classList.add('visible'); });
},{threshold:.16});
reveals.forEach(el=>observer.observe(el));

const form = document.getElementById('bookingForm');
form.addEventListener('submit', e=>{
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const car = document.getElementById('car').value.trim();
  const service = document.getElementById('service').value;
  const date = document.getElementById('date').value;
  const message = `Xin chào TT WORKSHOP, tôi là ${name}. Tôi đang sử dụng xe ${car}. Tôi muốn tư vấn dịch vụ: ${service}. Ngày dự kiến: ${date}. Nhờ chuyên gia Công Tú hỗ trợ tư vấn.`;
  window.location.href = `sms:0902127979?body=${encodeURIComponent(message)}`;
});
