from flask import Flask, request, jsonify
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

# Soil and crop data
soil_data = {
    "Plains of Gujarat": {
        "Soil Type": "Alluvial",
        "Rich in": ["Potash", "Lime"],
        "Lacks in": ["Nitrogen", "Phosphorous"],
        "Crops": ["Wheat", "Rice", "Sugarcane", "Cotton", "Jute"]
    },
    "Punjab": {
        "Soil Type": "Alluvial",
        "Rich in": ["Potash", "Lime"],
        "Lacks in": ["Nitrogen", "Phosphorous"],
        "Crops": ["Wheat", "Rice", "Sugarcane", "Cotton", "Jute"]
    },
    "Haryana": {
        "Soil Type": "Alluvial",
        "Rich in": ["Potash", "Lime"],
        "Lacks in": ["Nitrogen", "Phosphorous"],
        "Crops": ["Wheat", "Rice", "Sugarcane", "Cotton", "Jute"]
    },
    "UP": {
        "Soil Type": "Alluvial",
        "Rich in": ["Potash", "Lime"],
        "Lacks in": ["Nitrogen", "Phosphorous"],
        "Crops": ["Wheat", "Rice", "Sugarcane", "Cotton", "Jute"]
    },
    "Bihar": {
        "Soil Type": "Alluvial",
        "Rich in": ["Potash", "Lime"],
        "Lacks in": ["Nitrogen", "Phosphorous"],
        "Crops": ["Wheat", "Rice", "Sugarcane", "Cotton", "Jute"]
    },
    "Jharkhand": {
        "Soil Type": "Alluvial",
        "Rich in": ["Potash", "Lime"],
        "Lacks in": ["Nitrogen", "Phosphorous"],
        "Crops": ["Wheat", "Rice", "Sugarcane", "Cotton", "Jute"]
    },
    "Deccan Plateau, Maharashtra": {
        "Soil Type": "Black (Regur soil)",
        "Rich in": ["Lime", "Iron", "Magnesia", "Alumina", "Potash"],
        "Lacks in": ["Phosphorous", "Nitrogen", "Organic matter"],
        "Crops": ["Cotton", "Sugarcane", "Jowar", "Tobacco", "Wheat", "Rice"]
    },
    "Deccan Plateau, Madhya Pradesh": {
        "Soil Type": "Black (Regur soil)",
        "Rich in": ["Lime", "Iron", "Magnesia", "Alumina", "Potash"],
        "Lacks in": ["Phosphorous", "Nitrogen", "Organic matter"],
        "Crops": ["Cotton", "Sugarcane", "Jowar", "Tobacco", "Wheat", "Rice"]
    },
    "Deccan Plateau, Gujarat": {
        "Soil Type": "Black (Regur soil)",
        "Rich in": ["Lime", "Iron", "Magnesia", "Alumina", "Potash"],
        "Lacks in": ["Phosphorous", "Nitrogen", "Organic matter"],
        "Crops": ["Cotton", "Sugarcane", "Jowar", "Tobacco", "Wheat", "Rice"]
    },
    "Deccan Plateau, Andhra Pradesh": {
        "Soil Type": "Black (Regur soil)",
        "Rich in": ["Lime", "Iron", "Magnesia", "Alumina", "Potash"],
        "Lacks in": ["Phosphorous", "Nitrogen", "Organic matter"],
        "Crops": ["Cotton", "Sugarcane", "Jowar", "Tobacco", "Wheat", "Rice"]
    },
    "Deccan Plateau, Tamil Nadu": {
        "Soil Type": "Black (Regur soil)",
        "Rich in": ["Lime", "Iron", "Magnesia", "Alumina", "Potash"],
        "Lacks in": ["Phosphorous", "Nitrogen", "Organic matter"],
        "Crops": ["Cotton", "Sugarcane", "Jowar", "Tobacco", "Wheat", "Rice"]
    },
    "Valleys of Krishna": {
        "Soil Type": "Black (Regur soil)",
        "Rich in": ["Lime", "Iron", "Magnesia", "Alumina", "Potash"],
        "Lacks in": ["Phosphorous", "Nitrogen", "Organic matter"],
        "Crops": ["Cotton", "Sugarcane", "Jowar", "Tobacco", "Wheat", "Rice"]
    },
    "Valleys of Godavari": {
        "Soil Type": "Black (Regur soil)",
        "Rich in": ["Lime", "Iron", "Magnesia", "Alumina", "Potash"],
        "Lacks in": ["Phosphorous", "Nitrogen", "Organic matter"],
        "Crops": ["Cotton", "Sugarcane", "Jowar", "Tobacco", "Wheat", "Rice"]
    },
    "Eastern Deccan Plateau": {
        "Soil Type": "Red",
        "Rich in": ["Iron", "Potash"],
        "Lacks in": ["Nitrogen", "Phosphorous", "Humus"],
        "Crops": ["Wheat", "Rice", "Cotton", "Sugarcane", "Pulses"]
    },
    "Southern Deccan Plateau": {
        "Soil Type": "Red",
        "Rich in": ["Iron", "Potash"],
        "Lacks in": ["Nitrogen", "Phosphorous", "Humus"],
        "Crops": ["Wheat", "Rice", "Cotton", "Sugarcane", "Pulses"]
    },
    "Orissa": {
        "Soil Type": "Red",
        "Rich in": ["Iron", "Potash"],
        "Lacks in": ["Nitrogen", "Phosphorous", "Humus"],
        "Crops": ["Wheat", "Rice", "Cotton", "Sugarcane", "Pulses"]
    },
    "Chhattisgarh": {
        "Soil Type": "Red",
        "Rich in": ["Iron", "Potash"],
        "Lacks in": ["Nitrogen", "Phosphorous", "Humus"],
        "Crops": ["Wheat", "Rice", "Cotton", "Sugarcane", "Pulses"]
    },
    "Southern Ganga Plain": {
        "Soil Type": "Red",
        "Rich in": ["Iron", "Potash"],
        "Lacks in": ["Nitrogen", "Phosphorous", "Humus"],
        "Crops": ["Wheat", "Rice", "Cotton", "Sugarcane", "Pulses"]
    },
    "Karnataka": {
        "Soil Type": "Laterite",
        "Rich in": ["Iron oxide", "Potash"],
        "Lacks in": ["Organic matter", "Nitrogen", "Phosphate", "Calcium"],
        "Crops": ["Cashew nuts", "Tea", "Coffee", "Rubber"]
    },
    "Kerala": {
        "Soil Type": "Laterite",
        "Rich in": ["Iron oxide", "Potash"],
        "Lacks in": ["Organic matter", "Nitrogen", "Phosphate", "Calcium"],
        "Crops": ["Cashew nuts", "Tea", "Coffee", "Rubber"]
    },
    "Tamil Nadu": {
        "Soil Type": "Laterite",
        "Rich in": ["Iron oxide", "Potash"],
        "Lacks in": ["Organic matter", "Nitrogen", "Phosphate", "Calcium"],
        "Crops": ["Cashew nuts", "Tea", "Coffee", "Rubber"]
    },
    "Madhya Pradesh": {
        "Soil Type": "Laterite",
        "Rich in": ["Iron oxide", "Potash"],
        "Lacks in": ["Organic matter", "Nitrogen", "Phosphate", "Calcium"],
        "Crops": ["Cashew nuts", "Tea", "Coffee", "Rubber"]
    },
    "Assam Hills": {
        "Soil Type": "Laterite",
        "Rich in": ["Iron oxide", "Potash"],
        "Lacks in": ["Organic matter", "Nitrogen", "Phosphate", "Calcium"],
        "Crops": ["Cashew nuts", "Tea", "Coffee", "Rubber"]
    },
    "Orissa Hills": {
        "Soil Type": "Laterite",
        "Rich in": ["Iron oxide", "Potash"],
        "Lacks in": ["Organic matter", "Nitrogen", "Phosphate", "Calcium"],
        "Crops": ["Cashew nuts", "Tea", "Coffee", "Rubber"]
    },
    "Western Rajasthan": {
        "Soil Type": "Arid and Desert",
        "Rich in": ["Soluble salts", "Phosphate"],
        "Lacks in": ["Humus", "Nitrogen"],
        "Crops": ["Barley", "Rape", "Cotton", "Millets", "Maize", "Pulses"]
    },
    "North Gujarat": {
        "Soil Type": "Arid and Desert",
        "Rich in": ["Soluble salts", "Phosphate"],
        "Lacks in": ["Humus", "Nitrogen"],
        "Crops": ["Barley", "Rape", "Cotton", "Millets", "Maize", "Pulses"]
    },
    "Southern Punjab": {
        "Soil Type": "Arid and Desert",
        "Rich in": ["Soluble salts", "Phosphate"],
        "Lacks in": ["Humus", "Nitrogen"],
        "Crops": ["Barley", "Rape", "Cotton", "Millets", "Maize", "Pulses"]
    },
    "Western Gujarat": {
        "Soil Type": "Saline and Alkaline",
        "Rich in": ["Sodium", "Potassium", "Magnesium"],
        "Lacks in": ["Nitrogen", "Calcium"],
        "Crops": ["Unfit for agriculture"]
    },
    "Eastern Coast Deltas": {
        "Soil Type": "Saline and Alkaline",
        "Rich in": ["Sodium", "Potassium", "Magnesium"],
        "Lacks in": ["Nitrogen", "Calcium"],
        "Crops": ["Unfit for agriculture"]
    },
    "Sunderban Areas, West Bengal": {
        "Soil Type": "Saline and Alkaline",
        "Rich in": ["Sodium", "Potassium", "Magnesium"],
        "Lacks in": ["Nitrogen", "Calcium"],
        "Crops": ["Unfit for agriculture"]
    },
    "Punjab": {
        "Soil Type": "Saline and Alkaline",
        "Rich in": ["Sodium", "Potassium", "Magnesium"],
        "Lacks in": ["Nitrogen", "Calcium"],
        "Crops": ["Unfit for agriculture"]
    },
    "Haryana": {
        "Soil Type": "Saline and Alkaline",
        "Rich in": ["Sodium", "Potassium", "Magnesium"],
        "Lacks in": ["Nitrogen", "Calcium"],
        "Crops": ["Unfit for agriculture"]
    }
}

