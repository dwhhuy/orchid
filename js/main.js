// Main JavaScript for Orchid Landing Page

// Product data structure - will be populated from images folder
let products = [];
let filteredProducts = [];
let currentLightboxIndex = 0;
let currentLightboxProducts = [];

// DOM Elements - will be initialized after DOM loads
let productsGrid, filterButtons, lightbox, lightboxImage, lightboxVideo, lightboxTitle, lightboxDescription;
let lightboxClose, lightboxPrev, lightboxNext, lightboxCurrent, lightboxTotal, lightboxMediaContainer;
let contactForm, mobileMenuToggle;

// Initialize DOM elements
function initializeDOMElements() {
    productsGrid = document.getElementById('productsGrid');
    filterButtons = document.querySelectorAll('.filter-btn');
    lightbox = document.getElementById('lightbox');
    lightboxImage = document.getElementById('lightbox-image');
    lightboxVideo = document.getElementById('lightbox-video');
    lightboxTitle = document.getElementById('lightbox-title');
    lightboxDescription = document.getElementById('lightbox-description');
    lightboxClose = document.querySelector('.lightbox-close');
    lightboxPrev = document.getElementById('lightboxPrev');
    lightboxNext = document.getElementById('lightboxNext');
    lightboxCurrent = document.getElementById('lightbox-current');
    lightboxTotal = document.getElementById('lightbox-total');
    lightboxMediaContainer = document.querySelector('.lightbox-media-container');
    contactForm = document.getElementById('contactForm');
    mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing...');
    
    // Initialize DOM elements first
    initializeDOMElements();
    
    // Check if elements exist
    console.log('Products grid found:', !!productsGrid);
    console.log('Filter buttons found:', filterButtons ? filterButtons.length : 0);
    
    initializeProducts();
    setupEventListeners();
    setupScrollAnimations();
    setupSmoothScrolling();
});

