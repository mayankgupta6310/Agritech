/**
 * AgriTech Pro - Dashboard Application
 * Main JavaScript file for the crop advisory dashboard
 */

// API Base URL
const API_BASE = '/api';

// Global state
let appState = {
    crops: [],
    soilTypes: [],
    currentSeason: '',
    location: 'Delhi'
};

// ==================== Initialization ====================

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

async function initializeApp() {
    showLoading(true);
    
    try {
        // Set current date
        setCurrentDate();
        
        // Setup navigation
        setupNavigation();
        
        // Setup language selector
        setupLanguageSelector();
        
        // Setup event listeners
        setupEventListeners();
        
        // Load initial data
        await loadInitialData();
        
        // Load dashboard data
        await loadDashboardData();
        
        // Apply initial language
        if (typeof updateUILanguage === 'function') {
            updateUILanguage();
        }
        
        showToast('Dashboard loaded successfully', 'success');
    } catch (error) {
        console.error('Initialization error:', error);
        showToast('Error loading dashboard', 'error');
    } finally {
        showLoading(false);
    }
}

// ==================== Language Selector ====================

function setupLanguageSelector() {
    const langToggle = document.getElementById('lang-toggle');
    const langDropdown = document.getElementById('lang-dropdown');
    const langOptions = document.querySelectorAll('.lang-option');
    
    if (!langToggle || !langDropdown) return;
    
    // Toggle dropdown
    langToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        langToggle.classList.toggle('active');
        langDropdown.classList.toggle('show');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!langToggle.contains(e.target) && !langDropdown.contains(e.target)) {
            langToggle.classList.remove('active');
            langDropdown.classList.remove('show');
        }
    });
    
    // Handle language selection
    langOptions.forEach(option => {
        option.addEventListener('click', () => {
            const lang = option.dataset.lang;
            
            // Update active state
            langOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            
            // Update display name
            document.getElementById('current-lang-name').textContent = option.textContent;
            
            // Set language
            if (typeof setLanguage === 'function') {
                setLanguage(lang);
            }
            
            // Close dropdown
            langToggle.classList.remove('active');
            langDropdown.classList.remove('show');
            
            // Show feedback
            showToast(`Language changed to ${option.textContent}`, 'success');
        });
    });
    
    // Set initial active language
    const currentLang = typeof getCurrentLanguage === 'function' ? getCurrentLanguage() : 'en';
    const currentOption = document.querySelector(`.lang-option[data-lang="${currentLang}"]`);
    if (currentOption) {
        currentOption.classList.add('active');
        document.getElementById('current-lang-name').textContent = currentOption.textContent;
    }
}

function setCurrentDate() {
    const dateEl = document.getElementById('current-date');
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateEl.textContent = new Date().toLocaleDateString('en-US', options);
}

// ==================== Navigation ====================

function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const section = item.dataset.section;
            navigateToSection(section);
        });
    });
}

function navigateToSection(sectionId) {
    // Update nav items with smooth transition
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.toggle('active', item.dataset.section === sectionId);
    });
    
    // Get current and target sections
    const currentSection = document.querySelector('.content-section.active');
    const targetSection = document.getElementById(sectionId);
    
    if (currentSection && currentSection !== targetSection) {
        // Smooth transition between sections
        currentSection.classList.remove('active');
        
        // Small delay for smooth transition effect
        setTimeout(() => {
            targetSection.classList.add('active');
            
            // Re-trigger card animations in new section
            const cards = targetSection.querySelectorAll('.card');
            cards.forEach((card, index) => {
                card.style.animation = 'none';
                card.offsetHeight; // Trigger reflow
                card.style.animation = `cardSlideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s backwards`;
            });
        }, 150);
    } else if (!currentSection) {
        targetSection.classList.add('active');
    }
    
    // Update page title with fade effect
    const pageTitle = document.getElementById('page-title');
    const titles = {
        'dashboard': 'Dashboard',
        'yield-prediction': 'Yield Prediction',
        'crop-recommendation': 'Crop Recommendation',
        'advisory': 'Farming Advisory',
        'weather': 'Weather Information',
        'crop-info': 'Crop Database',
        'market-prices': 'Market Prices'
    };
    
    pageTitle.style.opacity = '0';
    pageTitle.style.transform = 'translateY(-10px)';
    setTimeout(() => {
        pageTitle.textContent = titles[sectionId] || 'Dashboard';
        pageTitle.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        pageTitle.style.opacity = '1';
        pageTitle.style.transform = 'translateY(0)';
    }, 150);
    
    // Load section-specific data if needed
    loadSectionData(sectionId);
}

async function loadSectionData(sectionId) {
    switch (sectionId) {
        case 'weather':
            await loadWeatherData();
            break;
        case 'advisory':
            await loadAdvisoryData();
            break;
        case 'market-prices':
            await loadMarketPricesData();
            break;
    }
}

// ==================== Event Listeners ====================

function setupEventListeners() {
    // Location input
    const locationInput = document.getElementById('location-input');
    locationInput.addEventListener('change', async (e) => {
        appState.location = e.target.value;
        await loadWeatherData();
    });
    
    // Quick action buttons
    document.querySelectorAll('.action-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const action = btn.dataset.action;
            switch (action) {
                case 'yield':
                    navigateToSection('yield-prediction');
                    break;
                case 'recommend':
                    navigateToSection('crop-recommendation');
                    break;
                case 'advisory':
                    navigateToSection('advisory');
                    break;
            }
        });
    });
    
    // Yield prediction form
    document.getElementById('yield-form').addEventListener('submit', handleYieldPrediction);
    
    // Crop recommendation form
    document.getElementById('recommend-form').addEventListener('submit', handleCropRecommendation);
    
    // Advisory controls
    document.getElementById('load-advisory').addEventListener('click', loadAdvisoryData);
    
    // Fertilizer calculator
    document.getElementById('calc-fertilizer').addEventListener('click', calculateFertilizer);
    
    // Crop info select
    document.getElementById('crop-info-select').addEventListener('change', loadCropDetails);
}

