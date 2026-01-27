// --- SUPABASE CONFIG ---
const SUPABASE_URL = 'https://rgeshbeiweqnnkbhgoya.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJnZXNoYmVpd2Vxbm5rYmhnb3lhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc2MzcxMTgsImV4cCI6MjA4MzIxMzExOH0.6N7jBP4C0KwHxYA8ymRT1UbN9kTyyQ2O3WV2Umvcdz4';

// Variable Global Client
// Variabel 'sb' ini bisa diakses di file HTML lain (blog.html / article.html)
let sb = null; 
let lenis; 
let projectsData = {}; 

// Inisialisasi Supabase Client
try {
    // Cek apakah library Supabase sudah terload dari CDN
    if (typeof window.supabase !== 'undefined') {
         sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
         console.log("Supabase Client Ready");
    } else {
         console.warn("Library Supabase belum terload. Pastikan script CDN ada di <head>.");
    }
} catch (e) {
    console.error("Gagal menginisialisasi Supabase:", e);
}

// ==========================================
// 2. FUNGSI PORTFOLIO (Hanya jalan di Portfolio)
// ==========================================

async function loadProjects() {
    const gridContainer = document.getElementById('portfolio-grid');
    if (!gridContainer) return; // Stop jika bukan di halaman portfolio

    // Skeleton Loading
    let skeletonHTML = '';
    for(let i = 0; i < 6; i++) {
        skeletonHTML += `
        <div class="aspect-[3/4] bg-gray-900 animate-pulse relative overflow-hidden rounded-sm">
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-100%] animate-[shimmer_1.5s_infinite]"></div>
        </div>`;
    }
    gridContainer.innerHTML = skeletonHTML;

    if (!sb) {
        gridContainer.innerHTML = '<div class="col-span-full text-center text-red-500">Koneksi Database Gagal.</div>';
        return;
    }

    try {
        // Fetch Projects
        const { data: projData, error: projError } = await sb
            .from('projects')
            .select('*')
            .order('sort_order', { ascending: true });

        if (projError) throw projError;

        // Fetch Images
        const { data: imgData, error: imgError } = await sb
            .from('project_images')
            .select('*')
            .order('sort_order', { ascending: true });

        if (imgError) throw imgError;

        // Mapping Data
        if (projData) {
            projData.forEach(proj => {
                const relatedImages = imgData
                    .filter(img => img.project_id === proj.id)
                    .map(img => ({
                        src: img.image_url,
                        aspect: img.aspect_ratio 
                    }));

                projectsData[proj.slug] = {
                    title: proj.title,
                    category: proj.category,
                    images: relatedImages
                };
            });
            renderPortfolioGrid(projData, imgData);
        }
    } catch (err) {
        console.error("Error load portfolio:", err);
        gridContainer.innerHTML = '<div class="col-span-full text-center text-red-500">Gagal memuat portfolio.</div>';
    }
}

function renderPortfolioGrid(projList, imgList) {
    const gridContainer = document.getElementById('portfolio-grid');
    if (!gridContainer) return;
    
    let cardsHtml = ''; 
    projList.forEach((proj) => {
        const thumb = imgList.find(img => img.project_id === proj.id);
        const thumbUrl = thumb ? thumb.image_url : 'assets/img/placeholder.jpg'; 
        const isLandscape = thumb && thumb.aspect_ratio > 1;
        const aspectClass = isLandscape ? 'aspect-[4/3]' : 'aspect-[3/4]';

        cardsHtml += `
            <div class="portfolio-item group cursor-pointer relative bg-gray-800 ${aspectClass} overflow-hidden opacity-0 scale-95 hidden" 
                 data-category="${proj.category.toLowerCase()}"
                 data-slug="${proj.slug}" 
                 onclick="openProject(this.dataset.slug)">
                <img src="${thumbUrl}" alt="${proj.title}" class="w-full h-full object-cover block transform transition duration-700 group-hover:scale-110" loading="lazy">
                <div class="absolute inset-0 portfolio-overlay flex flex-col items-center justify-center text-center p-4">
                     <span class="text-xs text-studio-gold tracking-widest uppercase mb-2 overlay-text">${proj.category}</span>
                    <span class="font-serif italic text-2xl text-white overlay-text delay-100">${proj.title}</span>
                </div>
            </div>
        `;
    });
    gridContainer.innerHTML = cardsHtml;
    
    // Auto Filter Trigger
    setTimeout(() => {
        const activeBtn = document.querySelector('.filter-btn.active');
        const currentCategory = activeBtn ? activeBtn.textContent.toLowerCase() : 'all';
        filterSelection(currentCategory);
    }, 100);

    if(typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
}

function filterSelection(category) {
    if (!document.querySelector('.filter-btn')) return;

    const items = document.querySelectorAll('.portfolio-item');
    const buttons = document.querySelectorAll('.filter-btn');

    buttons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase() === category || (category === 'all' && btn.textContent.toLowerCase() === 'all')) {
            btn.classList.add('active');
        }
    });

    items.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            gsap.to(item, { display: 'block', opacity: 1, scale: 1, duration: 0.4 });
        } else {
            gsap.to(item, { opacity: 0, scale: 0.9, duration: 0.3, onComplete: () => { item.style.display = 'none'; }});
        }
    });
    if(typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
}

// ==========================================
// 3. MODAL FUNCTIONS (Global)
// ==========================================

