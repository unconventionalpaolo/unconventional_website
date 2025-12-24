// Content Management System - ContentLoader Class
class ContentLoader {
    constructor(jsonPath) {
        this.jsonPath = jsonPath;
        this.data = null;
    }

    async init() {
        try {
            console.log('[ContentLoader] Loading content from:', this.jsonPath);
            const response = await fetch(this.jsonPath);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            this.data = await response.json();
            console.log('[ContentLoader] Content loaded successfully:', this.data);

            // Apply configuration
            //this.applyConfig();

            // Populate all sections
            //this.populateHeader();
            //this.populateSections();
            //this.populateFooter();

            // Initialize dynamic logo - DISABLED (managed by animations.js now)
            // this.initDynamicLogo();

            console.log('[ContentLoader] Initialization complete');
            return true;
        } catch (error) {
            console.error('[ContentLoader] Error loading content:', error);
            console.warn('[ContentLoader] Using fallback to hardcoded HTML content');
            this.fallbackToDefaults();
            return false;
        }
    }

    applyConfig() {
        if (!this.data || !this.data.config) return;

        const { colors } = this.data.config;
        const root = document.documentElement;

        // Apply CSS variables from JSON - DISABLED to use CSS file colors
        // if (colors) {
        //     Object.entries(colors).forEach(([key, value]) => {
        //         const cssVar = `--${this.camelToKebab(key)}`;
        //         root.style.setProperty(cssVar, value);
        //     });
        //     console.log('[ContentLoader] CSS variables applied from config');
        // }

        // Update meta tags
        // if (this.data.meta) {
        //     document.title = this.data.meta.title;

        //     const metaDesc = document.querySelector('meta[name="description"]');
        //     if (metaDesc) {
        //         metaDesc.setAttribute('content', this.data.meta.description);
        //     }

        //     const htmlLang = document.querySelector('html');
        //     if (htmlLang && this.data.meta.language) {
        //         htmlLang.setAttribute('lang', this.data.meta.language);
        //     }

        //     console.log('[ContentLoader] Meta tags updated');
        // }
    }

    populateHeader() {
        if (!this.data || !this.data.header) return;

        const { header } = this.data;

        // Logo
        const logoEl = document.querySelector('.brand-logo');
        if (logoEl && header.logo) {
            logoEl.innerHTML = `${header.logo.text} <span>${header.logo.emphasizedText}</span>`;
        }

        // Navigation (already exists in HTML, just verify)
        console.log('[ContentLoader] Header populated');
    }

    populateSections() {
        // DISABLED - Content is managed directly in HTML to preserve animations and references
        // if (!this.data || !this.data.sections) return;

        // const { sections } = this.data;

        // // HOME
        // if (sections.home) this.populateHome(sections.home);

        // // OS
        // if (sections.os) this.populateOS(sections.os);

        // // PROTOCOL
        // if (sections.protocol) this.populateProtocol(sections.protocol);

        // // INVESTORS
        // if (sections.investors) this.populateInvestors(sections.investors);

        // // CONTACT
        // if (sections.contact) this.populateContact(sections.contact);

        console.log('[ContentLoader] Sections population skipped - using hardcoded HTML');
    }

    populateHome(data) {
        const section = document.querySelector(`#${data.sectionId}`);
        if (!section) return;

        // Tag
        const tagEl = section.querySelector('.sec-tag');
        if (tagEl) tagEl.textContent = data.tag;

        // Title with accent
        const titleEl = section.querySelector('.hero-title');
        if (titleEl && data.title) {
            const { title } = data;
            let html = '';

            [title.line1, title.line2, title.line3].forEach((line, index) => {
                if (index === title.accentLine - 1) {
                    html += `<span>${line}</span>`;
                } else {
                    html += line;
                }
                if (index < 2) html += '<br>';
            });

            titleEl.innerHTML = html;
        }

        // Description
        const descEl = section.querySelector('.hero-desc');
        if (descEl && data.description) {
            let html = `<h2 class="hero-desc-title">${data.description.strong}</h2>`;
            html += data.description.lines.join('<br>');
            descEl.innerHTML = html;
        }

        // Tags
        const tagsEl = section.querySelector('.hero-tags');
        if (tagsEl && data.tags) {
            tagsEl.innerHTML = data.tags.map(tag =>
                `<span class="h-tag">${tag}</span>`
            ).join('');
        }

        console.log('[ContentLoader] Home section populated');
    }