# Crop rotation suggestions to balance soil nutrients
crop_rotation = {
    "Wheat": "Pulses",
    "Rice": "Legumes",
    "Sugarcane": "Pulses",
    "Cotton": "Groundnut",
    "Jute": "Legumes",
    "Jowar": "Pulses",
    "Tobacco": "Legumes",
    "Pulses": "Cereal grains",
    "Barley": "Legumes",
    "Millets": "Pulses",
    "Maize": "Legumes",
    "Cashew nuts": "Groundnut",
    "Tea": "Legumes",
    "Coffee": "Legumes",
    "Rubber": "Groundnut"
}

# Fertilizer application rates and NPK ratios
fertilizer_data = {
    "Rice": {"rate": (80, 120, 40), "npk_ratio": "2:1:0.5"},
    "Wheat": {"rate": (120, 60, 40), "npk_ratio": "2:1:0.33"},
    "Maize": {"rate": (120, 60, 60), "npk_ratio": "2:1:1"},
    "Cotton": {"rate": (80, 40, 80), "npk_ratio": "2:1:2"},
    "Sugarcane": {"rate": (200, 100, 100), "npk_ratio": "2:1:1"},
    "Banana": {"rate": (400, 200, 600), "npk_ratio": "2:1:3"},
    "Mango": {"rate": (500, 250, 750), "npk_ratio": "2:1:3"},
    "Cashew": {"rate": (500, 250, 500), "npk_ratio": "2:1:2"}
}

