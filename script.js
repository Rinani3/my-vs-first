// Canvas animated background (floating particles with parallax)
(function(){
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  let width, height, particles=[]; const NUM=90;
  const DPR = Math.min(window.devicePixelRatio||1,2);

  function resize(){
    width = canvas.clientWidth = window.innerWidth;
    height = canvas.clientHeight = window.innerHeight;
    canvas.width = width * DPR; canvas.height = height * DPR; ctx.scale(DPR,DPR);
  }
  function init(){
    particles = Array.from({length:NUM},()=>({
      x: Math.random()*width,
      y: Math.random()*height,
      r: Math.random()*2+0.6,
      vx: (Math.random()-.5)*.3,
      vy: (Math.random()-.5)*.3,
      a: Math.random()*360
    }));
  }
  let mouse={x:0,y:0};
  window.addEventListener('mousemove',e=>{mouse.x=e.clientX;mouse.y=e.clientY});
  function step(){
    ctx.clearRect(0,0,width,height);
    ctx.fillStyle='rgba(110,231,255,0.5)';
    for(const p of particles){
      p.x+=p.vx; p.y+=p.vy; p.a+=0.002;
      if(p.x<-10) p.x=width+10; if(p.x>width+10) p.x=-10;
      if(p.y<-10) p.y=height+10; if(p.y>height+10) p.y=-10;
      const dx=(mouse.x-width/2)*0.0006, dy=(mouse.y-height/2)*0.0006;
      ctx.beginPath(); ctx.arc(p.x+dx*50,p.y+dy*50,p.r,0,Math.PI*2); ctx.fill();
    }
    requestAnimationFrame(step);
  }
  resize(); init(); step();
  window.addEventListener('resize',()=>{resize(); init();});
})();

// Smooth scroll and active nav link
const links=[...document.querySelectorAll('.nav__link')];
links.forEach(l=>l.addEventListener('click',e=>{
  e.preventDefault();
  document.querySelector(l.getAttribute('href')).scrollIntoView({behavior:'smooth'});
}));

// Intersection observer reveal
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('is-visible'); io.unobserve(e.target);} });
},{threshold:0.15, rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.reveal, .project-card, .card').forEach(el=>io.observe(el));

// Theme toggle
const themeToggle = document.getElementById('themeToggle');
const storedTheme = localStorage.getItem('theme');
if(storedTheme==='light') document.body.classList.add('light');
themeToggle.addEventListener('click',()=>{
  document.body.classList.toggle('light');
  localStorage.setItem('theme', document.body.classList.contains('light')?'light':'dark');
});

// Mobile menu
const menuBtn = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
menuBtn?.addEventListener('click',()=>{ nav.style.display = nav.style.display==='flex' ? 'none' : 'flex'; });

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Download CV placeholder
document.getElementById('downloadCV').addEventListener('click',e=>{
  e.preventDefault();
  alert('Attach your CV PDF to this link or route to a generated PDF.');
});

// Scroll spy for active link
const sections = [...document.querySelectorAll('section[id]')];
const spy = new IntersectionObserver((entries)=>{
  entries.forEach(ent=>{
    if(ent.isIntersecting){
      links.forEach(a=>a.classList.remove('active'));
      const found = links.find(a=>a.getAttribute('href') === `#${ent.target.id}`);
      if(found) found.classList.add('active');
    }
  });
},{threshold:0.6});
sections.forEach(s=>spy.observe(s));

// Enhanced badge animations and interactions
const badgeItems = document.querySelectorAll('.badge-item');

// Add click effects to badges
badgeItems.forEach(badge => {
  badge.addEventListener('click', () => {
    // Add ripple effect
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(110, 231, 255, 0.3);
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
    `;
    
    const rect = badge.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (rect.width / 2 - size / 2) + 'px';
    ripple.style.top = (rect.height / 2 - size / 2) + 'px';
    
    badge.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  });
  
  // Add hover sound effect (visual feedback)
  badge.addEventListener('mouseenter', () => {
    badge.style.transform = 'translateY(-2px) scale(1.05)';
  });
  
  badge.addEventListener('mouseleave', () => {
    badge.style.transform = 'translateY(0) scale(1)';
  });
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  .badge-item:active {
    transform: translateY(-1px) scale(1.02) !important;
  }
`;
document.head.appendChild(style);