// ==================== Data Loading ====================

async function loadInitialData() {
    try {
        // Load crops list
        const cropsResponse = await fetch(`${API_BASE}/crops`);
        const cropsData = await cropsResponse.json();
        appState.crops = cropsData.crops || [];
        
        // Load soil types
        const soilResponse = await fetch(`${API_BASE}/soil-types`);
        const soilData = await soilResponse.json();
        appState.soilTypes = soilData.soil_types || [];
        
        // Load seasons
        const seasonResponse = await fetch(`${API_BASE}/seasons`);
        const seasonData = await seasonResponse.json();
        appState.currentSeason = seasonData.current_season;
        
        // Populate dropdowns
        populateDropdowns();
        
    } catch (error) {
        console.error('Error loading initial data:', error);
        // Use fallback data
        appState.crops = ['Rice', 'Wheat', 'Maize', 'Cotton', 'Sugarcane', 'Soybean', 'Groundnut', 'Potato', 'Tomato', 'Onion', 'Mustard', 'Sunflower', 'Barley', 'Millet', 'Sorghum'];
        appState.soilTypes = ['Alluvial', 'Black', 'Red', 'Laterite', 'Desert', 'Mountain', 'Loamy', 'Sandy', 'Clay', 'Peaty'];
        appState.currentSeason = 'Rabi';
        populateDropdowns();
    }
}

function populateDropdowns() {
    // Crop dropdowns
    const cropSelects = ['pred-crop', 'advisory-crop-filter', 'fert-crop', 'crop-info-select'];
    cropSelects.forEach(id => {
        const select = document.getElementById(id);
        if (select) {
            select.innerHTML = '<option value="">Select Crop</option>';
            appState.crops.forEach(crop => {
                select.innerHTML += `<option value="${crop}">${crop}</option>`;
            });
        }
    });
    
    // Soil type dropdown
    const soilSelect = document.getElementById('pred-soil');
    if (soilSelect) {
        soilSelect.innerHTML = '<option value="">Select Soil Type</option>';
        appState.soilTypes.forEach(soil => {
            soilSelect.innerHTML += `<option value="${soil}">${soil}</option>`;
        });
    }
}

async function loadDashboardData() {
    await Promise.all([
        loadWeatherWidget(),
        loadDailyTip(),
        loadModelMetrics(),
        loadSeasonInfo()
    ]);
}

async function loadWeatherWidget() {
    try {
        const response = await fetch(`${API_BASE}/weather?location=${appState.location}`);
        const data = await response.json();
        
        if (data.success) {
            const weather = data.weather;
            document.getElementById('current-temp').textContent = Math.round(weather.temperature);
            document.getElementById('humidity').textContent = weather.humidity;
            document.getElementById('wind-speed').textContent = weather.wind_speed;
            document.getElementById('weather-desc').textContent = weather.description;
        }
    } catch (error) {
        console.error('Error loading weather:', error);
    }
}

async function loadDailyTip() {
    try {
        const response = await fetch(`${API_BASE}/advisory/tip`);
        const data = await response.json();
        
        if (data.success) {
            document.getElementById('daily-tip').textContent = data.tip.tip;
            document.getElementById('tip-category').textContent = data.tip.category;
        }
    } catch (error) {
        console.error('Error loading tip:', error);
    }
}

async function loadModelMetrics() {
    try {
        const response = await fetch(`${API_BASE}/model/metrics`);
        const data = await response.json();
        
        if (data.success) {
            document.getElementById('model-r2').textContent = 
                (data.yield_predictor.r2_score * 100).toFixed(1) + '%';
            document.getElementById('model-accuracy').textContent = 
                (data.crop_recommender.accuracy * 100).toFixed(1) + '%';
        }
    } catch (error) {
        console.error('Error loading metrics:', error);
    }
}

async function loadSeasonInfo() {
    document.getElementById('current-season').textContent = appState.currentSeason;
    
    const seasonInfo = {
        'Kharif': 'Monsoon season (June-October). Ideal for rice, cotton, maize.',
        'Rabi': 'Winter season (October-March). Ideal for wheat, potato, mustard.',
        'Zaid': 'Summer season (March-June). Ideal for vegetables and fruits.'
    };
    
    document.getElementById('season-info').textContent = 
        seasonInfo[appState.currentSeason] || 'Season information not available';
}

// ==================== Yield Prediction ====================

