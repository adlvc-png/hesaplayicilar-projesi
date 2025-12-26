// js/utils.js

// Yardımcı fonksiyonlar - Tüm hesaplayıcılarda kullanılacak

/**
 * Binlik ayracı ekle (1.000.000 formatı)
 */
function formatNumber(num) {
    if (num === undefined || num === null) return '0';
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

/**
 * Sayıyı formatla ve birim ekle
 */
function formatWithUnit(num, unit = '') {
    return `${formatNumber(num)}${unit ? ' ' + unit : ''}`;
}

/**
 * Yüzde formatla
 */
function formatPercentage(num) {
    return `${formatNumber(num)}%`;
}

/**
 * Input değerini güvenli şekilde al (number)
 */
function getInputValue(id, defaultValue = 0) {
    const element = document.getElementById(id);
    if (!element) return defaultValue;
    
    const value = parseInt(element.value);
    return isNaN(value) ? defaultValue : value;
}

/**
 * Select değerini güvenli şekilde al
 */
function getSelectValue(id, defaultValue = '') {
    const element = document.getElementById(id);
    if (!element) return defaultValue;
    return element.value || defaultValue;
}

/**
 * Malzeme durumunu hesapla
 */
function calculateMaterialStatus(available, required) {
    const difference = available - required;
    
    return {
        difference: difference,
        isEnough: difference >= 0,
        formatted: formatNumber(Math.abs(difference)),
        formattedWithSign: difference > 0 ? `+${formatNumber(difference)}` : 
                          difference < 0 ? `-${formatNumber(Math.abs(difference))}` : '0',
        class: difference >= 0 ? 'excess' : 'missing'
    };
}

/**
 * Seviye aralığı oluştur
 */
function generateLevelOptions(min, max, prefix = 'Seviye', includeEmpty = true) {
    let options = includeEmpty ? '<option value="">-- Seçiniz --</option>' : '';
    
    for (let level = min; level <= max; level++) {
        options += `<option value="${level}">${prefix} ${level}</option>`;
    }
    
    return options;
}

/**
 * Dropdown doldur
 */
function fillSelect(selectId, options, selectedValue = '') {
    const select = document.getElementById(selectId);
    if (!select) return;
    
    select.innerHTML = options;
    
    if (selectedValue) {
        select.value = selectedValue;
    }
}

/**
 * Tüm dropdown'ları doldur
 */
function fillAllSelects(selectIds, options, selectedValues = {}) {
    selectIds.forEach(id => {
        const selectedValue = selectedValues[id] || '';
        fillSelect(id, options, selectedValue);
    });
}

/**
 * Tüm inputları sıfırla
 */
function resetAllInputs(inputIds) {
    inputIds.forEach(id => {
        const input = document.getElementById(id);
        if (input) input.value = '';
    });
}

/**
 * Sonuçları göster/gizle
 */
function toggleResults(show = true, resultsId = 'resultsSection') {
    const resultsSection = document.getElementById(resultsId);
    if (resultsSection) {
        resultsSection.style.display = show ? 'block' : 'none';
    }
}

/**
 * Tablo satırı oluştur
 */
function createTableRow(data, rowClass = '') {
    const row = document.createElement('tr');
    if (rowClass) row.className = rowClass;
    
    data.forEach(cellData => {
        const cell = document.createElement('td');
        if (typeof cellData === 'object' && cellData.content) {
            cell.innerHTML = cellData.content;
            if (cellData.class) cell.className = cellData.class;
        } else {
            cell.textContent = cellData;
        }
        row.appendChild(cell);
    });
    
    return row;
}

/**
 * Tablo başlığı oluştur
 */
function createTableHeader(headers) {
    const headerRow = document.createElement('tr');
    
    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    
    return headerRow;
}

/**
 * Hata mesajı göster
 */
function showError(message, duration = 3000) {
    // Basit hata mesajı gösterimi
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
        <span>❌ ${message}</span>
        <button onclick="this.parentElement.remove()">×</button>
    `;
    
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #dc3545;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(220, 53, 69, 0.3);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: 300px;
        max-width: 500px;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(errorDiv);
    
    // Otomatik kaldırma
    setTimeout(() => {
        if (errorDiv.parentElement) {
            errorDiv.remove();
        }
    }, duration);
}

/**
 * Başarı mesajı göster
 */
function showSuccess(message, duration = 3000) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <span>✅ ${message}</span>
        <button onclick="this.parentElement.remove()">×</button>
    `;
    
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: 300px;
        max-width: 500px;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        if (successDiv.parentElement) {
            successDiv.remove();
        }
    }, duration);
}

/**
 * Animasyon için CSS ekle
 */
function addAnimationStyles() {
    if (!document.getElementById('utils-animations')) {
        const style = document.createElement('style');
        style.id = 'utils-animations';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            .error-message button,
            .success-message button {
                background: none;
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                margin-left: 15px;
                padding: 0 5px;
            }
            
            .error-message button:hover,
            .success-message button:hover {
                opacity: 0.8;
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Sayfa yüklendiğinde yardımcıları başlat
 */
function initUtils() {
    addAnimationStyles();
    console.log('🛠️ Yardımcı fonksiyonlar yüklendi');
}

// Sayfa yüklendiğinde başlat
document.addEventListener('DOMContentLoaded', initUtils);

// Global erişim için export (tarayıcıda window objesine ekle)
if (typeof window !== 'undefined') {
    window.Utils = {
        formatNumber,
        formatWithUnit,
        formatPercentage,
        getInputValue,
        getSelectValue,
        calculateMaterialStatus,
        generateLevelOptions,
        fillSelect,
        fillAllSelects,
        resetAllInputs,
        toggleResults,
        createTableRow,
        createTableHeader,
        showError,
        showSuccess
    };
}