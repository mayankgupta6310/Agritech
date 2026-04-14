/**
 * AgriTech Pro - Chatbot Assistant
 * AI-powered farming assistant chatbot
 */

class AgriTechChatbot {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.isTyping = false;
        
        // Comprehensive Knowledge base for farming queries
        this.knowledgeBase = {
            // Crop Information - Extended
            crops: {
                rice: {
                    en: "🌾 **Rice (Paddy) - Complete Guide**\n\n**Season:** Kharif (June-October)\n**Temperature:** 20-35°C\n**Rainfall:** 100-200cm annually\n**Soil:** Clay loam, pH 5.5-6.5\n**Growth Period:** 90-150 days\n\n**Cultivation Tips:**\n• Prepare nursery beds 25 days before transplanting\n• Maintain 2-5cm water during vegetative stage\n• Apply 120:60:40 kg NPK per hectare\n• Harvest when 80% grains turn golden\n\n**Common Varieties:** Basmati, IR-64, Pusa Basmati, Samba Masuri",
                    hi: "🌾 **धान - संपूर्ण मार्गदर्शिका**\n\n**मौसम:** खरीफ (जून-अक्टूबर)\n**तापमान:** 20-35°C\n**वर्षा:** 100-200 सेमी वार्षिक\n**मिट्टी:** दोमट मिट्टी, pH 5.5-6.5\n**अवधि:** 90-150 दिन\n\n**खेती टिप्स:**\n• रोपाई से 25 दिन पहले नर्सरी तैयार करें\n• वानस्पतिक अवस्था में 2-5 सेमी पानी रखें\n• 120:60:40 kg NPK प्रति हेक्टेयर डालें\n• 80% दाने सुनहरे होने पर कटाई करें\n\n**प्रमुख किस्में:** बासमती, IR-64, पूसा बासमती",
                    bho: "🌾 **धान - पूरा जानकारी**\n\n**मौसम:** खरीफ (जून-अक्टूबर)\n**तापमान:** 20-35°C\n**बरसात:** 100-200 सेमी साल में\n**माटी:** दोमट माटी\n\n**खेती सुझाव:**\n• रोपाई से 25 दिन पहिले नर्सरी बनाईं\n• 120:60:40 kg NPK प्रति हेक्टेयर डालीं\n• 80% दाना सुनहरा होखे तब काटीं"
                },
                wheat: {
                    en: "🌾 **Wheat - Complete Guide**\n\n**Season:** Rabi (October-March)\n**Temperature:** 10-25°C (optimal: 15-20°C)\n**Rainfall:** 50-100cm\n**Soil:** Loamy, well-drained, pH 6.0-7.5\n**Growth Period:** 120-150 days\n\n**Cultivation Tips:**\n• Sow seeds at 4-5cm depth, 20cm row spacing\n• First irrigation 20-25 days after sowing (crown root stage)\n• Apply 120:60:40 kg NPK per hectare\n• 5-6 irrigations needed during crop cycle\n• Harvest when grains are hard and golden\n\n**Common Varieties:** HD-2967, PBW-343, WH-147, Lok-1",
                    hi: "🌾 **गेहूं - संपूर्ण मार्गदर्शिका**\n\n**मौसम:** रबी (अक्टूबर-मार्च)\n**तापमान:** 10-25°C (आदर्श: 15-20°C)\n**वर्षा:** 50-100 सेमी\n**मिट्टी:** दोमट, अच्छी जल निकासी, pH 6.0-7.5\n**अवधि:** 120-150 दिन\n\n**खेती टिप्स:**\n• 4-5 सेमी गहराई, 20 सेमी पंक्ति दूरी\n• पहली सिंचाई 20-25 दिन बाद (ताज जड़ अवस्था)\n• 120:60:40 kg NPK प्रति हेक्टेयर\n• फसल चक्र में 5-6 सिंचाई\n• दाने सख्त और सुनहरे होने पर कटाई\n\n**प्रमुख किस्में:** HD-2967, PBW-343, WH-147"
                },
                cotton: {
                    en: "🌿 **Cotton - Complete Guide**\n\n**Season:** Kharif (April-September)\n**Temperature:** 21-30°C\n**Rainfall:** 50-100cm\n**Soil:** Black/Regur soil, pH 6.0-8.0\n**Growth Period:** 150-180 days\n\n**Cultivation Tips:**\n• Sow after first monsoon showers\n• Spacing: 60x30cm or 90x60cm\n• Apply 80:40:40 kg NPK per hectare\n• First picking at 50% bolls open\n• Multiple pickings at 15-day intervals\n\n**Pest Management:**\n• Watch for bollworms, aphids, whitefly\n• Use pheromone traps for monitoring\n• Bt cotton varieties resist bollworm\n\n**Common Varieties:** Bt Cotton, MCU-5, Suvin, DCH-32",
                    hi: "🌿 **कपास - संपूर्ण मार्गदर्शिका**\n\n**मौसम:** खरीफ (अप्रैल-सितंबर)\n**तापमान:** 21-30°C\n**वर्षा:** 50-100 सेमी\n**मिट्टी:** काली मिट्टी, pH 6.0-8.0\n**अवधि:** 150-180 दिन\n\n**खेती टिप्स:**\n• पहली मानसून बारिश के बाद बुवाई\n• दूरी: 60x30cm या 90x60cm\n• 80:40:40 kg NPK प्रति हेक्टेयर\n• 50% बॉल खुलने पर पहली चुनाई\n\n**कीट प्रबंधन:**\n• बॉलवर्म, एफिड्स, सफेद मक्खी पर नजर\n• Bt कपास बॉलवर्म प्रतिरोधी"
                },
                sugarcane: {
                    en: "🎋 **Sugarcane - Complete Guide**\n\n**Season:** Year-round (Best: Feb-March, Oct)\n**Temperature:** 20-35°C\n**Rainfall:** 75-150cm\n**Soil:** Deep, fertile loamy, pH 6.5-7.5\n**Growth Period:** 12-18 months\n\n**Cultivation Tips:**\n• Plant 3-budded setts in furrows\n• Spacing: 90cm between rows\n• Apply 250:115:60 kg NPK per hectare\n• Earthing up at 90 and 120 days\n• Trash mulching for moisture retention\n\n**Irrigation:**\n• Most water needed in tillering stage\n• 8-10 irrigations in subtropical areas\n• Reduce water 2-3 weeks before harvest\n\n**Common Varieties:** Co-0238, CoC-671, CoS-767",
                    hi: "🎋 **गन्ना - संपूर्ण मार्गदर्शिका**\n\n**मौसम:** साल भर (बेहतर: फ़रवरी-मार्च, अक्टूबर)\n**तापमान:** 20-35°C\n**वर्षा:** 75-150 सेमी\n**मिट्टी:** गहरी उपजाऊ दोमट, pH 6.5-7.5\n**अवधि:** 12-18 महीने\n\n**खेती टिप्स:**\n• 3-आंख वाले टुकड़े लगाएं\n• पंक्ति दूरी: 90 सेमी\n• 250:115:60 kg NPK प्रति हेक्टेयर\n• 90 और 120 दिन पर मिट्टी चढ़ाएं\n\n**सिंचाई:**\n• किल्लों की अवस्था में सबसे ज्यादा पानी\n• कटाई से 2-3 सप्ताह पहले पानी कम करें"
                },
                maize: {
                    en: "🌽 **Maize/Corn - Complete Guide**\n\n**Season:** All three (Kharif best)\n**Temperature:** 21-27°C\n**Rainfall:** 50-100cm\n**Soil:** Well-drained loamy, pH 5.5-7.5\n**Growth Period:** 80-110 days\n\n**Cultivation Tips:**\n• Sow at 5cm depth, spacing 60x20cm\n• Apply 120:60:40 kg NPK per hectare\n• Side dress nitrogen at knee-high stage\n• Critical irrigation at tasseling/silking\n• Harvest when grains are hard\n\n**Uses:** Food, fodder, industrial starch, corn oil\n\n**Common Varieties:** DHM-117, Ganga-11, African Tall",
                    hi: "🌽 **मक्का - संपूर्ण मार्गदर्शिका**\n\n**मौसम:** तीनों (खरीफ सबसे अच्छा)\n**तापमान:** 21-27°C\n**वर्षा:** 50-100 सेमी\n**मिट्टी:** अच्छी जल निकासी वाली दोमट, pH 5.5-7.5\n**अवधि:** 80-110 दिन\n\n**खेती टिप्स:**\n• 5 सेमी गहराई, 60x20 सेमी दूरी\n• 120:60:40 kg NPK प्रति हेक्टेयर\n• घुटने की ऊंचाई पर नाइट्रोजन डालें\n• बालियां निकलने पर सिंचाई जरूरी"
                },
                potato: {
                    en: "🥔 **Potato - Complete Guide**\n\n**Season:** Rabi (October-February)\n**Temperature:** 15-25°C (tuber: 17-20°C)\n**Rainfall:** 50-80cm\n**Soil:** Sandy loam, pH 5.5-6.5\n**Growth Period:** 90-120 days\n\n**Cultivation Tips:**\n• Use certified disease-free seed tubers\n• Plant at 5-7cm depth, 60x20cm spacing\n• Apply 150:100:100 kg NPK per hectare\n• Earthing up at 25-30 and 45-50 days\n• 8-10 light irrigations needed\n\n**Storage:** Keep at 2-4°C with 95% humidity\n\n**Common Varieties:** Kufri Jyoti, Kufri Chandramukhi, Kufri Pukhraj",
                    hi: "🥔 **आलू - संपूर्ण मार्गदर्शिका**\n\n**मौसम:** रबी (अक्टूबर-फ़रवरी)\n**तापमान:** 15-25°C (कंद: 17-20°C)\n**मिट्टी:** बलुई दोमट, pH 5.5-6.5\n**अवधि:** 90-120 दिन\n\n**खेती टिप्स:**\n• प्रमाणित बीज कंद उपयोग करें\n• 5-7 सेमी गहराई, 60x20 सेमी दूरी\n• 150:100:100 kg NPK प्रति हेक्टेयर\n• 25-30 और 45-50 दिन पर मिट्टी चढ़ाएं\n\n**भंडारण:** 2-4°C, 95% आर्द्रता"
                },
                tomato: {
                    en: "🍅 **Tomato - Complete Guide**\n\n**Season:** Year-round (Rabi best)\n**Temperature:** 20-27°C (night: 15-20°C)\n**Soil:** Well-drained loamy, pH 6.0-7.0\n**Growth Period:** 90-120 days\n\n**Cultivation Tips:**\n• Transplant 25-30 day old seedlings\n• Spacing: 60x45cm\n• Apply 120:80:80 kg NPK per hectare\n• Stake plants for support\n• Drip irrigation recommended\n\n**Common Issues:**\n• Early/Late blight - use fungicides\n• Fruit borer - pheromone traps\n• Blossom end rot - calcium deficiency\n\n**Varieties:** Pusa Ruby, Arka Vikas, Pant T-3",
                    hi: "🍅 **टमाटर - संपूर्ण मार्गदर्शिका**\n\n**मौसम:** साल भर (रबी सबसे अच्छा)\n**तापमान:** 20-27°C\n**मिट्टी:** अच्छी जल निकासी वाली दोमट, pH 6.0-7.0\n**अवधि:** 90-120 दिन\n\n**खेती टिप्स:**\n• 25-30 दिन की पौध रोपें\n• दूरी: 60x45 सेमी\n• 120:80:80 kg NPK प्रति हेक्टेयर\n• पौधों को सहारा दें\n• ड्रिप सिंचाई अनुशंसित"
                },
                onion: {
                    en: "🧅 **Onion - Complete Guide**\n\n**Season:** Rabi (Nov-Dec), Late Kharif (Aug-Sep)\n**Temperature:** 15-25°C\n**Soil:** Well-drained sandy loam, pH 6.0-7.0\n**Growth Period:** 100-140 days\n\n**Cultivation Tips:**\n• Transplant 6-8 week old seedlings\n• Spacing: 15x10cm\n• Apply 100:50:50 kg NPK per hectare\n• Stop irrigation 10 days before harvest\n• Cure bulbs in shade for 10-15 days\n\n**Storage:** Keep in ventilated rooms, 25-30°C\n\n**Varieties:** Pusa Red, Nasik Red, Agrifound Dark Red",
                    hi: "🧅 **प्याज - संपूर्ण मार्गदर्शिका**\n\n**मौसम:** रबी (नवं-दिसं), देर खरीफ (अग-सितं)\n**तापमान:** 15-25°C\n**मिट्टी:** बलुई दोमट, pH 6.0-7.0\n**अवधि:** 100-140 दिन\n\n**खेती टिप्स:**\n• 6-8 सप्ताह पुरानी पौध रोपें\n• दूरी: 15x10 सेमी\n• 100:50:50 kg NPK प्रति हेक्टेयर\n• कटाई से 10 दिन पहले सिंचाई बंद\n• 10-15 दिन छाया में सुखाएं"
                },
                mustard: {
                    en: "💛 **Mustard - Complete Guide**\n\n**Season:** Rabi (October-November sowing)\n**Temperature:** 10-25°C\n**Rainfall:** 25-40cm\n**Soil:** Loamy to sandy loam, pH 6.0-7.5\n**Growth Period:** 110-140 days\n\n**Cultivation Tips:**\n• Sow at 2.5-3cm depth\n• Spacing: 30x10cm\n• Apply 60:40:40 kg NPK per hectare\n• First irrigation 25-30 days after sowing\n• Harvest when pods turn yellow-brown\n\n**Oil Content:** 35-45%\n\n**Varieties:** Pusa Bold, Varuna, RH-30",
                    hi: "💛 **सरसों - संपूर्ण मार्गदर्शिका**\n\n**मौसम:** रबी (अक्टूबर-नवंबर बुवाई)\n**तापमान:** 10-25°C\n**वर्षा:** 25-40 सेमी\n**मिट्टी:** दोमट से बलुई दोमट, pH 6.0-7.5\n**अवधि:** 110-140 दिन\n\n**खेती टिप्स:**\n• 2.5-3 सेमी गहराई पर बुवाई\n• दूरी: 30x10 सेमी\n• 60:40:40 kg NPK प्रति हेक्टेयर\n• फलियां पीली-भूरी होने पर कटाई\n\n**तेल मात्रा:** 35-45%"
                },
                soybean: {
                    en: "🌱 **Soybean - Complete Guide**\n\n**Season:** Kharif (June-July sowing)\n**Temperature:** 20-30°C\n**Rainfall:** 60-100cm\n**Soil:** Well-drained loamy, pH 6.0-7.5\n**Growth Period:** 90-120 days\n\n**Cultivation Tips:**\n• Seed rate: 60-80 kg/hectare\n• Spacing: 45x5cm\n• Apply 25:60:40 kg NPK per hectare\n• Rhizobium seed treatment essential\n• Avoid waterlogging\n\n**Benefits:** Nitrogen fixation improves soil\n\n**Varieties:** JS-335, MACS-450, NRC-7",
                    hi: "🌱 **सोयाबीन - संपूर्ण मार्गदर्शिका**\n\n**मौसम:** खरीफ (जून-जुलाई बुवाई)\n**तापमान:** 20-30°C\n**वर्षा:** 60-100 सेमी\n**मिट्टी:** अच्छी जल निकासी वाली दोमट, pH 6.0-7.5\n**अवधि:** 90-120 दिन\n\n**खेती टिप्स:**\n• बीज दर: 60-80 kg/हेक्टेयर\n• दूरी: 45x5 सेमी\n• 25:60:40 kg NPK प्रति हेक्टेयर\n• राइजोबियम उपचार जरूरी\n\n**लाभ:** नाइट्रोजन स्थिरीकरण से मिट्टी सुधार"
                },
                groundnut: {
                    en: "🥜 **Groundnut/Peanut - Complete Guide**\n\n**Season:** Kharif and Rabi-Summer\n**Temperature:** 25-30°C\n**Rainfall:** 50-125cm\n**Soil:** Sandy loam, pH 6.0-6.5\n**Growth Period:** 100-130 days\n\n**Cultivation Tips:**\n• Seed rate: 80-100 kg/hectare\n• Spacing: 30x10cm\n• Apply 10:40:40 kg NPK + gypsum 250 kg/ha\n• Earthing up at 40-45 days essential\n• Calcium important for pod development\n\n**Common Varieties:** TMV-2, JL-24, TG-37A",
                    hi: "🥜 **मूंगफली - संपूर्ण मार्गदर्शिका**\n\n**मौसम:** खरीफ और रबी-ग्रीष्म\n**तापमान:** 25-30°C\n**वर्षा:** 50-125 सेमी\n**मिट्टी:** बलुई दोमट, pH 6.0-6.5\n**अवधि:** 100-130 दिन\n\n**खेती टिप्स:**\n• बीज दर: 80-100 kg/हेक्टेयर\n• दूरी: 30x10 सेमी\n• 10:40:40 kg NPK + जिप्सम 250 kg/ha\n• 40-45 दिन पर मिट्टी चढ़ाना जरूरी"
                },
                chana: {
                    en: "🫘 **Chickpea/Gram - Complete Guide**\n\n**Season:** Rabi (October-November sowing)\n**Temperature:** 15-25°C\n**Rainfall:** 25-50cm (low water requirement)\n**Soil:** Loamy to clay loam, pH 6.0-7.5\n**Growth Period:** 100-130 days\n\n**Cultivation Tips:**\n• Seed rate: 75-100 kg/hectare\n• Spacing: 30x10cm\n• Apply 20:50:20 kg NPK per hectare\n• Only 1-2 irrigations needed\n• Rhizobium seed treatment beneficial\n\n**Common Varieties:** Pusa-256, JG-16, ICCV-10",
                    hi: "🫘 **चना - संपूर्ण मार्गदर्शिका**\n\n**मौसम:** रबी (अक्टूबर-नवंबर बुवाई)\n**तापमान:** 15-25°C\n**वर्षा:** 25-50 सेमी (कम पानी की आवश्यकता)\n**मिट्टी:** दोमट से मटियार दोमट, pH 6.0-7.5\n**अवधि:** 100-130 दिन\n\n**खेती टिप्स:**\n• बीज दर: 75-100 kg/हेक्टेयर\n• दूरी: 30x10 सेमी\n• 20:50:20 kg NPK प्रति हेक्टेयर\n• केवल 1-2 सिंचाई\n\n**प्रमुख किस्में:** पूसा-256, JG-16"
                },
                barley: {
                    en: "🌾 **Barley - Complete Guide**\n\n**Season:** Rabi (October-November sowing)\n**Temperature:** 12-25°C\n**Rainfall:** 25-50cm\n**Soil:** Loamy, tolerates saline/alkaline, pH 7.0-8.5\n**Growth Period:** 120-140 days\n\n**Cultivation Tips:**\n• Seed rate: 75-100 kg/hectare\n• Spacing: 22.5cm rows\n• Apply 60:30:20 kg NPK per hectare\n• Drought tolerant, needs 3-4 irrigations\n• Good for marginal lands\n\n**Uses:** Animal feed, malt, food\n\n**Varieties:** BH-393, Jyoti, Narendra Barley-3",
                    hi: "🌾 **जौ - संपूर्ण मार्गदर्शिका**\n\n**मौसम:** रबी (अक्टूबर-नवंबर बुवाई)\n**तापमान:** 12-25°C\n**मिट्टी:** दोमट, लवणीय/क्षारीय सहन, pH 7.0-8.5\n**अवधि:** 120-140 दिन\n\n**खेती टिप्स:**\n• बीज दर: 75-100 kg/हेक्टेयर\n• पंक्ति दूरी: 22.5 सेमी\n• 60:30:20 kg NPK प्रति हेक्टेयर\n• सूखा सहनशील, 3-4 सिंचाई\n\n**उपयोग:** पशु चारा, माल्ट, भोजन"
                }
            },
            
            // Seasons - Extended
            seasons: {
                kharif: {
                    en: "🌧️ **Kharif Season - Complete Guide**\n\n**Period:** June to October (Monsoon season)\n\n**Major Crops:**\n• Rice, Maize, Sorghum, Millet\n• Cotton, Jute, Sugarcane\n• Soybean, Groundnut, Sesame\n• Pulses: Arhar, Moong, Urad\n\n**Key Points:**\n• Sowing starts with monsoon onset\n• High water availability\n• Heavy pest/disease pressure\n• Regular spraying needed\n• Harvesting: September-November\n\n**Tips:**\n• Prepare fields before monsoon\n• Good drainage essential\n• Use disease-resistant varieties",
                    hi: "🌧️ **खरीफ मौसम - संपूर्ण जानकारी**\n\n**अवधि:** जून से अक्टूबर (मानसून)\n\n**प्रमुख फसलें:**\n• धान, मक्का, ज्वार, बाजरा\n• कपास, जूट, गन्ना\n• सोयाबीन, मूंगफली, तिल\n• दालें: अरहर, मूंग, उड़द\n\n**मुख्य बातें:**\n• मानसून शुरू होते ही बुवाई\n• पानी की उपलब्धता अधिक\n• कीट/रोग का दबाव ज्यादा\n\n**टिप्स:**\n• मानसून से पहले खेत तैयार करें\n• अच्छी जल निकासी जरूरी"
                },
                rabi: {
                    en: "❄️ **Rabi Season - Complete Guide**\n\n**Period:** October to March (Winter season)\n\n**Major Crops:**\n• Wheat, Barley, Oats\n• Mustard, Linseed, Sunflower\n• Gram, Pea, Lentil\n• Potato, Onion, Garlic\n\n**Key Points:**\n• Sowing: October-November\n• Cool, dry weather preferred\n• Irrigation dependent\n• Lower pest pressure\n• Harvesting: March-April\n\n**Tips:**\n• Timely sowing critical for wheat\n• Ensure adequate seed rate\n• Schedule irrigations properly",
                    hi: "❄️ **रबी मौसम - संपूर्ण जानकारी**\n\n**अवधि:** अक्टूबर से मार्च (सर्दी)\n\n**प्रमुख फसलें:**\n• गेहूं, जौ, जई\n• सरसों, अलसी, सूरजमुखी\n• चना, मटर, मसूर\n• आलू, प्याज, लहसुन\n\n**मुख्य बातें:**\n• बुवाई: अक्टूबर-नवंबर\n• ठंडा, सूखा मौसम पसंद\n• सिंचाई पर निर्भर\n• कम कीट दबाव\n\n**टिप्स:**\n• गेहूं की समय पर बुवाई जरूरी\n• सिंचाई का सही समय रखें"
                },
                zaid: {
                    en: "☀️ **Zaid Season - Complete Guide**\n\n**Period:** March to June (Summer season)\n\n**Major Crops:**\n• Watermelon, Muskmelon\n• Cucumber, Bottle gourd, Pumpkin\n• Moong, Groundnut (summer)\n• Fodder crops\n\n**Key Points:**\n• Short duration crops\n• High irrigation requirement\n• Early morning/evening work\n• Quick returns\n\n**Tips:**\n• Mulching to conserve moisture\n• Drip irrigation beneficial\n• Protect from heat stress\n• Choose heat-tolerant varieties",
                    hi: "☀️ **जायद मौसम - संपूर्ण जानकारी**\n\n**अवधि:** मार्च से जून (गर्मी)\n\n**प्रमुख फसलें:**\n• तरबूज, खरबूजा\n• खीरा, लौकी, कद्दू\n• मूंग, मूंगफली (ग्रीष्म)\n• चारा फसलें\n\n**मुख्य बातें:**\n• कम अवधि की फसलें\n• अधिक सिंचाई जरूरी\n• जल्दी लाभ\n\n**टिप्स:**\n• नमी संरक्षण के लिए मल्चिंग\n• ड्रिप सिंचाई लाभदायक\n• गर्मी-सहनशील किस्में चुनें"
                }
            },
            
            // Soil Types - Extended
            soils: {
                alluvial: {
                    en: "🏞️ **Alluvial Soil - Complete Guide**\n\n**Location:** Indo-Gangetic plains, river deltas\n**Color:** Light grey to ash grey\n**Coverage:** ~40% of India's land\n\n**Characteristics:**\n• Rich in potash\n• Deficient in nitrogen, phosphorus\n• Good water retention\n• Easy to cultivate\n\n**Suitable Crops:**\n• Rice, Wheat, Sugarcane, Maize\n• Pulses, Oilseeds, Vegetables\n\n**Management:**\n• Add nitrogen fertilizers\n• Green manuring beneficial\n• Prevent waterlogging in low areas",
                    hi: "🏞️ **जलोढ़ मिट्टी - संपूर्ण जानकारी**\n\n**स्थान:** सिंधु-गंगा मैदान, नदी डेल्टा\n**रंग:** हल्का धूसर से राख धूसर\n**क्षेत्र:** भारत का ~40%\n\n**विशेषताएं:**\n• पोटाश से भरपूर\n• नाइट्रोजन, फास्फोरस की कमी\n• अच्छी जल धारण क्षमता\n\n**उपयुक्त फसलें:**\n• धान, गेहूं, गन्ना, मक्का\n• दालें, तिलहन, सब्जियां\n\n**प्रबंधन:**\n• नाइट्रोजन उर्वरक डालें\n• हरी खाद लाभदायक"
                },
                black: {
                    en: "⬛ **Black/Regur Soil - Complete Guide**\n\n**Location:** Deccan plateau, Maharashtra, Gujarat, MP\n**Color:** Black to dark grey\n**Also called:** Cotton soil, Regur\n\n**Characteristics:**\n• Very high water retention\n• Swells when wet, cracks when dry\n• Rich in iron, lime, calcium, magnesium\n• Low in nitrogen, phosphorus\n• Sticky when wet, hard when dry\n\n**Suitable Crops:**\n• Cotton, Sugarcane, Wheat, Jowar\n• Groundnut, Citrus fruits\n\n**Management:**\n• Add gypsum to reduce stickiness\n• Good drainage essential\n• Add organic matter regularly",
                    hi: "⬛ **काली मिट्टी - संपूर्ण जानकारी**\n\n**स्थान:** दक्कन पठार, महाराष्ट्र, गुजरात, MP\n**रंग:** काला से गहरा धूसर\n**अन्य नाम:** कपास मिट्टी, रेगुर\n\n**विशेषताएं:**\n• बहुत अधिक जल धारण\n• गीली होने पर फूलती, सूखने पर दरारें\n• लोहा, चूना, कैल्शियम, मैग्नीशियम से भरपूर\n\n**उपयुक्त फसलें:**\n• कपास, गन्ना, गेहूं, ज्वार\n• मूंगफली, खट्टे फल\n\n**प्रबंधन:**\n• जिप्सम से चिपचिपाहट कम करें\n• जल निकासी जरूरी"
                },
                red: {
                    en: "🔴 **Red Soil - Complete Guide**\n\n**Location:** Tamil Nadu, Karnataka, Odisha, parts of AP\n**Color:** Red to yellow\n**Formed from:** Weathering of crystalline rocks\n\n**Characteristics:**\n• Rich in iron, potash\n• Deficient in nitrogen, phosphorus, humus\n• Porous and friable\n• Low water retention\n• Generally acidic (pH 5.5-6.5)\n\n**Suitable Crops:**\n• Rice, Wheat, Pulses\n• Millets, Groundnut, Potato\n• Cotton (with irrigation)\n\n**Management:**\n• Add lime to reduce acidity\n• Heavy organic manure needed\n• Frequent irrigation required",
                    hi: "🔴 **लाल मिट्टी - संपूर्ण जानकारी**\n\n**स्थान:** तमिलनाडु, कर्नाटक, ओडिशा, AP के भाग\n**रंग:** लाल से पीला\n\n**विशेषताएं:**\n• लोहा, पोटाश से भरपूर\n• नाइट्रोजन, फास्फोरस, ह्यूमस की कमी\n• छिद्रपूर्ण और भुरभुरी\n• कम जल धारण\n\n**उपयुक्त फसलें:**\n• धान, गेहूं, दालें\n• बाजरा, मूंगफली, आलू\n\n**प्रबंधन:**\n• अम्लता कम करने के लिए चूना\n• भारी जैविक खाद जरूरी"
                },
                laterite: {
                    en: "🟤 **Laterite Soil - Complete Guide**\n\n**Location:** Western Ghats, Eastern Ghats, hilly areas\n**Color:** Red to reddish brown\n**Formed in:** High rainfall, high temp areas\n\n**Characteristics:**\n• Rich in iron and aluminum\n• Very poor in nitrogen, phosphorus, potassium\n• Low humus content\n• Highly leached, acidic\n• Hard when dry, soft when wet\n\n**Suitable Crops:**\n• Tea, Coffee, Rubber, Coconut\n• Cashew, Rice (with heavy manuring)\n• Plantation crops\n\n**Management:**\n• Heavy manuring essential\n• Add lime to correct pH\n• Mulching recommended",
                    hi: "🟤 **लैटेराइट मिट्टी - संपूर्ण जानकारी**\n\n**स्थान:** पश्चिमी घाट, पूर्वी घाट, पहाड़ी क्षेत्र\n**रंग:** लाल से लाल-भूरा\n\n**विशेषताएं:**\n• लोहा और एल्युमिनियम से भरपूर\n• नाइट्रोजन, फास्फोरस, पोटाश में बहुत कमी\n• कम ह्यूमस\n• अत्यधिक अम्लीय\n\n**उपयुक्त फसलें:**\n• चाय, कॉफी, रबर, नारियल\n• काजू, धान (भारी खाद के साथ)\n\n**प्रबंधन:**\n• भारी खाद जरूरी\n• pH सुधार के लिए चूना"
                },
                sandy: {
                    en: "🏜️ **Sandy/Desert Soil - Complete Guide**\n\n**Location:** Rajasthan, Gujarat, parts of Punjab, Haryana\n**Color:** Light brown to grey\n\n**Characteristics:**\n• Very low water retention\n• Poor in organic matter\n• Good aeration\n• Low nutrients\n• High salt content in places\n\n**Suitable Crops:**\n• Millets (Bajra, Jowar)\n• Pulses (Moth, Moong)\n• Groundnut, Guar\n• Date palm (with irrigation)\n\n**Management:**\n• Add organic matter regularly\n• Frequent irrigation\n• Drip irrigation best\n• Windbreaks beneficial",
                    hi: "🏜️ **बलुई/मरुस्थलीय मिट्टी - संपूर्ण जानकारी**\n\n**स्थान:** राजस्थान, गुजरात, पंजाब-हरियाणा के भाग\n**रंग:** हल्का भूरा से धूसर\n\n**विशेषताएं:**\n• बहुत कम जल धारण\n• जैविक पदार्थ में कमी\n• अच्छा वायु संचार\n\n**उपयुक्त फसलें:**\n• बाजरा, ज्वार\n• दालें (मोठ, मूंग)\n• मूंगफली, ग्वार\n\n**प्रबंधन:**\n• नियमित जैविक खाद\n• बार-बार सिंचाई\n• ड्रिप सिंचाई सर्वोत्तम"
                },
                clay: {
                    en: "🧱 **Clay Soil - Complete Guide**\n\n**Characteristics:**\n• Very fine particles (<0.002mm)\n• High water retention\n• Poor drainage\n• Becomes sticky when wet\n• Cracks when dry\n• Nutrient rich but hard to work\n\n**Suitable Crops:**\n• Rice (paddy)\n• Wheat (with drainage)\n• Vegetables with raised beds\n\n**Management:**\n• Add organic matter to improve structure\n• Gypsum application helpful\n• Create raised beds for drainage\n• Avoid working when too wet/dry",
                    hi: "🧱 **मटियार मिट्टी - संपूर्ण जानकारी**\n\n**विशेषताएं:**\n• बहुत महीन कण (<0.002mm)\n• अधिक जल धारण\n• खराब जल निकासी\n• गीली होने पर चिपचिपी\n• सूखने पर दरारें\n\n**उपयुक्त फसलें:**\n• धान\n• गेहूं (जल निकासी के साथ)\n• ऊंची क्यारियों में सब्जियां\n\n**प्रबंधन:**\n• संरचना सुधारने के लिए जैविक खाद\n• जिप्सम लाभदायक\n• जल निकासी के लिए ऊंची क्यारियां"
                },
                loamy: {
                    en: "✨ **Loamy Soil - Complete Guide (Ideal Soil)**\n\n**Composition:** Mix of sand, silt, clay + organic matter\n**Color:** Dark brown\n\n**Characteristics:**\n• Ideal water retention and drainage\n• Rich in nutrients\n• Easy to cultivate\n• Good aeration\n• pH usually 6.0-7.0\n\n**Suitable Crops:**\n• Almost all crops grow well\n• Vegetables, Fruits, Cereals\n• Pulses, Oilseeds\n\n**Management:**\n• Maintain organic matter\n• Crop rotation beneficial\n• Balanced fertilizer application\n• This is the best soil type!",
                    hi: "✨ **दोमट मिट्टी - संपूर्ण जानकारी (आदर्श मिट्टी)**\n\n**संरचना:** रेत, गाद, मिट्टी + जैविक पदार्थ का मिश्रण\n**रंग:** गहरा भूरा\n\n**विशेषताएं:**\n• आदर्श जल धारण और निकासी\n• पोषक तत्वों से भरपूर\n• खेती में आसान\n• अच्छा वायु संचार\n\n**उपयुक्त फसलें:**\n• लगभग सभी फसलें अच्छी\n• सब्जियां, फल, अनाज\n• दालें, तिलहन\n\n**प्रबंधन:**\n• जैविक पदार्थ बनाए रखें\n• फसल चक्र लाभदायक\n• यह सबसे अच्छी मिट्टी है!"
                }
            },
            
            // Fertilizers - Extended
            fertilizers: {
                nitrogen: {
                    en: "💚 **Nitrogen (N) - Complete Guide**\n\n**Function:** Leaf and stem growth, green color\n\n**Sources:**\n• Urea (46% N) - most common\n• Ammonium Sulphate (21% N)\n• CAN (25% N)\n• DAP (18% N)\n\n**Deficiency Signs:**\n• Yellowing of older leaves first\n• Stunted growth\n• Pale green color\n\n**Application:**\n• Split doses: 1/3 basal, 2/3 top dress\n• Apply before irrigation\n• Don't apply during rain\n\n**Excess Signs:** Excess leafy growth, delayed maturity, lodging",
                    hi: "💚 **नाइट्रोजन (N) - संपूर्ण जानकारी**\n\n**कार्य:** पत्ती और तना वृद्धि, हरा रंग\n\n**स्रोत:**\n• यूरिया (46% N) - सबसे आम\n• अमोनियम सल्फेट (21% N)\n• CAN (25% N)\n• DAP (18% N)\n\n**कमी के लक्षण:**\n• पुरानी पत्तियां पीली पड़ना\n• बौना विकास\n• हल्का हरा रंग\n\n**उपयोग:**\n• विभाजित खुराक: 1/3 बुवाई, 2/3 टॉप ड्रेस\n• सिंचाई से पहले डालें"
                },
                phosphorus: {
                    en: "🟣 **Phosphorus (P) - Complete Guide**\n\n**Function:** Root development, flowering, seed formation\n\n**Sources:**\n• DAP (46% P2O5, 18% N) - most popular\n• SSP (16% P2O5) - also has sulphur\n• TSP (46% P2O5)\n• Rock phosphate (organic)\n\n**Deficiency Signs:**\n• Purple/reddish leaves\n• Poor root growth\n• Delayed flowering\n• Small fruits/seeds\n\n**Application:**\n• Apply as basal dose (at sowing)\n• Mix in root zone\n• Works best in neutral pH\n\n**Excess:** Interferes with zinc/iron uptake",
                    hi: "🟣 **फास्फोरस (P) - संपूर्ण जानकारी**\n\n**कार्य:** जड़ विकास, फूल आना, बीज बनना\n\n**स्रोत:**\n• DAP (46% P2O5, 18% N) - सबसे लोकप्रिय\n• SSP (16% P2O5) - सल्फर भी\n• TSP (46% P2O5)\n• रॉक फास्फेट (जैविक)\n\n**कमी के लक्षण:**\n• बैंगनी/लाल पत्तियां\n• खराब जड़ वृद्धि\n• देर से फूल आना\n\n**उपयोग:**\n• बुवाई के समय आधार खुराक\n• जड़ क्षेत्र में मिलाएं"
                },
                potassium: {
                    en: "🧡 **Potassium (K) - Complete Guide**\n\n**Function:** Disease resistance, water regulation, fruit quality\n\n**Sources:**\n• MOP - Muriate of Potash (60% K2O)\n• SOP - Sulphate of Potash (50% K2O)\n• Potassium Nitrate (44% K2O)\n\n**Deficiency Signs:**\n• Brown scorching on leaf edges\n• Weak stems\n• Poor fruit quality\n• Drought susceptibility\n\n**Application:**\n• Can be basal or split\n• Important for fruit crops\n• Essential in sandy soils\n\n**Note:** Use SOP for chloride-sensitive crops (tobacco, potato)",
                    hi: "🧡 **पोटेशियम (K) - संपूर्ण जानकारी**\n\n**कार्य:** रोग प्रतिरोध, जल नियमन, फल गुणवत्ता\n\n**स्रोत:**\n• MOP - म्यूरेट ऑफ पोटाश (60% K2O)\n• SOP - सल्फेट ऑफ पोटाश (50% K2O)\n• पोटेशियम नाइट्रेट (44% K2O)\n\n**कमी के लक्षण:**\n• पत्ती किनारों पर भूरा जलना\n• कमजोर तने\n• खराब फल गुणवत्ता\n\n**उपयोग:**\n• आधार या विभाजित खुराक\n• फल फसलों के लिए महत्वपूर्ण"
                },
                urea: {
                    en: "⚪ **Urea - Detailed Guide**\n\n**Nutrient Content:** 46% Nitrogen\n**Form:** White granules/prills\n**Most commonly used N fertilizer**\n\n**Application Method:**\n• Broadcast before irrigation\n• Don't apply on wet leaves (burn)\n• Split into 2-3 doses\n• Incorporate in soil if possible\n\n**Dosage (General):**\n• Rice: 100-120 kg urea/ha\n• Wheat: 120-140 kg urea/ha\n• Maize: 100-130 kg urea/ha\n\n**Tips:**\n• Apply in standing water for paddy\n• Morning/evening application best\n• Store in dry place",
                    hi: "⚪ **यूरिया - विस्तृत जानकारी**\n\n**पोषक तत्व:** 46% नाइट्रोजन\n**रूप:** सफेद दाने\n**सबसे आम N उर्वरक**\n\n**उपयोग विधि:**\n• सिंचाई से पहले छिड़काव\n• गीली पत्तियों पर न डालें (जलन)\n• 2-3 खुराक में बांटें\n\n**खुराक (सामान्य):**\n• धान: 100-120 kg यूरिया/ha\n• गेहूं: 120-140 kg यूरिया/ha\n• मक्का: 100-130 kg यूरिया/ha\n\n**टिप्स:**\n• धान में खड़े पानी में डालें\n• सुबह/शाम डालना सर्वोत्तम"
                },
                dap: {
                    en: "🔵 **DAP (Diammonium Phosphate) - Guide**\n\n**Nutrient Content:** 18% N + 46% P2O5\n**Form:** Black/grey granules\n**Most popular P fertilizer**\n\n**Benefits:**\n• Provides both N and P\n• Quick availability\n• Good for all crops\n\n**Application:**\n• Use as basal dose at sowing\n• Mix in soil near seed zone\n• 100-150 kg/ha for most crops\n\n**Storage:** Keep dry, absorbs moisture\n\n**Alternative:** SSP (Single Super Phosphate) - cheaper, also has sulphur",
                    hi: "🔵 **DAP - मार्गदर्शिका**\n\n**पोषक तत्व:** 18% N + 46% P2O5\n**रूप:** काले/धूसर दाने\n**सबसे लोकप्रिय P उर्वरक**\n\n**लाभ:**\n• N और P दोनों देता है\n• जल्दी उपलब्धता\n• सभी फसलों के लिए अच्छा\n\n**उपयोग:**\n• बुवाई पर आधार खुराक\n• बीज क्षेत्र में मिलाएं\n• 100-150 kg/ha\n\n**विकल्प:** SSP - सस्ता, सल्फर भी है"
                },
                organic: {
                    en: "🌿 **Organic Fertilizers - Complete Guide**\n\n**Types:**\n\n**1. FYM (Farmyard Manure)**\n• 10-15 tonnes/ha\n• Apply 2-3 weeks before sowing\n• Improves soil structure\n\n**2. Compost**\n• Decomposed plant material\n• 5-10 tonnes/ha\n• Rich in humus\n\n**3. Vermicompost**\n• Earthworm processed\n• 2-3 tonnes/ha\n• High nutrient content\n\n**4. Green Manure**\n• Dhaincha, Sunhemp, Sesbania\n• Plough under before flowering\n• Adds 60-80 kg N/ha\n\n**Benefits:**\n• Improves soil health long-term\n• No chemical residues\n• Sustainable farming",
                    hi: "🌿 **जैविक उर्वरक - संपूर्ण जानकारी**\n\n**प्रकार:**\n\n**1. गोबर की खाद (FYM)**\n• 10-15 टन/ha\n• बुवाई से 2-3 सप्ताह पहले\n• मिट्टी संरचना सुधारे\n\n**2. कम्पोस्ट**\n• सड़ी हुई पौध सामग्री\n• 5-10 टन/ha\n• ह्यूमस से भरपूर\n\n**3. वर्मीकम्पोस्ट**\n• केंचुआ द्वारा निर्मित\n• 2-3 टन/ha\n• उच्च पोषक तत्व\n\n**4. हरी खाद**\n• ढैंचा, सनई, सेसबानिया\n• फूल आने से पहले जुताई\n• 60-80 kg N/ha जोड़े\n\n**लाभ:**\n• दीर्घकालिक मिट्टी स्वास्थ्य\n• रासायनिक अवशेष नहीं"
                },
                micronutrients: {
                    en: "🔬 **Micronutrients - Guide**\n\n**Essential Micronutrients:**\n\n**Zinc (Zn):**\n• Deficiency: White/yellow bands, stunted growth\n• Use: Zinc Sulphate 25 kg/ha\n\n**Iron (Fe):**\n• Deficiency: Interveinal yellowing\n• Use: Ferrous sulphate spray 0.5%\n\n**Boron (B):**\n• Critical for flowering, fruit set\n• Use: Borax 10 kg/ha\n\n**Manganese (Mn):**\n• Deficiency: Grey specks in cereals\n• Use: Manganese sulphate spray\n\n**General Tip:**\n• Get soil tested every 2-3 years\n• Apply based on test results\n• Foliar spray for quick correction",
                    hi: "🔬 **सूक्ष्म पोषक तत्व - जानकारी**\n\n**आवश्यक सूक्ष्म पोषक:**\n\n**जिंक (Zn):**\n• कमी: सफेद/पीली धारियां, बौना विकास\n• उपयोग: जिंक सल्फेट 25 kg/ha\n\n**लोहा (Fe):**\n• कमी: शिराओं के बीच पीलापन\n• उपयोग: फेरस सल्फेट स्प्रे 0.5%\n\n**बोरॉन (B):**\n• फूल आने, फल लगने के लिए महत्वपूर्ण\n• उपयोग: बोरेक्स 10 kg/ha\n\n**सामान्य टिप:**\n• हर 2-3 साल मिट्टी परीक्षण\n• परिणाम के आधार पर डालें"
                }
            },
            
            // Pest & Disease Management - Extended
            pests: {
                general: {
                    en: "🐛 **Integrated Pest Management (IPM) - Guide**\n\n**Prevention (First Line):**\n• Use disease-resistant varieties\n• Crop rotation\n• Clean cultivation\n• Timely sowing\n• Healthy seed selection\n\n**Monitoring:**\n• Regular field visits\n• Pheromone traps\n• Look for early signs\n• Check undersides of leaves\n\n**Biological Control:**\n• Trichogramma for borers\n• Ladybird beetles for aphids\n• Neem-based sprays\n• Trichoderma for soil fungi\n\n**Chemical Control (Last Resort):**\n• Use only when needed\n• Follow recommended dose\n• Observe waiting period\n• Rotate chemicals",
                    hi: "🐛 **एकीकृत कीट प्रबंधन (IPM) - जानकारी**\n\n**रोकथाम (पहली पंक्ति):**\n• रोग-प्रतिरोधी किस्में\n• फसल चक्र\n• स्वच्छ खेती\n• समय पर बुवाई\n\n**निगरानी:**\n• नियमित खेत निरीक्षण\n• फेरोमोन जाल\n• शुरुआती लक्षण देखें\n\n**जैविक नियंत्रण:**\n• बोरर के लिए ट्राइकोग्रामा\n• एफिड्स के लिए लेडीबर्ड\n• नीम आधारित स्प्रे\n\n**रासायनिक नियंत्रण (अंतिम):**\n• जरूरत पर ही उपयोग\n• अनुशंसित खुराक पालें"
                },
                rice_pests: {
                    en: "🌾 **Rice Pests & Diseases**\n\n**Major Pests:**\n• **Stem Borer:** Dead hearts, white ears. Use pheromone traps, Trichogramma\n• **Brown Plant Hopper:** Hopper burn, circular patches. Drain water, neem spray\n• **Leaf Folder:** Folded leaves. Light traps, remove affected leaves\n\n**Major Diseases:**\n• **Blast:** Spindle lesions on leaves. Resistant varieties, fungicide spray\n• **Sheath Blight:** Lesions on sheath. Avoid excess N, fungicide\n• **Bacterial Leaf Blight:** Yellow stripes. Resistant varieties\n\n**Prevention:**\n• Balanced fertilizer use\n• Proper water management\n• Remove stubble after harvest",
                    hi: "🌾 **धान के कीट और रोग**\n\n**प्रमुख कीट:**\n• **तना छेदक:** डेड हार्ट, सफेद बालियां। फेरोमोन जाल, ट्राइकोग्रामा\n• **भूरा फुदका:** हॉपर बर्न। पानी निकालें, नीम स्प्रे\n• **पत्ती लपेटक:** मुड़ी पत्तियां। प्रकाश जाल\n\n**प्रमुख रोग:**\n• **झुलसा:** पत्तियों पर धुरी जैसे धब्बे। प्रतिरोधी किस्में\n• **शीथ ब्लाइट:** आवरण पर धब्बे। कम N, फफूंदनाशक\n• **जीवाणु पत्ती झुलसा:** पीली धारियां। प्रतिरोधी किस्में"
                },
                wheat_pests: {
                    en: "🌾 **Wheat Pests & Diseases**\n\n**Major Pests:**\n• **Aphids:** Suck sap, transmit viruses. Spray dimethoate/imidacloprid\n• **Termites:** Attack roots/stems. Apply chlorpyriphos\n• **Pink Stem Borer:** Deadheart in seedlings. Seed treatment\n\n**Major Diseases:**\n• **Yellow Rust:** Yellow stripes on leaves. Resistant varieties, propiconazole spray\n• **Brown/Black Rust:** Pustules on leaves/stem. Timely sowing, fungicide\n• **Karnal Bunt:** Black powder in grains. Clean seed, late sowing avoid\n• **Loose Smut:** Black spores replace grains. Seed treatment essential\n\n**Prevention:**\n• Timely sowing (avoid late)\n• Resistant varieties\n• Balanced nutrition",
                    hi: "🌾 **गेहूं के कीट और रोग**\n\n**प्रमुख कीट:**\n• **माहू:** रस चूसते हैं। डाइमेथोएट/इमिडाक्लोप्रिड स्प्रे\n• **दीमक:** जड़/तने पर हमला। क्लोरपायरीफॉस\n\n**प्रमुख रोग:**\n• **पीला रतुआ:** पत्तियों पर पीली धारियां। प्रोपिकोनाजोल स्प्रे\n• **भूरा/काला रतुआ:** पत्ती/तने पर फफोले। फफूंदनाशक\n• **करनाल बंट:** दानों में काला पाउडर। स्वच्छ बीज\n\n**रोकथाम:**\n• समय पर बुवाई\n• प्रतिरोधी किस्में"
                },
                cotton_pests: {
                    en: "🌿 **Cotton Pests & Diseases**\n\n**Major Pests:**\n• **American Bollworm:** Bores into bolls. Pheromone traps, Bt cotton, HaNPV\n• **Pink Bollworm:** Attacks bolls. Pheromone traps, destroy stubble\n• **Aphids/Jassids:** Suck sap, curl leaves. Neem spray, imidacloprid\n• **Whitefly:** Transmits leaf curl virus. Yellow sticky traps, spray\n\n**Major Diseases:**\n• **Bacterial Blight:** Angular spots on leaves. Copper fungicide\n• **Leaf Curl Virus:** Curled, thickened leaves. Control whitefly vector\n• **Root Rot:** Wilting, root decay. Good drainage, seed treatment\n\n**Bt Cotton:**\n• Resistant to bollworms\n• Reduces pesticide use\n• Refuge required (non-Bt patches)",
                    hi: "🌿 **कपास के कीट और रोग**\n\n**प्रमुख कीट:**\n• **अमेरिकन बॉलवर्म:** बॉल में छेद। फेरोमोन जाल, Bt कपास\n• **पिंक बॉलवर्म:** बॉल पर हमला। फेरोमोन जाल, ठूंठ नष्ट करें\n• **माहू/हरा तेला:** रस चूसते हैं। नीम स्प्रे\n• **सफेद मक्खी:** पत्ती मोड़ वायरस फैलाती है। पीले चिपचिपे जाल"
                }
            },
            
            // Irrigation - Extended
            irrigation: {
                general: {
                    en: "💧 **Irrigation Methods - Complete Guide**\n\n**1. Flood/Surface Irrigation:**\n• Traditional method\n• High water use (50-60% efficiency)\n• Suitable for rice, wheat\n• Easy but wasteful\n\n**2. Drip Irrigation:**\n• Most efficient (90-95%)\n• Water directly to roots\n• Best for: vegetables, fruits, cotton\n• Saves 40-60% water\n• Initial cost high, long-term savings\n\n**3. Sprinkler Irrigation:**\n• 70-80% efficiency\n• Good for uneven terrain\n• Suits: wheat, pulses, vegetables\n• Uniform coverage\n\n**4. Subsurface Irrigation:**\n• Underground pipes\n• Minimal evaporation\n• Expensive installation\n\n**Tips:**\n• Irrigate in morning/evening\n• Mulching conserves moisture\n• Monitor soil moisture levels",
                    hi: "💧 **सिंचाई विधियां - संपूर्ण जानकारी**\n\n**1. बाढ़/सतही सिंचाई:**\n• पारंपरिक विधि\n• अधिक पानी उपयोग (50-60% दक्षता)\n• धान, गेहूं के लिए उपयुक्त\n\n**2. ड्रिप सिंचाई:**\n• सबसे कुशल (90-95%)\n• पानी सीधे जड़ों तक\n• 40-60% पानी बचत\n• शुरुआती लागत अधिक\n\n**3. स्प्रिंकलर सिंचाई:**\n• 70-80% दक्षता\n• असमान भूमि के लिए\n• गेहूं, दालें, सब्जियां\n\n**टिप्स:**\n• सुबह/शाम सिंचाई करें\n• मल्चिंग से नमी संरक्षण"
                },
                drip: {
                    en: "💦 **Drip Irrigation - Detailed Guide**\n\n**Components:**\n• Water source (well/tank)\n• Pump and filter\n• Main line, sub-main\n• Lateral lines\n• Emitters/drippers\n\n**Benefits:**\n• 90-95% water efficiency\n• 30-50% higher yields\n• Reduced weed growth\n• Fertigation possible\n• Less labor required\n\n**Suitable Crops:**\n• Vegetables, Fruits\n• Cotton, Sugarcane\n• Flowers, Plantation crops\n\n**Cost per Hectare:** ₹80,000-1,50,000\n**Subsidy Available:** 50-90% under PM-KUSUM, PMKSY\n\n**Maintenance:**\n• Clean filters regularly\n• Flush lines monthly\n• Check emitters for clogging",
                    hi: "💦 **ड्रिप सिंचाई - विस्तृत जानकारी**\n\n**घटक:**\n• जल स्रोत (कुआं/टैंक)\n• पंप और फिल्टर\n• मुख्य लाइन, उप-मुख्य\n• पार्श्व लाइनें\n• ड्रिपर\n\n**लाभ:**\n• 90-95% जल दक्षता\n• 30-50% अधिक उपज\n• कम खरपतवार\n• फर्टिगेशन संभव\n\n**उपयुक्त फसलें:**\n• सब्जियां, फल\n• कपास, गन्ना\n• फूल, बागान फसलें\n\n**लागत:** ₹80,000-1,50,000/ha\n**सब्सिडी:** 50-90% PM-KUSUM, PMKSY में"
                },
                critical_stages: {
                    en: "⚠️ **Critical Irrigation Stages**\n\n**Rice:**\n• Transplanting\n• Tillering (25-45 days)\n• Panicle initiation\n• Flowering/Heading\n• Grain filling\n\n**Wheat:**\n• Crown root initiation (20-25 days)\n• Tillering (40-45 days)\n• Jointing (60-65 days)\n• Flowering (80-85 days)\n• Milk/Dough stage (100-105 days)\n\n**Maize:**\n• Knee-high stage\n• Tasseling/Silking\n• Grain filling\n\n**Cotton:**\n• Early flowering\n• Boll development\n\n**Note:** Missing irrigation at critical stages can reduce yield by 20-50%",
                    hi: "⚠️ **महत्वपूर्ण सिंचाई अवस्थाएं**\n\n**धान:**\n• रोपाई\n• कि्ला निकलना (25-45 दिन)\n• बाली निकलना\n• फूल आना\n• दाना भरना\n\n**गेहूं:**\n• ताज जड़ (20-25 दिन)\n• किल्ला निकलना (40-45 दिन)\n• गांठ बनना (60-65 दिन)\n• फूल आना (80-85 दिन)\n• दूध/आटा अवस्था (100-105 दिन)\n\n**नोट:** महत्वपूर्ण अवस्था में सिंचाई न करने से 20-50% उपज कम"
                }
            },
            
            // Government Schemes
            schemes: {
                general: {
                    en: "🏛️ **Government Schemes for Farmers**\n\n**PM-KISAN:** ₹6,000/year direct transfer (3 installments)\n\n**PM Fasal Bima Yojana:** Crop insurance at low premium\n\n**Kisan Credit Card:** Easy farm credit at 4% interest\n\n**PM-KUSUM:** Solar pumps & solar power\n\n**eNAM:** Online agricultural marketing\n\n**Soil Health Card:** Free soil testing & recommendations\n\n**PMKSY:** Micro irrigation subsidy (up to 90%)\n\n**RKVY:** State-level agricultural development\n\n**How to Apply:**\n• Visit nearest CSC/agriculture office\n• Use government portals online\n• Contact Krishi Vigyan Kendra (KVK)",
                    hi: "🏛️ **किसानों के लिए सरकारी योजनाएं**\n\n**PM-KISAN:** ₹6,000/वर्ष सीधे खाते में (3 किस्त)\n\n**PM फसल बीमा योजना:** कम प्रीमियम पर फसल बीमा\n\n**किसान क्रेडिट कार्ड:** 4% ब्याज पर आसान कर्ज\n\n**PM-KUSUM:** सोलर पंप और बिजली\n\n**eNAM:** ऑनलाइन कृषि मार्केटिंग\n\n**मृदा स्वास्थ्य कार्ड:** मुफ्त मिट्टी परीक्षण\n\n**PMKSY:** सूक्ष्म सिंचाई सब्सिडी (90% तक)\n\n**आवेदन कैसे करें:**\n• नजदीकी CSC/कृषि कार्यालय जाएं\n• सरकारी पोर्टल ऑनलाइन\n• कृषि विज्ञान केंद्र (KVK) संपर्क"
                }
            },
            
            // Organic Farming
            organic: {
                general: {
                    en: "🌿 **Organic Farming - Complete Guide**\n\n**Principles:**\n• No synthetic chemicals\n• Natural pest management\n• Soil health focus\n• Biodiversity conservation\n\n**Inputs Allowed:**\n• FYM, Compost, Vermicompost\n• Green manure\n• Neem-based pesticides\n• Trichoderma, Pseudomonas\n• Panchagavya, Jeevamrut\n\n**Certification:**\n• NPOP (National Programme for Organic Production)\n• PGS-India (Participatory Guarantee System)\n• 3-year conversion period\n\n**Premium:** 20-50% higher prices for certified organic\n\n**Challenges:**\n• Lower initial yields\n• Pest management difficult\n• Certification cost/time",
                    hi: "🌿 **जैविक खेती - संपूर्ण जानकारी**\n\n**सिद्धांत:**\n• कोई रासायनिक नहीं\n• प्राकृतिक कीट प्रबंधन\n• मिट्टी स्वास्थ्य पर ध्यान\n\n**अनुमत सामग्री:**\n• गोबर खाद, कम्पोस्ट, वर्मीकम्पोस्ट\n• हरी खाद\n• नीम आधारित कीटनाशक\n• ट्राइकोडर्मा, स्यूडोमोनास\n• पंचगव्य, जीवामृत\n\n**प्रमाणन:**\n• NPOP (राष्ट्रीय जैविक उत्पादन कार्यक्रम)\n• PGS-India\n• 3 वर्ष रूपांतरण अवधि\n\n**प्रीमियम:** प्रमाणित जैविक के लिए 20-50% अधिक मूल्य"
                },
                jeevamrut: {
                    en: "🧪 **Jeevamrut - Preparation Guide**\n\n**Ingredients (for 200L):**\n• Water: 200 liters\n• Cow dung (fresh): 10 kg\n• Cow urine: 10 liters\n• Jaggery: 2 kg\n• Pulse flour (besan): 2 kg\n• Handful of soil from farm\n\n**Preparation:**\n1. Mix all ingredients in plastic drum\n2. Stir twice daily for 5-7 days\n3. Keep in shade, cover with cloth\n4. Ready when color turns yellowish\n\n**Application:**\n• 200L per acre through irrigation\n• Spray 3% solution on crops\n• Apply every 15 days\n\n**Benefits:**\n• Increases beneficial microbes\n• Improves soil fertility\n• Enhances root growth",
                    hi: "🧪 **जीवामृत - बनाने की विधि**\n\n**सामग्री (200L के लिए):**\n• पानी: 200 लीटर\n• गाय का गोबर (ताजा): 10 kg\n• गोमूत्र: 10 लीटर\n• गुड़: 2 kg\n• बेसन: 2 kg\n• खेत की एक मुट्ठी मिट्टी\n\n**बनाने की विधि:**\n1. सब सामग्री प्लास्टिक ड्रम में मिलाएं\n2. 5-7 दिन रोज दो बार हिलाएं\n3. छाया में रखें, कपड़े से ढकें\n4. पीला रंग आने पर तैयार\n\n**उपयोग:**\n• 200L प्रति एकड़ सिंचाई में\n• 3% घोल का छिड़काव\n• हर 15 दिन में उपयोग"
                }
            },
            
            // Market & Pricing
            market: {
                msp: {
                    en: "💰 **MSP (Minimum Support Price) 2025-26**\n\n**Kharif Crops:**\n• Rice (Common): ₹2,300/quintal\n• Rice (Grade A): ₹2,320/quintal\n• Maize: ₹2,090/quintal\n• Cotton (Medium): ₹7,020/quintal\n• Cotton (Long): ₹7,521/quintal\n• Groundnut: ₹6,377/quintal\n• Soybean: ₹4,892/quintal\n\n**Rabi Crops:**\n• Wheat: ₹2,275/quintal\n• Barley: ₹1,850/quintal\n• Gram: ₹5,440/quintal\n• Mustard: ₹5,650/quintal\n• Lentil: ₹6,425/quintal\n\n**Note:** Sell at government procurement centers for MSP",
                    hi: "💰 **MSP (न्यूनतम समर्थन मूल्य) 2025-26**\n\n**खरीफ फसलें:**\n• धान (सामान्य): ₹2,300/क्विंटल\n• धान (ग्रेड A): ₹2,320/क्विंटल\n• मक्का: ₹2,090/क्विंटल\n• कपास (मध्यम): ₹7,020/क्विंटल\n• मूंगफली: ₹6,377/क्विंटल\n• सोयाबीन: ₹4,892/क्विंटल\n\n**रबी फसलें:**\n• गेहूं: ₹2,275/क्विंटल\n• जौश: ₹1,850/क्विंटल\n• चना: ₹5,440/क्विंटल\n• सरसों: ₹5,650/क्विंटल\n\n**नोट:** MSP के लिए सरकारी खरीद केंद्रों पर बेचें"
                }
            }
        };
        