function openProject(projectSlug) {
    const modal = document.getElementById('project-modal');
    if (!modal) return;

    const project = projectsData[projectSlug]; 
    if (!project) return;

    const titleEl = document.getElementById('modal-title');
    const catEl = document.getElementById('modal-category');
    if(titleEl) titleEl.textContent = project.title;
    if(catEl) catEl.textContent = project.category;
    
    const galleryContainer = document.getElementById('modal-gallery');
    if (galleryContainer) {
        const fragment = document.createDocumentFragment();
        project.images.forEach(img => {
            const div = document.createElement('div');
            const isLandscape = img.aspect > 1;
            const aspectClass = isLandscape ? 'aspect-[4/3]' : 'aspect-[3/4]';
            div.className = `w-full ${aspectClass} bg-gray-800 overflow-hidden relative rounded-sm`;
            div.innerHTML = `<img src="${img.src}" alt="${project.title}" class="w-full h-full object-cover" loading="lazy">`;
            fragment.appendChild(div);
        });
        galleryContainer.innerHTML = ''; 
        galleryContainer.appendChild(fragment);
    }

    modal.classList.remove('hidden');
    if(lenis) lenis.stop(); 
    
    gsap.fromTo(modal, { opacity: 0 }, { opacity: 1, duration: 0.4 });
    const galleryDivs = document.querySelectorAll("#modal-gallery > div");
    if(galleryDivs.length > 0) {
        gsap.killTweensOf(galleryDivs);
        gsap.fromTo(galleryDivs, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.2 });
    }
}

function closeProject() {
    const modal = document.getElementById('project-modal');
    if(!modal) return;
    gsap.to(modal, { opacity: 0, duration: 0.3, onComplete: () => { modal.classList.add('hidden'); if(lenis) lenis.start(); } });
}

// ==========================================
// 4. UTILITY & NAVIGATION
// ==========================================

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const icon = document.getElementById('mobile-menu-icon');
    if (!menu) return;
    
    if (menu.classList.contains('pointer-events-none')) {
        menu.classList.remove('pointer-events-none', 'opacity-0');
        document.body.style.overflow = 'hidden'; 
        if(icon) { icon.classList.remove('fa-bars-staggered'); icon.classList.add('fa-xmark'); icon.style.transform = 'rotate(90deg)'; }
    } else {
        menu.classList.add('pointer-events-none', 'opacity-0');
        document.body.style.overflow = ''; 
        if(icon) { icon.classList.remove('fa-xmark'); icon.classList.add('fa-bars-staggered'); icon.style.transform = 'rotate(0deg)'; }
    }
}

function toggleTerms() {
    const modal = document.getElementById('terms-modal');
    if (!modal) return;
    
    if (modal.classList.contains('hidden')) {
        modal.classList.remove('hidden');
        if(lenis) lenis.stop();
        if(modal.children[1]) gsap.fromTo(modal.children[1], { scale: 0.95, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" });
    } else {
        if(lenis) lenis.start();
        if(modal.children[1]) gsap.to(modal.children[1], { scale: 0.95, opacity: 0, duration: 0.2, onComplete: () => modal.classList.add('hidden') });
        else modal.classList.add('hidden');
    }
}

function handleWA(e) {
    e.preventDefault();
    const inputs = e.target.elements;
    const name = inputs[0] ? inputs[0].value : '-';
    const service = inputs[1] ? inputs[1].value : '-';
    const date = inputs[2] ? inputs[2].value : '-';
    const note = inputs[3] ? inputs[3].value : '-';
    const text = `Halo Aksara, saya ${name} ingin booking untuk ${service} tanggal ${date}. Note: ${note}`;
    window.open(`https://wa.me/62881026774401?text=${encodeURIComponent(text)}`, '_blank');
}

function startHeroSlideshow() {
    const slides = document.querySelectorAll('.hero-slide');
    if(slides.length === 0) return; 

    let currentSlide = 0;
    slides.forEach((slide, index) => {
        slide.classList.remove('active');
        if (index === 0) slide.classList.add('active');
    });

    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, 5000); 
}

// ==========================================
// 5. INITIALIZATION (PAGE ROUTER)
// ==========================================
window.addEventListener('load', () => {
    // 1. Lenis Smooth Scroll
    if (typeof Lenis !== 'undefined') {
        lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smooth: true, direction: 'vertical' });
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => lenis.raf(time * 1000));
        gsap.ticker.lagSmoothing(0);
    }

    // 2. Global Page Fade In
    const activeSection = document.querySelector('.page-section');
    if(activeSection) gsap.fromTo(activeSection, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: "power2.out" });

    // 3. Conditional Logic per Page
    if (document.getElementById('home')) startHeroSlideshow();
    if (document.getElementById('portfolio-grid')) loadProjects();
    
    // Services Page Animation
    if (document.getElementById('services')) {
        const priceItems = document.querySelectorAll('.group');
        if(priceItems.length > 0) gsap.from(priceItems, { y: 30, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power2.out", delay: 0.2 });
    }
    
    // Contact Page Animation
    if (document.getElementById('contact')) {
        const formContainer = document.querySelector('form');
        if(formContainer) gsap.from(formContainer.parentElement, { x: 50, opacity: 0, duration: 0.8, ease: "power2.out", delay: 0.3 });
    }

    
    
});