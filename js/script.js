/* RIVALS ARENA - protótipo local (sem back-end). Dados fictícios de demonstração. */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
const save = (k, v) => localStorage.setItem(k, JSON.stringify(v));
const esc = t => String(t).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const page = document.body.dataset.page;

/* ---------- Dados de demonstração ---------- */
const CAMPS = [
  { id: 1, nome: 'Rivals Cup', jogo: 'Battlezone', status: 'aberto', inicio: '2026-12-05', fim: '2026-12-20', max: 16, insc: ['Nova Five', 'Void Squad', 'Phantom'], premio: 'R$ 5.000 (fictício)', desc: 'O torneio principal da arena, em mata-mata.' },
  { id: 2, nome: 'Arena Clash', jogo: 'Battlezone', status: 'andamento', inicio: '2026-10-10', fim: '2026-11-15', max: 8, insc: ['Rushers', 'Phantom', 'Void Squad', 'Nova Five', 'Alpha', 'Zeta', 'Orion', 'Vega'], premio: 'R$ 2.500 (fictício)', desc: 'Confrontos semanais entre os oito melhores times.' },
  { id: 3, nome: 'Battle Night', jogo: 'Battlezone', status: 'aberto', inicio: '2026-11-28', fim: '2026-11-29', max: 8, insc: ['Rushers'], premio: 'Troféu digital (fictício)', desc: 'Um fim de semana intenso de partidas rápidas.' },
  { id: 4, nome: 'Rivals FIFA Cup', jogo: 'FIFA', status: 'encerrado', inicio: '2026-08-01', fim: '2026-08-30', max: 16, insc: ['Phantom', 'Nova Five'], premio: 'R$ 1.000 (fictício)', desc: 'Copa de futebol virtual, já finalizada.' }
];
const TIMES = [
  { id: 1, nome: 'Nova Five', jogo: 'Battlezone', membros: ['LunaX', 'ShadowBR', 'Kira', 'Zed', 'Mika'], lider: 'LunaX', desc: 'Time focado em estratégia e jogo coletivo.', v: 42, d: 11 },
  { id: 2, nome: 'Void Squad', jogo: 'Battlezone', membros: ['GhostK', 'Dante', 'Rui', 'Lia'], lider: 'GhostK', desc: 'Agressivos e rápidos nas rodadas iniciais.', v: 35, d: 14 },
  { id: 3, nome: 'Phantom', jogo: 'FIFA', membros: ['Raven', 'Tito', 'Bia'], lider: 'Raven', desc: 'Especialistas em futebol virtual.', v: 28, d: 9 },
  { id: 4, nome: 'Rushers', jogo: 'Battlezone', membros: ['Alanzin', 'Vic', 'Nando', 'Pri', 'Gui', 'Lo'], lider: 'Alanzin', desc: 'Time novo, cheio de energia.', v: 19, d: 12 }
];
const JOG = [
  { n: 'ShadowBR', g: 9820, s: 1210, m: 3800, v: 214, jogo: 'Battlezone' }, { n: 'LunaX', g: 9410, s: 1340, m: 3500, v: 198, jogo: 'Battlezone' },
  { n: 'GhostK', g: 8990, s: 980, m: 3900, v: 187, jogo: 'FIFA' }, { n: 'Alanzin', g: 8120, s: 1100, m: 3100, v: 160, jogo: 'FIFA' }, { n: 'Raven', g: 7740, s: 900, m: 2950, v: 151, jogo: 'Battlezone' }
];
const PARTIDAS = [
  { a: 'Nova Five', b: 'Void Squad', jogo: 'Battlezone', status: 'futura', data: '2026-11-03 20:00', res: '-' },
  { a: 'Phantom', b: 'Rushers', jogo: 'FIFA', status: 'andamento', data: '2026-10-29 19:00', res: '1 x 1 (simulado)' },
  { a: 'Rushers', b: 'Nova Five', jogo: 'Battlezone', status: 'encerrada', data: '2026-10-20 21:00', res: '2 x 3' },
  { a: 'Void Squad', b: 'Phantom', jogo: 'FIFA', status: 'encerrada', data: '2026-10-15 18:30', res: '0 x 2' }
];
const POSTS0 = [
  { id: 1, nick: 'ShadowBR', txt: 'Treino pesado hoje para a Rivals Cup!', data: '25/10/2026', likes: 12, liked: false, com: ['Bora!'] },
  { id: 2, nick: 'LunaX', txt: 'Procuro jogador para o Nova Five.', data: '26/10/2026', likes: 8, liked: false, com: [] },
  { id: 3, nick: 'Raven', txt: 'GG a todos na Battle Night.', data: '27/10/2026', likes: 5, liked: false, com: ['GG!', 'Foi top'] }
];
const users = () => load('ra_users', []);
const sess = () => load('ra_session', null);
const allTimes = () => TIMES.concat(load('ra_times', []));
const posts = () => load('ra_posts', POSTS0);