async function handleYieldPrediction(e) {
    e.preventDefault();
    showLoading(true);
    
    const formData = {
        crop: document.getElementById('pred-crop').value,
        area: parseFloat(document.getElementById('pred-area').value),
        soil_type: document.getElementById('pred-soil').value,
        temperature: parseFloat(document.getElementById('pred-temp').value),
        rainfall: parseFloat(document.getElementById('pred-rainfall').value),
        humidity: parseFloat(document.getElementById('pred-humidity').value) || 70,
        ph: parseFloat(document.getElementById('pred-ph').value) || 6.5,
        nitrogen: parseFloat(document.getElementById('pred-nitrogen').value) || 50,
        phosphorus: parseFloat(document.getElementById('pred-phosphorus').value) || 30,
        potassium: parseFloat(document.getElementById('pred-potassium').value) || 60,
        fertilizer_used: parseFloat(document.getElementById('pred-fertilizer').value) || 100
    };
    
    try {
        const response = await fetch(`${API_BASE}/predict`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (data.success) {
            displayYieldResults(data.prediction, formData);
            showToast('Prediction completed successfully', 'success');
        } else {
            showToast(data.error || 'Prediction failed', 'error');
        }
    } catch (error) {
        console.error('Prediction error:', error);
        showToast('Error making prediction', 'error');
    } finally {
        showLoading(false);
    }
}

function displayYieldResults(prediction, input) {
    const resultsCard = document.getElementById('yield-results');
    resultsCard.style.display = 'block';
    
    document.getElementById('predicted-yield').textContent = prediction.predicted_yield;
    document.getElementById('prediction-confidence').textContent = prediction.confidence;
    
    const detailsDiv = document.getElementById('result-details');
    const totalYield = (prediction.predicted_yield * input.area).toFixed(2);
    
    detailsDiv.innerHTML = `
        <div class="result-summary">
            <h4>Summary</h4>
            <p><strong>Crop:</strong> ${input.crop}</p>
            <p><strong>Area:</strong> ${input.area} hectares</p>
            <p><strong>Total Expected Yield:</strong> ${totalYield} quintals</p>
            <p><strong>Model Accuracy (R² Score):</strong> ${(prediction.model_metrics.r2_score * 100).toFixed(1)}%</p>
        </div>
    `;
    
    // Scroll to results
    resultsCard.scrollIntoView({ behavior: 'smooth' });
}

// ==================== Crop Recommendation ====================

async function handleCropRecommendation(e) {
    e.preventDefault();
    showLoading(true);
    
    const formData = {
        temperature: parseFloat(document.getElementById('rec-temp').value),
        rainfall: parseFloat(document.getElementById('rec-rainfall').value),
        humidity: parseFloat(document.getElementById('rec-humidity').value) || 70,
        ph: parseFloat(document.getElementById('rec-ph').value),
        nitrogen: parseFloat(document.getElementById('rec-nitrogen').value),
        phosphorus: parseFloat(document.getElementById('rec-phosphorus').value),
        potassium: parseFloat(document.getElementById('rec-potassium').value),
        n_recommendations: 5
    };
    
    try {
        const response = await fetch(`${API_BASE}/recommend`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (data.success) {
            displayRecommendations(data.recommendations);
            showToast('Recommendations generated', 'success');
        } else {
            showToast(data.error || 'Recommendation failed', 'error');
        }
    } catch (error) {
        console.error('Recommendation error:', error);
        showToast('Error getting recommendations', 'error');
    } finally {
        showLoading(false);
    }
}

function displayRecommendations(recommendations) {
    const container = document.getElementById('recommendation-results');
    const list = document.getElementById('recommendations-list');
    
    container.style.display = 'block';
    list.innerHTML = '';
    
    recommendations.forEach((rec, index) => {
        const seasonClass = rec.season_suitable ? 'suitable' : 'unsuitable';
        const seasonText = rec.season_suitable ? 'In Season' : 'Off Season';
        
        list.innerHTML += `
            <div class="recommendation-item">
                <div class="rank">#${index + 1}</div>
                <div class="rec-content" style="flex: 1;">
                    <div class="crop-name">${rec.crop}</div>
                    <div class="confidence-bar">
                        <div class="confidence-fill" style="width: ${rec.confidence}%"></div>
                    </div>
                    <div class="details">
                        <span><i class="fas fa-percentage"></i> ${rec.confidence}% match</span>
                        <span class="season-badge ${seasonClass}">${seasonText}</span>
                        <span><i class="fas fa-tint"></i> ${rec.water_requirement} water</span>
                        <span><i class="fas fa-clock"></i> ${rec.growth_days} days</span>
                    </div>
                </div>
            </div>
        `;
    });
    
    container.scrollIntoView({ behavior: 'smooth' });
}

// ==================== Advisory ====================

async function loadAdvisoryData() {
    const crop = document.getElementById('advisory-crop-filter').value;
    const season = document.getElementById('advisory-season-filter').value;
    
    showLoading(true);
    
    try {
        let url = `${API_BASE}/advisory`;
        if (season) url += `?season=${season}`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.success) {
            displayAdvisory(data.advisory, crop);
        }
    } catch (error) {
        console.error('Error loading advisory:', error);
    } finally {
        showLoading(false);
    }
}

function displayAdvisory(advisory, selectedCrop) {
    const title = document.getElementById('advisory-title');
    const body = document.getElementById('advisory-body');
    
    title.textContent = `${advisory.season} Season Advisory`;
    
    let html = '<ul class="advisory-list">';
    
    // General advisories
    advisory.general_advisories.forEach(adv => {
        html += `<li>${adv}</li>`;
    });
    
    html += '</ul>';
    
    // Crop specific if selected
    if (selectedCrop && advisory.crop_specific[selectedCrop]) {
        html += `<h4 style="margin-top: 20px;">${selectedCrop} Specific:</h4>`;
        html += '<ul class="advisory-list">';
        advisory.crop_specific[selectedCrop].forEach(adv => {
            html += `<li>${adv}</li>`;
        });
        html += '</ul>';
    }
    
    body.innerHTML = html;
}

async function calculateFertilizer() {
    const crop = document.getElementById('fert-crop').value;
    const area = parseFloat(document.getElementById('fert-area').value);
    
    if (!crop || !area) {
        showToast('Please select crop and enter area', 'warning');
        return;
    }
    
    showLoading(true);
    
    try {
        const response = await fetch(`${API_BASE}/advisory/fertilizer`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ crop, area })
        });
        
        const data = await response.json();
        
        if (data.success) {
            displayFertilizerResults(data.recommendation);
        } else {
            showToast(data.error || 'Calculation failed', 'error');
        }
    } catch (error) {
        console.error('Fertilizer calculation error:', error);
        showToast('Error calculating fertilizer', 'error');
    } finally {
        showLoading(false);
    }
}