        // Common queries and responses - Enhanced
        this.commonResponses = {
            greeting: {
                en: "🌾 **Hello! Welcome to AgriTech Pro Assistant!**\n\nI'm your smart farming guide. I can help you with:\n\n📌 **Crops:** Rice, Wheat, Cotton, Maize, Sugarcane, Potato, Tomato, Onion, Mustard, Soybean & more\n\n📌 **Soil Types:** Alluvial, Black, Red, Laterite, Sandy, Clay, Loamy\n\n📌 **Fertilizers:** NPK, Urea, DAP, Organic manures, Micronutrients\n\n📌 **Seasons:** Kharif, Rabi, Zaid crop planning\n\n📌 **Irrigation:** Drip, Sprinkler, Critical stages\n\n📌 **Pests & Diseases:** IPM, Crop-specific solutions\n\n📌 **Government Schemes:** PM-KISAN, MSP, Subsidies\n\n📌 **Organic Farming:** Jeevamrut, Vermicompost\n\n**Just type your question in any language!** 🌱",
                hi: "🌾 **नमस्ते! AgriTech Pro सहायक में आपका स्वागत है!**\n\nमैं आपका स्मार्ट खेती गाइड हूं। मैं इनमें मदद कर सकता हूं:\n\n📌 **फसलें:** धान, गेहूं, कपास, मक्का, गन्ना, आलू, टमाटर, प्याज, सरसों, सोयाबीन और अन्य\n\n📌 **मिट्टी:** जलोढ़, काली, लाल, लैटेराइट, बलुई, मटियार, दोमट\n\n📌 **उर्वरक:** NPK, यूरिया, DAP, जैविक खाद, सूक्ष्म पोषक\n\n📌 **मौसम:** खरीफ, रबी, जायद फसल योजना\n\n📌 **सिंचाई:** ड्रिप, स्प्रिंकलर, महत्वपूर्ण अवस्थाएं\n\n📌 **कीट और रोग:** IPM, फसल-विशेष समाधान\n\n📌 **सरकारी योजनाएं:** PM-KISAN, MSP, सब्सिडी\n\n**बस अपना सवाल किसी भी भाषा में टाइप करें!** 🌱",
                bho: "🌾 **प्रणाम! AgriTech Pro सहायक में राउर स्वागत बा!**\n\nहम राउर स्मार्ट खेती गाइड हईं। हम एह में मदद कर सकीं:\n\n📌 **फसल:** धान, गेहूं, कपास, मकई, गन्ना, आलू, टमाटर, प्याज\n📌 **माटी:** जलोढ़, काली, लाल, बालू, दोमट\n📌 **खाद:** NPK, यूरिया, DAP, जैविक खाद\n📌 **मौसम:** खरीफ, रबी, जायद फसल\n📌 **सिंचाई:** ड्रिप, स्प्रिंकलर\n📌 **कीट-रोग:** IPM, समाधान\n\n**बस अपन सवाल टाइप करीं!** 🌱"
            },
            thanks: {
                en: "You're welcome! 😊 Feel free to ask more farming questions anytime. Happy farming! 🌾\n\n**Quick Tips:**\n• Get soil tested before each season\n• Follow recommended seed rates\n• Use balanced fertilizers\n• Practice crop rotation",
                hi: "आपका स्वागत है! 😊 खेती से जुड़े और सवाल कभी भी पूछें। शुभ खेती! 🌾\n\n**त्वरित सुझाव:**\n• हर मौसम से पहले मिट्टी परीक्षण\n• अनुशंसित बीज दर अपनाएं\n• संतुलित उर्वरक उपयोग करें\n• फसल चक्र अपनाएं",
                bho: "राउर स्वागत बा! 😊 अउरी खेती के सवाल कबो भी पूछीं। शुभ खेती! 🌾"
            },
            unknown: {
                en: "🤔 I'm not sure about that exact query. Let me help you with what I know!\n\n**Try asking about:**\n\n🌾 **Crops:** \"Tell me about wheat\" or \"How to grow rice\"\n🏔️ **Soil:** \"What is black soil\" or \"Best soil for cotton\"\n💧 **Irrigation:** \"When to irrigate wheat\" or \"Drip irrigation\"\n🐛 **Pests:** \"Rice pests\" or \"How to control bollworm\"\n💰 **Government:** \"What is MSP\" or \"PM-KISAN scheme\"\n🌿 **Organic:** \"How to make Jeevamrut\" or \"Organic farming\"\n\n**Or use the quick action buttons below!** 👇",
                hi: "🤔 मुझे इस सवाल का सटीक जवाब नहीं पता। लेकिन मैं इनमें मदद कर सकता हूं!\n\n**पूछ सकते हैं:**\n\n🌾 **फसल:** \"गेहूं के बारे में बताएं\" या \"धान कैसे उगाएं\"\n🏔️ **मिट्टी:** \"काली मिट्टी क्या है\" या \"कपास के लिए मिट्टी\"\n💧 **सिंचाई:** \"गेहूं में सिंचाई कब\" या \"ड्रिप सिंचाई\"\n🐛 **कीट:** \"धान के कीट\" या \"बॉलवर्म कैसे रोकें\"\n💰 **सरकारी:** \"MSP क्या है\" या \"PM-KISAN योजना\"\n\n**या नीचे के बटन उपयोग करें!** 👇",
                bho: "🤔 हमके एह सवाल के पक्का जवाब नइखे पता। बाकी हम एह में मदद कर सकीं:\n\n🌾 फसल के बारे में पूछीं\n🏔️ माटी के बारे में पूछीं\n💧 सिंचाई के बारे में पूछीं\n🐛 कीट-रोग के बारे में पूछीं\n\n**नीचे के बटन उपयोग करीं!** 👇"
            },
            help: {
                en: "📚 **AgriTech Pro - Help Guide**\n\n**🌾 CROPS** (Type crop name):\nRice, Wheat, Cotton, Maize, Sugarcane, Potato, Tomato, Onion, Mustard, Soybean, Groundnut, Gram, Barley\n\n**🏔️ SOIL** (Type \"soil\" + type):\nAlluvial, Black, Red, Laterite, Sandy, Clay, Loamy\n\n**🧪 FERTILIZERS** (Type fertilizer name):\nNitrogen, Phosphorus, Potassium, NPK, Urea, DAP, Organic, Micronutrients\n\n**📅 SEASONS** (Type season name):\nKharif, Rabi, Zaid - Crop planning guide\n\n**💧 IRRIGATION** (Type \"irrigation\"):\nDrip, Sprinkler, Critical stages\n\n**🐛 PESTS** (Type \"pest\" + crop):\nRice pests, Wheat diseases, Cotton bollworm\n\n**🏛️ SCHEMES** (Type \"scheme\" or \"MSP\"):\nGovernment schemes, MSP prices, Subsidies\n\n**🌿 ORGANIC** (Type \"organic\"):\nJeevamrut, Compost, Natural farming\n\n**Example Questions:**\n• \"How to grow wheat?\"\n• \"Best fertilizer for rice\"\n• \"What is drip irrigation?\"\n• \"Cotton pests and control\"",
                hi: "📚 **AgriTech Pro - सहायता मार्गदर्शिका**\n\n**🌾 फसलें** (फसल का नाम टाइप करें):\nधान, गेहूं, कपास, मक्का, गन्ना, आलू, टमाटर, प्याज, सरसों, सोयाबीन, मूंगफली, चना, जौ\n\n**🏔️ मिट्टी** (\"मिट्टी\" + प्रकार):\nजलोढ़, काली, लाल, लैटेराइट, बलुई, मटियार, दोमट\n\n**🧪 उर्वरक** (उर्वरक नाम):\nनाइट्रोजन, फास्फोरस, पोटेशियम, NPK, यूरिया, DAP, जैविक, सूक्ष्म पोषक\n\n**📅 मौसम** (मौसम नाम):\nखरीफ, रबी, जायद - फसल योजना\n\n**💧 सिंचाई** (\"सिंचाई\" टाइप करें):\nड्रिप, स्प्रिंकलर, महत्वपूर्ण अवस्थाएं\n\n**🐛 कीट** (\"कीट\" + फसल):\nधान कीट, गेहूं रोग, कपास बॉलवर्म\n\n**उदाहरण सवाल:**\n• \"गेहूं कैसे उगाएं?\"\n• \"धान के लिए खाद\"\n• \"ड्रिप सिंचाई क्या है?\"",
                bho: "📚 **AgriTech Pro - मदद**\n\n🌾 **फसल** - धान, गेहूं, कपास, मकई, गन्ना, आलू\n🏔️ **माटी** - जलोढ़, काली, लाल, बालू, दोमट\n🧪 **खाद** - NPK, यूरिया, DAP, जैविक\n📅 **मौसम** - खरीफ, रबी, जायद\n💧 **सिंचाई** - ड्रिप, स्प्रिंकलर\n🐛 **कीट-रोग** - IPM, समाधान\n🏛️ **सरकारी योजना** - MSP, PM-KISAN"
            }
        };
        
