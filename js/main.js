// basic interactions: nav toggle, temple selection placeholders, year injection

document.addEventListener('DOMContentLoaded', function(){
  // year in footer
  const years = document.querySelectorAll('[id^="year"]');
  years.forEach(el => el.textContent = new Date().getFullYear());

  // nav toggle
  const navToggle = document.querySelectorAll('.nav-toggle');
  navToggle.forEach(btn => {
    btn.addEventListener('click', function(){
      const nav = document.getElementById('primary-nav');
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      if(nav.classList.contains('open')) nav.classList.remove('open');
      else nav.classList.add('open');
    });
  });

  // simple temple selection for dashboard page
  const templeButtons = document.querySelectorAll('.temple-btn');
  if(templeButtons.length){
    templeButtons.forEach(btn => {
      btn.addEventListener('click', function(){
        const t = this.dataset.temple;
        loadTempleStub(t);
      });
    });
  }

  // volunteer form stub
  const vForm = document.getElementById('volForm');
  if(vForm){
    vForm.addEventListener('submit', function(e){
      e.preventDefault();
      alert('Thank you for registering as a volunteer — this is a prototype placeholder.');
      vForm.reset();
    });
  }

  // contact form stub
  const cForm = document.getElementById('contactForm');
  if(cForm){
    cForm.addEventListener('submit', function(e){
      e.preventDefault();
      alert('Message received. This is a prototype placeholder.');
      cForm.reset();
    });
  }
});

// temple stub loader (demo placeholders). Replace with API fetch calls.
function loadTempleStub(slug){
  const nameMap = {
    tirupati: 'Tirupati',
    varanasi: 'Varanasi',
    puri: 'Puri',
    vaishnodevi: 'Vaishno Devi',
    somnath: 'Somnath',
    dwarka: 'Dwarka',
    kedarnath: 'Kedarnath',
    amarnath: 'Amarnath'
  };
  const name = nameMap[slug] || 'Unknown Temple';
  const templeNameEl = document.getElementById('temple-name');
  const statusEl = document.getElementById('temple-status');
  const queueEl = document.getElementById('queue-est');
  const waitEl = document.getElementById('avg-wait');
  const volEl = document.getElementById('vol-count');

  if(templeNameEl) templeNameEl.textContent = name;
  if(statusEl) statusEl.textContent = 'Live density: Medium';
  if(queueEl) queueEl.textContent = 'Approx. 30 mins';
  if(waitEl) waitEl.textContent = '30 - 45 mins';
  if(volEl) volEl.textContent = '12 active';

  // simple demo crowd chart draw (no chart library) — draws bars on canvas
  const canvas = document.getElementById('crowdChart');
  if(canvas && canvas.getContext){
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0,0,canvas.width,canvas.height);
    // fake hourly data
    const data = [50,80,120,200,170,90,60,40];
    const max = Math.max(...data);
    const w = canvas.width / data.length;
    data.forEach((v,i) => {
      const h = (v / max) * (canvas.height - 20);
      ctx.fillStyle = '#D98E04';
      ctx.fillRect(i * w + 8, canvas.height - h - 10, w - 16, h);
    });
  }
}
