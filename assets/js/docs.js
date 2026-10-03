/**
 * MartX Enterprise E-Commerce - Official Documentation Scripts
 * Author: Suman Chandra Dev Sharma (sumondav444@gmail.com)
 * Version: 1.0.0
 * Architecture: Pure Vanilla JS (Zero jQuery Bloat)
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Enforce Crisp Permanent Light Theme (Enterprise Standard)
    document.documentElement.setAttribute('data-bs-theme', 'light');
    try { localStorage.removeItem('martx_doc_theme'); } catch (e) {}

    // 1.1 Auto-Scroll Active Sidebar Menu into View (Keeps Active Chapter Perfectly Centered)
    function scrollActiveNavIntoView() {
        const activeDesktopNav = document.querySelector('.doc-sidebar .sidebar-nav-link.active');
        if (activeDesktopNav) {
            activeDesktopNav.scrollIntoView({ block: 'center', inline: 'nearest', behavior: 'instant' });
        }
    }

    // Run immediately on page load
    scrollActiveNavIntoView();

    // Auto-scroll inside mobile offcanvas navigation drawer when opened
    const sidebarOffcanvas = document.getElementById('sidebarOffcanvas');
    if (sidebarOffcanvas) {
        sidebarOffcanvas.addEventListener('shown.bs.offcanvas', () => {
            const activeMobileNav = sidebarOffcanvas.querySelector('.sidebar-nav-link.active');
            if (activeMobileNav) {
                activeMobileNav.scrollIntoView({ block: 'center', inline: 'nearest', behavior: 'instant' });
            }
        });
    }

    // 1.2 Mobile Offcanvas Fallback & Enhanced Navigation Guarantee (Pure Vanilla JS Fallback)
    const offcanvasToggleBtn = document.querySelector('[data-bs-toggle="offcanvas"][data-bs-target="#sidebarOffcanvas"]');
    if (offcanvasToggleBtn && sidebarOffcanvas) {
        function closeFallbackOffcanvas() {
            sidebarOffcanvas.classList.remove('show');
            setTimeout(() => {
                if (!sidebarOffcanvas.classList.contains('show')) {
                    sidebarOffcanvas.style.visibility = '';
                }
            }, 300);
            const backdrop = document.querySelector('.offcanvas-backdrop');
            if (backdrop) backdrop.remove();
        }

        offcanvasToggleBtn.addEventListener('click', (e) => {
            if (typeof bootstrap === 'undefined' || !bootstrap.Offcanvas) {
                e.preventDefault();
                const isOpen = sidebarOffcanvas.classList.contains('show');
                if (!isOpen) {
                    sidebarOffcanvas.classList.add('show');
                    sidebarOffcanvas.style.visibility = 'visible';
                    let backdrop = document.querySelector('.offcanvas-backdrop');
                    if (!backdrop) {
                        backdrop = document.createElement('div');
                        backdrop.className = 'offcanvas-backdrop fade show';
                        document.body.appendChild(backdrop);
                        backdrop.addEventListener('click', closeFallbackOffcanvas);
                    }
                    const activeMobileNav = sidebarOffcanvas.querySelector('.sidebar-nav-link.active');
                    if (activeMobileNav) {
                        activeMobileNav.scrollIntoView({ block: 'center', inline: 'nearest', behavior: 'instant' });
                    }
                } else {
                    closeFallbackOffcanvas();
                }
            }
        });

        sidebarOffcanvas.querySelectorAll('.btn-close, [data-bs-dismiss="offcanvas"]').forEach(btn => {
            btn.addEventListener('click', () => {
                if (typeof bootstrap === 'undefined' || !bootstrap.Offcanvas) {
                    closeFallbackOffcanvas();
                }
            });
        });
    }

    // 2. Robust One-Click Code Snippet Copying (with file:// fallback)
    function copyToClipboard(text) {
        if (navigator.clipboard && window.isSecureContext) {
            return navigator.clipboard.writeText(text);
        } else {
            return new Promise((resolve, reject) => {
                const textArea = document.createElement("textarea");
                textArea.value = text;
                textArea.style.position = "fixed";
                textArea.style.left = "-999999px";
                textArea.style.top = "-999999px";
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                try {
                    const successful = document.execCommand('copy');
                    document.body.removeChild(textArea);
                    if (successful) resolve();
                    else reject(new Error('execCommand failed'));
                } catch (err) {
                    document.body.removeChild(textArea);
                    reject(err);
                }
            });
        }
    }

    document.querySelectorAll('.doc-btn-copy').forEach(button => {
        button.addEventListener('click', async () => {
            const codeWrapper = button.closest('.doc-code-wrapper');
            if (!codeWrapper) return;
            const codeElement = codeWrapper.querySelector('pre code') || codeWrapper.querySelector('pre');
            if (!codeElement) return;

            const textToCopy = codeElement.innerText;
            try {
                await copyToClipboard(textToCopy);
                const originalText = button.innerHTML;
                button.innerHTML = '<i class="mdi mdi-check"></i> Copied!';
                button.style.borderColor = '#10b981';
                button.style.color = '#10b981';

                setTimeout(() => {
                    button.innerHTML = originalText;
                    button.style.borderColor = '';
                    button.style.color = '';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy text: ', err);
            }
        });
    });

    // 2.1 Generic Click-to-Copy for Credentials & Badges (data-copy-text)
    document.querySelectorAll('[data-copy-text]').forEach(btn => {
        btn.addEventListener('click', async () => {
            const textToCopy = btn.getAttribute('data-copy-text');
            if (!textToCopy) return;

            try {
                await copyToClipboard(textToCopy);
                const originalHtml = btn.innerHTML;
                btn.innerHTML = '<i class="mdi mdi-check text-success"></i> Copied!';
                btn.classList.add('border-success', 'text-success');

                setTimeout(() => {
                    btn.innerHTML = originalHtml;
                    btn.classList.remove('border-success', 'text-success');
                }, 1800);
            } catch (err) {
                console.error('Failed to copy: ', err);
            }
        });
    });

            // =========================================================================
    // 3. UNIVERSAL IN-MEMORY SEARCH ENGINE (ALL 22 CHAPTERS & 200+ SECTIONS)
    // 0ms Zero-Latency, Pure Offline/file:// Compatible, Zero CORS Restrictions
    // =========================================================================
    const CHAPTER_ICONS = {
        1: 'mdi-book-open-page-variant',
        2: 'mdi-server',
        3: 'mdi-rocket-launch',
        4: 'mdi-shield-key',
        5: 'mdi-view-dashboard-outline',
        6: 'mdi-image-multiple',
        7: 'mdi-shape-outline',
        8: 'mdi-package-variant-closed',
        9: 'mdi-cart-outline',
        10: 'mdi-truck-fast-outline',
        11: 'mdi-ticket-percent-outline',
        12: 'mdi-credit-card-outline',
        13: 'mdi-view-dashboard-variant',
        14: 'mdi-menu',
        15: 'mdi-view-carousel-outline',
        16: 'mdi-file-document-outline',
        17: 'mdi-post-outline',
        18: 'mdi-account-star-outline',
        19: 'mdi-account-group',
        20: 'mdi-map-marker-radius-outline',
        21: 'mdi-cog',
        22: 'mdi-clock-fast'
    };

    const DOCS_SEARCH_INDEX = [
    {
        "ch": 1,
        "badge": "Ch 1 • Intro",
        "title": "Chapter 1: Introduction & Capabilities",
        "url": "index.html",
        "type": "Chapter",
        "snippet": "Complete guide and configuration manual for Chapter 1: Introduction & Capabilities.",
        "keywords": "introduction & capabilities chapter 1 overview architecture capabilities 2026 enterprise laravel 12 quickstart roadmap"
    },
    {
        "ch": 1,
        "badge": "Ch 1 • Intro",
        "title": "Chapter 1: Introduction, Overview & Complete Capabilities",
        "url": "index.html#ch1-intro",
        "type": "Section",
        "snippet": "Welcome to the definitive documentation for MartX v1.0.0 — an enterprise-grade, multipurpose Laravel 12 e-commerce platform built for hig...",
        "keywords": "chapter 1: introduction, overview & complete capabilities ch1-intro overview architecture capabilities 2026 enterprise laravel 12 quickstart roadmap chapter introduction overview complete capabilities welcome the definitive documentation for martx v1.0.0 enterprise-grade multipurpose laravel e-commerce platform built for high-volume digital stores multi-niche megashops fashion boutiques and modern brand marketplaces. fast-track roadmap 3-minute quick start guide zero terminal commands required short time deploy martx your live server intuitive steps. coding knowledge command-line experience needed upload extract upload the martx zip"
    },
    {
        "ch": 1,
        "badge": "Ch 1 • Intro",
        "title": "1.1 Welcome & Product Vision",
        "url": "index.html#sec-1-1",
        "type": "Section",
        "snippet": "MartX represents the next evolution of digital commerce software. Engineered with 2026+ web standards, it delivers sub-50ms interaction r...",
        "keywords": "1.1 welcome & product vision sec-1-1 overview architecture capabilities 2026 enterprise laravel 12 quickstart roadmap 1.1 welcome product vision martx represents the next evolution digital commerce software. engineered with 2026 web standards delivers sub-50ms interaction response times predictive storefront journeys rock-solid security architectures and autonomous ai-assisted operations for merchants worldwide."
    },
    {
        "ch": 1,
        "badge": "Ch 1 • Intro",
        "title": "1.2 Author Credentials, Licensing & Support Policy",
        "url": "index.html#sec-1-2",
        "type": "Section",
        "snippet": "MartX is authored, engineered, and maintained by Suman Chandra Dev Sharma. Built for high-volume enterprise digital commerce, the platfor...",
        "keywords": "1.2 author credentials, licensing & support policy sec-1-2 overview architecture capabilities 2026 enterprise laravel 12 quickstart roadmap 1.2 author credentials licensing support policy martx authored engineered and maintained suman chandra dev sharma built for high-volume enterprise digital commerce the platform distributed under commercial marketplace licensing with guaranteed core code purity dedicated bug resolution and professional architectural integrity. lead author architect suman chandra dev sharma direct support email sumondav444 gmail.com official whatsapp support 880 1750-527181 instant chat github"
    },
    {
        "ch": 1,
        "badge": "Ch 1 • Intro",
        "title": "1.3 Core Modern Tech Stack & Architecture Audit",
        "url": "index.html#sec-1-3",
        "type": "Section",
        "snippet": "Built without legacy bloat, MartX combines enterprise-tier backend engineering with high-velocity, lightweight frontend performance:",
        "keywords": "1.3 core modern tech stack & architecture audit sec-1-3 overview architecture capabilities 2026 enterprise laravel 12 quickstart roadmap 1.3 core modern tech stack architecture audit built without legacy bloat martx combines enterprise-tier backend engineering with high-velocity lightweight frontend performance laravel 12.46.x php 8.2 core dedicated business services 77-permission granular staff access control and high-speed optimized route performance. bootstrap 5.3 purple mobile-first responsive storefront purple admin cockpit color skins font presets and dark light modes. high-velocity stack zero heavy"
    },
    {
        "ch": 1,
        "badge": "Ch 1 • Intro",
        "title": "1.4 Cloud Security & Zero-Configuration License Shield",
        "url": "index.html#sec-1-4",
        "type": "Section",
        "snippet": "MartX eliminates complex configuration hurdles. Your installation requires zero licensing API keys or external server setup. The platform...",
        "keywords": "1.4 cloud security & zero-configuration license shield sec-1-4 overview architecture capabilities 2026 enterprise laravel 12 quickstart roadmap 1.4 cloud security zero-configuration license shield martx eliminates complex configuration hurdles. your installation requires zero licensing api keys external server setup. the platform operates with automated cloud-based security verification instant domain binding and 14-day offline fail-safe checkout protection ensuring your store never drops customer order."
    },
    {
        "ch": 1,
        "badge": "Ch 1 • Intro",
        "title": "1.5 5-Step Web Installation Wizard (4-Marketplace Selector)",
        "url": "index.html#sec-1-5",
        "type": "Section",
        "snippet": "Deploy in under 3 minutes via a guided web wizard. Step 3 features 4 Marketplace Selector Cards (CodeCanyon, Codester, TemplateMonster, D...",
        "keywords": "1.5 5-step web installation wizard (4-marketplace selector) sec-1-5 overview architecture capabilities 2026 enterprise laravel 12 quickstart roadmap 1.5 5-step web installation wizard 4-marketplace selector deploy under minutes via guided web wizard. step features marketplace selector cards codecanyon codester templatemonster direct with dynamic input switching and automated one-click database setup with demo catalog data."
    },
    {
        "ch": 1,
        "badge": "Ch 1 • Intro",
        "title": "1.6 In-Dashboard License Management Suite",
        "url": "index.html#sec-1-6",
        "type": "Section",
        "snippet": "Manage your active license, view verification status, or seamlessly transfer domains directly from the Administrative Dashboard. If migra...",
        "keywords": "1.6 in-dashboard license management suite sec-1-6 overview architecture capabilities 2026 enterprise laravel 12 quickstart roadmap 1.6 in-dashboard license management suite manage your active license view verification status seamlessly transfer domains directly from the administrative dashboard. migrating between domains activating post-setup intuitive modal allows instant 1-click binding without reinstalling. for the complete walkthrough explore chapter license activation hub"
    },
    {
        "ch": 1,
        "badge": "Ch 1 • Intro",
        "title": "1.7 Multi-Layered Anti-Hacking & Code Purity Shield",
        "url": "index.html#sec-1-7",
        "type": "Section",
        "snippet": "Enterprise-grade defense against database injection attacks, malicious script execution, unauthorized fake requests, and military-grade e...",
        "keywords": "1.7 multi-layered anti-hacking & code purity shield sec-1-7 overview architecture capabilities 2026 enterprise laravel 12 quickstart roadmap 1.7 multi-layered anti-hacking code purity shield enterprise-grade defense against database injection attacks malicious script execution unauthorized fake requests and military-grade encrypted password hashing for maximum buyer and administrative account security."
    },
    {
        "ch": 1,
        "badge": "Ch 1 • Intro",
        "title": "1.8 Login Rate Limiting & Brute-Force Lockout Policy",
        "url": "index.html#sec-1-8",
        "type": "Section",
        "snippet": "Defends against bot password guessing. After 5 failed attempts within 60 seconds, the IP address and target account are subjected to an a...",
        "keywords": "1.8 login rate limiting & brute-force lockout policy sec-1-8 overview architecture capabilities 2026 enterprise laravel 12 quickstart roadmap 1.8 login rate limiting brute-force lockout policy defends against bot password guessing. after failed attempts within seconds the address and target account are subjected automated 30-minute penalty lockout"
    },
    {
        "ch": 1,
        "badge": "Ch 1 • Intro",
        "title": "1.9 Anti-Tampering Server-Side Price Calculation",
        "url": "index.html#sec-1-9",
        "type": "Section",
        "snippet": "Any attempt by dishonest buyers to manipulate product prices in their browser (such as attempting to change \\$100 to \\$1 via inspect tool...",
        "keywords": "1.9 anti-tampering server-side price calculation sec-1-9 overview architecture capabilities 2026 enterprise laravel 12 quickstart roadmap 1.9 anti-tampering server-side price calculation any attempt dishonest buyers manipulate product prices their browser such attempting change 100 via inspect tools strictly blocked. all product prices variant surcharges coupon discounts shipping rates and taxes are strictly verified and recalculated automatically automated secure server-side pricing engine."
    },
    {
        "ch": 1,
        "badge": "Ch 1 • Intro",
        "title": "1.10 Super Admin Security & Admin URL Obfuscation",
        "url": "index.html#sec-1-10",
        "type": "Section",
        "snippet": "Protect your store against automated bot sweeps and brute-force password guessing by relocating the default admin login path to your own ...",
        "keywords": "1.10 super admin security & admin url obfuscation sec-1-10 overview architecture capabilities 2026 enterprise laravel 12 quickstart roadmap 1.10 super admin security admin url obfuscation admin navigation admin sidebar rarr administration settings rarr system settings rarr security 2fa tab protect your store against automated bot sweeps and brute-force password guessing relocating the default admin login path your own custom secret url e.g. secret-portal control-hub directly from the security settings tab. automated team sync email dispatch changing your administrative"
    },
    {
        "ch": 1,
        "badge": "Ch 1 • Intro",
        "title": "1.11 Two-Factor Authentication (2FA) & 5 Emergency Recovery Codes",
        "url": "index.html#sec-1-11",
        "type": "Section",
        "snippet": "MartX delivers enterprise-grade multi-factor security for administrator accounts, pairing real-time email verification with cryptographic...",
        "keywords": "1.11 two-factor authentication (2fa) & 5 emergency recovery codes sec-1-11 overview architecture capabilities 2026 enterprise laravel 12 quickstart roadmap 1.11 two-factor authentication 2fa emergency recovery codes martx delivers enterprise-grade multi-factor security for administrator accounts pairing real-time email verification with cryptographically secure emergency bypass mechanisms 6-digit email otp challenge when 2fa activated every administrative sign-in requires dynamic 6-digit one-time verification code dispatched directly your authorized administrator email address with automated security expiry timer. mandatory smtp handshake prevent accidental administrator lockout"
    },
    {
        "ch": 1,
        "badge": "Ch 1 • Intro",
        "title": "1.12 Dynamic Header Layouts (3 Styles) & Sticky Mobile Navigation",
        "url": "index.html#sec-1-12",
        "type": "Section",
        "snippet": "MartX provides 3 distinct Header Styles switchable in 1 click from the Theme Layouts Hub.Admin Navigation: Admin Sidebar &rarr; Website &...",
        "keywords": "1.12 dynamic header layouts (3 styles) & sticky mobile navigation sec-1-12 overview architecture capabilities 2026 enterprise laravel 12 quickstart roadmap 1.12 dynamic header layouts styles sticky mobile navigation martx provides distinct header styles switchable click from the theme layouts hub. admin navigation admin sidebar rarr website cms rarr theme layouts rarr header layout tab header style mdash classic e-commerce comprehensive classic full view images header_1.png header style screenshot header style classic e-commerce comprehensive top announcement ticker support hotline email multi-currency"
    },
    {
        "ch": 1,
        "badge": "Ch 1 • Intro",
        "title": "1.13 Multi-Level Category Mega Menu (2 Mega Menu Layouts)",
        "url": "index.html#sec-1-13",
        "type": "Section",
        "snippet": "Choose between 2 interactive Mega Menu Layouts designed for high-density catalog navigation.Admin Navigation: Admin Sidebar &rarr; Websit...",
        "keywords": "1.13 multi-level category mega menu (2 mega menu layouts) sec-1-13 overview architecture capabilities 2026 enterprise laravel 12 quickstart roadmap 1.13 multi-level category mega menu mega menu layouts choose between interactive mega menu layouts designed for high-density catalog navigation. admin navigation admin sidebar rarr website cms rarr theme layouts rarr mega menu tab images mega_menu_1.png mega menu layout screenshot mega menu layout multi-column grid with promo banner multi-column category dropdown with real-time hover-switching subcategory panels category icons hot new badges"
    },
    {
        "ch": 1,
        "badge": "Ch 1 • Intro",
        "title": "1.14 Home Page Layouts (2 Layouts) & Dynamic Section Builder",
        "url": "index.html#sec-1-14",
        "type": "Section",
        "snippet": "MartX includes 2 pre-designed Home Page Layouts packed with conversion-boosting dynamic sections.Admin Navigation: Admin Sidebar &rarr; W...",
        "keywords": "1.14 home page layouts (2 layouts) & dynamic section builder sec-1-14 overview architecture capabilities 2026 enterprise laravel 12 quickstart roadmap 1.14 home page layouts layouts dynamic section builder martx includes pre-designed home page layouts packed with conversion-boosting dynamic sections. admin navigation admin sidebar rarr website cms rarr theme layouts rarr home layout tab images home_1.png home layout screenshot home layout hero slider full dynamic marketplace full-width interactive hero banner slider with call-to-action buttons 4-column store trust badges circular category carousel"
    },
    {
        "ch": 1,
        "badge": "Ch 1 • Intro",
        "title": "1.15 High-Converting Product Card Engine (6 Distinct Architectural Styles)",
        "url": "index.html#sec-1-15",
        "type": "Section",
        "snippet": "MartX offers 6 dedicated Product Card Styles switchable store-wide from the Theme Layouts Hub. Each image below demonstrates both interac...",
        "keywords": "1.15 high-converting product card engine (6 distinct architectural styles) sec-1-15 overview architecture capabilities 2026 enterprise laravel 12 quickstart roadmap 1.15 high-converting product card engine distinct architectural styles martx offers dedicated product card styles switchable store-wide from the theme layouts hub. each image below demonstrates both interactive states side-by-side mdash left hover state and right default state admin navigation admin sidebar rarr website cms rarr theme layouts rarr product card tab images product_card_1.png product card style screenshot product card style"
    },
    {
        "ch": 1,
        "badge": "Ch 1 • Intro",
        "title": "1.16 3 Shop Page Layouts & Faceted AJAX Live Filters",
        "url": "index.html#sec-1-16",
        "type": "Section",
        "snippet": "MartX includes exactly 3 Shop Page Layouts plus an interactive Grid / List View Switcher.Admin Navigation: Admin Sidebar &rarr; Website &...",
        "keywords": "1.16 3 shop page layouts & faceted ajax live filters sec-1-16 overview architecture capabilities 2026 enterprise laravel 12 quickstart roadmap 1.16 shop page layouts faceted ajax live filters martx includes exactly shop page layouts plus interactive grid list view switcher admin navigation admin sidebar rarr website cms rarr theme layouts rarr shop layout tab images shop_left_sidebar.png shop left sidebar screenshot shop left sidebar sticky vertical filter sidebar the left price range slider brand checkboxes with counts color swatches size buttons"
    },
    {
        "ch": 1,
        "badge": "Ch 1 • Intro",
        "title": "1.17 WordPress-Style Reusable Central Media Library",
        "url": "index.html#sec-1-17",
        "type": "Section",
        "snippet": "MartX features a centralized, WordPress-inspired media management suite that completely eliminates duplicate image uploads and server sto...",
        "keywords": "1.17 wordpress-style reusable central media library sec-1-17 overview architecture capabilities 2026 enterprise laravel 12 quickstart roadmap 1.17 wordpress-style reusable central media library martx features centralized wordpress-inspired media management suite that completely eliminates duplicate image uploads and server storage bloat. admin navigation admin sidebar rarr main rarr media library single upload universal reuse central media hub upload your high-res banners brand logos product photos and category icons into unified library. instant modal media picker select assets directly"
    },
    {
        "ch": 1,
        "badge": "Ch 1 • Intro",
        "title": "1.18 Contact Inbox & AI-Powered 1-Click Direct SMTP Email Reply Suite",
        "url": "index.html#sec-1-18",
        "type": "Section",
        "snippet": "Customer inquiries submitted through the frontend Contact page automatically sync to the Admin Contact Message Inbox with integrated Goog...",
        "keywords": "1.18 contact inbox & ai-powered 1-click direct smtp email reply suite sec-1-18 overview architecture capabilities 2026 enterprise laravel 12 quickstart roadmap 1.18 contact inbox ai-powered 1-click direct smtp email reply suite customer inquiries submitted through the frontend contact page automatically sync the admin contact message inbox with integrated google gemini assistance. admin navigation admin sidebar rarr customer community rarr contact messages auto inbox sync inquiries name email phone subject message are immediately captured with date time stamps. gemini reply drafter 1-click"
    },
    {
        "ch": 1,
        "badge": "Ch 1 • Intro",
        "title": "1.19 360° Executive Admin Dashboard & Real-Time Analytics",
        "url": "index.html#sec-1-19",
        "type": "Section",
        "snippet": "Upon logging into the MartX administrative portal (Admin Sidebar &rarr; Main &rarr; Dashboard), store managers are greeted with an execut...",
        "keywords": "1.19 360° executive admin dashboard & real-time analytics sec-1-19 overview architecture capabilities 2026 enterprise laravel 12 quickstart roadmap 1.19 360 executive admin dashboard real-time analytics upon logging into the martx administrative portal admin sidebar rarr main rarr dashboard store managers are greeted with executive 6-tier business intelligence cockpit https demo.martx.com admin dashboard purple pro cockpit this week sales 450.00 14.2 last week this week orders 324 orders 8.5 growth active catalog 250 products stock healthy customer base 890"
    },
    {
        "ch": 1,
        "badge": "Ch 1 • Intro",
        "title": "1.20 Master Settings Hub Reference (6 Core Tabs)",
        "url": "index.html#sec-1-20",
        "type": "Section",
        "snippet": "Centralizing store configuration with automatic tab memory, store managers can configure all vital store parameters from a unified interf...",
        "keywords": "1.20 master settings hub reference (6 core tabs) sec-1-20 overview architecture capabilities 2026 enterprise laravel 12 quickstart roadmap 1.20 master settings hub reference core tabs centralizing store configuration with automatic tab memory store managers can configure all vital store parameters from unified interface. admin navigation admin sidebar rarr administration settings rarr system settings general settings basic information site title seo keywords meta description 3-row textarea store country selector and store timezone selector. centralized media logos light logo contain"
    },
    {
        "ch": 1,
        "badge": "Ch 1 • Intro",
        "title": "1.21 Payment Gateways, Unlimited Custom Roles & Codebase Architecture",
        "url": "index.html#sec-1-21",
        "type": "Section",
        "snippet": "Pre-integrated with 11 Payment Methods, an enterprise Unlimited Custom Staff RBAC Engine, and a clean, layered Laravel 12 architecture:",
        "keywords": "1.21 payment gateways, unlimited custom roles & codebase architecture sec-1-21 overview architecture capabilities 2026 enterprise laravel 12 quickstart roadmap 1.21 payment gateways unlimited custom roles codebase architecture pre-integrated with payment methods enterprise unlimited custom staff rbac engine and clean layered laravel architecture stripe global credit debit sslcommerz bangladesh paypal express checkout razorpay india upi cards wayforpay eastern europe paystack africa market coingate crypto coins binance pay crypto fee cash delivery zero risk hybrid bank transfer offline bacs manual custom"
    },
    {
        "ch": 1,
        "badge": "Ch 1 • Intro",
        "title": "1.22 Complete Enterprise Commerce Engine & Capabilities Suite",
        "url": "index.html#sec-1-22",
        "type": "Section",
        "snippet": "Beyond themes and administrative security, MartX packages 14 turnkey enterprise commerce engines designed for merchants to operate smooth...",
        "keywords": "1.22 complete enterprise commerce engine & capabilities suite sec-1-22 overview architecture capabilities 2026 enterprise laravel 12 quickstart roadmap 1.22 complete enterprise commerce engine capabilities suite beyond themes and administrative security martx packages turnkey enterprise commerce engines designed for merchants operate smoothly with zero coding flash sale timed countdown engine drive urgent buyer conversions with automated flash sale campaigns. features live ticking countdown clocks special discount badges and automated start end schedule activation. admin navigation admin sidebar rarr website"
    },
    {
        "ch": 2,
        "badge": "Ch 2 • Server",
        "title": "Chapter 2: Server Requirements",
        "url": "server-requirements.html",
        "type": "Chapter",
        "snippet": "Complete guide and configuration manual for Chapter 2: Server Requirements.",
        "keywords": "server requirements chapter 2 php 8.2 extensions pdo gd curl intl memory limit upload size mod_rewrite nginx apache symlink"
    },
    {
        "ch": 2,
        "badge": "Ch 2 • Server",
        "title": "Chapter 2: Server Requirements & Prerequisites",
        "url": "server-requirements.html#ch2-requirements",
        "type": "Section",
        "snippet": "Before initiating the installation of MartX Enterprise Platform, ensure your hosting server or local development environment satisfies th...",
        "keywords": "chapter 2: server requirements & prerequisites ch2-requirements php 8.2 extensions pdo gd curl intl memory limit upload size mod_rewrite nginx apache symlink chapter server requirements prerequisites before initiating the installation martx enterprise platform ensure your hosting server local development environment satisfies the required runtime specifications php extensions and file system permissions."
    },
    {
        "ch": 2,
        "badge": "Ch 2 • Server",
        "title": "2.1 Core Runtime & Environment Architecture",
        "url": "server-requirements.html#sec-2-1",
        "type": "Section",
        "snippet": "MartX is engineered on Laravel 12.46.x and is optimized for ultra-high throughput on modern 64-bit multi-core server environments. Below ...",
        "keywords": "2.1 core runtime & environment architecture sec-2-1 php 8.2 extensions pdo gd curl intl memory limit upload size mod_rewrite nginx apache symlink 2.1 core runtime environment architecture martx engineered laravel 12.46.x and optimized for ultra-high throughput modern 64-bit multi-core server environments. below are the base hardware and software specifications component minimum requirement recommended enterprise spec status php version php 8.2.0 php 8.2.31 php 8.3.x php 8.4 ready mandatory database engine mysql 8.0.x mariadb 10.4.x mysql 8.0.36 mariadb 10.11 lts mandatory web server"
    },
    {
        "ch": 2,
        "badge": "Ch 2 • Server",
        "title": "2.2 The 13 Mandatory PHP Extensions Audit",
        "url": "server-requirements.html#sec-2-2",
        "type": "Section",
        "snippet": "The MartX Web Installer automatically tests each of the following 13 PHP extensions on Step 1. All 13 extensions must be enabled in your ...",
        "keywords": "2.2 the 13 mandatory php extensions audit sec-2-2 php 8.2 extensions pdo gd curl intl memory limit upload size mod_rewrite nginx apache symlink 2.2 the mandatory php extensions audit the martx web installer automatically tests each the following php extensions step all extensions must enabled your server php.ini configuration extension installer check identifier core architectural purpose martx bcmath bcmath high-precision arbitrary accuracy floating-point arithmetic for price calculator service taxes coupon percentage deductions and multi-currency exchange rates. ctype ctype character type validation checks for"
    },
    {
        "ch": 2,
        "badge": "Ch 2 • Server",
        "title": "2.3 Recommended php.ini Resource Allocation & Directives",
        "url": "server-requirements.html#sec-2-3",
        "type": "Section",
        "snippet": "To ensure uninterrupted processing of high-resolution product photography, large CSV import/export catalogs, and background synchronizati...",
        "keywords": "2.3 recommended php.ini resource allocation & directives sec-2-3 php 8.2 extensions pdo gd curl intl memory limit upload size mod_rewrite nginx apache symlink 2.3 recommended php.ini resource allocation directives ensure uninterrupted processing high-resolution product photography large csv import export catalogs and background synchronization configure the following directives your php.ini directive minimum value recommended enterprise value rationale critical impact memory_limit 256m 512m prevents out-of-memory fatal crashes during bulk webp image conversions large pdf invoice generation and database export tasks. upload_max_filesize 32m 64m 128m allows"
    },
    {
        "ch": 2,
        "badge": "Ch 2 • Server",
        "title": "2.4 Directory & Storage File System Permissions",
        "url": "server-requirements.html#sec-2-4",
        "type": "Section",
        "snippet": "For the Web Installer to write the database credentials to .env, store uploaded media assets, and compile Blade cache files, the web serv...",
        "keywords": "2.4 directory & storage file system permissions sec-2-4 php 8.2 extensions pdo gd curl intl memory limit upload size mod_rewrite nginx apache symlink 2.4 directory storage file system permissions for the web installer write the database credentials .env store uploaded media assets and compile blade cache files the web server user e.g. www-data nginx your cpanel user must possess write permissions the following folders target directory file required permission purpose description storage app 0775 0755 private application storage customer invoices and temporary export"
    },
    {
        "ch": 2,
        "badge": "Ch 2 • Server",
        "title": "2.5 Production Web Server Configuration (Nginx & Apache)",
        "url": "server-requirements.html#sec-2-5",
        "type": "Section",
        "snippet": "MartX requires the web server's DocumentRoot to point directly to the public/ subfolder. Pointing the web root to the main root folder wi...",
        "keywords": "2.5 production web server configuration (nginx & apache) sec-2-5 php 8.2 extensions pdo gd curl intl memory limit upload size mod_rewrite nginx apache symlink 2.5 production web server configuration nginx apache martx requires the web server documentroot point directly the public subfolder. pointing the web root the main root folder will cause 404 errors and expose sensitive internal configuration files. nginx recommended apache 2.4 virtualhost etc nginx sites-available martx.conf copy server listen listen server_name yourstore.com www.yourstore.com root var www html martx public add_header x-frame-options"
    },
    {
        "ch": 2,
        "badge": "Ch 2 • Server",
        "title": "2.6 Database Standards & Configuration (MySQL 8.0+ / MariaDB 10.4+)",
        "url": "server-requirements.html#sec-2-6",
        "type": "Section",
        "snippet": "MartX requires a clean MySQL 8.0+ or MariaDB 10.4+ database with UTF-8 Full Multilingual (utf8mb4) encoding to support international char...",
        "keywords": "2.6 database standards & configuration (mysql 8.0+ / mariadb 10.4+) sec-2-6 php 8.2 extensions pdo gd curl intl memory limit upload size mod_rewrite nginx apache symlink 2.6 database standards configuration mysql 8.0 mariadb 10.4 martx requires clean mysql 8.0 mariadb 10.4 database with utf-8 full multilingual utf8mb4 encoding support international character sets customer emojis product reviews and multilingual search terms database attribute recommended value technical advantage character set utf8mb4 stores 4-byte unicode characters including non-latin alphabets and emojis collation utf8mb4_unicode_ci utf8mb4_0900_ai_ci provides accurate case-insensitive language-aware sorting"
    },
    {
        "ch": 2,
        "badge": "Ch 2 • Server",
        "title": "2.7 Hosting Environment Compatibility Matrix",
        "url": "server-requirements.html#sec-2-7",
        "type": "Section",
        "snippet": "MartX has been tested and verified across a wide range of cloud providers, managed hosts, and local developer environments:",
        "keywords": "2.7 hosting environment compatibility matrix sec-2-7 php 8.2 extensions pdo gd curl intl memory limit upload size mod_rewrite nginx apache symlink 2.7 hosting environment compatibility matrix martx has been tested and verified across wide range cloud providers managed hosts and local developer environments hosting platform compatibility installation instructions notes cpanel directadmin plesk shared reseller 100 fully compatible select php 8.2 via cpanel rarr multiphp manager select php version point the primary domain subdomain documentroot public_html public public_html martx public vps cloud"
    },
    {
        "ch": 3,
        "badge": "Ch 3 • Setup",
        "title": "Chapter 3: Installation Guide",
        "url": "installation.html",
        "type": "Chapter",
        "snippet": "Complete guide and configuration manual for Chapter 3: Installation Guide.",
        "keywords": "installation guide chapter 3 cpanel wizard deployment web installer step 1 step 2 step 3 step 4 step 5 database import mysql .env file permissions"
    },
    {
        "ch": 3,
        "badge": "Ch 3 • Setup",
        "title": "Chapter 3: Installation & Deployment Guide",
        "url": "installation.html#ch3-installation",
        "type": "Section",
        "snippet": "Deploying MartX Enterprise Platform is effortless. Built with an intuitive WordPress-style 5-Step Web Installation Wizard, merchants and ...",
        "keywords": "chapter 3: installation & deployment guide ch3-installation cpanel wizard deployment web installer step 1 step 2 step 3 step 4 step 5 database import mysql .env file permissions chapter installation deployment guide deploying martx enterprise platform effortless. built with intuitive wordpress-style 5-step web installation wizard merchants and agencies can launch production-ready store within minutes without touching command-line scripts."
    },
    {
        "ch": 3,
        "badge": "Ch 3 • Setup",
        "title": "3.1 Deployment Pathways & Pre-Installation Checklist",
        "url": "installation.html#sec-3-1",
        "type": "Section",
        "snippet": "Choose the deployment pathway that best matches your hosting infrastructure:",
        "keywords": "3.1 deployment pathways & pre-installation checklist sec-3-1 cpanel wizard deployment web installer step 1 step 2 step 3 step 4 step 5 database import mysql .env file permissions 3.1 deployment pathways pre-installation checklist choose the deployment pathway that best matches your hosting infrastructure deployment method target infrastructure skill level setup time recommended for cpanel quick deploy cpanel directadmin plesk standard mins shared hosting users using file manager and mysql wizard. 5-step web wizard cpanel shared vps localhost no-code beginner mins all store owners designers and standard marketplace buyers."
    },
    {
        "ch": 3,
        "badge": "Ch 3 • Setup",
        "title": "3.2 cPanel & Shared Hosting 5-Minute Quick Setup",
        "url": "installation.html#sec-3-2",
        "type": "Section",
        "snippet": "Before launching the browser installer, upload the application files and configure your MySQL database in cPanel:",
        "keywords": "3.2 cpanel & shared hosting 5-minute quick setup sec-3-2 cpanel wizard deployment web installer step 1 step 2 step 3 step 4 step 5 database import mysql .env file permissions 3.2 cpanel shared hosting 5-minute quick setup before launching the browser installer upload the application files and configure your mysql database cpanel step upload and extract zip archive open cpanel rarr file manager navigate your desired directory e.g. public_html for primary domain subfolder like public_html your-subfolder upload the official martx-v1.0.0.zip file right-click and choose extract step configure documentroot point public"
    },
    {
        "ch": 3,
        "badge": "Ch 3 • Setup",
        "title": "3.3 The 5-Step Visual Web Installation Wizard Walkthrough",
        "url": "installation.html#sec-3-3",
        "type": "Section",
        "snippet": "When you open https://yourdomain.com/install, the automated wizard will guide you through 5 progressive screens:",
        "keywords": "3.3 the 5-step visual web installation wizard walkthrough sec-3-3 cpanel wizard deployment web installer step 1 step 2 step 3 step 4 step 5 database import mysql .env file permissions 3.3 the 5-step visual web installation wizard walkthrough when you open https yourdomain.com install the automated wizard will guide you through progressive screens step system requirements step requirements permissions license database admin step welcome server requirements audit martx automatically checks your active php version and confirms that all required extensions bcmath curl dom fileinfo json mbstring openssl pdo tokenizer etc."
    },
    {
        "ch": 3,
        "badge": "Ch 3 • Setup",
        "title": "3.4 Ubuntu VPS & Developer CLI Installation",
        "url": "installation.html#sec-3-4",
        "type": "Section",
        "snippet": "For agencies, DevOps engineers, and cloud administrators deploying via SSH terminal, MartX provides a dedicated interactive CLI installat...",
        "keywords": "3.4 ubuntu vps & developer cli installation sec-3-4 cpanel wizard deployment web installer step 1 step 2 step 3 step 4 step 5 database import mysql .env file permissions 3.4 ubuntu vps developer cli installation optional bull for devops amp cloud engineers merchant note you are using cpanel shared hosting you not need terminal commands simply use the 3-minute visual web installer https yourdomain.com install detailed sections 3.2 amp 3.3 for agencies devops engineers and cloud administrators deploying via ssh terminal martx provides dedicated interactive cli installation command allowing"
    },
    {
        "ch": 3,
        "badge": "Ch 3 • Setup",
        "title": "3.5 Storage Symlink (storage:link) 3-Tier Multi-Layer Architecture",
        "url": "installation.html#sec-3-5",
        "type": "Section",
        "snippet": "Product photography, banner slides, and customer invoices are securely stored in storage/app/public/. To make them visible to web visitor...",
        "keywords": "3.5 storage symlink (storage:link) 3-tier multi-layer architecture sec-3-5 cpanel wizard deployment web installer step 1 step 2 step 3 step 4 step 5 database import mysql .env file permissions 3.5 storage symlink storage link 3-tier multi-layer architecture product photography banner slides and customer invoices are securely stored storage app public make them visible web visitors symbolic link must exist between public storage and storage app public martx provides comprehensive 3-tier fail-safe solution tier 100 automatic install built-in wordpress-style automation. the web installer step and cli command martx install silently"
    },
    {
        "ch": 3,
        "badge": "Ch 3 • Setup",
        "title": "3.6 Subdomain, SSL (HTTPS) & APP_URL Configuration Standards",
        "url": "installation.html#sec-3-6",
        "type": "Section",
        "snippet": "To prevent Mixed Content warnings and CSRF security token mismatches, ensure your environment URL strictly matches your live domain proto...",
        "keywords": "3.6 subdomain, ssl (https) & app_url configuration standards sec-3-6 cpanel wizard deployment web installer step 1 step 2 step 3 step 4 step 5 database import mysql .env file permissions 3.6 subdomain ssl https app_url configuration standards prevent mixed content warnings and csrf security token mismatches ensure your environment url strictly matches your live domain protocol deployment type recommended pattern target app_url .env primary root domain https yourstore.com app_url https yourstore.com dedicated subdomain recommended https shop.yourdomain.com app_url https shop.yourdomain.com local development http martx.test http localhost 8000 app_url http martx.test"
    },
    {
        "ch": 3,
        "badge": "Ch 3 • Setup",
        "title": "3.7 Post-Installation Security Hardening & Lock Verification",
        "url": "installation.html#sec-3-7",
        "type": "Section",
        "snippet": "Once the 5-step installer wizard completes, the system executes an automated security lockdown to safeguard your store:",
        "keywords": "3.7 post-installation security hardening & lock verification sec-3-7 cpanel wizard deployment web installer step 1 step 2 step 3 step 4 step 5 database import mysql .env file permissions 3.7 post-installation security hardening lock verification once the 5-step installer wizard completes the system executes automated security lockdown safeguard your store automatic installer lockdown engine the installer writes the file storage installed and establishes secure verification tokens. subsequent requests install are permanently blocked and redirected the home storefront prevent unauthorized database resets. production 1-click optimization command for blazing-fast performance and"
    },
    {
        "ch": 4,
        "badge": "Ch 4 • License",
        "title": "Chapter 4: License Activation",
        "url": "license-activation.html",
        "type": "Chapter",
        "snippet": "Complete guide and configuration manual for Chapter 4: License Activation.",
        "keywords": "license activation chapter 4 envato codecanyon codester templatemonster direct purchase code buyer key verification domain transfer grace period"
    },
    {
        "ch": 4,
        "badge": "Ch 4 • License",
        "title": "Chapter 4: License Activation, Grace Period & Domain Migration",
        "url": "license-activation.html#ch4-licensing",
        "type": "Section",
        "snippet": "Welcome to the official MartX License Activation & Verification Hub. Designed to deliver a smooth, frictionless merchant experience, Mart...",
        "keywords": "chapter 4: license activation, grace period & domain migration ch4-licensing envato codecanyon codester templatemonster direct purchase code buyer key verification domain transfer grace period chapter license activation grace period domain migration welcome the official martx license activation verification hub designed deliver smooth frictionless merchant experience martx provides automated cloud verification initial 7-day live trial window free local development testing and instant 1-click license key re-binding workflow when migrating new domain."
    },
    {
        "ch": 4,
        "badge": "Ch 4 • License",
        "title": "4.1 In-Dashboard License Activation Suite",
        "url": "license-activation.html#sec-4-1",
        "type": "Section",
        "snippet": "If you verified your purchase code during Step 3 of the 5-Step Web Installer, your store is already fully activated and ready for business!",
        "keywords": "4.1 in-dashboard license activation suite sec-4-1 envato codecanyon codester templatemonster direct purchase code buyer key verification domain transfer grace period 4.1 in-dashboard license activation suite you verified your purchase code during step the 5-step web installer your store already fully activated and ready for business however you installed the platform and skipped license verification during initial setup unactivated license notification banner will appear across the top your administrative dashboard live production domain view unactivated store activate your martx license days"
    },
    {
        "ch": 4,
        "badge": "Ch 4 • License",
        "title": "4.2 Multi-Marketplace Verification Guide",
        "url": "license-activation.html#sec-4-2",
        "type": "Section",
        "snippet": "MartX provides native support across all major script marketplaces. Select the marketplace card where you acquired your license:",
        "keywords": "4.2 multi-marketplace verification guide sec-4-2 envato codecanyon codester templatemonster direct purchase code buyer key verification domain transfer grace period 4.2 multi-marketplace verification guide martx provides native support across all major script marketplaces. select the marketplace card where you acquired your license marketplace channel key identifier where find your key codecanyon envato envato purchase code uuid format log codecanyon.net downloads rarr locate martx rarr click download rarr select license certificate purchase code pdf text your 36-character purchase code located inside"
    },
    {
        "ch": 4,
        "badge": "Ch 4 • License",
        "title": "4.3 7-Day Live Domain Installation Trial Window (Grace Period)",
        "url": "license-activation.html#sec-4-3",
        "type": "Section",
        "snippet": "We understand that merchants and agencies often need time to connect their payment gateways, upload catalog items, and verify storefront ...",
        "keywords": "4.3 7-day live domain installation trial window (grace period) sec-4-3 envato codecanyon codester templatemonster direct purchase code buyer key verification domain transfer grace period 4.3 7-day live domain installation trial window grace period understand that merchants and agencies often need time connect their payment gateways upload catalog items and verify storefront operations live production domain before permanently binding their license key. how the 7-day window works for buyers instant unrestricted access from the moment you first install martx any live domain e.g. yourdomain.com you"
    },
    {
        "ch": 4,
        "badge": "Ch 4 • License",
        "title": "4.4 Admin Panel Lockdown Screen & How to Unlock",
        "url": "license-activation.html#sec-4-4",
        "type": "Section",
        "snippet": "If the initial 7-day live trial window elapses without entering a valid purchase code, your Administrative Panel safely enters the Licens...",
        "keywords": "4.4 admin panel lockdown screen & how to unlock sec-4-4 envato codecanyon codester templatemonster direct purchase code buyer key verification domain transfer grace period 4.4 admin panel lockdown screen how unlock the initial 7-day live trial window elapses without entering valid purchase code your administrative panel safely enters the license verification lockdown screen lockdown mode standard admin routes are paused until the license activated. rest assured your customer storefront and catalog remain safe administrative access locked trial window expired your 7-day live domain trial"
    },
    {
        "ch": 4,
        "badge": "Ch 4 • License",
        "title": "4.5 Unrestricted Localhost & Developer Testing (100% Free)",
        "url": "license-activation.html#sec-4-5",
        "type": "Section",
        "snippet": "You never have to waste your live domain activation quota when building, styling, or testing your store on local computers or staging san...",
        "keywords": "4.5 unrestricted localhost & developer testing (100% free) sec-4-5 envato codecanyon codester templatemonster direct purchase code buyer key verification domain transfer grace period 4.5 unrestricted localhost developer testing 100 free you never have waste your live domain activation quota when building styling testing your store local computers staging sandboxes local environment pattern recognized domains developer mode policy standard localhost localhost 127.0.0.1 localhost 8000 free amp unlimited expiration local development tlds .test laragon valet .local .localhost free amp unlimited expiration local lan addresses 192.168."
    },
    {
        "ch": 4,
        "badge": "Ch 4 • License",
        "title": "4.6 License Key Re-binding & Migration to a New Domain",
        "url": "license-activation.html#sec-4-6",
        "type": "Section",
        "snippet": "Under official commercial licensing, a single MartX purchase code can be actively bound to one live production domain at a time. However,...",
        "keywords": "4.6 license key re-binding & migration to a new domain sec-4-6 envato codecanyon codester templatemonster direct purchase code buyer key verification domain transfer grace period 4.6 license key re-binding migration new domain under official commercial licensing single martx purchase code can actively bound one live production domain time however you are migrating from development staging subdomain your primary domain e.g. from staging.mystore.com mystore.com rebranding your business under new domain name you not need purchase new license key. martx includes automated 1-click license relocation amp re-binding"
    },
    {
        "ch": 4,
        "badge": "Ch 4 • License",
        "title": "4.7 14-Day Offline Fail-Safe Checkout Protection",
        "url": "license-activation.html#sec-4-7",
        "type": "Section",
        "snippet": "Store owners never have to worry about downtime caused by external internet fluctuations or cloud server maintenance.",
        "keywords": "4.7 14-day offline fail-safe checkout protection sec-4-7 envato codecanyon codester templatemonster direct purchase code buyer key verification domain transfer grace period 4.7 14-day offline fail-safe checkout protection store owners never have worry about downtime caused external internet fluctuations cloud server maintenance. continuous sales guarantee 14-day fail-safe window your hosting server cannot reach the cloud licensing registry during routine periodic health checks your storefront and admin panel continue running with 100 normal checkout and order processing for consecutive days silent auto-renewal soon"
    },
    {
        "ch": 4,
        "badge": "Ch 4 • License",
        "title": "4.8 In-Settings License Console, Key Switching & Safe Deactivation",
        "url": "license-activation.html#sec-4-8",
        "type": "Section",
        "snippet": "Super Administrators can inspect active credentials, switch purchase codes, or relocate licenses directly from the dedicated management c...",
        "keywords": "4.8 in-settings license console, key switching & safe deactivation sec-4-8 envato codecanyon codester templatemonster direct purchase code buyer key verification domain transfer grace period 4.8 in-settings license console key switching safe deactivation super administrators can inspect active credentials switch purchase codes relocate licenses directly from the dedicated management console located super admin exclusive path admin sidebar rarr system settings rarr license amp verification tab the license amp verification console organized into two operational workstations current license overview amp key switcher active credentials display displays"
    },
    {
        "ch": 5,
        "badge": "Ch 5 • Dashboard",
        "title": "Chapter 5: Dashboard & Analytics",
        "url": "dashboard-analytics.html",
        "type": "Chapter",
        "snippet": "Complete guide and configuration manual for Chapter 5: Dashboard & Analytics.",
        "keywords": "dashboard & analytics chapter 5 revenue telemetry charts graphs sales statistics conversion top selling orders visitors live counters"
    },
    {
        "ch": 5,
        "badge": "Ch 5 • Dashboard",
        "title": "Chapter 5: Dashboard Telemetry & Real-Time Metrics",
        "url": "dashboard-analytics.html#ch5-intro",
        "type": "Section",
        "snippet": "Executive analytics, real-time sales charts, orders tracking, revenue breakdown, and quick action widgets.",
        "keywords": "chapter 5: dashboard telemetry & real-time metrics ch5-intro revenue telemetry charts graphs sales statistics conversion top selling orders visitors live counters executive command hub chapter chapter dashboard telemetry real-time metrics executive analytics real-time sales charts orders tracking revenue breakdown and quick action widgets. production ready engineered for mission-critical enterprise commerce with zero latency overhead. granular controls fully customizable via the modern martx admin dashboard with real-time feedback. instant sync automated state propagation across multi-device clients cache and database layers. module architecture"
    },
    {
        "ch": 5,
        "badge": "Ch 5 • Dashboard",
        "title": "5.1 360° Real-Time Dashboard Overview & Command Console",
        "url": "dashboard-analytics.html#sec-5-1",
        "type": "Section",
        "snippet": "Upon logging into the MartX Admin Panel, the executive telemetry dashboard immediately presents an operational pulse of the store. Quick ...",
        "keywords": "5.1 360° real-time dashboard overview & command console sec-5-1 revenue telemetry charts graphs sales statistics conversion top selling orders visitors live counters 5.1 360 real-time dashboard overview command console upon logging into the martx admin panel the executive telemetry dashboard immediately presents operational pulse the store. quick action buttons allow immediate product authoring review pending orders coupon deployment while the dynamic date range selector updates all downstream charts and tables real time. admin panel mdash dashboard telemetry 360 real-time analytics command hub"
    },
    {
        "ch": 5,
        "badge": "Ch 5 • Dashboard",
        "title": "5.2 Executive KPI Performance Cards & Dynamic Switchers",
        "url": "dashboard-analytics.html#sec-5-2",
        "type": "Section",
        "snippet": "The top metric tier features 4 responsive gradient statistic cards equipped with real-time percentage indicators and in-card dropdown fil...",
        "keywords": "5.2 executive kpi performance cards & dynamic switchers sec-5-2 revenue telemetry charts graphs sales statistics conversion top selling orders visitors live counters 5.2 executive kpi performance cards dynamic switchers the top metric tier features responsive gradient statistic cards equipped with real-time percentage indicators and in-card dropdown filters this month sales 641.00 decreased last period 6.6 this month orders orders orders from last period total orders filter interactive status dropdown filter total users role administrators registered shoppers kpi card interactive capability business logic"
    },
    {
        "ch": 5,
        "badge": "Ch 5 • Dashboard",
        "title": "5.3 Sales & Orders Analytics and Order Status Distribution",
        "url": "dashboard-analytics.html#sec-5-3",
        "type": "Section",
        "snippet": "MartX harnesses ApexCharts for responsive, interactive visualization:",
        "keywords": "5.3 sales & orders analytics and order status distribution sec-5-3 revenue telemetry charts graphs sales statistics conversion top selling orders visitors live counters 5.3 sales orders analytics and order status distribution martx harnesses apexcharts for responsive interactive visualization sales orders analytics yearly curve orders 566.00 combines bar chart volume orders deliveries returns with smooth area spline revenue curve jan dec hover tooltips show precise values for any selected month. sales revenue orders deliveries returns order status total donut chart illustrating proportional order distribution"
    },
    {
        "ch": 5,
        "badge": "Ch 5 • Dashboard",
        "title": "5.4 Live Inventory Monitoring & Out-of-Stock Carousel",
        "url": "dashboard-analytics.html#sec-5-4",
        "type": "Section",
        "snippet": "MartX proactively prevents lost sales by tracking stockouts across both standalone products and multi-attribute variation matrices:",
        "keywords": "5.4 live inventory monitoring & out-of-stock carousel sec-5-4 revenue telemetry charts graphs sales statistics conversion top selling orders visitors live counters 5.4 live inventory monitoring out-of-stock carousel martx proactively prevents lost sales tracking stockouts across both standalone products and multi-attribute variation matrices out stock carousel items rotating automated 3.5-second rotating slider mounted the dashboard. when product specific size color combination reaches stock instantly enters the carousel variant out stock vintage genuine leather biker jacket size color low stock alert table low"
    },
    {
        "ch": 5,
        "badge": "Ch 5 • Dashboard",
        "title": "5.5 Top Selling Merchandising & High-Value Customers",
        "url": "dashboard-analytics.html#sec-5-5",
        "type": "Section",
        "snippet": "Gain immediate clarity into top revenue contributors and high-velocity catalog items:",
        "keywords": "5.5 top selling merchandising & high-value customers sec-5-5 revenue telemetry charts graphs sales statistics conversion top selling orders visitors live counters 5.5 top selling merchandising high-value customers gain immediate clarity into top revenue contributors and high-velocity catalog items top selling products velocity overnight heavy canvas amp leather bag sold bull genuine full-grain leather case sold bull 120 premium suede leather penny loafers sold bull braided genuine leather bracelet sold bull top customers vip spend emma watson orders 061.00 michael chang orders"
    },
    {
        "ch": 5,
        "badge": "Ch 5 • Dashboard",
        "title": "5.6 Recent Orders Stream & Payment Methods Share",
        "url": "dashboard-analytics.html#sec-5-6",
        "type": "Section",
        "snippet": "Track incoming checkout streams in real time, monitor gateway volume, and inspect destination territories:",
        "keywords": "5.6 recent orders stream & payment methods share sec-5-6 revenue telemetry charts graphs sales statistics conversion top selling orders visitors live counters 5.6 recent orders stream payment methods share track incoming checkout streams real time monitor gateway volume and inspect destination territories recent orders feed view all rarr order price payment action ord-2026-4lf9mh 70.00 paid ord-2026-soubrn 390.00 paid ord-2026-dx0bad 402.00 paid ord-2026-eidoyh 388.00 paid payment methods share active channels stripe orders bull 11.7 share 119.00 paypal orders bull 5.5 share 522.00"
    },
    {
        "ch": 5,
        "badge": "Ch 5 • Dashboard",
        "title": "5.7 Marketing Campaigns, Courier Reliability & Customer Feeds",
        "url": "dashboard-analytics.html#sec-5-7",
        "type": "Section",
        "snippet": "Maintain complete operational oversight of marketing promotions, courier delivery success rates, and customer communication:",
        "keywords": "5.7 marketing campaigns, courier reliability & customer feeds sec-5-7 revenue telemetry charts graphs sales statistics conversion top selling orders visitors live counters 5.7 marketing campaigns courier reliability customer feeds maintain complete operational oversight marketing promotions courier delivery success rates and customer communication courier performance dhl express parcels 94.1 delivered fedex international parcels 84.6 delivered ups global logistics parcels 80.0 delivered active coupons welcome15 off months summer2026 off months save10 10.00 off month customer messages daniel harris mdash collab unread chloe bennett mdash"
    },
    {
        "ch": 6,
        "badge": "Ch 6 • Media",
        "title": "Chapter 6: Media Manager & Assets",
        "url": "media-manager.html",
        "type": "Chapter",
        "snippet": "Complete guide and configuration manual for Chapter 6: Media Manager & Assets.",
        "keywords": "media manager & assets chapter 6 webp upload gallery dropzone folder organization image optimization responsive sizes asset library"
    },
    {
        "ch": 6,
        "badge": "Ch 6 • Media",
        "title": "Chapter 10: Media Manager & Central Asset Hub",
        "url": "media-manager.html#ch10-intro",
        "type": "Section",
        "snippet": "Centralized Visual Asset Management, High-Efficiency Batch Uploading, Image SEO Metadata Optimization, and Universal In-Form Media Picker...",
        "keywords": "chapter 10: media manager & central asset hub ch10-intro webp upload gallery dropzone folder organization image optimization responsive sizes asset library chapter media manager central asset hub centralized visual asset management high-efficiency batch uploading image seo metadata optimization and universal in-form media picker integration. single repository store-wide asset reuse batch uploader drag drop multi-files image seo alt google serp indexing universal modal zero-disruption form flow"
    },
    {
        "ch": 6,
        "badge": "Ch 6 • Media",
        "title": "10.1 All Media Gallery & Asset Workspace",
        "url": "media-manager.html#sec-10-1",
        "type": "Section",
        "snippet": "High-converting e-commerce relies heavily on rich visual imagery. In MartX, media assets are not scattered across disconnected folders. I...",
        "keywords": "10.1 all media gallery & asset workspace sec-10-1 webp upload gallery dropzone folder organization image optimization responsive sizes asset library 10.1 all media gallery asset workspace high-converting e-commerce relies heavily rich visual imagery. martx media assets are not scattered across disconnected folders. instead the media manager serves the central operational hub for all product photography category icons brand logos hero banners and brand storytelling visuals. admin panel mdash media manager all media gallery grid media library full view all media"
    },
    {
        "ch": 6,
        "badge": "Ch 6 • Media",
        "title": "10.2 Batch Asset Upload Engine",
        "url": "media-manager.html#sec-10-2",
        "type": "Section",
        "snippet": "Adding catalog items in bulk requires an ultra-fast asset ingestion pipeline. The Add New Media canvas allows administrators to batch upl...",
        "keywords": "10.2 batch asset upload engine sec-10-2 webp upload gallery dropzone folder organization image optimization responsive sizes asset library 10.2 batch asset upload engine adding catalog items bulk requires ultra-fast asset ingestion pipeline. the add new media canvas allows administrators batch upload dozens product images banners icons simultaneously through asynchronous drag-and-drop dropzone. admin panel mdash media manager upload new media canvas batch uploader full view add new media screen images media admin_media_add.png intuitive dashed dropzone supporting multi-file selection live"
    },
    {
        "ch": 6,
        "badge": "Ch 6 • Media",
        "title": "10.3 Asset Metadata & Image SEO Optimization",
        "url": "media-manager.html#sec-10-3",
        "type": "Section",
        "snippet": "Image search accounts for over 20% of organic e-commerce discovery on Google. In MartX, administrators can inspect any asset's file metad...",
        "keywords": "10.3 asset metadata & image seo optimization sec-10-3 webp upload gallery dropzone folder organization image optimization responsive sizes asset library 10.3 asset metadata image seo optimization image search accounts for over organic e-commerce discovery google. martx administrators can inspect any asset file metadata verify its exact byte footprint and configure descriptive alt text and contextual descriptions boost seo indexing and meet wcag accessibility criteria. admin panel mdash media manager asset information seo metadata asset inspector full view edit media workspace"
    },
    {
        "ch": 6,
        "badge": "Ch 6 • Media",
        "title": "10.4 Universal Media Picker Modal — Gallery Workspace",
        "url": "media-manager.html#sec-10-4",
        "type": "Section",
        "snippet": "The most powerful feature of the MartX asset system is the Universal Media Picker Modal. Instead of navigating back and forth between dif...",
        "keywords": "10.4 universal media picker modal — gallery workspace sec-10-4 webp upload gallery dropzone folder organization image optimization responsive sizes asset library 10.4 universal media picker modal gallery workspace the most powerful feature the martx asset system the universal media picker modal instead navigating back and forth between different administrative screens whenever admin edits product slider banner category brand team member clicking select image triggers this responsive modal instantly. admin panel mdash universal media picker gallery tab selection in-form modal full view"
    },
    {
        "ch": 6,
        "badge": "Ch 6 • Media",
        "title": "10.5 Universal Media Picker Modal — In-Form Direct Upload",
        "url": "media-manager.html#sec-10-5",
        "type": "Section",
        "snippet": "What happens if an administrator is halfway through writing a complex product description or configuring a promotional banner and discove...",
        "keywords": "10.5 universal media picker modal — in-form direct upload sec-10-5 webp upload gallery dropzone folder organization image optimization responsive sizes asset library 10.5 universal media picker modal in-form direct upload what happens administrator halfway through writing complex product description configuring promotional banner and discovers the required image has not yet been uploaded legacy platforms users lose their work navigating away. martx the upload new tab allows direct uploading inside the modal without losing single character unsaved form data. admin panel mdash universal"
    },
    {
        "ch": 6,
        "badge": "Ch 6 • Media",
        "title": "10.6 Enterprise Asset Guidelines & Performance Hygiene",
        "url": "media-manager.html#sec-10-6",
        "type": "Section",
        "snippet": "To ensure blazing-fast storefront page loads (under 1.2s on mobile devices) and top Core Web Vitals scores, adhere to these production as...",
        "keywords": "10.6 enterprise asset guidelines & performance hygiene sec-10-6 webp upload gallery dropzone folder organization image optimization responsive sizes asset library 10.6 enterprise asset guidelines performance hygiene ensure blazing-fast storefront page loads under 1.2s mobile devices and top core web vitals scores adhere these production asset standards when uploading media martx modern webp adoption utilize webp format for all catalog photography. webp reduces file weights compared legacy png jpg while retaining 100 visual fidelity. aspect ratio format product main images and"
    },
    {
        "ch": 7,
        "badge": "Ch 7 • Catalog",
        "title": "Chapter 7: Catalog & Inventory",
        "url": "catalog-inventory.html",
        "type": "Chapter",
        "snippet": "Complete guide and configuration manual for Chapter 7: Catalog & Inventory.",
        "keywords": "catalog & inventory chapter 7 brands categories subcategories bulk stock tracking low stock alerts tax classes units badges"
    },
    {
        "ch": 7,
        "badge": "Ch 7 • Catalog",
        "title": "Chapter 11: Catalog Management — Categories, Brands & Variations Engine",
        "url": "catalog-inventory.html#ch11-intro",
        "type": "Section",
        "snippet": "Taxonomy Hierarchy Architecture, Multi-Tier Category & Sub-Category Engineering, 1-Click Google Gemini AI SEO Synthesis, Brand Manufactur...",
        "keywords": "chapter 11: catalog management — categories, brands & variations engine ch11-intro brands categories subcategories bulk stock tracking low stock alerts tax classes units badges chapter catalog management categories brands variations engine taxonomy hierarchy architecture multi-tier category sub-category engineering 1-click google gemini seo synthesis brand manufacturer directory and comprehensive product variations sizes color swatches promotional tags gemini seo accurate meta copy split workspace table inline ingestion visibility assistant live storefront telemetry full variations brands sizes colors tags"
    },
    {
        "ch": 7,
        "badge": "Ch 7 • Catalog",
        "title": "11.1 Catalog Taxonomy Architecture & Storefront Impact",
        "url": "catalog-inventory.html#sec-11-1",
        "type": "Section",
        "snippet": "A disorganized product catalog frustrates buyers and leads to abandoned carts. MartX establishes an enterprise-grade, multi-tier catalog ...",
        "keywords": "11.1 catalog taxonomy architecture & storefront impact sec-11-1 brands categories subcategories bulk stock tracking low stock alerts tax classes units badges 11.1 catalog taxonomy architecture storefront impact disorganized product catalog frustrates buyers and leads abandoned carts. martx establishes enterprise-grade multi-tier catalog architecture that cleanly organizes inventory from broad departments down specific product skus powering multi-level mega menus breadcrumbs faceted search filters and targeted google serp permalinks. the martx 5-tier taxonomy pipeline level primary categories root departments e.g. eyewear accessories men fashion"
    },
    {
        "ch": 7,
        "badge": "Ch 7 • Catalog",
        "title": "11.2 Categories Management Split Workspace & AI Synthesis",
        "url": "catalog-inventory.html#sec-11-2",
        "type": "Section",
        "snippet": "Managing root categories in MartX uses a high-productivity dual-column split workspace. Store managers can monitor live category inventor...",
        "keywords": "11.2 categories management split workspace & ai synthesis sec-11-2 brands categories subcategories bulk stock tracking low stock alerts tax classes units badges 11.2 categories management split workspace synthesis managing root categories martx uses high-productivity dual-column split workspace store managers can monitor live category inventory inspect assigned product counts search the fly and create new categories with ai-generated seo copy without leaving the screen. admin panel mdash catalog management categories split workspace categories registry full view category management workspace images catalog admin_category_management.png left"
    },
    {
        "ch": 7,
        "badge": "Ch 7 • Catalog",
        "title": "11.3 Category Editing & Visibility & Impact Assistant",
        "url": "catalog-inventory.html#sec-11-3",
        "type": "Section",
        "snippet": "When editing an established category, administrators must understand the downstream storefront impact. The MartX Category Editor features...",
        "keywords": "11.3 category editing & visibility & impact assistant sec-11-3 brands categories subcategories bulk stock tracking low stock alerts tax classes units badges 11.3 category editing visibility impact assistant when editing established category administrators must understand the downstream storefront impact. the martx category editor features two-column diagnostic layout the left side handles category metadata image replacement and copywriting while the right side provides the real-time visibility impact assistant admin panel mdash catalog management edit category workspace visibility assistant diagnostic editor full view edit"
    },
    {
        "ch": 7,
        "badge": "Ch 7 • Catalog",
        "title": "11.4 Sub-Categories Split Workspace & Parent Mapping",
        "url": "catalog-inventory.html#sec-11-4",
        "type": "Section",
        "snippet": "Sub-categories enable granular classification within broad parent categories. In MartX, the Sub Category Management Hub organizes large i...",
        "keywords": "11.4 sub-categories split workspace & parent mapping sec-11-4 brands categories subcategories bulk stock tracking low stock alerts tax classes units badges 11.4 sub-categories split workspace parent mapping sub-categories enable granular classification within broad parent categories. martx the sub category management hub organizes large inventories into manageable subsets e.g. sub-categories organized across pages maintaining explicit parent-child relational integrity. admin panel mdash catalog management sub category split workspace sub-category registry full view sub category workspace images catalog admin_subcategory_management.png sub-categories with pagination 1-4 parent"
    },
    {
        "ch": 7,
        "badge": "Ch 7 • Catalog",
        "title": "11.5 Sub-Category Editing & Parent Reassignment",
        "url": "catalog-inventory.html#sec-11-5",
        "type": "Section",
        "snippet": "Merchandising strategies evolve as inventories expand. The Sub Category Editor allows store managers to reassign a sub-category to a diff...",
        "keywords": "11.5 sub-category editing & parent reassignment sec-11-5 brands categories subcategories bulk stock tracking low stock alerts tax classes units badges 11.5 sub-category editing parent reassignment merchandising strategies evolve inventories expand. the sub category editor allows store managers reassign sub-category different parent category customize url slugs e.g. accessories-ties re-generate seo copy and inspect the visibility impact assistant. admin panel mdash catalog management edit sub category workspace taxonomy editor full view edit sub category workspace images catalog admin_subcategory_edit.png allows reassigning parent category"
    },
    {
        "ch": 7,
        "badge": "Ch 7 • Catalog",
        "title": "11.6 Brand Management & Manufacturer Hub",
        "url": "catalog-inventory.html#sec-11-6",
        "type": "Section",
        "snippet": "Brand recognition drives customer trust. The MartX Brand Management Hub allows store administrators to register official brand manufactur...",
        "keywords": "11.6 brand management & manufacturer hub sec-11-6 brands categories subcategories bulk stock tracking low stock alerts tax classes units badges 11.6 brand management manufacturer hub brand recognition drives customer trust. the martx brand management hub allows store administrators register official brand manufacturers e.g. casio fossil ray-ban nike zara bind crisp vector png logos through chapter central media modal and track product associations across the storefront. admin panel mdash catalog management brands split workspace brand directory full view brand management workspace"
    },
    {
        "ch": 7,
        "badge": "Ch 7 • Catalog",
        "title": "11.7 Product Variations: Sizes & In-Place Edit Modal",
        "url": "catalog-inventory.html#sec-11-7",
        "type": "Section",
        "snippet": "Fashion, footwear, and apparel retail requires accurate dimensional variations. The Size Management Hub maintains standardized size roste...",
        "keywords": "11.7 product variations: sizes & in-place edit modal sec-11-7 brands categories subcategories bulk stock tracking low stock alerts tax classes units badges 11.7 product variations sizes in-place edit modal fashion footwear and apparel retail requires accurate dimensional variations. the size management hub maintains standardized size rosters e.g. xxl that can selected when configuring variable products chapter 12. admin panel mdash catalog management size management split workspace size directory full view size management workspace images catalog admin_size_management.png lists standardized sizing attributes with linked"
    },
    {
        "ch": 7,
        "badge": "Ch 7 • Catalog",
        "title": "11.8 Product Variations: Color Swatches & Hex Codes",
        "url": "catalog-inventory.html#sec-11-8",
        "type": "Section",
        "snippet": "Visual color accuracy prevents product returns. In MartX, the Color Management Hub equips administrators with a visual color swatch matri...",
        "keywords": "11.8 product variations: color swatches & hex codes sec-11-8 brands categories subcategories bulk stock tracking low stock alerts tax classes units badges 11.8 product variations color swatches hex codes visual color accuracy prevents product returns. martx the color management hub equips administrators with visual color swatch matrix. each color record contains human-readable title e.g. brown pink blue orange paired with exact 6-character hex color code e.g. a52a2a 0000ff rendered interactive swatch circle the storefront. admin panel mdash catalog management color management split"
    },
    {
        "ch": 7,
        "badge": "Ch 7 • Catalog",
        "title": "11.9 Promotional Tags & Product Badges",
        "url": "catalog-inventory.html#sec-11-9",
        "type": "Section",
        "snippet": "Cross-department marketing requires tags that span multiple categories. The Tag Management Hub allows store managers to define promotiona...",
        "keywords": "11.9 promotional tags & product badges sec-11-9 brands categories subcategories bulk stock tracking low stock alerts tax classes units badges 11.9 promotional tags product badges cross-department marketing requires tags that span multiple categories. the tag management hub allows store managers define promotional badge tags e.g. special latest hot sale trending best seller new rendered attention-grabbing badges product cards and filterable storefront searches. admin panel mdash catalog management tag management split workspace tag directory full view tag management workspace images catalog"
    },
    {
        "ch": 7,
        "badge": "Ch 7 • Catalog",
        "title": "11.10 Catalog Taxonomy & SEO Best Practices",
        "url": "catalog-inventory.html#sec-11-10",
        "type": "Section",
        "snippet": "To maximize search engine rankings, ensure intuitive navigation, and prevent data fragmentation across large inventories, adopt these arc...",
        "keywords": "11.10 catalog taxonomy & seo best practices sec-11-10 brands categories subcategories bulk stock tracking low stock alerts tax classes units badges 11.10 catalog taxonomy seo best practices maximize search engine rankings ensure intuitive navigation and prevent data fragmentation across large inventories adopt these architectural catalog standards always ai-seo populate never leave meta titles descriptions empty. always click auto generate with target high-intent e-commerce commercial queries google serp. 2-tier depth limit keep taxonomy strictly tiers category rarr sub-category excessive nesting confuses mobile"
    },
    {
        "ch": 8,
        "badge": "Ch 8 • Products",
        "title": "Chapter 8: Products & Variations",
        "url": "products-management.html",
        "type": "Chapter",
        "snippet": "Complete guide and configuration manual for Chapter 8: Products & Variations.",
        "keywords": "products & variations chapter 8 product attributes colors sizes sku barcode inventory pricing discount gallery variations downloadable digital"
    },
    {
        "ch": 8,
        "badge": "Ch 8 • Products",
        "title": "Chapter 12: Products Management — Lifecycle, Variations & SERP Engine",
        "url": "products-management.html#ch12-intro",
        "type": "Section",
        "snippet": "Enterprise Product Directory Telemetry, Master 2-Column Product Creation Canvas with 1-Click Google Gemini AI Synthesis, Multi-Attribute ...",
        "keywords": "chapter 12: products management — lifecycle, variations & serp engine ch12-intro product attributes colors sizes sku barcode inventory pricing discount gallery variations downloadable digital chapter products management lifecycle variations serp engine enterprise product directory telemetry master 2-column product creation canvas with 1-click google gemini synthesis multi-attribute variation matrix sizes colors custom schedules dedicated product editor and the comprehensive product dossier with live google serp simulation. products active directory catalog gemini engine 1-click specs seo meta variations matrix sizes colors custom pricing live google serp"
    },
    {
        "ch": 8,
        "badge": "Ch 8 • Products",
        "title": "12.1 Products Directory, Metric Telemetry & Filtering Matrix",
        "url": "products-management.html#sec-12-1",
        "type": "Section",
        "snippet": "The Product Management Directory is the mission control center for store merchandising. It combines real-time inventory telemetry counter...",
        "keywords": "12.1 products directory, metric telemetry & filtering matrix sec-12-1 product attributes colors sizes sku barcode inventory pricing discount gallery variations downloadable digital 12.1 products directory metric telemetry filtering matrix the product management directory the mission control center for store merchandising. combines real-time inventory telemetry counters high-performance faceted dropdown filters instant sku search and high-density tabular records detailing thumbnail imagery pricing discounts stock levels and publication statuses. admin panel mdash products management product inventory directory full view products management directory images products admin_products_table.png"
    },
    {
        "ch": 8,
        "badge": "Ch 8 • Products",
        "title": "12.2 Master Product Creation Canvas & 1-Click Gemini AI Synthesis",
        "url": "products-management.html#sec-12-2",
        "type": "Section",
        "snippet": "Publishing a comprehensive e-commerce product requires synchronizing commercial copywriting, SKU identification, pricing schedules, multi...",
        "keywords": "12.2 master product creation canvas & 1-click gemini ai synthesis sec-12-2 product attributes colors sizes sku barcode inventory pricing discount gallery variations downloadable digital 12.2 master product creation canvas 1-click gemini synthesis publishing comprehensive e-commerce product requires synchronizing commercial copywriting sku identification pricing schedules multi-level variants wysiwyg specifications image galleries and seo metadata. the martx add new product canvas arranges these controls into high-productivity dual-column workspace. admin panel mdash products management master product creation canvas full view add new product master form images products"
    },
    {
        "ch": 8,
        "badge": "Ch 8 • Products",
        "title": "12.3 Multi-Attribute Variations & Attribute Pricing Matrix",
        "url": "products-management.html#sec-12-3",
        "type": "Section",
        "snippet": "Modern fashion, jewelry, and electronics retailing requires items to be offered in multiple sizes, colors, and dimensional configurations...",
        "keywords": "12.3 multi-attribute variations & attribute pricing matrix sec-12-3 product attributes colors sizes sku barcode inventory pricing discount gallery variations downloadable digital 12.3 multi-attribute variations attribute pricing matrix modern fashion jewelry and electronics retailing requires items offered multiple sizes colors and dimensional configurations. martx integrates chapter standardized sizes and color swatches directly into dynamic in-canvas product variations matrix variant configuration parameters variant field input source storefront functionality inheritance behavior size attribute dropdown populated from chapter size registry e.g. xxl renders clickable size"
    },
    {
        "ch": 8,
        "badge": "Ch 8 • Products",
        "title": "12.4 Dedicated Product Editor & Modification Workflow",
        "url": "products-management.html#sec-12-4",
        "type": "Section",
        "snippet": "Modifying live inventory requires inspecting prefilled parameters without corrupting active order queues. The MartX Product Editor provid...",
        "keywords": "12.4 dedicated product editor & modification workflow sec-12-4 product attributes colors sizes sku barcode inventory pricing discount gallery variations downloadable digital 12.4 dedicated product editor modification workflow modifying live inventory requires inspecting prefilled parameters without corrupting active order queues. the martx product editor provides full access update pricing schedules re-allocate variant stock between sizes remove add gallery photos and re-synthesize seo copy. admin panel mdash products management edit product workspace full view edit product workspace images products admin_product_edit.png live inspection braided"
    },
    {
        "ch": 8,
        "badge": "Ch 8 • Products",
        "title": "12.5 Product Dossier & Live Google SERP Simulation",
        "url": "products-management.html#sec-12-5",
        "type": "Section",
        "snippet": "Before launching a marketing campaign or sharing a product link with buyers, store managers need a single, read-only dossier to verify al...",
        "keywords": "12.5 product dossier & live google serp simulation sec-12-5 product attributes colors sizes sku barcode inventory pricing discount gallery variations downloadable digital 12.5 product dossier live google serp simulation before launching marketing campaign sharing product link with buyers store managers need single read-only dossier verify all product attributes glance. the martx view product dossier provides executive overview discount countdown badges dual content specifications tabs and interactive live google serp simulator admin panel mdash products management product dossier live serp inspection full view"
    },
    {
        "ch": 8,
        "badge": "Ch 8 • Products",
        "title": "12.6 Product Merchandising & Catalog Hygiene Best Practices",
        "url": "products-management.html#sec-12-6",
        "type": "Section",
        "snippet": "To maximize sales conversion rates, minimize buyer returns, and achieve dominant Google SERP rankings across competitive product queries,...",
        "keywords": "12.6 product merchandising & catalog hygiene best practices sec-12-6 product attributes colors sizes sku barcode inventory pricing discount gallery variations downloadable digital 12.6 product merchandising catalog hygiene best practices maximize sales conversion rates minimize buyer returns and achieve dominant google serp rankings across competitive product queries adhere these enterprise merchandising standards standardized aspect ratio always upload primary product thumbnails clean square ratio e.g. 1000 times 1000 neutral backgrounds maintain grid uniformity across mobile layouts. variant stock reconciliation ensure the sum individual variant"
    },
    {
        "ch": 9,
        "badge": "Ch 9 • Orders",
        "title": "Chapter 9: Orders & Fulfillment",
        "url": "orders-fulfillment.html",
        "type": "Chapter",
        "snippet": "Complete guide and configuration manual for Chapter 9: Orders & Fulfillment.",
        "keywords": "orders & fulfillment chapter 9 order status processing shipped delivered invoice pdf thermal receipt dispatch tracking courier sync customer notification"
    },
    {
        "ch": 9,
        "badge": "Ch 9 • Orders",
        "title": "Chapter 9: Orders Processing & Lifecycle Fulfillment",
        "url": "orders-fulfillment.html#ch9-intro",
        "type": "Section",
        "snippet": "Lifecycle order processing, real-time status transitions, invoice generation, and customer dispatching.",
        "keywords": "chapter 9: orders processing & lifecycle fulfillment ch9-intro order status processing shipped delivered invoice pdf thermal receipt dispatch tracking courier sync customer notification sales operations hub chapter chapter orders processing lifecycle fulfillment lifecycle order processing real-time status transitions invoice generation and customer dispatching. production ready engineered for mission-critical enterprise commerce with zero latency overhead. granular controls fully customizable via the modern martx admin dashboard with real-time feedback. instant sync automated state propagation across multi-device clients cache and database layers. module architecture workflow this"
    },
    {
        "ch": 9,
        "badge": "Ch 9 • Orders",
        "title": "9.1 Order Management Directory, Telemetry Cards & Multi-Filter Matrix",
        "url": "orders-fulfillment.html#sec-9-1",
        "type": "Section",
        "snippet": "The Order Management Directory is the operational nervous system of MartX store fulfillment. It equips logistics managers with 4 high-lev...",
        "keywords": "9.1 order management directory, telemetry cards & multi-filter matrix sec-9-1 order status processing shipped delivered invoice pdf thermal receipt dispatch tracking courier sync customer notification 9.1 order management directory telemetry cards multi-filter matrix the order management directory the operational nervous system martx store fulfillment. equips logistics managers with high-level telemetry metric cards multi-condition filtering status date payment state and gateway method real-time customer search and comprehensive tabular ledger all customer purchases. admin panel mdash order management orders ledger kpi cards multi-filters full view order management"
    },
    {
        "ch": 9,
        "badge": "Ch 9 • Orders",
        "title": "9.2 Edit Order Status, Payment Transition & Courier Tracking",
        "url": "orders-fulfillment.html#sec-9-2",
        "type": "Section",
        "snippet": "The Edit Order Status workspace provides warehouse fulfillment teams with a focused, streamlined control panel to advance order lifecycle...",
        "keywords": "9.2 edit order status, payment transition & courier tracking sec-9-2 order status processing shipped delivered invoice pdf thermal receipt dispatch tracking courier sync customer notification 9.2 edit order status payment transition courier tracking the edit order status workspace provides warehouse fulfillment teams with focused streamlined control panel advance order lifecycle statuses record payment settlements assign third-party courier dispatchers and input tracking numbers. admin panel mdash orders edit order status courier dispatch information full view edit order status amp tracking assignment images orders admin_order_status_edit.png interactive full-screen"
    },
    {
        "ch": 9,
        "badge": "Ch 9 • Orders",
        "title": "9.3 Order Details Dossier & Multi-Item Line Inspector",
        "url": "orders-fulfillment.html#sec-9-3",
        "type": "Section",
        "snippet": "Clicking View Order opens the high-density Order Details Dossier. This screen displays a 3-card customer profile overview alongside an it...",
        "keywords": "9.3 order details dossier & multi-item line inspector sec-9-3 order status processing shipped delivered invoice pdf thermal receipt dispatch tracking courier sync customer notification 9.3 order details dossier multi-item line inspector clicking view order opens the high-density order details dossier this screen displays 3-card customer profile overview alongside itemized visual breakdown every product variation unit pricing applied discount delivery fee and net total. admin panel mdash orders complete order dossier line-item breakdown full view order details dossier amp item inspector images orders admin_order_view_details.png interactive"
    },
    {
        "ch": 9,
        "badge": "Ch 9 • Orders",
        "title": "9.4 Enterprise Printable Invoice & Packaging Slip Generator",
        "url": "orders-fulfillment.html#sec-9-4",
        "type": "Section",
        "snippet": "Clicking the Print Invoice button on the order details view renders a production-ready, high-resolution invoice designed for thermal ware...",
        "keywords": "9.4 enterprise printable invoice & packaging slip generator sec-9-4 order status processing shipped delivered invoice pdf thermal receipt dispatch tracking courier sync customer notification 9.4 enterprise printable invoice amp packaging slip generator clicking the print invoice button the order details view renders production-ready high-resolution invoice designed for thermal warehouse printing pdf customer dispatch. incorporates full corporate branding order barcodes itemized tables and authentic security watermark. browser print dialog mdash official martx customer invoice packaging slip full view printable invoice amp packaging slip images orders"
    },
    {
        "ch": 9,
        "badge": "Ch 9 • Orders",
        "title": "9.5 Standard Operating Procedure: 5-Step Fulfillment Protocol",
        "url": "orders-fulfillment.html#sec-9-5",
        "type": "Section",
        "snippet": "Follow this standardized workflow to process, fulfill, and dispatch orders with maximum operational accuracy:",
        "keywords": "9.5 standard operating procedure: 5-step fulfillment protocol sec-9-5 order status processing shipped delivered invoice pdf thermal receipt dispatch tracking courier sync customer notification 9.5 standard operating procedure 5-step fulfillment protocol follow this standardized workflow process fulfill and dispatch orders with maximum operational accuracy identify amp filter incoming orders navigate ecommerce amp sales orders click the pending orders kpi card filter status pending isolate new purchases requiring processing. verify payment amp stock availability click view order inspect the itemized table verify product variations sizes"
    },
    {
        "ch": 10,
        "badge": "Ch 10 • Shipping",
        "title": "Chapter 10: Shipping & Couriers",
        "url": "shipping-couriers.html",
        "type": "Chapter",
        "snippet": "Complete guide and configuration manual for Chapter 10: Shipping & Couriers.",
        "keywords": "shipping & couriers chapter 10 steadfast pathao redx paperfly flat rate free shipping weight based zones tracking delivery calculation"
    },
    {
        "ch": 10,
        "badge": "Ch 10 • Shipping",
        "title": "Chapter 10: Couriers & Shipping Cost Management",
        "url": "shipping-couriers.html#ch10-intro",
        "type": "Section",
        "snippet": "Universal courier fleet orchestration, official online tracking portals, zone-based delivery pricing rules, and state-level automated che...",
        "keywords": "chapter 10: couriers & shipping cost management ch10-intro steadfast pathao redx paperfly flat rate free shipping weight based zones tracking delivery calculation logistics fulfillment engine chapter chapter couriers shipping cost management universal courier fleet orchestration official online tracking portals zone-based delivery pricing rules and state-level automated checkout calculations. universal tracking support connect any domestic international courier service sundarban steadfast pathao fedex ups without complex api keys. zone pricing matrix configure granular delivery fees grouped country division and state for automatic checkout rate"
    },
    {
        "ch": 10,
        "badge": "Ch 10 • Shipping",
        "title": "10.1 Couriers Directory & Fleet Management",
        "url": "shipping-couriers.html#sec-10-1",
        "type": "Section",
        "snippet": "The Couriers Management Directory provides a centralized catalog of all delivery carriers authorized to transport store shipments. Logist...",
        "keywords": "10.1 couriers directory & fleet management sec-10-1 steadfast pathao redx paperfly flat rate free shipping weight based zones tracking delivery calculation 10.1 couriers directory amp fleet management the couriers management directory provides centralized catalog all delivery carriers authorized transport store shipments. logistics supervisors can instantly monitor carrier status query tracking urls perform real-time searches and manage carrier records. admin panel mdash couriers management logistics partners directory amp status engine full view couriers management directory interface images couriers admin_couriers_table.png interactive full-screen lightbox"
    },
    {
        "ch": 10,
        "badge": "Ch 10 • Shipping",
        "title": "10.2 Add New Courier Partner & Operational Tracking Architecture",
        "url": "shipping-couriers.html#sec-10-2",
        "type": "Section",
        "snippet": "Adding a courier partner in MartX requires zero technical API integrations or webhook setups. The interface is engineered with a modern t...",
        "keywords": "10.2 add new courier partner & operational tracking architecture sec-10-2 steadfast pathao redx paperfly flat rate free shipping weight based zones tracking delivery calculation 10.2 add new courier partner amp operational tracking architecture adding courier partner martx requires zero technical api integrations webhook setups. the interface engineered with modern two-column layout featuring active input form the left and integrated operational guide the right that explains how parcel tracking functions from warehouse dispatch customer delivery. admin panel mdash add new courier configure delivery partner amp"
    },
    {
        "ch": 10,
        "badge": "Ch 10 • Shipping",
        "title": "10.3 Edit & Synchronize Courier Parameters",
        "url": "shipping-couriers.html#sec-10-3",
        "type": "Section",
        "snippet": "When carrier contact endpoints, portal addresses, or operational statuses change, administrators can update parameters seamlessly via the...",
        "keywords": "10.3 edit & synchronize courier parameters sec-10-3 steadfast pathao redx paperfly flat rate free shipping weight based zones tracking delivery calculation 10.3 edit amp synchronize courier parameters when carrier contact endpoints portal addresses operational statuses change administrators can update parameters seamlessly via the edit courier console. changes are instantly synchronized across all ongoing fulfillment pipelines. admin panel mdash edit courier update logistics partner parameters amp tracking portal full view edit courier interface images couriers admin_courier_edit.png interactive full-screen lightbox enabled. click image"
    },
    {
        "ch": 10,
        "badge": "Ch 10 • Shipping",
        "title": "10.4 Shipping Costs Directory & Operational Zone Matrix",
        "url": "shipping-couriers.html#sec-10-4",
        "type": "Section",
        "snippet": "The Shipping Costs Management Directory (/admin/shipping-costs) is where store owners configure geographic delivery tariffs. Every store ...",
        "keywords": "10.4 shipping costs directory & operational zone matrix sec-10-4 steadfast pathao redx paperfly flat rate free shipping weight based zones tracking delivery calculation 10.4 shipping costs directory amp operational zone matrix the shipping costs management directory admin shipping-costs where store owners configure geographic delivery tariffs. every store must establish delivery fee rules before trading ensure the storefront checkout engine calculates correct shipping costs based the customer delivery destination. admin panel mdash shipping costs management zone pricing rules amp operational guidelines full view shipping"
    },
    {
        "ch": 10,
        "badge": "Ch 10 • Shipping",
        "title": "10.5 Add & Edit Geographic Zone Pricing Rules",
        "url": "shipping-couriers.html#sec-10-5",
        "type": "Section",
        "snippet": "Configuring new delivery zones or modifying existing shipping rates is performed through the dedicated Zone Details console. The interfac...",
        "keywords": "10.5 add & edit geographic zone pricing rules sec-10-5 steadfast pathao redx paperfly flat rate free shipping weight based zones tracking delivery calculation 10.5 add amp edit geographic zone pricing rules configuring new delivery zones modifying existing shipping rates performed through the dedicated zone details console. the interface integrates interactive multi-country state accordion with instant validation feedback. admin panel mdash add shipping cost define geographic delivery zone amp price full view add shipping cost interface images shipping admin_shipping_cost_create.png interactive full-screen lightbox enabled. click"
    },
    {
        "ch": 10,
        "badge": "Ch 10 • Shipping",
        "title": "10.6 Standard Operating Procedure (SOP): End-to-End Shipping & Logistics Protocol",
        "url": "shipping-couriers.html#sec-10-6",
        "type": "Section",
        "snippet": "To ensure error-free parcel handling, tracking transparency, and accurate financial accounting, follow this standardized 5-step operation...",
        "keywords": "10.6 standard operating procedure (sop): end-to-end shipping & logistics protocol sec-10-6 steadfast pathao redx paperfly flat rate free shipping weight based zones tracking delivery calculation 10.6 standard operating procedure sop end-to-end shipping amp logistics protocol ensure error-free parcel handling tracking transparency and accurate financial accounting follow this standardized 5-step operational protocol mandatory setup establish geographic shipping zones navigate shipping costs add new shipping cost create your operational delivery zones e.g. inside city outside city express and map all covered states districts with their respective delivery"
    },
    {
        "ch": 11,
        "badge": "Ch 11 • Coupons",
        "title": "Chapter 11: Coupons & Marketing",
        "url": "coupons-marketing.html",
        "type": "Chapter",
        "snippet": "Complete guide and configuration manual for Chapter 11: Coupons & Marketing.",
        "keywords": "coupons & marketing chapter 11 discount codes percentage fixed amount coupon countdown timer expiry minimum spend usage limit campaigns"
    },
    {
        "ch": 11,
        "badge": "Ch 11 • Coupons",
        "title": "Chapter 11: Promotional Coupons & Marketing Engine",
        "url": "coupons-marketing.html#ch11-intro",
        "type": "Section",
        "snippet": "Fixed and percentage coupon discounts, expiration scheduling, usage quotas, and promotional campaigns.",
        "keywords": "chapter 11: promotional coupons & marketing engine ch11-intro discount codes percentage fixed amount coupon countdown timer expiry minimum spend usage limit campaigns growth discounts chapter chapter promotional coupons marketing engine fixed and percentage coupon discounts expiration scheduling usage quotas and promotional campaigns. production ready engineered for mission-critical enterprise commerce with zero latency overhead. granular controls fully customizable via the modern martx admin dashboard with real-time feedback. instant sync automated state propagation across multi-device clients cache and database layers. module architecture workflow this"
    },
    {
        "ch": 11,
        "badge": "Ch 11 • Coupons",
        "title": "11.1 Coupons Directory & Voucher Ledger",
        "url": "coupons-marketing.html#sec-11-1",
        "type": "Section",
        "snippet": "The Coupon Management Directory serves as the central operational command center for all promotional vouchers, discount campaigns, and cu...",
        "keywords": "11.1 coupons directory & voucher ledger sec-11-1 discount codes percentage fixed amount coupon countdown timer expiry minimum spend usage limit campaigns 11.1 coupons directory amp voucher ledger the coupon management directory serves the central operational command center for all promotional vouchers discount campaigns and customer redemption quotas across the martx storefront. store administrators can monitor live redemption velocity examine threshold requirements review active validity windows and execute instant lifecycle actions. admin panel mdash coupon management promotional discount coupons amp voucher ledger"
    },
    {
        "ch": 11,
        "badge": "Ch 11 • Coupons",
        "title": "11.2 Dual Discount Mechanics: Percentage vs. Fixed Amount",
        "url": "coupons-marketing.html#sec-11-2",
        "type": "Section",
        "snippet": "MartX incorporates a high-performance, precision mathematical discount calculation engine engineered to handle diverse marketing campaign...",
        "keywords": "11.2 dual discount mechanics: percentage vs. fixed amount sec-11-2 discount codes percentage fixed amount coupon countdown timer expiry minimum spend usage limit campaigns 11.2 dual discount mechanics percentage vs. fixed amount martx incorporates high-performance precision mathematical discount calculation engine engineered handle diverse marketing campaign strategies. the platform natively provides two fundamentally distinct discount architectures percentage and fixed currency amount comprehensive architectural comparison percentage vs. fixed architectural metric percentage discount fixed amount discount deduction method relative mathematical ratio deducted from cart subtotal e.g. absolute"
    },
    {
        "ch": 11,
        "badge": "Ch 11 • Coupons",
        "title": "11.3 Creating Promotional Coupons (Add Coupon Console)",
        "url": "coupons-marketing.html#sec-11-3",
        "type": "Section",
        "snippet": "The Add New Coupon console features a modern, responsive two-column layout separating core discount criteria from campaign configuration ...",
        "keywords": "11.3 creating promotional coupons (add coupon console) sec-11-3 discount codes percentage fixed amount coupon countdown timer expiry minimum spend usage limit campaigns 11.3 creating promotional coupons add coupon console the add new coupon console features modern responsive two-column layout separating core discount criteria from campaign configuration and scheduling parameters. dynamic client-side scripts seamlessly synchronize field visibility and validation rules based your chosen discount type. admin panel mdash add new coupon promotional criteria amp usage quotas full view add new coupon form interface"
    },
    {
        "ch": 11,
        "badge": "Ch 11 • Coupons",
        "title": "11.4 Coupon Lifecycle & Revision Protocols (Edit Console)",
        "url": "coupons-marketing.html#sec-11-4",
        "type": "Section",
        "snippet": "The Edit Coupon console enables administrators to adjust ongoing campaign quotas, extend promotion dates, or pause underperforming vouche...",
        "keywords": "11.4 coupon lifecycle & revision protocols (edit console) sec-11-4 discount codes percentage fixed amount coupon countdown timer expiry minimum spend usage limit campaigns 11.4 coupon lifecycle amp revision protocols edit console the edit coupon console enables administrators adjust ongoing campaign quotas extend promotion dates pause underperforming vouchers. protect audit integrity and ensure accurate historical invoice ledgers martx implements strict immutability barriers core identifiers. admin panel mdash edit coupon summer2026 mdash promotional revision amp quota adjustments full view edit coupon form interface images coupons"
    },
    {
        "ch": 11,
        "badge": "Ch 11 • Coupons",
        "title": "11.5 Storefront Checkout Engine & Cart Valuation Pipeline",
        "url": "coupons-marketing.html#sec-11-5",
        "type": "Section",
        "snippet": "When a buyer enters a promotional code in the MartX storefront checkout modal (Apply Coupon), the backend executes a rigorous, zero-overh...",
        "keywords": "11.5 storefront checkout engine & cart valuation pipeline sec-11-5 discount codes percentage fixed amount coupon countdown timer expiry minimum spend usage limit campaigns 11.5 storefront checkout engine amp cart valuation pipeline when buyer enters promotional code the martx storefront checkout modal apply coupon the backend executes rigorous zero-overhead atomic verification sequence before adjusting the payable subtotal. 7-step atomic checkout verification sequence code sanitization strips accidental spaces normalizes case and queries the database for active coupon records. temporal validation verifies server timestamp lies within"
    },
    {
        "ch": 11,
        "badge": "Ch 11 • Coupons",
        "title": "11.6 Promotional Strategy & Marketing SOP",
        "url": "coupons-marketing.html#sec-11-6",
        "type": "Section",
        "snippet": "Deploy high-converting campaigns while safeguarding gross margins using MartX's enterprise coupon playbooks:",
        "keywords": "11.6 promotional strategy & marketing sop sec-11-6 discount codes percentage fixed amount coupon countdown timer expiry minimum spend usage limit campaigns 11.6 promotional strategy amp marketing sop deploy high-converting campaigns while safeguarding gross margins using martx enterprise coupon playbooks high-converting campaign playbooks first-time shopper acquisition create single-use coupon like welcome15 off min spend max cap limit per user displayed welcome banners. seasonal volume drives launch codes like summer2026 off min spend max cap for holiday weekends boost basket sizes. vip tier"
    },
    {
        "ch": 12,
        "badge": "Ch 12 • Payments",
        "title": "Chapter 12: Payment Gateways",
        "url": "payment-gateways.html",
        "type": "Chapter",
        "snippet": "Complete guide and configuration manual for Chapter 12: Payment Gateways.",
        "keywords": "payment gateways chapter 12 stripe paypal sslcommerz bkash nagad rocket razorpay mollie cash on delivery cod sandbox live api keys"
    },
    {
        "ch": 12,
        "badge": "Ch 12 • Payments",
        "title": "Chapter 12: Payment Gateways & Visual Logos Hub",
        "url": "payment-gateways.html#ch12-intro",
        "type": "Section",
        "snippet": "Multi-gateway configurations (Stripe, PayPal, Razorpay, SSLCommerz, COD) and high-res checkout logos.",
        "keywords": "chapter 12: payment gateways & visual logos hub ch12-intro stripe paypal sslcommerz bkash nagad rocket razorpay mollie cash on delivery cod sandbox live api keys checkout gateways chapter chapter payment gateways visual logos hub multi-gateway configurations stripe paypal razorpay sslcommerz cod and high-res checkout logos. production ready engineered for mission-critical enterprise commerce with zero latency overhead. granular controls fully customizable via the modern martx admin dashboard with real-time feedback. instant sync automated state propagation across multi-device clients cache and database layers. module architecture workflow this"
    },
    {
        "ch": 12,
        "badge": "Ch 12 • Payments",
        "title": "12.1 Gateway Selection Console & Architectural Overview",
        "url": "payment-gateways.html#sec-12-1",
        "type": "Section",
        "snippet": "MartX provides a unified, enterprise-grade payment processing architecture supporting 10 distinct gateway integrations across credit/debi...",
        "keywords": "12.1 gateway selection console & architectural overview sec-12-1 stripe paypal sslcommerz bkash nagad rocket razorpay mollie cash on delivery cod sandbox live api keys 12.1 gateway selection console amp architectural overview martx provides unified enterprise-grade payment processing architecture supporting distinct gateway integrations across credit debit cards digital wallets global escrow cryptocurrency rails and localized offline payments. administrators manage all payment channels through the centralized gateway settings console ecommerce amp sales payment gateways gateway settings global cards stripe paypal razorpay paystack wayforpay local amp wallets"
    },
    {
        "ch": 12,
        "badge": "Ch 12 • Payments",
        "title": "12.2 Global Card & Wallet Gateways: Stripe, PayPal, SSLCommerz & Razorpay",
        "url": "payment-gateways.html#sec-12-2",
        "type": "Section",
        "snippet": "These Tier-1 financial processors handle standard consumer card transactions, mobile wallets, and domestic banking integrations. Each gat...",
        "keywords": "12.2 global card & wallet gateways: stripe, paypal, sslcommerz & razorpay sec-12-2 stripe paypal sslcommerz bkash nagad rocket razorpay mollie cash on delivery cod sandbox live api keys 12.2 global card amp wallet gateways stripe paypal sslcommerz amp razorpay these tier-1 financial processors handle standard consumer card transactions mobile wallets and domestic banking integrations. each gateway can independently switched between active and inactive states. admin panel mdash stripe configuration global cards apple pay amp google pay full view stripe gateway configuration images payments admin_gateway_stripe.png interactive full-screen lightbox enabled."
    },
    {
        "ch": 12,
        "badge": "Ch 12 • Payments",
        "title": "12.3 Regional & Multi-Currency Processing: Paystack & WayForPay",
        "url": "payment-gateways.html#sec-12-3",
        "type": "Section",
        "snippet": "MartX expands business reach into emerging markets through specialized regional gateways equipped with real-time base currency conversion.",
        "keywords": "12.3 regional & multi-currency processing: paystack & wayforpay sec-12-3 stripe paypal sslcommerz bkash nagad rocket razorpay mollie cash on delivery cod sandbox live api keys 12.3 regional amp multi-currency processing paystack amp wayforpay martx expands business reach into emerging markets through specialized regional gateways equipped with real-time base currency conversion. admin panel mdash paystack configuration african commerce nigeria ghana south africa full view paystack gateway configuration images payments admin_gateway_paystack.png configured with exchange rate ngn base currency and merchant credentials. paystack africa engine admin panel mdash"
    },
    {
        "ch": 12,
        "badge": "Ch 12 • Payments",
        "title": "12.4 Borderless Cryptocurrency Gateways: Binance Pay & CoinGate",
        "url": "payment-gateways.html#sec-12-4",
        "type": "Section",
        "snippet": "For global decentralized commerce, MartX integrates premier Web3 payment rails enabling real-time stablecoin and cryptocurrency settlements.",
        "keywords": "12.4 borderless cryptocurrency gateways: binance pay & coingate sec-12-4 stripe paypal sslcommerz bkash nagad rocket razorpay mollie cash on delivery cod sandbox live api keys 12.4 borderless cryptocurrency gateways binance pay amp coingate for global decentralized commerce martx integrates premier web3 payment rails enabling real-time stablecoin and cryptocurrency settlements. admin panel mdash binance pay configuration instant cryptocurrency amp usdt settlements full view binance pay gateway configuration images payments admin_gateway_binance.png zero gas fee instant checkout for binance registered app users. binance pay integration admin panel mdash"
    },
    {
        "ch": 12,
        "badge": "Ch 12 • Payments",
        "title": "12.5 Cash on Delivery (COD) & Advance Shipping Charge Enforcement",
        "url": "payment-gateways.html#sec-12-5",
        "type": "Section",
        "snippet": "Cash on Delivery is a vital payment method in emerging markets but carries high return and refusal risks (RTO). MartX features a sophisti...",
        "keywords": "12.5 cash on delivery (cod) & advance shipping charge enforcement sec-12-5 stripe paypal sslcommerz bkash nagad rocket razorpay mollie cash on delivery cod sandbox live api keys 12.5 cash delivery cod amp advance shipping charge enforcement cash delivery vital payment method emerging markets but carries high return and refusal risks rto martx features sophisticated advance delivery charge architecture that eliminates fake orders requiring buyers pay the courier shipping fee online before confirming their cod shipment. admin panel mdash cash delivery advance shipping charge amp mandatory method selection"
    },
    {
        "ch": 12,
        "badge": "Ch 12 • Payments",
        "title": "12.6 Manual Bank & Direct Mobile Transfers (Manual Payment)",
        "url": "payment-gateways.html#sec-12-6",
        "type": "Section",
        "snippet": "For stores accepting direct bank wire transfers, offline deposits, or personal mobile wallet \"Send Money\" transactions (bKash/Nagad perso...",
        "keywords": "12.6 manual bank & direct mobile transfers (manual payment) sec-12-6 stripe paypal sslcommerz bkash nagad rocket razorpay mollie cash on delivery cod sandbox live api keys 12.6 manual bank amp direct mobile transfers manual payment for stores accepting direct bank wire transfers offline deposits personal mobile wallet send money transactions bkash nagad personal numbers the manual payment module allows administrators specify custom buyer instructions. admin panel mdash manual payment configuration direct transfer instructions amp trxid protocols full view manual payment configuration interface images payments admin_gateway_manual.png rich"
    },
    {
        "ch": 12,
        "badge": "Ch 12 • Payments",
        "title": "12.7 Payment Logos & Visual Trust Badges Hub (Storefront Footer & Checkout)",
        "url": "payment-gateways.html#sec-12-7",
        "type": "Section",
        "snippet": "Beyond backend transaction processing, displaying recognized payment brand logos (MasterCard, Visa, bKash, PayPal, Amex) on the storefron...",
        "keywords": "12.7 payment logos & visual trust badges hub (storefront footer & checkout) sec-12-7 stripe paypal sslcommerz bkash nagad rocket razorpay mollie cash on delivery cod sandbox live api keys 12.7 payment logos amp visual trust badges hub storefront footer amp checkout beyond backend transaction processing displaying recognized payment brand logos mastercard visa bkash paypal amex the storefront footer and checkout summary proven enhance buyer confidence and checkout conversion rates. the payment logos console ecommerce amp sales payment gateways payment logos manages these visual assets. admin panel mdash payment methods"
    },
    {
        "ch": 12,
        "badge": "Ch 12 • Payments",
        "title": "12.8 Payment Settlement, Webhooks & Security SOP",
        "url": "payment-gateways.html#sec-12-8",
        "type": "Section",
        "snippet": "Adhere to enterprise financial engineering best practices when deploying live payment channels on MartX:",
        "keywords": "12.8 payment settlement, webhooks & security sop sec-12-8 stripe paypal sslcommerz bkash nagad rocket razorpay mollie cash on delivery cod sandbox live api keys 12.8 payment settlement webhooks amp security sop adhere enterprise financial engineering best practices when deploying live payment channels martx security amp key management encrypted credential storage all secret keys auth tokens and passwords are automatically aes-256 encrypted the database before storage. sandbox verification always run complete checkout transactions using sandbox test cards before flipping environment toggles live mode. webhook url"
    },
    {
        "ch": 13,
        "badge": "Ch 13 • Layouts",
        "title": "Chapter 13: Theme Layouts & Hub",
        "url": "theme-layouts.html",
        "type": "Chapter",
        "snippet": "Complete guide and configuration manual for Chapter 13: Theme Layouts & Hub.",
        "keywords": "theme layouts & hub chapter 13 header styles footer styles hero banner color palettes typography font dark mode live customizer"
    },
    {
        "ch": 13,
        "badge": "Ch 13 • Layouts",
        "title": "Chapter 6: Theme Layouts Hub",
        "url": "theme-layouts.html#ch6-intro",
        "type": "Section",
        "snippet": "MartX Theme Layouts, Visual Customizer & Frontend Templates Documentation.",
        "keywords": "chapter 6: theme layouts hub ch6-intro header styles footer styles hero banner color palettes typography font dark mode live customizer chapter theme layouts hub martx theme layouts visual customizer frontend templates documentation. header styles home layouts content forms shop layouts mega menus product cards"
    },
    {
        "ch": 13,
        "badge": "Ch 13 • Layouts",
        "title": "6.1 Theme Layout Architecture & One-Click Customizer Engine",
        "url": "theme-layouts.html#sec-6-1",
        "type": "Section",
        "snippet": "MartX provides an enterprise-grade Dynamic Theme Layout Engine that empowers store owners and administrators to completely alter the visu...",
        "keywords": "6.1 theme layout architecture & one-click customizer engine sec-6-1 header styles footer styles hero banner color palettes typography font dark mode live customizer 6.1 theme layout architecture one-click customizer engine martx provides enterprise-grade dynamic theme layout engine that empowers store owners and administrators completely alter the visual presentation navigation structure and product card rendering across the entire storefront single click mdash with zero code modification zero server downtime and zero template recompilation overhead. admin access path navigate admin dashboard rarr website cms rarr"
    },
    {
        "ch": 13,
        "badge": "Ch 13 • Layouts",
        "title": "6.2 Tab 1: Dynamic Header Layout Switcher (3 Styles)",
        "url": "theme-layouts.html#sec-6-2",
        "type": "Section",
        "snippet": "The Header is the primary visual anchor of your e-commerce store. MartX features 3 distinct Header Architectures tailored for diverse inv...",
        "keywords": "6.2 tab 1: dynamic header layout switcher (3 styles) sec-6-2 header styles footer styles hero banner color palettes typography font dark mode live customizer 6.2 tab dynamic header layout switcher styles the header the primary visual anchor your e-commerce store. martx features distinct header architectures tailored for diverse inventory depths branding styles and navigation models. admin panel mdash header layout selection tab admin view full view images theme-layouts admin_header_layout.png admin interface displays the header options with active radio selection visual border highlight active checkmark"
    },
    {
        "ch": 13,
        "badge": "Ch 13 • Layouts",
        "title": "6.3 Tab 2: Home Page Layout Switcher (2 Styles)",
        "url": "theme-layouts.html#sec-6-3",
        "type": "Section",
        "snippet": "MartX features 2 completely distinct Home Page architectural templates. Switching between Home 1 and Home 2 instantly restructures the en...",
        "keywords": "6.3 tab 2: home page layout switcher (2 styles) sec-6-3 header styles footer styles hero banner color palettes typography font dark mode live customizer 6.3 tab home page layout switcher styles martx features completely distinct home page architectural templates switching between home and home instantly restructures the entire landing page section order hero banner layout and content grouping. admin panel mdash home page layout selection tab admin view full view images theme-layouts admin_home_layout.png admin interface switch between home classic marketplace and home modern split-hero"
    },
    {
        "ch": 13,
        "badge": "Ch 13 • Layouts",
        "title": "6.4 Tab 3: Home Page Content Builder (Context-Aware Dynamic Form Engine)",
        "url": "theme-layouts.html#sec-6-4",
        "type": "Section",
        "snippet": "The Home Page Content Builder is a Context-Aware Dynamic System. Rather than forcing administrators to fill out irrelevant fields, MartX ...",
        "keywords": "6.4 tab 3: home page content builder (context-aware dynamic form engine) sec-6-4 header styles footer styles hero banner color palettes typography font dark mode live customizer 6.4 tab home page content builder context-aware dynamic form engine the home page content builder context-aware dynamic system rather than forcing administrators fill out irrelevant fields martx automatically detects whether home home currently active and renders specialized dedicated configuration form. seamless in-tab layout switcher inside tab active badge indicates which layout you are configuring e.g. active home you can click"
    },
    {
        "ch": 13,
        "badge": "Ch 13 • Layouts",
        "title": "6.5 Tab 4: Shop Page Layout Switcher (3 Styles)",
        "url": "theme-layouts.html#sec-6-5",
        "type": "Section",
        "snippet": "The Shop Page is the primary product discovery and purchasing catalog of your store. MartX includes 3 distinct Shop Architectures to cate...",
        "keywords": "6.5 tab 4: shop page layout switcher (3 styles) sec-6-5 header styles footer styles hero banner color palettes typography font dark mode live customizer 6.5 tab shop page layout switcher styles the shop page the primary product discovery and purchasing catalog your store. martx includes distinct shop architectures cater varying inventory scopes filter complexities and customer browsing patterns. admin panel mdash shop page layout selection tab admin view full view images theme-layouts admin_shop_layout.png admin interface choose between shop left sidebar shop right sidebar and"
    },
    {
        "ch": 13,
        "badge": "Ch 13 • Layouts",
        "title": "6.6 Tab 5: Mega Menu Engine & Global Controls (2 Styles)",
        "url": "theme-layouts.html#sec-6-6",
        "type": "Section",
        "snippet": "MartX includes an integrated Mega Menu Navigation Engine that elevates store categorization into an interactive, multi-tiered visual expe...",
        "keywords": "6.6 tab 5: mega menu engine & global controls (2 styles) sec-6-6 header styles footer styles hero banner color palettes typography font dark mode live customizer 6.6 tab mega menu engine global controls styles martx includes integrated mega menu navigation engine that elevates store categorization into interactive multi-tiered visual experience with promotional banner support. admin panel mdash mega menu configuration layouts tab admin view full view images theme-layouts admin_megamenu_layout.png admin interface displays the header compatibility alert global status toggle switch custom button label input and the"
    },
    {
        "ch": 13,
        "badge": "Ch 13 • Layouts",
        "title": "6.7 Tab 6: Product Card Engine (6 Architectural Styles)",
        "url": "theme-layouts.html#sec-6-7",
        "type": "Section",
        "snippet": "The Product Card is the single most critical micro-conversion component of any e-commerce storefront. MartX features a Storewide 1-Click ...",
        "keywords": "6.7 tab 6: product card engine (6 architectural styles) sec-6-7 header styles footer styles hero banner color palettes typography font dark mode live customizer 6.7 tab product card engine architectural styles the product card the single most critical micro-conversion component any e-commerce storefront. martx features storewide 1-click product card engine offering bespoke card architectures storewide 1-click propagation when you select card style tab and save the change instantly updates every product display across your entire website home page sections shop catalog category archives search"
    },
    {
        "ch": 13,
        "badge": "Ch 13 • Layouts",
        "title": "6.8 Live Preview Modal System & AJAX Persistence Engine",
        "url": "theme-layouts.html#sec-6-8",
        "type": "Section",
        "snippet": "MartX is built to eliminate design guesswork. Every visual layout card in the theme manager is equipped with an integrated Live Preview M...",
        "keywords": "6.8 live preview modal system & ajax persistence engine sec-6-8 header styles footer styles hero banner color palettes typography font dark mode live customizer 6.8 live preview modal system ajax persistence engine martx built eliminate design guesswork. every visual layout card the theme manager equipped with integrated live preview modal system preview_modal.blade.php inspecting visual layouts hovering over any card reveals the floating preview button. clicking instantly launches bootstrap modal rendering full-scale uncompressed screenshot that specific layout action. zero commit risk administrators can inspect headers"
    },
    {
        "ch": 13,
        "badge": "Ch 13 • Layouts",
        "title": "6.9 Recommended Theme Combinations & UX Pairing Guide",
        "url": "theme-layouts.html#sec-6-9",
        "type": "Section",
        "snippet": "To assist you in crafting the perfect brand persona, our UI/UX team has benchmarked the optimal layout combinations for popular e-commerc...",
        "keywords": "6.9 recommended theme combinations & ux pairing guide sec-6-9 header styles footer styles hero banner color palettes typography font dark mode live customizer 6.9 recommended theme combinations pairing guide assist you crafting the perfect brand persona our team has benchmarked the optimal layout combinations for popular e-commerce retail verticals store type industry recommended header recommended home mega menu shop page product card multi-category superstore electronics gadgets groceries header classic home marketplace mega menu left sidebar style action tray fashion apparel brand clothing shoes"
    },
    {
        "ch": 14,
        "badge": "Ch 14 • Mega Menus",
        "title": "Chapter 14: Navigation & Mega Menus",
        "url": "navigation-menus.html",
        "type": "Chapter",
        "snippet": "Complete guide and configuration manual for Chapter 14: Navigation & Mega Menus.",
        "keywords": "navigation & mega menus chapter 14 navigation mega menu multilevel header menu footer menu builder drag drop hierarchy links categories layout 1 layout 2 flyout promo banner"
    },
    {
        "ch": 14,
        "badge": "Ch 14 • Mega Menus",
        "title": "Chapter 14: Navigation & Mega Menus Builder Engine",
        "url": "navigation-menus.html#ch14-intro",
        "type": "Section",
        "snippet": "MartX Dynamic Multi-Location Navigation, Drag-and-Drop Menu Builder & Custom Routing Documentation.",
        "keywords": "chapter 14: navigation & mega menus builder engine ch14-intro navigation mega menu multilevel header menu footer menu builder drag drop hierarchy links categories layout 1 layout 2 flyout promo banner chapter navigation mega menus builder engine martx dynamic multi-location navigation drag-and-drop menu builder custom routing documentation. multi-location header footer columns source tabs system cms categories custom drag drop live sorting ajax sync item renamer 1-click custom title override"
    },
    {
        "ch": 14,
        "badge": "Ch 14 • Mega Menus",
        "title": "14.1 Menu Engine Architecture & Multi-Location Routing",
        "url": "navigation-menus.html#sec-7-1",
        "type": "Section",
        "snippet": "MartX is engineered with an enterprise Multi-Location Dynamic Menu Engine. Instead of hardcoding hyperlinks into frontend templates, all ...",
        "keywords": "14.1 menu engine architecture & multi-location routing sec-7-1 navigation mega menu multilevel header menu footer menu builder drag drop hierarchy links categories layout 1 layout 2 flyout promo banner sec-14-1 14.1 menu engine architecture multi-location routing martx engineered with enterprise multi-location dynamic menu engine instead hardcoding hyperlinks into frontend templates all navigation bars across the website are managed dynamically through centralized high-performance database-driven system. admin access path navigate admin dashboard rarr website cms rarr menu builder supported menu locations martx header_top_menu header top utility menu appears the upper announcement"
    },
    {
        "ch": 14,
        "badge": "Ch 14 • Mega Menus",
        "title": "14.2 Menu Builder Workspace Overview",
        "url": "navigation-menus.html#sec-7-2",
        "type": "Section",
        "snippet": "The Menu Builder features an intuitive, dual-pane workspace designed for maximum productivity: the Left Pane manages the active menu stru...",
        "keywords": "14.2 menu builder workspace overview sec-7-2 navigation mega menu multilevel header menu footer menu builder drag drop hierarchy links categories layout 1 layout 2 flyout promo banner sec-14-2 14.2 menu builder workspace overview the menu builder features intuitive dual-pane workspace designed for maximum productivity the left pane manages the active menu structure and item sequence while the right pane houses the multi-source item addition engine. admin panel mdash menu builder settings workspace workspace view full view images menus admin_menu_builder_workspace.png dual-pane architecture left side displays active menu items"
    },
    {
        "ch": 14,
        "badge": "Ch 14 • Mega Menus",
        "title": "14.3 The Four Core Item Source Tabs",
        "url": "navigation-menus.html#sec-7-3",
        "type": "Section",
        "snippet": "To give store owners complete linking versatility without requiring manual URL lookups, the Menu Builder divides link sources into 4 dedi...",
        "keywords": "14.3 the four core item source tabs sec-7-3 navigation mega menu multilevel header menu footer menu builder drag drop hierarchy links categories layout 1 layout 2 flyout promo banner sec-14-3 14.3 the four core item source tabs give store owners complete linking versatility without requiring manual url lookups the menu builder divides link sources into dedicated tabs tab system pages connects directly pre-configured named routes inside laravel. ensures links never break even the site url domain changes. supported home root shop shop about about contact contact flash sales wishlist"
    },
    {
        "ch": 14,
        "badge": "Ch 14 • Mega Menus",
        "title": "14.4 Footer Column Titles & Menu Rename Engine",
        "url": "navigation-menus.html#sec-7-4",
        "type": "Section",
        "snippet": "In your storefront's footer, links are organized into structured columns (e.g. Footer - Company and Footer - Support). MartX provides an ...",
        "keywords": "14.4 footer column titles & menu rename engine sec-7-4 navigation mega menu multilevel header menu footer menu builder drag drop hierarchy links categories layout 1 layout 2 flyout promo banner sec-14-4 14.4 footer column titles menu rename engine your storefront footer links are organized into structured columns e.g. footer company and footer support martx provides exclusive context-aware menu rename engine that empowers administrators rebrand these column header titles without touching template code. admin modal mdash rename footer menu title rename engine full view images menus admin_menu_rename_modal.png context-aware trigger selecting footer"
    },
    {
        "ch": 14,
        "badge": "Ch 14 • Mega Menus",
        "title": "14.5 Menu Item Customizer & Item Rename Modal",
        "url": "navigation-menus.html#sec-7-5",
        "type": "Section",
        "snippet": "Need to adjust the label of an existing menu link without deleting and rebuilding it? MartX features a dedicated Menu Item Editor Modal.",
        "keywords": "14.5 menu item customizer & item rename modal sec-7-5 navigation mega menu multilevel header menu footer menu builder drag drop hierarchy links categories layout 1 layout 2 flyout promo banner sec-14-5 14.5 menu item customizer item rename modal need adjust the label existing menu link without deleting and rebuilding martx features dedicated menu item editor modal admin modal mdash edit menu item title item editor full view images menus admin_menu_item_edit_modal.png item editing clicking the 3-dots menu any link item launches this modal rename the link title instantly. renaming item titles"
    },
    {
        "ch": 14,
        "badge": "Ch 14 • Mega Menus",
        "title": "14.6 Drag & Drop Ordering & Live AJAX Serialization",
        "url": "navigation-menus.html#sec-7-6",
        "type": "Section",
        "snippet": "Managing menu sequence in MartX is effortless. The left-hand menu tree integrates an interactive HTML5 Drag-and-Drop Sortable Engine:",
        "keywords": "14.6 drag & drop ordering & live ajax serialization sec-7-6 navigation mega menu multilevel header menu footer menu builder drag drop hierarchy links categories layout 1 layout 2 flyout promo banner sec-14-6 14.6 drag drop ordering live ajax serialization managing menu sequence martx effortless. the left-hand menu tree integrates interactive html5 drag-and-drop sortable engine reordering workflow hover your cursor over any menu item the left list. click and hold the item then drag vertically down your desired sequence position. release the mouse button drop the item place. the engine automatically synchronizes"
    },
    {
        "ch": 14,
        "badge": "Ch 14 • Mega Menus",
        "title": "14.7 Mobile Navigation Sync & Best Practices",
        "url": "navigation-menus.html#sec-7-7",
        "type": "Section",
        "snippet": "A seamless navigation experience directly impacts store conversions. MartX ensures your menus deliver optimal usability across every device:",
        "keywords": "14.7 mobile navigation sync & best practices sec-7-7 navigation mega menu multilevel header menu footer menu builder drag drop hierarchy links categories layout 1 layout 2 flyout promo banner sec-14-7 14.7 mobile navigation sync best practices seamless navigation experience directly impacts store conversions. martx ensures your menus deliver optimal usability across every device automated mobile drawer sync items configured your header top menu and main menu automatically adapt into the responsive mobile offcanvas drawer smartphones and tablets offering smooth touch accordion navigation without duplicate management. recommended item counts keep"
    },
    {
        "ch": 14,
        "badge": "Ch 14 • Mega Menus",
        "title": "14.8 Mega Menu Configuration & Layout Engines (Layout 1 & Layout 2)",
        "url": "navigation-menus.html#sec-7-8",
        "type": "Section",
        "snippet": "In addition to linear header and footer menus, MartX features an enterprise Mega Menu Content Engine located under Website & CMS &rarr; M...",
        "keywords": "14.8 mega menu configuration & layout engines (layout 1 & layout 2) sec-7-8 navigation mega menu multilevel header menu footer menu builder drag drop hierarchy links categories layout 1 layout 2 flyout promo banner sec-14-8 14.8 mega menu configuration layout engines layout layout addition linear header and footer menus martx features enterprise mega menu content engine located under website cms rarr mega menu while chapter theme layouts hub enables you choose your active architectural style layout layout this module provides dedicated context-aware management dashboard for featured categories promotional banners and real-time frontend simulation admin"
    },
    {
        "ch": 15,
        "badge": "Ch 15 • Sliders",
        "title": "Chapter 15: Sliders & Banners",
        "url": "sliders-banners.html",
        "type": "Chapter",
        "snippet": "Complete guide and configuration manual for Chapter 15: Sliders & Banners.",
        "keywords": "sliders & banners chapter 15 hero slider promotional promo banners call to action cta transitions autoplay slide ordering"
    },
    {
        "ch": 15,
        "badge": "Ch 15 • Sliders",
        "title": "Chapter 8: Sliders & Promotional Banners Engine",
        "url": "sliders-banners.html#ch8-intro",
        "type": "Section",
        "snippet": "High-Impact Hero Visual Marketing, Drag-and-Drop Sortable Promo Sliders, and Context-Aware Promotional Offer Banner Architectures.",
        "keywords": "chapter 8: sliders & promotional banners engine ch8-intro hero slider promotional promo banners call to action cta transitions autoplay slide ordering chapter sliders promotional banners engine high-impact hero visual marketing drag-and-drop sortable promo sliders and context-aware promotional offer banner architectures. aspect ratio cinema hero sliders live drag drop sortable.js ajax sync dynamic cta routing pages cats cms urls banner offers home home logic"
    },
    {
        "ch": 15,
        "badge": "Ch 15 • Sliders",
        "title": "8.1 Visual Marketing Engine Architecture",
        "url": "sliders-banners.html#sec-8-1",
        "type": "Section",
        "snippet": "In modern high-conversion e-commerce, the top fold of the storefront dictates customer first impressions and click-through rates (CTR). M...",
        "keywords": "8.1 visual marketing engine architecture sec-8-1 hero slider promotional promo banners call to action cta transitions autoplay slide ordering 8.1 visual marketing engine architecture modern high-conversion e-commerce the top fold the storefront dictates customer first impressions and click-through rates ctr martx separates visual marketing into two distinct high-performance engines hero promo sliders engine homepage hero carousel powers the primary animated hero carousel the very top the homepage. supports multi-slide rotating banners promotional badges e.g. new season drops customizable headlines"
    },
    {
        "ch": 15,
        "badge": "Ch 15 • Sliders",
        "title": "8.2 Sliders Management Workspace",
        "url": "sliders-banners.html#sec-8-2",
        "type": "Section",
        "snippet": "The central slider management table provides store managers with an instant visual inventory of all homepage hero carousels. Admins can v...",
        "keywords": "8.2 sliders management workspace sec-8-2 hero slider promotional promo banners call to action cta transitions autoplay slide ordering 8.2 sliders management workspace the central slider management table provides store managers with instant visual inventory all homepage hero carousels. admins can view banner graphics verify promotional badges inspect subtitle messaging toggle active statuses and initiate 1-click drag-and-drop reordering. admin panel mdash sliders management table slider list view full view images sliders admin_sliders_table.png sliders workspace displays promo slider records with"
    },
    {
        "ch": 15,
        "badge": "Ch 15 • Sliders",
        "title": "8.3 Drag & Drop Sequence Ordering & AJAX Serialization",
        "url": "sliders-banners.html#sec-8-3",
        "type": "Section",
        "snippet": "MartX eliminates tedious numeric order typing. Sliders can be rearranged instantly via native HTML5 Drag-and-Drop powered by Sortable.js:",
        "keywords": "8.3 drag & drop sequence ordering & ajax serialization sec-8-3 hero slider promotional promo banners call to action cta transitions autoplay slide ordering 8.3 drag drop sequence ordering ajax serialization martx eliminates tedious numeric order typing. sliders can rearranged instantly via native html5 drag-and-drop powered sortable.js reordering execution flow click and hold any row the slider table touch the drag handle mobile drag the slider vertically down your desired display rank. release the mouse button drop the slide into place. the system instantly"
    },
    {
        "ch": 15,
        "badge": "Ch 15 • Sliders",
        "title": "8.4 Slider Creation & Edit Workspace",
        "url": "sliders-banners.html#sec-8-4",
        "type": "Section",
        "snippet": "Adding a new hero slider (via Add New Slider) or editing an existing banner (via the table Edit action) features a clean 2-column layout ...",
        "keywords": "8.4 slider creation & edit workspace sec-8-4 hero slider promotional promo banners call to action cta transitions autoplay slide ordering 8.4 slider creation edit workspace adding new hero slider via add new slider editing existing banner via the table edit action features clean 2-column layout dividing text information and visual media admin panel mdash add new slider create form full view images sliders admin_slider_add.png clean blank state form fields initialized with helpful placeholder hints and empty media uploader with ratio"
    },
    {
        "ch": 15,
        "badge": "Ch 15 • Sliders",
        "title": "8.5 Promotional Banner Offers Engine (Banner Offer 1)",
        "url": "sliders-banners.html#sec-8-5",
        "type": "Section",
        "snippet": "In addition to rotating hero sliders, MartX incorporates a dedicated Promotional Banner Offers Module located under Website & CMS &rarr; ...",
        "keywords": "8.5 promotional banner offers engine (banner offer 1) sec-8-5 hero slider promotional promo banners call to action cta transitions autoplay slide ordering 8.5 promotional banner offers engine banner offer addition rotating hero sliders martx incorporates dedicated promotional banner offers module located under website cms rarr banner offers these fixed promotional cards showcase targeted seasonal promotions flash vouchers and category spotlights. admin panel mdash banner offers hub banner offer active offer tab full view images sliders admin_banner_offer_1.png banner offer details configures campaign title"
    },
    {
        "ch": 15,
        "badge": "Ch 15 • Sliders",
        "title": "8.6 Banner Offer 2 & Critical Home 1 vs Home 2 Architectural Rule",
        "url": "sliders-banners.html#sec-8-6",
        "type": "Section",
        "snippet": "Clicking the second pill tab in the banner manager reveals Banner Offer 2. In MartX, Banner Offer 2 is engineered with an intelligent The...",
        "keywords": "8.6 banner offer 2 & critical home 1 vs home 2 architectural rule sec-8-6 hero slider promotional promo banners call to action cta transitions autoplay slide ordering 8.6 banner offer critical home home architectural rule clicking the second pill tab the banner manager reveals banner offer martx banner offer engineered with intelligent theme layout context rule that prevents layout distortions across different homepage designs. admin panel mdash banner offers hub banner offer active offer tab full view images sliders admin_banner_offer_2.png banner offer details features campaign parameters luxury"
    },
    {
        "ch": 15,
        "badge": "Ch 15 • Sliders",
        "title": "8.7 Optimization & Conversion Best Practices",
        "url": "sliders-banners.html#sec-8-7",
        "type": "Section",
        "snippet": "Follow these enterprise design recommendations to achieve optimal page speed performance and maximum customer click-through rates:",
        "keywords": "8.7 optimization & conversion best practices sec-8-7 hero slider promotional promo banners call to action cta transitions autoplay slide ordering 8.7 optimization conversion best practices follow these enterprise design recommendations achieve optimal page speed performance and maximum customer click-through rates webp asset format upload visuals modern webp format. webp delivers smaller file sizes than jpeg with identical visual clarity protecting google pagespeed scores. slides limit avoid carousel bloat. keeping hero sliders between slides maximizes customer attention while keeping first-contentful-paint fcp"
    },
    {
        "ch": 16,
        "badge": "Ch 16 • CMS",
        "title": "Chapter 16: CMS Pages & FAQ",
        "url": "cms-pages.html",
        "type": "Chapter",
        "snippet": "Complete guide and configuration manual for Chapter 16: CMS Pages & FAQ.",
        "keywords": "cms pages & faq chapter 16 about us contact us privacy policy terms conditions faq accordion dynamic slug content builder"
    },
    {
        "ch": 16,
        "badge": "Ch 16 • CMS",
        "title": "Chapter 9: Pages & CMS Engine",
        "url": "cms-pages.html#ch9-intro",
        "type": "Section",
        "snippet": "Dynamic Policy & Custom Page Authoring, Google Gemini AI Content Synthesis, Multi-Block About Us Page Builder, Interactive FAQ Knowledge ...",
        "keywords": "chapter 9: pages & cms engine ch9-intro about us contact us privacy policy terms conditions faq accordion dynamic slug content builder chapter pages cms engine dynamic policy custom page authoring google gemini content synthesis multi-block about page builder interactive faq knowledge base and team leadership showcase. gemini 1-click policy synthesis wysiwyg seo 20k char serp limits live drag drop sortable.js ajax reordering multi-block cms about faq team suite"
    },
    {
        "ch": 16,
        "badge": "Ch 16 • CMS",
        "title": "9.1 Dynamic Custom Pages & Policy Manager",
        "url": "cms-pages.html#sec-9-1",
        "type": "Section",
        "snippet": "Every modern enterprise e-commerce platform requires legal compliance and institutional transparency. The Dynamic Pages Manager allows ad...",
        "keywords": "9.1 dynamic custom pages & policy manager sec-9-1 about us contact us privacy policy terms conditions faq accordion dynamic slug content builder 9.1 dynamic custom pages policy manager every modern enterprise e-commerce platform requires legal compliance and institutional transparency. the dynamic pages manager allows administrators publish and maintain legal policies terms conditions privacy policy shipping return guarantees alongside custom promotional landing pages with automatic seo slug routing and instant live status toggles. admin panel mdash dynamic pages management table pages registry full"
    },
    {
        "ch": 16,
        "badge": "Ch 16 • CMS",
        "title": "9.2 Creating & Editing Pages with Google Gemini AI",
        "url": "cms-pages.html#sec-9-2",
        "type": "Section",
        "snippet": "Drafting comprehensive e-commerce policies like Privacy Policies or Return Guarantees typically requires hours of legal drafting. MartX f...",
        "keywords": "9.2 creating & editing pages with google gemini ai sec-9-2 about us contact us privacy policy terms conditions faq accordion dynamic slug content builder 9.2 creating editing pages with google gemini drafting comprehensive e-commerce policies like privacy policies return guarantees typically requires hours legal drafting. martx features built-in 1-click google gemini policy generator directly integrated into the page authoring canvas. with single click store information synthesized into enterprise-grade legal prose. admin panel mdash create dynamic page with gemini assistant policy generator full view add"
    },
    {
        "ch": 16,
        "badge": "Ch 16 • CMS",
        "title": "9.3 Multi-Block About Us Page Builder",
        "url": "cms-pages.html#sec-9-3",
        "type": "Section",
        "snippet": "Rather than requiring store owners to construct an About Us page using raw HTML, MartX provides a dedicated, multi-block About Us Page Bu...",
        "keywords": "9.3 multi-block about us page builder sec-9-3 about us contact us privacy policy terms conditions faq accordion dynamic slug content builder 9.3 multi-block about page builder rather than requiring store owners construct about page using raw html martx provides dedicated multi-block about page builder this structured interface breaks the public about-us storefront page into cohesive brand storytelling components hero storytelling strategic pillars and dynamic call-to-action cta showroom card. admin panel mdash multi-block about page builder page builder full view about page"
    },
    {
        "ch": 16,
        "badge": "Ch 16 • CMS",
        "title": "9.4 FAQ Knowledge Base & Live Quick View Modal",
        "url": "cms-pages.html#sec-9-4",
        "type": "Section",
        "snippet": "A self-service knowledge base drastically reduces customer support ticket volume. The MartX FAQ Knowledge Base is built on an ultra-effic...",
        "keywords": "9.4 faq knowledge base & live quick view modal sec-9-4 about us contact us privacy policy terms conditions faq accordion dynamic slug content builder 9.4 faq knowledge base live quick view modal self-service knowledge base drastically reduces customer support ticket volume. the martx faq knowledge base built ultra-efficient dual-column split workspace the left side provides sortable questions table with drag-and-drop hierarchy reordering while the right side delivers persistent inline creation form. admin panel mdash faq split management workspace sortable table inline creator faq workspace"
    },
    {
        "ch": 16,
        "badge": "Ch 16 • CMS",
        "title": "9.5 CMS Best Practices & SEO Guidelines",
        "url": "cms-pages.html#sec-9-5",
        "type": "Section",
        "snippet": "To ensure high search visibility, rapid page load speeds, and legal compliance across multiple international jurisdictions, follow these ...",
        "keywords": "9.5 cms best practices & seo guidelines sec-9-5 about us contact us privacy policy terms conditions faq accordion dynamic slug content builder 9.6 cms best practices seo guidelines ensure high search visibility rapid page load speeds and legal compliance across multiple international jurisdictions follow these core architectural guidelines when managing martx cms assets serp strict limits keep meta titles strictly under characters and meta descriptions under 160 characters. martx real-time counters ensure zero truncation google search snippets. mandatory legal quartet every online"
    },
    {
        "ch": 17,
        "badge": "Ch 17 • Editorial",
        "title": "Chapter 17: Blogs & Editorial",
        "url": "blogs-editorial.html",
        "type": "Chapter",
        "snippet": "Complete guide and configuration manual for Chapter 17: Blogs & Editorial.",
        "keywords": "blogs & editorial chapter 17 blog posts articles categories tags comments rich text seo title meta description featured image author"
    },
    {
        "ch": 17,
        "badge": "Ch 17 • Editorial",
        "title": "Chapter 17: Blogs & Editorial Content Publishing",
        "url": "blogs-editorial.html#ch17-intro",
        "type": "Section",
        "snippet": "High-converting blog articles, integrated Google Gemini AI Studio, hierarchical topic taxonomies, rich-media Quill WYSIWYG publishing, an...",
        "keywords": "chapter 17: blogs & editorial content publishing ch17-intro blog posts articles categories tags comments rich text seo title meta description featured image author editorial content hub chapter chapter blogs amp editorial content publishing high-converting blog articles integrated google gemini studio hierarchical topic taxonomies rich-media quill wysiwyg publishing and search engine optimization seo metadata engineering. gemini studio automate long-form article drafting headings practical tips and seo meta tags under seconds using the integrated assistant. quill wysiwyg editor full-featured rich text authoring with video embeds"
    },
    {
        "ch": 17,
        "badge": "Ch 17 • Editorial",
        "title": "17.1 Blog Category Architecture & Split Console",
        "url": "blogs-editorial.html#sec-17-1",
        "type": "Section",
        "snippet": "MartX employs a dual-column split management console for Blog Categories. The left column presents an interactive, searchable category di...",
        "keywords": "17.1 blog category architecture & split console sec-17-1 blog posts articles categories tags comments rich text seo title meta description featured image author 17.1 blog category architecture amp split console martx employs dual-column split management console for blog categories the left column presents interactive searchable category directory with article count badges while the right column houses persistent zero-friction creation panel. admin panel mdash blog category management topic hierarchy amp quick creation category console full view category directory columns amp parameters column field data"
    },
    {
        "ch": 17,
        "badge": "Ch 17 • Editorial",
        "title": "17.2 Editorial Directory & Article Ledger",
        "url": "blogs-editorial.html#sec-17-2",
        "type": "Section",
        "snippet": "The Blog Management Directory provides a centralized control hub for all published stories, seasonal lookbooks, style guides, and custome...",
        "keywords": "17.2 editorial directory & article ledger sec-17-2 blog posts articles categories tags comments rich text seo title meta description featured image author 17.2 editorial directory amp article ledger the blog management directory provides centralized control hub for all published stories seasonal lookbooks style guides and customer tutorials across your digital storefront. admin panel mdash blog management article ledger filter bar amp live telemetry article ledger full view status filtering filter between all blogs active published articles and inactive drafts with instant row"
    },
    {
        "ch": 17,
        "badge": "Ch 17 • Editorial",
        "title": "17.3 Article Creation & Gemini AI Content Studio",
        "url": "blogs-editorial.html#sec-17-3",
        "type": "Section",
        "snippet": "Creating high-quality content at scale is accelerated by the MartX Gemini AI Content Studio. By analyzing your chosen blog category and a...",
        "keywords": "17.3 article creation & gemini ai content studio sec-17-3 blog posts articles categories tags comments rich text seo title meta description featured image author 17.3 article creation amp gemini content studio creating high-quality content scale accelerated the martx gemini content studio analyzing your chosen blog category and article headline the engine drafts publication-ready article and complete seo metadata single click. admin panel mdash add new blog integrated gemini content assistant amp quill wysiwyg studio full view core innovation gemini studio architecture amp execution pipeline"
    },
    {
        "ch": 17,
        "badge": "Ch 17 • Editorial",
        "title": "17.4 Article Revision, Rich Media & Publishing Lifecycle",
        "url": "blogs-editorial.html#sec-17-4",
        "type": "Section",
        "snippet": "Editorial content requires ongoing revisions, image refreshes, and seasonal updates. The Edit Blog interface retains existing content whi...",
        "keywords": "17.4 article revision, rich media & publishing lifecycle sec-17-4 blog posts articles categories tags comments rich text seo title meta description featured image author 17.4 article revision rich media amp publishing lifecycle editorial content requires ongoing revisions image refreshes and seasonal updates. the edit blog interface retains existing content while allowing continuous regeneration via manual copy editing. admin panel mdash edit blog live content revision media thumbnail amp seo counters content revision full view featured image curation the featured image picker interfaces directly with"
    },
    {
        "ch": 17,
        "badge": "Ch 17 • Editorial",
        "title": "17.5 Search Engine Optimization (SEO) & Metadata Engineering",
        "url": "blogs-editorial.html#sec-17-5",
        "type": "Section",
        "snippet": "MartX is engineered for aggressive organic search dominance. Every article includes dedicated metadata fields that feed directly into HTM...",
        "keywords": "17.5 search engine optimization (seo) & metadata engineering sec-17-5 blog posts articles categories tags comments rich text seo title meta description featured image author 17.5 search engine optimization seo amp metadata engineering martx engineered for aggressive organic search dominance. every article includes dedicated metadata fields that feed directly into html header tags and opengraph social preview cards. real-time google serp simulator desktop amp mobile preview martx online store https yourstore.com blogs exclusive-autumn-winter-2026-collection-preview exclusive autumn-winter 2026 collection preview martx journal get exclusive first look our"
    },
    {
        "ch": 17,
        "badge": "Ch 17 • Editorial",
        "title": "17.6 Content Marketing & Editorial Publishing SOP",
        "url": "blogs-editorial.html#sec-17-6",
        "type": "Section",
        "snippet": "To ensure high editorial standards, search visibility, and maximum buyer conversions, marketing teams should execute this 6-step publishi...",
        "keywords": "17.6 content marketing & editorial publishing sop sec-17-6 blog posts articles categories tags comments rich text seo title meta description featured image author 17.6 content marketing amp editorial publishing sop ensure high editorial standards search visibility and maximum buyer conversions marketing teams should execute this 6-step publishing sop for every new story step topic amp category selection navigate add new blog and select active category from the right sidebar dropdown anchor article taxonomy. step headline drafting input compelling search-intent driven headline blog title"
    },
    {
        "ch": 18,
        "badge": "Ch 18 • Community",
        "title": "Chapter 18: Reviews & Messages",
        "url": "customer-interaction.html",
        "type": "Chapter",
        "snippet": "Complete guide and configuration manual for Chapter 18: Reviews & Messages.",
        "keywords": "reviews & messages chapter 18 product reviews ratings star rating contact form inquiries email reply customer management suspension verification"
    },
    {
        "ch": 18,
        "badge": "Ch 18 • Community",
        "title": "Chapter 18: Customer Reviews, Comments & Messages",
        "url": "customer-interaction.html#ch18-intro",
        "type": "Section",
        "snippet": "Product ratings and sentiment telemetry, blog comment approval controls, customer contact inquiry workflows, and Gemini AI-powered email ...",
        "keywords": "chapter 18: customer reviews, comments & messages ch18-intro product reviews ratings star rating contact form inquiries email reply customer management suspension verification customer amp community hub chapter chapter customer reviews comments amp messages product ratings and sentiment telemetry blog comment approval controls customer contact inquiry workflows and gemini ai-powered email response generation. ratings amp sentiment aggregate product ratings 1-5 stars verified purchase badges telemetry metric cards and review moderation workflows. comment moderation granular auto-approval toggle switch spam protection article discussion threads and"
    },
    {
        "ch": 18,
        "badge": "Ch 18 • Community",
        "title": "18.1 Product Reviews & Rating Moderation",
        "url": "customer-interaction.html#sec-18-1",
        "type": "Section",
        "snippet": "Product reviews build essential social proof, boost buyer confidence, and directly influence conversion rates. The Product Reviews Manage...",
        "keywords": "18.1 product reviews & rating moderation sec-18-1 product reviews ratings star rating contact form inquiries email reply customer management suspension verification 18.1 product reviews amp rating moderation product reviews build essential social proof boost buyer confidence and directly influence conversion rates. the product reviews management console features real-time telemetry cards and filtering tools for moderating customer feedback. admin panel mdash product reviews management telemetry cards amp rating ledger reviews engine full view total reviews cumulative lifetime customer testimonials across all products."
    },
    {
        "ch": 18,
        "badge": "Ch 18 • Community",
        "title": "18.2 Blog Discussion & Comment Moderation Engine",
        "url": "customer-interaction.html#sec-18-2",
        "type": "Section",
        "snippet": "Active blog engagement drives organic search rankings and community trust. The Blog Comments console gives administrators full control ov...",
        "keywords": "18.2 blog discussion & comment moderation engine sec-18-2 product reviews ratings star rating contact form inquiries email reply customer management suspension verification 18.2 blog discussion amp comment moderation engine active blog engagement drives organic search rankings and community trust. the blog comments console gives administrators full control over discussion threads with auto-approval safety toggles. admin panel mdash blog comments global auto-approval settings amp comment ledger comments hub full view auto-approval control amp anti-spam strategy enable auto approve for new comments enabled new"
    },
    {
        "ch": 18,
        "badge": "Ch 18 • Community",
        "title": "18.3 Contact Messages & Customer Support Ledger",
        "url": "customer-interaction.html#sec-18-3",
        "type": "Section",
        "snippet": "Shoppers frequently submit inquiries regarding sizing, return windows, B2B wholesale pricing, or international delivery. The Contact Mess...",
        "keywords": "18.3 contact messages & customer support ledger sec-18-3 product reviews ratings star rating contact form inquiries email reply customer management suspension verification 18.3 contact messages amp customer support ledger shoppers frequently submit inquiries regarding sizing return windows b2b wholesale pricing international delivery. the contact messages directory serves centralized help desk ticketing inbox. admin panel mdash contact messages customer inquiries amp status badges messages directory full view status badge visual indicator operational workflow amp help desk state unread unread newly received message requiring"
    },
    {
        "ch": 18,
        "badge": "Ch 18 • Community",
        "title": "18.4 Gemini AI Email Reply Studio & Live HTML Template Preview",
        "url": "customer-interaction.html#sec-18-4",
        "type": "Section",
        "snippet": "MartX pioneers integrated AI customer service. When viewing any contact message, clicking Reply to Message directs the administrator into...",
        "keywords": "18.4 gemini ai email reply studio & live html template preview sec-18-4 product reviews ratings star rating contact form inquiries email reply customer management suspension verification 18.4 gemini email reply studio amp live html template preview martx pioneers integrated customer service. when viewing any contact message clicking reply message directs the administrator into the reply studio featuring one-click draft generation and real-time responsive html email previewing. admin panel mdash reply customer message gemini assistant amp live branded email preview gemini studio full view customer specialist gemini"
    },
    {
        "ch": 18,
        "badge": "Ch 18 • Community",
        "title": "18.5 Newsletter Subscribers & Audience Management",
        "url": "customer-interaction.html#sec-18-5",
        "type": "Section",
        "snippet": "Email marketing delivers the highest ROI in e-commerce. The Newsletters module captures email subscribers from storefront footer forms an...",
        "keywords": "18.5 newsletter subscribers & audience management sec-18-5 product reviews ratings star rating contact form inquiries email reply customer management suspension verification 18.5 newsletter subscribers amp audience management email marketing delivers the highest roi e-commerce. the newsletters module captures email subscribers from storefront footer forms and checkout opt-ins. admin panel mdash newsletters subscriber directory amp one-click csv export audience amp csv full view one-click csv export export clean subscriber lists with timestamp data for immediate import into mailchimp klaviyo brevo sendgrid campaigns."
    },
    {
        "ch": 18,
        "badge": "Ch 18 • Community",
        "title": "18.6 Customer Interaction & Moderation SOP",
        "url": "customer-interaction.html#sec-18-6",
        "type": "Section",
        "snippet": "To maintain 5-star customer satisfaction and ensure brand integrity, customer success agents should execute this daily 5-step Standard Op...",
        "keywords": "18.6 customer interaction & moderation sop sec-18-6 product reviews ratings star rating contact form inquiries email reply customer management suspension verification 18.6 customer interaction amp moderation sop maintain 5-star customer satisfaction and ensure brand integrity customer success agents should execute this daily 5-step standard operating procedure step daily inbox amp review audit review the top-bar notification count for new contact inquiries and check the pending approval metric card product reviews. step review moderation inspect star ratings and feedback text the review"
    },
    {
        "ch": 19,
        "badge": "Ch 19 • Team & Staff",
        "title": "Chapter 19: Team Members & Staff Roles",
        "url": "staff-roles.html",
        "type": "Chapter",
        "snippet": "Complete guide and configuration manual for Chapter 19: Team Members & Staff Roles.",
        "keywords": "team members & staff roles chapter 19 administration settings user management roles permissions spatie rbac super admin store manager invitation password reset 15 minute security audit log"
    },
    {
        "ch": 19,
        "badge": "Ch 19 • Team & Staff",
        "title": "Chapter 19: Team Members, Staff & Granular RBAC Permissions",
        "url": "staff-roles.html#ch19-intro",
        "type": "Section",
        "snippet": "Architecting zero-trust administrative governance with Spatie-powered dynamic permission matrices, team showcase directory, automated sta...",
        "keywords": "chapter 19: multi-staff access & granular rbac permissions ch19-intro spatie rbac roles permissions super admin store manager invitation password reset 15 minute security audit log rbac security matrix chapter chapter multi-staff access amp granular rbac permissions architecting zero-trust administrative governance with spatie-powered dynamic permission matrices team showcase directory automated staff onboarding workflows and email-verified security protocols. granular rbac architecture 129 granular permission nodes across modules with fine-grained view create update and delete matrix controls. automated staff invitations frictionless onboarding with single-use invitation tokens eliminating insecure"
    },
    {
        "ch": 19,
        "badge": "Ch 19 • Team & Staff",
        "title": "19.1 Public Team Showcase & Reorderable Directory",
        "url": "staff-roles.html#sec-19-1",
        "type": "Section",
        "snippet": "The Team Members module manages the public executive and staff profiles featured on your storefront's \"About Us\" and brand storytelling p...",
        "keywords": "19.1 public team showcase & reorderable directory sec-19-1 spatie rbac roles permissions super admin store manager invitation password reset 15 minute security audit log 19.1 public team showcase amp reorderable directory the team members module manages the public executive and staff profiles featured your storefront about and brand storytelling pages. features intuitive split-pane interface live drag-and-drop sortable directory the left and instant creation form the right. admin panel mdash team members public directory amp add form team directory full view live reordering amp member"
    },
    {
        "ch": 19,
        "badge": "Ch 19 • Team & Staff",
        "title": "19.2 Role-Based Access Control (RBAC) Architecture",
        "url": "staff-roles.html#sec-19-2",
        "type": "Section",
        "snippet": "MartX employs an enterprise-grade Multi-Tenant Role Matrix. Instead of hardcoded boolean permissions, access rights are dynamically evalu...",
        "keywords": "19.2 role-based access control (rbac) architecture sec-19-2 spatie rbac roles permissions super admin store manager invitation password reset 15 minute security audit log 19.2 role-based access control rbac architecture martx employs enterprise-grade multi-tenant role matrix instead hardcoded boolean permissions access rights are dynamically evaluated through relational joins between roles permissions and authenticated sessions. admin panel mdash role amp permissions multi-tenant role matrix roles matrix full view system roles classification amp immutability rules the martx kernel strictly partitions roles into protected system roles which"
    },
    {
        "ch": 19,
        "badge": "Ch 19 • Team & Staff",
        "title": "19.3 Granular RBAC Creation, Editing & Audit Matrix",
        "url": "staff-roles.html#sec-19-3",
        "type": "Section",
        "snippet": "MartX exposes a fine-grained permission grid covering over 34 modular domains. Each domain is decomposed into the standard RESTful operat...",
        "keywords": "19.3 granular rbac creation, editing & audit matrix sec-19-3 spatie rbac roles permissions super admin store manager invitation password reset 15 minute security audit log 19.3 granular rbac creation editing amp audit matrix martx exposes fine-grained permission grid covering over modular domains each domain decomposed into the standard restful operational primitives view create update and delete alongside domain-specific actions such reply for customer inquiries. admin panel mdash create custom role module permission checklist permission studio full view workflow provisioning new operational role step role identifier"
    },
    {
        "ch": 19,
        "badge": "Ch 19 • Team & Staff",
        "title": "19.4 System User Directory & Advanced Filtering",
        "url": "staff-roles.html#sec-19-4",
        "type": "Section",
        "snippet": "The User Management hub centralizes both administrative staff and customer accounts. It includes real-time telemetry filters, bulk operat...",
        "keywords": "19.4 system user directory & advanced filtering sec-19-4 spatie rbac roles permissions super admin store manager invitation password reset 15 minute security audit log 19.4 system user directory amp advanced filtering the user management hub centralizes both administrative staff and customer accounts. includes real-time telemetry filters bulk operations verification indicators and account lifecycle controls. admin panel mdash user management multi-tenant accounts amp roles staff directory full view directory header filters amp table data schema control column component type operational functionality all users filter status"
    },
    {
        "ch": 19,
        "badge": "Ch 19 • Team & Staff",
        "title": "19.5 Staff Onboarding, Profile Editing & Password Recovery",
        "url": "staff-roles.html#sec-19-5",
        "type": "Section",
        "snippet": "MartX eliminates the critical security flaw of administrators manually generating and texting passwords to new team members. Instead, the...",
        "keywords": "19.5 staff onboarding, profile editing & password recovery sec-19-5 spatie rbac roles permissions super admin store manager invitation password reset 15 minute security audit log 19.5 staff onboarding profile editing amp password recovery martx eliminates the critical security flaw administrators manually generating and texting passwords new team members. instead the platform features zero-knowledge secure email invitation pipeline admin panel mdash invite amp add team member secure email onboarding staff invitation full view the secure staff onboarding lifecycle when store owner invites new administrator support specialist"
    },
    {
        "ch": 19,
        "badge": "Ch 19 • Team & Staff",
        "title": "19.6 Admin Profile Security & 15-Minute Verification Protocol",
        "url": "staff-roles.html#sec-19-6",
        "type": "Section",
        "snippet": "To protect against physical shoulder-surfing and unattended workstation takeovers, MartX features a Bank-Grade Email-Verified Password Pr...",
        "keywords": "19.6 admin profile security & 15-minute verification protocol sec-19-6 spatie rbac roles permissions super admin store manager invitation password reset 15 minute security audit log 19.6 admin profile security amp 15-minute verification protocol protect against physical shoulder-surfing and unattended workstation takeovers martx features bank-grade email-verified password protocol for all administrative accounts. admin panel mdash account security 15-minute re-authentication protocol profile security full view dual-card architecture amp security protocol card personal information profile image square photo jpg png webp 2mb. old files are automatically purged from"
    },
    {
        "ch": 20,
        "badge": "Ch 20 • Locations",
        "title": "Chapter 20: Locations & Coverage",
        "url": "locations-coverage.html",
        "type": "Chapter",
        "snippet": "Complete guide and configuration manual for Chapter 20: Locations & Coverage.",
        "keywords": "locations & coverage chapter 20 countries states cities delivery areas cloud sync postal code territorial coverage zone pricing"
    },
    {
        "ch": 20,
        "badge": "Ch 20 • Locations",
        "title": "Chapter 20: Geographic Locations & Delivery Coverage Zones",
        "url": "locations-coverage.html#ch20-intro",
        "type": "Section",
        "snippet": "Configuring multi-national delivery zones, 1-click cloud state synchronization, ISO Alpha-2 country standards, interactive province manag...",
        "keywords": "chapter 20: geographic locations & delivery coverage zones ch20-intro countries states cities delivery areas cloud sync postal code territorial coverage zone pricing geographic operations chapter chapter geographic locations amp delivery coverage zones configuring multi-national delivery zones 1-click cloud state synchronization iso alpha-2 country standards interactive province management and dynamic checkout address cascades. 1-click online state sync automated integration with global geo-apis countriesnow.space ingest hundreds states provinces seconds. iso-2 flag standards standard 2-letter uppercase country codes enabling automatic flag rendering and payment gateway"
    },
    {
        "ch": 20,
        "badge": "Ch 20 • Locations",
        "title": "20.1 Location Directory & Interactive State Tag Management",
        "url": "locations-coverage.html#sec-20-1",
        "type": "Section",
        "snippet": "The Location Management master console displays an interactive inventory of all supported countries, their ISO regional codes, and active...",
        "keywords": "20.1 location directory & interactive state tag management sec-20-1 countries states cities delivery areas cloud sync postal code territorial coverage zone pricing 20.1 location directory amp interactive state tag management the location management master console displays interactive inventory all supported countries their iso regional codes and active delivery states. the interface incorporates real-time search and integrated sync states from online cloud tool. admin panel mdash location management country amp state directory locations sync full view master location table schema amp controls column"
    },
    {
        "ch": 20,
        "badge": "Ch 20 • Locations",
        "title": "20.2 Automated 1-Click Online State Synchronization",
        "url": "locations-coverage.html#sec-20-2",
        "type": "Section",
        "snippet": "Manually typing dozens of states, provinces, or prefectures for multiple countries is tedious and error-prone. MartX incorporates a built...",
        "keywords": "20.2 automated 1-click online state synchronization sec-20-2 countries states cities delivery areas cloud sync postal code territorial coverage zone pricing 20.2 automated 1-click online state synchronization manually typing dozens states provinces prefectures for multiple countries tedious and error-prone. martx incorporates built-in 1-click online state synchronization engine powered the global countriesnow.space api. the cloud sync execution pipeline select target country the right-hand sync states from online card choose any registered country from the dropdown list e.g. germany canada australia trigger cloud"
    },
    {
        "ch": 20,
        "badge": "Ch 20 • Locations",
        "title": "20.3 Manual Country & State Provisioning Console",
        "url": "locations-coverage.html#sec-20-3",
        "type": "Section",
        "snippet": "For custom geographic boundaries, territories, or local administrative divisions that may not exist in standard global registries, MartX ...",
        "keywords": "20.3 manual country & state provisioning console sec-20-3 countries states cities delivery areas cloud sync postal code territorial coverage zone pricing 20.3 manual country amp state provisioning console for custom geographic boundaries territories local administrative divisions that may not exist standard global registries martx offers dual-card add new location provisioning screen. admin panel mdash provision new location dual-card country amp state creator territory creator full view card add country create new sovereign country independent delivery territory country name official english name"
    },
    {
        "ch": 20,
        "badge": "Ch 20 • Locations",
        "title": "20.4 Storefront Checkout Cascades & Courier Integration",
        "url": "locations-coverage.html#sec-20-4",
        "type": "Section",
        "snippet": "The locations configured in this module directly govern the checkout experience on your MartX storefront. When a shopper places an order,...",
        "keywords": "20.4 storefront checkout cascades & courier integration sec-20-4 countries states cities delivery areas cloud sync postal code territorial coverage zone pricing 20.4 storefront checkout cascades amp courier integration the locations configured this module directly govern the checkout experience your martx storefront. when shopper places order the address selection flow executes dynamic responsive ajax cascade. checkout address cascade flow customer selects country the shopper chooses their delivery country from your store supported destination list. instant state loading the state province dropdown updates"
    },
    {
        "ch": 20,
        "badge": "Ch 20 • Locations",
        "title": "20.5 International Expansion & Coverage SOP",
        "url": "locations-coverage.html#sec-20-5",
        "type": "Section",
        "snippet": "Follow these enterprise standard operating procedures when expanding your eCommerce store to new international markets or restricting shi...",
        "keywords": "20.5 international expansion & coverage sop sec-20-5 countries states cities delivery areas cloud sync postal code territorial coverage zone pricing 20.5 international expansion amp coverage sop follow these enterprise standard operating procedures when expanding your ecommerce store new international markets restricting shipping during regional logistics disruptions. sop launching new international market verify shipping courier rates and lead times with dhl fedex local logistics partners see chapter couriers amp shipping costs navigate add new location and register the destination country with"
    },
    {
        "ch": 21,
        "badge": "Ch 21 • Settings",
        "title": "Chapter 21: System & Theme Settings",
        "url": "settings-theme.html",
        "type": "Chapter",
        "snippet": "Complete guide and configuration manual for Chapter 21: System & Theme Settings.",
        "keywords": "system & theme settings chapter 21 general settings site title logo favicon currency timezone smtp mail configuration maintenance mode social logins"
    },
    {
        "ch": 21,
        "badge": "Ch 21 • Settings",
        "title": "Chapter 21: Master Settings Hub (Brand, Appearance, Currency & Security)",
        "url": "settings-theme.html#ch21-settings",
        "type": "Section",
        "snippet": "Welcome to the MartX Merchant Cockpit. After completing the initial 5-step installer, your first destination is the System Settings Suite...",
        "keywords": "chapter 21: master settings hub (brand, appearance, currency & security) ch21-settings general settings site title logo favicon currency timezone smtp mail configuration maintenance mode social logins chapter master settings hub brand appearance currency security welcome the martx merchant cockpit after completing the initial 5-step installer your first destination the system settings suite accessible via admin sidebar rarr system settings configure your store branding logos currency format smtp email delivery gemini assistant security shields and license bindings under minutes without writing single line code."
    },
    {
        "ch": 21,
        "badge": "Ch 21 • Settings",
        "title": "21.1 General Settings & Quad-Logo Brand Identity",
        "url": "settings-theme.html#sec-21-1",
        "type": "Section",
        "snippet": "Navigate to: Admin Sidebar &rarr; System Settings &rarr; \"General Settings\" (Tab). This panel manages your core brand metadata, regional ...",
        "keywords": "21.1 general settings & quad-logo brand identity sec-21-1 general settings site title logo favicon currency timezone smtp mail configuration maintenance mode social logins 21.1 general settings quad-logo brand identity navigate admin sidebar rarr system settings rarr general settings tab this panel manages your core brand metadata regional timezones contact information dynamic copyright footer and all official storefront logos via the martx reusable media library. admin panel mdash general settings brand identity tab live view full view images settings admin_settings_general.png general settings workspace live"
    },
    {
        "ch": 21,
        "badge": "Ch 21 • Settings",
        "title": "21.2 Theme & Appearance Hub (Typography, 9 Luxury Color Skins & Social Links)",
        "url": "settings-theme.html#sec-21-2",
        "type": "Section",
        "snippet": "Navigate to: Admin Sidebar &rarr; System Settings &rarr; \"Theme & Appearance\" (Tab). MartX eliminates custom CSS coding by providing 7 Cu...",
        "keywords": "21.2 theme & appearance hub (typography, 9 luxury color skins & social links) sec-21-2 general settings site title logo favicon currency timezone smtp mail configuration maintenance mode social logins 21.2 theme appearance hub typography luxury color skins social links navigate admin sidebar rarr system settings rarr theme appearance tab martx eliminates custom css coding providing curated google typography presets one-click luxury color skins plus full custom hex mode customer dark light mode switcher aos scroll animation guard and precision hex color pickers. admin panel mdash theme appearance customizer tab"
    },
    {
        "ch": 21,
        "badge": "Ch 21 • Settings",
        "title": "21.3 System Configuration, Global Currency Engine, Storage Symlink & Clear Cache",
        "url": "settings-theme.html#sec-21-3",
        "type": "Section",
        "snippet": "Navigate to: Admin Sidebar &rarr; System Settings &rarr; \"System Configuration\" (Tab). Controls regional price formatting, decimal precis...",
        "keywords": "21.3 system configuration, global currency engine, storage symlink & clear cache clear cache cache clear optimize optimize clear purge cache flush cache server utilities sec-21-3 general settings site title logo favicon currency timezone smtp mail configuration maintenance mode social logins 21.3 system configuration global currency engine storage symlink navigate admin sidebar rarr system settings rarr system configuration tab controls regional price formatting decimal precision symbol positioning third-party conversion tracking facebook pixel google analytics google map iframe embedding and standalone 1-click public storage symlink repair utility admin panel mdash system configuration currency engine tab global engine full view images settings admin_settings_system.png"
    },
    {
        "ch": 21,
        "badge": "Ch 21 • Settings",
        "title": "21.4 SMTP Mail Server Setup & Port Matching Blueprints",
        "url": "settings-theme.html#sec-21-4",
        "type": "Section",
        "snippet": "Navigate to: Admin Sidebar &rarr; System Settings &rarr; \"Mail Settings\" (Tab). Reliable email delivery is vital for customer order recei...",
        "keywords": "21.4 smtp mail server setup & port matching blueprints sec-21-4 general settings site title logo favicon currency timezone smtp mail configuration maintenance mode social logins 21.4 smtp mail server setup port matching blueprints navigate admin sidebar rarr system settings rarr mail settings tab reliable email delivery vital for customer order receipts 2fa login verification codes and password resets. martx provides built-in blueprints for cpanel webmail personal gmail and transactional relay gateways brevo resend mailgun admin panel mdash smtp mail server configuration tab smtp relay full"
    },
    {
        "ch": 21,
        "badge": "Ch 21 • Settings",
        "title": "21.5 Google Gemini AI Shopping Assistant & WhatsApp Live Hub",
        "url": "settings-theme.html#sec-21-5",
        "type": "Section",
        "snippet": "Navigate to: Admin Sidebar &rarr; System Settings &rarr; \"AI & Live Chat\" (Tab). Enables an autonomous 24/7 AI shopping assistant powered...",
        "keywords": "21.5 google gemini ai shopping assistant & whatsapp live hub sec-21-5 general settings site title logo favicon currency timezone smtp mail configuration maintenance mode social logins 21.5 google gemini shopping assistant whatsapp live hub navigate admin sidebar rarr system settings rarr live chat tab enables autonomous shopping assistant powered google gemini 1.5 flash free tier with zero credit card required and 1-click whatsapp live agent support widget. admin panel mdash google gemini whatsapp live hub tab gemini whatsapp full view images settings admin_settings_ai_chat.png live chat workspace"
    },
    {
        "ch": 21,
        "badge": "Ch 21 • Settings",
        "title": "21.6 Security & Access Shield (URL Obfuscation, 2FA & Rate Limiting)",
        "url": "settings-theme.html#sec-21-6",
        "type": "Section",
        "snippet": "Navigate to: Admin Sidebar &rarr; System Settings &rarr; \"Security & Access\" (Tab) (Super Admin Exclusive). Provides multi-layered defens...",
        "keywords": "21.6 security & access shield (url obfuscation, 2fa & rate limiting) sec-21-6 general settings site title logo favicon currency timezone smtp mail configuration maintenance mode social logins 21.6 security access shield url obfuscation 2fa rate limiting navigate admin sidebar rarr system settings rarr security access tab super admin exclusive provides multi-layered defense including custom admin url prefix obfuscation 2fa email verification with smtp pre-flight handshake single-use emergency backup recovery codes and brute-force account lockout protection. admin panel mdash security access shield tab security shield full view images"
    },
    {
        "ch": 21,
        "badge": "Ch 21 • Settings",
        "title": "21.7 In-Dashboard License Suite & Key Re-binding to New Domain",
        "url": "settings-theme.html#sec-21-7",
        "type": "Section",
        "snippet": "Navigate to: Admin Sidebar &rarr; System Settings &rarr; \"License & Verification\" (Tab) (Super Admin Exclusive). Allows you to review you...",
        "keywords": "21.7 in-dashboard license suite & key re-binding to new domain sec-21-7 general settings site title logo favicon currency timezone smtp mail configuration maintenance mode social logins 21.7 in-dashboard license suite key re-binding new domain navigate admin sidebar rarr system settings rarr license verification tab super admin exclusive allows you review your verified purchase credentials switch license keys deactivate license execute automated 1-click license key re-binding migration new domain via official email authorization. admin panel mdash license manager domain binding tab domain protection full view images settings"
    },
    {
        "ch": 22,
        "badge": "Ch 22 • Cron & FAQ",
        "title": "Chapter 22: Web Cron & FAQ",
        "url": "cron-faq.html",
        "type": "Chapter",
        "snippet": "Complete guide and configuration manual for Chapter 22: Web Cron & FAQ.",
        "keywords": "web cron & faq chapter 22 web cron automated tasks cpanel cron command 1 minute scheduler expired orders cache clear knowledge base"
    },
    {
        "ch": 22,
        "badge": "Ch 22 • Cron & FAQ",
        "title": "Chapter 22: Web Cron Automation & Frequently Asked Questions",
        "url": "cron-faq.html#ch22-intro",
        "type": "Section",
        "snippet": "Automating background store maintenance, scheduled stock reconciliation, zero-code cloud web cron configuration, and the official merchan...",
        "keywords": "chapter 22: web cron automation & frequently asked questions ch22-intro web cron automated tasks cpanel cron command 1 minute scheduler expired orders cache clear knowledge base automation amp faq chapter master reference chapter web cron automation amp frequently asked questions automating background store maintenance scheduled stock reconciliation zero-code cloud web cron configuration and the official merchant troubleshooting knowledge base. automated background tasks cancels abandoned unpaid orders releases locked inventory stock and keeps your store catalog running smoothly zero-code cloud web cron server terminal ssh commands needed."
    },
    {
        "ch": 22,
        "badge": "Ch 22 • Cron & FAQ",
        "title": "22.1 What Background Tasks Do for Your Store",
        "url": "cron-faq.html#sec-22-1",
        "type": "Section",
        "snippet": "When customers initiate an online payment via Stripe or payment gateways, MartX temporarily holds the product inventory to prevent overse...",
        "keywords": "22.1 what background tasks do for your store sec-22-1 web cron automated tasks cpanel cron command 1 minute scheduler expired orders cache clear knowledge base 22.1 what background tasks for your store when customers initiate online payment via stripe payment gateways martx temporarily holds the product inventory prevent overselling. the buyer abandons checkout closes their browser the background task engine automatically restores stock availability. key automation responsibilities cancelling abandoned unpaid orders automatically scans for pending orders that have exceeded payment expiration windows marks them cancelled"
    },
    {
        "ch": 22,
        "badge": "Ch 22 • Cron & FAQ",
        "title": "22.2 Method A: Standard cPanel Scheduled Task Setup",
        "url": "cron-faq.html#sec-22-2",
        "type": "Section",
        "snippet": "If your store is hosted on a standard cPanel hosting server (e.g. Namecheap, Bluehost, Hostinger, Siteground, cPanel VPS), follow this si...",
        "keywords": "22.2 method a: standard cpanel scheduled task setup sec-22-2 web cron automated tasks cpanel cron command 1 minute scheduler expired orders cache clear knowledge base 22.2 method standard cpanel scheduled task setup your store hosted standard cpanel hosting server e.g. namecheap bluehost hostinger siteground cpanel vps follow this simple 4-step walkthrough step-by-step cpanel configuration log into your hosting cpanel navigate your hosting client portal and open the cpanel dashboard for your domain. find cron jobs the search box the top cpanel type cron jobs and"
    },
    {
        "ch": 22,
        "badge": "Ch 22 • Cron & FAQ",
        "title": "22.3 Method B: Zero-Code Cloud Web Cron Setup (No Terminal Needed)",
        "url": "cron-faq.html#sec-22-3",
        "type": "Section",
        "snippet": "If your hosting plan does not include cPanel cron jobs, or if you prefer a completely visual, zero-code setup, MartX features a dedicated...",
        "keywords": "22.3 method b: zero-code cloud web cron setup (no terminal needed) sec-22-3 web cron automated tasks cpanel cron command 1 minute scheduler expired orders cache clear knowledge base 22.3 method zero-code cloud web cron setup terminal needed your hosting plan does not include cpanel cron jobs you prefer completely visual zero-code setup martx features dedicated secure web cron endpoint your secure store web cron url martx includes protected web url that safely executes background tasks when visited. simply copy your store web cron link web cron trigger url"
    },
    {
        "ch": 22,
        "badge": "Ch 22 • Cron & FAQ",
        "title": "22.4 Frequently Asked Questions & Troubleshooting Knowledge Base",
        "url": "cron-faq.html#sec-22-4",
        "type": "Section",
        "snippet": "Quick, authoritative answers to the most common questions and operational scenarios encountered by store owners and administrators:",
        "keywords": "22.4 frequently asked questions & troubleshooting knowledge base sec-22-4 web cron automated tasks cpanel cron command 1 minute scheduler expired orders cache clear knowledge base 22.4 frequently asked questions amp troubleshooting knowledge base quick authoritative answers the most common questions and operational scenarios encountered store owners and administrators why are product images logos showing broken thumbnails after installation server migration cause shared hosting the connection between the private storage folder and the public web directory known the storage symlink can get disconnected during server migrations"
    },
    {
        "ch": 22,
        "badge": "Ch 22 • Cron & FAQ",
        "title": "22.5 Merchant Operations & Periodic Maintenance SOP",
        "url": "cron-faq.html#sec-22-5",
        "type": "Section",
        "snippet": "Adhere to these best-practice routines to keep your MartX eCommerce store secure, high-performing, and reliable:",
        "keywords": "22.5 merchant operations & periodic maintenance sop sec-22-5 web cron automated tasks cpanel cron command 1 minute scheduler expired orders cache clear knowledge base 22.5 merchant operations amp periodic maintenance sop adhere these best-practice routines keep your martx ecommerce store secure high-performing and reliable weekly amp monthly maintenance checklist frequency action item recommended operational procedure daily automation background tasks run ensure your cpanel cron cloud web cron pinging the store every 1-5 minutes auto-cancel abandoned unpaid orders. weekly review customer inquiries amp reviews moderate"
    },
    {
        "ch": 23,
        "badge": "Ch 23 • Security & Speed",
        "title": "Chapter 23: Extra Security & Speed Boost (Cloudflare Edge & CDN)",
        "url": "extra-security-speed.html#ch23-intro",
        "type": "Chapter",
        "snippet": "Elevate your MartX e-commerce storefront into an enterprise digital fortress with Cloudflare edge shield, DDoS protection, and sub-50ms loading.",
        "keywords": "chapter 23 extra security speed boost cloudflare cdn edge shield ddos protection free wildcard ssl origin ip hidden early hints bot fight mode http3 quic"
    },
    {
        "ch": 23,
        "badge": "Ch 23 • Security & Speed",
        "title": "23.1 High-Impact Advantages: What You Gain",
        "url": "extra-security-speed.html#sec-23-1",
        "type": "Section",
        "snippet": "Origin IP concealment, sub-50ms edge caching, universal wildcard SSL, zero server overload, and automated bot mitigation.",
        "keywords": "23.1 high-impact advantages what you gain origin ip concealment sub-50ms edge caching universal wildcard ssl zero server overload bot mitigation reverse proxy"
    },
    {
        "ch": 23,
        "badge": "Ch 23 • Security & Speed",
        "title": "23.3 DNS Records & The Critical Mail Shield",
        "url": "extra-security-speed.html#sec-23-3",
        "type": "Section",
        "snippet": "Configuring Orange Cloud for web assets vs Grey Cloud (DNS only) for mail and ftp to prevent broken store notification emails.",
        "keywords": "23.3 dns records critical mail shield orange cloud proxied grey cloud dns only cname mail mx record prevent email downtime"
    },
    {
        "ch": 23,
        "badge": "Ch 23 • Security & Speed",
        "title": "23.5 Military-Grade SSL/TLS & HTTPS Force",
        "url": "extra-security-speed.html#sec-23-5",
        "type": "Section",
        "snippet": "Configuring Full or Full (Strict) SSL encryption mode, Always Use HTTPS, and TLS 1.2/1.3 without redirect loops.",
        "keywords": "23.5 military-grade ssl tls https force encryption full full strict always use https err_too_many_redirects tls 1.2 tls 1.3"
    },
    {
        "ch": 23,
        "badge": "Ch 23 • Security & Speed",
        "title": "23.6 2026+ Next-Gen Speed Acceleration",
        "url": "extra-security-speed.html#sec-23-6",
        "type": "Section",
        "snippet": "Activating Early Hints, Cloudflare Fonts, HTTP/3 with QUIC, and 0-RTT connection resumption for sub-50ms loading.",
        "keywords": "23.6 2026+ next-gen speed acceleration early hints 103 early hints cloudflare fonts http3 quic 0-rtt connection resumption"
    },
    {
        "ch": 23,
        "badge": "Ch 23 • Security & Speed",
        "title": "Thank You for Choosing MartX!",
        "url": "extra-security-speed.html#thank-you-welcome",
        "type": "Section",
        "snippet": "Welcome to the MartX commerce ecosystem. You have successfully explored all 23 chapters of the official enterprise guide. Your store is primed for sales.",
        "keywords": "thank you for choosing martx! thank-you-welcome 5-star review whatsapp support email support suman chandra dev sharma all 23 chapters complete"
    }
];

    const searchInput = document.getElementById('docGlobalSearch');
    const searchResultsContainer = document.getElementById('docSearchResults');
    const searchModal = document.getElementById('searchModal');
    let bsSearchModal = null;
    
    if (searchModal && typeof bootstrap !== 'undefined') {
        bsSearchModal = new bootstrap.Modal(searchModal);
        searchModal.addEventListener('shown.bs.modal', () => {
            searchInput?.focus();
            if (!searchInput?.value.trim()) {
                renderSearchEmptyState();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            if (bsSearchModal) {
                bsSearchModal.show();
            } else if (searchInput) {
                searchInput.focus();
            }
        }
    });

    function escapeHtml(text) {
        if (!text) return '';
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }

    function highlightMatches(text, query) {
        if (!query || !text) return escapeHtml(text);
        const words = query.trim().split(/\s+/).filter(w => w.length > 0).map(w => w.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
        if (words.length === 0) return escapeHtml(text);
        const regex = new RegExp('(' + words.join('|') + ')', 'gi');
        return escapeHtml(text).replace(regex, '<mark class="bg-warning-subtle text-dark px-1 py-0 rounded fw-semibold">$1</mark>');
    }

    function renderSearchEmptyState() {
        if (!searchResultsContainer) return;
        searchResultsContainer.innerHTML = `
            <div class="p-4 text-center">
                <div class="d-inline-flex align-items-center justify-content-center bg-primary-subtle text-primary rounded-circle mb-3" style="width: 52px; height: 52px;">
                    <i class="mdi mdi-text-search fs-3"></i>
                </div>
                <h6 class="fw-bold text-heading mb-1">Universal Search Across All 22 Chapters</h6>
                <p class="small text-muted mb-3" style="max-width: 480px; margin: 0 auto;">
                    Instant live search covering all 22 chapters, 200+ detailed subsections, configurations, and API blueprints.
                </p>
                <div class="d-flex flex-wrap align-items-center justify-content-center gap-1">
                    <span class="text-muted extra-small me-1">Suggested:</span>
                    <button type="button" class="btn btn-sm btn-outline-secondary py-0 px-2 rounded-pill search-quick-tag" data-query="bKash" style="font-size: 11px;">bKash</button>
                    <button type="button" class="btn btn-sm btn-outline-secondary py-0 px-2 rounded-pill search-quick-tag" data-query="Stripe" style="font-size: 11px;">Stripe</button>
                    <button type="button" class="btn btn-sm btn-outline-secondary py-0 px-2 rounded-pill search-quick-tag" data-query="cPanel" style="font-size: 11px;">cPanel Wizard</button>
                    <button type="button" class="btn btn-sm btn-outline-secondary py-0 px-2 rounded-pill search-quick-tag" data-query="Cron" style="font-size: 11px;">Web Cron</button>
                    <button type="button" class="btn btn-sm btn-outline-secondary py-0 px-2 rounded-pill search-quick-tag" data-query="Roles" style="font-size: 11px;">RBAC &amp; Roles</button>
                    <button type="button" class="btn btn-sm btn-outline-secondary py-0 px-2 rounded-pill search-quick-tag" data-query="License" style="font-size: 11px;">License Shield</button>
                    <button type="button" class="btn btn-sm btn-outline-secondary py-0 px-2 rounded-pill search-quick-tag" data-query="Theme Layouts" style="font-size: 11px;">Theme Layouts</button>
                    <button type="button" class="btn btn-sm btn-outline-secondary py-0 px-2 rounded-pill search-quick-tag" data-query="Steadfast" style="font-size: 11px;">Steadfast Courier</button>
                    <button type="button" class="btn btn-sm btn-outline-secondary py-0 px-2 rounded-pill search-quick-tag" data-query="SMTP" style="font-size: 11px;">SMTP Mail</button>
                </div>
            </div>
        `;

        searchResultsContainer.querySelectorAll('.search-quick-tag').forEach(btn => {
            btn.addEventListener('click', () => {
                const q = btn.getAttribute('data-query');
                if (searchInput && q) {
                    searchInput.value = q;
                    searchInput.dispatchEvent(new Event('input', { bubbles: true }));
                    searchInput.focus();
                }
            });
        });
    }

    if (searchInput && searchResultsContainer) {
        // Initial render
        renderSearchEmptyState();

        let searchDebounceTimer = null;

        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchDebounceTimer);
            searchDebounceTimer = setTimeout(() => {
                const query = e.target.value.trim();
                if (!query) {
                    renderSearchEmptyState();
                    return;
                }

                const qLower = query.toLowerCase();
                const words = qLower.split(/\s+/).filter(Boolean);

                const scoredMatches = [];

                DOCS_SEARCH_INDEX.forEach(item => {
                    let score = 0;
                    const titleLower = item.title.toLowerCase();
                    const kwLower = item.keywords.toLowerCase();
                    const snipLower = item.snippet.toLowerCase();

                    // 1. Exact query match in title (top priority)
                    if (titleLower.includes(qLower)) score += 60;
                    // 2. Exact match in keywords/tags
                    if (kwLower.includes(qLower)) score += 30;

                    // 3. Multi-word individual hits
                    words.forEach(w => {
                        if (titleLower.includes(w)) score += 20;
                        if (kwLower.includes(w)) score += 12;
                        if (snipLower.includes(w)) score += 5;
                    });

                    // 4. Boost for Chapter Master overview
                    if (item.type === 'Chapter' && (titleLower.includes(qLower) || kwLower.includes(qLower))) {
                        score += 15;
                    }

                    if (score > 0) {
                        scoredMatches.push({ ...item, score });
                    }
                });

                scoredMatches.sort((a, b) => b.score - a.score);
                const topResults = scoredMatches.slice(0, 10);

                if (topResults.length === 0) {
                    searchResultsContainer.innerHTML = `
                        <div class="p-4 text-center text-muted">
                            <i class="mdi mdi-file-question-outline fs-1 text-muted opacity-50 mb-2"></i>
                            <h6 class="fw-bold mb-1">No results found for "<strong>${escapeHtml(query)}</strong>"</h6>
                            <p class="small mb-0">Try searching for keywords like <em>bKash</em>, <em>cPanel</em>, <em>Cron</em>, <em>Permissions</em>, or <em>License</em>.</p>
                        </div>
                    `;
                    return;
                }

                let html = `
                    <div class="p-2 px-3 bg-light border-bottom d-flex align-items-center justify-content-between">
                        <small class="text-muted fw-bold font-monospace" style="font-size: 11px;">
                            FOUND ${scoredMatches.length} RESULTS ACROSS 22 CHAPTERS
                        </small>
                        <small class="text-muted" style="font-size: 11px;">Showing top ${topResults.length}</small>
                    </div>
                    <div class="list-group list-group-flush">
                `;

                topResults.forEach(res => {
                    const iconClass = CHAPTER_ICONS[res.ch] || 'mdi-book-open-page-variant';
                    html += `
                        <a href="${res.url}" class="list-group-item list-group-item-action py-3 px-3 search-result-item d-flex align-items-start gap-3 border-bottom" data-bs-dismiss="modal">
                            <div class="rounded-3 bg-primary-subtle text-primary p-2 flex-shrink-0 mt-1 d-flex align-items-center justify-content-center" style="width: 38px; height: 38px;">
                                <i class="mdi ${iconClass} fs-5"></i>
                            </div>
                            <div class="flex-grow-1 min-w-0">
                                <div class="d-flex flex-wrap align-items-center justify-content-between gap-1 mb-1">
                                    <h6 class="mb-0 text-heading fw-bold fs-6 text-truncate">${highlightMatches(res.title, query)}</h6>
                                    <span class="badge bg-primary text-white font-monospace" style="font-size: 10px;">${escapeHtml(res.badge)}</span>
                                </div>
                                <p class="small text-muted mb-1 text-truncate-2" style="font-size: 12.5px; line-height: 1.45;">${highlightMatches(res.snippet, query)}</p>
                                <div class="d-flex align-items-center gap-2 font-monospace text-primary" style="font-size: 11px;">
                                    <span><i class="mdi mdi-link-variant me-1"></i>${escapeHtml(res.url)}</span>
                                </div>
                            </div>
                        </a>
                    `;
                });

                html += '</div>';
                searchResultsContainer.innerHTML = html;

                // Smooth internal anchor scroll if result is on current page
                searchResultsContainer.querySelectorAll('.search-result-item').forEach(item => {
                    item.addEventListener('click', (ev) => {
                        const targetUrl = item.getAttribute('href');
                        if (bsSearchModal) bsSearchModal.hide();

                        if (targetUrl && targetUrl.includes('#')) {
                            const [targetPage, anchor] = targetUrl.split('#');
                            const currentPath = window.location.pathname;
                            const isSamePage = currentPath.endsWith(targetPage) || (targetPage === 'index.html' && (currentPath.endsWith('/') || currentPath.endsWith('index.html')));
                            
                            if (isSamePage) {
                                ev.preventDefault();
                                const targetEl = document.getElementById(anchor);
                                if (targetEl) {
                                    targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                    history.pushState(null, null, '#' + anchor);
                                }
                            }
                        }
                    });
                });
            }, 50);
        });
    }

    // 4. Scroll-Spy & Active TOC Highlighting
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -70% 0px',
        threshold: 0
    };

    const sections = document.querySelectorAll('.doc-section, .doc-subsection');
    const tocLinks = document.querySelectorAll('.doc-toc-link');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                tocLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(sec => observer.observe(sec));

    // 5. Interactive Marketplace Mockup Tabs (Chapter 4 & Chapter 3)
    const marketplaceMetadata = {
        codecanyon: {
            title: 'CodeCanyon',
            label: 'Envato Purchase Code',
            icon: 'mdi-shopping-outline',
            value: '94a12b8c-55e1-4c12-88f1-22e89fa6b301',
            placeholder: 'e.g., 94b1a45e-4501-4475-b6d8-XXXXXXXXXXXX',
            help: 'Found in your CodeCanyon Downloads &gt; License Certificate &amp; Purchase Code PDF.'
        },
        codester: {
            title: 'Codester',
            label: 'Codester Order ID',
            icon: 'mdi-storefront-outline',
            value: 'COD-9842107',
            placeholder: 'e.g., COD-1234567',
            help: 'Found in your Codester User Dashboard &gt; Purchases &gt; View Order Details.'
        },
        templatemonster: {
            title: 'TemplateMonster',
            label: 'TemplateMonster Order / Invoice ID',
            icon: 'mdi-palette-swatch-outline',
            value: 'TM-INV-49281',
            placeholder: 'e.g., TM-INV-88219',
            help: 'Found in your TemplateMonster Account &gt; Order History &gt; Item Invoice / Download Details.'
        },
        direct: {
            title: 'Direct / B2B',
            label: 'MartX Author License Key',
            icon: 'mdi-shield-check-outline',
            value: 'MARTX-DIRECT-ENTERPRISE-2026-X99',
            placeholder: 'e.g., MARTX-DIRECT-XXXX-XXXX',
            help: 'Received directly via official email from lead author Suman Chandra Dev Sharma (sumondav444@gmail.com).'
        }
    };

    function initMarketplaceTabs(gridSelector, labelSelector, inputSelector, helpSelector, iconSelector) {
        const grid = document.querySelector(gridSelector);
        if (!grid) return;

        const cards = grid.querySelectorAll('.admin-market-card, .mockup-market-card');
        const labelEl = document.querySelector(labelSelector);
        const inputEl = document.querySelector(inputSelector);
        const helpEl = document.querySelector(helpSelector);
        const iconEl = document.querySelector(iconSelector);

        cards.forEach(card => {
            card.addEventListener('click', () => {
                const channel = card.getAttribute('data-channel');
                if (!channel || !marketplaceMetadata[channel]) return;

                const meta = marketplaceMetadata[channel];

                // Update active/selected classes
                cards.forEach(c => {
                    c.classList.remove('active', 'selected');
                    const cIcon = c.querySelector('.market-card-icon, i');
                    const cTitle = c.querySelector('.market-card-title, strong');
                    if (cIcon) {
                        cIcon.classList.remove('text-primary');
                        cIcon.classList.add('text-muted');
                    }
                    if (cTitle) {
                        cTitle.classList.remove('text-primary');
                        cTitle.classList.add('text-heading');
                    }
                });

                card.classList.add(card.classList.contains('mockup-market-card') ? 'selected' : 'active');
                const activeIcon = card.querySelector('.market-card-icon, i');
                const activeTitle = card.querySelector('.market-card-title, strong');
                if (activeIcon) {
                    activeIcon.classList.remove('text-muted');
                    activeIcon.classList.add('text-primary');
                }
                if (activeTitle) {
                    activeTitle.classList.remove('text-heading');
                    activeTitle.classList.add('text-primary');
                }

                // Smooth update on input field
                if (inputEl) {
                    inputEl.style.transition = 'opacity 0.15s ease';
                    inputEl.style.opacity = '0.3';
                    setTimeout(() => {
                        inputEl.value = meta.value;
                        inputEl.placeholder = meta.placeholder;
                        inputEl.style.opacity = '1';
                    }, 120);
                }

                if (labelEl) {
                    labelEl.innerHTML = `${meta.label} <span class="text-danger">*</span>`;
                }

                if (helpEl) {
                    helpEl.innerHTML = meta.help;
                }

                if (iconEl) {
                    iconEl.className = `mdi ${meta.icon} text-primary`;
                }
            });
        });
    }

    initMarketplaceTabs('#docMarketGrid', '#docFieldLabel', '#docFieldInput', '#docFieldHelp', '#docFieldIcon');
    initMarketplaceTabs('#installerStep3MarketGrid', '#installerFieldLabel', '#installerFieldInput', '#installerFieldHelp', '#installerFieldIcon');

    // Interactive button simulations in Chapter 4 modal preview
    const mockActivateBtn = document.getElementById('mockActivateBtn');
    const mockCancelBtn = document.getElementById('mockCancelBtn');

    if (mockActivateBtn) {
        mockActivateBtn.addEventListener('click', () => {
            const originalHtml = mockActivateBtn.innerHTML;
            mockActivateBtn.disabled = true;
            mockActivateBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-1" role="status"></span> Verifying...';

            setTimeout(() => {
                mockActivateBtn.classList.remove('btn-primary');
                mockActivateBtn.classList.add('btn-success');
                mockActivateBtn.innerHTML = '<i class="mdi mdi-check-circle me-1"></i> Verified & Activated!';

                setTimeout(() => {
                    mockActivateBtn.classList.remove('btn-success');
                    mockActivateBtn.classList.add('btn-primary');
                    mockActivateBtn.innerHTML = originalHtml;
                    mockActivateBtn.disabled = false;
                }, 2200);
            }, 550);
        });
    }

    if (mockCancelBtn) {
        mockCancelBtn.addEventListener('click', () => {
            const defaultCard = document.querySelector('#docMarketGrid [data-channel="codecanyon"]');
            if (defaultCard) defaultCard.click();
        });
    }

    // ================= 🖼️ PREMIER LIGHTBOX MODAL (DISTRACTION-FREE ZOOM) =================
    let lightboxModal = document.getElementById('docLightboxModal');
    if (!lightboxModal) {
        lightboxModal = document.createElement('div');
        lightboxModal.className = 'doc-lightbox-modal';
        lightboxModal.id = 'docLightboxModal';
        lightboxModal.setAttribute('aria-hidden', 'true');
        lightboxModal.setAttribute('role', 'dialog');
        lightboxModal.setAttribute('aria-label', 'Image Lightbox Preview');
        lightboxModal.innerHTML = `
            <div class="doc-lightbox-header">
                <div class="doc-lightbox-title" id="docLightboxTitle">
                    <i class="mdi mdi-image-search-outline text-primary me-1 fs-5"></i>
                    <span class="text-truncate">Preview</span>
                </div>
                <div class="doc-lightbox-actions">
                    <a href="#" id="docLightboxNewTab" target="_blank" class="badge bg-light text-dark border text-decoration-none py-1 px-2" title="Open uncompressed image in new tab">
                        <i class="mdi mdi-open-in-new me-1"></i> Original Tab
                    </a>
                    <button type="button" class="doc-lightbox-btn-close" id="docLightboxClose" aria-label="Close Lightbox" title="Close (Esc)">
                        <i class="mdi mdi-close"></i>
                    </button>
                </div>
            </div>
            <div class="doc-lightbox-body" id="docLightboxBody" title="Click outside to close">
                <img src="" alt="" class="doc-lightbox-image" id="docLightboxImg" />
            </div>
        `;
        document.body.appendChild(lightboxModal);
    }

    const lightboxImg = document.getElementById('docLightboxImg');
    const lightboxTitleSpan = document.querySelector('#docLightboxTitle span');
    const lightboxNewTab = document.getElementById('docLightboxNewTab');
    const lightboxCloseBtn = document.getElementById('docLightboxClose');
    const lightboxBody = document.getElementById('docLightboxBody');

    function openLightbox(imgSrc, title) {
        if (!lightboxModal || !lightboxImg) return;
        lightboxImg.src = imgSrc;
        lightboxImg.alt = title || 'Full Resolution Preview';
        if (lightboxTitleSpan) {
            lightboxTitleSpan.textContent = title || 'Full Resolution Preview';
        }
        if (lightboxNewTab) {
            lightboxNewTab.href = imgSrc;
        }
        lightboxModal.classList.add('is-open');
        lightboxModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        if (!lightboxModal) return;
        lightboxModal.classList.remove('is-open');
        lightboxModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    if (lightboxCloseBtn) {
        lightboxCloseBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeLightbox();
        });
    }

    if (lightboxBody) {
        lightboxBody.addEventListener('click', (e) => {
            if (e.target === lightboxBody) {
                closeLightbox();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightboxModal.classList.contains('is-open')) {
            closeLightbox();
        }
    });

    // Attach click triggers to all frame and card mockup images and trigger buttons
    document.querySelectorAll('.doc-admin-frame img, .doc-card img, img.doc-mockup-img').forEach(img => {
        const src = img.getAttribute('src') || '';
        if (img.classList.contains('doc-mockup-img') || (src.includes('images/') && !src.includes('logo') && !src.includes('avatar') && !src.includes('favicon'))) {
            img.classList.add('doc-mockup-img');
            img.style.cursor = 'zoom-in';
            img.setAttribute('title', 'Click to open full HD Lightbox modal');
            img.addEventListener('click', () => {
                const frame = img.closest('.doc-admin-frame') || img.closest('.doc-card') || img.parentElement;
                const urlBar = frame ? (frame.querySelector('.doc-admin-url-bar') || frame.querySelector('h6')) : null;
                const title = urlBar ? urlBar.innerText.trim() : (img.alt || 'Full Resolution Preview');
                openLightbox(img.getAttribute('src'), title);
            });
        }
    });

    document.querySelectorAll('.doc-lightbox-trigger').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const frame = btn.closest('.doc-admin-frame');
            if (!frame) return;
            const img = frame.querySelector('img.doc-mockup-img') || frame.querySelector('img');
            if (!img) return;
            const urlBar = frame.querySelector('.doc-admin-url-bar');
            const title = btn.getAttribute('data-title') || (urlBar ? urlBar.innerText.trim() : (img.alt || 'Full Resolution Preview'));
            openLightbox(img.getAttribute('src'), title);
        });
    });

    // ================= 🎬 14-POINT CINEMATIC AUTOPLAY SHOWCASE (VIDEO-LIKE EXPERIENCE) =================
    const tourContainer = document.getElementById('visual-showcase');
    if (tourContainer) {
        const slides = [
            {
                id: 1,
                category: 'Storefront',
                title: 'Storefront Homepage & Gemini AI Shopping Assistant',
                desc: 'High-converting responsive landing with Summer Fashion 2026 hero slider, quick category navigation pills, trust badges (Free Shipping, 14-Day Return), and autonomous floating Gemini AI shopping concierge.',
                url: 'Storefront — Homepage: Hero Slider, Category Badges & Gemini AI Concierge',
                badge: 'Conversion Driver',
                tags: ['Hero Slider', 'Gemini AI Bot', 'Sub-50ms SSR', 'Category Navigator'],
                image: 'assets/images/screenshots/01_storefront_home.png',
                chip: '1. Home & AI'
            },
            {
                id: 2,
                category: 'Storefront',
                title: 'Shop Catalog, Dynamic Price Slider & Live Badges',
                desc: 'Sub-30ms faceted search filtering by price slider, brand, and color without page reloads. Includes live flash sale countdown clocks (Ends in 38 Days) and 1-click cart triggers.',
                url: 'Storefront — Shop Catalog: Real-Time Faceted Search & Flash Badges',
                badge: 'Instant Search',
                tags: ['Faceted Filter', 'Flash Countdown', 'Grid Layout', 'Instant Search'],
                image: 'assets/images/screenshots/02_shop_catalog_filters.png',
                chip: '2. Shop & Filters'
            },
            {
                id: 3,
                category: 'Storefront',
                title: 'Product Details, Color Swatches & Stock Availability',
                desc: 'Single product page featuring multi-angle gallery, interactive color swatches, size selectors (M, L), real-time inventory counter (19 In Stock), and verified customer star reviews.',
                url: 'Storefront — Product Details: Color Swatches, Variant Pickers & Stock Ticker',
                badge: 'E-Commerce Powerhouse',
                tags: ['Color Swatches', 'Real-Time Stock', 'Flash Timer', 'Review Schema'],
                image: 'assets/images/screenshots/03_product_details_variants.png',
                chip: '3. Variants & Stock'
            },
            {
                id: 4,
                category: 'Storefront',
                title: 'Shopping Cart, Dynamic Coupon Engine & Totals',
                desc: 'Frictionless cart review table featuring automated subtotal calculations, dynamic coupon discount verification, real-time quantity modifiers, and high-visibility secure checkout CTA.',
                url: 'Storefront — Shopping Cart: Discount Coupon Verification & Order Recalculation',
                badge: 'Conversion Engine',
                tags: ['Coupon Engine', 'Cart Recalculation', 'Secure Checkout CTA'],
                image: 'assets/images/screenshots/04_shopping_cart.png',
                chip: '4. Cart & Coupon'
            },
            {
                id: 5,
                category: 'Storefront',
                title: 'Self-Service Customer Order Tracking Portal',
                desc: 'Zero-friction customer self-service hub allowing buyers to track package delivery status, courier assigned, and payment confirmation in real time using their Order ID and billing email.',
                url: 'Storefront — Order Tracking: Self-Service Dispatch & Fulfillment Radar',
                badge: 'Customer Retention',
                tags: ['Customer Self-Service', 'Courier Live Radar', 'Zero Support Overhead'],
                image: 'assets/images/screenshots/05_order_tracking.png',
                chip: '5. Order Track'
            },
            {
                id: 6,
                category: 'Admin Cockpit',
                title: '360° Executive Telemetry Dashboard & Spline Analytics',
                desc: 'Executive admin command center with monthly sales KPI cards, live order statistics, spline sales vs. order analytics curves, and order distribution donut charts.',
                url: 'Admin Cockpit — Executive Dashboard: Spline Revenue Analytics & Order Status Charts',
                badge: 'Executive Cockpit',
                tags: ['Executive KPIs', 'Spline Charts', 'Donut Distribution', 'Quick Actions'],
                image: 'assets/images/screenshots/07_admin_executive_dashboard.png',
                chip: '6. 360° Dashboard'
            },
            {
                id: 7,
                category: 'Admin Cockpit',
                title: 'Order Fulfillment, Payment Verification & Invoices',
                desc: 'Complete order processing dashboard tracking 41+ live orders with multi-status filters (Paid, Unpaid, Pending, Delivered), customer billing overview, and 1-click printable PDF invoices.',
                url: 'Admin Cockpit — Orders Management: Real-Time Fulfillment, Invoices & Filters',
                badge: 'Fulfillment Hub',
                tags: ['41+ Live Orders', 'Status Workflow', 'Printable Invoices', 'Payment Badges'],
                image: 'assets/images/screenshots/08_admin_orders_management.png',
                chip: '7. Orders Hub'
            },
            {
                id: 8,
                category: 'Admin Cockpit',
                title: 'Catalog Inventory Management & Low Stock Warning Radar',
                desc: 'Comprehensive catalog directory tracking 48+ active products, real-time stock alert counters (3 low stock, 3 out of stock), product SKU codes, category taxonomy, and instant Trendy toggles.',
                url: 'Admin Cockpit — Product Inventory: 48+ SKUs, Low-Stock Radar & Instant Toggles',
                badge: 'Stock Radar',
                tags: ['Stock Alert Radar', 'SKU Tracking', 'Instant Toggles', 'Bulk Actions'],
                image: 'assets/images/screenshots/09_admin_products_inventory.png',
                chip: '8. Inventory Radar'
            },
            {
                id: 9,
                category: 'Admin Cockpit',
                title: 'Multi-Tab Product Creation & SEO Meta Wizard',
                desc: 'Structured product authoring suite with dedicated tabs for General Info, Pricing, Inventory & Stock, Product Variants & Attributes, Reusable Media Library, and Google SEO Metadata.',
                url: 'Admin Cockpit — Add Product Wizard: Multi-Tab Variations, Media & SEO Meta',
                badge: 'Authoring Wizard',
                tags: ['Multi-Tab Wizard', 'Attribute Matrix', 'SEO Metadata', 'Media Picker'],
                image: 'assets/images/screenshots/12_admin_product_create_wizard.png',
                chip: '9. Product Wizard'
            },
            {
                id: 10,
                category: 'Admin Cockpit',
                title: 'Enterprise Granular Role & Permissions Matrix',
                desc: '77+ granular security permissions governing Super Admins, Managers, and Staff roles across products, orders, media, customer communications, payment gateways, and core settings.',
                url: 'Admin Cockpit — Role Permissions: 77+ Granular Checkbox Matrix & Staff Management',
                badge: 'Enterprise Security',
                tags: ['77+ Permissions', 'Role Matrix', 'Least-Privilege Security', 'Staff Manager'],
                image: 'assets/images/screenshots/13_admin_role_permissions.png',
                chip: '10. Role Permissions'
            },
            {
                id: 11,
                category: 'Customizer',
                title: 'No-Code Visual Theme Layouts & Header Switcher',
                desc: 'Intuitive visual layout builder allowing store owners to switch between Header 1, Header 2, and Header 3, customize Home Page layout blocks, select Mega Menu styles, and configure product card designs with 1 click.',
                url: 'Customizer — Theme Layouts: 1-Click Header 1/2/3 Switcher & Visual Mega Menu',
                badge: 'No-Code Freedom',
                tags: ['3 Header Styles', 'Mega Menu Customizer', 'No-Code Layouts', 'Card Styles'],
                image: 'assets/images/screenshots/10_admin_theme_layouts_builder.png',
                chip: '11. Theme Layouts'
            },
            {
                id: 12,
                category: 'Customizer',
                title: '8+ Universal Payment Gateways & Crypto Hub',
                desc: 'Pre-integrated payment switchboard supporting Stripe, PayPal, SSLCommerz, Paystack, Razorpay, WayForPay, Cash on Delivery with advance validation, and next-gen Crypto Gateways (Binance Pay & CoinGate).',
                url: 'Gateways — Payment Hub: Stripe, PayPal, SSLCommerz, Binance Pay & CoinGate',
                badge: 'Universal Checkout',
                tags: ['Stripe & PayPal', 'Binance Pay & CoinGate', 'Zero Chargebacks', 'Instant Webhooks'],
                image: 'assets/images/screenshots/11_admin_payment_gateways.png',
                chip: '12. 8+ Gateways'
            },
            {
                id: 13,
                category: 'Customizer',
                title: 'System Settings, Currency Switcher & Mail SMTP Hub',
                desc: 'Central operational hub for configuring store currency, tax calculations, automated email SMTP credentials, and platform security flags.',
                url: 'System — Master Settings: Currency, SMTP Email Relay & System Configuration',
                badge: 'Infrastructure Hub',
                tags: ['Multi-Currency', 'SMTP Mailer', 'Branding Engine', 'SEO Prefixes'],
                image: 'assets/images/screenshots/11_admin_settings_hub.png',
                chip: '13. Settings Hub'
            },
            {
                id: 14,
                category: 'Customizer',
                title: 'Protected Admin Authentication Gateway',
                desc: 'Modern branded MartX admin login screen engineered with brute-force rate-limiting, secure session management, and encrypted password protection.',
                url: 'Security — Admin Login Portal: Brute-Force Rate-Limiting & Session Encryption',
                badge: 'Security Shield',
                tags: ['Brute-Force Rate Limiting', 'Encrypted Sessions', 'MartX Branded Portal'],
                image: 'assets/images/screenshots/06_admin_login_portal.png',
                chip: '14. Admin Login'
            }
        ];

        let currentIndex = 0;
        let isPlaying = true;
        const slideDuration = 4500;
        let slideStartTime = Date.now();
        let animationFrameId = null;
        let activeLayer = 'A';
        let transitionTimeout = null;
        let hoverPaused = false;

        const imgA = document.getElementById('tourImgA');
        const imgB = document.getElementById('tourImgB');
        const captionStrip = document.querySelector('.tour-caption-strip');
        const urlBar = document.getElementById('tourUrlBar');
        const counterBadge = document.getElementById('tourSlideCounter');
        const categoryBadge = document.getElementById('tourCategoryBadge');
        const newTabLink = document.getElementById('tourNewTabLink');
        const captionTitle = document.getElementById('tourCaptionTitle');
        const captionDesc = document.getElementById('tourCaptionDesc');
        const captionTags = document.getElementById('tourCaptionTags');
        const badgeDisplay = document.getElementById('tourBadgeDisplay');
        const playPauseBtn = document.getElementById('tourPlayPauseBtn');
        const prevBtn = document.getElementById('tourPrevBtn');
        const nextBtn = document.getElementById('tourNextBtn');
        const fullscreenBtn = document.getElementById('tourFullscreenBtn');
        const progressTrack = document.getElementById('tourProgressTrack');
        const chapterBar = document.getElementById('tourChapterBar');
        const viewport = document.getElementById('tourViewport');

        // Build 14 Story Progress Segments
        if (progressTrack) {
            progressTrack.innerHTML = '';
            slides.forEach((s, idx) => {
                const seg = document.createElement('div');
                seg.className = 'tour-progress-segment' + (idx === 0 ? ' active' : '');
                seg.title = `${s.chip}: ${s.title}`;
                const fill = document.createElement('div');
                fill.className = 'tour-progress-fill';
                seg.appendChild(fill);
                seg.addEventListener('click', () => {
                    goToSlide(idx);
                });
                progressTrack.appendChild(seg);
            });
        }

        // Build 14 Chapter Chips
        if (chapterBar) {
            chapterBar.innerHTML = '';
            slides.forEach((s, idx) => {
                const chip = document.createElement('button');
                chip.type = 'button';
                chip.className = 'tour-chip-btn' + (idx === 0 ? ' active' : '');
                chip.innerHTML = `<i class="mdi mdi-play-circle-outline"></i> ${s.chip}`;
                chip.addEventListener('click', () => {
                    goToSlide(idx);
                });
                chapterBar.appendChild(chip);
            });
        }

        function updateCaptions(slide) {
            if (urlBar) urlBar.textContent = slide.url;
            if (counterBadge) counterBadge.textContent = `${slide.id} / ${slides.length}`;
            if (categoryBadge) categoryBadge.textContent = slide.category;
            if (newTabLink) newTabLink.href = slide.image;

            if (captionTitle) captionTitle.innerHTML = `<i class="mdi mdi-shield-check text-primary"></i> ${slide.id}. ${slide.title}`;
            if (captionDesc) captionDesc.textContent = slide.desc;
            if (badgeDisplay) badgeDisplay.textContent = slide.badge;

            if (captionTags) {
                captionTags.innerHTML = slide.tags.map(t => `<span class="badge">${t}</span>`).join('');
            }
        }

        function renderSlide(index, animate = true) {
            const slide = slides[index];
            if (!slide) return;

            const currentEl = (activeLayer === 'A') ? imgA : imgB;
            const nextEl = (activeLayer === 'A') ? imgB : imgA;

            if (transitionTimeout) {
                clearTimeout(transitionTimeout);
                transitionTimeout = null;
            }

            if (animate && currentEl && nextEl) {
                // Dual-Layer 60fps/120fps Hardware-Accelerated Crossfade
                nextEl.src = slide.image;
                nextEl.alt = slide.title;
                nextEl.style.zIndex = '3';
                nextEl.classList.remove('active');
                
                // Force layout reflow to reset Ken Burns transform
                void nextEl.offsetWidth;

                // Trigger smooth 800ms dissolve and 5s Ken Burns camera drift
                nextEl.classList.add('active');

                transitionTimeout = setTimeout(() => {
                    currentEl.classList.remove('active');
                    currentEl.style.zIndex = '1';
                    nextEl.style.zIndex = '2';
                    activeLayer = (activeLayer === 'A') ? 'B' : 'A';
                    transitionTimeout = null;

                    // Preload upcoming slide
                    const nextSlideIdx = (index + 1) % slides.length;
                    const preloader = new Image();
                    preloader.src = slides[nextSlideIdx].image;
                }, 820);
            } else if (currentEl) {
                currentEl.src = slide.image;
                currentEl.alt = slide.title;
                currentEl.style.zIndex = '2';
                currentEl.classList.add('active');
                if (nextEl) {
                    nextEl.classList.remove('active');
                    nextEl.style.zIndex = '1';
                }
            }

            // Keynote Subtitle Morphing
            if (animate && captionStrip) {
                captionStrip.classList.add('morphing');
                setTimeout(() => {
                    updateCaptions(slide);
                    captionStrip.classList.remove('morphing');
                }, 180);
            } else {
                updateCaptions(slide);
            }

            // Update Chapter Chips
            if (chapterBar) {
                const chips = chapterBar.querySelectorAll('.tour-chip-btn');
                chips.forEach((c, idx) => {
                    if (idx === index) {
                        c.classList.add('active');
                        c.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                    } else {
                        c.classList.remove('active');
                    }
                });
            }

            // Update Progress Segments
            if (progressTrack) {
                const segs = progressTrack.querySelectorAll('.tour-progress-segment');
                segs.forEach((seg, idx) => {
                    const fill = seg.querySelector('.tour-progress-fill');
                    seg.classList.remove('active', 'completed');
                    if (idx < index) {
                        seg.classList.add('completed');
                        if (fill) fill.style.width = '100%';
                    } else if (idx === index) {
                        seg.classList.add('active');
                        if (fill) fill.style.width = '0%';
                    } else {
                        if (fill) fill.style.width = '0%';
                    }
                });
            }

            slideStartTime = Date.now();
        }

        function goToSlide(index) {
            currentIndex = (index + slides.length) % slides.length;
            renderSlide(currentIndex);
        }

        function nextSlide() {
            goToSlide(currentIndex + 1);
        }

        function prevSlide() {
            goToSlide(currentIndex - 1);
        }

        function togglePlayPause() {
            isPlaying = !isPlaying;
            hoverPaused = false;
            if (playPauseBtn) {
                if (isPlaying) {
                    playPauseBtn.innerHTML = '<i class="mdi mdi-pause me-1"></i> Pause';
                    slideStartTime = Date.now();
                } else {
                    playPauseBtn.innerHTML = '<i class="mdi mdi-play me-1"></i> Play';
                }
            }
        }

        function tick() {
            if (isPlaying && !document.hidden) {
                const elapsed = Date.now() - slideStartTime;
                const percent = Math.min(100, (elapsed / slideDuration) * 100);

                if (progressTrack) {
                    const activeSeg = progressTrack.querySelector('.tour-progress-segment.active .tour-progress-fill');
                    if (activeSeg) {
                        activeSeg.style.width = percent + '%';
                    }
                }

                if (elapsed >= slideDuration) {
                    nextSlide();
                }
            }
            animationFrameId = requestAnimationFrame(tick);
        }

        if (playPauseBtn) playPauseBtn.addEventListener('click', togglePlayPause);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);

        if (fullscreenBtn) {
            fullscreenBtn.addEventListener('click', () => {
                const current = slides[currentIndex];
                if (current && typeof openLightbox === 'function') {
                    openLightbox(current.image, current.title);
                }
            });
        }

        [imgA, imgB].forEach(img => {
            if (img) {
                img.addEventListener('click', () => {
                    const current = slides[currentIndex];
                    if (current && typeof openLightbox === 'function') {
                        openLightbox(current.image, current.title);
                    }
                });
            }
        });

        if (viewport) {
            viewport.addEventListener('mouseenter', () => {
                if (isPlaying) {
                    hoverPaused = true;
                    isPlaying = false;
                    if (playPauseBtn) playPauseBtn.innerHTML = '<i class="mdi mdi-play me-1"></i> Play';
                }
            });
            viewport.addEventListener('mouseleave', () => {
                if (hoverPaused) {
                    hoverPaused = false;
                    isPlaying = true;
                    slideStartTime = Date.now();
                    if (playPauseBtn) playPauseBtn.innerHTML = '<i class="mdi mdi-pause me-1"></i> Pause';
                }
            });
        }

        document.addEventListener('keydown', (e) => {
            const lightbox = document.getElementById('docLightboxModal');
            if (lightbox && lightbox.classList.contains('is-open')) return;
            if (e.key === 'ArrowLeft') {
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
            }
        });

        renderSlide(0, false);
        animationFrameId = requestAnimationFrame(tick);
    }
});
