#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Percorsi dei file
const CONTENT_FILE = path.join(__dirname, 'content-simple.json');
const INDEX_FILE = path.join(__dirname, 'index.html');
const BACKUP_FILE = path.join(__dirname, 'index.backup.html');

console.log('🚀 Starting build process...\n');

// Leggi il content JSON
let content;
try {
  const contentData = fs.readFileSync(CONTENT_FILE, 'utf8');
  content = JSON.parse(contentData);
  console.log('✅ Loaded content-simple.json');
} catch (err) {
  console.error('❌ Error reading content-simple.json:', err.message);
  process.exit(1);
}

// Leggi l'HTML
let html;
try {
  html = fs.readFileSync(INDEX_FILE, 'utf8');
  console.log('✅ Loaded index.html');
} catch (err) {
  console.error('❌ Error reading index.html:', err.message);
  process.exit(1);
}

// Crea backup
try {
  fs.copyFileSync(INDEX_FILE, BACKUP_FILE);
  console.log('✅ Created backup: index.backup.html\n');
} catch (err) {
  console.error('⚠️  Warning: Could not create backup:', err.message);
}

// Funzione helper per escape regex
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Funzione per sostituire testo con logging
function replaceText(html, oldText, newText, description) {
  const escapedOld = escapeRegex(oldText);
  const regex = new RegExp(escapedOld, 'g');

  if (html.match(regex)) {
    html = html.replace(regex, newText);
    console.log(`✓ Updated: ${description}`);
  } else {
    console.log(`⚠ Not found: ${description}`);
  }

  return html;
}

console.log('📝 Updating content...\n');

// ===== META TAGS =====
html = replaceText(html,
  '<title>UNCONVENTIONAL MINDS - Robotics Venture Studio</title>',
  `<title>${content.meta.title}</title>`,
  'Page title'
);

html = replaceText(html,
  '<meta name="description" content="We bridge the gap between Lab & Market. From zero to Exit in 24 Months.">',
  `<meta name="description" content="${content.meta.description}">`,
  'Meta description'
);

// ===== HEADER LOGO (default in navbar) =====
html = replaceText(html,
  '<span class="logo-unconventional">Unconventional</span>',
  `<span class="logo-unconventional">${content.header.logoBySection['sec-0'].text}</span>`,
  'Header logo text'
);

html = replaceText(html,
  '<span class="logo-minds">Minds</span>',
  `<span class="logo-minds">${content.header.logoBySection['sec-0'].emphasizedText}</span>`,
  'Header logo emphasized text'
);

// ===== HOME SECTION =====
html = replaceText(html,
  '<div class="sec-tag">01 // VENTURE_STUDIO.UM</div>',
  `<div class="sec-tag">${content.sections.home.tag}</div>`,
  'Home section tag'
);

html = replaceText(html,
  '<h1 class="hero-title">BUILD<br><span>PHYSICAL</span><br>ASSETS.</h1>',
  `<h1 class="hero-title">${content.sections.home.title.line1}<br><span>${content.sections.home.title.line2}</span><br>${content.sections.home.title.line3}</h1>`,
  'Home hero title'
);

html = replaceText(html,
  '<span class="h-tag">[ MARKET_DRIVEN ]</span>',
  `<span class="h-tag">${content.sections.home.tags[0]}</span>`,
  'Home tag 1'
);

html = replaceText(html,
  '<span class="h-tag">[ ART_INSPIRED ]</span>',
  `<span class="h-tag">${content.sections.home.tags[1]}</span>`,
  'Home tag 2'
);

html = replaceText(html,
  '<span class="h-tag">[ TECH_BUILT ]</span>',
  `<span class="h-tag">${content.sections.home.tags[2]}</span>`,
  'Home tag 3'
);

// Home description - fix multiline formatting
const oldHomeDesc = `<h2>ROBOTICS VENTURE STUDIO.</h2>
                        We bridge the gap between Lab & Market.<br>
                        From zero to Exit in 24 Months.`;
const newHomeDesc = `<h2>${content.sections.home.description.strong}</h2>
                        ${content.sections.home.description.text}`;
html = replaceText(html, oldHomeDesc, newHomeDesc, 'Home description');

// ===== OS SECTION =====
html = replaceText(html,
  '<div class="sec-tag">02 // UM_OS25.UM</div>',
  `<div class="sec-tag">${content.sections.os.tag}</div>`,
  'OS section tag'
);