    populateOS(data) {
        // FULLY DISABLED - All content managed in HTML
        // const section = document.querySelector(`#${data.sectionId}`);
        // if (!section) return;

        // // Tag
        // const tagEl = section.querySelector('.sec-tag');
        // if (tagEl) tagEl.textContent = data.tag;

        // // Title
        // const titleEl = section.querySelector('.tit-2');
        // if (titleEl) titleEl.textContent = data.title;

        // // Subtitle
        // const subtitleEl = section.querySelector('.sub-2');
        // if (subtitleEl) subtitleEl.textContent = data.subtitle;

        // Cards - DISABLED to preserve styles and animations
        // const cardsContainer = section.querySelector('.os-wrap');
        // if (cardsContainer && data.cards) {
        //     cardsContainer.innerHTML = data.cards.map(card => {
        //         const featuredStyle = card.featured ? 'style="border-top-color: var(--accent)"' : '';
        //         const featuredH3Style = card.featured ? 'style="color:var(--accent)"' : '';
        //         const featuredLabelStyle = card.featured ? 'style="color:var(--accent)"' : '';

        //         return `
        //             <div class="os-card interactive" ${featuredStyle}>
        //                 <img src="${card.imagePlaceholder}" class="os-img" alt="">
        //                 <h3 ${featuredH3Style}>${card.title}</h3>
        //                 <p>${card.description}</p>
        //                 <div class="os-mono" ${featuredLabelStyle}>${card.label}</div>
        //             </div>
        //         `;
        //     }).join('');
        // }

        console.log('[ContentLoader] OS section populated');
    }

    populateProtocol(data) {
        const section = document.querySelector(`#${data.sectionId}`);
        if (!section) return;

        // Tag
        const tagEl = section.querySelector('.sec-tag');
        if (tagEl) tagEl.textContent = data.tag;

        // Title
        const titleEl = section.querySelector('.tit-2');
        if (titleEl) titleEl.textContent = data.title;

        // Subtitle
        const subtitleEl = section.querySelector('.sub-2');
        if (subtitleEl) subtitleEl.textContent = data.subtitle;

        // Steps - DISABLED to preserve animation references
        // const stepsContainer = section.querySelector('.proto-grid');
        // if (stepsContainer && data.steps) {
        //     stepsContainer.innerHTML = data.steps.map(step => `
        //         <div class="p-card interactive" id="${step.id}">
        //             <div>
        //                 <span class="p-num">${step.number}</span>
        //                 <h4 class="p-title">${step.title}</h4>
        //             </div>
        //             <p class="p-desc">${step.description}</p>
        //         </div>
        //     `).join('');
        // }

        console.log('[ContentLoader] Protocol section populated');
    }

    populateInvestors(data) {
        const section = document.querySelector(`#${data.sectionId}`);
        if (!section) return;

        // Tag
        const tagEl = section.querySelector('.sec-tag');
        if (tagEl) tagEl.textContent = data.tag;

        // Title
        const titleEl = section.querySelector('.inv-tit');
        if (titleEl) titleEl.innerHTML = data.title;

        // Subtitle
        const subtitleEl = section.querySelector('.inv-container p');
        if (subtitleEl) subtitleEl.textContent = data.subtitle;

        // Stats
        const statsContainer = section.querySelector('.inv-stats');
        if (statsContainer && data.stats) {
            statsContainer.innerHTML = data.stats.map(stat => `
                <div>
                    <small>${stat.label}</small>
                    <span>${stat.value}</span>
                </div>
            `).join('');
        }

        console.log('[ContentLoader] Investors section populated');
    }

