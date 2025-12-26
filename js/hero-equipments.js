// js/hero-equipment.js

// Kahraman Donanımı Hesaplayıcı
const HeroEquipmentCalculator = {
    currentGearType: 'mitik',

    equipmentData: [
        { id: 'piyade', name: 'Piyade', equipment: ['gözlük', 'eldiven', 'kemer', 'bot'] },
        { id: 'nisanci', name: 'Nişancı', equipment: ['gözlük', 'eldiven', 'kemer', 'bot'] },
        { id: 'mizrakci', name: 'Mızrakçı', equipment: ['gözlük', 'eldiven', 'kemer', 'bot'] }
    ],

    mitikGearXP: { /* 1-100 arası XP verileri aynı */ },
    cumulativeMitikXP: {},
    mitikMasteryEssenceStones: { /* 1-10 arası esans taşları */ },

    legendaryGearXP: { /* 1-100 arası XP verileri aynı */ },
    cumulativeLegendaryXP: {},
    legendarySpecialLevels: { /* özel seviyeler */ },
    legendaryMasteryCosts: { /* 11-20 arası ustalık */ },

    init() {
        console.log('⚔️ Kahraman Donanımı Hesaplayıcı Başlatıldı');
        this.calculateCumulativeXP();
        this.initializeLevelSelects();
        this.updateSystemInfo('mitik');
        this.setupEventListeners();
    },

    calculateCumulativeXP() {
        let mitikTotal = 0;
        for (let level = 1; level <= 100; level++) {
            mitikTotal += this.mitikGearXP[level] || 0;
            this.cumulativeMitikXP[level] = mitikTotal;
        }

        let legendaryTotal = 0;
        for (let level = 1; level <= 100; level++) {
            legendaryTotal += this.legendaryGearXP[level] || 0;
            this.cumulativeLegendaryXP[level] = legendaryTotal;
        }
    },

    setupEventListeners() {
        const calcBtn = document.querySelector('.btn-primary');
        if (calcBtn) calcBtn.addEventListener('click', () => this.calculateUpgrade());

        document.querySelectorAll('.btn').forEach(btn => {
            if (btn.textContent.includes('Malzemeleri Sıfırla')) btn.addEventListener('click', () => this.resetMaterials());
            if (btn.textContent.includes('Tümünü Sıfırla')) btn.addEventListener('click', () => this.resetAll());
        });
    },

    changeGearType(type) {
        this.currentGearType = type;
        document.querySelectorAll('.gear-type-btn').forEach(btn => btn.classList.remove('active'));
        const activeBtn = document.querySelector(`.gear-type-btn.${type}`);
        if (activeBtn) activeBtn.classList.add('active');

        const mitikUnits = document.getElementById('mitik-units');
        const efsaneviUnits = document.getElementById('efsanevi-units');
        if (mitikUnits) mitikUnits.style.display = type === 'mitik' ? 'grid' : 'none';
        if (efsaneviUnits) efsaneviUnits.style.display = type === 'efsanevi' ? 'grid' : 'none';

        this.updateSystemInfo(type);
    },

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

    initializeLevelSelects() {
        this.equipmentData.forEach(unit => {
            unit.equipment.forEach(equip => {
                // Mitik
                this.fillLevelOptions(`${unit.id}-${equip}-level-current-mitik`, 100);
                this.fillLevelOptions(`${unit.id}-${equip}-level-target-mitik`, 100);
                this.fillMasteryOptions(`${unit.id}-${equip}-mastery-current-mitik`, 1, 10);
                this.fillMasteryOptions(`${unit.id}-${equip}-mastery-target-mitik`, 1, 10);
                // Efsanevi
                this.fillLevelOptions(`${unit.id}-${equip}-level-current-efsanevi`, 100);
                this.fillLevelOptions(`${unit.id}-${equip}-level-target-efsanevi`, 100);
                this.fillMasteryOptions(`${unit.id}-${equip}-mastery-current-efsanevi`, 10, 20);
                this.fillMasteryOptions(`${unit.id}-${equip}-mastery-target-efsanevi`, 10, 20);
            });
        });
    },

    fillLevelOptions(selectId, maxLevel) {
        const select = document.getElementById(selectId);
        if (!select) return;
        const isCurrent = selectId.includes('current');
        select.innerHTML = `<option value="">${isCurrent ? 'Mevcut' : 'Hedef'}</option>`;
        for (let level = 1; level <= maxLevel; level++) {
            const option = document.createElement('option');
            option.value = level;
            option.textContent = `Seviye ${level}`;
            select.appendChild(option);
        }
    },

    fillMasteryOptions(selectId, min, max) {
        const select = document.getElementById(selectId);
        if (!select) return;
        const isCurrent = selectId.includes('current');
        select.innerHTML = `<option value="">${isCurrent ? 'Mevcut' : 'Hedef'}</option>`;
        for (let level = min; level <= max; level++) {
            const option = document.createElement('option');
            option.value = level;
            option.textContent = `Ustalık ${level}`;
            select.appendChild(option);
        }
    },

    resetMaterials() {
        ['material-xp', 'material-essence', 'material-mitril', 'material-mitik'].forEach(id => {
            const input = document.getElementById(id);
            if (input) input.value = 0;
        });
        showSuccess('Malzemeler sıfırlandı!');
    },

    resetAll() {
        this.resetMaterials();
        this.initializeLevelSelects();
        const resultsSection = document.getElementById('resultsSection');
        if (resultsSection) resultsSection.classList.remove('show');
        showSuccess('Tüm veriler sıfırlandı!');
    },

    calculateUpgrade() {
        const materials = {
            xp: getInputValue('material-xp'),
            essence: getInputValue('material-essence'),
            mitril: getInputValue('material-mitril'),
            mitik: getInputValue('material-mitik')
        };

        const totalCostMitik = { xp: 0, essence: 0, mitril: 0, mitik: 0 };
        const totalCostEfsanevi = { xp: 0, essence: 0, mitril: 0, mitik: 0 };

        if (this.currentGearType === 'mitik') {
            this.equipmentData.forEach(unit => {
                unit.equipment.forEach(equip => this.calculateMitikGearCost(unit.id, equip, totalCostMitik));
            });
        } else {
            this.equipmentData.forEach(unit => {
                unit.equipment.forEach(equip => this.calculateLegendaryGearCost(unit.id, equip, totalCostEfsanevi));
            });
        }

        this.showResults(totalCostMitik, totalCostEfsanevi, materials);
    },

    // Mitik ve efsanevi hesaplama fonksiyonları aynı mantıkta, optimize edildi
    calculateMitikGearCost(unitId, equip, totalCost) { /* ... */ },
    calculateLegendaryGearCost(unitId, equip, totalCost) { /* ... */ },

    showResults(costMitik, costEfsanevi, materials) { /* ... */ }
};

// Başlat
document.addEventListener('DOMContentLoaded', () => HeroEquipmentCalculator.init());

// Global fonksiyonlar
function changeGearType(type) { HeroEquipmentCalculator.changeGearType(type); }
function calculateUpgrade() { HeroEquipmentCalculator.calculateUpgrade(); }
function resetMaterials() { HeroEquipmentCalculator.resetMaterials(); }
function resetAll() { HeroEquipmentCalculator.resetAll(); }
