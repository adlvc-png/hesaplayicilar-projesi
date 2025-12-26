// js/chief-equipment.js

// Şef Donanımı Hesaplayıcı
const ChiefEquipmentCalculator = {
    // Dil çevirileri
    translations: {
        TR: {
            mainTitle: "Şef Donanımı Yükseltme Hesaplayıcı",
            bulkTitle: "Toplu Seviye Ayarları",
            selectCurrent: "Mevcut Seviye Seçin",
            selectTarget: "Hedef Seviye Seçin",
            setAllBtn: "Tümünü Aynı Yap",
            setCurrentBtn: "Sadece Mevcutları Ayarla",
            setTargetBtn: "Sadece Hedefleri Ayarla",
            calculateBtn: "Hesapla",
            resetMaterialsBtn: "Malzemeleri Sıfırla",
            resetAllBtn: "Tümünü Sıfırla",
            mizrakciTitle: "Mızrakçı",
            sapkaTitle: "Şapka",
            saatTitle: "Saat",
            piyadeTitle: "Piyade",
            paltoTitle: "Palto",
            pantolonTitle: "Pantolon",
            nisanciTitle: "Nişancı",
            yuzukTitle: "Yüzük",
            sopaTitle: "Sopa",
            currentLevelsTitle: "Mevcut Seviye",
            targetLevelsTitle: "Hedef Seviye",
            materialsTitle: "Mevcut Malzemeler",
            material1Label: "Sert Alaşım:",
            material2Label: "Cila Çözeltisi:",
            material3Label: "Tasarım Planları:",
            material4Label: "Amber:",
            resultsTitle: "Yükseltme Sonuçları",
            levelHeader: "Seviye",
            equipmentHeader: "Ekipman - Slot",
            material1Header: "Sert Alaşım",
            material2Header: "Cila Çözeltisi",
            material3Header: "Tasarım Planları",
            material4Header: "Amber",
            totalText: "TOPLAM",
            selectOption: "-- Seçiniz --"
        }
    },

    // Ekipman verileri
    equipmentData: [
        { 
            id: 'mizrakci', 
            name: { TR: 'Mızrakçı' }, 
            slots: [
                { id: 'sapka', name: { TR: 'Şapka' } },
                { id: 'saat', name: { TR: 'Saat' } }
            ] 
        },
        { 
            id: 'piyade', 
            name: { TR: 'Piyade' }, 
            slots: [
                { id: 'palto', name: { TR: 'Palto' } },
                { id: 'pantolon', name: { TR: 'Pantolon' } }
            ] 
        },
        { 
            id: 'nisanci', 
            name: { TR: 'Nişancı' }, 
            slots: [
                { id: 'yuzuk', name: { TR: 'Yüzük' } },
                { id: 'sopa', name: { TR: 'Sopa' } }
            ] 
        }
    ],

    // Yükseltme maliyet verileri
    upgradeCosts: {
        "yeşil": { material1: 1500, material2: 15, material3: 0, material4: 0 },
        "yeşil-1": { material1: 3800, material2: 40, material3: 0, material4: 0 },
        "mavi": { material1: 7000, material2: 70, material3: 0, material4: 0 },
        "mavi-1": { material1: 9700, material2: 95, material3: 0, material4: 0 },
        "mavi-2": { material1: 0, material2: 0, material3: 45, material4: 0 },
        "mavi-3": { material1: 0, material2: 0, material3: 50, material4: 0 },
        "mor": { material1: 0, material2: 0, material3: 60, material4: 0 },
        "mor-1": { material1: 0, material2: 0, material3: 70, material4: 0 },
        "mor-2": { material1: 6500, material2: 65, material3: 40, material4: 0 },
        "mor-3": { material1: 8000, material2: 80, material3: 50, material4: 0 },
        "mor-T1": { material1: 10000, material2: 95, material3: 60, material4: 0 },
        "mor-T1-1": { material1: 11000, material2: 110, material3: 70, material4: 0 },
        "mor-T1-2": { material1: 13000, material2: 130, material3: 85, material4: 0 },
        "mor-T1-3": { material1: 15000, material2: 160, material3: 100, material4: 0 },
        "altın": { material1: 22000, material2: 220, material3: 40, material4: 0 },
        "altın-1": { material1: 23000, material2: 230, material3: 40, material4: 0 },
        "altın-2": { material1: 25000, material2: 250, material3: 45, material4: 0 },
        "altın-3": { material1: 26000, material2: 260, material3: 45, material4: 0 },
        "altın-T1": { material1: 28000, material2: 280, material3: 45, material4: 0 },
        "altın-T1-1": { material1: 30000, material2: 300, material3: 55, material4: 0 },
        "altın-T1-2": { material1: 32000, material2: 320, material3: 55, material4: 0 },
        "altın-T1-3": { material1: 38000, material2: 340, material3: 55, material4: 0 },
        "altın-T2": { material1: 38000, material2: 360, material3: 55, material4: 0 },
        "altın-T2-1": { material1: 43000, material2: 430, material3: 75, material4: 0 },
        "altın-T2-2": { material1: 45000, material2: 460, material3: 80, material4: 0 },
        "altın-T2-3": { material1: 48000, material2: 500, material3: 85, material4: 0 },
        "kırmızı": { material1: 50000, material2: 530, material3: 85, material4: 10 },
        "kırmızı-1": { material1: 52000, material2: 560, material3: 90, material4: 10 },
        "kırmızı-2": { material1: 54000, material2: 590, material3: 95, material4: 10 },
        "kırmızı-3": { material1: 56000, material2: 620, material3: 100, material4: 10 },
        "kırmızı-T1": { material1: 59000, material2: 670, material3: 110, material4: 15 },
        "kırmızı-T1-1": { material1: 61000, material2: 700, material3: 115, material4: 15 },
        "kırmızı-T1-2": { material1: 63000, material2: 730, material3: 120, material4: 15 },
        "kırmızı-T1-3": { material1: 65000, material2: 760, material3: 125, material4: 15 },
        "kırmızı-T2": { material1: 68000, material2: 810, material3: 135, material4: 20 },
        "kırmızı-T2-1": { material1: 70000, material2: 840, material3: 140, material4: 20 },
        "kırmızı-T2-2": { material1: 72000, material2: 870, material3: 145, material4: 20 },
        "kırmızı-T2-3": { material1: 74000, material2: 900, material3: 150, material4: 20 },
        "kırmızı-T3": { material1: 77000, material2: 950, material3: 160, material4: 25 },
        "kırmızı-T3-1": { material1: 80000, material2: 990, material3: 165, material4: 25 },
        "kırmızı-T3-2": { material1: 83000, material2: 1030, material3: 170, material4: 25 },
        "kırmızı-T3-3": { material1: 86000, material2: 1070, material3: 180, material4: 25 },
        "kırmızı-T4": { material1: 120000, material2: 1500, material3: 250, material4: 40 },
        "kırmızı-T4-1": { material1: 140000, material2: 1650, material3: 275, material4: 40 },
        "kırmızı-T4-2": { material1: 160000, material2: 1800, material3: 300, material4: 40 },
        "kırmızı-T4-3": { material1: 180000, material2: 1950, material3: 325, material4: 40 }
    },

    // Renk çevirileri
    colorTranslation: { 
        TR: {"yeşil":"Yeşil","mavi":"Mavi","mor":"Mor","altın":"Altın","kırmızı":"Kırmızı"}
    },

    // Seviye anahtarları
    levelKeys: null,

    // Mevcut dil
    currentLanguage: 'TR',

    // Başlatma
    init() {
        console.log('🛡️ Şef Donanımı Hesaplayıcı Başlatıldı');
        
        // Seviye anahtarlarını oluştur
        this.levelKeys = Object.keys(this.upgradeCosts);
        
        // Dil güncelle
        this.updateLanguage();
        
        // Dropdown'ları doldur
        this.initializeSelects();
        
        // Event listener'ları ekle
        this.setupEventListeners();
    },

    // Event listener'ları kur
    setupEventListeners() {
        // Hesapla butonu
        document.getElementById('calculateBtn')?.addEventListener('click', () => this.calculateUpgrade());
        
        // Sıfırla butonları
        document.getElementById('resetMaterialsBtn')?.addEventListener('click', () => this.resetMaterials());
        document.getElementById('resetAllBtn')?.addEventListener('click', () => this.resetAll());
        
        // Toplu ayar butonları
        document.getElementById('setAllBtn')?.addEventListener('click', () => this.setBulkLevels());
        document.getElementById('setCurrentBtn')?.addEventListener('click', () => this.setBulkCurrentOnly());
        document.getElementById('setTargetBtn')?.addEventListener('click', () => this.setBulkTargetOnly());
    },

    // Dil güncelle
    updateLanguage() {
        const t = this.translations[this.currentLanguage];
        if (!t) return;

        // Başlıklar
        this.setText('mainTitle', t.mainTitle);
        this.setText('bulkTitle', t.bulkTitle);
        this.setText('materialsTitle', t.materialsTitle);
        this.setText('resultsTitle', t.resultsTitle);
        
        // Butonlar
        this.setText('setAllBtn', t.setAllBtn);
        this.setText('setCurrentBtn', t.setCurrentBtn);
        this.setText('setTargetBtn', t.setTargetBtn);
        this.setText('calculateBtn', t.calculateBtn);
        this.setText('resetMaterialsBtn', t.resetMaterialsBtn);
        this.setText('resetAllBtn', t.resetAllBtn);
        
        // Ekipman isimleri
        this.setText('mizrakciTitle', t.mizrakciTitle);
        this.setText('sapkaTitle', t.sapkaTitle);
        this.setText('saatTitle', t.saatTitle);
        this.setText('piyadeTitle', t.piyadeTitle);
        this.setText('paltoTitle', t.paltoTitle);
        this.setText('pantolonTitle', t.pantolonTitle);
        this.setText('nisanciTitle', t.nisanciTitle);
        this.setText('yuzukTitle', t.yuzukTitle);
        this.setText('sopaTitle', t.sopaTitle);
        
        // Malzeme etiketleri
        this.setText('material1Label', t.material1Label);
        this.setText('material2Label', t.material2Label);
        this.setText('material3Label', t.material3Label);
        this.setText('material4Label', t.material4Label);
        
        // Tablo başlıkları
        this.setText('levelHeader', t.levelHeader);
        this.setText('equipmentHeader', t.equipmentHeader);
        this.setText('material1Header', t.material1Header);
        this.setText('material2Header', t.material2Header);
        this.setText('material3Header', t.material3Header);
        this.setText('material4Header', t.material4Header);
    },

    // Metin güncelleme yardımcısı
    setText(elementId, text) {
        const element = document.getElementById(elementId);
        if (element) element.textContent = text;
    },

    // Yıldız simgeleriyle seviye isimlerini formatla
    formatLevelName(levelKey) {
        const parts = levelKey.split('-');
        let color = parts[0];
        let rest = parts.slice(1).join('-');
        let colorText = this.colorTranslation[this.currentLanguage][color] || color;
        
        // Yıldız simgeleriyle formatla
        if (rest === '1') return `${colorText} ★`;
        if (rest === '2') return `${colorText} ★★`;
        if (rest === '3') return `${colorText} ★★★`;
        if (rest === 'T1') return `${colorText} T1`;
        if (rest === 'T1-1') return `${colorText} T1 ★`;
        if (rest === 'T1-2') return `${colorText} T1 ★★`;
        if (rest === 'T1-3') return `${colorText} T1 ★★★`;
        if (rest === 'T2') return `${colorText} T2`;
        if (rest === 'T2-1') return `${colorText} T2 ★`;
        if (rest === 'T2-2') return `${colorText} T2 ★★`;
        if (rest === 'T2-3') return `${colorText} T2 ★★★`;
        if (rest === 'T3') return `${colorText} T3`;
        if (rest === 'T3-1') return `${colorText} T3 ★`;
        if (rest === 'T3-2') return `${colorText} T3 ★★`;
        if (rest === 'T3-3') return `${colorText} T3 ★★★`;
        if (rest === 'T4') return `${colorText} T4`;
        if (rest === 'T4-1') return `${colorText} T4 ★`;
        if (rest === 'T4-2') return `${colorText} T4 ★★`;
        if (rest === 'T4-3') return `${colorText} T4 ★★★`;
        
        return colorText + (rest ? '-' + rest : '');
    },

    // Seviye option'larını oluştur
    generateLevelOptions() {
        const t = this.translations[this.currentLanguage];
        let options = `<option value="">${t.selectOption}</option>`;
        
        this.levelKeys.forEach(key => {
            options += `<option value="${key}">${this.formatLevelName(key)}</option>`;
        });
        
        return options;
    },

    // Dropdown'ları doldur
    initializeSelects() {
        const options = this.generateLevelOptions();
        
        // Tüm ekipman dropdown'larını doldur
        this.equipmentData.forEach(equip => {
            equip.slots.forEach(slot => {
                const currentSelect = document.getElementById(`${equip.id}-${slot.id}-current`);
                const targetSelect = document.getElementById(`${equip.id}-${slot.id}-target`);
                
                if (currentSelect) currentSelect.innerHTML = options;
                if (targetSelect) targetSelect.innerHTML = options;
            });
        });

        // Toplu seçim dropdown'larını doldur
        const bulkCurrent = document.getElementById('bulkCurrent');
        const bulkTarget = document.getElementById('bulkTarget');
        
        const t = this.translations[this.currentLanguage];
        
        if (bulkCurrent) {
            bulkCurrent.innerHTML = `<option value="">${t.selectCurrent}</option>`;
            this.levelKeys.forEach(key => {
                bulkCurrent.innerHTML += `<option value="${key}">${this.formatLevelName(key)}</option>`;
            });
        }
        
        if (bulkTarget) {
            bulkTarget.innerHTML = `<option value="">${t.selectTarget}</option>`;
            this.levelKeys.forEach(key => {
                bulkTarget.innerHTML += `<option value="${key}">${this.formatLevelName(key)}</option>`;
            });
        }
    },

    // Toplu seviye ayarlama
    setBulkLevels() {
        const currentVal = document.getElementById('bulkCurrent')?.value;
        const targetVal = document.getElementById('bulkTarget')?.value;
        
        if (!currentVal && !targetVal) {
            showError('Lütfen en az bir seviye seçin!');
            return;
        }

        this.equipmentData.forEach(equip => {
            equip.slots.forEach(slot => {
                const currentSelect = document.getElementById(`${equip.id}-${slot.id}-current`);
                const targetSelect = document.getElementById(`${equip.id}-${slot.id}-target`);
                
                if (currentVal && currentSelect) currentSelect.value = currentVal;
                if (targetVal && targetSelect) targetSelect.value = targetVal;
            });
        });
        
        if (currentVal && targetVal) {
            showSuccess('Tüm seviyeler güncellendi!');
        }
    },

    // Sadece mevcut seviyeleri ayarla
    setBulkCurrentOnly() {
        const currentVal = document.getElementById('bulkCurrent')?.value;
        
        if (!currentVal) {
            showError('Lütfen mevcut seviye seçin!');
            return;
        }

        this.equipmentData.forEach(equip => {
            equip.slots.forEach(slot => {
                const currentSelect = document.getElementById(`${equip.id}-${slot.id}-current`);
                if (currentSelect) currentSelect.value = currentVal;
            });
        });
        
        showSuccess('Mevcut seviyeler güncellendi!');
    },

    // Sadece hedef seviyeleri ayarla
    setBulkTargetOnly() {
        const targetVal = document.getElementById('bulkTarget')?.value;
        
        if (!targetVal) {
            showError('Lütfen hedef seviye seçin!');
            return;
        }

        this.equipmentData.forEach(equip => {
            equip.slots.forEach(slot => {
                const targetSelect = document.getElementById(`${equip.id}-${slot.id}-target`);
                if (targetSelect) targetSelect.value = targetVal;
            });
        });
        
        showSuccess('Hedef seviyeler güncellendi!');
    },

    // Malzemeleri sıfırla
    resetMaterials() {
        ['material1', 'material2', 'material3', 'material4'].forEach(id => {
            const input = document.getElementById(id);
            if (input) input.value = 0;
        });
        
        showSuccess('Malzemeler sıfırlandı!');
    },

    // Tümünü sıfırla
    resetAll() {
        this.resetMaterials();
        this.initializeSelects();
        document.getElementById('resultsSection').style.display = 'none';
        showSuccess('Tüm veriler sıfırlandı!');
    },

    // Hesaplama fonksiyonu
    calculateUpgrade() {
        // Malzemeleri al
        const materials = {
            material1: getInputValue('material1', 0),
            material2: getInputValue('material2', 0),
            material3: getInputValue('material3', 0),
            material4: getInputValue('material4', 0)
        };

        let totalMaterials = { material1: 0, material2: 0, material3: 0, material4: 0 };
        const allUpgrades = [];

        const tableBody = document.getElementById('resultsTableBody');
        tableBody.innerHTML = '';

        // Tüm ekipmanları kontrol et
        this.equipmentData.forEach(equip => {
            equip.slots.forEach(slot => {
                const currentSelect = document.getElementById(`${equip.id}-${slot.id}-current`);
                const targetSelect = document.getElementById(`${equip.id}-${slot.id}-target`);
                
                const currentLevel = currentSelect?.value;
                const targetLevel = targetSelect?.value;
                
                if (currentLevel && targetLevel) {
                    const currentIndex = this.levelKeys.indexOf(currentLevel);
                    const targetIndex = this.levelKeys.indexOf(targetLevel);
                    
                    if (currentIndex < targetIndex) {
                        // Her seviye için ayrı satır oluştur
                        for (let i = currentIndex; i < targetIndex; i++) {
                            const levelKey = this.levelKeys[i + 1];
                            const cost = this.upgradeCosts[levelKey];
                            if (cost) {
                                // Toplam malzemelere ekle
                                totalMaterials.material1 += cost.material1;
                                totalMaterials.material2 += cost.material2;
                                totalMaterials.material3 += cost.material3;
                                totalMaterials.material4 += cost.material4;

                                // Upgrade'i kaydet
                                allUpgrades.push({
                                    equipment: `${equip.name[this.currentLanguage]} - ${slot.name[this.currentLanguage]}`,
                                    level: this.formatLevelName(levelKey),
                                    costs: cost
                                });
                            }
                        }
                    }
                }
            });
        });

        // Eğer hiç yükseltme yoksa
        if (allUpgrades.length === 0) {
            document.getElementById('resultsSection').style.display = 'none';
            showError('Hiç yükseltme seçilmemiş!');
            return;
        }

        // Tabloyu doldur
        allUpgrades.forEach(upgrade => {
            const row = createTableRow([
                `<strong>${upgrade.level}</strong>`,
                upgrade.equipment,
                formatNumber(upgrade.costs.material1),
                formatNumber(upgrade.costs.material2),
                formatNumber(upgrade.costs.material3),
                formatNumber(upgrade.costs.material4)
            ], 'level-row');
            tableBody.appendChild(row);
        });

        // Toplam satırını oluştur
        const footer = document.getElementById('resultsTableFooter');
        footer.innerHTML = '';

         // Malzeme durumlarını hesapla
        const materialStatus = {};
        Object.keys(totalMaterials).forEach(mat => {
            const status = calculateMaterialStatus(materials[mat], totalMaterials[mat]);
            materialStatus[mat] = status;
        });

        const t = this.translations[this.currentLanguage];
        const totalRow = createTableRow([
            { content: `<strong>${t.totalText}</strong>`, class: '' },
            '',
            { content: `${formatNumber(totalMaterials.material1)}<br><small>${materialStatus.material1.formattedWithSign}</small>`, class: materialStatus.material1.class },
            { content: `${formatNumber(totalMaterials.material2)}<br><small>${materialStatus.material2.formattedWithSign}</small>`, class: materialStatus.material2.class },
            { content: `${formatNumber(totalMaterials.material3)}<br><small>${materialStatus.material3.formattedWithSign}</small>`, class: materialStatus.material3.class },
            { content: `${formatNumber(totalMaterials.material4)}<br><small>${materialStatus.material4.formattedWithSign}</small>`, class: materialStatus.material4.class }
        ], 'total-row');
        
        footer.appendChild(totalRow);

        // Sonuçları göster
        document.getElementById('resultsSection').style.display = 'block';
        showSuccess('Hesaplama tamamlandı!');
    }
};

// Sayfa yüklendiğinde başlat
document.addEventListener('DOMContentLoaded', () => {
    ChiefEquipmentCalculator.init();
});

// Global fonksiyonlar (HTML'de onclick için)
function setBulkLevels() { ChiefEquipmentCalculator.setBulkLevels(); }
function setBulkCurrentOnly() { ChiefEquipmentCalculator.setBulkCurrentOnly(); }
function setBulkTargetOnly() { ChiefEquipmentCalculator.setBulkTargetOnly(); }
function calculateUpgrade() { ChiefEquipmentCalculator.calculateUpgrade(); }
function resetMaterials() { ChiefEquipmentCalculator.resetMaterials(); }
function resetAll() { ChiefEquipmentCalculator.resetAll(); }