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

  // ----- Nieve de tinta (cae por toda la pantalla mientras navegan) -----
  const hero=document.querySelector(".hero")||document.querySelector("header.top");
  if(hero&&!RM){
    const sn=document.createElement("div");sn.className="nieve";sn.setAttribute("aria-hidden","true");
    const cols=["var(--cian)","var(--magenta)","var(--amarillo)","b","b"];
    const n=innerWidth<640?14:24;let h="";
    for(let i=0;i<n;i++){const c=cols[i%cols.length],s=(4+Math.random()*6).toFixed(1);
      h+=`<i class="${c==="b"?"b":""}" style="--x:${(Math.random()*100).toFixed(1)}%;--s:${s}px;--c:${c};--t:${(10+Math.random()*9).toFixed(1)}s;--d:-${(Math.random()*18).toFixed(1)}s;--o:${(0.35+Math.random()*0.35).toFixed(2)}"></i>`}
    sn.innerHTML=h;document.body.appendChild(sn);
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


  // ----- Música navideña: cajita musical de "Noche de paz" (Franz Gruber, 1818, dominio público) -----
  // Se genera en el navegador (Web Audio): no hay archivo de audio ni derechos. Solo suena si el cliente toca el botón.
  (function musica(){
    const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;
    const N=n=>440*Math.pow(2,(n-69)/12);
    const C4=60,D4=62,E4=64,F4=65,G4=67,A4=69,B4=71,C5=72,D5=74,E5=76,F5=77;
    // [nota, duración en negras]
    const MEL=[[G4,1.5],[A4,.5],[G4,1],[E4,3],[G4,1.5],[A4,.5],[G4,1],[E4,3],[D5,2],[D5,1],[B4,3],[C5,2],[C5,1],[G4,3],
      [A4,2],[A4,1],[C5,1.5],[B4,.5],[A4,1],[G4,1.5],[A4,.5],[G4,1],[E4,3],[A4,2],[A4,1],[C5,1.5],[B4,.5],[A4,1],[G4,1.5],[A4,.5],[G4,1],[E4,3],
      [D5,2],[D5,1],[F5,1.5],[D5,.5],[B4,1],[C5,3],[E5,3],[C5,1],[G4,1],[E4,1],[G4,1.5],[F4,.5],[D4,1],[C4,6]];
    const CH={C:[48,55,64],G:[43,55,62],F:[41,57,60]};
    const BARS="CCCCGGCCFFCCFFCCGGCCCGCC".split(""); // 24 compases de 3/4
    const BEAT=.62;
    let ctx,master,wet,playing=false,loopT,startAt=0;
    function setup(){
      ctx=new AC();master=ctx.createGain();master.gain.value=0;master.connect(ctx.destination);
      // eco suave (sala)
      const len=ctx.sampleRate*2.2,ir=ctx.createBuffer(2,len,ctx.sampleRate);
      for(let c=0;c<2;c++){const d=ir.getChannelData(c);for(let i=0;i<len;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/len,3)}
      const conv=ctx.createConvolver();conv.buffer=ir;wet=ctx.createGain();wet.gain.value=.32;conv.connect(wet);wet.connect(master);
      master._dry=ctx.createGain();master._dry.gain.value=.8;master._dry.connect(master);master._conv=conv;
    }
    function tine(t,midi,vol,dur){
      const f=N(midi);[[1,1],[4.02,.14],[8.1,.04]].forEach(([k,a])=>{
        const o=ctx.createOscillator(),g=ctx.createGain();o.type="sine";o.frequency.value=f*k;
        g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(vol*a,t+.006);g.gain.exponentialRampToValueAtTime(.0001,t+Math.min(dur,2.4)/(k>1?3:1)+.25);
        o.connect(g);g.connect(master._dry);g.connect(master._conv);o.start(t);o.stop(t+2.8)});
    }
    function schedule(t0){
      let t=t0;MEL.forEach(([n,d])=>{tine(t,n,.5,d*BEAT+.6);t+=d*BEAT});
      BARS.forEach((ch,i)=>{const bt=t0+i*3*BEAT,[r,a,b]=CH[ch];tine(bt,r,.28,3*BEAT);tine(bt+BEAT,a,.13,BEAT);tine(bt+2*BEAT,b,.11,BEAT)});
      return t-t0;
    }
    function loop(){const len=schedule(ctx.currentTime+.08);loopT=setTimeout(()=>{if(playing)loop()},(len+2.2)*1000)}
    function play(){
      if(!ctx)setup();ctx.resume();playing=true;
      master.gain.cancelScheduledValues(ctx.currentTime);master.gain.setValueAtTime(master.gain.value,ctx.currentTime);master.gain.linearRampToValueAtTime(.16,ctx.currentTime+1.2);
      if(!loopT)loop();btn.classList.add("on");btn.setAttribute("aria-pressed","true");btn.setAttribute("aria-label","Apagar la música navideña");hideTip();
    }
    function stop(){
      playing=false;btn.classList.remove("on");btn.setAttribute("aria-pressed","false");btn.setAttribute("aria-label","Poner música navideña");
      if(!ctx)return;const now=ctx.currentTime;master.gain.cancelScheduledValues(now);master.gain.setValueAtTime(master.gain.value,now);master.gain.linearRampToValueAtTime(0,now+.6);
      clearTimeout(loopT);loopT=null;setTimeout(()=>{if(!playing)ctx.suspend()},700);
    }
    const btn=document.createElement("button");btn.type="button";btn.className="musica";btn.setAttribute("aria-pressed","false");btn.setAttribute("aria-label","Poner música navideña");
    btn.innerHTML=`<svg class="nota" aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3" fill="#EC008C"/><circle cx="17" cy="16" r="3" fill="#00AEEF"/></svg><span class="ondas" aria-hidden="true"><i></i><i></i><i></i></span>`;
    const tip=document.createElement("div");tip.className="musica-tip";tip.textContent="¿Música navideña? 🎄";
    document.body.append(btn,tip);
    btn.addEventListener("click",()=>playing?stop():play());
    tip.addEventListener("click",()=>play());
    function hideTip(){tip.classList.remove("on")}
    try{if(!sessionStorage.getItem("tcMusicaTip")){setTimeout(()=>{if(!playing){tip.classList.add("on");sessionStorage.setItem("tcMusicaTip","1");setTimeout(hideTip,6000)}},3500)}}catch(_){}
    document.addEventListener("visibilitychange",()=>{if(!ctx)return;if(document.hidden)ctx.suspend();else if(playing)ctx.resume()});
  })();

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