function displayFertilizerResults(recommendation) {
    const container = document.getElementById('fertilizer-results');
    container.style.display = 'block';
    
    const fert = recommendation.fertilizer_quantities;
    
    let html = `
        <h4>Fertilizer Requirements for ${recommendation.crop} (${recommendation.area_hectares} ha)</h4>
        <table class="fertilizer-table">
            <tr>
                <th>Fertilizer</th>
                <th>Quantity (kg)</th>
            </tr>
            <tr>
                <td>Urea</td>
                <td>${fert.urea_kg}</td>
            </tr>
            <tr>
                <td>DAP</td>
                <td>${fert.dap_kg}</td>
            </tr>
            <tr>
                <td>MOP (Muriate of Potash)</td>
                <td>${fert.mop_kg}</td>
            </tr>
        </table>
        <h4 style="margin-top: 15px;">Application Schedule</h4>
        <table class="fertilizer-table">
            <tr>
                <th>Stage</th>
                <th>Urea (kg)</th>
                <th>DAP (kg)</th>
                <th>MOP (kg)</th>
            </tr>
    `;
    
    recommendation.application_schedule.forEach(app => {
        html += `
            <tr>
                <td>${app.stage}</td>
                <td>${app.urea_kg}</td>
                <td>${app.dap_kg}</td>
                <td>${app.mop_kg}</td>
            </tr>
        `;
    });
    
    html += '</table>';
    
    if (recommendation.micronutrients && recommendation.micronutrients.length > 0) {
        html += '<h4 style="margin-top: 15px;">Micronutrients</h4><ul>';
        recommendation.micronutrients.forEach(m => {
            html += `<li>${m}</li>`;
        });
        html += '</ul>';
    }
    
    container.innerHTML = html;
}

// ==================== Weather ====================

async function loadWeatherData() {
    showLoading(true);
    
    try {
        // Load agricultural weather data
        const response = await fetch(`${API_BASE}/weather/agricultural?location=${appState.location}`);
        const data = await response.json();
        
        if (data.success) {
            displayWeatherData(data.data);
        }
    } catch (error) {
        console.error('Error loading weather:', error);
        showToast('Error loading weather data', 'error');
    } finally {
        showLoading(false);
    }
}

function displayWeatherData(data) {
    // Current conditions
    const current = data.current;
    document.getElementById('weather-temp-large').textContent = Math.round(current.temperature);
    document.getElementById('weather-location').textContent = data.location;
    document.getElementById('weather-condition').textContent = current.description;
    document.getElementById('weather-humidity').textContent = current.humidity;
    document.getElementById('weather-wind').textContent = current.wind_speed;
    document.getElementById('weather-pressure').textContent = current.pressure;
    
    // Agricultural metrics
    const metrics = data.agricultural_metrics;
    document.getElementById('rain-prob').textContent = metrics.rain_probability + '%';
    document.getElementById('frost-risk').textContent = metrics.frost_risk ? 'Yes' : 'No';
    document.getElementById('heat-risk').textContent = metrics.heat_stress_risk ? 'Yes' : 'No';
    document.getElementById('spray-suitable').textContent = metrics.suitable_for_spraying ? 'Yes' : 'No';
    
    // Forecast
    const forecastGrid = document.getElementById('forecast-grid');
    forecastGrid.innerHTML = '';
    
    data.forecast.forEach(day => {
        const icon = getWeatherIcon(day.description);
        forecastGrid.innerHTML += `
            <div class="forecast-item">
                <div class="day">${day.day_name || day.date}</div>
                <div class="icon">${icon}</div>
                <div class="temps">
                    <span class="high">${Math.round(day.temp_high)}°</span>
                    <span class="low">${Math.round(day.temp_low)}°</span>
                </div>
            </div>
        `;
    });
    
    // Recommendations
    const recList = document.getElementById('weather-recommendations');
    recList.innerHTML = '';
    
    data.recommendations.forEach(rec => {
        recList.innerHTML += `<li>${rec}</li>`;
    });
}

function getWeatherIcon(description) {
    const desc = description.toLowerCase();
    if (desc.includes('rain') || desc.includes('shower')) return '🌧️';
    if (desc.includes('cloud')) return '☁️';
    if (desc.includes('sun') || desc.includes('clear')) return '☀️';
    if (desc.includes('storm') || desc.includes('thunder')) return '⛈️';
    if (desc.includes('snow')) return '❄️';
    return '🌤️';
}

// ==================== Crop Info ====================

async function loadCropDetails() {
    const cropName = document.getElementById('crop-info-select').value;
    
    if (!cropName) {
        document.getElementById('crop-details').style.display = 'none';
        return;
    }
    
    showLoading(true);
    
    try {
        const response = await fetch(`${API_BASE}/crops/${cropName}`);
        const data = await response.json();
        
        if (data.success) {
            displayCropDetails(data.crop);
        } else {
            showToast('Crop information not found', 'error');
        }
    } catch (error) {
        console.error('Error loading crop details:', error);
        showToast('Error loading crop details', 'error');
    } finally {
        showLoading(false);
    }
}

