(() => {
  const { resorts, collections, guides } = window.TRAVELBER;
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const esc = value => String(value).replace(/[&<>'"]/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[char]));
  const state = {
    visibleResorts: 12,
    visibleCollections: 6,
    visibleGuides: 6,
    collectionGroup: "all",
    filters: { query:"", region:"all", type:"all", season:"all", budget:"all" },
    saved: new Set(JSON.parse(localStorage.getItem("travelber-saved") || "[]"))
  };
  const typeLabels = { Alpine:"Mountain", Coast:"Coast & island", Wellness:"Wellness & lake", Countryside:"Country", Nordic:"Wild north" };
  const fallbackImage = window.TRAVELBER.imagePool[0];
  const typeAliases = {
    Alpine: "mountain mountains alpine ski skiing snow hiking trail 高山 山区 山地 滑雪 雪山 徒步",
    Coast: "sea seaside coast coastal beach beaches island islands swimming mediterranean ocean 海 海边 海滨 海岛 沙滩 岛屿 地中海",
    Wellness: "wellness spa lake lakes thermal retreat relax restorative 温泉 水疗 湖 湖区 康养 放松 疗愈",
    Countryside: "country countryside rural vineyard wine village food farm 乡村 田园 葡萄酒 酒庄 村庄 美食",
    Nordic: "nordic north arctic aurora northern lights wilderness cabin 北欧 极光 北极 荒野 木屋"
  };
  const countryAliases = {
    Austria:"奥地利", Croatia:"克罗地亚", Estonia:"爱沙尼亚", Finland:"芬兰", France:"法国", Germany:"德国", Greece:"希腊", Hungary:"匈牙利", Iceland:"冰岛", Ireland:"爱尔兰", Italy:"意大利", Latvia:"拉脱维亚", Montenegro:"黑山", Norway:"挪威", Poland:"波兰", Portugal:"葡萄牙", Romania:"罗马尼亚", Slovenia:"斯洛文尼亚", Spain:"西班牙", Sweden:"瑞典", Switzerland:"瑞士", "United Kingdom":"英国"
  };

  function normalized(value) {
    return String(value || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[’']/g, "'").replace(/\s+/g, " ").trim();
  }

  function matchesQuery(text, query) {
    const terms = normalized(query).split(" ").filter(Boolean);
    const haystack = normalized(text);
    return !terms.length || terms.every(term => haystack.includes(term));
  }

  function resortSearchText(resort) {
    return [resort.name, resort.country, countryAliases[resort.country], resort.region, resort.type, typeLabels[resort.type], typeAliases[resort.type], resort.bestFor, resort.dek, resort.seasons.join(" "), resort.highlights.join(" ")].join(" ");
  }

  function imageTag(item, alt, className = "") {
    return `<img class="${className}" src="${esc(item.image || fallbackImage)}" alt="${esc(alt)}" style="object-position:${esc(item.position || "center")}" loading="lazy" onerror="this.onerror=null;this.src='${fallbackImage}'">`;
  }

  function favoriteButton(resort) {
    const active = state.saved.has(resort.id);
    return `<button class="favorite ${active ? "active" : ""}" data-favorite="${resort.id}" aria-label="${active ? "Remove" : "Save"} ${esc(resort.name)}" aria-pressed="${active}">${active ? "♥" : "♡"}</button>`;
  }

  function updateSaved() {
    localStorage.setItem("travelber-saved", JSON.stringify([...state.saved]));
    $("#savedCount").textContent = state.saved.size;
    renderSaved();
    renderResorts();
    renderFeatured();
  }

  function toggleFavorite(id) {
    const resort = resorts.find(r => r.id === id);
    if (!resort) return;
    if (state.saved.has(id)) {
      state.saved.delete(id);
      toast(`${resort.name} removed from your shortlist`);
    } else {
      state.saved.add(id);
      toast(`${resort.name} saved to your shortlist`);
    }
    updateSaved();
  }

  function renderFeatured() {
    const featured = [resorts[22], resorts[18], resorts[38], resorts[71]];
    $("#featuredGrid").innerHTML = featured.map(resort => `
      <article class="feature-card" data-open-resort="${resort.slug}">
        ${imageTag(resort, `${resort.name}, ${resort.country}`)}
        ${favoriteButton(resort)}
        <div class="feature-card-copy"><span>${esc(resort.country)} · ${esc(typeLabels[resort.type])}</span><h3>${esc(resort.name)}</h3><p>${esc(resort.dek)}</p></div>
      </article>`).join("");
  }

  function filteredResorts() {
    const f = state.filters;
    const q = f.query.trim();
    return resorts.filter(r => {
      return matchesQuery(resortSearchText(r), q) && (f.region === "all" || r.country === f.region) && (f.type === "all" || r.type === f.type) && (f.season === "all" || r.seasons.includes(f.season)) && (f.budget === "all" || r.budget === f.budget);
    });
  }

  function resortCard(resort, index) {
    return `<article class="resort-card">
      <div class="resort-image" data-open-resort="${resort.slug}">${imageTag(resort, `${resort.name}, ${resort.country}`)}${favoriteButton(resort)}<span class="card-index">${String(index + 1).padStart(2,"0")}</span></div>
      <div class="resort-meta"><span>${esc(resort.country)} · ${esc(resort.region)}</span><span>${esc(resort.budget)}</span></div>
      <h3 data-open-resort="${resort.slug}">${esc(resort.name)}</h3><p>${esc(resort.dek)}</p>
    </article>`;
  }

  function renderResorts() {
    const list = filteredResorts();
    $("#resultCount").textContent = `${list.length} ${list.length === 1 ? "place" : "places"}`;
    $("#resortGrid").innerHTML = list.slice(0,state.visibleResorts).map(resortCard).join("") || `<div class="empty-state"><p>No places found for “${esc(state.filters.query)}”.</p><span>Try a country, region, season, or words such as sea, mountains, spa and countryside.</span></div>`;
    $("#loadMore").hidden = list.length <= state.visibleResorts;
  }

  function renderCollections() {
    const list = state.collectionGroup === "all" ? collections : collections.filter(c => c.group === state.collectionGroup);
    $("#collectionGrid").innerHTML = list.slice(0,state.visibleCollections).map((c,i) => `
      <article class="collection-card" data-open-collection="${c.slug}"><span>Edit ${String(collections.indexOf(c)+1).padStart(2,"0")} · ${esc(c.group)}</span><h3>${esc(c.title)}</h3><p>${esc(c.count)} places · ${esc(c.dek)}</p></article>`).join("");
    $("#moreCollections").hidden = list.length <= state.visibleCollections;
  }

  function renderGuides() {
    const feature = guides[0];
    $("#guideFeature").innerHTML = `<div class="guide-feature-image"></div><div class="guide-feature-copy" data-open-guide="${feature.slug}"><span>${esc(feature.category)} · ${feature.read} min read</span><h3>${esc(feature.title)}</h3><p>${esc(feature.dek)}</p><a class="text-link" href="#guide/${feature.slug}">Read the field guide <b>↗</b></a></div>`;
    $("#guideGrid").innerHTML = guides.slice(1,state.visibleGuides+1).map(g => `<article class="guide-card" data-open-guide="${g.slug}"><span>${esc(g.category)} · ${g.read} min</span><h3>${esc(g.title)}</h3><p>${esc(g.dek)}</p></article>`).join("");
    $("#moreGuides").hidden = guides.length <= state.visibleGuides + 1;
  }

  function renderSaved() {
    const list = resorts.filter(r => state.saved.has(r.id));
    $("#savedList").innerHTML = list.length ? list.map(r => `<article class="saved-item" data-open-resort="${r.slug}">${imageTag(r,r.name)}<div><h3>${esc(r.name)}</h3><span>${esc(r.country)} · ${esc(r.type)}</span></div><button data-favorite="${r.id}" aria-label="Remove ${esc(r.name)}">×</button></article>`).join("") : `<div class="empty-state"><p>Your shortlist is waiting.</p><span>Tap the heart on any place you would like to remember.</span></div>`;
  }

  function renderGlobalResults(query = "") {
    const q = query.trim();
    const matches = [];
    if (q.length > 1) {
      resorts.filter(r => matchesQuery(resortSearchText(r), q)).slice(0,4).forEach(item => matches.push({type:"Resort", title:item.name, slug:item.slug, action:"resort"}));
      collections.filter(c => matchesQuery(`${c.title} ${c.group} ${c.tag} ${typeAliases[c.tag] || ""}`, q)).slice(0,3).forEach(item => matches.push({type:"Collection", title:item.title, slug:item.slug, action:"collection"}));
      guides.filter(g => matchesQuery(`${g.title} ${g.category} ${g.dek} travel planning guide 旅行 指南 攻略`, q)).slice(0,3).forEach(item => matches.push({type:"Guide", title:item.title, slug:item.slug, action:"guide"}));
    }
    $("#globalResults").innerHTML = matches.length ? matches.map(m => `<article class="search-result" data-open-${m.action}="${m.slug}"><span>${m.type}</span><h3>${esc(m.title)}</h3></article>`).join("") : q.length > 1 ? `<div class="empty-state"><p>No results for “${esc(q)}”.</p><span>Try a country, season, or mood such as sea, mountains, spa or countryside.</span></div>` : `<div class="empty-state">Try “Italy”, “sea”, “winter” or “海岛”.</div>`;
  }

  function resortDetail(r) {
    return `<div class="detail-hero">${imageTag(r,`${r.name}, ${r.country}`)}<div class="detail-hero-copy"><p class="eyebrow light">${esc(r.country)} · ${esc(typeLabels[r.type])}</p><h1>${esc(r.name)}</h1><p>${esc(r.region)} · Best in ${r.seasons.join(" & ")}</p></div></div>
      <div class="detail-body"><div><p class="eyebrow">Travelber resort profile</p><h2>The feeling of<br><em>${esc(r.name)}</em></h2><p>${esc(r.intro)}</p><p>${esc(r.dek)} We recommend using this profile as a starting point, then confirming live openings, access and individual property details directly before booking.</p><div class="detail-list">${r.highlights.map(h => `<div>${esc(h)}</div>`).join("")}</div></div>
      <aside class="detail-facts"><div class="fact"><span>Landscape</span><strong>${esc(typeLabels[r.type])}</strong></div><div class="fact"><span>Best seasons</span><strong>${r.seasons.join(", ")}</strong></div><div class="fact"><span>Ideal stay</span><strong>${r.days} nights</strong></div><div class="fact"><span>Budget signal</span><strong>${esc(r.budget)}</strong></div><div class="fact"><span>Especially good for</span><strong>${esc(r.bestFor)}</strong></div><button class="load-button" data-favorite="${r.id}">${state.saved.has(r.id) ? "Remove from saved" : "Save this place"}</button></aside></div>`;
  }

  function collectionDetail(c) {
    const list = c.resortIds.map(id => resorts.find(r => r.id === id)).filter(Boolean).slice(0,8);
    return `<div class="detail-hero"><img src="${fallbackImage}" alt="A real European Alpine lake landscape"><div class="detail-hero-copy"><p class="eyebrow light">Travelber collection · ${esc(c.group)}</p><h1>${esc(c.title)}</h1><p>${esc(c.count)} considered places</p></div></div><div class="detail-body"><div><p class="eyebrow">The edit</p><h2>A shortlist with<br><em>a point of view.</em></h2><p>${esc(c.dek)} Every choice is intended as an editorial route into further research rather than a live availability claim.</p><div class="detail-list">${list.map(r => `<div data-open-resort="${r.slug}"><strong>${esc(r.name)}</strong><br><small>${esc(r.country)} · ${esc(r.type)}</small></div>`).join("")}</div></div><aside class="detail-facts"><div class="fact"><span>Collection</span><strong>${esc(c.group)}</strong></div><div class="fact"><span>Travel mood</span><strong>${esc(c.tag)}</strong></div><div class="fact"><span>Places in edit</span><strong>${c.count}</strong></div></aside></div>`;
  }

  function guideDetail(g) {
    return `<div class="detail-hero"><img src="${fallbackImage}" alt="A real European Alpine lake landscape"><div class="detail-hero-copy"><p class="eyebrow light">${esc(g.category)} · ${g.read} min read</p><h1>${esc(g.title)}</h1></div></div><div class="detail-body"><div><p class="eyebrow">The field guide</p><h2>Plan less.<br><em>Travel better.</em></h2><p>${esc(g.intro)}</p>${g.sections.map((s,i) => `<h3>${i+1}. ${esc(s)}</h3><p>${esc(["Begin with the character of the trip, then let destination and timing follow.","Season, access and who you travel with will change the answer more than a ranking ever can.","Choose one strong base, protect unplanned time and make the complicated transfers earn their place.","Confirm live details directly: opening dates, transfer windows, cancellation terms and what is genuinely included."][i])}</p>`).join("")}</div><aside class="detail-facts"><div class="fact"><span>Guide type</span><strong>${esc(g.category)}</strong></div><div class="fact"><span>Reading time</span><strong>${g.read} minutes</strong></div><div class="fact"><span>Editorial note</span><strong>Planning guide</strong></div></aside></div>`;
  }

  function openDetail(kind, slug, setHash = true) {
    const map = { resort:[resorts,resortDetail], collection:[collections,collectionDetail], guide:[guides,guideDetail] };
    const [list, template] = map[kind] || [];
    const item = list?.find(x => x.slug === slug);
    if (!item) return;
    closeLayers(false);
    $("#detailContent").innerHTML = template(item);
    $("#detailModal").classList.add("open");
    $("#detailModal").setAttribute("aria-hidden","false");
    document.body.classList.add("no-scroll");
    $("#detailModal").scrollTop = 0;
    if (setHash) history.pushState({detail:true},"",`#${kind}/${slug}`);
  }

  function openLayer(id) {
    closeLayers(false);
    const el = $(id);
    el.classList.add("open");
    el.setAttribute("aria-hidden","false");
    if (id !== "#searchOverlay") $("#backdrop").classList.add("open");
    document.body.classList.add("no-scroll");
  }

  function closeLayers(resetHash = false) {
    $$(".drawer.open,.search-overlay.open,.detail-modal.open").forEach(el => { el.classList.remove("open"); el.setAttribute("aria-hidden","true"); });
    $("#backdrop").classList.remove("open");
    document.body.classList.remove("no-scroll");
    if (resetHash && /#(resort|collection|guide)\//.test(location.hash)) history.pushState({},"", "#resorts");
  }

  let toastTimer;
  function toast(message) {
    const el = $("#toast");
    el.textContent = message;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 2400);
  }

  const COOKIE_PREFERENCES_KEY = "travelber_cookie_preferences_v1";
  const legalPolicies = {
    privacy: `<p class="eyebrow">Travelber legal</p><h2 id="legalTitle">Privacy policy</h2><p class="legal-updated">Last updated 17 October 2026</p><p>Travelber is an independent travel inspiration website. This policy explains what information is handled when you use the site.</p><h3>Information you choose to provide</h3><p>If you email us at <a href="mailto:admin@travelber.com">admin@travelber.com</a>, your email provider will transmit the information you include so we can respond. The newsletter form in this current preview does not transmit or retain an email address.</p><h3>Browser-local information</h3><p>Saved places and privacy preferences are stored locally in your browser. They are not sent to Travelber by this website. You can remove them by clearing this site's browser data.</p><h3>Analytics and advertising</h3><p>No analytics or advertising service is currently connected. If one is introduced later, optional tracking will remain disabled unless you consent through Cookie settings.</p><h3>Photography and external links</h3><p>The site links to external services such as Unsplash and Pexels. Their own privacy policies apply after you follow those links.</p><h3>Contact</h3><p>For privacy questions or requests, contact <a href="mailto:admin@travelber.com">admin@travelber.com</a>.</p>`,
    cookies: `<p class="eyebrow">Travelber legal</p><h2 id="legalTitle">Cookie policy</h2><p class="legal-updated">Last updated 17 October 2026</p><p>Travelber currently uses browser local storage rather than tracking cookies. We use the term “Cookie settings” as a familiar way to manage all browser-storage preferences.</p><h3>Essential storage</h3><p><strong>travelber_cookie_preferences_v1</strong> remembers whether you allowed optional analytics or marketing. Saved-place information is also kept locally so your shortlist remains available on this device. Essential storage cannot be switched off through this panel because it records your choice and supports requested features.</p><h3>Optional analytics</h3><p>Analytics is currently not connected. Selecting “Allow” records your preference only; it does not load an analytics service.</p><h3>Optional marketing</h3><p>Advertising and marketing trackers are currently not connected. Selecting “Allow” records your preference only; it does not load advertising technology.</p><h3>Change or withdraw consent</h3><p>Choose “Cookie settings” in the footer at any time. You can reject optional categories, save new choices, or clear this site's browser data to remove stored preferences.</p><h3>Contact</h3><p>Questions about this policy can be sent to <a href="mailto:admin@travelber.com">admin@travelber.com</a>.</p>`
  };

  function readCookiePreferences() {
    try { return JSON.parse(localStorage.getItem(COOKIE_PREFERENCES_KEY)); } catch { return null; }
  }

  function setModalScroll() {
    const hasOpenModal = $("#cookieModal").classList.contains("open") || $("#legalModal").classList.contains("open");
    document.body.classList.toggle("no-scroll", hasOpenModal);
  }

  function closeCookieModal() {
    $("#cookieModal").classList.remove("open");
    $("#cookieModal").setAttribute("aria-hidden", "true");
    setModalScroll();
  }

  function openCookieModal() {
    const saved = readCookiePreferences() || {};
    $("#analyticsConsent").checked = Boolean(saved.analytics);
    $("#marketingConsent").checked = Boolean(saved.marketing);
    $("#cookieModal").classList.add("open");
    $("#cookieModal").setAttribute("aria-hidden", "false");
    setModalScroll();
    setTimeout(() => $("#analyticsConsent").focus(), 20);
  }

  function saveCookiePreferences(analytics, marketing) {
    const preferences = { necessary: true, analytics: Boolean(analytics), marketing: Boolean(marketing), updatedAt: new Date().toISOString() };
    try { localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(preferences)); } catch {}
    $("#cookieBanner").hidden = true;
    closeCookieModal();
    toast("Your privacy choices have been saved");
  }

  function openLegalPolicy(type) {
    $("#legalContent").innerHTML = legalPolicies[type] || legalPolicies.privacy;
    $("#legalModal").classList.add("open");
    $("#legalModal").setAttribute("aria-hidden", "false");
    setModalScroll();
    setTimeout(() => $("#legalModal .cookie-close").focus(), 20);
  }

  function closeLegalPolicy() {
    $("#legalModal").classList.remove("open");
    $("#legalModal").setAttribute("aria-hidden", "true");
    setModalScroll();
  }

  function populateFilters() {
    const append = (selector, values) => values.forEach(v => $(selector).insertAdjacentHTML("beforeend",`<option value="${esc(v)}">${esc(v)}</option>`));
    // Keep the country filter focused on destinations with published entries.
    // Netherlands and Belgium can be added automatically once their resort data exists.
    const preferredCountries = ["Austria", "France", "Germany", "Norway", "United Kingdom", "Netherlands", "Belgium"];
    const availableCountries = new Set(resorts.map(r => r.country));
    append("#regionFilter", preferredCountries.filter(country => availableCountries.has(country)));
    append("#typeFilter", [...new Set(resorts.map(r => r.type))].map(t => t));
    append("#seasonFilter", ["Spring","Summer","Autumn","Winter"]);
  }

  function syncFilters() {
    state.filters.query = $("#resortSearch").value;
    state.filters.region = $("#regionFilter").value;
    state.filters.type = $("#typeFilter").value;
    state.filters.season = $("#seasonFilter").value;
    state.filters.budget = $("#budgetFilter").value;
    state.visibleResorts = 12;
    renderResorts();
  }

  function routeFromHash() {
    const match = location.hash.match(/^#(resort|collection|guide)\/(.+)$/);
    if (match) openDetail(match[1],match[2],false);
  }

  document.addEventListener("click", event => {
    const legal = event.target.closest("[data-legal]");
    if (legal) { event.preventDefault(); openLegalPolicy(legal.dataset.legal); return; }
    const favorite = event.target.closest("[data-favorite]");
    if (favorite) { event.preventDefault(); event.stopPropagation(); toggleFavorite(favorite.dataset.favorite); return; }
    for (const kind of ["resort","collection","guide"]) {
      const trigger = event.target.closest(`[data-open-${kind}]`);
      if (trigger) { event.preventDefault(); openDetail(kind,trigger.dataset[`open${kind[0].toUpperCase()}${kind.slice(1)}`]); return; }
    }
    if (event.target.closest("[data-close]")) closeLayers(true);
  });

  $("#heroSearch").addEventListener("submit", e => { e.preventDefault(); $("#resortSearch").value = $("#heroQuery").value; $("#typeFilter").value = $("#heroMood").value; syncFilters(); location.hash = "resorts"; });
  $("#filterBar").addEventListener("input", syncFilters);
  $("#clearFilters").addEventListener("click", () => { ["#resortSearch","#regionFilter","#typeFilter","#seasonFilter","#budgetFilter"].forEach((s,i) => $(s).value = i ? "all" : ""); syncFilters(); });
  $("#loadMore").addEventListener("click", () => { state.visibleResorts += 12; renderResorts(); });
  $("#moreCollections").addEventListener("click", () => { state.visibleCollections = 50; renderCollections(); });
  $("#moreGuides").addEventListener("click", () => { state.visibleGuides = 50; renderGuides(); });
  $("#collectionTabs").addEventListener("click", e => { const b=e.target.closest("button"); if(!b)return; $$("button",e.currentTarget).forEach(x=>x.classList.remove("active")); b.classList.add("active"); state.collectionGroup=b.dataset.group; state.visibleCollections=6; renderCollections(); });
  $("#moodLinks").addEventListener("click", e => { const b=e.target.closest("button"); if(!b)return; $("#typeFilter").value=b.dataset.mood; syncFilters(); location.hash="resorts"; });
  $("#openSaved").addEventListener("click", () => openLayer("#savedDrawer"));
  $("#footerSaved").addEventListener("click", e => { e.preventDefault(); openLayer("#savedDrawer"); });
  $("#menuButton").addEventListener("click", () => openLayer("#mobileMenu"));
  $("#openSearch").addEventListener("click", () => { openLayer("#searchOverlay"); renderGlobalResults(); setTimeout(()=>$("#globalSearch").focus(),200); });
  $("#globalSearch").addEventListener("input", e => renderGlobalResults(e.target.value));
  $("#acceptCookies").addEventListener("click", () => saveCookiePreferences(true, true));
  $("#rejectCookies").addEventListener("click", () => saveCookiePreferences(false, false));
  $("#rejectCookiesModal").addEventListener("click", () => saveCookiePreferences(false, false));
  $("#customizeCookies").addEventListener("click", openCookieModal);
  $("#openCookieSettings").addEventListener("click", openCookieModal);
  $("#saveCookieChoices").addEventListener("click", () => saveCookiePreferences($("#analyticsConsent").checked, $("#marketingConsent").checked));
  $$('[data-cookie-close]').forEach(button => button.addEventListener("click", closeCookieModal));
  $$('[data-legal-close]').forEach(button => button.addEventListener("click", closeLegalPolicy));
  $("#cookieModal").addEventListener("click", e => { if (e.target === e.currentTarget) closeCookieModal(); });
  $("#legalModal").addEventListener("click", e => { if (e.target === e.currentTarget) closeLegalPolicy(); });
  $("#backdrop").addEventListener("click", () => closeLayers(true));
  document.addEventListener("keydown", e => { if(e.key === "Escape") { closeLayers(true); closeCookieModal(); closeLegalPolicy(); } if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="k"){e.preventDefault();openLayer("#searchOverlay");setTimeout(()=>$("#globalSearch").focus(),200);} });
  window.addEventListener("scroll", () => $("#siteHeader").classList.toggle("scrolled", scrollY > 80));
  window.addEventListener("popstate", () => { closeLayers(false); routeFromHash(); });

  $$(".choice-row").forEach(row => row.addEventListener("click", e => { const b=e.target.closest("button"); if(!b)return; $$("button",row).forEach(x=>x.classList.remove("active")); b.classList.add("active"); row.dataset.selected=b.dataset.value; }));
  $("#matcherForm").addEventListener("submit", e => {
    e.preventDefault();
    const type = $("[data-name='landscape']").dataset.selected;
    const season = $("[data-name='season']").dataset.selected;
    const matches = resorts.filter(r => (!type || r.type===type) && (!season || r.seasons.includes(season))).slice(0,3);
    const results = $("#matcherResults");
    results.hidden = false;
    results.innerHTML = matches.length ? `<p class="eyebrow">Your first three</p>${matches.map(r=>`<a href="#resort/${r.slug}">${esc(r.name)} <span>↗</span></a>`).join("")}` : `<p>Try changing one answer—our edit is intentionally selective.</p>`;
  });
  $("#newsletterForm").addEventListener("submit", e => { e.preventDefault(); e.currentTarget.reset(); toast("You’re on the list — welcome to Travelber"); });

  populateFilters();
  renderFeatured();
  renderResorts();
  renderCollections();
  renderGuides();
  updateSaved();
  routeFromHash();
  $("#cookieBanner").hidden = Boolean(readCookiePreferences());
})();