// Initialize products from images folder
function initializeProducts() {
    // Orchid products from hoa-lan folder
    const orchidImages = [
        '02b251e75ffdd5a38cec82.jpg',
        '04dedfd9d1c35b9d02d287.jpg',
        '1007b606b81c32426b0d91.jpg',
        '1aa425a22bb8a1e6f8a996.jpg',
        '2590dbc4d5de5f8006cf79.jpg',
        '32ca7ecc70d6fa88a3c797.jpg',
        '34addeaad0b05aee03a198.jpg',
        '594e024e0c54860adf4590.jpg',
        '5ad7dcd0d2ca589401db95.jpg',
        '66d280d28ec804965dd989.jpg',
        '8642e643e85962073b4886.jpg',
        '9a06b902b7183d46640993.jpg',
        '9c7ed62bd831526f0b2078.jpg',
        '9dcb6acc64d6ee88b7c785.jpg',
        'a3d235d33bc9b197e8d894.jpg',
        'a54a3b4b3551bf0fe640101.jpg',
        'a83447334929c3779a3892.jpg',
        'bc8d618a6f90e5cebc8184.jpg',
        'c00a2c0d2217a849f106100.jpg',
        'd35a525b5c41d61f8f5099.jpg',
        'ddea7fec71f6fba8a2e788.jpg',
        'e06304640a7e8020d96f83.jpg',
        'e118144c1a569008c94780.jpg',
        'e4ed77b979a3f3fdaab281.jpg'
    ];

    // Event flower products from su-kien folder
    const eventImages = [
        '0aa1eb9ca1d42b8a72c5127.jpg',
        '1278095603206862935139.jpg',
        '1421128647017981257107.jpg',
        '1562474587237202700128.mp4',
        '192da5ccef8465da3c95111.jpg',
        '2401401371912071425122.mp4',
        '2720019982203880653137.jpg',
        '2944815785421969973106.jpg',
        '3419751869645850449120.jpg',
        '3476255530970624567134.jpg',
        '3600296462385942480105.jpg',
        '3757545544076958211114.jpg',
        '3867457378656067013148.jpg',
        '3891487271447965307104.jpg',
        '4184725806947886376102.jpg',
        '4280082570984995824110.jpg',
        '454e129458dcd2828bcd115.jpg',
        '509a1f75563ddc63852c129.jpg',
        '550c3d487400fe5ea711143.jpg',
        '55cf4bed0ca586fbdfb4150.jpg'
    ];

    const orchidNames = [
        'Lan Hồ Điệp Trắng Tinh Khôi',
        'Lan Hồ Điệp Hồng Phấn',
        'Lan Hồ Điệp Tím Quý Phái',
        'Lan Hồ Điệp Vàng Rực Rỡ',
        'Lan Hồ Điệp Đỏ Quyến Rũ',
        'Lan Hồ Điệp Cam Tươi Sáng',
        'Lan Hồ Điệp Xanh Dương Hiếm',
        'Lan Hồ Điệp Nhiều Màu',
        'Lan Hồ Điệp Mini Xinh Xắn',
        'Lan Hồ Điệp Cao Cấp',
        'Lan Hồ Điệp Sang Trọng',
        'Lan Hồ Điệp Đặc Biệt'
    ];

    const eventNames = [
        'Hoa Cưới Sang Trọng',
        'Hoa Tang Lễ Trang Nghiêm',
        'Hoa Kỷ Niệm Đặc Biệt',
        'Hoa Sinh Nhật Rực Rỡ',
        'Hoa Khai Trương May Mắn',
        'Hoa Lễ Tốt Nghiệp',
        'Hoa Valentine Lãng Mạn',
        'Hoa 8/3 Dành Tặng Phụ Nữ',
        'Hoa 20/10 Ý Nghĩa',
        'Hoa Tết Thịnh Vượng',
        'Hoa Lễ Hội Đặc Sắc',
        'Hoa Sự Kiện Doanh Nghiệp'
    ];

    const orchidDescriptions = [
        'Lan hồ điệp cao cấp với vẻ đẹp tinh tế và thanh lịch',
        'Chất lượng tuyệt vời, màu sắc rực rỡ và tươi lâu',
        'Biểu tượng của sự sang trọng và đẳng cấp',
        'Phù hợp trang trí nhà cửa, văn phòng và làm quà tặng',
        'Được chăm sóc tỉ mỉ từ khâu gieo trồng đến thu hoạch'
    ];

    const eventDescriptions = [
        'Hoa trang trí sự kiện đặc biệt với thiết kế độc đáo',
        'Phù hợp cho các dịp lễ, tết và sự kiện quan trọng',
        'Màu sắc tươi sáng, ý nghĩa sâu sắc',
        'Được cắm và thiết kế bởi florist chuyên nghiệp',
        'Mang lại không khí trang trọng và ý nghĩa cho sự kiện'
    ];

    let products = [];
    let productId = 1;

    // Generate orchid products
    orchidImages.forEach((image, index) => {
        products.push({
            id: productId++,
            name: orchidNames[index % orchidNames.length],
            description: orchidDescriptions[index % orchidDescriptions.length],
            image: `images/hoa-lan/${image}`,
            category: 'hoa-lan',
            type: 'image'
        });
    });

    // Generate event flower products
    eventImages.forEach((image, index) => {
        const isVideo = image.endsWith('.mp4');
        products.push({
            id: productId++,
            name: eventNames[index % eventNames.length],
            description: eventDescriptions[index % eventDescriptions.length],
            image: `images/su-kien/${image}`,
            category: 'su-kien',
            type: isVideo ? 'video' : 'image'
        });
    });

    // Make products globally accessible
    window.products = products;
    filteredProducts = products;
    
    console.log('Initialized products:', products.length);
    console.log('Categories found:', [...new Set(products.map(p => p.category))]);
    
    renderProducts();
}

// Render products to the grid
function renderProducts() {
    if (!productsGrid) {
        console.error('Products grid element not found!');
        return;
    }

    console.log('Rendering products:', filteredProducts.length);
    productsGrid.innerHTML = '';
    
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = '<p style="text-align: center; grid-column: 1/-1; padding: 2rem;">Không tìm thấy sản phẩm nào.</p>';
        return;
    }
    
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });

    // Add scroll animations to new elements
    setupScrollAnimations();
}

