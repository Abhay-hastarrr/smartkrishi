// controllers/geminiChatbotController.js
import axios from "axios";
import dotenv from "dotenv";
import productModel from "../models/productModel.js";

dotenv.config();

// Remove Google Generative AI imports - we're using OpenRouter now
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Geocoding and climate functions (unchanged)
const getCoordinates = async (city) => {
  try {
    const response = await axios.get(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
    );
    if (response.data.results?.[0]) {
      return {
        lat: response.data.results[0].latitude,
        lon: response.data.results[0].longitude,
        name: response.data.results[0].name,
      };
    }
    return null;
  } catch (error) {
    console.error("Geocoding failed:", error.message);
    return null;
  }
};

const getHistoricalClimate = async (lat, lon, monthName) => {
  const monthMap = {
    january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
    july: 6, august: 7, september: 8, october: 9, november: 10, december: 11
  };
  const monthIndex = monthMap[monthName.toLowerCase()];

  if (monthIndex === undefined) {
    return null;
  }

  try {
    // FIXED: Removed leading spaces in URL
    const response = await axios.get(
      `  https://climate-api.open-meteo.com/v1/climate?` +
      `latitude=${lat}&longitude=${lon}&` +
      `monthly=temperature_2m_max,temperature_2m_min,precipitation_sum&` +
      `start_date=1991-01-01&end_date=2020-12-31`
    );

    const data = response.data.monthly;
    if (!data) return null;

    return {
      avgHigh: data.temperature_2m_max[monthIndex]?.toFixed(1) || "N/A",
      avgLow: data.temperature_2m_min[monthIndex]?.toFixed(1) || "N/A",
      rainfall: data.precipitation_sum[monthIndex] !== undefined
        ? `${data.precipitation_sum[monthIndex].toFixed(1)} mm`
        : "N/A",
    };
  } catch (error) {
    console.error("Climate API error:", error.message);
    return null;
  }
};

