const menuButton=document.querySelector('.menu-toggle');
const menu=document.querySelector('.nav-links');
menuButton?.addEventListener('click',()=>{const open=menu.classList.toggle('is-open');menuButton.setAttribute('aria-expanded',String(open));});
document.querySelectorAll('.nav-links a').forEach(link=>link.addEventListener('click',()=>{menu?.classList.remove('is-open');menuButton?.setAttribute('aria-expanded','false');}));
const form=document.querySelector('.contact-form');
const message=document.querySelector('.form-message');
form?.addEventListener('submit',event=>{event.preventDefault();if(!form.checkValidity()){form.reportValidity();return;}message.textContent='Thank you! Your message has been received.';message.hidden=false;form.reset();});