    populateContact(data) {
        const section = document.querySelector(`#${data.sectionId}`);
        if (!section) return;

        // Tag
        const tagEl = section.querySelector('.sec-tag');
        if (tagEl) tagEl.textContent = data.tag;

        // Title
        const titleEl = section.querySelector('.tit-2');
        if (titleEl) titleEl.textContent = data.title;

        // Subtitle
        const subtitleEl = section.querySelector('.sub-2');
        if (subtitleEl) subtitleEl.textContent = data.subtitle;

        // Buttons
        const buttonsContainer = section.querySelector('.contact-stack');
        if (buttonsContainer && data.buttons) {
            buttonsContainer.innerHTML = data.buttons.map(btn => {
                const isBlack = btn.style === 'black';
                const btnStyle = isBlack ? 'style="background:#000; color:#fff; border-color:#000;"' : '';
                const subStyle = isBlack ? 'style="color:var(--accent)"' : '';
                const titStyle = isBlack ? 'style="color:var(--accent)"' : '';
                const arrStyle = isBlack ? 'style="color:var(--accent)"' : '';

                return `
                    <a href="mailto:${btn.email}" class="c-btn interactive" ${btnStyle}>
                        <div class="c-txt">
                            <div class="c-sub" ${subStyle}>${btn.subtitle}</div>
                            <div class="c-tit" ${titStyle}>${btn.title}</div>
                        </div>
                        <div class="c-arr" ${arrStyle}>${btn.arrow}</div>
                    </a>
                `;
            }).join('');
        }

        console.log('[ContentLoader] Contact section populated');
    }

    populateFooter() {
        if (!this.data || !this.data.footer) return;

        const footerEl = document.querySelector('.footer');
        if (footerEl) {
            footerEl.textContent = this.data.footer.text;
        }

        console.log('[ContentLoader] Footer populated');
    }

    // Dynamic Logo Based on Visible Section
    initDynamicLogo() {
        if (!this.data || !this.data.header || !this.data.header.logoBySection) {
            console.warn('[ContentLoader] Dynamic logo config not found');
            return;
        }

        const logoEl = document.querySelector('.brand-logo');
        if (!logoEl) {
            console.warn('[ContentLoader] Logo element not found');
            return;
        }

        const sections = document.querySelectorAll('.section');
        if (!sections.length) {
            console.warn('[ContentLoader] No sections found for logo observer');
            return;
        }

        // Force initial logo to sec-0 (HOME)
        const initialLogo = this.data.header.logoBySection['sec-0'];
        if (initialLogo) {
            logoEl.innerHTML = `${initialLogo.text} <span>${initialLogo.emphasizedText}</span>`;
        }

        // Intersection Observer per rilevare la sezione visibile
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5 // La sezione deve essere almeno 50% visibile
        };

        const updateLogo = (sectionId) => {
            const logoConfig = this.data.header.logoBySection[sectionId];
            if (logoConfig && logoEl) {
                // Fade out
                logoEl.style.opacity = '0';

                // Change content after fade out
                setTimeout(() => {
                    logoEl.innerHTML = `${logoConfig.text} <span>${logoConfig.emphasizedText}</span>`;
                    // Fade in
                    logoEl.style.opacity = '1';
                    console.log('[ContentLoader] Logo updated for section:', sectionId);
                }, 300);
            }
        };

        // Delay observer initialization to prevent wrong initial detection
        setTimeout(() => {
            let currentSection = 'sec-0'; // Track current section to avoid unnecessary updates

            const observer = new IntersectionObserver((entries) => {
                // Find the section with highest intersection ratio (most visible)
                let mostVisible = null;
                let maxRatio = 0;

                entries.forEach(entry => {
                    if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
                        maxRatio = entry.intersectionRatio;
                        mostVisible = entry.target.id;
                    }
                });

                if (mostVisible && mostVisible !== currentSection) {
                    currentSection = mostVisible;
                    updateLogo(currentSection);
                }
            }, observerOptions);

            // Osserva tutte le sezioni
            sections.forEach(section => {
                observer.observe(section);
            });

            console.log('[ContentLoader] Observer started after delay');
        }, 2000);

        console.log('[ContentLoader] Dynamic logo initialized');
    }

    fallbackToDefaults() {
        console.warn('[ContentLoader] Using fallback defaults - hardcoded HTML will be displayed');
        // In caso di errore, il contenuto hardcoded HTML rimane visibile
    }

    // Utility: camelCase to kebab-case
    camelToKebab(str) {
        return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
    }
}

// Initialize ContentLoader on DOM ready
// DISABLED: Content is managed directly in HTML, not loaded from JSON
// Uncomment below if you want to use dynamic content loading from content.json
/*
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.contentLoader = new ContentLoader('content.json');
        window.contentLoader.init();
    });
} else {
    window.contentLoader = new ContentLoader('content.json');
    window.contentLoader.init();
}
*/
