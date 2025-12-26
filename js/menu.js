// js/menu.js

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
                // Alt kategoriye tıklanmışsa işlemi durdur
                if (e.target.closest('.nav-subcategory')) return;

                const categoryType = category.dataset.category;
                this.toggleCategory(categoryType);
            });
        });
    },

    // Kategori aç/kapa
    toggleCategory(categoryType) {
        const category = document.querySelector(`[data-category="${categoryType}"]`);
        const subCategory = document.getElementById(`${categoryType}Sub`);

        if (!category || !subCategory) return;

        if (category.classList.contains('active')) {
            category.classList.remove('active');
            subCategory.classList.remove('active');
        } else {
            this.closeAllCategories();
            category.classList.add('active');
            subCategory.classList.add('active');
        }
    },

    // Tüm kategorileri kapat
    closeAllCategories() {
        document.querySelectorAll('.nav-category').forEach(cat => cat.classList.remove('active'));
        document.querySelectorAll('.nav-subcategories').forEach(sub => sub.classList.remove('active'));
    },

    // Aktif durumları ayarla
    setupActiveStates() {
        this.updateActiveMenuFromHash();
        window.addEventListener('hashchange', () => this.updateActiveMenuFromHash());
    },

    // Hash'e göre aktif menüyü ayarla
    updateActiveMenuFromHash() {
        const hash = window.location.hash.substring(1);
        if (!hash) return;

        let targetCategory = '';
        if (hash.includes('chief')) targetCategory = 'chief';
        else if (hash.includes('hero')) targetCategory = 'hero';
        else if (hash.includes('formation')) targetCategory = 'formation';

        if (!targetCategory) return;

        this.closeAllCategories();
        this.toggleCategory(targetCategory);

        const activeLink = document.querySelector(`.nav-subcategory[href*="${hash}"]`);
        if (activeLink) {
            document.querySelectorAll('.nav-subcategory').forEach(link => link.classList.remove('active'));
            activeLink.classList.add('active');
        }
    },

    // Responsive menü ayarları
    setupResponsiveMenu() {
        const adjustMenu = () => {
            const sidebar = document.getElementById('sidebar');
            const mainContent = document.getElementById('mainContent');
            if (!sidebar || !mainContent) return;

            if (window.innerWidth > 768) {
                sidebar.classList.add('open');
                mainContent.classList.add('expanded');
            } else {
                sidebar.classList.remove('open');
                mainContent.classList.remove('expanded');
            }
        };

        window.addEventListener('resize', adjustMenu);
        adjustMenu();
    },

    openMenu() {
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.getElementById('mainContent');
        const overlay = document.getElementById('overlay');
        if (!sidebar || !mainContent || !overlay) return;

        sidebar.classList.add('open');
        mainContent.classList.add('expanded');
        overlay.classList.add('active');
    },

    closeMenu() {
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.getElementById('mainContent');
        const overlay = document.getElementById('overlay');
        if (!sidebar || !mainContent || !overlay) return;

        sidebar.classList.remove('open');
        mainContent.classList.remove('expanded');
        overlay.classList.remove('active');
    }
};

// Başlat
document.addEventListener('DOMContentLoaded', () => MenuController.init());

// Global fonksiyonlar
function openMenu() { MenuController.openMenu(); }
function closeMenu() { MenuController.closeMenu(); }
