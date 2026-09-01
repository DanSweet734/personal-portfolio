document.getElementById('year').textContent = '© ' + new Date().getFullYear() + ' Daniel Sweet, made with html/css/js';

var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// boot sequence
var bootLines = [
  { cmd: 'whoami', out: 'daniel-sweet' },
  { cmd: 'cat role.txt', out: 'CS senior @ CSUN — full-stack + self-hosted infra' }
];
var bootEl = document.getElementById('boot');

function renderStatic(){
  bootEl.innerHTML = bootLines.map(function(l){
    return '<div class="line">$ ' + l.cmd + '<br><span class="out">' + l.out + '</span></div>';
  }).join('');
}

if(reduceMotion){
  renderStatic();
} else {
  bootEl.innerHTML = '';
  var li = 0, ci = 0, phase = 'cmd';
  var curLineEl = null;

  function typeStep(){
    if(li >= bootLines.length){
      var cur = document.createElement('span');
      cur.className = 'cursor';
      bootEl.appendChild(cur);
      return;
    }
    var line = bootLines[li];
    if(!curLineEl){
      curLineEl = document.createElement('div');
      curLineEl.className = 'line';
      bootEl.appendChild(curLineEl);
    }
    if(phase === 'cmd'){
      var target = '$ ' + line.cmd;
      curLineEl.textContent = target.slice(0, ci + 1);
      ci++;
      if(ci >= target.length){ phase = 'out'; ci = 0; curLineEl.innerHTML += '<br><span class="out"></span>'; }
      setTimeout(typeStep, 28);
    } else {
      var outSpan = curLineEl.querySelector('.out');
      outSpan.textContent = line.out.slice(0, ci + 1);
      ci++;
      if(ci >= line.out.length){ li++; ci = 0; phase = 'cmd'; curLineEl = null; setTimeout(typeStep, 260); }
      else { setTimeout(typeStep, 14); }
    }
  }
  setTimeout(typeStep, 400);
}

// scroll reveal
if('IntersectionObserver' in window && !reduceMotion){
  var obs = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){ e.target.classList.add('in-view'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.panel.reveal').forEach(function(p){ obs.observe(p); });
} else {
  document.querySelectorAll('.panel.reveal').forEach(function(p){ p.classList.add('in-view'); });
}
