(function(){
  'use strict';

  /* ─── Tabela de preços ─── */
  /* Black Week 23 a 30/11/2026 · cupom BLACKWEEK (40%) aplicado via offDiscount */
  var TIERS = {
    pro: { anchor:'R$ 1.997', price:'123,92', cash:'R$ 1.198,20', bar:'12x R$ 123,92',
           save:'Black Week: 40% off, economize R$ 798,80',
           terms:'* Parcelamento em até 12x no cartão, com juros da plataforma de pagamento. Prazo de 12 meses para concluir a formação. Primeiro ano de membership incluso. Condição válida até 30/11/2026, 23h59.',
           url:'https://pay.hotmart.com/Q107343998H?off=tlqjyupf&checkoutMode=10&bid=1795429768680&offDiscount=BLACKWEEK' },
    est: { anchor:'R$ 997', price:'61,87', cash:'R$ 598,20', bar:'12x R$ 61,87',
           save:'Black Week: 40% off, economize R$ 398,80',
           terms:'* Parcelamento em até 12x no cartão, com juros da plataforma de pagamento. Requer comprovação de matrícula em graduação da área da saúde. Prazo de 12 meses para concluir. Condição válida até 30/11/2026, 23h59.',
           url:'https://pay.hotmart.com/Q107343998H?off=ntka92gh&checkoutMode=10&offDiscount=BLACKWEEK' }
  };
  var tier = 'pro';
  function $(id){ return document.getElementById(id); }
  function set(id, v){ var el = $(id); if(el) el.textContent = v; }

  function track(name, data){
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(Object.assign({ event:'cn_' + name }, data || {}));
    /* espelha no GA4 como evento personalizado */
    if(typeof window.gtag === 'function'){ try{ window.gtag('event', 'cn_' + name, data || {}); }catch(e){} }
  }

  /* ─── Clique no checkout: InitiateCheckout (Meta) e begin_checkout (GA4) ─── */
  var OFFERS = {
    tlqjyupf: { value:1198.20, name:'Certificação COACH NUTRICIONAL · Profissional de saúde · Black Week', id:'cn-profissional' },
    ntka92gh: { value:598.20,  name:'Certificação COACH NUTRICIONAL · Estudante · Black Week',           id:'cn-estudante' },
    op5bstjb: { value:1297,    name:'Certificação COACH NUTRICIONAL · Profissional de saúde',             id:'cn-profissional' }
  };
  document.addEventListener('click', function(ev){
    var a = ev.target.closest && ev.target.closest('a[href*="pay.hotmart.com"]');
    if(!a) return;
    var m = a.href.match(/[?&]off=([a-z0-9]+)/i);
    var o = OFFERS[m ? m[1] : ''] || OFFERS.tlqjyupf;
    var cp = a.href.match(/[?&]offDiscount=([a-z0-9]+)/i);
    if(typeof window.fbq === 'function'){
      try{ window.fbq('track', 'InitiateCheckout', { value:o.value, currency:'BRL', content_name:o.name, content_ids:[o.id], content_type:'product', num_items:1, coupon:(cp ? cp[1] : '') }); }catch(e){}
    }
    if(typeof window.gtag === 'function'){
      try{ window.gtag('event', 'begin_checkout', { currency:'BRL', value:o.value, coupon:(cp ? cp[1] : undefined), items:[{ item_id:o.id, item_name:o.name, price:o.value, quantity:1 }], transport_type:'beacon' }); }catch(e){}
    }
  }, true);

  function renderPrice(){
    var t = TIERS[tier];
    set('anchor', t.anchor); set('price', t.price); set('cash', t.cash);
    set('save', t.save); set('terms', t.terms);
    Array.prototype.forEach.call(document.querySelectorAll('[data-tier-bar]'), function(el){ el.textContent = t.bar; });
    Array.prototype.forEach.call(document.querySelectorAll('a.checkout'), function(a){
      a.setAttribute('href', t.url);
    });
  }

  Array.prototype.forEach.call(document.querySelectorAll('[data-tier]'), function(b){
    b.addEventListener('click', function(){
      tier = b.getAttribute('data-tier');
      Array.prototype.forEach.call(document.querySelectorAll('[data-tier]'), function(o){
        var on = o.getAttribute('data-tier') === tier;
        o.setAttribute('aria-pressed', String(on));
        o.classList.toggle('on', on);
      });
      renderPrice();
      track('select_tier', { tier: tier });
    });
  });
  if(document.querySelector('[data-tier]')) renderPrice();

  /* ─── Contagem regressiva · Black Week ─── */
  var DEADLINE = new Date('2026-11-30T23:59:59-03:00').getTime();
  var cds = document.querySelectorAll('[data-cd]');
  var timer = null;
  function tick(){
    var d = DEADLINE - Date.now();
    if(d <= 0){
      d = 0;
      Array.prototype.forEach.call(document.querySelectorAll('.clock,.bw-clock,.bw-go'), function(el){ el.style.display = 'none'; });
      var st = document.querySelector('.strip-t'), sl = document.querySelector('.strip-long');
      if(st) st.textContent = 'Black Week encerrada';
      if(sl) sl.style.display = 'inline-flex';
      if(timer) clearInterval(timer);
    }
    var s = Math.floor(d / 1000);
    var pad = function(n){ return String(n).padStart(2,'0'); };
    var v = { d:pad(Math.floor(s / 86400)), h:pad(Math.floor(s % 86400 / 3600)), m:pad(Math.floor(s % 3600 / 60)), s:pad(s % 60) };
    Array.prototype.forEach.call(cds, function(el){ el.textContent = v[el.getAttribute('data-cd')]; });
  }
  if(cds.length){ tick(); timer = setInterval(tick, 1000); }

  /* ─── Menu mobile ─── */
  var burger = $('burger'), drawer = $('drawer');
  if(burger && drawer){
    var setDrawer = function(open){
      if(open){ drawer.removeAttribute('hidden'); } else { drawer.setAttribute('hidden',''); }
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    };
    burger.addEventListener('click', function(){ setDrawer(drawer.hasAttribute('hidden')); });
    document.addEventListener('keydown', function(ev){
      if(ev.key === 'Escape' && !drawer.hasAttribute('hidden')){ setDrawer(false); burger.focus(); }
    });
  }

  /* ─── Acordeões (grade, FAQ, avisos legais) ─── */
  Array.prototype.forEach.call(document.querySelectorAll('[data-acc]'), function(b){
    b.addEventListener('click', function(){
      var key = b.getAttribute('data-acc');
      var body = document.querySelector('[data-accbody="' + key + '"]');
      if(!body) return;
      var open = body.hasAttribute('hidden');
      if(open){ body.removeAttribute('hidden'); } else { body.setAttribute('hidden',''); }
      b.setAttribute('aria-expanded', String(open));
      var x = b.querySelector('.acc-x') || b.lastElementChild;
      if(x) x.textContent = open ? '−' : '+';
      if(open) track('acc_open', { item: b.textContent.trim().slice(0,80) });
    });
  });

  /* ─── Expandir / recolher tudo ─── */
  Array.prototype.forEach.call(document.querySelectorAll('[data-all]'), function(b){
    b.addEventListener('click', function(){
      var open = b.getAttribute('data-all') === 'open';
      Array.prototype.forEach.call(document.querySelectorAll('[data-accbody^="t"]'), function(body){
        if(open){ body.removeAttribute('hidden'); } else { body.setAttribute('hidden',''); }
        var btn = document.querySelector('[data-acc="' + body.getAttribute('data-accbody') + '"]');
        if(btn){
          btn.setAttribute('aria-expanded', String(open));
          var x = btn.querySelector('.acc-x') || btn.lastElementChild;
          if(x) x.textContent = open ? '−' : '+';
        }
      });
      track(open ? 'grade_expandir' : 'grade_recolher', {});
    });
  });

  /* ─── UTM persistente ─── */
  var qs = window.location.search;
  if(qs.indexOf('utm_') > -1){ try{ sessionStorage.setItem('cn_utm', qs); }catch(e){} }
  var utm = '';
  try{ utm = sessionStorage.getItem('cn_utm') || ''; }catch(e){}
  if(utm){
    document.addEventListener('click', function(ev){
      var a = ev.target.closest && ev.target.closest('a[href*="pay.hotmart.com"]');
      if(a && a.href.indexOf('utm_') === -1){
        a.href += (a.href.indexOf('?') > -1 ? '&' : '?') + utm.replace(/^\?/,'');
      }
    });
    Array.prototype.forEach.call(document.querySelectorAll('a[href^="/"]'), function(a){
      if(a.getAttribute('href').indexOf('#') !== 0 && a.href.indexOf('utm_') === -1){
        a.href += (a.href.indexOf('?') > -1 ? '&' : '?') + utm.replace(/^\?/,'');
      }
    });
  }

  /* ─── Eventos de conversão ─── */
  Array.prototype.forEach.call(document.querySelectorAll('[data-ev]'), function(el){
    el.addEventListener('click', function(){ track(el.getAttribute('data-ev'), { tier: tier }); });
  });

  /* ─── Profundidade de scroll ─── */
  var marks = [25,50,75,100], hit = {};
  window.addEventListener('scroll', function(){
    var p = (window.scrollY + window.innerHeight) / document.body.scrollHeight * 100;
    marks.forEach(function(m){ if(p >= m && !hit[m]){ hit[m] = 1; track('scroll_depth', { depth:m }); } });
  }, { passive:true });
})();