function toast(m) { let t = $('#toast'); if (!t) { t = document.createElement('div'); t.id = 'toast'; t.setAttribute('role', 'status'); document.body.append(t); } t.textContent = m; t.style.display = 'block'; setTimeout(() => t.style.display = 'none', 2500); }
function msg(el, txt, ok) { el.className = 'msg ' + (ok ? 'ok' : 'err'); el.textContent = txt; }

/* ---------- Cabeçalho e rodapé ---------- */
const NAV = [['index', 'Início'], ['campeonatos', 'Campeonatos'], ['ranking', 'Ranking'], ['times', 'Times'], ['partidas', 'Partidas'], ['comunidade', 'Comunidade']];
const logoImg = 'logo-completa';
const logged = sess();
$('#site-header').innerHTML = `<div class="wrap nav" id="nav"><a class="logo" href="index.html" aria-label="RIVALS ARENA - início"><img src="images/${logoImg}.png" alt="RIVALS ARENA"></a>
<button class="burger" id="burger" aria-expanded="false" aria-label="Abrir menu">☰</button>
<ul class="links">${NAV.map(([p, t]) => `<li><a href="${p}.html" class="${p === page || (p === 'campeonatos' && page === 'detalhes-campeonato') || (p === 'times' && page === 'detalhes-time') ? 'on' : ''}">${t}</a></li>`).join('')}</ul>
<div class="acts">${logged ? '<a class="btn sm" href="perfil.html">Meu perfil</a><button class="btn sm ghost" id="logout">Sair</button>' : '<a class="btn sm ghost" href="login.html">Entrar</a><a class="btn sm" href="cadastro.html">Criar conta</a>'}</div></div>`;
$('#site-footer').innerHTML = `<div class="wrap"><div><img src="images/logo-simbolo.png" alt="RIVALS ARENA"><p class="muted">Plataforma de eSports para campeonatos, times e comunidade gamer. Protótipo escolar de Desenvolvimento de Sistemas.</p></div>
<ul><li><strong>Plataforma</strong></li>${NAV.map(([p, t]) => `<li><a href="${p}.html">${t}</a></li>`).join('')}</ul>
<ul><li><strong>Institucional</strong></li><li><a href="sobre.html">Sobre</a></li><li><a href="login.html">Entrar</a></li><li><a href="cadastro.html">Criar conta</a></li></ul></div>
<p class="legal">© 2026 RIVALS ARENA · Projeto acadêmico. Todos os dados são fictícios.</p>`;
$('#burger').onclick = e => { const n = $('#nav'); n.classList.toggle('open'); e.currentTarget.setAttribute('aria-expanded', n.classList.contains('open')); };
if ($('#logout')) $('#logout').onclick = () => { localStorage.removeItem('ra_session'); location.href = 'index.html'; };

