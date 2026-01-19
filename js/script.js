// --- SUPABASE CONFIG ---
const SUPABASE_URL = 'https://rgeshbeiweqnnkbhgoya.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJnZXNoYmVpd2Vxbm5rYmhnb3lhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc2MzcxMTgsImV4cCI6MjA4MzIxMzExOH0.6N7jBP4C0KwHxYA8ymRT1UbN9kTyyQ2O3WV2Umvcdz4';

// VARIABLE GLOBAL
let sb; 
let lenis; // Wajib global agar bisa diakses fungsi navigasi & modal
let projectsData = {}; 

try {
    // Cek apakah library sudah load di window
    if (typeof window.supabase !== 'undefined') {
         sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    } else if (typeof supabaseClient !== 'undefined') {
         sb = supabaseClient.createClient(SUPABASE_URL, SUPABASE_KEY);
    }
} catch (e) {
    console.error("Supabase fail:", e);
}

// --- CORE FUNCTIONS ---

// Function Fetch Data (DENGAN SKELETON LOADING "LUXURY")
async function loadProjects() {
    const gridContainer = document.getElementById('portfolio-grid');

    // --- SKELETON LOADING START ---
    if(gridContainer) {
        let skeletonHTML = '';
        for(let i = 0; i < 6; i++) {
            skeletonHTML += `
            <div class="aspect-[3/4] bg-gray-900 animate-pulse relative overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-100%] animate-[shimmer_1.5s_infinite]"></div>
                <div class="absolute inset-0 flex flex-col items-center justify-center p-4 opacity-50">
                    <div class="w-16 h-2 bg-gray-700 rounded mb-4"></div> <div class="w-32 h-6 bg-gray-700 rounded"></div>      </div>
            </div>`;
        }
        gridContainer.innerHTML = skeletonHTML;
    }
    // --- SKELETON LOADING END ---

    if (!sb) {
        console.warn("Supabase client belum siap.");
        return;
    }

    try {
        // 1. Ambil data Projects (Urutkan berdasarkan sort_order)
        const { data: projData, error: projError } = await sb
            .from('projects')
            .select('*')
            .order('sort_order', { ascending: true });

        if (projError) throw projError;

        // 2. Ambil data Images
        const { data: imgData, error: imgError } = await sb
            .from('project_images')
            .select('*')
            .order('sort_order', { ascending: true }); // Pastikan gambar juga urut

        if (imgError) throw imgError;

        // 3. Mapping Data untuk Modal
        if (projData) {
            projData.forEach(proj => {
                const relatedImages = imgData
                    .filter(img => img.project_id === proj.id)
                    .map(img => ({
                        src: img.image_url,
                        aspect: img.aspect_ratio // Menyimpan nilai rasio (misal: 1.5 atau 0.66)
                    }));

                // Simpan ke variable global projectsData
                projectsData[proj.slug] = {
                    title: proj.title,
                    category: proj.category,
                    images: relatedImages
                };
            });
            
            // 4. Render Grid Utama
            renderPortfolioGrid(projData, imgData);
        }

    } catch (err) {
        console.error("Gagal load portfolio:", err);
        if(gridContainer) gridContainer.innerHTML = '<div class="col-span-full text-center text-red-500">Gagal memuat data.</div>';
    }
}

