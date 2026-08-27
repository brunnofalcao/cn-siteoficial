(function(){
  'use strict';

  /* ─── Tabela de preços ─── */
  var TIERS = {
    pro: { anchor:'R$ 1.997', price:'134,14', cash:'R$ 1.297,00', bar:'12x R$ 134,14',
           save:'Condição de setembro: economize R$ 700', label:'Profissional · setembro',
           terms:'* Parcelamento em até 12x no cartão, com juros da plataforma de pagamento. Prazo de 12 meses para concluir a formação. Primeiro ano de membership incluso.',
           url:'https://pay.hotmart.com/Q107343998H?off=op5bstjb' },
    est: { anchor:'R$ 997', price:'72,09', cash:'R$ 697,00', bar:'12x R$ 72,09',
           save:'Condição de setembro: economize R$ 300', label:'Estudante · setembro',
           terms:'* Parcelamento em até 12x no cartão, com juros da plataforma de pagamento. Requer comprovação de matrícula em graduação da área da saúde. Prazo de 12 meses para concluir.',
           url:'https://pay.hotmart.com/Q107343998H?off=ntka92gh' }
  };
  var tier = 'pro';

  var $ = function(id){ return document.getElementById(id); };

  function renderPrice(){
    if(!$('price')) return;
    var t = TIERS[tier];
    $('anchor').textContent = t.anchor;
    $('price').textContent  = t.price;
    $('cash').textContent   = t.cash;
    $('save').textContent   = t.save;
    $('terms').textContent  = t.terms;
    if($('mbar-price')) $('mbar-price').textContent = t.bar;
    if($('mbar-lb'))    $('mbar-lb').textContent    = t.label;
    $('checkout').setAttribute('href', t.url);
  }

  /* ─── Alternador de perfil ─── */
  ['pro','est'].forEach(function(k){
    var b = $('tier-' + k);
    if(!b) return;
    b.addEventListener('click', function(){
      tier = k;
      $('tier-pro').setAttribute('aria-pressed', String(k === 'pro'));
      $('tier-est').setAttribute('aria-pressed', String(k === 'est'));
      renderPrice();
      track('select_tier', { tier: k });
    });
  });

  /* ─── Contagem regressiva até o fim de setembro ─── */
  var DEADLINE = new Date('2026-09-30T23:59:59-03:00').getTime();
  function tick(){
    if(!$('cd')) return;
    var d = DEADLINE - Date.now();
    if(d < 0) d = 0;
    var s = Math.floor(d / 1000);
    var pad = function(n){ return String(n).padStart(2,'0'); };
    $('cd').textContent = pad(Math.floor(s / 86400));
    $('ch').textContent = pad(Math.floor(s % 86400 / 3600));
    $('cm').textContent = pad(Math.floor(s % 3600 / 60));
    $('cs').textContent = pad(s % 60);
  }
  if($('cd')){ tick(); setInterval(tick, 1000); }

  /* ─── FAQ acordeão ─── */
  document.querySelectorAll('.q > button').forEach(function(b){
    b.addEventListener('click', function(){
      var item = b.parentElement;
      var open = item.classList.contains('open');
      document.querySelectorAll('.q').forEach(function(q){ q.classList.remove('open'); });
      if(!open){ item.classList.add('open'); track('faq_open', { q: b.textContent.trim() }); }
    });
  });

  /* ─── Abas (instrumentos e docentes) ─── */
  function bindTabs(pairs){
    pairs.forEach(function(p){
      var btn = $(p[0]);
      if(!btn) return;
      btn.addEventListener('click', function(){
        pairs.forEach(function(q){
          var on = q[0] === p[0];
          $(q[0]).setAttribute('aria-selected', String(on));
          $(q[1]).hidden = !on;
        });
      });
    });
  }
  bindTabs([['tab-prop','pan-prop'],['tab-cons','pan-cons']]);
  bindTabs([['tab-int','pan-int'],['tab-nac','pan-nac']]);

  /* ─── Revelação no scroll ─── */
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold:.08, rootMargin:'0px 0px -50px 0px' });
  document.querySelectorAll('.rv').forEach(function(el){ io.observe(el); });

  /* ─── Barra mobile ─── */
  var mbar = $('mbar'), hero = document.querySelector('.hero, .hero-in'), cart = $('investimento');
  function toggleBar(){
    if(!mbar) return;
    var pastHero = window.scrollY > (hero ? hero.offsetHeight : 400);
    var inCart = false;
    if(cart){ var r = cart.getBoundingClientRect(); inCart = r.top < window.innerHeight && r.bottom > 0; }
    mbar.classList.toggle('on', pastHero && !inCart);
    mbar.setAttribute('aria-hidden', String(!(pastHero && !inCart)));
  }
  window.addEventListener('scroll', toggleBar, { passive:true });
  toggleBar();

  /* ─── UTM persistente nos links de checkout ─── */
  var qs = window.location.search;
  if(qs.indexOf('utm_') > -1){
    try{ sessionStorage.setItem('cn_utm', qs); }catch(e){}
  }
  var utm = '';
  try{ utm = sessionStorage.getItem('cn_utm') || ''; }catch(e){}
  if(utm){
    document.addEventListener('click', function(ev){
      var a = ev.target.closest('a[href*="pay.hotmart.com"]');
      if(a && a.href.indexOf('utm_') === -1){
        a.href += (a.href.indexOf('?') > -1 ? '&' : '?') + utm.replace(/^\?/,'');
      }
    });
  }

  /* ─── Eventos de conversão ─── */
  function track(name, data){
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(Object.assign({ event:'cn_' + name }, data || {}));
  }
  document.querySelectorAll('[data-ev]').forEach(function(el){
    el.addEventListener('click', function(){
      track(el.getAttribute('data-ev'), { tier: tier });
    });
  });

  /* ─── Profundidade de scroll ─── */
  var marks = [25,50,75,100], hit = {};
  window.addEventListener('scroll', function(){
    var p = (window.scrollY + window.innerHeight) / document.body.scrollHeight * 100;
    marks.forEach(function(m){
      if(p >= m && !hit[m]){ hit[m] = 1; track('scroll_depth', { depth:m }); }
    });
  }, { passive:true });

  /* ─── Grade programática, acordeão de módulos ─── */
  document.querySelectorAll('.mod > button').forEach(function(b){
    b.addEventListener('click', function(){
      var m = b.parentElement;
      m.classList.toggle('open');
      if(m.classList.contains('open')){
        track('modulo_abrir', { modulo: b.querySelector('.mod-name').firstChild.textContent.trim() });
      }
    });
  });
  if($('abrir')) $('abrir').addEventListener('click', function(){
    document.querySelectorAll('.mod').forEach(function(m){ m.classList.add('open'); });
    track('grade_expandir', {});
  });
  if($('fechar')) $('fechar').addEventListener('click', function(){
    document.querySelectorAll('.mod').forEach(function(m){ m.classList.remove('open'); });
  });

  /* ─── UTM propagada também na navegação entre páginas ─── */
  if(utm){
    document.querySelectorAll('a[href^="/"]').forEach(function(a){
      if(a.getAttribute('href').indexOf('#') !== 0 && a.href.indexOf('utm_') === -1){
        a.href += (a.href.indexOf('?') > -1 ? '&' : '?') + utm.replace(/^\?/,'');
      }
    });
  }

  renderPrice();
})();