/* ---------- Cadastro / Login ---------- */
const emailOk = e => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e);
if (page === 'cadastro') $('#f').onsubmit = e => {
  e.preventDefault(); const f = e.target, m = $('#m'); const v = n => f[n].value.trim();
  if (v('nome').length < 3 || v('nick').length < 3) return msg(m, 'Informe nome e nickname com ao menos 3 caracteres.');
  if (!emailOk(v('email'))) return msg(m, 'Digite um e-mail válido.');
  if (f.senha.value.length < 6) return msg(m, 'A senha precisa ter ao menos 6 caracteres.');
  if (f.senha.value !== f.conf.value) return msg(m, 'As senhas não conferem.');
  const u = users(); if (u.some(x => x.email === v('email').toLowerCase())) return msg(m, 'Este e-mail já está cadastrado.');
  u.push({ nome: v('nome'), nick: v('nick'), email: v('email').toLowerCase(), senha: f.senha.value, jogo: f.jogo.value }); save('ra_users', u);
  msg(m, 'Conta criada! Redirecionando para o login...', true); setTimeout(() => location.href = 'login.html', 1200);
};
if (page === 'login') {
  $('#ver').onclick = e => { const s = $('#senha'); s.type = s.type === 'password' ? 'text' : 'password'; e.target.textContent = s.type === 'password' ? 'Mostrar' : 'Ocultar'; };
  $('#f').onsubmit = e => {
    e.preventDefault(); const m = $('#m'), em = $('#email').value.trim().toLowerCase(), se = $('#senha').value;
    if (!emailOk(em) || !se) return msg(m, 'Preencha e-mail válido e senha.');
    const u = users().find(x => x.email === em && x.senha === se); if (!u) return msg(m, 'E-mail ou senha incorretos, ou conta não cadastrada.');
    save('ra_session', { email: u.email, lembrar: $('#lembrar').checked }); msg(m, 'Login realizado com sucesso!', true); setTimeout(() => location.href = 'perfil.html', 1000);
  };
}

/* ---------- Cards ---------- */
const campCard = c => `<article class="card"><span class="tag ${c.status}">${{ aberto: 'Inscrições abertas', andamento: 'Em andamento', encerrado: 'Encerrado' }[c.status]}</span><h3>${c.nome}</h3><p class="muted">${c.jogo} · ${c.insc.length}/${c.max} times · Início ${c.inicio}</p><a class="btn sm" href="detalhes-campeonato.html?id=${c.id}">Ver campeonato</a></article>`;
const timeCard = t => `<article class="card"><div class="badge" aria-hidden="true">${t.nome[0]}</div><h3>${esc(t.nome)}</h3><p class="muted">${t.jogo} · ${t.membros.length} integrantes</p><p>${esc(t.desc)}</p><a class="btn sm" href="detalhes-time.html?id=${t.id}">Ver time</a></article>`;
const params = new URLSearchParams(location.search);

/* ---------- Início ---------- */
if (page === 'index') {
  $('#destaques').innerHTML = CAMPS.map(campCard).join('');
  $('#times-d').innerHTML = TIMES.map(timeCard).join('');
  const tab = (id, fn) => { const draw = k => { $(id).innerHTML = fn(k); }; return draw; };
  const rk = k => JOG.slice().sort((a, b) => b[k] - a[k]).map((j, i) => `<tr class="p${i + 1}"><td>${i + 1}º</td><td>${j.n}</td><td>${j[k]}</td></tr>`).join('');
  const draw = tab('#rk-body', rk); draw('g');
  $$('#rk-f button').forEach(b => b.onclick = () => { $$('#rk-f button').forEach(x => x.classList.remove('on')); b.classList.add('on'); draw(b.dataset.k); });
  /* minijogo */
  let pts = 0, tempo = 30, iv = null;
  $('#atk').onclick = () => {
    if (!iv) { pts = 0; tempo = 30; iv = setInterval(() => { tempo--; $('#tempo').textContent = tempo; if (tempo <= 0) { clearInterval(iv); iv = null; $('#atk').textContent = 'JOGAR DE NOVO'; toast('Fim! Pontuação: ' + pts); } }, 1000); }
    if (iv) { pts++; $('#pts').textContent = pts; $('#atk').textContent = 'ATACAR'; }
  };
}