// Create a product card element
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card fade-in';
    card.dataset.category = product.category;
    
    card.innerHTML = `
        <div class="product-image" style="background-image: url('${product.image}')">
            ${product.type === 'video' ? '<div class="product-video-indicator">📹 Video</div>' : ''}
        </div>
        <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-description">${product.description}</p>
        </div>
    `;

    // Add click event to open lightbox
    card.addEventListener('click', () => {
        const productIndex = filteredProducts.findIndex(p => p.id === product.id);
        openLightbox(productIndex);
    });
    
    return card;
}

// Filter products by category
function filterProducts(category) {
    console.log('Filtering by category:', category);
    console.log('Total products:', window.products ? window.products.length : 0);
    
    if (category === 'all') {
        filteredProducts = window.products || [];
    } else {
        filteredProducts = (window.products || []).filter(product => product.category === category);
    }
    
    console.log('Filtered products:', filteredProducts.length);
    renderProducts();
}

// Setup event listeners
function setupEventListeners() {
    // Filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            // Filter products
            const category = button.dataset.filter;
            filterProducts(category);
        });
    });

    // Lightbox close
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    // Close lightbox on background click
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // Lightbox navigation
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
    }
    
    if (lightboxNext) {
        lightboxNext.addEventListener('click', () => navigateLightbox(1));
    }

    // Close lightbox on Escape key and navigation with arrow keys
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            navigateLightbox(-1);
        } else if (e.key === 'ArrowRight') {
            navigateLightbox(1);
        }
    });

    // Touch/swipe functionality for lightbox
    if (lightboxMediaContainer) {
        setupSwipeGestures();
    }

    // Contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }

    // Mobile menu toggle
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }

    // Header scroll effect
    window.addEventListener('scroll', handleHeaderScroll);
}

// Open lightbox with product details
function openLightbox(index) {
    if (!lightbox || !filteredProducts.length) return;

    currentLightboxProducts = filteredProducts;
    currentLightboxIndex = index;
    
    updateLightboxContent();
    updateLightboxNavigation();
    
    lightbox.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Update lightbox content
function updateLightboxContent() {
    const product = currentLightboxProducts[currentLightboxIndex];
    if (!product) return;

    lightboxTitle.textContent = product.name;
    lightboxDescription.textContent = product.description;

    if (product.type === 'video') {
        lightboxImage.style.display = 'none';
        lightboxVideo.style.display = 'block';
        lightboxVideo.querySelector('source').src = product.image;
        lightboxVideo.load();
    } else {
        lightboxVideo.style.display = 'none';
        lightboxImage.style.display = 'block';
        lightboxImage.src = product.image;
        lightboxImage.alt = product.name;
    }
}

// Update lightbox navigation
function updateLightboxNavigation() {
    if (lightboxCurrent && lightboxTotal) {
        lightboxCurrent.textContent = currentLightboxIndex + 1;
        lightboxTotal.textContent = currentLightboxProducts.length;
    }
    
    // Show/hide navigation buttons
    if (lightboxPrev) {
        lightboxPrev.style.display = currentLightboxProducts.length > 1 ? 'flex' : 'none';
    }
    if (lightboxNext) {
        lightboxNext.style.display = currentLightboxProducts.length > 1 ? 'flex' : 'none';
    }
}

// Navigate lightbox
function navigateLightbox(direction) {
    if (!currentLightboxProducts.length) return;
    
    currentLightboxIndex += direction;
    
    // Loop around
    if (currentLightboxIndex >= currentLightboxProducts.length) {
        currentLightboxIndex = 0;
    } else if (currentLightboxIndex < 0) {
        currentLightboxIndex = currentLightboxProducts.length - 1;
    }
    
    updateLightboxContent();
    updateLightboxNavigation();
}

// Close lightbox
function closeLightbox() {
    if (!lightbox) return;
    
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Pause video if playing
    if (lightboxVideo) {
        lightboxVideo.pause();
    }
}

// Open contact modal (called from lightbox)
function openContactModal() {
    closeLightbox();
    // Scroll to contact section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Handle contact form submission
function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const phone = formData.get('phone');
    const message = formData.get('message');

    // Simple validation
    if (!name || !phone) {
        alert('Vui lòng điền đầy đủ họ tên và số điện thoại.');
        return;
    }

    // In a real application, you would send this data to your server
    // For now, we'll show a success message and redirect to Zalo
    alert('Cảm ơn bạn đã gửi yêu cầu! Chúng tôi sẽ liên hệ với bạn sớm nhất có thể.');
    
    // Reset form
    contactForm.reset();
    
    // Optional: Open Zalo with pre-filled message
    const zaloMessage = encodeURIComponent(`Xin chào! Tôi là ${name}, số điện thoại ${phone}. ${message || 'Tôi quan tâm đến sản phẩm lan hồ điệp của bạn.'}`);
    window.open(`https://zalo.me/0354497871?message=${zaloMessage}`, '_blank');
}

// Toggle mobile menu
function toggleMobileMenu() {
    // This would be implemented if you had a mobile menu
    // For now, we'll just show the contact options
    const headerContact = document.querySelector('.header-contact');
    if (headerContact) {
        headerContact.style.display = headerContact.style.display === 'flex' ? 'none' : 'flex';
    }
}

// Handle header scroll effect
function handleHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;

    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.backgroundColor = 'var(--color-bg-white)';
        header.style.backdropFilter = 'none';
    }
}