// --- OPTIMIZED RENDER FUNCTION (DENGAN LOGIC ASPECT RATIO) ---
function renderPortfolioGrid(projList, imgList) {
    const gridContainer = document.getElementById('portfolio-grid');
    if (!gridContainer) return;
    
    let cardsHtml = ''; 

    projList.forEach((proj) => {
        // Cari gambar pertama sebagai thumbnail
        const thumb = imgList.find(img => img.project_id === proj.id);
        const thumbUrl = thumb ? thumb.image_url : 'placeholder.jpg'; 

        // --- LOGIC BARU: PENENTUAN ASPECT RATIO ---
        // Jika aspect_ratio > 1 berarti Landscape (4/3)
        // Jika aspect_ratio < 1 berarti Portrait (3/4)
        // Default ke portrait jika data null
        const isLandscape = thumb && thumb.aspect_ratio > 1;
        const aspectClass = isLandscape ? 'aspect-[4/3]' : 'aspect-[3/4]';
        // ------------------------------------------

        const altText = `${proj.title} - Foto ${proj.category} Malang by Aksara Picture`;

        cardsHtml += `
            <div class="portfolio-item group cursor-pointer relative bg-gray-800 ${aspectClass} overflow-hidden opacity-0 scale-95 hidden" 
                 data-category="${proj.category.toLowerCase()}"
                 data-slug="${proj.slug}" 
                 onclick="openProject(this.dataset.slug)">
                
                <img src="${thumbUrl}" 
                     alt="${altText}" 
                     class="w-full h-full object-cover block transform transition duration-700 group-hover:scale-110" 
                     loading="lazy"
                     width="600" height="800">
                
                <div class="absolute inset-0 portfolio-overlay flex flex-col items-center justify-center text-center p-4">
                     <span class="text-xs text-studio-gold tracking-widest uppercase mb-2 overlay-text">
                        ${proj.category}
                    </span>
                    <span class="font-serif italic text-2xl text-white overlay-text delay-100">
                        ${proj.title}
                    </span>
                </div>
            </div>
        `;
    });

    // 1. Masukkan HTML ke DOM
    gridContainer.innerHTML = cardsHtml;
    
    // 2. Refresh Filter otomatis agar item muncul
    setTimeout(() => {
        const activeBtn = document.querySelector('.filter-btn.active');
        const currentCategory = activeBtn ? activeBtn.textContent.toLowerCase() : 'all';
        filterSelection(currentCategory);
    }, 100);

    // Refresh ScrollTrigger
    if(typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
}

// Function Open Project (DENGAN LOGIC ASPECT RATIO DETAIL)
function openProject(projectSlug) {
    // Reset animasi lama
    const modal = document.getElementById('project-modal');
    gsap.killTweensOf(modal);

    const project = projectsData[projectSlug]; 
    if (!project) {
        console.error("Project not found:", projectSlug);
        return;
    }

    const titleEl = document.getElementById('modal-title');
    const catEl = document.getElementById('modal-category');
    if(titleEl) titleEl.textContent = project.title;
    if(catEl) catEl.textContent = project.category;
    
    const galleryContainer = document.getElementById('modal-gallery');
    if (!galleryContainer) return;

    const fragment = document.createDocumentFragment();

    project.images.forEach(img => {
        const div = document.createElement('div');
        
        // --- LOGIC BARU: ASPECT RATIO UNTUK DETAIL ---
        const isLandscape = img.aspect > 1;
        const aspectClass = isLandscape ? 'aspect-[4/3]' : 'aspect-[3/4]';
        // ---------------------------------------------

        div.className = `w-full ${aspectClass} bg-gray-800 overflow-hidden relative`;
        div.innerHTML = `<img src="${img.src}" alt="${project.title} detail" class="w-full h-full object-cover" loading="lazy" decoding="async">`;
        fragment.appendChild(div);
    });

    galleryContainer.innerHTML = ''; 
    galleryContainer.appendChild(fragment);

    modal.classList.remove('hidden');

    // FIX SCROLL: Stop Lenis saat modal buka
    if(lenis) lenis.stop(); 
    
    gsap.fromTo(modal, { opacity: 0 }, { opacity: 1, duration: 0.4 });
    
    const galleryDivs = document.querySelectorAll("#modal-gallery > div");
    gsap.killTweensOf(galleryDivs);
    gsap.fromTo(galleryDivs, 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.2 }
    );
}

