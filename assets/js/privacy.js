const language=document.getElementById('language');
const currentFlag=document.getElementById('current-flag');
const currentLanguage=document.getElementById('current-language');
const policies={en:document.getElementById('policy-en'),de:document.getElementById('policy-de')};
const pageCopy={
  en:{language:'Select language',name:'English',title:'Privacy Policy · Smart-Score',description:'Privacy Policy for the Smart-Score app and website.'},
  de:{language:'Sprache auswählen',name:'Deutsch',title:'Datenschutzerklärung · Smart-Score',description:'Datenschutzerklärung für die Smart-Score-App und Website.'}
};
function setLanguage(code){
  const active=policies[code]?code:'en';
  const text=pageCopy[active];
  Object.entries(policies).forEach(([key,policy])=>{policy.hidden=key!==active});
  document.documentElement.lang=active;
  document.title=text.title;
  document.querySelector('meta[name="description"]').content=text.description;
  language.querySelector('summary').setAttribute('aria-label',text.language);
  currentLanguage.textContent=text.name;
  currentFlag.className='flag '+(active==='de'?'flag-de':'flag-us');
  localStorage.setItem('smartscore-language',active);
  language.open=false;
}
language.querySelectorAll('[data-language]').forEach(button=>button.addEventListener('click',()=>setLanguage(button.dataset.language)));
setLanguage(localStorage.getItem('smartscore-language')||'en');
