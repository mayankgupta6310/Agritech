/**
 * AgriTech Pro - Multi-language Translations
 * Supports: English, Hindi, Punjabi, Tamil, Telugu, Bengali, Marathi, Gujarati, Kannada, Malayalam, Odia, Bhojpuri
 */

const translations = {
    en: {
        // Navigation
        dashboard: "Dashboard",
        yieldPrediction: "Yield Prediction",
        cropRecommendation: "Crop Recommendation",
        advisory: "Advisory",
        weather: "Weather",
        cropDatabase: "Crop Database",
        marketPrices: "Market Prices",
        
        // Header
        enterLocation: "Enter location",
        
        // Dashboard Cards
        currentWeather: "Current Weather",
        humidity: "Humidity",
        wind: "Wind",
        dailyFarmingTip: "Daily Farming Tip",
        currentSeason: "Current Season",
        modelPerformance: "Model Performance",
        yieldPredictionR2: "Yield Prediction R²",
        recommendationAccuracy: "Recommendation Accuracy",
        supportedCrops: "Supported Crops",
        quickActions: "Quick Actions",
        predictYield: "Predict Yield",
        getCropSuggestions: "Get Crop Suggestions",
        viewAdvisory: "View Advisory",
        priorityActions: "Priority Actions",
        
        // Forms
        crop: "Crop",
        selectCrop: "Select Crop",
        area: "Area (hectares)",
        soilType: "Soil Type",
        selectSoilType: "Select Soil Type",
        temperature: "Temperature (°C)",
        rainfall: "Rainfall (mm/year)",
        soilPH: "Soil pH",
        nitrogen: "Nitrogen (kg/ha)",
        phosphorus: "Phosphorus (kg/ha)",
        potassium: "Potassium (kg/ha)",
        fertilizerUsed: "Fertilizer Used (kg)",
        calculate: "Calculate",
        
        // Results
        predictionResults: "Prediction Results",
        summary: "Summary",
        totalExpectedYield: "Total Expected Yield",
        modelAccuracy: "Model Accuracy (R² Score)",
        recommendedCrops: "Recommended Crops",
        getRecommendations: "Get Recommendations",
        
        // Advisory
        farmingAdvisory: "Farming Advisory",
        allCrops: "All Crops",
        loadAdvisory: "Load Advisory",
        fertilizerCalculator: "Fertilizer Calculator",
        
        // Weather
        currentConditions: "Current Conditions",
        agriculturalConditions: "Agricultural Conditions",
        rainProbability: "Rain Probability",
        frostRisk: "Frost Risk",
        heatStressRisk: "Heat Stress Risk",
        sprayingSuitable: "Spraying Suitable",
        sevenDayForecast: "7-Day Forecast",
        weatherBasedRecommendations: "Weather-Based Recommendations",
        
        // Seasons
        kharif: "Kharif",
        rabi: "Rabi",
        zaid: "Zaid",
        kharifInfo: "Monsoon season (June-October). Ideal for rice, cotton, maize.",
        rabiInfo: "Winter season (October-March). Ideal for wheat, potato, mustard.",
        zaidInfo: "Summer season (March-June). Ideal for vegetables and fruits.",
        
        // Chatbot
        chatbotTitle: "AgriTech Assistant",
        chatbotWelcome: "Hello! I'm your AgriTech Assistant. How can I help you today?",
        typeMessage: "Type your message...",
        send: "Send",
        
        // Common
        loading: "Loading...",
        selectLanguage: "Select Language",
        version: "Version",
        quintalsPerHa: "quintals/ha",
        confidence: "Confidence",
        high: "High",
        medium: "Medium",
        low: "Low",
        yes: "Yes",
        no: "No"
    },
    
    hi: {
        // Navigation
        dashboard: "डैशबोर्ड",
        yieldPrediction: "उपज भविष्यवाणी",
        cropRecommendation: "फसल सिफारिश",
        advisory: "सलाह",
        weather: "मौसम",
        cropDatabase: "फसल डेटाबेस",
        marketPrices: "बाजार भाव",
        
        // Header
        enterLocation: "स्थान दर्ज करें",
        
        // Dashboard Cards
        currentWeather: "वर्तमान मौसम",
        humidity: "आर्द्रता",
        wind: "हवा",
        dailyFarmingTip: "दैनिक कृषि टिप",
        currentSeason: "वर्तमान मौसम",
        modelPerformance: "मॉडल प्रदर्शन",
        yieldPredictionR2: "उपज भविष्यवाणी R²",
        recommendationAccuracy: "सिफारिश सटीकता",
        supportedCrops: "समर्थित फसलें",
        quickActions: "त्वरित कार्य",
        predictYield: "उपज की भविष्यवाणी करें",
        getCropSuggestions: "फसल सुझाव प्राप्त करें",
        viewAdvisory: "सलाह देखें",
        priorityActions: "प्राथमिकता कार्य",
        
        // Forms
        crop: "फसल",
        selectCrop: "फसल चुनें",
        area: "क्षेत्र (हेक्टेयर)",
        soilType: "मिट्टी का प्रकार",
        selectSoilType: "मिट्टी का प्रकार चुनें",
        temperature: "तापमान (°C)",
        rainfall: "वर्षा (मिमी/वर्ष)",
        soilPH: "मिट्टी pH",
        nitrogen: "नाइट्रोजन (किग्रा/हे)",
        phosphorus: "फास्फोरस (किग्रा/हे)",
        potassium: "पोटेशियम (किग्रा/हे)",
        fertilizerUsed: "उर्वरक उपयोग (किग्रा)",
        calculate: "गणना करें",
        
        // Results
        predictionResults: "भविष्यवाणी परिणाम",
        summary: "सारांश",
        totalExpectedYield: "कुल अपेक्षित उपज",
        modelAccuracy: "मॉडल सटीकता (R² स्कोर)",
        recommendedCrops: "सिफारिश की गई फसलें",
        getRecommendations: "सिफारिशें प्राप्त करें",
        
        // Advisory
        farmingAdvisory: "कृषि सलाह",
        allCrops: "सभी फसलें",
        loadAdvisory: "सलाह लोड करें",
        fertilizerCalculator: "उर्वरक कैलकुलेटर",
        
        // Weather
        currentConditions: "वर्तमान स्थिति",
        agriculturalConditions: "कृषि स्थिति",
        rainProbability: "बारिश की संभावना",
        frostRisk: "पाला जोखिम",
        heatStressRisk: "गर्मी का खतरा",
        sprayingSuitable: "छिड़काव उपयुक्त",
        sevenDayForecast: "7-दिन का पूर्वानुमान",
        weatherBasedRecommendations: "मौसम-आधारित सिफारिशें",
        
        // Seasons
        kharif: "खरीफ",
        rabi: "रबी",
        zaid: "जायद",
        kharifInfo: "मानसून का मौसम (जून-अक्टूबर)। धान, कपास, मक्का के लिए आदर्श।",
        rabiInfo: "सर्दी का मौसम (अक्टूबर-मार्च)। गेहूं, आलू, सरसों के लिए आदर्श।",
        zaidInfo: "गर्मी का मौसम (मार्च-जून)। सब्जियों और फलों के लिए आदर्श।",
        
        // Chatbot
        chatbotTitle: "एग्रीटेक सहायक",
        chatbotWelcome: "नमस्ते! मैं आपका एग्रीटेक सहायक हूं। आज मैं आपकी कैसे मदद कर सकता हूं?",
        typeMessage: "अपना संदेश लिखें...",
        send: "भेजें",
        
        // Common
        loading: "लोड हो रहा है...",
        selectLanguage: "भाषा चुनें",
        version: "संस्करण",
        quintalsPerHa: "क्विंटल/हे",
        confidence: "विश्वास",
        high: "उच्च",
        medium: "मध्यम",
        low: "कम",
        yes: "हां",
        no: "नहीं"
    },
    
    pa: {
        // Navigation
        dashboard: "ਡੈਸ਼ਬੋਰਡ",
        yieldPrediction: "ਝਾੜ ਅਨੁਮਾਨ",
        cropRecommendation: "ਫ਼ਸਲ ਸਿਫ਼ਾਰਿਸ਼",
        advisory: "ਸਲਾਹ",
        weather: "ਮੌਸਮ",
        cropDatabase: "ਫ਼ਸਲ ਡੇਟਾਬੇਸ",
        
        // Header
        enterLocation: "ਸਥਾਨ ਭਰੋ",
        
        // Dashboard Cards
        currentWeather: "ਮੌਜੂਦਾ ਮੌਸਮ",
        humidity: "ਨਮੀ",
        wind: "ਹਵਾ",
        dailyFarmingTip: "ਰੋਜ਼ਾਨਾ ਖੇਤੀ ਸੁਝਾਅ",
        currentSeason: "ਮੌਜੂਦਾ ਮੌਸਮ",
        modelPerformance: "ਮਾਡਲ ਪ੍ਰਦਰਸ਼ਨ",
        yieldPredictionR2: "ਝਾੜ ਅਨੁਮਾਨ R²",
        recommendationAccuracy: "ਸਿਫ਼ਾਰਿਸ਼ ਸਹੀਤਾ",
        supportedCrops: "ਸਮਰਥਿਤ ਫ਼ਸਲਾਂ",
        quickActions: "ਤੇਜ਼ ਕਾਰਵਾਈਆਂ",
        predictYield: "ਝਾੜ ਦਾ ਅਨੁਮਾਨ ਲਗਾਓ",
        getCropSuggestions: "ਫ਼ਸਲ ਸੁਝਾਅ ਲਵੋ",
        viewAdvisory: "ਸਲਾਹ ਦੇਖੋ",
        priorityActions: "ਪਹਿਲ ਕਾਰਵਾਈਆਂ",
        
        // Forms
        crop: "ਫ਼ਸਲ",
        selectCrop: "ਫ਼ਸਲ ਚੁਣੋ",
        area: "ਖੇਤਰ (ਹੈਕਟੇਅਰ)",
        soilType: "ਮਿੱਟੀ ਦੀ ਕਿਸਮ",
        selectSoilType: "ਮਿੱਟੀ ਦੀ ਕਿਸਮ ਚੁਣੋ",
        temperature: "ਤਾਪਮਾਨ (°C)",
        rainfall: "ਵਰਖਾ (ਮਿਮੀ/ਸਾਲ)",
        soilPH: "ਮਿੱਟੀ pH",
        nitrogen: "ਨਾਈਟ੍ਰੋਜਨ (ਕਿਲੋ/ਹੈ)",
        phosphorus: "ਫਾਸਫੋਰਸ (ਕਿਲੋ/ਹੈ)",
        potassium: "ਪੋਟਾਸ਼ੀਅਮ (ਕਿਲੋ/ਹੈ)",
        fertilizerUsed: "ਖਾਦ ਵਰਤੋਂ (ਕਿਲੋ)",
        calculate: "ਗਣਨਾ ਕਰੋ",
        
        // Results
        predictionResults: "ਅਨੁਮਾਨ ਨਤੀਜੇ",
        summary: "ਸਾਰ",
        totalExpectedYield: "ਕੁੱਲ ਅਨੁਮਾਨਿਤ ਝਾੜ",
        modelAccuracy: "ਮਾਡਲ ਸਹੀਤਾ (R² ਸਕੋਰ)",
        recommendedCrops: "ਸਿਫ਼ਾਰਿਸ਼ ਕੀਤੀਆਂ ਫ਼ਸਲਾਂ",
        getRecommendations: "ਸਿਫ਼ਾਰਿਸ਼ਾਂ ਲਵੋ",
        
        // Advisory
        farmingAdvisory: "ਖੇਤੀ ਸਲਾਹ",
        allCrops: "ਸਾਰੀਆਂ ਫ਼ਸਲਾਂ",
        loadAdvisory: "ਸਲਾਹ ਲੋਡ ਕਰੋ",
        fertilizerCalculator: "ਖਾਦ ਕੈਲਕੁਲੇਟਰ",
        
        // Weather
        currentConditions: "ਮੌਜੂਦਾ ਹਾਲਾਤ",
        agriculturalConditions: "ਖੇਤੀ ਹਾਲਾਤ",
        rainProbability: "ਵਰਖਾ ਸੰਭਾਵਨਾ",
        frostRisk: "ਠੰਡ ਖ਼ਤਰਾ",
        heatStressRisk: "ਗਰਮੀ ਖ਼ਤਰਾ",
        sprayingSuitable: "ਛਿੜਕਾਅ ਢੁੱਕਵਾਂ",
        sevenDayForecast: "7-ਦਿਨ ਦੀ ਭਵਿੱਖਬਾਣੀ",
        weatherBasedRecommendations: "ਮੌਸਮ-ਆਧਾਰਿਤ ਸਿਫ਼ਾਰਿਸ਼ਾਂ",
        
        // Seasons
        kharif: "ਖਰੀਫ਼",
        rabi: "ਰਬੀ",
        zaid: "ਜ਼ਾਇਦ",
        kharifInfo: "ਮਾਨਸੂਨ ਮੌਸਮ (ਜੂਨ-ਅਕਤੂਬਰ)। ਝੋਨਾ, ਕਪਾਹ, ਮੱਕੀ ਲਈ ਆਦਰਸ਼।",
        rabiInfo: "ਸਰਦੀ ਮੌਸਮ (ਅਕਤੂਬਰ-ਮਾਰਚ)। ਕਣਕ, ਆਲੂ, ਸਰ੍ਹੋਂ ਲਈ ਆਦਰਸ਼।",
        zaidInfo: "ਗਰਮੀ ਮੌਸਮ (ਮਾਰਚ-ਜੂਨ)। ਸਬਜ਼ੀਆਂ ਤੇ ਫਲਾਂ ਲਈ ਆਦਰਸ਼।",
        
        // Chatbot
        chatbotTitle: "ਐਗਰੀਟੈਕ ਸਹਾਇਕ",
        chatbotWelcome: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਤੁਹਾਡਾ ਐਗਰੀਟੈਕ ਸਹਾਇਕ ਹਾਂ। ਅੱਜ ਮੈਂ ਤੁਹਾਡੀ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ?",
        typeMessage: "ਆਪਣਾ ਸੁਨੇਹਾ ਲਿਖੋ...",
        send: "ਭੇਜੋ",
        
        // Common
        loading: "ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...",
        selectLanguage: "ਭਾਸ਼ਾ ਚੁਣੋ",
        version: "ਵਰਜ਼ਨ",
        quintalsPerHa: "ਕੁਇੰਟਲ/ਹੈ",
        confidence: "ਭਰੋਸਾ",
        high: "ਉੱਚਾ",
        medium: "ਮੱਧਮ",
        low: "ਘੱਟ",
        yes: "ਹਾਂ",
        no: "ਨਹੀਂ"
    },
    
    ta: {
        // Navigation
        dashboard: "டாஷ்போர்டு",
        yieldPrediction: "மகசூல் கணிப்பு",
        cropRecommendation: "பயிர் பரிந்துரை",
        advisory: "ஆலோசனை",
        weather: "வானிலை",
        cropDatabase: "பயிர் தரவுத்தளம்",
        
        // Header
        enterLocation: "இடத்தை உள்ளிடவும்",
        
        // Dashboard Cards
        currentWeather: "தற்போதைய வானிலை",
        humidity: "ஈரப்பதம்",
        wind: "காற்று",
        dailyFarmingTip: "தினசரி விவசாய குறிப்பு",
        currentSeason: "தற்போதைய பருவம்",
        modelPerformance: "மாடல் செயல்திறன்",
        yieldPredictionR2: "மகசூல் கணிப்பு R²",
        recommendationAccuracy: "பரிந்துரை துல்லியம்",
        supportedCrops: "ஆதரிக்கப்படும் பயிர்கள்",
        quickActions: "விரைவு செயல்கள்",
        predictYield: "மகசூலைக் கணிக்கவும்",
        getCropSuggestions: "பயிர் பரிந்துரைகளைப் பெறவும்",
        viewAdvisory: "ஆலோசனையைப் பார்க்கவும்",
        priorityActions: "முன்னுரிமை செயல்கள்",
        
        // Forms
        crop: "பயிர்",
        selectCrop: "பயிரைத் தேர்ந்தெடுக்கவும்",
        area: "பரப்பளவு (ஹெக்டேர்)",
        soilType: "மண் வகை",
        selectSoilType: "மண் வகையைத் தேர்வு செய்க",
        temperature: "வெப்பநிலை (°C)",
        rainfall: "மழைப்பொழிவு (மிமீ/ஆண்டு)",
        soilPH: "மண் pH",
        nitrogen: "நைட்ரஜன் (கிகி/ஹெ)",
        phosphorus: "பாஸ்பரஸ் (கிகி/ஹெ)",
        potassium: "பொட்டாசியம் (கிகி/ஹெ)",
        fertilizerUsed: "உரம் பயன்பாடு (கிகி)",
        calculate: "கணக்கிடு",
        
        // Results
        predictionResults: "கணிப்பு முடிவுகள்",
        summary: "சுருக்கம்",
        totalExpectedYield: "எதிர்பார்க்கப்படும் மொத்த மகசூல்",
        modelAccuracy: "மாடல் துல்லியம் (R² மதிப்பெண்)",
        recommendedCrops: "பரிந்துரைக்கப்பட்ட பயிர்கள்",
        getRecommendations: "பரிந்துரைகளைப் பெறவும்",
        
        // Advisory
        farmingAdvisory: "விவசாய ஆலோசனை",
        allCrops: "அனைத்து பயிர்கள்",
        loadAdvisory: "ஆலோசனையை ஏற்றவும்",
        fertilizerCalculator: "உர கால்குலேட்டர்",
        
        // Weather
        currentConditions: "தற்போதைய நிலைமைகள்",
        agriculturalConditions: "விவசாய நிலைமைகள்",
        rainProbability: "மழை நிகழ்தகவு",
        frostRisk: "உறைபனி ஆபத்து",
        heatStressRisk: "வெப்ப அழுத்த ஆபத்து",
        sprayingSuitable: "தெளிப்பு பொருத்தமானது",
        sevenDayForecast: "7-நாள் வானிலை",
        weatherBasedRecommendations: "வானிலை-அடிப்படையிலான பரிந்துரைகள்",
        
        // Seasons
        kharif: "காரிஃப்",
        rabi: "ரபி",
        zaid: "ஸைத்",
        kharifInfo: "பருவமழை காலம் (ஜூன்-அக்டோபர்). நெல், பருத்தி, மக்காச்சோளத்திற்கு ஏற்றது.",
        rabiInfo: "குளிர்கால பருவம் (அக்டோபர்-மார்ச்). கோதுமை, உருளைக்கிழங்கு, கடுகுக்கு ஏற்றது.",
        zaidInfo: "கோடை காலம் (மார்ச்-ஜூன்). காய்கறிகள் மற்றும் பழங்களுக்கு ஏற்றது.",
        
        // Chatbot
        chatbotTitle: "அக்ரிடெக் உதவியாளர்",
        chatbotWelcome: "வணக்கம்! நான் உங்கள் அக்ரிடெக் உதவியாளர். இன்று நான் உங்களுக்கு எவ்வாறு உதவ முடியும்?",
        typeMessage: "உங்கள் செய்தியை தட்டச்சு செய்யவும்...",
        send: "அனுப்பு",
        
        // Common
        loading: "ஏற்றுகிறது...",
        selectLanguage: "மொழியைத் தேர்ந்தெடுக்கவும்",
        version: "பதிப்பு",
        quintalsPerHa: "குவிண்டால்/ஹெ",
        confidence: "நம்பிக்கை",
        high: "உயர்",
        medium: "நடுத்தர",
        low: "குறைந்த",
        yes: "ஆம்",
        no: "இல்லை"
    },
    
    te: {
        // Navigation
        dashboard: "డాష్‌బోర్డ్",
        yieldPrediction: "దిగుబడి అంచనా",
        cropRecommendation: "పంట సిఫార్సు",
        advisory: "సలహా",
        weather: "వాతావరణం",
        cropDatabase: "పంట డేటాబేస్",
        
        // Header
        enterLocation: "స్థానాన్ని నమోదు చేయండి",
        
        // Dashboard Cards
        currentWeather: "ప్రస్తుత వాతావరణం",
        humidity: "తేమ",
        wind: "గాలి",
        dailyFarmingTip: "రోజువారీ వ్యవసాయ చిట్కా",
        currentSeason: "ప్రస్తుత సీజన్",
        modelPerformance: "మోడల్ పనితీరు",
        yieldPredictionR2: "దిగుబడి అంచనా R²",
        recommendationAccuracy: "సిఫార్సు ఖచ్చితత్వం",
        supportedCrops: "మద్దతు ఉన్న పంటలు",
        quickActions: "శీఘ్ర చర్యలు",
        predictYield: "దిగుబడిని అంచనా వేయండి",
        getCropSuggestions: "పంట సూచనలు పొందండి",
        viewAdvisory: "సలహా చూడండి",
        priorityActions: "ప్రాధాన్యత చర్యలు",
        
        // Forms
        crop: "పంట",
        selectCrop: "పంట ఎంచుకోండి",
        area: "విస్తీర్ణం (హెక్టార్లు)",
        soilType: "మట్టి రకం",
        selectSoilType: "మట్టి రకం ఎంచుకోండి",
        temperature: "ఉష్ణోగ్రత (°C)",
        rainfall: "వర్షపాతం (మిమీ/సంవత్సరం)",
        soilPH: "మట్టి pH",
        nitrogen: "నైట్రోజన్ (కేజీ/హె)",
        phosphorus: "ఫాస్ఫరస్ (కేజీ/హె)",
        potassium: "పొటాషియం (కేజీ/హె)",
        fertilizerUsed: "ఎరువు వాడకం (కేజీ)",
        calculate: "లెక్కించు",
        
        // Results
        predictionResults: "అంచనా ఫలితాలు",
        summary: "సారాంశం",
        totalExpectedYield: "మొత్తం ఆశించిన దిగుబడి",
        modelAccuracy: "మోడల్ ఖచ్చితత్వం (R² స్కోర్)",
        recommendedCrops: "సిఫార్సు చేసిన పంటలు",
        getRecommendations: "సిఫార్సులు పొందండి",
        
        // Advisory
        farmingAdvisory: "వ్యవసాయ సలహా",
        allCrops: "అన్ని పంటలు",
        loadAdvisory: "సలహా లోడ్ చేయండి",
        fertilizerCalculator: "ఎరువు కాలిక్యులేటర్",
        
        // Weather
        currentConditions: "ప్రస్తుత పరిస్థితులు",
        agriculturalConditions: "వ్యవసాయ పరిస్థితులు",
        rainProbability: "వర్షం సంభావ్యత",
        frostRisk: "మంచు ప్రమాదం",
        heatStressRisk: "వేడి ఒత్తిడి ప్రమాదం",
        sprayingSuitable: "స్ప్రేయింగ్ అనుకూలం",
        sevenDayForecast: "7-రోజుల వాతావరణ సూచన",
        weatherBasedRecommendations: "వాతావరణ-ఆధారిత సిఫార్సులు",
        
        // Seasons
        kharif: "ఖరీఫ్",
        rabi: "రబీ",
        zaid: "జైద్",
        kharifInfo: "వర్షాకాలం (జూన్-అక్టోబర్). వరి, పత్తి, మొక్కజొన్నకు అనుకూలం.",
        rabiInfo: "శీతాకాలం (అక్టోబర్-మార్చి). గోధుమ, బంగాళదుంప, ఆవాలకు అనుకూలం.",
        zaidInfo: "వేసవి కాలం (మార్చి-జూన్). కూరగాయలు మరియు పండ్లకు అనుకూలం.",
        
        // Chatbot
        chatbotTitle: "అగ్రిటెక్ సహాయకుడు",
        chatbotWelcome: "నమస్కారం! నేను మీ అగ్రిటెక్ సహాయకుడిని. ఈ రోజు నేను మీకు ఎలా సహాయం చేయగలను?",
        typeMessage: "మీ సందేశాన్ని టైప్ చేయండి...",
        send: "పంపు",
        
        // Common
        loading: "లోడ్ అవుతోంది...",
        selectLanguage: "భాషను ఎంచుకోండి",
        version: "వెర్షన్",
        quintalsPerHa: "క్వింటాళ్లు/హె",
        confidence: "నమ్మకం",
        high: "ఎక్కువ",
        medium: "మధ్యస్థం",
        low: "తక్కువ",
        yes: "అవును",
        no: "కాదు"
    },
    
    bn: {
        // Navigation
        dashboard: "ড্যাশবোর্ড",
        yieldPrediction: "ফলন পূর্বাভাস",
        cropRecommendation: "ফসল সুপারিশ",
        advisory: "পরামর্শ",
        weather: "আবহাওয়া",
        cropDatabase: "ফসল ডাটাবেস",
        
        // Header
        enterLocation: "অবস্থান লিখুন",
        
        // Dashboard Cards
        currentWeather: "বর্তমান আবহাওয়া",
        humidity: "আর্দ্রতা",
        wind: "বাতাস",
        dailyFarmingTip: "দৈনিক কৃষি টিপ",
        currentSeason: "বর্তমান মৌসুম",
        modelPerformance: "মডেল কর্মক্ষমতা",
        yieldPredictionR2: "ফলন পূর্বাভাস R²",
        recommendationAccuracy: "সুপারিশ নির্ভুলতা",
        supportedCrops: "সমর্থিত ফসল",
        quickActions: "দ্রুত কার্যক্রম",
        predictYield: "ফলন পূর্বাভাস করুন",
        getCropSuggestions: "ফসল পরামর্শ নিন",
        viewAdvisory: "পরামর্শ দেখুন",
        priorityActions: "অগ্রাধিকার কার্যক্রম",
        
        // Forms
        crop: "ফসল",
        selectCrop: "ফসল নির্বাচন করুন",
        area: "এলাকা (হেক্টর)",
        soilType: "মাটির ধরন",
        selectSoilType: "মাটির ধরন নির্বাচন করুন",
        temperature: "তাপমাত্রা (°C)",
        rainfall: "বৃষ্টিপাত (মিমি/বছর)",
        soilPH: "মাটির pH",
        nitrogen: "নাইট্রোজেন (কেজি/হে)",
        phosphorus: "ফসফরাস (কেজি/হে)",
        potassium: "পটাশিয়াম (কেজি/হে)",
        fertilizerUsed: "সার ব্যবহার (কেজি)",
        calculate: "গণনা করুন",
        
        // Results
        predictionResults: "পূর্বাভাস ফলাফল",
        summary: "সারসংক্ষেপ",
        totalExpectedYield: "মোট প্রত্যাশিত ফলন",
        modelAccuracy: "মডেল নির্ভুলতা (R² স্কোর)",
        recommendedCrops: "সুপারিশকৃত ফসল",
        getRecommendations: "সুপারিশ নিন",
        
        // Advisory
        farmingAdvisory: "কৃষি পরামর্শ",
        allCrops: "সব ফসল",
        loadAdvisory: "পরামর্শ লোড করুন",
        fertilizerCalculator: "সার ক্যালকুলেটর",
        
        // Weather
        currentConditions: "বর্তমান অবস্থা",
        agriculturalConditions: "কৃষি অবস্থা",
        rainProbability: "বৃষ্টির সম্ভাবনা",
        frostRisk: "তুষার ঝুঁকি",
        heatStressRisk: "তাপ চাপ ঝুঁকি",
        sprayingSuitable: "স্প্রে উপযুক্ত",
        sevenDayForecast: "৭-দিনের পূর্বাভাস",
        weatherBasedRecommendations: "আবহাওয়া-ভিত্তিক সুপারিশ",
        
        // Seasons
        kharif: "খরিফ",
        rabi: "রবি",
        zaid: "জায়েদ",
        kharifInfo: "বর্ষাকাল (জুন-অক্টোবর)। ধান, তুলা, ভুট্টার জন্য আদর্শ।",
        rabiInfo: "শীতকাল (অক্টোবর-মার্চ)। গম, আলু, সরিষার জন্য আদর্শ।",
        zaidInfo: "গ্রীষ্মকাল (মার্চ-জুন)। সবজি ও ফলের জন্য আদর্শ।",
        
        // Chatbot
        chatbotTitle: "অ্যাগ্রিটেক সহায়ক",
        chatbotWelcome: "নমস্কার! আমি আপনার অ্যাগ্রিটেক সহায়ক। আজ আমি কীভাবে আপনাকে সাহায্য করতে পারি?",
        typeMessage: "আপনার বার্তা লিখুন...",
        send: "পাঠান",
        
        // Common
        loading: "লোড হচ্ছে...",
        selectLanguage: "ভাষা নির্বাচন করুন",
        version: "সংস্করণ",
        quintalsPerHa: "কুইন্টাল/হে",
        confidence: "আস্থা",
        high: "উচ্চ",
        medium: "মাঝারি",
        low: "নিম্ন",
        yes: "হ্যাঁ",
        no: "না"
    },
    
    mr: {
        // Navigation
        dashboard: "डॅशबोर्ड",
        yieldPrediction: "उत्पादन अंदाज",
        cropRecommendation: "पीक शिफारस",
        advisory: "सल्ला",
        weather: "हवामान",
        cropDatabase: "पीक डेटाबेस",
        
        // Header
        enterLocation: "स्थान प्रविष्ट करा",
        
        // Dashboard Cards
        currentWeather: "सध्याचे हवामान",
        humidity: "आर्द्रता",
        wind: "वारा",
        dailyFarmingTip: "दैनिक शेती टिप",
        currentSeason: "सध्याचा हंगाम",
        modelPerformance: "मॉडेल कामगिरी",
        yieldPredictionR2: "उत्पादन अंदाज R²",
        recommendationAccuracy: "शिफारस अचूकता",
        supportedCrops: "समर्थित पिके",
        quickActions: "त्वरित क्रिया",
        predictYield: "उत्पादनाचा अंदाज लावा",
        getCropSuggestions: "पीक सूचना मिळवा",
        viewAdvisory: "सल्ला पहा",
        priorityActions: "प्राधान्य क्रिया",
        
        // Forms
        crop: "पीक",
        selectCrop: "पीक निवडा",
        area: "क्षेत्र (हेक्टर)",
        soilType: "मातीचा प्रकार",
        selectSoilType: "मातीचा प्रकार निवडा",
        temperature: "तापमान (°C)",
        rainfall: "पाऊस (मिमी/वर्ष)",
        soilPH: "माती pH",
        nitrogen: "नायट्रोजन (किग्रॅ/हे)",
        phosphorus: "फॉस्फरस (किग्रॅ/हे)",
        potassium: "पोटॅशियम (किग्रॅ/हे)",
        fertilizerUsed: "खत वापर (किग्रॅ)",
        calculate: "गणना करा",
        
        // Results
        predictionResults: "अंदाज परिणाम",
        summary: "सारांश",
        totalExpectedYield: "एकूण अपेक्षित उत्पादन",
        modelAccuracy: "मॉडेल अचूकता (R² स्कोअर)",
        recommendedCrops: "शिफारस केलेली पिके",
        getRecommendations: "शिफारसी मिळवा",
        
        // Advisory
        farmingAdvisory: "शेती सल्ला",
        allCrops: "सर्व पिके",
        loadAdvisory: "सल्ला लोड करा",
        fertilizerCalculator: "खत कॅल्क्युलेटर",
        
        // Weather
        currentConditions: "सध्याची स्थिती",
        agriculturalConditions: "शेती स्थिती",
        rainProbability: "पावसाची शक्यता",
        frostRisk: "दंव धोका",
        heatStressRisk: "उष्णता ताण धोका",
        sprayingSuitable: "फवारणी योग्य",
        sevenDayForecast: "7-दिवसांचा अंदाज",
        weatherBasedRecommendations: "हवामान-आधारित शिफारसी",
        
        // Seasons
        kharif: "खरीप",
        rabi: "रब्बी",
        zaid: "झैद",
        kharifInfo: "पावसाळा (जून-ऑक्टोबर). भात, कापूस, मक्यासाठी आदर्श.",
        rabiInfo: "हिवाळा (ऑक्टोबर-मार्च). गहू, बटाटा, मोहरीसाठी आदर्श.",
        zaidInfo: "उन्हाळा (मार्च-जून). भाज्या आणि फळांसाठी आदर्श.",
        
        // Chatbot
        chatbotTitle: "ॲग्रिटेक सहाय्यक",
        chatbotWelcome: "नमस्कार! मी तुमचा ॲग्रिटेक सहाय्यक आहे. आज मी तुम्हाला कशी मदत करू शकतो?",
        typeMessage: "तुमचा संदेश टाइप करा...",
        send: "पाठवा",
        
        // Common
        loading: "लोड होत आहे...",
        selectLanguage: "भाषा निवडा",
        version: "आवृत्ती",
        quintalsPerHa: "क्विंटल/हे",
        confidence: "विश्वास",
        high: "उच्च",
        medium: "मध्यम",
        low: "कमी",
        yes: "हो",
        no: "नाही"
    },
    
    gu: {
        // Navigation
        dashboard: "ડેશબોર્ડ",
        yieldPrediction: "ઉપજ આગાહી",
        cropRecommendation: "પાક ભલામણ",
        advisory: "સલાહ",
        weather: "હવામાન",
        cropDatabase: "પાક ડેટાબેઝ",
        
        // Header
        enterLocation: "સ્થાન દાખલ કરો",
        
        // Dashboard Cards
        currentWeather: "વર્તમાન હવામાન",
        humidity: "ભેજ",
        wind: "પવન",
        dailyFarmingTip: "દૈનિક ખેતી ટિપ",
        currentSeason: "વર્તમાન ઋતુ",
        modelPerformance: "મોડેલ કાર્યક્ષમતા",
        yieldPredictionR2: "ઉપજ આગાહી R²",
        recommendationAccuracy: "ભલામણ ચોકસાઈ",
        supportedCrops: "સમર્થિત પાકો",
        quickActions: "ઝડપી ક્રિયાઓ",
        predictYield: "ઉપજની આગાહી કરો",
        getCropSuggestions: "પાક સૂચનો મેળવો",
        viewAdvisory: "સલાહ જુઓ",
        priorityActions: "અગ્રતા ક્રિયાઓ",
        
        // Forms
        crop: "પાક",
        selectCrop: "પાક પસંદ કરો",
        area: "વિસ્તાર (હેક્ટર)",
        soilType: "માટીનો પ્રકાર",
        selectSoilType: "માટીનો પ્રકાર પસંદ કરો",
        temperature: "તાપમાન (°C)",
        rainfall: "વરસાદ (મિમી/વર્ષ)",
        soilPH: "માટી pH",
        nitrogen: "નાઈટ્રોજન (કિગ્રા/હે)",
        phosphorus: "ફોસ્ફરસ (કિગ્રા/હે)",
        potassium: "પોટેશિયમ (કિગ્રા/હે)",
        fertilizerUsed: "ખાતર વપરાશ (કિગ્રા)",
        calculate: "ગણતરી કરો",
        
        // Results
        predictionResults: "આગાહી પરિણામો",
        summary: "સારાંશ",
        totalExpectedYield: "કુલ અપેક્ષિત ઉપજ",
        modelAccuracy: "મોડેલ ચોકસાઈ (R² સ્કોર)",
        recommendedCrops: "ભલામણ કરેલ પાકો",
        getRecommendations: "ભલામણો મેળવો",
        
        // Advisory
        farmingAdvisory: "ખેતી સલાહ",
        allCrops: "બધા પાકો",
        loadAdvisory: "સલાહ લોડ કરો",
        fertilizerCalculator: "ખાતર કેલ્ક્યુલેટર",
        
        // Weather
        currentConditions: "વર્તમાન સ્થિતિ",
        agriculturalConditions: "ખેતી સ્થિતિ",
        rainProbability: "વરસાદની શક્યતા",
        frostRisk: "હિમ જોખમ",
        heatStressRisk: "ગરમી તણાવ જોખમ",
        sprayingSuitable: "છંટકાવ યોગ્ય",
        sevenDayForecast: "7-દિવસની આગાહી",
        weatherBasedRecommendations: "હવામાન-આધારિત ભલામણો",
        
        // Seasons
        kharif: "ખરીફ",
        rabi: "રવી",
        zaid: "ઝાયદ",
        kharifInfo: "ચોમાસું (જૂન-ઓક્ટોબર). ડાંગર, કપાસ, મકાઈ માટે આદર્શ.",
        rabiInfo: "શિયાળો (ઓક્ટોબર-માર્ચ). ઘઉં, બટાટા, સરસવ માટે આદર્શ.",
        zaidInfo: "ઉનાળો (માર્ચ-જૂન). શાકભાજી અને ફળો માટે આદર્શ.",
        
        // Chatbot
        chatbotTitle: "એગ્રીટેક સહાયક",
        chatbotWelcome: "નમસ્તે! હું તમારો એગ્રીટેક સહાયક છું. આજે હું તમને કેવી રીતે મદદ કરી શકું?",
        typeMessage: "તમારો સંદેશ લખો...",
        send: "મોકલો",
        
        // Common
        loading: "લોડ થઈ રહ્યું છે...",
        selectLanguage: "ભાષા પસંદ કરો",
        version: "આવૃત્તિ",
        quintalsPerHa: "ક્વિન્ટલ/હે",
        confidence: "વિશ્વાસ",
        high: "ઉચ્ચ",
        medium: "મધ્યમ",
        low: "નીચું",
        yes: "હા",
        no: "ના"
    },
    
    kn: {
        // Navigation
        dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
        yieldPrediction: "ಇಳುವರಿ ಮುನ್ಸೂಚನೆ",
        cropRecommendation: "ಬೆಳೆ ಶಿಫಾರಸು",
        advisory: "ಸಲಹೆ",
        weather: "ಹವಾಮಾನ",
        cropDatabase: "ಬೆಳೆ ಡೇಟಾಬೇಸ್",
        
        // Header
        enterLocation: "ಸ್ಥಳ ನಮೂದಿಸಿ",
        
        // Dashboard Cards
        currentWeather: "ಪ್ರಸ್ತುತ ಹವಾಮಾನ",
        humidity: "ಆರ್ದ್ರತೆ",
        wind: "ಗಾಳಿ",
        dailyFarmingTip: "ದೈನಂದಿನ ಕೃಷಿ ಸಲಹೆ",
        currentSeason: "ಪ್ರಸ್ತುತ ಋತು",
        modelPerformance: "ಮಾದರಿ ಕಾರ್ಯಕ್ಷಮತೆ",
        yieldPredictionR2: "ಇಳುವರಿ ಮುನ್ಸೂಚನೆ R²",
        recommendationAccuracy: "ಶಿಫಾರಸು ನಿಖರತೆ",
        supportedCrops: "ಬೆಂಬಲಿತ ಬೆಳೆಗಳು",
        quickActions: "ತ್ವರಿತ ಕ್ರಿಯೆಗಳು",
        predictYield: "ಇಳುವರಿ ಮುನ್ಸೂಚಿಸಿ",
        getCropSuggestions: "ಬೆಳೆ ಸಲಹೆಗಳನ್ನು ಪಡೆಯಿರಿ",
        viewAdvisory: "ಸಲಹೆ ನೋಡಿ",
        priorityActions: "ಆದ್ಯತೆ ಕ್ರಿಯೆಗಳು",
        
        // Forms
        crop: "ಬೆಳೆ",
        selectCrop: "ಬೆಳೆ ಆಯ್ಕೆಮಾಡಿ",
        area: "ಪ್ರದೇಶ (ಹೆಕ್ಟೇರ್)",
        soilType: "ಮಣ್ಣಿನ ಪ್ರಕಾರ",
        selectSoilType: "ಮಣ್ಣಿನ ಪ್ರಕಾರ ಆಯ್ಕೆಮಾಡಿ",
        temperature: "ಉಷ್ಣಾಂಶ (°C)",
        rainfall: "ಮಳೆ (ಮಿಮೀ/ವರ್ಷ)",
        soilPH: "ಮಣ್ಣಿನ pH",
        nitrogen: "ಸಾರಜನಕ (ಕೆಜಿ/ಹೆ)",
        phosphorus: "ರಂಜಕ (ಕೆಜಿ/ಹೆ)",
        potassium: "ಪೊಟ್ಯಾಸಿಯಂ (ಕೆಜಿ/ಹೆ)",
        fertilizerUsed: "ಗೊಬ್ಬರ ಬಳಕೆ (ಕೆಜಿ)",
        calculate: "ಲೆಕ್ಕಹಾಕಿ",
        
        // Results
        predictionResults: "ಮುನ್ಸೂಚನೆ ಫಲಿತಾಂಶಗಳು",
        summary: "ಸಾರಾಂಶ",
        totalExpectedYield: "ಒಟ್ಟು ನಿರೀಕ್ಷಿತ ಇಳುವರಿ",
        modelAccuracy: "ಮಾದರಿ ನಿಖರತೆ (R² ಸ್ಕೋರ್)",
        recommendedCrops: "ಶಿಫಾರಸು ಮಾಡಲಾದ ಬೆಳೆಗಳು",
        getRecommendations: "ಶಿಫಾರಸುಗಳನ್ನು ಪಡೆಯಿರಿ",
        
        // Advisory
        farmingAdvisory: "ಕೃಷಿ ಸಲಹೆ",
        allCrops: "ಎಲ್ಲಾ ಬೆಳೆಗಳು",
        loadAdvisory: "ಸಲಹೆ ಲೋಡ್ ಮಾಡಿ",
        fertilizerCalculator: "ಗೊಬ್ಬರ ಕ್ಯಾಲ್ಕುಲೇಟರ್",
        
        // Weather
        currentConditions: "ಪ್ರಸ್ತುತ ಸ್ಥಿತಿ",
        agriculturalConditions: "ಕೃಷಿ ಸ್ಥಿತಿ",
        rainProbability: "ಮಳೆ ಸಾಧ್ಯತೆ",
        frostRisk: "ಹಿಮ ಅಪಾಯ",
        heatStressRisk: "ಶಾಖ ಒತ್ತಡ ಅಪಾಯ",
        sprayingSuitable: "ಸಿಂಪಡಣೆ ಸೂಕ್ತ",
        sevenDayForecast: "7-ದಿನದ ಮುನ್ಸೂಚನೆ",
        weatherBasedRecommendations: "ಹವಾಮಾನ-ಆಧಾರಿತ ಶಿಫಾರಸುಗಳು",
        
        // Seasons
        kharif: "ಖಾರಿಫ್",
        rabi: "ರಬಿ",
        zaid: "ಜೈದ್",
        kharifInfo: "ಮುಂಗಾರು (ಜೂನ್-ಅಕ್ಟೋಬರ್). ಭತ್ತ, ಹತ್ತಿ, ಮೆಕ್ಕೆಜೋಳಕ್ಕೆ ಸೂಕ್ತ.",
        rabiInfo: "ಚಳಿಗಾಲ (ಅಕ್ಟೋಬರ್-ಮಾರ್ಚ್). ಗೋಧಿ, ಆಲೂಗಡ್ಡೆ, ಸಾಸಿವೆಗೆ ಸೂಕ್ತ.",
        zaidInfo: "ಬೇಸಿಗೆ (ಮಾರ್ಚ್-ಜೂನ್). ತರಕಾರಿ ಮತ್ತು ಹಣ್ಣುಗಳಿಗೆ ಸೂಕ್ತ.",
        
        // Chatbot
        chatbotTitle: "ಅಗ್ರಿಟೆಕ್ ಸಹಾಯಕ",
        chatbotWelcome: "ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ಅಗ್ರಿಟೆಕ್ ಸಹಾಯಕ. ಇಂದು ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?",
        typeMessage: "ನಿಮ್ಮ ಸಂದೇಶವನ್ನು ಟೈಪ್ ಮಾಡಿ...",
        send: "ಕಳುಹಿಸಿ",
        
        // Common
        loading: "ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
        selectLanguage: "ಭಾಷೆ ಆಯ್ಕೆಮಾಡಿ",
        version: "ಆವೃತ್ತಿ",
        quintalsPerHa: "ಕ್ವಿಂಟಾಲ್/ಹೆ",
        confidence: "ವಿಶ್ವಾಸ",
        high: "ಹೆಚ್ಚು",
        medium: "ಮಧ್ಯಮ",
        low: "ಕಡಿಮೆ",
        yes: "ಹೌದು",
        no: "ಇಲ್ಲ"
    },
    
    ml: {
        // Navigation
        dashboard: "ഡാഷ്ബോർഡ്",
        yieldPrediction: "വിളവ് പ്രവചനം",
        cropRecommendation: "വിള ശുപാർശ",
        advisory: "ഉപദേശം",
        weather: "കാലാവസ്ഥ",
        cropDatabase: "വിള ഡേറ്റാബേസ്",
        
        // Header
        enterLocation: "സ്ഥാനം നൽകുക",
        
        // Dashboard Cards
        currentWeather: "നിലവിലെ കാലാവസ്ഥ",
        humidity: "ഈർപ്പം",
        wind: "കാറ്റ്",
        dailyFarmingTip: "ദൈനംദിന കൃഷി ടിപ്പ്",
        currentSeason: "നിലവിലെ സീസൺ",
        modelPerformance: "മോഡൽ പ്രകടനം",
        yieldPredictionR2: "വിളവ് പ്രവചനം R²",
        recommendationAccuracy: "ശുപാർശ കൃത്യത",
        supportedCrops: "പിന്തുണയ്ക്കുന്ന വിളകൾ",
        quickActions: "ദ്രുത പ്രവർത്തനങ്ങൾ",
        predictYield: "വിളവ് പ്രവചിക്കുക",
        getCropSuggestions: "വിള നിർദ്ദേശങ്ങൾ നേടുക",
        viewAdvisory: "ഉപദേശം കാണുക",
        priorityActions: "മുൻഗണന പ്രവർത്തനങ്ങൾ",
        
        // Forms
        crop: "വിള",
        selectCrop: "വിള തിരഞ്ഞെടുക്കുക",
        area: "വിസ്തീർണ്ണം (ഹെക്ടർ)",
        soilType: "മണ്ണിന്റെ തരം",
        selectSoilType: "മണ്ണിന്റെ തരം തിരഞ്ഞെടുക്കുക",
        temperature: "താപനില (°C)",
        rainfall: "മഴ (മിമി/വർഷം)",
        soilPH: "മണ്ണ് pH",
        nitrogen: "നൈട്രജൻ (കിഗ്രാ/ഹെ)",
        phosphorus: "ഫോസ്ഫറസ് (കിഗ്രാ/ഹെ)",
        potassium: "പൊട്ടാസ്യം (കിഗ്രാ/ഹെ)",
        fertilizerUsed: "വളം ഉപയോഗം (കിഗ്രാ)",
        calculate: "കണക്കുകൂട്ടുക",
        
        // Results
        predictionResults: "പ്രവചന ഫലങ്ങൾ",
        summary: "സംഗ്രഹം",
        totalExpectedYield: "ആകെ പ്രതീക്ഷിക്കുന്ന വിളവ്",
        modelAccuracy: "മോഡൽ കൃത്യത (R² സ്കോർ)",
        recommendedCrops: "ശുപാർശ ചെയ്ത വിളകൾ",
        getRecommendations: "ശുപാർശകൾ നേടുക",
        
        // Advisory
        farmingAdvisory: "കൃഷി ഉപദേശം",
        allCrops: "എല്ലാ വിളകളും",
        loadAdvisory: "ഉപദേശം ലോഡ് ചെയ്യുക",
        fertilizerCalculator: "വളം കാൽക്കുലേറ്റർ",
        
        // Weather
        currentConditions: "നിലവിലെ അവസ്ഥ",
        agriculturalConditions: "കാർഷിക അവസ്ഥ",
        rainProbability: "മഴ സാധ്യത",
        frostRisk: "മഞ്ഞ് അപകടം",
        heatStressRisk: "ചൂട് സമ്മർദ്ദ അപകടം",
        sprayingSuitable: "തളിക്കൽ അനുയോജ്യം",
        sevenDayForecast: "7-ദിവസ പ്രവചനം",
        weatherBasedRecommendations: "കാലാവസ്ഥ-അടിസ്ഥാന ശുപാർശകൾ",
        
        // Seasons
        kharif: "ഖരിഫ്",
        rabi: "റബി",
        zaid: "സൈദ്",
        kharifInfo: "മൺസൂൺ കാലം (ജൂൺ-ഒക്ടോബർ). നെല്ല്, പരുത്തി, ചോളത്തിന് അനുയോജ്യം.",
        rabiInfo: "ശീതകാലം (ഒക്ടോബർ-മാർച്ച്). ഗോതമ്പ്, ഉരുളക്കിഴങ്ങ്, കടുകിന് അനുയോജ്യം.",
        zaidInfo: "വേനൽക്കാലം (മാർച്ച്-ജൂൺ). പച്ചക്കറികൾക്കും പഴങ്ങൾക്കും അനുയോജ്യം.",
        
        // Chatbot
        chatbotTitle: "അഗ്രിടെക് അസിസ്റ്റന്റ്",
        chatbotWelcome: "നമസ്കാരം! ഞാൻ നിങ്ങളുടെ അഗ്രിടെക് അസിസ്റ്റന്റ് ആണ്. ഇന്ന് ഞാൻ നിങ്ങളെ എങ്ങനെ സഹായിക്കും?",
        typeMessage: "നിങ്ങളുടെ സന്ദേശം ടൈപ്പ് ചെയ്യുക...",
        send: "അയയ്ക്കുക",
        
        // Common
        loading: "ലോഡ് ചെയ്യുന്നു...",
        selectLanguage: "ഭാഷ തിരഞ്ഞെടുക്കുക",
        version: "പതിപ്പ്",
        quintalsPerHa: "ക്വിന്റൽ/ഹെ",
        confidence: "വിശ്വാസം",
        high: "ഉയർന്ന",
        medium: "മധ്യമ",
        low: "താഴ്ന്ന",
        yes: "അതെ",
        no: "ഇല്ല"
    },
    
    or: {
        // Navigation
        dashboard: "ଡ୍ୟାସବୋର୍ଡ",
        yieldPrediction: "ଅମଳ ଭବିଷ୍ୟବାଣୀ",
        cropRecommendation: "ଫସଲ ସୁପାରିଶ",
        advisory: "ପରାମର୍ଶ",
        weather: "ପାଣିପାଗ",
        cropDatabase: "ଫସଲ ଡାଟାବେସ",
        
        // Header
        enterLocation: "ସ୍ଥାନ ଲେଖନ୍ତୁ",
        
        // Dashboard Cards
        currentWeather: "ବର୍ତ୍ତମାନ ପାଣିପାଗ",
        humidity: "ଆର୍ଦ୍ରତା",
        wind: "ବାୟୁ",
        dailyFarmingTip: "ଦୈନିକ କୃଷି ଟିପ୍",
        currentSeason: "ବର୍ତ୍ତମାନ ଋତୁ",
        modelPerformance: "ମଡେଲ କାର୍ଯ୍ୟଦକ୍ଷତା",
        yieldPredictionR2: "ଅମଳ ଭବିଷ୍ୟବାଣୀ R²",
        recommendationAccuracy: "ସୁପାରିଶ ସଠିକତା",
        supportedCrops: "ସମର୍ଥିତ ଫସଲ",
        quickActions: "ଦ୍ରୁତ କାର୍ଯ୍ୟ",
        predictYield: "ଅମଳ ଭବିଷ୍ୟବାଣୀ କରନ୍ତୁ",
        getCropSuggestions: "ଫସଲ ପରାମର୍ଶ ପ୍ରାପ୍ତ କରନ୍ତୁ",
        viewAdvisory: "ପରାମର୍ଶ ଦେଖନ୍ତୁ",
        priorityActions: "ପ୍ରାଥମିକତା କାର୍ଯ୍ୟ",
        
        // Forms
        crop: "ଫସଲ",
        selectCrop: "ଫସଲ ବାଛନ୍ତୁ",
        area: "କ୍ଷେତ୍ର (ହେକ୍ଟର)",
        soilType: "ମାଟି ପ୍ରକାର",
        selectSoilType: "ମାଟି ପ୍ରକାର ବାଛନ୍ତୁ",
        temperature: "ତାପମାତ୍ରା (°C)",
        rainfall: "ବର୍ଷା (ମିମି/ବର୍ଷ)",
        soilPH: "ମାଟି pH",
        nitrogen: "ନାଇଟ୍ରୋଜେନ (କେଜି/ହେ)",
        phosphorus: "ଫସଫରସ (କେଜି/ହେ)",
        potassium: "ପୋଟାସିୟମ (କେଜି/ହେ)",
        fertilizerUsed: "ସାର ବ୍ୟବହାର (କେଜି)",
        calculate: "ଗଣନା କରନ୍ତୁ",
        
        // Results
        predictionResults: "ଭବିଷ୍ୟବାଣୀ ଫଳାଫଳ",
        summary: "ସାରାଂଶ",
        totalExpectedYield: "ମୋଟ ଆଶାନୁରୂପ ଅମଳ",
        modelAccuracy: "ମଡେଲ ସଠିକତା (R² ସ୍କୋର)",
        recommendedCrops: "ସୁପାରିଶ କରାଯାଇଥିବା ଫସଲ",
        getRecommendations: "ସୁପାରିଶ ପ୍ରାପ୍ତ କରନ୍ତୁ",
        
        // Advisory
        farmingAdvisory: "କୃଷି ପରାମର୍ଶ",
        allCrops: "ସମସ୍ତ ଫସଲ",
        loadAdvisory: "ପରାମର୍ଶ ଲୋଡ କରନ୍ତୁ",
        fertilizerCalculator: "ସାର କାଲକୁଲେଟର",
        
        // Weather
        currentConditions: "ବର୍ତ୍ତମାନ ସ୍ଥିତି",
        agriculturalConditions: "କୃଷି ସ୍ଥିତି",
        rainProbability: "ବର୍ଷା ସମ୍ଭାବନା",
        frostRisk: "ତୁଷାର ବିପଦ",
        heatStressRisk: "ଗରମ ଚାପ ବିପଦ",
        sprayingSuitable: "ସ୍ପ୍ରେ ଉପଯୁକ୍ତ",
        sevenDayForecast: "7-ଦିନର ପୂର୍ବାନୁମାନ",
        weatherBasedRecommendations: "ପାଣିପାଗ-ଆଧାରିତ ସୁପାରିଶ",
        
        // Seasons
        kharif: "ଖରିଫ",
        rabi: "ରବି",
        zaid: "ଜାଇଦ",
        kharifInfo: "ବର୍ଷା ଋତୁ (ଜୁନ-ଅକ୍ଟୋବର)। ଧାନ, କପା, ମକା ପାଇଁ ଆଦର୍ଶ।",
        rabiInfo: "ଶୀତ ଋତୁ (ଅକ୍ଟୋବର-ମାର୍ଚ)। ଗହମ, ଆଳୁ, ସୋରିଷ ପାଇଁ ଆଦର୍ଶ।",
        zaidInfo: "ଗ୍ରୀଷ୍ମ ଋତୁ (ମାର୍ଚ-ଜୁନ)। ପନିପରିବା ଏବଂ ଫଳ ପାଇଁ ଆଦର୍ଶ।",
        
        // Chatbot
        chatbotTitle: "ଏଗ୍ରିଟେକ ସହାୟକ",
        chatbotWelcome: "ନମ୍ସ୍କାର! ମୁଁ ଆପଣଙ୍କ ଏଗ୍ରିଟେକ ସହାୟକ। ଆଜି ମୁଁ ଆପଣଙ୍କୁ କିପରି ସାହାଯ୍ୟ କରିପାରିବି?",
        typeMessage: "ଆପଣଙ୍କ ସନ୍ଦେଶ ଲେଖନ୍ତୁ...",
        send: "ପଠାନ୍ତୁ",
        
        // Common
        loading: "ଲୋଡ ହେଉଛି...",
        selectLanguage: "ଭାଷା ବାଛନ୍ତୁ",
        version: "ସଂସ୍କରଣ",
        quintalsPerHa: "କ୍ୱିଣ୍ଟଲ/ହେ",
        confidence: "ବିଶ୍ୱାସ",
        high: "ଉଚ୍ଚ",
        medium: "ମଧ୍ୟମ",
        low: "କମ",
        yes: "ହଁ",
        no: "ନା"
    },
    
    bho: {
        // Navigation
        dashboard: "डैशबोर्ड",
        yieldPrediction: "पैदावार का अनुमान",
        cropRecommendation: "फसल सिफारिश",
        advisory: "सलाह",
        weather: "मौसम",
        cropDatabase: "फसल डेटाबेस",
        
        // Header
        enterLocation: "जगह दर्ज करीं",
        
        // Dashboard Cards
        currentWeather: "अभी का मौसम",
        humidity: "आर्द्रता",
        wind: "हवा",
        dailyFarmingTip: "रोज का खेती टिप",
        currentSeason: "अभी का मौसम",
        modelPerformance: "मॉडल प्रदर्शन",
        yieldPredictionR2: "पैदावार अनुमान R²",
        recommendationAccuracy: "सिफारिश सटीकता",
        supportedCrops: "समर्थित फसल",
        quickActions: "जल्दी काम",
        predictYield: "पैदावार का अनुमान लगाईं",
        getCropSuggestions: "फसल सुझाव लीं",
        viewAdvisory: "सलाह देखीं",
        priorityActions: "पहिला काम",
        
        // Forms
        crop: "फसल",
        selectCrop: "फसल चुनीं",
        area: "रकबा (हेक्टेयर)",
        soilType: "माटी का प्रकार",
        selectSoilType: "माटी का प्रकार चुनीं",
        temperature: "तापमान (°C)",
        rainfall: "बरसात (मिमी/साल)",
        soilPH: "माटी pH",
        nitrogen: "नाइट्रोजन (किलो/हे)",
        phosphorus: "फास्फोरस (किलो/हे)",
        potassium: "पोटेशियम (किलो/हे)",
        fertilizerUsed: "खाद उपयोग (किलो)",
        calculate: "गिनती करीं",
        
        // Results
        predictionResults: "अनुमान नतीजा",
        summary: "सारांश",
        totalExpectedYield: "कुल उम्मीद पैदावार",
        modelAccuracy: "मॉडल सटीकता (R² स्कोर)",
        recommendedCrops: "सिफारिश कइल फसल",
        getRecommendations: "सिफारिश लीं",
        
        // Advisory
        farmingAdvisory: "खेती सलाह",
        allCrops: "सब फसल",
        loadAdvisory: "सलाह लोड करीं",
        fertilizerCalculator: "खाद कैलकुलेटर",
        
        // Weather
        currentConditions: "अभी का हालात",
        agriculturalConditions: "खेती हालात",
        rainProbability: "बरसात का संभावना",
        frostRisk: "पाला खतरा",
        heatStressRisk: "गरमी खतरा",
        sprayingSuitable: "छिड़काव ठीक बा",
        sevenDayForecast: "7-दिन का पूर्वानुमान",
        weatherBasedRecommendations: "मौसम-आधारित सिफारिश",
        
        // Seasons
        kharif: "खरीफ",
        rabi: "रबी",
        zaid: "जायद",
        kharifInfo: "बरसात का मौसम (जून-अक्टूबर)। धान, कपास, मकई खातिर बढ़िया।",
        rabiInfo: "जाड़ा का मौसम (अक्टूबर-मार्च)। गेहूँ, आलू, सरसों खातिर बढ़िया।",
        zaidInfo: "गरमी का मौसम (मार्च-जून)। तरकारी और फल खातिर बढ़िया।",
        
        // Chatbot
        chatbotTitle: "एग्रीटेक सहायक",
        chatbotWelcome: "प्रणाम! हम राउरी एग्रीटेक सहायक हईं। आज हम राउरी का कइसे मदद करीं?",
        typeMessage: "अपन संदेश लिखीं...",
        send: "भेजीं",
        
        // Common
        loading: "लोड हो रहल बा...",
        selectLanguage: "भाषा चुनीं",
        version: "संस्करण",
        quintalsPerHa: "क्विंटल/हे",
        confidence: "भरोसा",
        high: "जादा",
        medium: "मध्यम",
        low: "कम",
        yes: "हँ",
        no: "नाहीं"
    }
};

