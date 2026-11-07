(() => {
  const STORE_KEY = 'scoutforge.v1';
  const sample = {
    entries: [
      { id: 'demo-1', team: 4571, match: 'Q12', alliance: 'Blue', scout: 'Avery', strengths: 'Fast cycles from the center line; clean handoff on both trips.', issues: 'Slowed down in traffic near the end of the match.', consistency: 'Consistent', impression: 'Promising', createdAt: new Date(Date.now() - 1000 * 60 * 38).toISOString() },
      { id: 'demo-2', team: 3310, match: 'Q09', alliance: 'Red', scout: 'Jordan', strengths: 'Reliable autonomous start and steady scoring.', issues: 'One pickup attempt was blocked by defense.', consistency: 'Consistent', impression: 'Promising', createdAt: new Date(Date.now() - 1000 * 60 * 110).toISOString() },
      { id: 'demo-3', team: 6100, match: 'Q08', alliance: 'Blue', scout: 'Sam', strengths: 'Strong defense; protected partners through the final cycle.', issues: 'Scoring mechanism was difficult to assess.', consistency: 'Mixed', impression: 'Average', createdAt: new Date(Date.now() - 1000 * 60 * 240).toISOString() }
    ],
    matches: [
      { match: 'Q12', red: [3310, 6100, 2342], blue: [4571, 6328, 118] },
      { match: 'Q13', red: [4571, 118, 2713], blue: [3310, 2342, 6328] },
      { match: 'Q14', red: [6100, 2713, 6328], blue: [4571, 3310, 2342] }
    ]
  };
  let state = loadState();
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  function loadState() {
    try { const saved = JSON.parse(localStorage.getItem(STORE_KEY)); if (saved && Array.isArray(saved.entries) && Array.isArray(saved.matches)) return saved; }
    catch (error) { console.warn('Could not read local scouting data.', error); }
    return structuredClone(sample);
  }
  function saveState() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); $('.sync-status').innerHTML = '<i></i> Saved locally'; }
    catch (error) { $('.sync-status').textContent = 'Storage unavailable'; showToast('Could not save locally. Export or copy your notes before leaving.'); }
  }
  function showToast(message) {
    const toast = $('#toast'); toast.textContent = message; toast.classList.add('show'); clearTimeout(showToast.timer); showToast.timer = setTimeout(() => toast.classList.remove('show'), 2600);
  }
  function displayDate(iso) { const date = new Date(iso); return Number.isNaN(date.getTime()) ? '' : date.toLocaleString([], { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }); }
  function teamsFromEntries() {
    const byTeam = new Map();
    state.entries.forEach(entry => {
      const team = Number(entry.team); if (!Number.isFinite(team)) return;
      if (!byTeam.has(team)) byTeam.set(team, []); byTeam.get(team).push(entry);
    });
    state.matches.forEach(match => [...match.red, ...match.blue].forEach(team => { if (!byTeam.has(Number(team))) byTeam.set(Number(team), []); }));
    return [...byTeam.entries()].map(([number, entries]) => ({ number, entries: entries.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)) })).sort((a,b) => a.number - b.number);
  }
  function summaryFor(entries) {
    if (!entries.length) return 'No scout observations yet. Add a match note or review pit scouting to start this team summary.';
    const strengths = [...new Set(entries.map(entry => (entry.strengths || '').trim()).filter(Boolean))].slice(0, 2);
    const issues = [...new Set(entries.map(entry => (entry.issues || '').trim()).filter(Boolean))].slice(0, 1);
    const parts = [];
    if (strengths.length) parts.push(strengths.join(' '));
    if (issues.length) parts.push(`Watch for: ${issues.join(' ')}`);
    return parts.join(' ') || `${entries.length} observation${entries.length === 1 ? '' : 's'} recorded; details need review.`;
  }
  function render() {
    const teams = teamsFromEntries();
    $('#teamCount').textContent = teams.length;
    $('#entryCount').textContent = state.entries.length;
    $('#matchCount').textContent = state.matches.length;
    renderRecent(); renderSnapshots(teams); renderTeams(teams); renderSchedule();
  }
  function renderRecent() {
    const host = $('#recentEntries');
    if (!state.entries.length) { host.innerHTML = '<div class="empty-state"><strong>No observations yet</strong>Save a scout entry to start building team context.</div>'; return; }
    host.innerHTML = [...state.entries].sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0,4).map(entry => `
      <article class="recent-item"><span class="team-badge">${escapeHtml(entry.team)}</span><div><div class="entry-title">Team ${escapeHtml(entry.team)} <span class="entry-meta">· ${escapeHtml(entry.match)}</span></div><div class="entry-meta">${escapeHtml(entry.alliance)} alliance · ${escapeHtml(entry.scout || 'Scout')} · ${escapeHtml(displayDate(entry.createdAt))}</div><p class="entry-note">${escapeHtml(entry.strengths || entry.issues || 'Observation saved; add detail when available.')}</p></div><span class="entry-tag">${escapeHtml(entry.impression || 'Logged')}</span></article>`).join('');
  }
  function renderSnapshots(teams) {
    const list = teams.filter(team => team.entries.length).slice(0,3);
    $('#teamSnapshots').innerHTML = list.length ? list.map(team => `<div class="snapshot"><span class="team-badge">${team.number}</span><div class="snapshot-info"><strong>Team ${team.number}</strong><small>${escapeHtml(summaryFor(team.entries))}</small></div><span class="snapshot-count">${team.entries.length} note${team.entries.length === 1 ? '' : 's'}</span></div>`).join('') : '<div class="empty-state"><strong>Waiting for scout notes</strong>Team summaries are assembled from saved observations.</div>';
  }
  function renderTeams(teams = teamsFromEntries()) {
    const query = ($('#teamSearch')?.value || '').trim().toLowerCase();
    const filtered = teams.filter(team => String(team.number).includes(query) || summaryFor(team.entries).toLowerCase().includes(query));
    $('#teamsList').innerHTML = filtered.length ? filtered.map(team => {
      const consistency = team.entries.length ? team.entries[0].consistency : 'No match data';
      return `<article class="team-card"><div class="team-card-head"><span class="team-badge">${team.number}</span><div><h3>Team ${team.number}</h3><p>${team.entries.length} match observation${team.entries.length === 1 ? '' : 's'}</p></div></div><p class="summary-text">${escapeHtml(summaryFor(team.entries))}</p><div class="team-card-footer"><span class="consistency">${escapeHtml(consistency)}</span><span>${team.entries.length ? `Updated ${escapeHtml(displayDate(team.entries[0].createdAt))}` : 'Schedule team · not scouted yet'}</span></div></article>`;
    }).join('') : '<div class="empty-state"><strong>No matching teams</strong>Try another team number or note.</div>';
  }
  function renderSchedule() {
    $('#scheduleSubtitle').textContent = `${state.matches.length} match${state.matches.length === 1 ? '' : 'es'} in this workspace`;
    const host = $('#scheduleTable');
    if (!state.matches.length) { host.innerHTML = '<div class="empty-state"><strong>No schedule imported</strong>Use the CSV importer above to add event matches.</div>'; return; }
    host.innerHTML = `<table class="schedule-table"><thead><tr><th>Match</th><th>Red alliance</th><th>Blue alliance</th></tr></thead><tbody>${state.matches.map(item => `<tr><td>${escapeHtml(item.match)}</td><td class="alliance-red">${item.red.map(escapeHtml).join(' · ')}</td><td class="alliance-blue">${item.blue.map(escapeHtml).join(' · ')}</td></tr>`).join('')}</tbody></table>`;
  }
  function navigate(view) {
    $$('.view').forEach(section => section.classList.toggle('active', section.id === `view-${view}`));
    $$('.nav-link').forEach(link => link.classList.toggle('active', link.dataset.view === view));
    const labels = { dashboard: 'Overview', teams: 'Teams', scout: 'Scout a match', matches: 'Matches & import' };
    $('#pageLabel').textContent = labels[view] || 'Overview';
    if (location.hash !== `#${view}`) history.replaceState(null, '', `#${view}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  $$('.nav-link').forEach(button => button.addEventListener('click', () => navigate(button.dataset.view)));
  $$('[data-go]').forEach(button => button.addEventListener('click', () => navigate(button.dataset.go)));
  $('#teamSearch').addEventListener('input', () => renderTeams());
  $('#scoutForm').addEventListener('submit', event => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    const entry = { ...data, team: Number(data.team), id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()), createdAt: new Date().toISOString() };
    state.entries.push(entry); saveState(); render(); event.currentTarget.reset(); showToast(`Observation saved for team ${entry.team}`); navigate('teams');
  });
  function parseCsv(text) {
    const rows = []; let row = []; let cell = ''; let quoted = false;
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (char === '"' && quoted && text[i + 1] === '"') { cell += '"'; i++; }
      else if (char === '"') quoted = !quoted;
      else if (char === ',' && !quoted) { row.push(cell.trim()); cell = ''; }
      else if ((char === '\n' || char === '\r') && !quoted) { if (char === '\r' && text[i + 1] === '\n') i++; row.push(cell.trim()); if (row.some(Boolean)) rows.push(row); row = []; cell = ''; }
      else cell += char;
    }
    row.push(cell.trim()); if (row.some(Boolean)) rows.push(row);
    if (rows.length < 2) throw new Error('The CSV needs a header row and at least one match.');
    const headers = rows.shift().map(header => header.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, ''));
    const find = names => headers.findIndex(header => names.includes(header));
    const matchIndex = find(['match', 'matchnumber', 'matchname']);
    const redIndices = ['red1','red2','red3'].map(name => find([name, name.replace('red','redteam')]));
    const blueIndices = ['blue1','blue2','blue3'].map(name => find([name, name.replace('blue','blueteam')]));
    if (matchIndex < 0 || [...redIndices, ...blueIndices].some(index => index < 0)) throw new Error('Required headers: match, red1, red2, red3, blue1, blue2, blue3.');
    const parsed = rows.map((cells, index) => {
      const match = cells[matchIndex]; const red = redIndices.map(i => Number(cells[i])); const blue = blueIndices.map(i => Number(cells[i]));
      if (!match || [...red, ...blue].some(team => !Number.isInteger(team) || team < 1)) throw new Error(`Invalid match data on CSV row ${index + 2}.`);
      return { match, red, blue };
    });
    return parsed;
  }
  $('#scheduleFile').addEventListener('change', async event => {
    const file = event.target.files[0]; if (!file) return;
    const message = $('#importMessage'); message.textContent = '';
    try {
      const imported = parseCsv(await file.text());
      const existing = new Set(state.matches.map(item => item.match.toLowerCase()));
      const fresh = imported.filter(item => !existing.has(item.match.toLowerCase()));
      state.matches.push(...fresh); saveState(); render();
      message.textContent = `Imported ${fresh.length} match${fresh.length === 1 ? '' : 'es'}${imported.length !== fresh.length ? `; skipped ${imported.length - fresh.length} duplicate${imported.length - fresh.length === 1 ? '' : 's'}` : ''}.`;
      showToast('Schedule import complete');
    } catch (error) { message.textContent = error.message; message.style.color = '#bd5d58'; }
    event.target.value = '';
  });
  $('#clearSchedule').addEventListener('click', () => {
    if (!state.matches.length) return;
    if (window.confirm('Clear every imported match from this browser?')) { state.matches = []; saveState(); render(); showToast('Schedule cleared'); }
  });
  const initialView = location.hash.slice(1);
  if (['dashboard','teams','scout','matches'].includes(initialView)) navigate(initialView);
  render();
})();