// Function Close Project
function closeProject() {
    const modal = document.getElementById('project-modal');
    
    gsap.to(modal, { 
        opacity: 0, 
        duration: 0.3, 
        onComplete: () => { 
            modal.classList.add('hidden');
            // FIX SCROLL: Jalankan Lenis lagi saat modal tutup
            if(lenis) lenis.start();
        } 
    });
}

// --- UI LOGIC ---

// 1. Navigation (Dengan Lenis Integration)
function navigateTo(pageId) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    const activeLink = document.getElementById(`link-${pageId}`);
    if(activeLink) activeLink.classList.add('active');

    const targetSection = document.getElementById(pageId);
    const currentSection = document.querySelector('.page-section.active');

    if(currentSection === targetSection) return; 

    if(currentSection) {
        gsap.to(currentSection, {
            opacity: 0,
            duration: 0.5,
            ease: "power2.inOut",
            onComplete: () => {
                currentSection.classList.remove('active');
                if(targetSection) {
                    // FIX: Reset Scroll Instan via Lenis
                    if (lenis) {
                        lenis.scrollTo(0, { immediate: true });
                    } else {
                        window.scrollTo(0,0);
                    }
                    targetSection.classList.add('active');
                    gsap.fromTo(targetSection, 
                        { opacity: 0, y: 30 },
                        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.1 }
                    );
                }
            }
        });
    } else {
        if(targetSection) {
            targetSection.classList.add('active');
            gsap.fromTo(targetSection, { opacity: 0 }, { opacity: 1, duration: 0.5 });
        }
    }
}

// 2. Filter Logic
function filterSelection(category) {
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

// 3. Mobile Menu
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const icon = document.getElementById('mobile-menu-icon');
    
    if (menu.classList.contains('pointer-events-none')) {
        menu.classList.remove('pointer-events-none', 'opacity-0');
        document.body.style.overflow = 'hidden'; 
        if(icon) {
            icon.classList.remove('fa-bars-staggered');
            icon.classList.add('fa-xmark');
            icon.style.transform = 'rotate(90deg)';
        }
    } else {
        menu.classList.add('pointer-events-none', 'opacity-0');
        document.body.style.overflow = ''; 
        if(icon) {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars-staggered');
            icon.style.transform = 'rotate(0deg)';
        }
    }
}

// 4. Terms Modal
function toggleTerms() {
    const modal = document.getElementById('terms-modal');
    
    if (modal.classList.contains('hidden')) {
        modal.classList.remove('hidden');
        if(lenis) lenis.stop();
        
        gsap.fromTo(modal.children[1], 
            { scale: 0.95, opacity: 0 }, 
            { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" }
        );
    } else {
        if(lenis) lenis.start();
        
        gsap.to(modal.children[1], { 
            scale: 0.95, 
            opacity: 0, 
            duration: 0.2, 
            onComplete: () => modal.classList.add('hidden') 
        });
    }
}

// 5. WhatsApp Handler
function handleWA(e) {
    e.preventDefault();
    const inputs = e.target.elements;
    const text = `Halo Aksara, saya ${inputs[0].value} ingin booking untuk ${inputs[1].value} tanggal ${inputs[2].value}. Note: ${inputs[3].value}`;
    window.open(`https://wa.me/62881026774401?text=${encodeURIComponent(text)}`, '_blank');
}

// 6. Hero Slideshow
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

// --- INITIALIZATION ---
window.addEventListener('load', () => {

    // --- LENIS SETUP ---
    if (typeof Lenis !== 'undefined') {
        lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smooth: true,
            direction: 'vertical', 
        });

        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);
        console.log("Lenis Active");
    } else {
        console.warn("Lenis library not loaded");
    }

    // Initial View
    const homeSection = document.getElementById("home");
    if(homeSection) {
        if(lenis) lenis.scrollTo(0, { immediate: true });
        gsap.fromTo("#home", { opacity: 0 }, { opacity: 1, duration: 1 });
    }

    startHeroSlideshow();
    loadProjects(); 
});