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

// Logo text per sezione
const logoTexts = {
    0: 'Minds',
    1: 'Solutions',
    2: 'Protocol',
    3: 'Capital',
    4: 'Workers'
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

    // Update progress bar
    bar.style.width = (scrollProgress * 100) + '%';

    // Update progress star
    if(star) {
        let starLeft = 10 + (scrollProgress * 72); // From 10% to 82%
        star.style.left = starLeft + '%';
    }

    // Update navigation highlighting
    const sections = [0, 1, 2, 3, 4];
    const sectionHeight = scrollHeight / (totalSections - 1);
    let currentSection = Math.round(scrollTop / sectionHeight);
    currentSection = Math.min(currentSection, 3); // max nav index is 3

    navs.forEach(n => n.classList.remove('active'));
    if(navs[currentSection]) navs[currentSection].classList.add('active');

    // Change star color based on section
    if(currentSection === 1 || currentSection === 3) {
        star.classList.add('on-orange');
    } else {
        star.classList.remove('on-orange');
    }

    // Logo color change on orange sections (1 and 3)
    if(currentSection === 1 || currentSection === 3) {
        if(logoIcon) {
            logoIcon.style.background = '#fff';
            logoIcon.style.borderColor = '#fff';
            logoIcon.style.setProperty('--icon-core-color', 'var(--accent)');
        }
        if(logoUnconventional) {
            logoUnconventional.style.color = '#fff';
        }
    } else {
        if(logoIcon) {
            logoIcon.style.background = 'var(--accent)';
            logoIcon.style.borderColor = 'var(--text)';
            logoIcon.style.setProperty('--icon-core-color', 'var(--text)');
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
}

function loop() {
    if(!isMobile) {
        // Physics for desktop
        cur += (tar - cur) * 0.08;
        track.style.transform = `translateX(-${cur}px)`;
        if(max > 0) bar.style.width = (cur/max)*100 + '%';

        // Navigation Highlighting
        let i = Math.round(cur / window.innerWidth);
        navs.forEach(n => n.classList.remove('active'));
        if(navs[i]) navs[i].classList.add('active');

        // Progress Star Movement (5 sections: 0-4)
        if(star && max > 0) {
            let progress = cur / max; // 0 to 1
            let sectionProgress = progress * (totalSections - 1); // 0 to 4
            let starLeft = 10 + (sectionProgress * 18); // From 10% to 82% (10 + 4*18)
            star.style.left = starLeft + '%';

            // Change color on orange sections (1 and 3)
            if(i === 1 || i === 3) {
                star.classList.add('on-orange');
            } else {
                star.classList.remove('on-orange');
            }
        }

        // Logo color change on orange sections (1 and 3)
        if(i === 1 || i === 3) {
            if(logoIcon) {
                logoIcon.style.background = '#fff';
                logoIcon.style.borderColor = '#fff';
            }
            if(logoIcon && logoIcon.querySelector) {
                const iconCore = logoIcon;
                iconCore.style.setProperty('--icon-core-color', 'var(--accent)');
            }
            if(logoUnconventional) {
                logoUnconventional.style.color = '#fff';
            }
        } else {
            if(logoIcon) {
                logoIcon.style.background = 'var(--accent)';
                logoIcon.style.borderColor = 'var(--text)';
            }
            if(logoUnconventional) {
                logoUnconventional.style.color = 'var(--accent)';
            }
        }

        // Change logo text based on section with fade
        if(logoMinds && logoTexts[i] && currentLogoText !== logoTexts[i]) {
            currentLogoText = logoTexts[i];
            logoMinds.style.opacity = '0';
            setTimeout(() => {
                logoMinds.textContent = currentLogoText;
                logoMinds.style.opacity = '1';
            }, 300);
        }

        // Timeline Animation logic (Desktop only)
        if(sProto && tBar) {
            let start = sProto.offsetLeft;
            let rel = cur - start + (window.innerWidth * 0.55);
            let pct = Math.max(0, Math.min(1, rel / (window.innerWidth * 0.8)));
            tBar.style.width = (pct * 100) + '%';

            if(pct > 0.1) pSteps[0].classList.add('active'); else pSteps[0].classList.remove('active');
            if(pct > 0.35) pSteps[1].classList.add('active'); else pSteps[1].classList.remove('active');
            if(pct > 0.6) pSteps[2].classList.add('active'); else pSteps[2].classList.remove('active');
            if(pct > 0.85) pSteps[3].classList.add('active'); else pSteps[3].classList.remove('active');
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
