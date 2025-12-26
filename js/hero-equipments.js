// js/hero-equipment.js

// Kahraman Donanımı Hesaplayıcı
const HeroEquipmentCalculator = {
    // Mevcut donanım tipi
    currentGearType: 'mitik',
    
    // Ekipman verileri
    equipmentData: [
        { id: 'piyade', name: 'Piyade', equipment: ['gözlük', 'eldiven', 'kemer', 'bot'] },
        { id: 'nisanci', name: 'Nişancı', equipment: ['gözlük', 'eldiven', 'kemer', 'bot'] },
        { id: 'mizrakci', name: 'Mızrakçı', equipment: ['gözlük', 'eldiven', 'kemer', 'bot'] }
    ],

    // Mitik Donanım XP verileri
    mitikGearXP: {
        1: 10, 2: 15, 3: 20, 4: 25, 5: 30, 6: 35, 7: 40, 8: 45, 9: 50, 10: 55,
        11: 60, 12: 65, 13: 70, 14: 75, 15: 80, 16: 85, 17: 90, 18: 95, 19: 100, 20: 105,
        21: 110, 22: 115, 23: 120, 24: 125, 25: 130, 26: 135, 27: 140, 28: 145, 29: 150, 30: 160,
        31: 170, 32: 180, 33: 190, 34: 200, 35: 210, 36: 220, 37: 230, 38: 240, 39: 250, 40: 270,
        41: 290, 42: 310, 43: 330, 44: 350, 45: 370, 46: 390, 47: 410, 48: 430, 49: 450, 50: 470,
        51: 490, 52: 510, 53: 530, 54: 550, 55: 570, 56: 590, 57: 610, 58: 630, 59: 650, 60: 680,
        61: 710, 62: 740, 63: 770, 64: 800, 65: 830, 66: 860, 67: 890, 68: 920, 69: 950, 70: 990,
        71: 1030, 72: 1070, 73: 1110, 74: 1150, 75: 1190, 76: 1230, 77: 1270, 78: 1310, 79: 1350, 80: 1400,
        81: 1450, 82: 1500, 83: 1550, 84: 1600, 85: 1650, 86: 1700, 87: 1750, 88: 1800, 89: 1850, 90: 1900,
        91: 1950, 92: 2000, 93: 2050, 94: 2100, 95: 2150, 96: 2200, 97: 2250, 98: 2300, 99: 2350, 100: 2400
    },

    // Mitik kümülatif XP
    cumulativeMitikXP: {},
    
    // Mitik donanım USTALIK SEVİYESİ için ESANS TAŞI miktarları
    mitikMasteryEssenceStones: {
        1: 10,    // Ustalık 1 -> 2: 10 esans taşı
        2: 20,    // Ustalık 2 -> 3: 20 esans taşı
        3: 30,    // Ustalık 3 -> 4: 30 esans taşı
        4: 40,    // Ustalık 4 -> 5: 40 esans taşı
        5: 50,    // Ustalık 5 -> 6: 50 esans taşı
        6: 60,    // Ustalık 6 -> 7: 60 esans taşı
        7: 70,    // Ustalık 7 -> 8: 70 esans taşı
        8: 80,    // Ustalık 8 -> 9: 80 esans taşı
        9: 90,    // Ustalık 9 -> 10: 90 esans taşı
        10: 100   // Ustalık 10 -> ? (max için 100 gösteriyoruz)
    },

    // Efsanevi Donanım XP verileri
    legendaryGearXP: {
        1: 0, 2: 2500, 3: 2550, 4: 2600, 5: 2650, 6: 2700, 7: 2750, 8: 2800, 9: 2850, 10: 2900,
        11: 2950, 12: 3000, 13: 3050, 14: 3100, 15: 3150, 16: 3200, 17: 3250, 18: 3300, 19: 3350, 20: 0,
        21: 3500, 22: 3550, 23: 3600, 24: 3650, 25: 3700, 26: 3750, 27: 3800, 28: 3850, 29: 3900, 30: 3950,
        31: 4000, 32: 4050, 33: 4100, 34: 4150, 35: 4200, 36: 4250, 37: 4300, 38: 4350, 39: 4400, 40: 0,
        41: 4450, 42: 4500, 43: 4550, 44: 4600, 45: 4650, 46: 4700, 47: 4750, 48: 4800, 49: 4850, 50: 4900,
        51: 4950, 52: 5000, 53: 5050, 54: 5100, 55: 5150, 56: 5200, 57: 5250, 58: 5300, 59: 5350, 60: 0,
        61: 5500, 62: 5600, 63: 5700, 64: 5800, 65: 5900, 66: 6000, 67: 6100, 68: 6200, 69: 6300, 70: 6400,
        71: 6500, 72: 6600, 73: 6700, 74: 6800, 75: 6900, 76: 7000, 77: 7100, 78: 7200, 79: 7300, 80: 0,
        81: 7500, 82: 7600, 83: 7700, 84: 7800, 85: 7900, 86: 8000, 87: 8100, 88: 8200, 89: 8300, 90: 8400,
        91: 8500, 92: 8600, 93: 8700, 94: 8800, 95: 8900, 96: 9000, 97: 9100, 98: 9200, 99: 9300, 100: 0
    },

    // Efsanevi özel seviye malzemeleri
    legendarySpecialLevels: {
        20: { mitril: 10, mitikDonanim: 3 },
        40: { mitril: 20, mitikDonanim: 5 },
        60: { mitril: 30, mitikDonanim: 5 },
        80: { mitril: 40, mitikDonanim: 10 },
        100: { mitril: 50, mitikDonanim: 10 }
    },

    // Efsanevi Ustalık Seviyeleri
    legendaryMasteryCosts: {
        11: { essence: 110, mitikDonanim: 1 },
        12: { essence: 120, mitikDonanim: 2 },
        13: { essence: 130, mitikDonanim: 3 },
        14: { essence: 140, mitikDonanim: 4 },
        15: { essence: 150, mitikDonanim: 5 },
        16: { essence: 160, mitikDonanim: 6 },
        17: { essence: 170, mitikDonanim: 7 },
        18: { essence: 180, mitikDonanim: 8 },
        19: { essence: 190, mitikDonanim: 9 },
        20: { essence: 200, mitikDonanim: 10 }
    },

    // Efsanevi kümülatif XP
    cumulativeLegendaryXP: {},

    // Başlatma
    init() {
        console.log('⚔️ Kahraman Donanımı Hesaplayıcı Başlatıldı');
        
        // Kümülatif XP'leri hesapla
        this.calculateCumulativeXP();
        
        // Seviye dropdown'larını doldur
        this.initializeLevelSelects();
        
        // Sistem açıklamasını güncelle
        this.updateSystemInfo('mitik');
        
        // Event listener'ları ekle
        this.setupEventListeners();
    },

    // Kümülatif XP'leri hesapla
    calculateCumulativeXP() {
        // Mitik kümülatif XP
        let mitikTotal = 0;
        for (let level = 1; level <= 100; level++) {
            mitikTotal += this.mitikGearXP[level];
            this.cumulativeMitikXP[level] = mitikTotal;
        }

        // Efsanevi kümülatif XP
        let legendaryTotal = 0;
        for (let level = 1; level <= 100; level++) {
            legendaryTotal += this.legendaryGearXP[level];
            this.cumulativeLegendaryXP[level] = legendaryTotal;
        }
    },

    // Event listener'ları kur
    setupEventListeners() {
        // Hesapla butonu
        document.querySelector('.btn-primary')?.addEventListener('click', () => this.calculateUpgrade());
        
        // Sıfırla butonları
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(btn => {
            if (btn.textContent.includes('Malzemeleri Sıfırla')) {
                btn.addEventListener('click', () => this.resetMaterials());
            }
            if (btn.textContent.includes('Tümünü Sıfırla')) {
                btn.addEventListener('click', () => this.resetAll());
            }
        });
    },

    // Donanım tipi değiştirme
    changeGearType(type) {
        this.currentGearType = type;
        
        // Butonları güncelle
        document.querySelectorAll('.gear-type-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Aktif butonu bul ve aktif yap
        const activeBtn = document.querySelector(`.gear-type-btn.${type}`);
        if (activeBtn) activeBtn.classList.add('active');

        // İlgili birimleri göster/gizle
        document.getElementById('mitik-units').style.display = type === 'mitik' ? 'grid' : 'none';
        document.getElementById('efsanevi-units').style.display = type === 'efsanevi' ? 'grid' : 'none';

        // Sistem açıklamasını güncelle
        this.updateSystemInfo(type);
    },

    // Sistem açıklamasını güncelle
    updateSystemInfo(type) {
        const infoElement = document.getElementById('dynamic-info');
        if (!infoElement) return;
        
        if (type === 'mitik') {
            infoElement.innerHTML = `
                <strong>🎯 Mitik Donanım Sistemi</strong><br><br>
                • <strong>Ekipman Seviyesi (1-100):</strong><br>
                &nbsp;&nbsp;Sadece XP kullanılır<br>
                &nbsp;&nbsp;Toplam: 73.320 XP<br><br>
                • <strong>Ustalık Seviyesi (1-10):</strong><br>
                &nbsp;&nbsp;Sadece Esans Taşı kullanılır<br>
                &nbsp;&nbsp;Toplam: 550 Esans Taşı
            `;
            infoElement.style.borderLeftColor = '#9c27b0';
            infoElement.style.background = '#f3e5f5';
        } else {
            infoElement.innerHTML = `
                <strong>🔥 Efsanevi Donanım Sistemi</strong><br><br>
                • <strong>Ekipman Seviyesi (1-100):</strong><br>
                &nbsp;&nbsp;XP + Özel malzemeler<br>
                &nbsp;&nbsp;Özel seviyeler: 20, 40, 60, 80, 100<br><br>
                • <strong>Ustalık Seviyesi (10-20):</strong><br>
                &nbsp;&nbsp;Esans Taşı + Mitik Donanım<br>
                &nbsp;&nbsp;Her seviye artışında malzeme gerekir
            `;
            infoElement.style.borderLeftColor = '#ff9800';
            infoElement.style.background = '#fff3e0';
        }
    },

    // Seviye dropdown'larını doldur
    initializeLevelSelects() {
        this.equipmentData.forEach(unit => {
            unit.equipment.forEach(equip => {
                // Mitik donanım seviyeleri (1-100)
                const mitikLevelCurrent = document.getElementById(`${unit.id}-${equip}-level-current-mitik`);
                const mitikLevelTarget = document.getElementById(`${unit.id}-${equip}-level-target-mitik`);
                this.fillLevelOptions(mitikLevelCurrent, 100, 'Seviye');
                this.fillLevelOptions(mitikLevelTarget, 100, 'Seviye');

                // Mitik ustalık seviyeleri (1-10)
                const mitikMasteryCurrent = document.getElementById(`${unit.id}-${equip}-mastery-current-mitik`);
                const mitikMasteryTarget = document.getElementById(`${unit.id}-${equip}-mastery-target-mitik`);
                this.fillMasteryOptions(mitikMasteryCurrent, 1, 10, 'Ustalık');
                this.fillMasteryOptions(mitikMasteryTarget, 1, 10, 'Ustalık');

                // Efsanevi donanım seviyeleri (1-100)
                const efsaneviLevelCurrent = document.getElementById(`${unit.id}-${equip}-level-current-efsanevi`);
                const efsaneviLevelTarget = document.getElementById(`${unit.id}-${equip}-level-target-efsanevi`);
                this.fillLevelOptions(efsaneviLevelCurrent, 100, 'Seviye');
                this.fillLevelOptions(efsaneviLevelTarget, 100, 'Seviye');

                // Efsanevi ustalık seviyeleri (10-20)
                const efsaneviMasteryCurrent = document.getElementById(`${unit.id}-${equip}-mastery-current-efsanevi`);
                const efsaneviMasteryTarget = document.getElementById(`${unit.id}-${equip}-mastery-target-efsanevi`);
                this.fillMasteryOptions(efsaneviMasteryCurrent, 10, 20, 'Ustalık');
                this.fillMasteryOptions(efsaneviMasteryTarget, 10, 20, 'Ustalık');
            });
        });
    },

    // Donanım seviye dropdown'larını doldur
    fillLevelOptions(selectElement, maxLevel, prefix) {
        if (!selectElement) return;
        
        const isCurrent = selectElement.id.includes('current');
        selectElement.innerHTML = `<option value="">${isCurrent ? 'Mevcut' : 'Hedef'}</option>`;
        
        for (let level = 1; level <= maxLevel; level++) {
            const option = document.createElement('option');
            option.value = level;
            option.textContent = `${prefix} ${level}`;
            selectElement.appendChild(option);
        }
    },

    // Ustalık seviye dropdown'larını doldur
    fillMasteryOptions(selectElement, minMastery, maxMastery, prefix) {
        if (!selectElement) return;
        
        const isCurrent = selectElement.id.includes('current');
        selectElement.innerHTML = `<option value="">${isCurrent ? 'Mevcut' : 'Hedef'}</option>`;
        
        for (let mastery = minMastery; mastery <= maxMastery; mastery++) {
            const option = document.createElement('option');
            option.value = mastery;
            option.textContent = `${prefix} ${mastery}`;
            selectElement.appendChild(option);
        }
    },

    // Malzemeleri sıfırla
    resetMaterials() {
        ['material-xp', 'material-essence', 'material-mitril', 'material-mitik'].forEach(id => {
            const input = document.getElementById(id);
            if (input) input.value = 0;
        });
        
        showSuccess('Malzemeler sıfırlandı!');
    },

    // Tümünü sıfırla
    resetAll() {
        this.resetMaterials();
        this.initializeLevelSelects();
        document.getElementById('resultsSection').classList.remove('show');
        showSuccess('Tüm veriler sıfırlandı!');
    },

    // Hesaplama fonksiyonu
    calculateUpgrade() {
        // Malzemeleri al
        const materials = {
            xp: getInputValue('material-xp', 0),
            essence: getInputValue('material-essence', 0),
            mitril: getInputValue('material-mitril', 0),
            mitik: getInputValue('material-mitik', 0)
        };

        let totalCostMitik = { xp: 0, essence: 0, mitril: 0, mitik: 0 };
        let totalCostEfsanevi = { xp: 0, essence: 0, mitril: 0, mitik: 0 };

        // Seçili tipe göre hesapla
        if (this.currentGearType === 'mitik') {
            this.equipmentData.forEach(unit => {
                unit.equipment.forEach(equip => {
                    this.calculateMitikGearCost(unit.id, equip, totalCostMitik);
                });
            });
        } else {
            this.equipmentData.forEach(unit => {
                unit.equipment.forEach(equip => {
                    this.calculateLegendaryGearCost(unit.id, equip, totalCostEfsanevi);
                });
            });
        }

        // Sonuçları göster
        this.showResults(totalCostMitik, totalCostEfsanevi, materials);
    },

    // Mitik donanım hesaplama
    calculateMitikGearCost(unitId, equip, totalCost) {
        // Ekipman seviyesi - SADECE XP
        const levelCurrent = document.getElementById(`${unitId}-${equip}-level-current-mitik`);
        const levelTarget = document.getElementById(`${unitId}-${equip}-level-target-mitik`);
        
        const currentLevel = levelCurrent?.value ? parseInt(levelCurrent.value) : 0;
        const targetLevel = levelTarget?.value ? parseInt(levelTarget.value) : 0;
        
        if (currentLevel > 0 && targetLevel > 0 && currentLevel < targetLevel) {
            const startXP = currentLevel > 0 ? this.cumulativeMitikXP[currentLevel] : 0;
            const endXP = this.cumulativeMitikXP[targetLevel];
            totalCost.xp += (endXP - startXP);
        }

        // Ustalık seviyesi - SADECE ESANS TAŞI
        const masteryCurrent = document.getElementById(`${unitId}-${equip}-mastery-current-mitik`);
        const masteryTarget = document.getElementById(`${unitId}-${equip}-mastery-target-mitik`);
        
        const currentMastery = masteryCurrent?.value ? parseInt(masteryCurrent.value) : 0;
        const targetMastery = masteryTarget?.value ? parseInt(masteryTarget.value) : 0;
        
        if (currentMastery > 0 && targetMastery > 0 && currentMastery < targetMastery) {
            for (let mastery = currentMastery + 1; mastery <= targetMastery; mastery++) {
                const essenceStones = this.mitikMasteryEssenceStones[mastery] || 0;
                totalCost.essence += essenceStones;
            }
        }
    },

    // Efsanevi donanım hesaplama
    calculateLegendaryGearCost(unitId, equip, totalCost) {
        // Ekipman seviyesi
        const levelCurrent = document.getElementById(`${unitId}-${equip}-level-current-efsanevi`);
        const levelTarget = document.getElementById(`${unitId}-${equip}-level-target-efsanevi`);
        
        const currentLevel = levelCurrent?.value ? parseInt(levelCurrent.value) : 0;
        const targetLevel = levelTarget?.value ? parseInt(levelTarget.value) : 0;
        
        if (currentLevel > 0 && targetLevel > 0 && currentLevel < targetLevel) {
            // XP hesaplama
            const startXP = currentLevel > 0 ? this.cumulativeLegendaryXP[currentLevel] : 0;
            const endXP = this.cumulativeLegendaryXP[targetLevel];
            totalCost.xp += (endXP - startXP);
            
            // Özel seviye malzemeleri
            for (let level = currentLevel + 1; level <= targetLevel; level++) {
                if (this.legendarySpecialLevels[level]) {
                    totalCost.mitril += this.legendarySpecialLevels[level].mitril;
                    totalCost.mitik += this.legendarySpecialLevels[level].mitikDonanim;
                }
            }
        }

        // Ustalık seviyesi
        const masteryCurrent = document.getElementById(`${unitId}-${equip}-mastery-current-efsanevi`);
        const masteryTarget = document.getElementById(`${unitId}-${equip}-mastery-target-efsanevi`);
        
        const currentMastery = masteryCurrent?.value ? parseInt(masteryCurrent.value) : 0;
        const targetMastery = masteryTarget?.value ? parseInt(masteryTarget.value) : 0;
        
        if (currentMastery > 0 && targetMastery > 0 && currentMastery < targetMastery) {
            for (let mastery = currentMastery + 1; mastery <= targetMastery; mastery++) {
                if (this.legendaryMasteryCosts[mastery]) {
                    totalCost.essence += this.legendaryMasteryCosts[mastery].essence;
                    totalCost.mitik += this.legendaryMasteryCosts[mastery].mitikDonanim;
                }
            }
        }
    },

    // Sonuçları göster
    showResults(costMitik, costEfsanevi, materials) {
        // Mitik donanım sonuçları
        document.getElementById('total-xp-mitik').textContent = formatNumber(costMitik.xp) + " XP";
        document.getElementById('total-essence-mitik').textContent = formatNumber(costMitik.essence) + " Esans Taşı";

        // Efsanevi donanım sonuçları
        document.getElementById('total-xp-efsanevi').textContent = formatNumber(costEfsanevi.xp) + " XP";
        document.getElementById('total-essence-efsanevi').textContent = formatNumber(costEfsanevi.essence) + " Esans Taşı";
        document.getElementById('total-mitril-efsanevi').textContent = formatNumber(costEfsanevi.mitril) + " Mitril";
        document.getElementById('total-mitik-efsanevi').textContent = formatNumber(costEfsanevi.mitik) + " Mitik Donanım";

        // Toplam maliyetler (seçili türe göre)
        const totalCost = this.currentGearType === 'mitik' ? costMitik : costEfsanevi;
        
        document.getElementById('total-xp-all').textContent = formatNumber(totalCost.xp) + " XP";
        document.getElementById('total-essence-all').textContent = formatNumber(totalCost.essence) + " Esans Taşı";
        document.getElementById('total-mitril-all').textContent = formatNumber(totalCost.mitril) + " Mitril";
        document.getElementById('total-mitik-all').textContent = formatNumber(totalCost.mitik) + " Mitik Donanım";

        // Durum mesajını belirle
        const statusElement = document.getElementById('status-message');
        const hasEnoughMaterials = 
            materials.xp >= totalCost.xp &&
            materials.essence >= totalCost.essence &&
            materials.mitril >= totalCost.mitril &&
            materials.mitik >= totalCost.mitik;

        if (totalCost.xp === 0 && totalCost.essence === 0 && totalCost.mitril === 0 && totalCost.mitik === 0) {
            statusElement.textContent = "Yükseltme seçilmemiş";
            statusElement.className = "cost-value";
        } else if (hasEnoughMaterials) {
            statusElement.textContent = "✓ Yeterli malzemeniz var";
            statusElement.className = "cost-value excess";
        } else {
            statusElement.textContent = "✗ Yeterli malzemeniz yok";
            statusElement.className = "cost-value missing";
        }

        // Sonuçları göster
        document.getElementById('resultsSection').classList.add('show');
        showSuccess('Hesaplama tamamlandı!');
    }
};

// Sayfa yüklendiğinde başlat
document.addEventListener('DOMContentLoaded', () => {
    HeroEquipmentCalculator.init();
});

// Global fonksiyonlar (HTML'de onclick için)
function changeGearType(type) { HeroEquipmentCalculator.changeGearType(type); }
function calculateUpgrade() { HeroEquipmentCalculator.calculateUpgrade(); }
function resetMaterials() { HeroEquipmentCalculator.resetMaterials(); }
function resetAll() { HeroEquipmentCalculator.resetAll(); }