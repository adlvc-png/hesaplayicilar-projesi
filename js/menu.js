// js/menu.js

// Menü kontrolleri
const MenuController = {
    init() {
        this.setupCategoryToggles();
        this.setupActiveStates();
        this.setupResponsiveMenu();
    },
    
    // Kategori açma/kapama
    setupCategoryToggles() {
        document.querySelectorAll('.nav-category').forEach(category => {
            category.addEventListener('click', (e) => {
                // Eğer alt kategoriye tıklanmışsa, işlemi durdur
                if (e.target.closest('.nav-subcategory')) {
                    return;
                }
                
                const categoryType = category.dataset.category;
                this.toggleCategory(categoryType);
            });
        });
    },
    
    // Kategori aç/kapa
    toggleCategory(categoryType) {
        const category = document.querySelector(`[data-category="${categoryType}"]`);
        const subCategory = document.getElementById(`${categoryType}Sub`);
        
        // Eğer kategori zaten açıksa kapat
        if (category.classList.contains('active')) {
            category.classList.remove('active');
            subCategory.classList.remove('active');
        } else {
            // Diğer tüm kategorileri kapat
            this.closeAllCategories();
            
            // Seçilen kategoriyi aç
            category.classList.add('active');
            subCategory.classList.add('active');
        }
    },
    
    // Tüm kategorileri kapat
    closeAllCategories() {
        document.querySelectorAll('.nav-category').forEach(cat => {
            cat.classList.remove('active');
        });
        
        document.querySelectorAll('.nav-subcategories').forEach(sub => {
            sub.classList.remove('active');
        });
    },
    
    // Aktif durumları ayarla
    setupActiveStates() {
        // Sayfa yüklendiğinde aktif kategoriyi belirle
        this.updateActiveMenuFromHash();
        
        // Hash değişikliklerini dinle
        window.addEventListener('hashchange', () => {
            this.updateActiveMenuFromHash();
        });
    },
    
    // Hash'ten aktif menüyü güncelle
    updateActiveMenuFromHash() {
        const hash = window.location.hash.substring(1);
        if (!hash) return;
        
        // Hash'e göre kategoriyi bul
        let targetCategory = '';
        
        if (hash.includes('chief')) {
            targetCategory = 'chief';
        } else if (hash.includes('hero')) {
            targetCategory = 'hero';
        } else if (hash.includes('formation')) {
            targetCategory = 'formation';
        }
        
        if (targetCategory) {
            this.closeAllCategories();
            this.toggleCategory(targetCategory);
            
            // Alt kategoriyi aktif yap
            const activeLink = document.querySelector(`.nav-subcategory[href*="${hash}"]`);
            if (activeLink) {
                document.querySelectorAll('.nav-subcategory').forEach(link => {
                    link.classList.remove('active');
                });
                activeLink.classList.add('active');
            }
        }
    },
    
    // Responsive menü ayarları
    setupResponsiveMenu() {
        // Pencere boyutu değiştiğinde
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                // Büyük ekranda menüyü açık tut
                document.getElementById('sidebar').classList.add('open');
                document.getElementById('mainContent').classList.add('expanded');
            } else {
                // Küçük ekranda menüyü kapalı tut
                document.getElementById('sidebar').classList.remove('open');
                document.getElementById('mainContent').classList.remove('expanded');
            }
        });
        
        // İlk yüklemede kontrol et
        if (window.innerWidth > 768) {
            document.getElementById('sidebar').classList.add('open');
            document.getElementById('mainContent').classList.add('expanded');
        }
    },
    
    // Menüyü aç
    openMenu() {
        document.getElementById('sidebar').classList.add('open');
        document.getElementById('mainContent').classList.add('expanded');
        document.getElementById('overlay').classList.add('active');
    },
    
    // Menüyü kapat
    closeMenu() {
        document.getElementById('sidebar').classList.remove('open');
        document.getElementById('mainContent').classList.remove('expanded');
        document.getElementById('overlay').classList.remove('active');
    }
};

// Menü kontrollerini başlat
document.addEventListener('DOMContentLoaded', () => {
    MenuController.init();
});