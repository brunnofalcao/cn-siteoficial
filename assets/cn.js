(function(){
  'use strict';

  /* ─── Tabela de preços ─── */
  var TIERS = {
    pro: { anchor:'R$ 1.997', price:'134,14', cash:'R$ 1.297,00', bar:'12x R$ 134,14',
           save:'Economize R$ 700 em setembro',
           terms:'* Parcelamento em até 12x no cartão, com juros da plataforma de pagamento. Prazo de 12 meses para concluir a formação. Primeiro ano de membership incluso.',
           url:'https://pay.hotmart.com/Q107343998H?off=op5bstjb' },
    est: { anchor:'R$ 997', price:'72,09', cash:'R$ 697,00', bar:'12x R$ 72,09',
           save:'Economize R$ 300 em setembro',
           terms:'* Parcelamento em até 12x no cartão, com juros da plataforma de pagamento. Requer comprovação de matrícula em graduação da área da saúde. Prazo de 12 meses para concluir.',
           url:'https://pay.hotmart.com/Q107343998H?off=ntka92gh' }
  };
  var tier = 'pro';
  function $(id){ return document.getElementById(id); }
  function set(id, v){ var el = $(id); if(el) el.textContent = v; }

  function track(name, data){
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(Object.assign({ event:'cn_' + name }, data || {}));
  }

  function renderPrice(){
    var t = TIERS[tier];
    set('anchor', t.anchor); set('price', t.price); set('cash', t.cash);
    set('save', t.save); set('terms', t.terms);
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

  /* ─── Contagem regressiva ─── */
  var DEADLINE = new Date('2026-09-30T23:59:59-03:00').getTime();
  function tick(){
    if(!$('cd')) return;
    var d = DEADLINE - Date.now(); if(d < 0) d = 0;
    var s = Math.floor(d / 1000);
    var pad = function(n){ return String(n).padStart(2,'0'); };
    set('cd', pad(Math.floor(s / 86400)));
    set('ch', pad(Math.floor(s % 86400 / 3600)));
    set('cm', pad(Math.floor(s % 3600 / 60)));
    set('cs', pad(s % 60));
  }
  if($('cd')){ tick(); setInterval(tick, 1000); }

  /* ─── Menu mobile ─── */
  var burger = $('burger'), drawer = $('drawer');
  if(burger && drawer){
    burger.addEventListener('click', function(){
      var open = drawer.hasAttribute('hidden');
      if(open){ drawer.removeAttribute('hidden'); } else { drawer.setAttribute('hidden',''); }
      burger.setAttribute('aria-expanded', String(open));
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