// Language display names
const languageNames = {
    en: "English",
    hi: "हिन्दी",
    pa: "ਪੰਜਾਬੀ",
    ta: "தமிழ்",
    te: "తెలుగు",
    bn: "বাংলা",
    mr: "मराठी",
    gu: "ગુજરાતી",
    kn: "ಕನ್ನಡ",
    ml: "മലയാളം",
    or: "ଓଡ଼ିଆ",
    bho: "भोजपुरी"
};

// Current language
let currentLanguage = localStorage.getItem('agritech_language') || 'en';

// Get translation
function t(key) {
    return translations[currentLanguage]?.[key] || translations['en'][key] || key;
}

// Set language
function setLanguage(lang) {
    if (translations[lang]) {
        currentLanguage = lang;
        localStorage.setItem('agritech_language', lang);
        updateUILanguage();
        return true;
    }
    return false;
}

// Get current language
function getCurrentLanguage() {
    return currentLanguage;
}

// Update all UI elements with translations
function updateUILanguage() {
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = t(key);
    });
    
    // Update all elements with data-i18n-placeholder attribute
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        el.placeholder = t(key);
    });
    
    // Update language selector display
    const langDisplay = document.getElementById('current-lang-name');
    if (langDisplay) {
        langDisplay.textContent = languageNames[currentLanguage];
    }
    
    // Dispatch event for other components
    document.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: currentLanguage } }));
}