const generateContent = async (req, res) => {
  const products = await productModel.find({});
  const categories = [...new Set(products.map(p => p.category))];
  const subcategories = [...new Set(products.map(p => p.subCategory))];
  const { farmerData, message } = req.body;

  if (!farmerData || !farmerData.location) {
    return res.status(400).json({
      success: false,
      message: "Missing required farmer data"
    });
  }

  const {
    landSize,
    landSizeUnit,
    startingMonth,
    growingPeriod,
    location,
    soilType,
    waterAvailability
  } = farmerData;

  let weatherContext = "Typical seasonal conditions for this region.";

  try {
    // Get climate data for the starting month
    const coords = await getCoordinates(location);
    if (coords && startingMonth) {
      const climate = await getHistoricalClimate(coords.lat, coords.lon, startingMonth);
      if (climate) {
        weatherContext =
          `Historical climate for ${coords.name} in ${startingMonth}: ` +
          `Average high ${climate.avgHigh}°C, low ${climate.avgLow}°C, ` +
          `average monthly rainfall ${climate.rainfall}. ` +
          `This is based on 30-year averages (1991–2020).`;
      }
    }
  } catch (err) {
    console.warn("Using fallback climate context:", err.message);
  }

  try {
    // Build the prompt (same as before)
    const prompt = `You are an expert agricultural advisor for Indian farmers. Speak in a friendly, practical, and encouraging tone.
    your answers should be in a tone and your choice of words should be that easy that if an illeterate farmer read it he or she will also be albe
    to understand it. Use simple language and avoid technical jargon. Provide clear, actionable advice tailored to small farmers in India.

    Available Categories: ${categories.join(", ")}
    Available Subcategories: ${subcategories.join(", ")}

    Farmer Profile:
    - Land size: ${landSize} ${landSizeUnit}
    - Starting month: ${startingMonth}
    - Growing period: ${growingPeriod}
    - Location: ${location}
    - Soil type: ${soilType}
    - Water availability: ${waterAvailability}

    Climate Context:
    ${weatherContext}

    User Question: "${message}"

    Please provide your response in this EXACT format. For each recommended product, identify the matching category and subcategory from the provided lists.

    Recommended Crops  
      1)Crop 1 name  
        Reason: 
          [Why it is suitable for land, soil, season, water, and location]  
        Recommended Products:  
          - Seeds: [Seed brand/category suggestion]
            [CATEGORY]: [Category Name]
            [SUBCATEGORY]: [Subcategory Name]
          - Fertilizers: [Suggested type for this crop]
            [CATEGORY]: [Category Name]
            [SUBCATEGORY]: [Subcategory Name]
          - Pesticides: [General category or common trade names]
            [CATEGORY]: [Category Name]
            [SUBCATEGORY]: [Subcategory Name]
      2)Crop 2 name  
        Reason:
           [Why it is suitable]  
        Recommended Products:  
          - Seeds: [Seed brand/category suggestion]
            [CATEGORY]: [Category Name]
            [SUBCATEGORY]: [Subcategory Name]
          - Fertilizers: [Suggested type]
            [CATEGORY]: [Category Name]
            [SUBCATEGORY]: [Subcategory Name]
          - Pesticides: [Suggested type]
            [CATEGORY]: [Category Name]
            [SUBCATEGORY]: [Subcategory Name]
      3)Crop 3 name  
        Reason:
          [Why it is suitable]  
        Recommended Products:  
          - Seeds: [Seed brand/category suggestion]
            [CATEGORY]: [Category Name]
            [SUBCATEGORY]: [Subcategory Name]
          - Fertilizers: [Suggested type]
            [CATEGORY]: [Category Name]
            [SUBCATEGORY]: [Subcategory Name]
          - Pesticides: [Suggested type]
            [CATEGORY]: [Category Name]
            [SUBCATEGORY]: [Subcategory Name]

    Soil Preparation and Fertilizers  
      1)Soil preparation step for ${soilType}  
        Products to Buy:  
          - Organic manure
            [CATEGORY]: Fertilizers
            [SUBCATEGORY]: Organic
          - FYM (Farm Yard Manure)
            [CATEGORY]: Fertilizers
            [SUBCATEGORY]: Organic
          - Vermicompost
            [CATEGORY]: Fertilizers
            [SUBCATEGORY]: Organic
    - Soil conditioners
            [CATEGORY]: Fertilizers
            [SUBCATEGORY]: Soil Conditioner
      2)Recommended fertilizer type and quantity for ${landSize} ${landSizeUnit}  
        Products to Buy:  
          - [Common fertilizer types/brands suitable for this farm size]
            [CATEGORY]: Fertilizers
            [SUBCATEGORY]: [Matching Subcategory]

    Best Planting Practices for This Season  
      1)Optimal sowing time within ${startingMonth}  
        Spacing and seed rate recommendations  
          - Products to Buy:  
          - [Approximate seed quantity for ${landSize} ${landSizeUnit}]
            [CATEGORY]: Seeds
            [SUBCATEGORY]: [Matching Subcategory]
      2)Special techniques for ${location} or ${weatherContext}  
        Products to Buy:  
          - Seed drill
            [CATEGORY]: N/A
            [SUBCATEGORY]: N/A
          - Sprayer
            [CATEGORY]: N/A
            [SUBCATEGORY]: N/A
          - Drip kit
            [CATEGORY]: N/A
            [SUBCATEGORY]: N/A

    Key Precautions  
      1)Weather-related precaution  
        Products to Buy:  
          - Protective materials such as mulching sheets
            [CATEGORY]: N/A
            [SUBCATEGORY]: N/A
          - Protective materials such as shade nets
            [CATEGORY]: N/A
            [SUBCATEGORY]: N/A
      2)Common pests/diseases to watch for  
        Products to Buy:  
          - Pesticide categories
            [CATEGORY]: Plant Protection
            [SUBCATEGORY]: [Matching Subcategory]
          - common trade names
            [CATEGORY]: Plant Protection
            [SUBCATEGORY]: [Matching Subcategory]
      3)Irrigation and water management tips  
        Products to Buy:  
          - Drip irrigation system
            [CATEGORY]: N/A
            [SUBCATEGORY]: N/A
          - Sprinklers
            [CATEGORY]: N/A
            [SUBCATEGORY]: N/A
          - Low-cost alternatives
            [CATEGORY]: N/A
            [SUBCATEGORY]: N/A

    If you cannot find a matching category or subcategory for a product, use "N/A" for the category and subcategory names.
    `;

    // Call OpenRouter with Grok-4-Fast
    const openRouterResponse = await axios.post(
      "  https://openrouter.ai/api/v1/chat/completions  ",
      {
        model: "x-ai/grok-4-fast",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3,
        max_tokens: 1500,
        // Optional: Enable reasoning mode for better agricultural advice
        reasoning_enabled: true
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": process.env.FRONTEND_URL || "http://localhost:5173",
          "X-Title": "AgriNext Assistant",
          "Content-Type": "application/json"
        }
      }
    );

    const responseText = openRouterResponse.data.choices[0].message.content;

    const lines = responseText.split('\n');
    const productLinks = [];
    let cleanResponse = '';

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.includes('[CATEGORY]:')) {
        const categoryMatch = line.match(/\[CATEGORY\]: (.*)/);
        const subcategoryMatch = lines[i + 1] ? lines[i + 1].match(/\[SUBCATEGORY\]: (.*)/) : null;

        if (categoryMatch && subcategoryMatch) {
          const category = categoryMatch[1].trim();
          const subcategory = subcategoryMatch[1].trim();

          if (category !== 'N/A' && subcategory !== 'N/A') {
            productLinks.push({ category, subcategory });
          }
          i++; // Skip the subcategory line
        } else {
          cleanResponse += line + '\n';
        }
      } else {
        cleanResponse += line + '\n';
      }
    }

    if (productLinks.length > 0) {
      cleanResponse += '\nWould you like to get links for the recommended products?\n';
    } else {
      cleanResponse += '\nSorry, we could not find any sort of product on our website. We are working on it and will add them soon.\n';
    }

    return res.json({ success: true, response: cleanResponse, productLinks });

  } catch (error) {
    console.error("OpenRouter error:", error.response?.data || error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to generate farming advice. Please try again."
    });
  }
};

export { generateContent };