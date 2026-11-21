/* Movimiento de la página web (nov-2026). Ver movimiento.css. */
(()=>{
  const RM=matchMedia("(prefers-reduced-motion: reduce)").matches;
  const root=document.documentElement;

  // ----- "full color": cada letra de un color CMYK (también sin animación) -----
  const COLS=["var(--cian)","var(--magenta)","var(--negro)"];
  document.querySelectorAll(".full").forEach(el=>{
    let j=0;
    el.innerHTML=[...el.textContent].map(ch=>ch===" "?" ":`<span class="lt" style="--lc:${COLS[j%3]};--j:${j};--lr:${(j++%2?6:-6)}deg">${ch}</span>`).join("");
  });

  // ----- barra CMYK de avance -----
  const bar=document.createElement("div");bar.className="mv-bar";bar.setAttribute("aria-hidden","true");document.body.appendChild(bar);
  let ticking=false;
  function onScroll(){
    if(ticking)return;ticking=true;
    requestAnimationFrame(()=>{
      const h=document.documentElement.scrollHeight-innerHeight;bar.style.transform=`scaleX(${h>0?Math.min(1,scrollY/h):0})`;
      if(!RM)parallax();
      ticking=false;
    });
  }
  addEventListener("scroll",onScroll,{passive:true});onScroll();

  if(RM)return;
  root.classList.add("mv");

  // ----- titular: palabra por palabra -----
  const h1=document.querySelector(".hero h1");
  if(h1){
    let i=0;
    [...h1.childNodes].forEach(n=>{
      if(n.nodeType===3){
        const frag=document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach(part=>{
          if(!part)return;
          if(/^\s+$/.test(part)){frag.appendChild(document.createTextNode(part));return}
          const w=document.createElement("span");w.className="w";w.style.setProperty("--i",i++);w.textContent=part;frag.appendChild(w);
        });
        h1.replaceChild(frag,n);
      }else if(n.nodeType===1&&n.classList.contains("full")){n.style.setProperty("--i",i++)}
    });
  }

  // ----- 26 años que cuentan -----
  const anios=document.querySelector(".anios");
  if(anios&&/26/.test(anios.textContent)){
    const html=anios.innerHTML;let n=0;
    setTimeout(()=>{const t=setInterval(()=>{n+=1;anios.innerHTML=html.replace("26",String(n));if(n>=26){clearInterval(t);anios.innerHTML=html}},38)},1100);
  }

  // ----- aparición al hacer scroll -----
  const SEL=[".sellos .sello",".cats-head>*",".cats-grid>.tile",".sec .h-l",".eyebrow",".lead:not(.hero .lead)",
    ".bloque",".cuaderno",".refgrid>.ref",".paso",".familia>.miembro",".historia .wrap>*>*",".parati>*",".infos>*",
    "#grid>.card",".cta",".cita",".don-disena","footer .wrap>*",".gotas>*",".cu-card",".lineas>*",".nota"].join(",");
  const io=new IntersectionObserver(es=>es.forEach(e=>{
    if(!e.isIntersecting)return;const el=e.target;io.unobserve(el);
    el.classList.add("mv-in");
    // al terminar se quitan las clases para que vuelvan los efectos originales (hover, etc.)
    if(!el.matches(".gotas>*"))setTimeout(()=>el.classList.remove("mv-rv","mv-in","mv-l","mv-r"),1300+(+el.style.getPropertyValue("--d")||0)*85);
  }),{threshold:.12,rootMargin:"0px 0px -6% 0px"});
  const seen=new WeakSet();
  function prep(scope){
    (scope||document).querySelectorAll(SEL).forEach(el=>{
      if(seen.has(el)||el.closest(".hero"))return;seen.add(el);
      const sib=[...el.parentElement.children].filter(x=>x.matches(SEL));
      const k=Math.max(0,sib.indexOf(el));
      el.style.setProperty("--d",Math.min(k,8));
      el.classList.add("mv-rv");
      if(el.matches(".bloque,.cuaderno"))el.classList.add(k%2?"mv-r":"mv-l");
      // si ya está a la vista al cargar, igual entra animado
      io.observe(el);
    });
    (scope||document).querySelectorAll(".mark:not(.full)").forEach(m=>{
      if(seen.has(m))return;seen.add(m);
      const o=new IntersectionObserver(es=>{if(es[0].isIntersecting){m.classList.add("mv-stamp");o.disconnect()}},{threshold:.6});o.observe(m);
    });
  }
  prep();
  // lo que se pinta después (catálogo, familia CMYK…)
  new MutationObserver(ms=>{if(ms.some(m=>m.addedNodes.length))prep()}).observe(document.querySelector("main")||document.body,{childList:true,subtree:true});

  // ----- tarjetas que se inclinan con el mouse (solo computador) -----
  if(matchMedia("(hover:hover) and (pointer:fine)").matches){
    const TILT=".card,.paso,.miembro,.cu-card";
    document.addEventListener("pointermove",e=>{
      const el=e.target.closest&&e.target.closest(TILT);
      document.querySelectorAll(".mv-tilt").forEach(x=>{if(x!==el){x.style.transform="";x.classList.remove("mv-tilt")}});
      if(!el||el.classList.contains("mv-rv"))return;
      const r=el.getBoundingClientRect(),px=(e.clientX-r.left)/r.width-.5,py=(e.clientY-r.top)/r.height-.5;
      el.classList.add("mv-tilt");
      el.style.transform=`perspective(900px) rotateX(${(-py*8).toFixed(2)}deg) rotateY(${(px*10).toFixed(2)}deg) translateY(-4px)`;
    },{passive:true});
    document.addEventListener("pointerleave",()=>document.querySelectorAll(".mv-tilt").forEach(x=>{x.style.transform="";x.classList.remove("mv-tilt")}));
  }

  // ----- parallax suave del hero -----
  const art=document.querySelector(".hero-art");
  const layers=art?[[".f1",-.06],[".f2",.05],[".f3",-.1],[".donfer-hero",.12],[".bg",.03]].map(([s,k])=>[art.querySelector(s),k]).filter(x=>x[0]):[];
  function parallax(){
    if(!layers.length||scrollY>1200)return;
    layers.forEach(([el,k])=>{el.style.translate=`0 ${(scrollY*k).toFixed(1)}px`});
  }
})();