function displayCropDetails(crop) {
    const container = document.getElementById('crop-details');
    const title = document.getElementById('crop-detail-name');
    const body = document.getElementById('crop-detail-body');
    
    container.style.display = 'block';
    title.textContent = crop.crop;
    
    body.innerHTML = `
        <div class="crop-detail-group">
            <h4><i class="fas fa-thermometer-half"></i> Climate Requirements</h4>
            <p><span>Temperature:</span> <span>${crop.optimal_temperature}</span></p>
            <p><span>Rainfall:</span> <span>${crop.minimum_rainfall}</span></p>
            <p><span>Soil pH:</span> <span>${crop.optimal_ph}</span></p>
        </div>
        <div class="crop-detail-group">
            <h4><i class="fas fa-flask"></i> Nutrient Requirements</h4>
            <p><span>Nitrogen:</span> <span>${crop.npk_requirements.nitrogen}</span></p>
            <p><span>Phosphorus:</span> <span>${crop.npk_requirements.phosphorus}</span></p>
            <p><span>Potassium:</span> <span>${crop.npk_requirements.potassium}</span></p>
        </div>
        <div class="crop-detail-group">
            <h4><i class="fas fa-calendar-alt"></i> Growing Information</h4>
            <p><span>Seasons:</span> <span>${crop.growing_seasons.join(', ')}</span></p>
            <p><span>Duration:</span> <span>${crop.growth_duration}</span></p>
            <p><span>Water Need:</span> <span>${crop.water_requirement}</span></p>
        </div>
        <div class="crop-detail-group">
            <h4><i class="fas fa-mountain"></i> Suitable Soils</h4>
            <p>${crop.suitable_soils.join(', ')}</p>
        </div>
    `;
}

// ==================== Utility Functions ====================

function showLoading(show) {
    const overlay = document.getElementById('loading-overlay');
    if (show) {
        overlay.classList.add('active');
    } else {
        overlay.classList.remove('active');
    }
}

