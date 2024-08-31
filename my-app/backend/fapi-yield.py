from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd
import numpy as np
import logging

# Initialize the Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load the trained model and label encoders
try:
    with open(r"C:\Users\CHINMAY\OneDrive\Desktop\Agriguardian-2,0\best_crop_yield_model.pkl", 'rb') as model_file:
        model = pickle.load(model_file)
    
    with open(r"C:\Users\CHINMAY\OneDrive\Desktop\Agriguardian-2,0\label_encoders_yield.pkl", 'rb') as encoder_file:
        label_encoders = pickle.load(encoder_file)
except Exception as e:
    logger.error(f"Error loading model or encoders: {e}")
    raise

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json

        # Extract and validate the input data
        state_name = data.get('State_Name', '')
        district_name = data.get('District_Name', '')
        season = data.get('Season', '')
        crop = data.get('Crop', '')
        crop_year = data.get('Crop_Year', 0)
        area = data.get('Area', 0)

        # Handle unseen labels and missing values
        def encode_label(label, encoder):
            try:
                return encoder.transform([label])[0]
            except ValueError:
                return -1  # Or handle appropriately

        state_name_encoded = encode_label(state_name, label_encoders['State_Name'])
        district_name_encoded = encode_label(district_name, label_encoders['District_Name'])
        season_encoded = encode_label(season, label_encoders['Season'])
        crop_encoded = encode_label(crop, label_encoders['Crop'])

        # Ensure crop_year and area are numbers
        try:
            crop_year = float(crop_year)
            area = float(area)
        except ValueError:
            return jsonify({'error': 'Invalid numeric values for Crop_Year or Area'}), 400

        # Create a DataFrame for the input
        input_df = pd.DataFrame([{
            'State_Name': state_name_encoded,
            'District_Name': district_name_encoded,
            'Crop_Year': crop_year,
            'Season': season_encoded,
            'Crop': crop_encoded,
            'Area': area
        }])

        # Predict the crop production
        prediction = model.predict(input_df)
        result = {'predicted_production': float(prediction[0])}

        return jsonify(result)
    
    except Exception as e:
        logger.error(f"Error during prediction: {e}")
        return jsonify({'error': str(e)}), 400

@app.route('/options', methods=['GET'])
def get_options():
    try:
        options = {
            'State_Name': label_encoders['State_Name'].classes_.tolist(),
            'District_Name': label_encoders['District_Name'].classes_.tolist(),
            'Season': label_encoders['Season'].classes_.tolist(),
            'Crop': label_encoders['Crop'].classes_.tolist()
        }
        return jsonify(options)
    except Exception as e:
        logger.error(f"Error fetching options: {e}")
        return jsonify({'error': str(e)}), 400

# Add this at the end of your Flask file
if __name__ == '__main__':
    app.run(port=5002)