// Setup scroll animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all elements with animation classes
    document.querySelectorAll('.fade-in, .scale-in').forEach(el => {
        observer.observe(el);
    });
}

// Setup smooth scrolling for navigation links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Utility function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Lazy loading for images
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll handler
const debouncedScrollHandler = debounce(handleHeaderScroll, 10);
window.addEventListener('scroll', debouncedScrollHandler);

// Setup swipe gestures for lightbox
function setupSwipeGestures() {
    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;
    let isSwipeDetected = false;

    lightboxMediaContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        isSwipeDetected = false;
    }, { passive: true });

    lightboxMediaContainer.addEventListener('touchmove', (e) => {
        if (!startX || !startY) return;
        
        endX = e.touches[0].clientX;
        endY = e.touches[0].clientY;
        
        const deltaX = startX - endX;
        const deltaY = startY - endY;
        
        // Only prevent default if horizontal swipe is detected
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
            e.preventDefault();
            isSwipeDetected = true;
        }
    }, { passive: false });

    lightboxMediaContainer.addEventListener('touchend', (e) => {
        if (!startX || !startY || !isSwipeDetected) return;

        const deltaX = startX - endX;
        const deltaY = startY - endY;
        const minSwipeDistance = 50;

        // Horizontal swipe detection
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
            if (deltaX > 0) {
                // Swipe left - next image
                navigateLightbox(1);
            } else {
                // Swipe right - previous image
                navigateLightbox(-1);
            }
        }

        // Reset values
        startX = 0;
        startY = 0;
        endX = 0;
        endY = 0;
        isSwipeDetected = false;
    }, { passive: true });

    // Mouse drag support for desktop
    let isDragging = false;
    let dragStartX = 0;

    lightboxMediaContainer.addEventListener('mousedown', (e) => {
        isDragging = true;
        dragStartX = e.clientX;
        lightboxMediaContainer.style.cursor = 'grabbing';
        e.preventDefault();
    });

    lightboxMediaContainer.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
    });

    lightboxMediaContainer.addEventListener('mouseup', (e) => {
        if (!isDragging) return;
        
        const dragEndX = e.clientX;
        const deltaX = dragStartX - dragEndX;
        const minDragDistance = 50;

        if (Math.abs(deltaX) > minDragDistance) {
            if (deltaX > 0) {
                navigateLightbox(1);
            } else {
                navigateLightbox(-1);
            }
        }

        isDragging = false;
        lightboxMediaContainer.style.cursor = 'grab';
    });

    lightboxMediaContainer.addEventListener('mouseleave', () => {
        isDragging = false;
        lightboxMediaContainer.style.cursor = 'grab';
    });

    // Set initial cursor
    lightboxMediaContainer.style.cursor = 'grab';
}

// Export functions for global access (if needed)
window.openContactModal = openContactModal;