        // Extended synonyms for better matching
        this.synonyms = {
            crops: {
                rice: ['rice', 'paddy', 'dhan', 'धान', 'चावल', 'धन'],
                wheat: ['wheat', 'gehun', 'gehu', 'गेहूं', 'गेहुं', 'गेंहू'],
                cotton: ['cotton', 'kapas', 'कपास', 'रुई'],
                sugarcane: ['sugarcane', 'ganna', 'गन्ना', 'गन्ने'],
                maize: ['maize', 'corn', 'makka', 'makkai', 'bhutta', 'मक्का', 'भुट्टा', 'मकई'],
                potato: ['potato', 'aloo', 'aaloo', 'आलू', 'आलु'],
                tomato: ['tomato', 'tamatar', 'टमाटर'],
                onion: ['onion', 'pyaz', 'pyaaz', 'प्याज', 'पियाज'],
                mustard: ['mustard', 'sarso', 'sarson', 'सरसों', 'सरसो', 'राई'],
                soybean: ['soybean', 'soyabean', 'soya', 'सोयाबीन', 'सोया'],
                groundnut: ['groundnut', 'peanut', 'moongfali', 'मूंगफली', 'मुंगफली'],
                chana: ['chickpea', 'gram', 'chana', 'चना', 'चने', 'bengal gram'],
                barley: ['barley', 'jau', 'jo', 'जौ', 'जव']
            },
            soils: {
                alluvial: ['alluvial', 'jalod', 'jalodh', 'जलोढ़', 'जलोद'],
                black: ['black', 'kali', 'काली', 'regur', 'रेगुर'],
                red: ['red', 'lal', 'लाल', 'रक्त'],
                laterite: ['laterite', 'लैटेराइट', 'लेटेराइट'],
                sandy: ['sandy', 'sand', 'balu', 'balui', 'बालू', 'बलुई', 'रेतीली', 'desert', 'मरुस्थलीय'],
                clay: ['clay', 'matiyar', 'मटियार', 'चिकनी'],
                loamy: ['loamy', 'loam', 'domat', 'दोमट', 'दोमत']
            },
            fertilizers: {
                nitrogen: ['nitrogen', 'nitrojan', 'नाइट्रोजन', 'n'],
                phosphorus: ['phosphorus', 'phosphorous', 'fosfor', 'फास्फोरस', 'फॉस्फोरस', 'p'],
                potassium: ['potassium', 'potash', 'पोटेशियम', 'पोटाश', 'k'],
                urea: ['urea', 'yuria', 'यूरिया'],
                dap: ['dap', 'diammonium phosphate', 'डीएपी', 'डी.ए.पी.'],
                organic: ['organic', 'jaivik', 'जैविक', 'natural', 'प्राकृतिक', 'compost', 'कम्पोस्ट', 'खाद', 'gobar'],
                micronutrients: ['micronutrient', 'micro nutrient', 'sukshm', 'सूक्ष्म पोषक', 'zinc', 'जिंक', 'iron', 'boron']
            },
            irrigation: {
                drip: ['drip', 'टपक', 'ड्रिप'],
                sprinkler: ['sprinkler', 'फव्वारा', 'स्प्रिंकलर'],
                critical_stages: ['critical', 'important', 'महत्वपूर्ण', 'जरूरी', 'stage', 'अवस्था']
            },
            pests: {
                rice_pests: ['rice pest', 'rice disease', 'dhan ka rog', 'धान कीट', 'धान रोग', 'blast', 'stem borer'],
                wheat_pests: ['wheat pest', 'wheat disease', 'gehun rog', 'गेहूं कीट', 'गेहूं रोग', 'rust', 'रतुआ'],
                cotton_pests: ['cotton pest', 'cotton disease', 'kapas keet', 'कपास कीट', 'bollworm', 'बॉलवर्म']
            }
        };
        