/* ---------- Campeonatos ---------- */
if (page === 'campeonatos') {
  const draw = () => {
    const q = $('#q').value.toLowerCase(), j = $('#jogo').value, s = $('#status').value;
    const l = CAMPS.filter(c => c.nome.toLowerCase().includes(q) && (!j || c.jogo === j) && (!s || c.status === s));
    $('#lista').innerHTML = l.length ? l.map(campCard).join('') : '<p class="muted">Nenhum campeonato encontrado. Altere os filtros.</p>';
  };
  ['q', 'jogo', 'status'].forEach(i => $('#' + i).oninput = draw); draw();
}
if (page === 'detalhes-campeonato') {
  const c = CAMPS.find(x => x.id == params.get('id')) || CAMPS[0]; const ins = load('ra_insc_' + c.id, []); const part = () => c.insc.concat(ins);
  const draw = () => {
    const p = part(); $('#c').innerHTML = `<h1>${c.nome}</h1><p>${c.desc}</p><div class="meta"><span>${c.jogo}</span><span>Início: ${c.inicio}</span><span>Fim: ${c.fim}</span><span>Vagas: ${c.max - p.length} de ${c.max}</span><span>${c.premio}</span></div>
    <h2>Regras</h2><ul><li>Times de 3 a 6 integrantes.</li><li>Partidas em melhor de 3.</li><li>Conduta respeitosa é obrigatória.</li></ul>
    <h2>Participantes</h2><ul>${p.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
    <h2>Chaveamento (demonstração)</h2><div class="bracket"><div class="col">${[0, 1, 2, 3].map(i => `<div class="m">${esc(p[i * 2] || 'A definir')} x ${esc(p[i * 2 + 1] || 'A definir')}</div>`).join('')}</div><div class="col"><div class="m">Vencedor 1 x 2</div><div class="m">Vencedor 3 x 4</div></div><div class="col"><div class="m">Final</div></div></div>`;
  }; draw();
  const sel = $('#time-insc'); sel.innerHTML = allTimes().map(t => `<option>${esc(t.nome)}</option>`).join('');
  $('#insc').onclick = () => {
    const m = $('#m'), p = part(), t = sel.value;
    if (c.status === 'encerrado' || c.status === 'andamento' || new Date(c.inicio) < new Date()) return msg(m, 'O prazo de inscrição deste campeonato terminou.');
    if (p.length >= c.max) return msg(m, 'Não há mais vagas.');
    if (p.includes(t)) return msg(m, 'Este time já está inscrito.');
    ins.push(t); save('ra_insc_' + c.id, ins); msg(m, 'Inscrição realizada!', true); draw();
  };
}

/* ---------- Ranking ---------- */
if (page === 'ranking') {
  let modo = 'g';
  const draw = () => {
    const jg = $('#jogo').value;
    if (modo === 't') $('#rk').innerHTML = '<tr><th>#</th><th>Time</th><th>Pontos</th><th>Vitórias</th></tr>' + allTimes().filter(t => !jg || t.jogo === jg).sort((a, b) => b.v - a.v).map((t, i) => `<tr class="p${i + 1}"><td>${i + 1}º</td><td>${esc(t.nome)}</td><td>${t.v * 3}</td><td>${t.v}</td></tr>`).join('');
    else $('#rk').innerHTML = '<tr><th>#</th><th>Nickname</th><th>Pontos</th><th>Vitórias</th></tr>' + JOG.filter(j => !jg || j.jogo === jg).sort((a, b) => b[modo] - a[modo]).map((j, i) => `<tr class="p${i + 1}"><td>${i + 1}º</td><td>${j.n}</td><td>${j[modo]}</td><td>${j.v}</td></tr>`).join('');
  };
  $$('#modo button').forEach(b => b.onclick = () => { $$('#modo button').forEach(x => x.classList.remove('on')); b.classList.add('on'); modo = b.dataset.k; draw(); });
  $('#jogo').onchange = draw; draw();
}