function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i class="fas ${getToastIcon(type)}"></i>
        <span>${message}</span>
    `;
    
    container.appendChild(toast);
    
    // Add entrance animation complete handler
    toast.addEventListener('animationend', function handler(e) {
        if (e.animationName === 'toastSlideIn') {
            toast.removeEventListener('animationend', handler);
        }
    });
    
    // Remove after 3 seconds with smooth exit
    setTimeout(() => {
        toast.classList.add('hiding');
        toast.addEventListener('animationend', () => toast.remove(), { once: true });
    }, 3000);
}

function getToastIcon(type) {
    switch (type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info-circle';
    }
}

// Add slideOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// ==================== Market Prices ====================

let marketPricesState = {
    autoRefreshInterval: null,
    currentMandi: 'Delhi',
    currentCategory: '',
    searchQuery: '',
    currentView: 'table',
    sortColumn: null,
    sortDirection: 'asc',
    lastPrices: {},
    allPrices: []
};

async function loadMarketPricesData() {
    await Promise.all([
        loadPriceAlerts(),
        loadMarketPrices(),
        loadPriceHistory()
    ]);
    
    setupMarketPricesListeners();
    setupAutoRefresh();
}

function setupMarketPricesListeners() {
    // Mandi selector
    const mandiSelect = document.getElementById('mandi-select');
    if (mandiSelect && !mandiSelect.dataset.listenerAdded) {
        mandiSelect.addEventListener('change', async (e) => {
            marketPricesState.currentMandi = e.target.value;
            await loadMarketPrices();
            await loadPriceHistory();
        });
        mandiSelect.dataset.listenerAdded = 'true';
    }
    
    // Category selector
    const categorySelect = document.getElementById('category-select');
    if (categorySelect && !categorySelect.dataset.listenerAdded) {
        categorySelect.addEventListener('change', async (e) => {
            marketPricesState.currentCategory = e.target.value;
            filterAndRenderPrices();
        });
        categorySelect.dataset.listenerAdded = 'true';
    }
    
    // Search input
    const searchInput = document.getElementById('crop-search');
    if (searchInput && !searchInput.dataset.listenerAdded) {
        searchInput.addEventListener('input', (e) => {
            marketPricesState.searchQuery = e.target.value.toLowerCase();
            filterAndRenderPrices();
        });
        searchInput.dataset.listenerAdded = 'true';
    }
    
    // Clear search button
    const clearSearchBtn = document.getElementById('clear-search');
    if (clearSearchBtn && !clearSearchBtn.dataset.listenerAdded) {
        clearSearchBtn.addEventListener('click', () => {
            const searchInput = document.getElementById('crop-search');
            searchInput.value = '';
            marketPricesState.searchQuery = '';
            filterAndRenderPrices();
        });
        clearSearchBtn.dataset.listenerAdded = 'true';
    }
    
    // Clear filters button
    const clearFiltersBtn = document.getElementById('clear-filters');
    if (clearFiltersBtn && !clearFiltersBtn.dataset.listenerAdded) {
        clearFiltersBtn.addEventListener('click', () => {
            document.getElementById('crop-search').value = '';
            document.getElementById('category-select').value = '';
            marketPricesState.searchQuery = '';
            marketPricesState.currentCategory = '';
            filterAndRenderPrices();
        });
        clearFiltersBtn.dataset.listenerAdded = 'true';
    }
    
    // View toggle buttons
    const viewBtns = document.querySelectorAll('.view-btn');
    viewBtns.forEach(btn => {
        if (!btn.dataset.listenerAdded) {
            btn.addEventListener('click', () => {
                const view = btn.dataset.view;
                marketPricesState.currentView = view;
                
                // Update button states
                viewBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Toggle views
                document.getElementById('table-view').classList.toggle('active', view === 'table');
                document.getElementById('cards-view').classList.toggle('active', view === 'cards');
                
                filterAndRenderPrices();
            });
            btn.dataset.listenerAdded = 'true';
        }
    });
    
    // Sortable columns
    const sortableHeaders = document.querySelectorAll('.prices-table th.sortable');
    sortableHeaders.forEach(th => {
        if (!th.dataset.listenerAdded) {
            th.addEventListener('click', () => {
                const sortKey = th.dataset.sort;
                
                if (marketPricesState.sortColumn === sortKey) {
                    marketPricesState.sortDirection = marketPricesState.sortDirection === 'asc' ? 'desc' : 'asc';
                } else {
                    marketPricesState.sortColumn = sortKey;
                    marketPricesState.sortDirection = 'asc';
                }
                
                // Update sort icons
                sortableHeaders.forEach(h => {
                    h.classList.remove('sorted', 'sorted-asc', 'sorted-desc');
                });
                th.classList.add('sorted', `sorted-${marketPricesState.sortDirection}`);
                
                filterAndRenderPrices();
            });
            th.dataset.listenerAdded = 'true';
        }
    });
    
    // Toggle filters
    const toggleFiltersBtn = document.getElementById('toggle-filters');
    if (toggleFiltersBtn && !toggleFiltersBtn.dataset.listenerAdded) {
        toggleFiltersBtn.addEventListener('click', () => {
            const filtersBody = document.getElementById('filters-body');
            const icon = toggleFiltersBtn.querySelector('i');
            
            filtersBody.classList.toggle('collapsed');
            icon.classList.toggle('fa-chevron-up');
            icon.classList.toggle('fa-chevron-down');
        });
        toggleFiltersBtn.dataset.listenerAdded = 'true';
    }
    
    // History crop selector
    const historyCropSelect = document.getElementById('history-crop-select');
    if (historyCropSelect && !historyCropSelect.dataset.listenerAdded) {
        historyCropSelect.addEventListener('change', async (e) => {
            await loadPriceHistory(e.target.value);
        });
        historyCropSelect.dataset.listenerAdded = 'true';
    }
    
    // Refresh button
    const refreshBtn = document.getElementById('refresh-prices');
    if (refreshBtn && !refreshBtn.dataset.listenerAdded) {
        refreshBtn.addEventListener('click', async () => {
            refreshBtn.disabled = true;
            const originalHTML = refreshBtn.innerHTML;
            refreshBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Refreshing...';
            
            await Promise.all([
                loadPriceAlerts(),
                loadMarketPrices(),
                loadPriceHistory()
            ]);
            
            refreshBtn.disabled = false;
            refreshBtn.innerHTML = originalHTML;
            showToast('Prices updated', 'success');
        });
        refreshBtn.dataset.listenerAdded = 'true';
    }
    
    // Auto refresh toggle
    const autoRefreshCheckbox = document.getElementById('auto-refresh');
    if (autoRefreshCheckbox && !autoRefreshCheckbox.dataset.listenerAdded) {
        autoRefreshCheckbox.addEventListener('change', (e) => {
            if (e.target.checked) {
                setupAutoRefresh();
                showToast('Auto-refresh enabled', 'info');
            } else {
                clearAutoRefresh();
                showToast('Auto-refresh disabled', 'info');
            }
        });
        autoRefreshCheckbox.dataset.listenerAdded = 'true';
    }
}

function filterAndRenderPrices() {
    let prices = [...marketPricesState.allPrices];
    
    // Filter by category
    if (marketPricesState.currentCategory) {
        prices = prices.filter(p => p.category === marketPricesState.currentCategory);
    }
    
    // Filter by search
    if (marketPricesState.searchQuery) {
        prices = prices.filter(p => 
            p.crop.toLowerCase().includes(marketPricesState.searchQuery) ||
            p.category.toLowerCase().includes(marketPricesState.searchQuery)
        );
    }
    
    // Sort
    if (marketPricesState.sortColumn) {
        prices.sort((a, b) => {
            let valA, valB;
            
            switch (marketPricesState.sortColumn) {
                case 'crop': valA = a.crop; valB = b.crop; break;
                case 'category': valA = a.category; valB = b.category; break;
                case 'msp': valA = a.msp; valB = b.msp; break;
                case 'price': valA = a.market_price; valB = b.market_price; break;
                case 'change': valA = a.change_percent; valB = b.change_percent; break;
                default: return 0;
            }
            
            if (typeof valA === 'string') {
                return marketPricesState.sortDirection === 'asc' 
                    ? valA.localeCompare(valB) 
                    : valB.localeCompare(valA);
            }
            
            return marketPricesState.sortDirection === 'asc' ? valA - valB : valB - valA;
        });
    }
    
    // Show/hide no results
    const noResults = document.getElementById('no-results');
    const tableView = document.getElementById('table-view');
    const cardsView = document.getElementById('cards-view');
    
    if (prices.length === 0) {
        noResults.style.display = 'block';
        tableView.style.display = 'none';
        cardsView.style.display = 'none';
    } else {
        noResults.style.display = 'none';
        if (marketPricesState.currentView === 'table') {
            tableView.style.display = 'block';
            tableView.classList.add('active');
            cardsView.classList.remove('active');
            renderTableView(prices);
        } else {
            cardsView.style.display = 'block';
            cardsView.classList.add('active');
            tableView.classList.remove('active');
            renderCardsView(prices);
        }
    }
    
    // Update stats counts
    updateStatsCounts(marketPricesState.allPrices);
}

function renderTableView(prices) {
    const tbody = document.getElementById('prices-tbody');
    
    tbody.innerHTML = prices.map(price => {
        const isUpdated = marketPricesState.lastPrices[price.crop] && 
                          marketPricesState.lastPrices[price.crop] !== price.market_price;
        
        return `
            <tr class="${isUpdated ? 'price-updated' : ''}" data-crop="${price.crop}">
                <td><strong>${price.crop}</strong></td>
                <td><span class="category-badge ${price.category}">${formatCategory(price.category)}</span></td>
                <td>₹${price.msp.toLocaleString()}</td>
                <td><strong>₹${price.market_price.toLocaleString()}</strong></td>
                <td class="${price.price_change > 0 ? 'price-up' : price.price_change < 0 ? 'price-down' : 'price-stable'}">
                    ${price.price_change > 0 ? '+' : ''}${price.price_change.toLocaleString()}
                    (${price.change_percent > 0 ? '+' : ''}${price.change_percent}%)
                </td>
                <td>
                    <span class="trend-badge ${price.trend}">
                        <i class="fas fa-${price.trend === 'up' ? 'arrow-up' : price.trend === 'down' ? 'arrow-down' : 'minus'}"></i>
                        ${price.trend.charAt(0).toUpperCase() + price.trend.slice(1)}
                    </span>
                </td>
                <td class="action-cell">
                    <button class="btn-action view" onclick="viewCropHistory('${price.crop}')" title="View History">
                        <i class="fas fa-chart-line"></i>
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

