/* Don Fer · chat de la página web de Tecnigráficas
   Uso: copiar este archivo (y donfer-asoma.webp) a la carpeta de la página y poner antes de </body>:
   <script src="donfer-chat.js" defer></script>                                                        */
(function () {
  if (window.__donferChat) return; window.__donferChat = true;
  var URL_FN = "https://kqrfcdfygskzhsdzzcze.supabase.co/functions/v1/donfer-web";
  var KEY = "sb_publishable_KfkIr6TlW6ivuT5cD0g9Kg_EuZwDKJ9";
  var AVATAR = "donfer-asoma.webp";
  var WA = "https://wa.me/573122526244";
  // Asesoras: el orden se baraja en cada visita para repartir los mensajes
  var ASESORAS = [{ nombre: "Mara", num: "573122526244" }, { nombre: "Luiza", num: "573193451013" }];
  if (Math.random() < 0.5) ASESORAS.reverse();
  var msgs = [], busy = false, store = null;
  try { store = window.sessionStorage; msgs = JSON.parse(store.getItem("donfer-chat") || "[]"); } catch (e) { msgs = []; }
  function save() { try { store && store.setItem("donfer-chat", JSON.stringify(msgs.slice(-20))); } catch (e) {} }

  var css = ".dfw-fab{position:fixed;left:18px;bottom:18px;z-index:9998;display:flex;align-items:center;gap:8px;border:0;border-radius:999px;padding:7px 16px 7px 7px;background:linear-gradient(110deg,#00a6d6,#e6007e);color:#fff;font:800 14px system-ui,-apple-system,Segoe UI,sans-serif;cursor:pointer;box-shadow:0 10px 28px rgba(230,0,126,.35)}"
    + ".dfw-fab img{width:42px;height:42px;border-radius:50%;background:#fff;object-fit:cover}"
    + ".dfw-panel{position:fixed;left:18px;bottom:18px;z-index:9999;width:min(380px,calc(100vw - 24px));height:min(560px,calc(100vh - 36px));background:#fff;border-radius:20px;box-shadow:0 20px 60px rgba(20,30,50,.3);display:none;flex-direction:column;overflow:hidden;font:15px/1.45 system-ui,-apple-system,Segoe UI,sans-serif;color:#191b22}"
    + ".dfw-panel.on{display:flex}.dfw-head{display:flex;align-items:center;gap:10px;padding:12px 14px;background:linear-gradient(110deg,#00a6d6,#e6007e);color:#fff}"
    + ".dfw-head img{width:42px;height:42px;border-radius:50%;background:#fff;object-fit:cover}.dfw-head b{display:block;font-size:16px}.dfw-head small{font-size:12px;opacity:.92}"
    + ".dfw-head button{margin-left:auto;border:0;background:rgba(255,255,255,.22);color:#fff;border-radius:10px;width:34px;height:34px;font-size:20px;cursor:pointer}"
    + ".dfw-msgs{flex:1;overflow:auto;padding:14px;display:flex;flex-direction:column;gap:10px;background:#f4f6fa}"
    + ".dfw-m{max-width:88%;padding:10px 13px;border-radius:16px;white-space:pre-wrap;word-wrap:break-word}.dfw-m a{color:#e6007e;font-weight:700;word-break:break-all}"
    + ".dfw-me{align-self:flex-end;background:#0b6f93;color:#fff;border-bottom-right-radius:4px}.dfw-bot{align-self:flex-start;background:#fff;border:1px solid #e3e7ee;border-bottom-left-radius:4px}"
    + ".dfw-wa{display:inline-block;margin-top:6px;background:#25d366;color:#fff!important;text-decoration:none;border-radius:999px;padding:7px 12px;font-weight:800}"
    + ".dfw-bub{position:fixed;left:18px;bottom:84px;z-index:9998;max-width:260px;white-space:nowrap;background:#fff;color:#191b22;border:2px solid #191b22;border-radius:18px;padding:10px 30px 10px 14px;font:700 14px/1.3 system-ui,-apple-system,Segoe UI,sans-serif;box-shadow:0 8px 24px rgba(0,0,0,.18);cursor:pointer;opacity:0;transform:translateY(8px) scale(.96);transform-origin:bottom left;transition:opacity .3s,transform .3s;pointer-events:none}"
    + ".dfw-bub.on{opacity:1;transform:none;pointer-events:auto;animation:dfwBob 2.4s ease-in-out 1s infinite}"
    + ".dfw-bub:after{content:'';position:absolute;left:22px;bottom:-11px;width:16px;height:16px;background:#fff;border-right:2px solid #191b22;border-bottom:2px solid #191b22;transform:rotate(45deg)}"
    + ".dfw-bub b{color:#e6007e}.dfw-bub button{position:absolute;top:4px;right:6px;border:0;background:none;font-size:16px;line-height:1;color:#8a909c;cursor:pointer;padding:2px}"
    + "@keyframes dfwBob{0%,100%{transform:none}50%{transform:translateY(-4px)}}"
    + ".dfw-was{display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin-top:4px}.dfw-was small{width:100%;color:#6b7280}"
    + ".dfw-typing{align-self:flex-start;color:#6b7280;font-size:13px}.dfw-sugs{display:flex;flex-wrap:wrap;gap:6px}.dfw-sugs button{border:1px solid #e3e7ee;background:#fff;border-radius:999px;padding:7px 11px;font-size:13px;cursor:pointer}"
    + ".dfw-form{display:flex;gap:8px;padding:10px;border-top:1px solid #e3e7ee;background:#fff}.dfw-form textarea{flex:1;resize:none;border:1px solid #d9dde6;border-radius:12px;padding:10px;font:inherit;max-height:100px}"
    + ".dfw-form button{border:0;border-radius:12px;padding:0 16px;background:linear-gradient(110deg,#00a6d6,#e6007e);color:#fff;font-weight:800;cursor:pointer}.dfw-form button:disabled{opacity:.5}"
    + ".dfw-foot{font-size:11px;color:#8a909c;text-align:center;padding:0 10px 8px;background:#fff}.dfw-foot a{color:#8a909c}"
    + "@media(max-width:600px){.dfw-bub{left:10px;bottom:72px;max-width:calc(100vw - 20px);font-size:13px}.dfw-fab span{display:none}.dfw-fab{padding:6px}.dfw-panel{left:6px;bottom:6px;width:calc(100vw - 12px);height:calc(100vh - 12px)}}";
  var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  var fab = document.createElement("button");
  fab.type = "button"; fab.className = "dfw-fab"; fab.setAttribute("aria-label", "Chatea con Don Fer");
  fab.innerHTML = '<img src="' + AVATAR + '" alt=""><span>¿Te ayudo a cotizar?</span>';
  var panel = document.createElement("div");
  panel.className = "dfw-panel"; panel.setAttribute("role", "dialog"); panel.setAttribute("aria-label", "Chat con Don Fer");
  panel.innerHTML = '<div class="dfw-head"><img src="' + AVATAR + '" alt=""><div><b>Don Fer</b><small>Asistente de Tecnigráficas</small></div><button type="button" aria-label="Cerrar">×</button></div>'
    + '<div class="dfw-msgs"></div>'
    + '<form class="dfw-form"><textarea rows="1" placeholder="Escribe tu pregunta…" aria-label="Tu mensaje"></textarea><button type="submit">Enviar</button></form>'
    + '<div class="dfw-foot">Respuestas con IA · WhatsApp: ' + ASESORAS.map(function (a) { return '<a href="https://wa.me/' + a.num + '" target="_blank" rel="noopener">' + a.nombre + "</a>"; }).join(" · ") + "</div>";
  var bub = document.createElement("div");
  bub.className = "dfw-bub"; bub.setAttribute("role", "button"); bub.setAttribute("aria-label", "Chatea con Don Fer");
  bub.innerHTML = '¡Hola! 👋 <b>Chatea con Don Fer</b><button type="button" aria-label="Cerrar">×</button>';
  document.body.appendChild(fab); document.body.appendChild(panel); document.body.appendChild(bub);
  var bubOff = false; try { bubOff = !!(store && store.getItem("donfer-bub-off")); } catch (e) {}
  function hideBub(forever) { bub.classList.remove("on"); if (forever) { bubOff = true; try { store && store.setItem("donfer-bub-off", "1"); } catch (e) {} } }
  if (!bubOff && !msgs.length) setTimeout(function () { if (!panel.classList.contains("on") && !bubOff) bub.classList.add("on"); }, 2000);
  bub.addEventListener("click", function (e) { if (e.target.tagName === "BUTTON") { e.stopPropagation(); hideBub(true); return; } hideBub(true); fab.click(); });
  var box = panel.querySelector(".dfw-msgs"), input = panel.querySelector("textarea"), send = panel.querySelector(".dfw-form button");
  var sugs = ["¿Qué productos hacen?", "Quiero cotizar stickers", "¿Hacen avisos para local?", "¿Dónde quedan y en qué horario?"];

  function esc(t) { return String(t).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function fmt(t) {
    var h = esc(t).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/^[-*] /gm, "• ");
    return h.replace(/https:\/\/wa\.me\/\d+(\?text=[^\s<)]*)?/g, function (_, q) {
        return '<span class="dfw-was"><small>Escoge con quién quieres hablar:</small>' + ASESORAS.map(function (a) {
          return '<a class="dfw-wa" href="https://wa.me/' + a.num + (q || "") + '" target="_blank" rel="noopener">💬 ' + a.nombre + '</a>';
        }).join(" ") + "</span>";
      })
      .replace(/(^|[\s(])(https?:\/\/(?!wa\.me)[^\s<)]+)/g, '$1<a href="$2" target="_blank" rel="noopener">$2</a>');
  }
  function render() {
    var h = msgs.length ? "" : '<div class="dfw-m dfw-bot">¡Hola! 👋 Soy <b>Don Fer</b>, de Tecnigráficas. Cuéntame qué necesitas imprimir y te ayudo.</div><div class="dfw-sugs">'
      + sugs.map(function (q) { return '<button type="button" data-q="' + esc(q) + '">' + esc(q) + "</button>"; }).join("") + "</div>";
    h += msgs.map(function (m) { return '<div class="dfw-m ' + (m.role === "user" ? "dfw-me" : "dfw-bot") + '">' + (m.role === "user" ? esc(m.content) : fmt(m.content)) + "</div>"; }).join("");
    if (busy) h += '<div class="dfw-typing">Don Fer está escribiendo…</div>';
    box.innerHTML = h; box.scrollTop = box.scrollHeight; send.disabled = busy;
  }
  function ask(q) {
    q = String(q || "").trim(); if (!q || busy) return;
    msgs.push({ role: "user", content: q }); busy = true; input.value = ""; render();
    fetch(URL_FN, { method: "POST", headers: { "Content-Type": "application/json", apikey: KEY, Authorization: "Bearer " + KEY }, body: JSON.stringify({ messages: msgs }) })
      .then(function (r) { return r.json(); })
      .then(function (d) { msgs.push({ role: "assistant", content: (d && (d.reply || d.error)) || "Escríbenos por WhatsApp: " + WA }); })
      .catch(function () { msgs.push({ role: "assistant", content: "No me pude conectar 😕. Escríbenos por WhatsApp: " + WA }); })
      .then(function () { busy = false; save(); render(); input.focus(); });
  }
  fab.addEventListener("click", function () { hideBub(true); panel.classList.add("on"); fab.style.display = "none"; render(); setTimeout(function () { input.focus(); }, 50); });
  panel.querySelector(".dfw-head button").addEventListener("click", function () { panel.classList.remove("on"); fab.style.display = ""; });
  panel.querySelector("form").addEventListener("submit", function (e) { e.preventDefault(); ask(input.value); });
  input.addEventListener("keydown", function (e) { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); ask(input.value); } });
  box.addEventListener("click", function (e) { var b = e.target.closest && e.target.closest("[data-q]"); if (b) ask(b.getAttribute("data-q")); });
})();