/* ---------- Times ---------- */
if (page === 'times') {
  const draw = () => {
    const q = $('#q').value.toLowerCase(), j = $('#jogo').value;
    const l = allTimes().filter(t => t.nome.toLowerCase().includes(q) && (!j || t.jogo === j));
    $('#lista').innerHTML = l.length ? l.map(timeCard).join('') : '<p class="muted">Nenhum time encontrado.</p>';
  };
  $('#q').oninput = draw; $('#jogo').onchange = draw; draw();
  $('#novo').onsubmit = e => {
    e.preventDefault(); const f = e.target, m = $('#m'), nome = f.nome.value.trim();
    if (nome.length < 3 || f.desc.value.trim().length < 5) return msg(m, 'Informe um nome (mín. 3) e uma descrição (mín. 5 caracteres).');
    if (allTimes().some(t => t.nome.toLowerCase() === nome.toLowerCase())) return msg(m, 'Já existe um time com esse nome.');
    const s = sess(), u = s && users().find(x => x.email === s.email), mine = load('ra_times', []);
    mine.push({ id: 100 + mine.length, nome, jogo: f.jogo.value, membros: [u ? u.nick : 'Você'], lider: u ? u.nick : 'Você', desc: f.desc.value.trim(), v: 0, d: 0 }); save('ra_times', mine);
    f.reset(); msg(m, 'Time criado!', true); draw();
  };
}
if (page === 'detalhes-time') {
  const t = allTimes().find(x => x.id == params.get('id')) || TIMES[0];
  $('#t').innerHTML = `<div class="badge" aria-hidden="true">${esc(t.nome[0])}</div><h1>${esc(t.nome)}</h1><p>${esc(t.desc)}</p><div class="meta"><span>${t.jogo}</span><span>Líder: ${esc(t.lider)}</span><span>${t.v} vitórias</span><span>${t.d} derrotas</span></div>
  <h2>Integrantes</h2><ul>${t.membros.map(m => `<li>${esc(m)}</li>`).join('')}</ul>
  <h2>Histórico de partidas</h2><ul>${PARTIDAS.filter(p => p.a === t.nome || p.b === t.nome).map(p => `<li>${p.a} x ${p.b} · ${p.res}</li>`).join('') || '<li class="muted">Sem partidas registradas.</li>'}</ul>
  <h2>Campeonatos</h2><ul>${CAMPS.filter(c => c.insc.includes(t.nome)).map(c => `<li>${c.nome}</li>`).join('') || '<li class="muted">Nenhum ainda.</li>'}</ul>`;
  $('#entrar').onclick = () => { if (!sess()) return msg($('#m'), 'Entre na sua conta para solicitar entrada.'); msg($('#m'), 'Solicitação enviada ao líder (simulado).', true); };
}

/* ---------- Partidas ---------- */
if (page === 'partidas') {
  const draw = () => {
    const j = $('#jogo').value, s = $('#status').value, l = PARTIDAS.filter(p => (!j || p.jogo === j) && (!s || p.status === s));
    $('#lista').innerHTML = l.length ? l.map((p, i) => `<article class="card"><span class="tag ${p.status === 'andamento' ? 'andamento' : p.status === 'futura' ? 'aberto' : 'encerrado'}">${{ futura: 'Futura', andamento: 'Em andamento (simulado)', encerrada: 'Encerrada' }[p.status]}</span><h3>${p.a} x ${p.b}</h3><p class="muted">${p.jogo} · ${p.data}</p><button class="btn sm ghost" data-i="${i}">Detalhes</button></article>`).join('') : '<p class="muted">Nenhuma partida com esses filtros.</p>';
    $$('#lista button').forEach(b => b.onclick = () => { const p = l[b.dataset.i]; $('#det').innerHTML = `<h2>${p.a} x ${p.b}</h2><p>Modalidade: ${p.jogo}<br>Data: ${p.data}<br>Resultado: ${p.res}</p><p class="demo">Partida fictícia, não é um evento real.</p>`; });
  };
  $('#jogo').onchange = draw; $('#status').onchange = draw; draw();
}