function renderCardsView(prices) {
    const grid = document.getElementById('price-cards-grid');
    
    grid.innerHTML = prices.map(price => `
        <div class="price-card ${price.trend}" data-crop="${price.crop}">
            <div class="price-card-header">
                <h3 class="price-card-title">${price.crop}</h3>
                <span class="category-badge ${price.category} price-card-category">${formatCategory(price.category)}</span>
            </div>
            <div class="price-card-body">
                <div class="price-card-item">
                    <div class="price-card-label">MSP</div>
                    <div class="price-card-value">₹${price.msp.toLocaleString()}</div>
                </div>
                <div class="price-card-item">
                    <div class="price-card-label">Market Price</div>
                    <div class="price-card-value highlight-${price.trend === 'up' ? 'up' : price.trend === 'down' ? 'down' : ''}">₹${price.market_price.toLocaleString()}</div>
                </div>
                <div class="price-card-item full-width">
                    <div class="price-card-label">Change</div>
                    <div class="price-card-value ${price.price_change > 0 ? 'highlight-up' : price.price_change < 0 ? 'highlight-down' : ''}">
                        ${price.price_change > 0 ? '+' : ''}${price.price_change.toLocaleString()} (${price.change_percent > 0 ? '+' : ''}${price.change_percent}%)
                    </div>
                </div>
            </div>
            <div class="price-card-action">
                <button class="btn btn-primary btn-sm" onclick="viewCropHistory('${price.crop}')">
                    <i class="fas fa-chart-line"></i> View Trend
                </button>
            </div>
        </div>
    `).join('');
}

function viewCropHistory(crop) {
    const select = document.getElementById('history-crop-select');
    if (select) {
        // Find and select the option
        for (let option of select.options) {
            if (option.value === crop) {
                select.value = crop;
                loadPriceHistory(crop);
                
                // Scroll to chart
                document.querySelector('.price-history-card').scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
                break;
            }
        }
    }
}

function updateStatsCounts(prices) {
    const upCount = prices.filter(p => p.trend === 'up').length;
    const downCount = prices.filter(p => p.trend === 'down').length;
    const stableCount = prices.filter(p => p.trend === 'stable').length;
    const total = prices.length;
    
    const upEl = document.getElementById('crops-up-count');
    const downEl = document.getElementById('crops-down-count');
    const stableEl = document.getElementById('crops-stable-count');
    const totalEl = document.getElementById('total-crops-count');
    
    if (upEl) animateNumber(upEl, upCount);
    if (downEl) animateNumber(downEl, downCount);
    if (stableEl) animateNumber(stableEl, stableCount);
    if (totalEl) animateNumber(totalEl, total);
}

function animateNumber(element, target) {
    const current = parseInt(element.textContent) || 0;
    const diff = target - current;
    const duration = 500;
    const steps = 20;
    const stepValue = diff / steps;
    let step = 0;
    
    const interval = setInterval(() => {
        step++;
        element.textContent = Math.round(current + stepValue * step);
        
        if (step >= steps) {
            element.textContent = target;
            clearInterval(interval);
        }
    }, duration / steps);
}

function setupAutoRefresh() {
    clearAutoRefresh();
    const autoRefreshCheckbox = document.getElementById('auto-refresh');
    
    if (autoRefreshCheckbox && autoRefreshCheckbox.checked) {
        marketPricesState.autoRefreshInterval = setInterval(async () => {
            const section = document.getElementById('market-prices');
            if (section && section.classList.contains('active')) {
                await loadMarketPrices();
            }
        }, 30000); // 30 seconds
    }
}

function clearAutoRefresh() {
    if (marketPricesState.autoRefreshInterval) {
        clearInterval(marketPricesState.autoRefreshInterval);
        marketPricesState.autoRefreshInterval = null;
    }
}

async function loadPriceAlerts() {
    const container = document.getElementById('price-alerts');
    if (!container) return;
    
    try {
        const response = await fetch(`${API_BASE}/market/alerts`);
        const data = await response.json();
        
        if (data.success && data.alerts.length > 0) {
            container.innerHTML = data.alerts.map(alert => `
                <div class="alert-item ${alert.change_percent > 0 ? 'increase' : 'decrease'}" onclick="viewCropHistory('${alert.crop}')">
                    <div class="alert-icon">
                        <i class="fas fa-${alert.change_percent > 0 ? 'arrow-trend-up' : 'arrow-trend-down'}"></i>
                    </div>
                    <div class="alert-content">
                        <h4>${alert.crop}</h4>
                        <p>${alert.recommendation}</p>
                    </div>
                    <span class="alert-change">
                        ${alert.change_percent > 0 ? '+' : ''}${alert.change_percent}%
                    </span>
                </div>
            `).join('');
        } else {
            container.innerHTML = '<p class="no-alerts">No significant price changes today</p>';
        }
    } catch (error) {
        console.error('Error loading price alerts:', error);
        container.innerHTML = '<p class="error">Failed to load alerts</p>';
    }
}

