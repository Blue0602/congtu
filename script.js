const garage = document.getElementById('garageIntro');
const enterBtn = document.getElementById('enterBtn');
const popup = document.getElementById('welcomePopup');
const closePopup = document.getElementById('closePopup');
const discoverBtn = document.getElementById('discoverBtn');
function openGarage(){
  popup.classList.add('hide');
  garage.classList.add('opening');
  setTimeout(()=>{ document.body.classList.add('body-ready'); garage.remove(); },1750);
}
enterBtn.addEventListener('click', openGarage);
closePopup.addEventListener('click', openGarage);
discoverBtn.addEventListener('click', ()=>{ openGarage(); setTimeout(()=>document.getElementById('services').scrollIntoView({behavior:'smooth'}),1900); });

const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('show'); });
},{threshold:.15});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

const smsForm = document.getElementById('smsForm');
smsForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const car = document.getElementById('car').value.trim();
  const service = document.getElementById('serviceSelect').value;
  const date = document.getElementById('date').value;
  const msg = `Xin chào TT WORKSHOP, tôi là ${name}. Xe: ${car}. Tôi muốn đặt lịch/tư vấn dịch vụ: ${service}. Ngày dự kiến: ${date}.`;
  window.location.href = `sms:0902127979?body=${encodeURIComponent(msg)}`;
});
