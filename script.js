// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 800,
        easing: 'ease-out',
        once: true,
        offset: 50,
    });

    // Initialize Lucide icons
    lucide.createIcons();
    
    // Mobile menu toggle
    const menuButton = document.getElementById('menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    menuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        mobileMenu.classList.toggle('hidden');
    });
    
    // Close mobile menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            mobileMenu.classList.add('hidden');
        });
    });
    
    // PDF Modal handling
    const downloadBtn = document.getElementById('download-btn');
    const pdfModal = document.getElementById('pdf-modal');
    const closeModal = document.getElementById('close-modal');
    const confirmModal = document.getElementById('confirm-modal');
    
    downloadBtn.addEventListener('click', () => {
        pdfModal.classList.remove('hidden');
    });
    
    [closeModal, confirmModal].forEach(button => {
        button.addEventListener('click', () => {
            pdfModal.classList.add('hidden');
        });
    });
    
    // Close modal when clicking outside
    pdfModal.addEventListener('click', (e) => {
        if (e.target === pdfModal) {
            pdfModal.classList.add('hidden');
        }
    });
    
    // Prevent zooming
    window.addEventListener("wheel", (e) => {
        const isPinching = e.ctrlKey;
        if(isPinching) e.preventDefault();
    }, { passive: false });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#!') return; // Skip dummy links
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Intersection Observer for chart animation
    const chartObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const chart = entry.target;
                const dataPath = chart.querySelector('#data-path');
                if (dataPath) {
                    dataPath.style.strokeDashoffset = '0';
                }
            }
        });
    }, { threshold: 0.5 });
    
    const sustainabilityChart = document.getElementById('sustainability-chart');
    if (sustainabilityChart) {
        chartObserver.observe(sustainabilityChart);
    }
});