/* ---------- Comunidade ---------- */
if (page === 'comunidade' || page === 'index') {
  const box = $('#feed'), lim = page === 'index' ? 3 : 99;
  const draw = () => {
    const q = $('#busca') ? $('#busca').value.toLowerCase() : '';
    box.innerHTML = posts().filter(p => (p.nick + p.txt).toLowerCase().includes(q)).slice(0, lim).map(p => `<article class="post"><span class="av" aria-hidden="true">${esc(p.nick[0])}</span><strong>${esc(p.nick)}</strong> <span class="muted">· ${p.data}</span><p>${esc(p.txt)}</p>
    <button class="${p.liked ? 'liked' : ''}" data-l="${p.id}" aria-pressed="${p.liked}">♥ ${p.likes}</button><button data-c="${p.id}">💬 ${p.com.length}</button>
    <div class="cm" id="cm${p.id}" hidden>${p.com.map(c => `<p>${esc(c)}</p>`).join('')}<form class="row" data-f="${p.id}"><input aria-label="Comentário" placeholder="Comentar..." required><button class="btn sm">Enviar</button></form></div></article>`).join('') || '<p class="muted">Nenhuma publicação encontrada.</p>';
    $$('[data-l]', box).forEach(b => b.onclick = () => { const a = posts(), p = a.find(x => x.id == b.dataset.l); p.liked = !p.liked; p.likes += p.liked ? 1 : -1; save('ra_posts', a); draw(); });
    $$('[data-c]', box).forEach(b => b.onclick = () => { const e = $('#cm' + b.dataset.c); e.hidden = !e.hidden; });
    $$('[data-f]', box).forEach(f => f.onsubmit = e => { e.preventDefault(); const a = posts(); a.find(x => x.id == f.dataset.f).com.push(f.firstChild.value.trim()); save('ra_posts', a); draw(); $('#cm' + f.dataset.f).hidden = false; toast('Comentário publicado!'); });
  };
  draw(); if ($('#busca')) $('#busca').oninput = draw;
  if ($('#novo')) $('#novo').onsubmit = e => {
    e.preventDefault(); const t = $('#txt').value.trim(); if (t.length < 3) return toast('Escreva ao menos 3 caracteres.');
    const s = sess(), u = s && users().find(x => x.email === s.email), a = posts();
    a.unshift({ id: Date.now(), nick: u ? u.nick : 'Visitante', txt: t, data: new Date().toLocaleDateString('pt-BR'), likes: 0, liked: false, com: [] }); save('ra_posts', a); e.target.reset(); draw(); toast('Publicação criada!');
  };
}

/* ---------- Perfil ---------- */
if (page === 'perfil') {
  const s = sess(); if (!s) location.href = 'login.html';
  const u = users().find(x => x.email === (s && s.email)) || {};
  const pf = load('ra_perfil_' + (s && s.email), { nome: u.nome, nick: u.nick, jogo: u.jogo });
  const draw = () => { $('#p-nome').textContent = pf.nome; $('#p-nick').textContent = '@' + pf.nick; $('#p-jogo').textContent = pf.jogo || '-'; $('#av').textContent = (pf.nick || '?')[0]; };
  draw();
  $$('#tabs button').forEach(b => b.onclick = () => { $$('#tabs button').forEach(x => { x.classList.remove('on'); x.setAttribute('aria-selected', 'false'); }); b.classList.add('on'); b.setAttribute('aria-selected', 'true'); $$('.aba').forEach(a => a.hidden = a.id !== b.dataset.a); });
  $('#editar').onclick = () => { $('#ed').hidden = !$('#ed').hidden; $('#e-nome').value = pf.nome; $('#e-nick').value = pf.nick; };
  $('#ed').onsubmit = e => { e.preventDefault(); if ($('#e-nome').value.trim().length < 3 || $('#e-nick').value.trim().length < 3) return toast('Nome e nickname precisam de 3+ caracteres.'); pf.nome = $('#e-nome').value.trim(); pf.nick = $('#e-nick').value.trim(); save('ra_perfil_' + s.email, pf); draw(); $('#ed').hidden = true; toast('Perfil atualizado!'); };
}