# Function to get soil info
def get_soil_info(region):
    return soil_data.get(region, "Region not found. Please enter a valid region.")

# Function to suggest next suitable crop
def suggest_next_crop(current_crop):
    return crop_rotation.get(current_crop, "No specific suggestion available.")

# Function to calculate fertilizer needs and cost
def calculate_fertilizer_and_cost(crop, land_size, cost_per_kg):
    try:
        land_size = float(land_size)
        cost_per_kg = float(cost_per_kg)
        
        if crop in fertilizer_data:
            rates = fertilizer_data[crop]['rate']
            total_fertilizer = [rate * land_size for rate in rates]
            total_cost = sum(total_fertilizer) * cost_per_kg

            return {
                "total_fertilizer": total_fertilizer,
                "npk_ratio": fertilizer_data[crop]['npk_ratio'],
                "total_cost": total_cost
            }
        else:
            return {"error": f"Fertilizer data for {crop} is not available."}
    except ValueError:
        return {"error": "Invalid land_size or cost_per_kg. Please enter numeric values."}
    except Exception as e:
        return {"error": f"An unexpected error occurred: {str(e)}"}
# Flask routes

@app.route('/areas', methods=['GET'])
def get_areas():
    return jsonify(list(soil_data.keys()))

@app.route('/area/<region>', methods=['GET'])
def get_area_info(region):
    soil_info = get_soil_info(region)
    return jsonify(soil_info)

@app.route('/crop_rotation', methods=['GET'])
def get_next_crop():
    current_crop = request.args.get('current_crop')
    next_crop = suggest_next_crop(current_crop)
    return jsonify({"next_crop": next_crop})

@app.route('/fertilizer', methods=['POST'])
def get_fertilizer_info():
    data = request.json
    crop = data.get('crop')
    land_size = data.get('land_size')
    cost_per_kg = data.get('cost_per_kg')

    if not crop or not land_size or not cost_per_kg:
        return jsonify({"error": "Please provide crop, land_size, and cost_per_kg"}), 400

    result = calculate_fertilizer_and_cost(crop, land_size, cost_per_kg)
    return jsonify(result)

if __name__ == '__main__':
   app.run(port=5005)
