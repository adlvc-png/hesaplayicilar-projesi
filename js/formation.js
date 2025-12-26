// js/formation.js

// Formasyon Hesaplayıcı
const FormationCalculator = {
    // Varsayılan ekip kapasiteleri
    defaultSquadCapacities: [1250, 1250, 1250, 1250, 1250, 1250, 1250, 1250],
    
    // Mevcut ekip sayısı
    currentSquadCount: 8,
    
    // Başlatma
    init() {
        console.log('🎯 Formasyon Hesaplayıcı Başlatıldı');
        
        // Ekip kapasitelerini oluştur
        this.initializeSquadCapacities();
        
        // Event listener'ları ekle
        this.setupEventListeners();
        
        // Pencere boyutu değişikliğini dinle
        window.addEventListener('resize', () => this.initializeSquadCapacities());
    },
    
    // Event listener'ları kur
    setupEventListeners() {
        // Hesapla butonu
        document.querySelector('.btn-primary')?.addEventListener('click', () => this.calculateFormation());
        
        // Sıfırla butonu
        document.querySelector('.btn-secondary')?.addEventListener('click', () => this.resetForm());
        
        // Tümüne uygula butonu
        const applyButton = document.querySelector('.btn-small');
        if (applyButton) {
            applyButton.addEventListener('click', () => this.applyToAll());
        }
        
        // Ekip sayısı değişikliği
        const squadCountSelect = document.getElementById('squad-count');
        if (squadCountSelect) {
            squadCountSelect.addEventListener('change', () => this.updateSquadCount());
        }
    },
    
    // Ekip sayısını güncelle
    updateSquadCount() {
        const select = document.getElementById('squad-count');
        if (!select) return;
        
        this.currentSquadCount = parseInt(select.value);
        this.initializeSquadCapacities();
    },
    
    // Ekip kapasitelerini oluştur
    initializeSquadCapacities() {
        const container = document.getElementById('squad-capacity-container');
        if (!container) return;
        
        container.innerHTML = '';
        
        // Responsive grid columns hesapla
        let gridColumns = 4;
        if (window.innerWidth <= 768) gridColumns = 2;
        if (window.innerWidth <= 480) gridColumns = 1;
        if (this.currentSquadCount < gridColumns) gridColumns = this.currentSquadCount;
        
        container.style.gridTemplateColumns = `repeat(${gridColumns}, 1fr)`;
        
        // Her ekip için input oluştur
        for (let i = 0; i < this.currentSquadCount; i++) {
            const capacity = i < this.defaultSquadCapacities.length ? this.defaultSquadCapacities[i] : 1250;
            const squadItem = `
                <div class="squad-capacity-item">
                    <label for="squad-${i+1}">Ekip ${i+1}</label>
                    <input type="number" id="squad-${i+1}" value="${capacity}" min="0" placeholder="Kapasite">
                </div>
            `;
            container.innerHTML += squadItem;
        }
        
        // Ekip sayısını göster
        const squadCountDisplay = document.getElementById('squad-count-display');
        if (squadCountDisplay) {
            squadCountDisplay.textContent = this.currentSquadCount;
        }
    },
    
    // Tüm ekiplere aynı kapasiteyi uygula
    applyToAll() {
        const quickCapacity = document.getElementById('quick-capacity');
        if (!quickCapacity) return;
        
        const capacity = parseInt(quickCapacity.value) || 0;
        
        if (capacity === 0) {
            showError('Lütfen geçerli bir kapasite girin!');
            return;
        }
        
        for (let i = 1; i <= this.currentSquadCount; i++) {
            const input = document.getElementById(`squad-${i}`);
            if (input) input.value = capacity;
        }
        
        // Hızlı geri bildirim
        quickCapacity.style.borderColor = '#28a745';
        quickCapacity.style.background = '#f8fff9';
        
        setTimeout(() => {
            quickCapacity.style.borderColor = '#ced4da';
            quickCapacity.style.background = 'white';
        }, 1000);
        
        showSuccess(`Tüm ekiplere ${formatNumber(capacity)} kapasite uygulandı!`);
    },
    
    // Hesaplama fonksiyonu
    calculateFormation() {
        // Ekip kapasitelerini al
        const squadCapacities = [];
        let totalCapacity = 0;
        
        for (let i = 1; i <= this.currentSquadCount; i++) {
            const input = document.getElementById(`squad-${i}`);
            const capacity = input ? parseInt(input.value) || 0 : 0;
            squadCapacities.push(capacity);
            totalCapacity += capacity;
        }
        
        // Mevcut askerleri al
        const availableInfantry = getInputValue('infantry', 0);
        const availableSpearman = getInputValue('spearman', 0);
        const availableArcher = getInputValue('archer', 0);
        
        // Yüzdeleri al
        const infantryPercent = getInputValue('infantry-percent', 40);
        const spearmanPercent = getInputValue('spearman-percent', 35);
        const archerPercent = getInputValue('archer-percent', 25);
        
        // Yüzde toplamını kontrol et
        const totalPercent = infantryPercent + spearmanPercent + archerPercent;
        if (totalPercent !== 100) {
            showError(`Yüzde toplamı 100 olmalıdır! Şu an: ${totalPercent}%`);
            return;
        }
        
        // Toplam kapasiteyi göster
        const totalCapacityElement = document.getElementById('total-capacity');
        if (totalCapacityElement) {
            totalCapacityElement.textContent = formatNumber(totalCapacity);
        }
        
        const squadCountDisplay = document.getElementById('squad-count-display');
        if (squadCountDisplay) {
            squadCountDisplay.textContent = this.currentSquadCount;
        }
        
        // Her ekip için asker dağılımını hesapla ve toplam gereken askerleri bul
        let totalRequiredInfantry = 0;
        let totalRequiredSpearman = 0;
        let totalRequiredArcher = 0;
        const squadData = [];
        
        for (let i = 0; i < this.currentSquadCount; i++) {
            const capacity = squadCapacities[i];
            const infantry = Math.round(capacity * infantryPercent / 100);
            const spearman = Math.round(capacity * spearmanPercent / 100);
            const archer = Math.round(capacity * archerPercent / 100);
            
            totalRequiredInfantry += infantry;
            totalRequiredSpearman += spearman;
            totalRequiredArcher += archer;
            
            squadData.push({
                infantry: infantry,
                spearman: spearman,
                archer: archer,
                capacity: capacity,
                total: infantry + spearman + archer
            });
        }
        
        // Ekip bilgilerini göster
        this.displaySquads(squadData);
        
        // Durum analizini hesapla
        this.calculateStatus(
            availableInfantry, availableSpearman, availableArcher,
            totalRequiredInfantry, totalRequiredSpearman, totalRequiredArcher
        );
        
        showSuccess('Formasyon hesaplaması tamamlandı!');
    },
    
    // Ekip bilgilerini göster
    displaySquads(squadData) {
        const container = document.getElementById('squads-container');
        if (!container) return;
        
        container.innerHTML = '';
        
        // Responsive grid columns hesapla
        let gridColumns = 4;
        if (window.innerWidth <= 768) gridColumns = 2;
        if (window.innerWidth <= 480) gridColumns = 1;
        if (this.currentSquadCount < gridColumns) gridColumns = this.currentSquadCount;
        
        container.style.gridTemplateColumns = `repeat(${gridColumns}, 1fr)`;
        
        squadData.forEach((squad, index) => {
            const squadCard = `
                <div class="squad-card">
                    <div class="squad-title">Ekip ${index + 1}</div>
                    <div class="squad-numbers">
                        Piyade: ${formatNumber(squad.infantry)}<br>
                        Mızrakçı: ${formatNumber(squad.spearman)}<br>
                        Nişancı: ${formatNumber(squad.archer)}
                    </div>
                    <div class="squad-total">
                        ${formatNumber(squad.total)} / ${formatNumber(squad.capacity)}
                    </div>
                </div>
            `;
            container.innerHTML += squadCard;
        });
    },
    
    // Durum analizini hesapla ve göster
    calculateStatus(availableInf, availableSpe, availableArc, requiredInf, requiredSpe, requiredArc) {
        // Piyade durumu
        const infDifference = availableInf - requiredInf;
        const infElement = document.getElementById('infantry-status');
        if (infElement) {
            infElement.textContent = formatNumber(Math.abs(infDifference));
            infElement.className = 'result-value ' + (infDifference >= 0 ? 'positive' : 'negative');
            if (infDifference > 0) {
                infElement.textContent = '+' + formatNumber(infDifference);
            } else if (infDifference < 0) {
                infElement.textContent = '-' + formatNumber(Math.abs(infDifference));
            }
        }
        
        // Mızrakçı durumu
        const speDifference = availableSpe - requiredSpe;
        const speElement = document.getElementById('spearman-status');
        if (speElement) {
            speElement.textContent = formatNumber(Math.abs(speDifference));
            speElement.className = 'result-value ' + (speDifference >= 0 ? 'positive' : 'negative');
            if (speDifference > 0) {
                speElement.textContent = '+' + formatNumber(speDifference);
            } else if (speDifference < 0) {
                speElement.textContent = '-' + formatNumber(Math.abs(speDifference));
            }
        }
        
        // Nişancı durumu
        const arcDifference = availableArc - requiredArc;
        const arcElement = document.getElementById('archer-status');
        if (arcElement) {
            arcElement.textContent = formatNumber(Math.abs(arcDifference));
            arcElement.className = 'result-value ' + (arcDifference >= 0 ? 'positive' : 'negative');
            if (arcDifference > 0) {
                arcElement.textContent = '+' + formatNumber(arcDifference);
            } else if (arcDifference < 0) {
                arcElement.textContent = '-' + formatNumber(Math.abs(arcDifference));
            }
        }
    },
    
    // Formu sıfırla
    resetForm() {
        // Select'i sıfırla
        const squadCountSelect = document.getElementById('squad-count');
        if (squadCountSelect) squadCountSelect.value = '8';
        
        // Input'ları sıfırla
        ['infantry', 'spearman', 'archer', 'quick-capacity'].forEach(id => {
            const input = document.getElementById(id);
            if (input) input.value = '';
        });
        
        // Yüzdeleri varsayılana sıfırla
        document.getElementById('infantry-percent').value = '40';
        document.getElementById('spearman-percent').value = '35';
        document.getElementById('archer-percent').value = '25';
        
        // Ekip kapasitelerini varsayılana sıfırla
        this.currentSquadCount = 8;
        this.initializeSquadCapacities();
        
        // Sonuçları temizle
        const totalCapacityElement = document.getElementById('total-capacity');
        if (totalCapacityElement) totalCapacityElement.textContent = '0';
        
        const squadsContainer = document.getElementById('squads-container');
        if (squadsContainer) squadsContainer.innerHTML = '';
        
        // Durum göstergelerini sıfırla
        ['infantry-status', 'spearman-status', 'archer-status'].forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = '-';
                element.className = 'result-value';
            }
        });
        
        showSuccess('Form sıfırlandı!');
    }
};

// Sayfa yüklendiğinde başlat
document.addEventListener('DOMContentLoaded', () => {
    FormationCalculator.init();
});

// Global fonksiyonlar (HTML'de onchange ve onclick için)
function updateSquadCount() { FormationCalculator.updateSquadCount(); }
function applyToAll() { FormationCalculator.applyToAll(); }
function calculateFormation() { FormationCalculator.calculateFormation(); }
function resetForm() { FormationCalculator.resetForm(); }