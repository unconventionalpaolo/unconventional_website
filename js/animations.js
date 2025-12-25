// --- 1. BOOT LOGIC (Invariata) ---
const logBox = document.getElementById('boot-console');
const intro = document.getElementById('intro-layer');
const site = document.getElementById('modern-layer');
const msgs = ["Initializing System...", "Mounting H.A.R.D.T.E.C.H...", "Loading Modules...", "Checking Logic...", "Initializing Mechatronics...", "Verifying Fit...", "Allocating Seed...", "Optimizing Drivers...", "Loading DiN0...", "Initialising exit method...", "Connecting Venture Net...", "System Ready."];

function log(t, f=false) {
    let d=document.createElement('div'); d.className = f?'log-line final-msg':'log-line';
    if(f) d.innerText = t;
    else d.innerHTML = `<span class="status-bracket">[</span><span class="status-ok">OK</span><span class="status-bracket">]</span> <span>${t}</span>`;
    logBox.appendChild(d);
}

async function startBoot() {
    for(let m of msgs){ log(m); await new Promise(r=>setTimeout(r, 60)); }
    await new Promise(r=>setTimeout(r,200)); log("UNCONVENTIONAL MINDS READY...",true);
    await new Promise(r=>setTimeout(r,800)); log("STARTING UP STUDIO SEQUENCE",true);
    setTimeout(()=>{
        intro.classList.add('crt-off-anim');
        setTimeout(()=>{
            intro.style.display='none';
            site.style.display='block';
            site.classList.add('crt-on-anim');
            setTimeout(()=>{ site.style.transform='none'; site.style.animation='none'; site.style.opacity=1; init(); }, 1000);
        }, 750);
    }, 1200);
}
document.addEventListener("DOMContentLoaded", startBoot);

// --- 2. ENGINE LOGIC (Responsive v31 approach) ---
const track = document.getElementById('track');
const bar = document.getElementById('bar');
const star = document.getElementById('star');
const navs = [document.getElementById('n0'), document.getElementById('n1'), document.getElementById('n2'), document.getElementById('n3')];
const tBar = document.getElementById('tFill');
const sProto = document.getElementById('sec-2');
const pSteps = [document.getElementById('ps-1'),document.getElementById('ps-2'),document.getElementById('ps-3'),document.getElementById('ps-4')];
const logoIcon = document.querySelector('.logo-icon');
const logoUnconventional = document.querySelector('.logo-unconventional');
const logoMinds = document.querySelector('.logo-minds');

// Logo text per sezione - loaded from config.js
const logoTexts = {
    0: LOGO_CONFIG.logoBySection['sec-0'].emphasizedText,
    1: LOGO_CONFIG.logoBySection['sec-1'].emphasizedText,
    2: LOGO_CONFIG.logoBySection['sec-2'].emphasizedText,
    3: LOGO_CONFIG.logoBySection['sec-3'].emphasizedText,
    4: LOGO_CONFIG.logoBySection['sec-4'].emphasizedText
};
const logoBaseTexts = {
    0: LOGO_CONFIG.logoBySection['sec-0'].text,
    1: LOGO_CONFIG.logoBySection['sec-1'].text,
    2: LOGO_CONFIG.logoBySection['sec-2'].text,
    3: LOGO_CONFIG.logoBySection['sec-3'].text,
    4: LOGO_CONFIG.logoBySection['sec-4'].text
};

let cur=0, tar=0, max=0;
let isMobile = false;
const totalSections = 5; // 0-4 sections
let currentLogoText = 'Minds';

function init() {
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Horizontal Scroll Listener ONLY if desktop
    window.addEventListener('wheel', e => {
        if(isMobile) return; // BLOCK custom scroll on mobile
        e.preventDefault();
        tar += e.deltaY;
        tar = Math.max(0, Math.min(tar, max));
    }, {passive:false});

    // Mobile scroll listener for progress bar and nav
    window.addEventListener('scroll', () => {
        if(isMobile) updateMobileProgress();
    });

    requestAnimationFrame(loop);
}

function checkMobile() {
    isMobile = window.innerWidth <= 768;

    if(isMobile) {
        // V31 APPROACH: Clean native scroll
        document.body.style.overflowY = 'auto';
        document.body.style.height = 'auto';
        track.style.transform = 'none';
        max = 0;

        // Attiva tutte le card in mobile per default
        pSteps.forEach(el=>el.classList.add('active'));
    } else {
        // DESKTOP MODE
        document.body.style.overflow = 'hidden';
        document.body.style.height = '100%';
        max = track.scrollWidth - window.innerWidth;
    }
}

function updateMobileProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = scrollTop / scrollHeight;

    // Update progress bar (only if it exists)
    if(bar) {
        bar.style.width = (scrollProgress * 100) + '%';
    }

    // Update progress star (only if it exists)
    if(star) {
        let starLeft = 0 + (scrollProgress * 72); // From 10% to 82%
        star.style.left = starLeft + '%';
    }

    // Update navigation highlighting
    const sections = [0, 1, 2, 3, 4];
    const sectionHeight = scrollHeight / (totalSections - 1);
    let currentSection = Math.round(scrollTop / sectionHeight);
    currentSection = Math.min(currentSection, 3); // max nav index is 3

    navs.forEach(n => {
        n.classList.remove('active');
        // Apply on-orange class based on current section
        if(currentSection === 1 || currentSection === 3) {
            n.classList.add('on-orange');
        } else {
            n.classList.remove('on-orange');
        }
    });
    if(navs[currentSection]) navs[currentSection].classList.add('active');

    // Change star color based on section (only if elements exist)
    if(currentSection === 1 || currentSection === 3) {
        if(star) star.classList.add('on-orange');
		if(cursor) cursor.classList.add('on-orange');
    } else {
        if(star) star.classList.remove('on-orange');
		if(cursor) cursor.classList.remove('on-orange');
    }

    // Logo image and color change on orange sections (1 and 3)
    if(currentSection === 1 || currentSection === 3) {
        if(logoIcon) {
            logoIcon.style.backgroundImage = "url('assets/Logo_white.png')";
        }
        if(logoUnconventional) {
            logoUnconventional.style.color = '#fff';
        }
    } else {
        if(logoIcon) {
            logoIcon.style.backgroundImage = "url('assets/Logo_dark.png')";
        }
        if(logoUnconventional) {
            logoUnconventional.style.color = 'var(--accent)';
        }
    }

    // Change logo text based on section with fade
    if(logoMinds && logoTexts[currentSection] && currentLogoText !== logoTexts[currentSection]) {
        currentLogoText = logoTexts[currentSection];
        logoMinds.style.opacity = '0';
        setTimeout(() => {
            logoMinds.textContent = currentLogoText;
            logoMinds.style.opacity = '1';
        }, 300);
    }
    // Change logo base text (Unconventional)
    if(logoUnconventional && logoBaseTexts[currentSection]) {
        logoUnconventional.textContent = logoBaseTexts[currentSection];
    }
}

let lastSectionIndex = -1;

function loop() {
    if (!isMobile) {

        // =========================
        // SCROLL PHYSICS
        // =========================
        cur += (tar - cur) * 0.08;
        track.style.transform = `translateX(-${cur}px)`;

        if (max > 0) {
            //bar.style.width = (cur / max) * 100 + '%';
        }

        // =========================
        // SECTION CALCULATION
        // =========================
        let progress = max > 0 ? cur / max : 0;
        progress = Math.max(0, Math.min(1, progress));

        let currentSectionIndex = Math.floor(progress * totalSections - 0.0001);


        // =========================
        // SECTION CHANGE EVENT
        // =========================
        if (currentSectionIndex !== lastSectionIndex) {
            lastSectionIndex = currentSectionIndex;

            const isOrange = (currentSectionIndex === 1 || currentSectionIndex === 3);

            // -------------------------
            // NAVIGATION
            // -------------------------
            navs.forEach((n, i) => {
                n.classList.toggle('active', i === currentSectionIndex);
                n.classList.toggle('on-orange', isOrange);
            });

            // -------------------------
            // STAR + CURSOR COLOR
            // -------------------------
            if (star) {
                star.classList.toggle('on-orange', isOrange);
            }

            if (cursor) {
                cursor.classList.toggle('on-orange', isOrange);
            }

            // -------------------------
            // LOGO ICON + COLOR
            // -------------------------
            if (logoIcon) {
                logoIcon.style.backgroundImage = isOrange
                    ? "url('assets/Logo_white.png')"
                    : "url('assets/Logo_dark.png')";
            }

            if (logoUnconventional) {
                logoUnconventional.style.color = isOrange ? '#fff' : 'var(--accent)';
            }

            // -------------------------
            // LOGO TEXT (FADE)
            // -------------------------
            if (
                logoMinds &&
                logoTexts[currentSectionIndex] &&
                currentLogoText !== logoTexts[currentSectionIndex]
            ) {
                currentLogoText = logoTexts[currentSectionIndex];
                logoMinds.style.opacity = '0';

                setTimeout(() => {
                    logoMinds.textContent = currentLogoText;
                    logoMinds.style.opacity = '1';
                }, 300);
            }

            if (logoUnconventional && logoBaseTexts[currentSectionIndex]) {
                logoUnconventional.textContent = logoBaseTexts[currentSectionIndex];
            }
        }

        // =========================
        // STAR MOVEMENT (ONLY)
        // =========================
        if (star && max > 0) {
            let progress = cur / max;
            let sectionProgress = progress * (totalSections - 1);
            let starLeft = sectionProgress * 25;
            star.style.left = starLeft + '%';
        }

        // =========================
        // TIMELINE (DESKTOP)
        // =========================
        if (sProto && tBar) {
            let start = sProto.offsetLeft;
            let rel = cur - start + (window.innerWidth * 0.55);
            let pct = Math.max(0, Math.min(1, rel / (window.innerWidth * 0.8)));

            tBar.style.width = (pct * 100) + '%';

            if (pct > 0.1) pSteps[0].classList.add('active'); else pSteps[0].classList.remove('active');
            if (pct > 0.35) pSteps[1].classList.add('active'); else pSteps[1].classList.remove('active');
            if (pct > 0.6) pSteps[2].classList.add('active'); else pSteps[2].classList.remove('active');
            if (pct > 0.85) pSteps[3].classList.add('active'); else pSteps[3].classList.remove('active');
        }
    }

    requestAnimationFrame(loop);
}



// GoTo with Logic Branching
window.goTo = function(i) {
    let el = document.getElementById('sec-' + i);
    if(isMobile) {
        // Native Scroll behavior
        el.scrollIntoView({behavior: 'smooth'});
    } else {
        // Desktop Horizontal math
        tar = el.offsetLeft;
        // Don't manually update colors - let the loop handle it based on actual position
    }
}

// Cursor logic
const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', e => {
    if(!isMobile){
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    }
});

document.querySelectorAll('.interactive,a,button,.nav-item').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
});