html = replaceText(html,
  '<h2 class="tit-2">SYSTEM ARCHITECTURE</h2>',
  `<h2 class="tit-2">${content.sections.os.title}</h2>`,
  'OS section title'
);

html = replaceText(html,
  '<div class="sub-2">Our proprietary operating model. Three distinct engines.</div>',
  `<div class="sub-2">${content.sections.os.subtitle}</div>`,
  'OS section subtitle'
);

// OS Card 1 - VENTURE
html = replaceText(html,
  '<h3>VENTURE<br>LABS</h3>',
  `<h3>${content.sections.os.cards[0].title}</h3>`,
  'OS Card 1 title'
);

html = replaceText(html,
  '<p>We create our own monsters. <br> Proprietary IP. Exit focus.</p>',
  `<p>${content.sections.os.cards[0].description}</p>`,
  'OS Card 1 description'
);

html = replaceText(html,
  '<div class="os-mono">[ EQUITY ENGINE ]</div>',
  `<div class="os-mono">${content.sections.os.cards[0].label}</div>`,
  'OS Card 1 label'
);

// OS Card 2 - CORPORATE
html = replaceText(html,
  '<h3>CORPORATE<br>BUILDING</h3>',
  `<h3>${content.sections.os.cards[1].title}</h3>`,
  'OS Card 2 title'
);

html = replaceText(html,
  '<p>Startup-as-a-Service. <br> Whiteboard to hardware MVP in 6 months.</p>',
  `<p>${content.sections.os.cards[1].description}</p>`,
  'OS Card 2 description'
);

html = replaceText(html,
  '<div class="os-mono">[ PARTNERSHIP ENGINE ]</div>',
  `<div class="os-mono">${content.sections.os.cards[1].label}</div>`,
  'OS Card 2 label'
);

// OS Card 3 - SOLUTIONS
html = replaceText(html,
  '<h3>DEEP TECH<br>SOLUTIONS</h3>',
  `<h3>${content.sections.os.cards[2].title}</h3>`,
  'OS Card 3 title'
);

html = replaceText(html,
  '<p>Engineering for corporate. <br> Solving blockers.</p>',
  `<p>${content.sections.os.cards[2].description}</p>`,
  'OS Card 3 description'
);

html = replaceText(html,
  '<div class="os-mono">[ CASH FLOW ENGINE ]</div>',
  `<div class="os-mono">${content.sections.os.cards[2].label}</div>`,
  'OS Card 3 label'
);

// ===== PROTOCOL SECTION =====
html = replaceText(html,
  '<h2 class="tit-2">4D EXECUTION GRID</h2>',
  `<h2 class="tit-2">${content.sections.protocol.title}</h2>`,
  'Protocol title'
);

html = replaceText(html,
  '<div class="sub-2" style="color: var(--text);">Time-boxed framework ensuring delivery speed and focus.</div>',
  `<div class="sub-2" style="color: var(--text);">${content.sections.protocol.subtitle}</div>`,
  'Protocol subtitle'
);

// Protocol Steps
for (let i = 0; i < content.sections.protocol.steps.length; i++) {
  const step = content.sections.protocol.steps[i];
  const stepNum = i + 1;

  // Find and replace step number
  const oldStepNum = [
    'STEP 01 // 4 WKS',
    'STEP 02 // 2 MO',
    'STEP 03 // 6 MO',
    'STEP 04 // +7 MO'
  ][i];

  html = replaceText(html,
    `<span class="p-num">${oldStepNum}</span>`,
    `<span class="p-num">${step.number}</span>`,
    `Protocol step ${stepNum} number`
  );

  // Find and replace title
  const oldTitle = ['SCOUT', 'CONCEPT', 'BUILD', 'DEPLOY'][i];
  html = replaceText(html,
    `<h4 class="p-title">${oldTitle}</h4>`,
    `<h4 class="p-title">${step.title}</h4>`,
    `Protocol step ${stepNum} title`
  );

  // Find and replace description
  const oldDesc = [
    'Data-driven validation.<br>Extract market fit before building.',
    'Identity first.<br>Aesthetic function.<br>Defining the soul.',
    'Brutal Engineering.<br>Modular stack, ROS2, dirty MVP.',
    'Validation & Exit.<br>Pilots in real world context.'
  ][i];

  html = replaceText(html,
    `<p class="p-desc">${oldDesc}</p>`,
    `<p class="p-desc">${step.description}</p>`,
    `Protocol step ${stepNum} description`
  );
}

