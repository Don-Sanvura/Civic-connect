export const page = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="theme-color" content="#0b1f18">
<title>CivicConnect | Community Service Requests</title>
<style>
:root{color-scheme:light;--ink:#14231d;--muted:#52635a;--line:#d6e0d9;--green:#176b46;--pale:#edf6f0}
*{box-sizing:border-box}body{margin:0;background:#f5f8f6;color:var(--ink);font:16px/1.5 system-ui,-apple-system,Segoe UI,sans-serif}
header{background:#0b1f18;color:#fff;padding:1.5rem max(1rem,calc((100vw - 1000px)/2))}header p{color:#c7ddd0;margin:.25rem 0 0}
main{max-width:1000px;margin:1.5rem auto;padding:0 1rem;display:grid;gap:1rem;grid-template-columns:minmax(0,1fr) minmax(0,1.15fr)}
section{background:#fff;border:1px solid var(--line);border-radius:14px;padding:1.25rem;min-width:0}h1{font-size:1.5rem;margin:0}h2{font-size:1.15rem;margin:0 0 1rem}label{display:block;font-weight:650;margin:.8rem 0 .3rem}input,select,textarea{width:100%;font:inherit;padding:.65rem;border:1px solid #9aaca1;border-radius:8px;background:white;color:var(--ink)}textarea{min-height:100px;resize:vertical}button{font:inherit;font-weight:700;border:0;border-radius:8px;padding:.7rem 1rem;background:var(--green);color:white;cursor:pointer;margin-top:1rem}button:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible{outline:3px solid #e3ad39;outline-offset:2px}.hint,.muted{color:var(--muted);font-size:.9rem}.message{padding:.7rem;border-radius:8px;background:var(--pale);margin:.75rem 0;overflow-wrap:anywhere}.error{background:#fff0ef;color:#8b2119}.request{border:1px solid var(--line);border-radius:10px;padding:.9rem;margin:.75rem 0}.request h3{margin:0;font-size:1rem}.status{display:inline-block;background:var(--pale);padding:.15rem .5rem;border-radius:99px;font-size:.8rem;font-weight:700}.empty{color:var(--muted);padding:1rem 0}@media(max-width:720px){main{grid-template-columns:1fr}header{padding:1.25rem 1rem}}
</style>
</head>
<body>
<header><h1>CivicConnect</h1><p>One clear record for community service requests.</p></header>
<main>
<section aria-labelledby="submit-heading">
<h2 id="submit-heading">Submit a service request</h2>
<p class="hint">Demo only. Use synthetic information; do not submit real personal data.</p>
<label for="token">Demo access token</label><select id="token"><option value="requester-demo">Requester demo</option><option value="staff-demo">Staff demo</option><option value="manager-demo">Manager demo</option><option value="admin-demo">Administrator demo</option></select>
<form id="request-form">
<label for="title">Request title</label><input id="title" name="title" minlength="3" maxlength="120" required>
<label for="description">Description</label><textarea id="description" name="description" minlength="10" maxlength="2000" required></textarea>
<label for="category">Category</label><select id="category" name="category" required><option value="">Loading categories…</option></select>
<label for="location">Location</label><input id="location" name="location" maxlength="300" required>
<button type="submit">Submit request</button>
</form><div id="form-message" role="status" aria-live="polite"></div>
</section>
<section aria-labelledby="requests-heading"><h2 id="requests-heading">Requests</h2><p class="hint">Choose a demo role, then refresh to view records available to that role.</p><button id="refresh" type="button">Refresh requests</button><div id="request-list" aria-live="polite"><p class="empty">Loading requests…</p></div></section>
</main><script src="/client.js" defer></script></body></html>`;

export const clientScript = `'use strict';
const token = document.querySelector('#token');
const category = document.querySelector('#category');
const form = document.querySelector('#request-form');
const message = document.querySelector('#form-message');
const list = document.querySelector('#request-list');
const headers = () => ({ Authorization: 'Bearer ' + token.value, 'Content-Type': 'application/json' });
async function api(path, options = {}) {
  const response = await fetch(path, { ...options, headers: { ...headers(), ...(options.headers || {}) } });
  const body = await response.json();
  if (!response.ok) throw new Error(body.error?.message || 'Request failed');
  return body.data;
}
function showMessage(text, isError = false) {
  message.textContent = text;
  message.className = text ? 'message' + (isError ? ' error' : '') : '';
}
async function loadCategories() {
  try {
    const categories = await api('/api/categories');
    category.replaceChildren(new Option('Select a category', ''));
    for (const item of categories) category.add(new Option(item.name, item.name));
  } catch (error) {
    category.replaceChildren(new Option('Could not load categories', ''));
    showMessage(error.message, true);
  }
}
async function loadRequests() {
  list.replaceChildren();
  try {
    const requests = await api('/api/requests');
    if (!requests.length) {
      const empty = document.createElement('p'); empty.className = 'empty'; empty.textContent = 'No requests available for this role yet.'; list.append(empty); return;
    }
    for (const item of requests) {
      const card = document.createElement('article'); card.className = 'request';
      const heading = document.createElement('h3'); heading.textContent = item.title;
      const status = document.createElement('p'); status.className = 'status'; status.textContent = item.status;
      const detail = document.createElement('p'); detail.textContent = item.category + ' · ' + item.location;
      const ref = document.createElement('p'); ref.className = 'muted'; ref.textContent = 'Reference: ' + item.id;
      card.append(heading, status, detail, ref); list.append(card);
    }
  } catch (error) {
    const item = document.createElement('p'); item.className = 'message error'; item.textContent = error.message; list.append(item);
  }
}
form.addEventListener('submit', async event => {
  event.preventDefault(); showMessage('');
  const data = Object.fromEntries(new FormData(form).entries());
  try {
    const created = await api('/api/requests', { method: 'POST', body: JSON.stringify(data) });
    showMessage('Request submitted. Reference: ' + created.id);
    form.reset(); await loadCategories(); await loadRequests();
  } catch (error) { showMessage(error.message, true); }
});
document.querySelector('#refresh').addEventListener('click', loadRequests);
token.addEventListener('change', async () => { await loadCategories(); await loadRequests(); });
loadCategories(); loadRequests();
`;
