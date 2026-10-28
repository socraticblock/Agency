/* Composition study only. No proposed continuous scroll choreography is implemented here. */
(() => {
  'use strict';
  const params = new URLSearchParams(location.search);
  const requested = params.get('hero-study');
  const states = ['experience', 'connection', 'intelligence', 'resolution', 'unfold', 'interpret', 'return', 'handoff'];
  if (!states.includes(requested)) return;
  const oldHero = document.querySelector('#heroJourney');
  if (!oldHero) return;

  const stylesheet = document.createElement('link');
  stylesheet.rel = 'stylesheet';
  stylesheet.href = './hero-composition-study.css';
  document.head.append(stylesheet);
  document.documentElement.classList.add('composition-study');
  const root = document.createElement('section');
  root.id = 'heroCompositionStudy';
  root.className = 'kf-hero';
  root.setAttribute('aria-labelledby', 'studyHeroTitle');
  root.innerHTML = `
    <div class="kf-layout">
      <div class="kf-copy">
        <p class="kf-eyebrow"><i></i> GENEZISI / INDEPENDENT DIGITAL STUDIO</p>
        <h1 id="studyHeroTitle"></h1>
        <p class="kf-proposition"></p>
        <div class="kf-actions"><a class="kf-primary" href="#work">Explore our work <span>↘</span></a><a href="#contact">Start a project <span>↗</span></a></div>
        <p class="kf-disciplines">Websites. Automation. AI agents.<br><span>Three disciplines. Available independently.</span></p>
      </div>
      <div class="kf-scene">
        <div class="kf-scene-caption"><span>GENEZISI / STUDIO CONCEPT</span><span class="kf-act-label"></span></div>
        <article class="kf-website" aria-label="Illustrative Genezisi website and connected enquiry">
          <header class="kf-site-header"><span class="kf-site-brand">genezisi<span>↗</span></span><span class="kf-site-note">Ideas, given form.</span><a href="#services">Our practice ↗</a></header>
          <div class="kf-editorial">
            <div class="kf-editorial-heading"><span>DESIGN & TECHNOLOGY<br>INDEPENDENT BY NATURE</span><h2>Room for<br><em>what’s next.</em></h2></div>
            <div class="kf-artwork"><img src="./study-aperture.svg" alt="Original architectural paper composition: an open passage connecting ivory, forest and mint surfaces"><span>FIG. 01 / OPEN POSSIBILITIES</span></div>
            <div class="kf-editorial-footer"><p>Distinctive by design.<br>Considered in every detail.</p><span>ART DIRECTION<br>DESIGN / DEVELOPMENT</span><span class="kf-editorial-number">01</span></div>
          </div>
          <section class="kf-document" aria-label="One enquiry, from message to reviewed draft">
            <div class="kf-drawer-bar"><div><small>A CONVERSATION STARTS HERE.</small><strong><span class="kf-opening-excerpt">“Could we talk next week?”</span><span class="kf-working-title">The same enquiry, connected.</span></strong></div><button class="kf-open-enquiry" type="button" aria-expanded="false" aria-controls="kfEnquiryBody" aria-label="Open illustrative enquiry">↗</button><span class="kf-document-number">01 / ENQUIRY</span></div>
            <div class="kf-document-body" id="kfEnquiryBody">
              <div class="kf-document-meta"><span>ILLUSTRATIVE ENQUIRY</span><span>DEMO-1042</span></div>
              <blockquote class="kf-message">“Could we <span data-meaning="intent">talk</span> <span data-meaning="date">next week</span>?<br>An <span data-meaning="preference">afternoon</span> would be ideal.”</blockquote>
              <p class="kf-contact">ILLUSTRATIVE VISITOR <span>visitor@example.com</span></p>
              <div class="kf-mapping">
                <div class="kf-source"><span class="kf-small-label">01 / VALIDATED INPUT</span><strong>Enquiry.</strong><p>Website enquiry<br>visitor@example.com</p><span class="kf-validated">✓ Required fields complete</span></div>
                <div class="kf-transfer" aria-label="The validated enquiry reaches the CRM"><span>→</span><small>MAPPED</small></div>
                <div class="kf-destination"><span class="kf-small-label">02 / CRM RECORD</span><strong>DEMO-1042<span class="kf-record-mark">↙</span></strong><p>Website enquiry<br>Ready for follow-up</p><span class="kf-validated">✓ Information received</span></div>
              </div>
              <div class="kf-automation-receipt"><span>↳</span><p>Owner notification prepared.<small>Fixed rules · No AI required · Not sent</small></p></div>
              <div class="kf-interpretation"><div><span>INTENT</span><strong>A consultation</strong></div><div><span>WHEN</span><strong>Next week</strong></div><div><span>PREFERENCE</span><strong>Afternoons</strong></div></div>
              <div class="kf-availability"><div class="kf-tool-heading"><span>READ AVAILABILITY</span><small>Permitted · Read-only</small></div><div class="kf-times"><div><span>TUESDAY</span><strong>14:00</strong></div><i>or</i><div><span>THURSDAY</span><strong>15:00</strong></div><span class="kf-tool-detail">calendar.<br>read_availability</span></div></div>
              <div class="kf-draft"><span class="kf-small-label">PROPOSED REPLY</span><p>“Would Tuesday at 14:00 or Thursday at 15:00 suit you?”</p></div>
              <div class="kf-review"><span class="kf-review-symbol">⊙</span><div><strong>Ready for your review.</strong><p>This demo cannot send messages or create appointments.</p></div></div>
              <button class="kf-close-enquiry" type="button">Close enquiry preview ↑</button>
            </div>
            <div class="kf-approved"><span class="kf-approved-mark">✓</span><div><small>OWNER APPROVAL SIMULATED / DEMO-1042</small><span class="kf-approved-context">“Could we talk next week?” → two options prepared</span><strong>Approved draft. Ready for manual delivery.</strong><p>No message sent. No appointment created.</p></div></div>
          </section>
          <div class="kf-site-foot"><span>DESIGNED TO CONNECT.</span><span class="kf-foot-state">ONE WEBSITE. MORE POSSIBILITY.</span><span>↗</span></div>
        </article>
        <p class="kf-demo-caption">ILLUSTRATIVE EXPERIENCE / NO LIVE SYSTEM ACTIONS</p>
      </div>
    </div>
    <div class="kf-bottom"><span>BEAUTIFUL EXPERIENCES. PURPOSEFUL ENGINEERING.</span><a href="#work">SELECTED WORK ↓</a></div>`;
  oldHero.replaceWith(root);
  const copy = {
    experience: ['01 / THE EXPERIENCE', 'Your website<br>is only the<br><em>beginning.</em>', 'Distinctive websites. Dependable automation. AI agents with people in control.'],
    connection: ['02 / THE CONNECTION', 'A conversation.<br><em>Connected.</em>', 'The enquiry already belongs to the website. Now it belongs in the right tools, with the right information.'],
    intelligence: ['03 / THE INTELLIGENCE', 'Context.<br><em>Put to work.</em>', 'The same message. A permitted tool. Two useful options, ready for human review.'],
    resolution: ['04 / THE RESOLUTION', 'Beautiful outside.<br><em>Useful inside.</em>', 'The same website. A considered system behind it. See what we’ve built in the real world.'],
    unfold: ['TRANSITION / THE ENQUIRY OPENS', 'A conversation.<br><em>Connected.</em>', 'The website gives its enquiry room to become a working document. The message stays in view.'],
    interpret: ['TRANSITION / FROM RECORD TO CONTEXT', 'The request.<br><em>Understood.</em>', 'The original words establish the intent, time constraint and preference. One enquiry, viewed with context.'],
    return: ['TRANSITION / BACK TO THE WEBSITE', 'Beautiful outside.<br><em>Useful inside.</em>', 'The reviewed document returns to the website it came from, carrying a useful result.'],
    handoff: ['TRANSITION / POSSIBILITY TO PROOF', 'Beautiful outside.<br><em>Useful inside.</em>', 'A demonstration of what can connect. Real work follows.']
  };
  function setState(state) {
    if (!states.includes(state)) return;
    root.dataset.state = state;
    root.classList.remove('enquiry-open');
    root.querySelector('.kf-open-enquiry').setAttribute('aria-expanded', 'false');
    const [label, title, proposition] = copy[state];
    root.querySelector('.kf-act-label').textContent = label;
    root.querySelector('h1').innerHTML = title;
    root.querySelector('.kf-proposition').textContent = proposition;
    root.querySelector('.kf-foot-state').textContent = ['resolution', 'return', 'handoff'].includes(state) ? 'THE ENQUIRY, CONSIDERED.' : 'ONE WEBSITE. MORE POSSIBILITY.';
    document.querySelectorAll('[data-study-state]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.studyState === state)));
    const url = new URL(location.href);
    url.searchParams.set('hero-study', state);
    url.hash = '';
    history.replaceState(null, '', url);
  }
  root.querySelector('.kf-open-enquiry').addEventListener('click', () => {
    const open = root.classList.toggle('enquiry-open');
    root.querySelector('.kf-open-enquiry').setAttribute('aria-expanded', String(open));
  });
  root.querySelector('.kf-close-enquiry').addEventListener('click', () => {
    root.classList.remove('enquiry-open');
    root.querySelector('.kf-open-enquiry').setAttribute('aria-expanded', 'false');
    root.querySelector('.kf-open-enquiry').focus();
  });
  if (params.get('capture') !== '1') {
    const controls = document.createElement('nav');
    controls.className = 'kf-review-controls';
    controls.setAttribute('aria-label', 'Composition review states');
    controls.innerHTML = `<span>COMPOSITION STUDY<br><small>STILLS · MOTION PENDING REVIEW</small></span><div>${states.map((state, i) => `<button type="button" data-study-state="${state}" aria-pressed="false">${i < 4 ? '0' + (i + 1) + ' ' : ''}${state}</button>`).join('')}</div><a href="./index.html">Current hero ↗</a>`;
    root.before(controls);
    controls.addEventListener('click', event => {
      const button = event.target.closest('[data-study-state]');
      if (button) {
        setState(button.dataset.studyState);
        root.scrollIntoView({block: 'start', behavior: 'instant'});
      }
    });
  }
  setState(requested);
})();
