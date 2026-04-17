// Fallback data (will be replaced by CMS content)
const defaultProducts = [
    {
        title: "Wireless Mechanical Keyboard",
        description: "RGB backlit, blue switches, 60% layout.",
        price: "GYD 18,000",
        image: "https://placehold.co/600x400/1e293b/white?text=Keyboard",
        whatsapp: "https://wa.me/5921234567?text=I'm%20interested%20in%20the%20Wireless%20Mechanical%20Keyboard"
    },
    {
        title: "Noise-Cancelling Headphones",
        description: "30hr battery, deep bass, comfortable fit.",
        price: "GYD 24,000",
        image: "https://placehold.co/600x400/1e293b/white?text=Headphones",
        whatsapp: "https://wa.me/5921234567?text=I'm%20interested%20in%20the%20Noise-Cancelling%20Headphones"
    },
    {
        title: "1080p Webcam",
        description: "Auto-focus, built-in mic, privacy cover.",
        price: "GYD 9,500",
        image: "https://placehold.co/600x400/1e293b/white?text=Webcam",
        whatsapp: "https://wa.me/5921234567?text=I'm%20interested%20in%20the%201080p%20Webcam"
    }
];

const defaultServices = [
    {
        title: "PC Repair & Maintenance",
        description: "Hardware diagnostics, cleaning, thermal paste replacement.",
        icon: "fas fa-laptop-code",
        whatsapp: "https://wa.me/5921234567?text=I%20need%20PC%20repair%20service"
    },
    {
        title: "Network Setup",
        description: "Home/office WiFi, router configuration, security.",
        icon: "fas fa-wifi",
        whatsapp: "https://wa.me/5921234567?text=I%20need%20network%20setup%20service"
    },
    {
        title: "Data Recovery",
        description: "Recover lost files from HDD, SSD, USB drives.",
        icon: "fas fa-database",
        whatsapp: "https://wa.me/5921234567?text=I%20need%20data%20recovery%20service"
    }
];

// Try to load CMS-generated JSON (if exists)
async function loadContent() {
    try {
        // First attempt to fetch products from CMS-generated file
        const productsRes = await fetch('/content/products.json');
        const products = productsRes.ok ? await productsRes.json() : defaultProducts;
        renderProducts(products);
    } catch {
        renderProducts(defaultProducts);
    }

    try {
        const servicesRes = await fetch('/content/services.json');
        const services = servicesRes.ok ? await servicesRes.json() : defaultServices;
        renderServices(services);
    } catch {
        renderServices(defaultServices);
    }
}

function renderProducts(products) {
    const grid = document.getElementById('product-grid');
    if (!grid) return;
    grid.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.title}" class="product-image">
            <div class="product-info">
                <h3>${product.title}</h3>
                <p>${product.description}</p>
                <div class="price">${product.price}</div>
                <a href="${product.whatsapp}" class="whatsapp-link" target="_blank">
                    <i class="fab fa-whatsapp"></i> Buy via WhatsApp
                </a>
            </div>
        </div>
    `).join('');
}

function renderServices(services) {
    const grid = document.getElementById('service-grid');
    if (!grid) return;
    grid.innerHTML = services.map(service => `
        <div class="service-card">
            <div class="service-info">
                <i class="${service.icon}" style="font-size: 2rem; color: #2563eb; margin-bottom: 12px; display: inline-block;"></i>
                <h3>${service.title}</h3>
                <p>${service.description}</p>
                <a href="${service.whatsapp}" class="whatsapp-link" target="_blank">
                    <i class="fab fa-whatsapp"></i> Inquire
                </a>
            </div>
        </div>
    `).join('');
}

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
    loadContent();
    const mobileBtn = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '70px';
                navLinks.style.left = '0';
                navLinks.style.right = '0';
                navLinks.style.backgroundColor = 'white';
                navLinks.style.padding = '20px';
                navLinks.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
            }
        });
    }
});