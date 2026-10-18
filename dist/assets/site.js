document.documentElement.classList.add('js');
const toggle=document.querySelector('.menu-toggle');const nav=document.querySelector('#navigation');
toggle?.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open)});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&toggle?.getAttribute('aria-expanded')==='true'){toggle.setAttribute('aria-expanded','false');nav.classList.remove('open');toggle.focus()}});
const search=document.querySelector('#guide-search');search?.addEventListener('input',()=>{const query=search.value.trim().toLowerCase();let count=0;document.querySelectorAll('[data-search]').forEach(card=>{card.hidden=!card.dataset.search.toLowerCase().includes(query);if(!card.hidden)count++});document.querySelector('#search-count').textContent=count+' guide'+(count===1?'':'s');document.querySelector('#empty-search').hidden=count>0});

