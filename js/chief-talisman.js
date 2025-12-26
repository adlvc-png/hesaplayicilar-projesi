// js/chief-talisman.js

// Şef Tılsımı Hesaplayıcı
const ChiefTalismanCalculator = {
    // Dil çevirileri
    translations: {
        TR: {
            mainTitle: "Şef Tılsımı Yükseltme Hesaplayıcı",
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
            currentLevelsTitle: "Mevcut Seviyeler",
            targetLevelsTitle: "Hedef Seviyeler",
            materialsTitle: "Mevcut Malzemeler",
            material1Label: "Tılsım Klavuzu:",
            material2Label: "Tılsım Tasarımı:",
            material3Label: "Tılsım Sırları:",
            resultsTitle: "Yükseltme Sonuçları",
            levelHeader: "Seviye",
            equipmentHeader: "Ekipman - Slot",
            material1Header: "Tılsım Klavuzu",
            material2Header: "Tılsım Tasarımı",
            material3Header: "Tılsım Sırları",
            totalText: "TOPLAM",
            selectOption: "-- Seçiniz --",
            levelText: "Seviye"
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

    // Yükseltme maliyet verileri (Seviye 1-16)
    upgradeCosts: {
        1: { material1: 5, material2: 5, material3: 0 },
        2: { material1: 40, material2: 15, material3: 0 },
        3: { material1: 60, material2: 40, material3: 0 },
        4: { material1: 80, material2: 100, material3: 0 },
        5: { material1: 100, material2: 200, material3: 0 },
        6: { material1: 120, material2: 300, material3: 0 },
        7: { material1: 140, material2: 400, material3: 0 },
        8: { material1: 200, material2: 400, material3: 0 },
        9: { material1: 300, material2: 400, material3: 0 },
        10: { material1: 420, material2: 420, material3: 0 },
        11: { material1: 560, material2: 420, material3: 0 },
        12: { material1: 580, material2: 450, material3: 15 },
        13: { material1: 580, material2: 450, material3: 30 },
        14: { material1: 600, material2: 500, material3: 45 },
        15: { material1: 600, material2: 500, material3: 70 },
        16: { material1: 650, material2: 550, material3: 100 }
    },

    // Maksimum seviye
    maxLevel: 16,

    // Mevcut dil
    currentLanguage: 'TR',

    // Başlatma
    init() {
        console.log('🔮 Şef Tılsımı Hesaplayıcı Başlatıldı');
        
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
        
        // Level başlıkları
        for (let i = 1; i <= 6; i++) {
            this.setText(`currentLevelsTitle${i}`, t.currentLevelsTitle);
            this.setText(`targetLevelsTitle${i}`, t.targetLevelsTitle);
        }
        
        // Malzeme etiketleri
        this.setText('material1Label', t.material1Label);
        this.setText('material2Label', t.material2Label);
        this.setText('material3Label', t.material3Label);
        
        // Tablo başlıkları
        this.setText('levelHeader', t.levelHeader);
        this.setText('equipmentHeader', t.equipmentHeader);
        this.setText('material1Header', t.material1Header);
        this.setText('material2Header', t.material2Header);
        this.setText('material3Header', t.material3Header);
    },

    // Metin güncelleme yardımcısı
    setText(elementId, text) {
        const element = document.getElementById(elementId);
        if (element) element.textContent = text;
    },

    // Seviye option'larını oluştur
    generateLevelOptions() {
        const t = this.translations[this.currentLanguage];
        let options = `<option value="">${t.selectOption}</option>`;
        
        for (let level = 1; level <= this.maxLevel; level++) {
            options += `<option value="${level}">${t.levelText} ${level}</option>`;
        }
        
        return options;
    },

    // Dropdown'ları doldur
    initializeSelects() {
        const options = this.generateLevelOptions();
        
        // Tüm ekipman dropdown'larını doldur (3 slot için)
        this.equipmentData.forEach(equip => {
            equip.slots.forEach(slot => {
                for (let i = 1; i <= 3; i++) {
                    const currentSelect = document.getElementById(`${equip.id}-${slot.id}-current${i}`);
                    const targetSelect = document.getElementById(`${equip.id}-${slot.id}-target${i}`);
                    
                    if (currentSelect) currentSelect.innerHTML = options;
                    if (targetSelect) targetSelect.innerHTML = options;
                }
            });
        });

        // Toplu seçim dropdown'larını doldur
        const bulkCurrent = document.getElementById('bulkCurrent');
        const bulkTarget = document.getElementById('bulkTarget');
        
        const t = this.translations[this.currentLanguage];
        
        if (bulkCurrent) {
            bulkCurrent.innerHTML = `<option value="">${t.selectCurrent}</option>`;
            for (let level = 1; level <= this.maxLevel; level++) {
                bulkCurrent.innerHTML += `<option value="${level}">${t.levelText} ${level}</option>`;
            }
        }
        
        if (bulkTarget) {
            bulkTarget.innerHTML = `<option value="">${t.selectTarget}</option>`;
            for (let level = 1; level <= this.maxLevel; level++) {
                bulkTarget.innerHTML += `<option value="${level}">${t.levelText} ${level}</option>`;
            }
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
                for (let i = 1; i <= 3; i++) {
                    const currentSelect = document.getElementById(`${equip.id}-${slot.id}-current${i}`);
                    const targetSelect = document.getElementById(`${equip.id}-${slot.id}-target${i}`);
                    
                    if (currentVal && currentSelect) currentSelect.value = currentVal;
                    if (targetVal && targetSelect) targetSelect.value = targetVal;
                }
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
                for (let i = 1; i <= 3; i++) {
                    const currentSelect = document.getElementById(`${equip.id}-${slot.id}-current${i}`);
                    if (currentSelect) currentSelect.value = currentVal;
                }
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
                for (let i = 1; i <= 3; i++) {
                    const targetSelect = document.getElementById(`${equip.id}-${slot.id}-target${i}`);
                    if (targetSelect) targetSelect.value = targetVal;
                }
            });
        });
        
        showSuccess('Hedef seviyeler güncellendi!');
    },

    // Malzemeleri sıfırla
    resetMaterials() {
        ['material1', 'material2', 'material3'].forEach(id => {
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
            material3: getInputValue('material3', 0)
        };

        let totalMaterials = { material1: 0, material2: 0, material3: 0 };
        const allUpgrades = [];

        const tableBody = document.getElementById('resultsTableBody');
        tableBody.innerHTML = '';

        // Tüm ekipmanları kontrol et
        this.equipmentData.forEach(equip => {
            equip.slots.forEach(slot => {
                for (let slotNum = 1; slotNum <= 3; slotNum++) {
                    const currentSelect = document.getElementById(`${equip.id}-${slot.id}-current${slotNum}`);
                    const targetSelect = document.getElementById(`${equip.id}-${slot.id}-target${slotNum}`);
                    
                    const currentLevel = currentSelect?.value ? parseInt(currentSelect.value) : 0;
                    const targetLevel = targetSelect?.value ? parseInt(targetSelect.value) : 0;
                    
                    if (currentLevel < targetLevel) {
                        // Her seviye için ayrı satır oluştur (1'den başlayarak)
                        for (let level = currentLevel + 1; level <= targetLevel; level++) {
                            const cost = this.upgradeCosts[level];
                            if (cost) {
                                // Toplam malzemelere ekle
                                totalMaterials.material1 += cost.material1;
                                totalMaterials.material2 += cost.material2;
                                totalMaterials.material3 += cost.material3;

                                // Upgrade'i kaydet
                                allUpgrades.push({
                                    equipment: `${equip.name[this.currentLanguage]} - ${slot.name[this.currentLanguage]}`,
                                    slot: `Slot ${slotNum}`,
                                    level: level,
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

        // Seviye sırasına göre sırala
        allUpgrades.sort((a, b) => a.level - b.level);
        
        // Tabloyu doldur
        allUpgrades.forEach(upgrade => {
            const row = createTableRow([
                `<strong>${upgrade.level}</strong>`,
                `${upgrade.equipment} - ${upgrade.slot}`,
                formatNumber(upgrade.costs.material1),
                formatNumber(upgrade.costs.material2),
                formatNumber(upgrade.costs.material3)
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
            { content: `${formatNumber(totalMaterials.material3)}<br><small>${materialStatus.material3.formattedWithSign}</small>`, class: materialStatus.material3.class }
        ], 'total-row');
        
        footer.appendChild(totalRow);

        // Sonuçları göster
        document.getElementById('resultsSection').style.display = 'block';
        showSuccess('Hesaplama tamamlandı!');
    }
};

// Sayfa yüklendiğinde başlat
document.addEventListener('DOMContentLoaded', () => {
    ChiefTalismanCalculator.init();
});

// Global fonksiyonlar (HTML'de onclick için)
function setBulkLevels() { ChiefTalismanCalculator.setBulkLevels(); }
function setBulkCurrentOnly() { ChiefTalismanCalculator.setBulkCurrentOnly(); }
function setBulkTargetOnly() { ChiefTalismanCalculator.setBulkTargetOnly(); }
function calculateUpgrade() { ChiefTalismanCalculator.calculateUpgrade(); }
function resetMaterials() { ChiefTalismanCalculator.resetMaterials(); }
function resetAll() { ChiefTalismanCalculator.resetAll(); }