async function loadMarketPrices() {
    const tbody = document.getElementById('prices-tbody');
    const lastUpdated = document.getElementById('prices-last-updated');
    
    if (!tbody) return;
    
    try {
        let url = `${API_BASE}/market/prices?location=${marketPricesState.currentMandi}`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.success) {
            // Store all prices
            marketPricesState.allPrices = data.prices;
            
            // Update last prices for flash animation
            data.prices.forEach(price => {
                marketPricesState.lastPrices[price.crop] = price.market_price;
            });
            
            // Filter and render
            filterAndRenderPrices();
            
            // Update last updated time
            if (lastUpdated) {
                lastUpdated.textContent = formatDateTime(data.last_updated);
            }
            
            // Update selling recommendations
            updateSellingRecommendations(data.prices);
        }
    } catch (error) {
        console.error('Error loading market prices:', error);
        tbody.innerHTML = '<tr><td colspan="7" class="error">Failed to load prices. Please try again.</td></tr>';
    }
}

function updateSellingRecommendations(prices) {
    const container = document.getElementById('selling-recommendations');
    if (!container) return;
    
    // Sort by price change to get best selling opportunities
    const goodToSell = prices.filter(p => p.change_percent > 3).sort((a, b) => b.change_percent - a.change_percent).slice(0, 2);
    const holdCrops = prices.filter(p => p.change_percent > 0 && p.change_percent <= 3).slice(0, 2);
    const waitCrops = prices.filter(p => p.change_percent < 0).sort((a, b) => a.change_percent - b.change_percent).slice(0, 2);
    
    let html = '';
    
    goodToSell.forEach(crop => {
        html += `
            <div class="recommendation-item good">
                <i class="fas fa-check-circle"></i>
                <div class="rec-content">
                    <h4>Sell ${crop.crop} Now</h4>
                    <p>Price up by ${crop.change_percent}% - Good time to sell at ₹${crop.market_price.toLocaleString()}/${crop.unit}</p>
                </div>
            </div>
        `;
    });
    
    holdCrops.forEach(crop => {
        html += `
            <div class="recommendation-item hold">
                <i class="fas fa-hand-paper"></i>
                <div class="rec-content">
                    <h4>Hold ${crop.crop}</h4>
                    <p>Slight increase of ${crop.change_percent}% - Monitor for better prices</p>
                </div>
            </div>
        `;
    });
    
    waitCrops.forEach(crop => {
        html += `
            <div class="recommendation-item wait">
                <i class="fas fa-clock"></i>
                <div class="rec-content">
                    <h4>Wait on ${crop.crop}</h4>
                    <p>Price down by ${Math.abs(crop.change_percent)}% - Consider waiting for recovery</p>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html || '<p>No specific recommendations at this time</p>';
}

async function loadPriceHistory(crop = 'Wheat') {
    const chartBars = document.getElementById('chart-bars');
    const chartLabels = document.getElementById('chart-labels');
    const statsContainer = document.getElementById('price-stats');
    
    if (!chartBars || !chartLabels) return;
    
    try {
        const response = await fetch(`${API_BASE}/market/price-history?crop=${crop}&location=${marketPricesState.currentMandi}`);
        const data = await response.json();
        
        if (data.success) {
            const history = data.history;
            const maxPrice = Math.max(...history.map(h => h.price));
            const minPrice = Math.min(...history.map(h => h.price));
            const midPrice = Math.round((maxPrice + minPrice) / 2);
            
            // Update Y-axis labels
            const yAxis = document.getElementById('chart-y-axis');
            if (yAxis) {
                yAxis.innerHTML = `
                    <span class="y-label">₹${maxPrice.toLocaleString()}</span>
                    <span class="y-label">₹${midPrice.toLocaleString()}</span>
                    <span class="y-label">₹${minPrice.toLocaleString()}</span>
                `;
            }
            
            // Render chart bars with smooth animation delay
            chartBars.innerHTML = history.map((h, index) => {
                const heightPercent = ((h.price - minPrice) / (maxPrice - minPrice) * 70) + 30;
                return `
                    <div class="chart-bar" 
                         style="height: ${heightPercent}%; animation-delay: ${index * 0.1}s" 
                         data-price="₹${h.price.toLocaleString()}"
                         title="${h.date}: ₹${h.price.toLocaleString()}">
                    </div>
                `;
            }).join('');
            
            // Render labels
            chartLabels.innerHTML = history.map(h => `
                <span class="chart-label">${h.day}</span>
            `).join('');
            
            // Update stats with animation
            animatePriceValue('stat-min', data.stats.min);
            animatePriceValue('stat-max', data.stats.max);
            animatePriceValue('stat-avg', data.stats.avg);
            
            const weekChangeEl = document.getElementById('stat-week-change');
            weekChangeEl.textContent = `${data.stats.week_change > 0 ? '+' : ''}${data.stats.week_change}%`;
            weekChangeEl.style.color = data.stats.week_change > 0 ? '#4CAF50' : data.stats.week_change < 0 ? '#f44336' : 'inherit';
        }
    } catch (error) {
        console.error('Error loading price history:', error);
        chartBars.innerHTML = '<p class="error">Failed to load chart</p>';
    }
}

function animatePriceValue(elementId, targetValue) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const currentText = element.textContent.replace(/[₹,]/g, '');
    const current = parseInt(currentText) || 0;
    const diff = targetValue - current;
    const duration = 600;
    const steps = 30;
    const stepValue = diff / steps;
    let step = 0;
    
    const interval = setInterval(() => {
        step++;
        element.textContent = `₹${Math.round(current + stepValue * step).toLocaleString()}`;
        
        if (step >= steps) {
            element.textContent = `₹${targetValue.toLocaleString()}`;
            clearInterval(interval);
        }
    }, duration / steps);
}

function formatCategory(category) {
    const names = {
        'cereals': 'Cereals',
        'pulses': 'Pulses',
        'oilseeds': 'Oilseeds',
        'cash_crops': 'Cash Crops',
        'vegetables': 'Vegetables'
    };
    return names[category] || category;
}

function formatDateTime(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}