// ===== INVESTORS SECTION =====
html = replaceText(html,
  '<div class="inv-tit">HARD TECH IS<br>THE ONLY ASSET<br>CLASS THAT MATTERS.</div>',
  `<div class="inv-tit">${content.sections.investors.title}</div>`,
  'Investors title'
);

html = replaceText(html,
  '<p style="color: white; margin-bottom: 40px; font-size: 1.5rem; font-family: \'Roboto Mono\', monospace; text-transform: uppercase; font-weight: 500;">Software is saturated. Atoms are the new frontier.</p>',
  `<p style="color: white; margin-bottom: 40px; font-size: 1.5rem; font-family: 'Roboto Mono', monospace; text-transform: uppercase; font-weight: 500;">${content.sections.investors.subtitle}</p>`,
  'Investors subtitle'
);

html = replaceText(html,
  '<div><small>ROUND SIZE</small><span>1 M€</span></div>',
  `<div><small>${content.sections.investors.stats[0].label}</small><span>${content.sections.investors.stats[0].value}</span></div>`,
  'Investor stat 1'
);

html = replaceText(html,
  '<div><small>TARGET EXIT</small><span>24 MO</span></div>',
  `<div><small>${content.sections.investors.stats[1].label}</small><span>${content.sections.investors.stats[1].value}</span></div>`,
  'Investor stat 2'
);

// ===== CONTACT SECTION =====
html = replaceText(html,
  '<h2 class="tit-2">JOIN<br><span class="highlight">THE</span><br>STUDIO</h2>',
  `<h2 class="tit-2">${content.sections.contact.title}</h2>`,
  'Contact title'
);

html = replaceText(html,
  '<div class="sub-2">Three paths. One destination.</div>',
  `<div class="sub-2">${content.sections.contact.subtitle}</div>`,
  'Contact subtitle'
);

// Contact buttons - fix multiline formatting
const oldContactBtn1 = `<a href="mailto:info@unconventional.studio" class="c-btn interactive">
                            <div class="c-txt"><div class="c-sub">[ NEED EXECUTION? ]</div><div class="c-tit">CORPORATE</div></div>
                        </a>`;
const newContactBtn1 = `<a href="mailto:${content.sections.contact.buttons[0].email}" class="c-btn interactive">
                            <div class="c-txt"><div class="c-sub">${content.sections.contact.buttons[0].subtitle}</div><div class="c-tit">${content.sections.contact.buttons[0].title}</div></div>
                        </a>`;
html = replaceText(html, oldContactBtn1, newContactBtn1, 'Contact button 1');

const oldContactBtn2 = `<a href="mailto:founders@unconventional.studio" class="c-btn interactive">
                            <div class="c-txt"><div class="c-sub">[ JOIN PIPELINE ]</div><div class="c-tit">FOUNDER</div></div>
                        </a>`;
const newContactBtn2 = `<a href="mailto:${content.sections.contact.buttons[1].email}" class="c-btn interactive">
                            <div class="c-txt"><div class="c-sub">${content.sections.contact.buttons[1].subtitle}</div><div class="c-tit">${content.sections.contact.buttons[1].title}</div></div>
                        </a>`;
html = replaceText(html, oldContactBtn2, newContactBtn2, 'Contact button 2');

const oldContactBtn3 = `<a href="mailto:invest@unconventional.studio" class="c-btn interactive">
                            <div class="c-txt"><div class="c-sub">[ SEEKING ALPHA ]</div><div class="c-tit">INVESTOR</div></div>
                        </a>`;
const newContactBtn3 = `<a href="mailto:${content.sections.contact.buttons[2].email}" class="c-btn interactive">
                            <div class="c-txt"><div class="c-sub">${content.sections.contact.buttons[2].subtitle}</div><div class="c-tit">${content.sections.contact.buttons[2].title}</div></div>
                        </a>`;
html = replaceText(html, oldContactBtn3, newContactBtn3, 'Contact button 3');

// ===== FOOTER =====
html = replaceText(html,
  '<div class="footer">UM_OS25 // UNCONVENTIONAL MINDS S.R.L. / GENOVA / ITALY</div>',
  `<div class="footer">${content.footer.text}</div>`,
  'Footer text'
);

// Salva il file aggiornato
try {
  fs.writeFileSync(INDEX_FILE, html, 'utf8');
  console.log('\n✅ Successfully updated index.html');
  console.log('\n🎉 Build complete! Your site is ready.\n');
} catch (err) {
  console.error('\n❌ Error writing index.html:', err.message);
  process.exit(1);
}
