/* Navidad sutil para sastecnigraficas.com.
   Se activa sola cada año del 15 de noviembre al 6 de enero (Reyes). Para probarla fuera de temporada: ?navidad=1
   Incluye: Don Fer navideño en la portada, luces CMYK bajo el menú, nieve de tinta en la portada,
   gorrito en las gotas CMYK, mensajes navideños en la cinta y la franja "Regala algo hecho aquí". */
(()=>{
  const now=new Date(),m=now.getMonth()+1,d=now.getDate();
  const forced=/[?&]navidad=1/.test(location.search);
  const on=forced||(m===11&&d>=15)||m===12||(m===1&&d<=6);
  if(!on)return;
  const year=m===1?now.getFullYear()-1:now.getFullYear();
  const RM=matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.documentElement.classList.add("navidad");

  // ----- Don Fer navideño en la portada -----
  document.querySelectorAll(".donfer-hero,.top .donfer").forEach(don=>{don.src="donfer-navidad.webp";don.width=369;don.height=362;don.alt="Don Fer con gorro de Navidad, saludando"});
  const isLinks=!!document.querySelector(".top .top-in");

  // ----- Luces CMYK bajo el menú -----
  const nav=document.querySelector(".nav")||document.querySelector("header.top");
  if(nav){
    const box=document.createElement("div");box.className="luces"+(isLinks?" arriba":"");box.setAttribute("aria-hidden","true");nav.appendChild(box);
    const COL=isLinks?[["#00AEEF","rgba(0,174,239,.9)"],["#EC008C","rgba(236,0,140,.9)"],["#FFFFFF","rgba(255,255,255,.95)"]]:[["#00AEEF","rgba(0,174,239,.9)"],["#EC008C","rgba(236,0,140,.9)"],["#FFE600","rgba(255,220,0,.9)"]];
    const draw=()=>{
      const w=nav.clientWidth,step=w<640?34:46,n=Math.ceil(w/step)+1;
      let path=`M0 2`,foc="";
      for(let i=0;i<n;i++){const x=i*step;path+=` Q${x+step/2} 12 ${x+step} 2`;
        const cx=x+step/2,cy=7,[c,g]=COL[i%3];
        foc+=`<g class="foco" style="--d:${(i*0.37%2.6).toFixed(2)}s;--g:${g}"><rect x="${cx-2}" y="${cy-1}" width="4" height="3" rx="1" fill="#1A1A1A"/><ellipse cx="${cx}" cy="${cy+6}" rx="3.6" ry="5" fill="${c}" stroke="#1A1A1A" stroke-width="1.2"/></g>`}
      box.innerHTML=`<svg viewBox="0 0 ${w} 20" preserveAspectRatio="none"><path d="${path}" fill="none" stroke="#1A1A1A" stroke-width="1.3"/>${foc}</svg>`;
    };
    draw();let t;addEventListener("resize",()=>{clearTimeout(t);t=setTimeout(draw,200)});
  }

  // ----- Nieve de tinta (solo en la portada) -----
  const hero=document.querySelector(".hero")||document.querySelector("header.top");
  if(hero&&!RM){
    const sn=document.createElement("div");sn.className="nieve";sn.setAttribute("aria-hidden","true");
    const cols=["var(--cian)","var(--magenta)","var(--amarillo)","b","b"];
    const n=innerWidth<640?14:24;let h="";
    for(let i=0;i<n;i++){const c=cols[i%cols.length],s=(4+Math.random()*6).toFixed(1);
      h+=`<i class="${c==="b"?"b":""}" style="--x:${(Math.random()*100).toFixed(1)}%;--s:${s}px;--c:${c};--t:${(10+Math.random()*9).toFixed(1)}s;--d:-${(Math.random()*18).toFixed(1)}s;--o:${(0.35+Math.random()*0.35).toFixed(2)}"></i>`}
    sn.innerHTML=h;hero.prepend(sn);
  }

  // ----- Mensajes navideños en la cinta -----
  const track=document.querySelector(".cinta-track");
  if(track){
    const extra=[`🎄 FELIZ NAVIDAD DE LA FAMILIA TECNIGRÁFICAS`,`🎁 REGALOS PERSONALIZADOS PARA DICIEMBRE`];
    const spans=[...track.children],half=spans.length/2;
    [0,half].forEach((start,k)=>{const ref=track.children[start+k*extra.length*2];
      extra.forEach(t=>{const a=document.createElement("span");a.textContent=t;const b=document.createElement("span");b.textContent="●";track.insertBefore(a,ref);track.insertBefore(b,ref)})});
  }

  // ----- Gorrito navideño en las gotas CMYK -----
  const HAT=`<g class="gorro" transform="rotate(-14 50 26)"><path d="M30 30 C34 6 52 -10 80 -16 C70 -4 66 12 70 28 Z" fill="#E3242B" stroke="#1A1A1A" stroke-width="3.5" stroke-linejoin="round"/><rect x="25" y="22" width="50" height="12" rx="6" fill="#fff" stroke="#1A1A1A" stroke-width="3.5"/><circle cx="81" cy="-16" r="7" fill="#fff" stroke="#1A1A1A" stroke-width="3.5"/></g>`;
  function gorros(){
    document.querySelectorAll('svg[viewBox="-5 -2 110 114"]:not(.gota-navidad)').forEach(s=>{s.classList.add("gota-navidad");s.insertAdjacentHTML("beforeend",HAT)});
  }
  gorros();
  new MutationObserver(gorros).observe(document.querySelector("main")||document.body,{childList:true,subtree:true});

  // ----- Página de links: tarjeta de regalos -----
  const mainLink=document.querySelector("main>.link.main");
  if(mainLink&&!document.getElementById("linkRegalos")){
    const a=document.createElement("a");a.className="link m";a.id="linkRegalos";a.href="/#regalos";
    a.innerHTML=`<span class="ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8" width="18" height="13" rx="2"/><path d="M3 12h18M12 8v13"/><path d="M12 8c-2-4-6-4-6-1.5S10 8 12 8zM12 8c2-4 6-4 6-1.5S14 8 12 8z"/></svg></span><span class="copy"><strong>Regalos para diciembre 🎄</strong><span>Agendas ${year+1}, cajas de regalo y personalizados</span></span><span class="arrow" aria-hidden="true">›</span>`;
    mainLink.after(a);
  }

  // ----- Franja "Regala algo hecho aquí" (después de las categorías) -----
  const cats=document.getElementById("categorias");
  if(cats&&!document.getElementById("regalos")){
    const sec=document.createElement("section");sec.className="regalos";sec.id="regalos";
    sec.innerHTML=`<div class="wrap">
      <div class="reg-head">
        <span class="reg-sello"><i></i>NAVIDAD ${year}</span>
        <h2 class="h-l">Regala algo <span class="mark">hecho aquí.</span></h2>
        <p class="lead">Detalles personalizados para tu familia, tu equipo y tus clientes. Pídelos con tiempo y los dejamos listos para diciembre.</p>
      </div>
      <div class="reg-grid">
        <a class="tile" href="#agendas" style="--c:#00AEEF;--t:#DDF4FD"><div><span class="ico">📒</span><b>Agendas ${year+1}</b><span>Para arrancar el año con tu marca en cada página</span></div><i aria-hidden="true">→</i></a>
        <a class="tile" href="#empaques" style="--c:#EC008C;--t:#FDE3F1"><div><span class="ico">🎁</span><b>Cajas de regalo</b><span>Tu detalle, empacado como se merece</span></div><i aria-hidden="true">→</i></a>
        <div class="tile" data-catname="Productos personalizados" role="button" tabindex="0" style="--c:#FFF200;--t:#FFFBC4"><div><span class="ico">☕</span><b>Mugs, termos y llaveros</b><span>Con nombre, foto o logo</span></div><i aria-hidden="true">→</i></div>
        <a class="tile" href="#cuadros" style="--c:#1A1A1A;--t:#F1F1EE"><div><span class="ico">🖼️</span><b>Cuadros y retablos</b><span>Fotos y fe para regalar en familia</span></div><i aria-hidden="true">→</i></a>
      </div></div>`;
    cats.after(sec);
  }
})();
