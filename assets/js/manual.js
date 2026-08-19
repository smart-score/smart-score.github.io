const language=document.getElementById('language'),currentFlag=document.getElementById('current-flag'),currentLanguage=document.getElementById('current-language');
function setLanguage(code){const active=code==='de'?'de':'en';document.documentElement.lang=active;const detailsPage=document.querySelector('.details-page');const pageTitle=detailsPage?detailsPage.dataset[active==='de'?'titleDe':'titleEn']:active==='de'?'Anleitung':'User Manual';document.title=pageTitle+' · Smart-Score';document.querySelectorAll('[data-en][data-de]').forEach(element=>element.textContent=element.dataset[active]);language.querySelector('summary').setAttribute('aria-label',active==='de'?'Sprache auswählen':'Select language');currentLanguage.textContent=active==='de'?'Deutsch':'English';currentFlag.className='flag '+(active==='de'?'flag-de':'flag-us');localStorage.setItem('smartscore-language',active);language.open=false}
language.querySelectorAll('[data-language]').forEach(button=>button.addEventListener('click',()=>setLanguage(button.dataset.language)));
setLanguage(localStorage.getItem('smartscore-language')||'en');

const manualScroll=document.querySelector('.manual-scroll');
document.querySelectorAll('.manual-nav a[href^="#"]').forEach(link=>link.addEventListener('click',event=>{
  event.preventDefault();
  const target=document.querySelector(link.getAttribute('href'));
  if(!target)return;
  const scrollStyle=getComputedStyle(manualScroll);
  const usesInnerScroll=(scrollStyle.overflowY==='auto'||scrollStyle.overflowY==='scroll')&&manualScroll.scrollHeight>manualScroll.clientHeight;
  if(usesInnerScroll){
    const top=target.getBoundingClientRect().top-manualScroll.getBoundingClientRect().top+manualScroll.scrollTop;
    manualScroll.scrollTo({top,behavior:'smooth'});
  }else{
    target.scrollIntoView({behavior:'smooth',block:'start'});
  }
  history.replaceState(null,'',link.getAttribute('href'));
}));