        this.init();
    }
    
    init() {
        this.createChatbotUI();
        this.setupEventListeners();
        this.addWelcomeMessage();
    }
    
    createChatbotUI() {
        // Create chatbot container
        const chatbotHTML = `
            <div class="chatbot-container" id="chatbot-container">
                <!-- Chat Toggle Button -->
                <button class="chatbot-toggle" id="chatbot-toggle" title="${t('chatbotTitle')}">
                    <i class="fas fa-comments"></i>
                    <span class="chatbot-badge" id="chatbot-badge" style="display: none;">1</span>
                </button>
                
                <!-- Chat Window -->
                <div class="chatbot-window" id="chatbot-window">
                    <div class="chatbot-header">
                        <div class="chatbot-header-info">
                            <i class="fas fa-robot"></i>
                            <span data-i18n="chatbotTitle">${t('chatbotTitle')}</span>
                        </div>
                        <div class="chatbot-header-actions">
                            <button class="chatbot-minimize" id="chatbot-minimize">
                                <i class="fas fa-minus"></i>
                            </button>
                            <button class="chatbot-close" id="chatbot-close">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    </div>
                    
                    <div class="chatbot-messages" id="chatbot-messages">
                        <!-- Messages will be added here -->
                    </div>
                    
                    <div class="chatbot-quick-actions" id="chatbot-quick-actions">
                        <button class="quick-action-btn" data-query="help">
                            <i class="fas fa-question-circle"></i> Help
                        </button>
                        <button class="quick-action-btn" data-query="crops">
                            <i class="fas fa-seedling"></i> Crops
                        </button>
                        <button class="quick-action-btn" data-query="soil">
                            <i class="fas fa-mountain"></i> Soil
                        </button>
                        <button class="quick-action-btn" data-query="weather">
                            <i class="fas fa-cloud-sun"></i> Weather
                        </button>
                    </div>
                    
                    <div class="chatbot-input-area">
                        <input type="text" id="chatbot-input" data-i18n-placeholder="typeMessage" placeholder="${t('typeMessage')}">
                        <button id="chatbot-send" title="${t('send')}">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // Add to body
        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
    }
    
    setupEventListeners() {
        // Toggle button
        document.getElementById('chatbot-toggle').addEventListener('click', () => this.toggleChat());
        
        // Close button
        document.getElementById('chatbot-close').addEventListener('click', () => this.closeChat());
        
        // Minimize button
        document.getElementById('chatbot-minimize').addEventListener('click', () => this.minimizeChat());
        
        // Send button
        document.getElementById('chatbot-send').addEventListener('click', () => this.sendMessage());
        
        // Input enter key
        document.getElementById('chatbot-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
        
        // Quick action buttons
        document.querySelectorAll('.quick-action-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const query = btn.dataset.query;
                this.handleQuickAction(query);
            });
        });
        
        // Language change listener
        document.addEventListener('languageChanged', () => {
            this.updateChatbotLanguage();
        });
    }
    
    toggleChat() {
        this.isOpen = !this.isOpen;
        const window = document.getElementById('chatbot-window');
        const toggle = document.getElementById('chatbot-toggle');
        const badge = document.getElementById('chatbot-badge');
        
        if (this.isOpen) {
            window.classList.add('open');
            toggle.classList.add('active');
            badge.style.display = 'none';
            document.getElementById('chatbot-input').focus();
        } else {
            window.classList.remove('open');
            toggle.classList.remove('active');
        }
    }
    
    closeChat() {
        this.isOpen = false;
        document.getElementById('chatbot-window').classList.remove('open');
        document.getElementById('chatbot-toggle').classList.remove('active');
    }
    
    minimizeChat() {
        this.closeChat();
    }
    
    addWelcomeMessage() {
        const lang = typeof getCurrentLanguage === 'function' ? getCurrentLanguage() : 'en';
        const welcomeMsg = this.commonResponses.greeting[lang] || this.commonResponses.greeting.en;
        this.addBotMessage(welcomeMsg);
    }
    
    addBotMessage(text) {
        const messagesContainer = document.getElementById('chatbot-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chat-message bot-message';
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <div class="message-text">${this.formatMessage(text)}</div>
                <div class="message-time">${this.getCurrentTime()}</div>
            </div>
        `;
        messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }
    
    addUserMessage(text) {
        const messagesContainer = document.getElementById('chatbot-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chat-message user-message';
        messageDiv.innerHTML = `
            <div class="message-content">
                <div class="message-text">${this.escapeHtml(text)}</div>
                <div class="message-time">${this.getCurrentTime()}</div>
            </div>
            <div class="message-avatar">
                <i class="fas fa-user"></i>
            </div>
        `;
        messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }
    
    addTypingIndicator() {
        const messagesContainer = document.getElementById('chatbot-messages');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chat-message bot-message typing-indicator';
        typingDiv.id = 'typing-indicator';
        typingDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        messagesContainer.appendChild(typingDiv);
        this.scrollToBottom();
    }
    
    removeTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) indicator.remove();
    }
    
    sendMessage() {
        const input = document.getElementById('chatbot-input');
        const text = input.value.trim();
        
        if (!text || this.isTyping) return;
        
        // Add user message
        this.addUserMessage(text);
        input.value = '';
        
        // Process and respond
        this.processMessage(text);
    }
    
    async processMessage(text) {
        this.isTyping = true;
        this.addTypingIndicator();
        
        // Simulate thinking delay
        await this.delay(500 + Math.random() * 1000);
        
        const response = this.generateResponse(text);
        
        this.removeTypingIndicator();
        this.addBotMessage(response);
        this.isTyping = false;
    }
    
    generateResponse(text) {
        const lang = typeof getCurrentLanguage === 'function' ? getCurrentLanguage() : 'en';
        const lowerText = text.toLowerCase().trim();
        const words = lowerText.split(/\s+/);
        
        // Greeting patterns - Extended
        if (this.matchesAny(lowerText, ['hello', 'hi', 'hey', 'namaste', 'namaskar', 'नमस्ते', 'हैलो', 'हेलो', 'sat sri akal', 'pranam', 'प्रणाम', 'good morning', 'good evening', 'hii', 'hiii', 'kaise ho', 'कैसे हो'])) {
            return this.commonResponses.greeting[lang] || this.commonResponses.greeting.en;
        }
        
        // Thanks patterns - Extended
        if (this.matchesAny(lowerText, ['thank', 'thanks', 'धन्यवाद', 'शुक्रिया', 'shukriya', 'dhanyawad', 'bahut badiya', 'great', 'awesome', 'helpful', 'nice'])) {
            return this.commonResponses.thanks[lang] || this.commonResponses.thanks.en;
        }
        
        // Help patterns - Extended
        if (this.matchesAny(lowerText, ['help', 'मदद', 'सहायता', 'what can you do', 'features', 'kya kar sakte', 'क्या कर सकते', 'guide', 'commands', 'options', 'menu'])) {
            return this.commonResponses.help[lang] || this.commonResponses.help.en;
        }
        
        // ============ CHECK FOR CROP QUERIES ============
        for (const [cropKey, synonymList] of Object.entries(this.synonyms.crops)) {
            if (synonymList.some(syn => lowerText.includes(syn))) {
                const cropInfo = this.knowledgeBase.crops[cropKey];
                if (cropInfo) {
                    return cropInfo[lang] || cropInfo.en;
                }
            }
        }
        
        // ============ CHECK FOR SOIL QUERIES ============
        for (const [soilKey, synonymList] of Object.entries(this.synonyms.soils)) {
            if (synonymList.some(syn => lowerText.includes(syn))) {
                const soilInfo = this.knowledgeBase.soils[soilKey];
                if (soilInfo) {
                    return soilInfo[lang] || soilInfo.en;
                }
            }
        }
        
        // General soil query
        if (this.matchesAny(lowerText, ['soil', 'मिट्टी', 'mitti', 'माटी', 'mati', 'which soil', 'konsi mitti', 'कौन सी मिट्टी'])) {
            return lang === 'hi' 
                ? "🏔️ **मिट्टी के प्रकार:**\n\n• **जलोढ़** - नदी मैदान, धान-गेहूं-गन्ना\n• **काली** - दक्कन पठार, कपास के लिए सर्वोत्तम\n• **लाल** - दक्षिण भारत, मूंगफली-रागी\n• **लैटेराइट** - पहाड़ी क्षेत्र, चाय-कॉफी\n• **बलुई** - राजस्थान, बाजरा-ग्वार\n• **दोमट** - सबसे अच्छी, सभी फसलों के लिए\n\nकिसी विशेष मिट्टी के बारे में पूछें!"
                : "🏔️ **Soil Types:**\n\n• **Alluvial** - River plains, Rice-Wheat-Sugarcane\n• **Black** - Deccan plateau, Best for Cotton\n• **Red** - South India, Groundnut-Ragi\n• **Laterite** - Hilly areas, Tea-Coffee\n• **Sandy** - Rajasthan, Millet-Guar\n• **Loamy** - Ideal, suits all crops\n\nAsk about any specific soil type!";
        }
        
        // ============ CHECK FOR FERTILIZER QUERIES ============
        for (const [fertKey, synonymList] of Object.entries(this.synonyms.fertilizers)) {
            if (synonymList.some(syn => lowerText.includes(syn))) {
                const fertInfo = this.knowledgeBase.fertilizers[fertKey];
                if (fertInfo) {
                    return fertInfo[lang] || fertInfo.en;
                }
            }
        }
        
        // General fertilizer/khad query
        if (this.matchesAny(lowerText, ['fertilizer', 'fertiliser', 'खाद', 'khad', 'उर्वरक', 'manure', 'fert'])) {
            return lang === 'hi'
                ? "🧪 **उर्वरक प्रकार:**\n\n**रासायनिक:**\n• नाइट्रोजन (N) - यूरिया, पत्ती वृद्धि\n• फास्फोरस (P) - DAP/SSP, जड़ विकास\n• पोटेशियम (K) - MOP, रोग प्रतिरोध\n\n**जैविक:**\n• गोबर खाद (FYM)\n• वर्मीकम्पोस्ट\n• हरी खाद\n• जीवामृत\n\n**सूक्ष्म पोषक:**\n• जिंक, लोहा, बोरॉन\n\nविस्तृत जानकारी के लिए 'यूरिया', 'DAP', या 'जैविक' टाइप करें!"
                : "🧪 **Fertilizer Types:**\n\n**Chemical:**\n• Nitrogen (N) - Urea, leaf growth\n• Phosphorus (P) - DAP/SSP, root development\n• Potassium (K) - MOP, disease resistance\n\n**Organic:**\n• FYM (Farmyard Manure)\n• Vermicompost\n• Green Manure\n• Jeevamrut\n\n**Micronutrients:**\n• Zinc, Iron, Boron\n\nType 'urea', 'DAP', or 'organic' for detailed info!";
        }
        
        // NPK query
        if (this.matchesAny(lowerText, ['npk', 'n-p-k', 'n p k', 'एनपीके'])) {
            return lang === 'hi'
                ? "🔢 **NPK - संपूर्ण जानकारी**\n\nNPK = **N**ाइट्रोजन + **P**ास्फोरस + **K**ोटेशियम\n\n**नाइट्रोजन (N):**\n• पत्ती और तना वृद्धि\n• हरा रंग बनाए रखता है\n• स्रोत: यूरिया (46% N)\n\n**फास्फोरस (P):**\n• जड़ विकास, फूल-फल\n• बीज निर्माण\n• स्रोत: DAP (46% P)\n\n**पोटेशियम (K):**\n• रोग प्रतिरोध\n• जल नियमन, फल गुणवत्ता\n• स्रोत: MOP (60% K)\n\n**सामान्य अनुपात:**\n• धान: 120:60:40\n• गेहूं: 120:60:40\n• कपास: 80:40:40"
                : "🔢 **NPK - Complete Guide**\n\nNPK = **N**itrogen + **P**hosphorus + **K**potassium\n\n**Nitrogen (N):**\n• Leaf and stem growth\n• Maintains green color\n• Source: Urea (46% N)\n\n**Phosphorus (P):**\n• Root development, flowering\n• Seed formation\n• Source: DAP (46% P)\n\n**Potassium (K):**\n• Disease resistance\n• Water regulation, fruit quality\n• Source: MOP (60% K)\n\n**Common Ratios:**\n• Rice: 120:60:40\n• Wheat: 120:60:40\n• Cotton: 80:40:40";
        }
        
        // ============ SEASON QUERIES ============
        if (this.matchesAny(lowerText, ['kharif', 'खरीफ', 'monsoon crop', 'barsat', 'बारिश की फसल'])) {
            const seasonInfo = this.knowledgeBase.seasons.kharif;
            return seasonInfo[lang] || seasonInfo.en;
        }
        
        if (this.matchesAny(lowerText, ['rabi', 'रबी', 'winter crop', 'sardi', 'सर्दी की फसल'])) {
            const seasonInfo = this.knowledgeBase.seasons.rabi;
            return seasonInfo[lang] || seasonInfo.en;
        }
        
        if (this.matchesAny(lowerText, ['zaid', 'जायद', 'zayed', 'summer crop', 'garmi', 'गर्मी की फसल'])) {
            const seasonInfo = this.knowledgeBase.seasons.zaid;
            return seasonInfo[lang] || seasonInfo.en;
        }
        
        // General season query
        if (this.matchesAny(lowerText, ['season', 'मौसम', 'mausam', 'faslon ka', 'कौन सी फसल', 'which crop', 'crop season'])) {
            return lang === 'hi'
                ? "📅 **फसल मौसम:**\n\n🌧️ **खरीफ (जून-अक्टूबर)**\nधान, मक्का, कपास, सोयाबीन, मूंगफली, अरहर\n\n❄️ **रबी (अक्टूबर-मार्च)**\nगेहूं, जौ, सरसों, चना, आलू, मटर\n\n☀️ **जायद (मार्च-जून)**\nतरबूज, खरबूजा, खीरा, भिंडी, लौकी\n\nविस्तृत जानकारी के लिए 'खरीफ', 'रबी', या 'जायद' टाइप करें!"
                : "📅 **Crop Seasons:**\n\n🌧️ **Kharif (June-October)**\nRice, Maize, Cotton, Soybean, Groundnut, Arhar\n\n❄️ **Rabi (October-March)**\nWheat, Barley, Mustard, Gram, Potato, Pea\n\n☀️ **Zaid (March-June)**\nWatermelon, Muskmelon, Cucumber, Okra, Bottle gourd\n\nType 'kharif', 'rabi', or 'zaid' for detailed info!";
        }
        
        // ============ IRRIGATION QUERIES ============
        for (const [irrKey, synonymList] of Object.entries(this.synonyms.irrigation)) {
            if (synonymList.some(syn => lowerText.includes(syn))) {
                const irrInfo = this.knowledgeBase.irrigation[irrKey];
                if (irrInfo) {
                    return irrInfo[lang] || irrInfo.en;
                }
            }
        }
        
        if (this.matchesAny(lowerText, ['irrigation', 'water', 'सिंचाई', 'sinchai', 'पानी', 'paani', 'pani'])) {
            return this.knowledgeBase.irrigation.general[lang] || this.knowledgeBase.irrigation.general.en;
        }
        
        // ============ PEST & DISEASE QUERIES ============
        // Check for crop-specific pests
        for (const [pestKey, synonymList] of Object.entries(this.synonyms.pests)) {
            if (synonymList.some(syn => lowerText.includes(syn))) {
                const pestInfo = this.knowledgeBase.pests[pestKey];
                if (pestInfo) {
                    return pestInfo[lang] || pestInfo.en;
                }
            }
        }
        
        if (this.matchesAny(lowerText, ['pest', 'insect', 'disease', 'कीट', 'keet', 'रोग', 'rog', 'बीमारी', 'bimari', 'ipm', 'spray', 'dawai', 'दवाई', 'keetnashak', 'कीटनाशक'])) {
            return this.knowledgeBase.pests.general[lang] || this.knowledgeBase.pests.general.en;
        }
        
        // ============ GOVERNMENT SCHEMES ============
        if (this.matchesAny(lowerText, ['scheme', 'yojna', 'योजना', 'pm kisan', 'pm-kisan', 'pmkisan', 'subsidy', 'सब्सिडी', 'government', 'सरकारी', 'sarkari', 'loan', 'kcc', 'किसान क्रेडिट'])) {
            return this.knowledgeBase.schemes.general[lang] || this.knowledgeBase.schemes.general.en;
        }
        
        // MSP Query
        if (this.matchesAny(lowerText, ['msp', 'minimum support price', 'न्यूनतम समर्थन मूल्य', 'samarthan mulya'])) {
            return this.knowledgeBase.market.msp[lang] || this.knowledgeBase.market.msp.en;
        }
        
        // Live Market Prices Query - redirect to Market Prices page
        if (this.matchesAny(lowerText, ['live price', 'mandi rate', 'मंडी भाव', 'mandi bhav', 'market price', 'बाजार भाव', 'bazaar bhav', 'बिक्री', 'bikri', 'sell', 'selling', 'kitne ka', 'कितने का', 'rate today', 'aaj ka rate', 'आज का भाव', 'current price', 'live rate', 'price today'])) {
            const liveMsg = {
                en: "📈 **Live Market Prices**\n\nFor real-time mandi prices and selling recommendations:\n\n👉 **Click on 'Market Prices' in the sidebar** to see:\n• Live prices from 10+ mandis\n• Price trends (up/down)\n• Best time to sell recommendations\n• 7-day price history\n• Price alerts\n\n💡 **Quick MSP Reference:**\n• Wheat: ₹2,275/quintal\n• Rice: ₹2,300/quintal\n• Cotton: ₹7,020/quintal\n\n_Prices updated every 30 seconds!_",
                hi: "📈 **लाइव बाजार भाव**\n\nरियल-टाइम मंडी दरों के लिए:\n\n👉 **साइडबार में 'Market Prices' पर क्लिक करें** देखें:\n• 10+ मंडियों के लाइव भाव\n• प्राइस ट्रेंड (ऊपर/नीचे)\n• बेचने की सिफारिशें\n• 7 दिन का प्राइस इतिहास\n• प्राइस अलर्ट\n\n💡 **MSP संदर्भ:**\n• गेहूं: ₹2,275/क्विंटल\n• धान: ₹2,300/क्विंटल\n• कपास: ₹7,020/क्विंटल\n\n_हर 30 सेकंड में अपडेट!_"
            };
            return liveMsg[lang] || liveMsg.en;
        }
        
        // Generic price/rate query
        if (this.matchesAny(lowerText, ['price', 'rate', 'भाव', 'दाम', 'dam', 'kimat', 'कीमत'])) {
            // Check if asking about specific crop price
            for (const [cropKey, synonymList] of Object.entries(this.synonyms.crops)) {
                if (synonymList.some(syn => lowerText.includes(syn))) {
                    const cropMsp = {
                        rice: '₹2,300/quintal', wheat: '₹2,275/quintal', maize: '₹2,090/quintal',
                        cotton: '₹7,020/quintal', sugarcane: '₹315/quintal', groundnut: '₹6,377/quintal',
                        soybean: '₹4,892/quintal', mustard: '₹5,650/quintal', chana: '₹5,440/quintal',
                        potato: '₹1,200/quintal', onion: '₹1,800/quintal', tomato: '₹2,500/quintal',
                        barley: '₹1,850/quintal'
                    };
                    const price = cropMsp[cropKey] || 'MSP varies';
                    const msg = lang === 'hi' 
                        ? `💰 **${cropKey.charAt(0).toUpperCase() + cropKey.slice(1)} MSP:** ${price}\n\n👉 लाइव मंडी भाव देखने के लिए **Market Prices** सेक्शन देखें!`
                        : `💰 **${cropKey.charAt(0).toUpperCase() + cropKey.slice(1)} MSP:** ${price}\n\n👉 Check **Market Prices** section for live mandi rates!`;
                    return msg;
                }
            }
            // Generic price query
            return this.knowledgeBase.market.msp[lang] || this.knowledgeBase.market.msp.en;
        }
        
        // ============ ORGANIC FARMING ============
        if (this.matchesAny(lowerText, ['jeevamrut', 'jivamrit', 'जीवामृत', 'jeevamrit'])) {
            return this.knowledgeBase.organic.jeevamrut[lang] || this.knowledgeBase.organic.jeevamrut.en;
        }
        
        if (this.matchesAny(lowerText, ['organic', 'जैविक', 'jaivik', 'natural farming', 'प्राकृतिक खेती', 'zero budget', 'prakritik'])) {
            return this.knowledgeBase.organic.general[lang] || this.knowledgeBase.organic.general.en;
        }
        
        // ============ HOW TO GROW QUERIES ============
        if (this.matchesAny(lowerText, ['how to grow', 'kaise ugaye', 'कैसे उगाएं', 'कैसे उगाए', 'cultivation', 'kaise kare', 'कैसे करें', 'growing'])) {
            // Check which crop they're asking about
            for (const [cropKey, synonymList] of Object.entries(this.synonyms.crops)) {
                if (synonymList.some(syn => lowerText.includes(syn))) {
                    const cropInfo = this.knowledgeBase.crops[cropKey];
                    if (cropInfo) {
                        return cropInfo[lang] || cropInfo.en;
                    }
                }
            }
            // No specific crop mentioned
            return lang === 'hi'
                ? "कृपया बताएं कि कौन सी फसल उगाना चाहते हैं?\n\nउदाहरण: 'गेहूं कैसे उगाएं' या 'धान की खेती'"
                : "Please specify which crop you want to grow?\n\nExample: 'How to grow wheat' or 'Rice cultivation'";
        }
        
        // ============ BEST/SUITABLE QUERIES ============
        if (this.matchesAny(lowerText, ['best', 'suitable', 'सबसे अच्छी', 'उपयुक्त', 'sabse acha', 'konsa', 'which', 'कौन सा', 'recommend'])) {
            // Best fertilizer for crop
            if (this.matchesAny(lowerText, ['fertilizer', 'खाद', 'khad'])) {
                for (const [cropKey, synonymList] of Object.entries(this.synonyms.crops)) {
                    if (synonymList.some(syn => lowerText.includes(syn))) {
                        const cropInfo = this.knowledgeBase.crops[cropKey];
                        if (cropInfo) {
                            return cropInfo[lang] || cropInfo.en;
                        }
                    }
                }
            }
            // Best soil for crop
            if (this.matchesAny(lowerText, ['soil', 'मिट्टी', 'mitti'])) {
                for (const [cropKey, synonymList] of Object.entries(this.synonyms.crops)) {
                    if (synonymList.some(syn => lowerText.includes(syn))) {
                        const cropInfo = this.knowledgeBase.crops[cropKey];
                        if (cropInfo) {
                            return cropInfo[lang] || cropInfo.en;
                        }
                    }
                }
            }
        }
        
        // Weather query - redirect to weather section
        if (this.matchesAny(lowerText, ['weather', 'rain', 'मौसम का हाल', 'बारिश', 'वर्षा', 'barish', 'varsha', 'temperature', 'तापमान', 'tapman', 'forecast'])) {
            return lang === 'hi'
                ? "🌤️ **मौसम जानकारी**\n\nवर्तमान मौसम के लिए डैशबोर्ड में 'मौसम' सेक्शन देखें।\n\nvहां आपको मिलेगा:\n• वर्तमान तापमान और स्थिति\n• आर्द्रता और हवा की गति\n• 7-दिन का पूर्वानुमान\n• कृषि-आधारित सुझाव\n\n**सामान्य सुझाव:**\n• बारिश से पहले खाद डालें\n• तेज धूप में सिंचाई न करें\n• पाला पड़ने पर हल्की सिंचाई करें"
                : "🌤️ **Weather Information**\n\nFor current weather, check the 'Weather' section in dashboard.\n\nYou'll find:\n• Current temperature and conditions\n• Humidity and wind speed\n• 7-day forecast\n• Agriculture-based recommendations\n\n**General Tips:**\n• Apply fertilizer before rain\n• Avoid irrigation in peak sun\n• Light irrigation during frost";
        }
        
        // Yield prediction redirect
        if (this.matchesAny(lowerText, ['yield', 'predict', 'उपज', 'पैदावार', 'paidawar', 'upaj', 'bhavishyavani', 'भविष्यवाणी', 'kitni', 'कितनी'])) {
            return lang === 'hi'
                ? "📊 **उपज भविष्यवाणी**\n\nसटीक उपज भविष्यवाणी के लिए:\n\n1. साइडबार में 'उपज भविष्यवाणी' पर क्लिक करें\n2. अपनी फसल, क्षेत्र, मिट्टी का प्रकार चुनें\n3. मौसम और उर्वरक विवरण भरें\n4. 'भविष्यवाणी करें' पर क्लिक करें\n\nहमारा ML मॉडल आपको अनुमानित उपज बताएगा!"
                : "📊 **Yield Prediction**\n\nFor accurate yield prediction:\n\n1. Click 'Yield Prediction' in sidebar\n2. Select your crop, area, soil type\n3. Enter weather and fertilizer details\n4. Click 'Predict'\n\nOur ML model will give you estimated yield!";
        }
        
        // Recommendation redirect
        if (this.matchesAny(lowerText, ['recommend', 'suggest', 'which crop', 'सिफारिश', 'sifarish', 'कौन सी फसल बोएं', 'konsi fasal', 'kya ugaye'])) {
            return lang === 'hi'
                ? "🌱 **फसल सिफारिश**\n\nआपके खेत के लिए सर्वोत्तम फसल जानने के लिए:\n\n1. साइडबार में 'फसल सिफारिश' पर क्लिक करें\n2. अपनी मिट्टी का प्रकार, तापमान, वर्षा भरें\n3. pH और पोषक तत्व विवरण दें\n4. 'सिफारिश प्राप्त करें' पर क्लिक करें\n\nहमारा AI आपको टॉप 5 फसलें सुझाएगा!"
                : "🌱 **Crop Recommendation**\n\nTo find the best crop for your field:\n\n1. Click 'Crop Recommendation' in sidebar\n2. Enter soil type, temperature, rainfall\n3. Provide pH and nutrient details\n4. Click 'Get Recommendations'\n\nOur AI will suggest top 5 suitable crops!";
        }
        
        // Default response
        return this.commonResponses.unknown[lang] || this.commonResponses.unknown.en;
    }
    
    handleQuickAction(action) {
        const lang = typeof getCurrentLanguage === 'function' ? getCurrentLanguage() : 'en';
        let response = '';
        
        switch (action) {
            case 'help':
                response = this.commonResponses.help[lang] || this.commonResponses.help.en;
                break;
            case 'crops':
                response = lang === 'hi'
                    ? "🌾 **प्रमुख फसलें:**\n\n**खरीफ (जून-अक्टूबर):**\nधान, मक्का, कपास, सोयाबीन, मूंगफली, अरहर\n\n**रबी (अक्टूबर-मार्च):**\nगेहूं, जौ, सरसों, चना, आलू, मटर\n\n**जायद (मार्च-जून):**\nतरबूज, खरबूजा, खीरा, भिंडी\n\n📝 किसी भी फसल के बारे में विस्तार से जानने के लिए उसका नाम टाइप करें!\n\nउदाहरण: 'गेहूं', 'धान', 'कपास'"
                    : "🌾 **Major Crops:**\n\n**Kharif (June-October):**\nRice, Maize, Cotton, Soybean, Groundnut, Arhar\n\n**Rabi (October-March):**\nWheat, Barley, Mustard, Gram, Potato, Pea\n\n**Zaid (March-June):**\nWatermelon, Muskmelon, Cucumber, Okra\n\n📝 Type any crop name to learn more!\n\nExample: 'wheat', 'rice', 'cotton'";
                break;
            case 'soil':
                response = lang === 'hi'
                    ? "🏔️ **मिट्टी के प्रकार:**\n\n• **जलोढ़** - नदी मैदान\n  → धान, गेहूं, गन्ना\n\n• **काली/रेगुर** - दक्कन पठार\n  → कपास, गन्ना (सर्वोत्तम)\n\n• **लाल** - दक्षिण भारत\n  → मूंगफली, रागी, आलू\n\n• **लैटेराइट** - पहाड़ी क्षेत्र\n  → चाय, कॉफी, रबर\n\n• **बलुई** - राजस्थान\n  → बाजरा, ग्वार, खजूर\n\n• **दोमट** - सभी फसलों के लिए आदर्श\n\n📝 विस्तृत जानकारी के लिए मिट्टी का नाम टाइप करें!"
                    : "🏔️ **Soil Types:**\n\n• **Alluvial** - River plains\n  → Rice, Wheat, Sugarcane\n\n• **Black/Regur** - Deccan plateau\n  → Cotton, Sugarcane (best)\n\n• **Red** - South India\n  → Groundnut, Ragi, Potato\n\n• **Laterite** - Hilly areas\n  → Tea, Coffee, Rubber\n\n• **Sandy** - Rajasthan\n  → Millet, Guar, Date palm\n\n• **Loamy** - Ideal for all crops\n\n📝 Type soil name for detailed info!";
                break;
            case 'weather':
                response = lang === 'hi'
                    ? "🌤️ **मौसम जानकारी**\n\nडैशबोर्ड में 'मौसम' सेक्शन देखें:\n\n☀️ वर्तमान तापमान और स्थिति\n💧 आर्द्रता और हवा की गति\n📅 7-दिन का पूर्वानुमान\n🌱 कृषि-आधारित सुझाव\n\n**मौसम के अनुसार खेती:**\n• बारिश से पहले खाद डालें\n• तेज धूप में सिंचाई न करें\n• पाला पड़ने पर हल्की सिंचाई\n• आंधी से पहले फसल की सुरक्षा"
                    : "🌤️ **Weather Information**\n\nCheck 'Weather' section in dashboard:\n\n☀️ Current temperature & conditions\n💧 Humidity and wind speed\n📅 7-day forecast\n🌱 Agriculture-based tips\n\n**Season-wise Farming:**\n• Apply fertilizer before rain\n• Avoid irrigation in peak sun\n• Light irrigation during frost\n• Protect crops before storms";
                break;
        }
        
        this.addBotMessage(response);
    }
    
    // Helper methods
    matchesAny(text, patterns) {
        return patterns.some(pattern => text.includes(pattern));
    }
    
    matchesCropInHindi(text, crop) {
        const hindiNames = {
            rice: ['धान', 'चावल'],
            wheat: ['गेहूं', 'गेहुं'],
            cotton: ['कपास'],
            sugarcane: ['गन्ना'],
            maize: ['मक्का', 'भुट्टा'],
            potato: ['आलू']
        };
        return hindiNames[crop]?.some(name => text.includes(name)) || false;
    }
    
    formatMessage(text) {
        // Convert markdown-like formatting
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br>')
            .replace(/•/g, '<span class="bullet">•</span>');
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    getCurrentTime() {
        return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    scrollToBottom() {
        const container = document.getElementById('chatbot-messages');
        container.scrollTop = container.scrollHeight;
    }
    
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    updateChatbotLanguage() {
        // Update placeholder
        const input = document.getElementById('chatbot-input');
        if (input) {
            input.placeholder = t('typeMessage');
        }
        
        // Update header
        const headerSpan = document.querySelector('.chatbot-header-info span');
        if (headerSpan) {
            headerSpan.textContent = t('chatbotTitle');
        }
    }
}

// Initialize chatbot when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.agritechChatbot = new AgriTechChatbot();
});
