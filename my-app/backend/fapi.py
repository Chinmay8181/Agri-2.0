from flask import Flask, request, jsonify
import tensorflow as tf
import pickle
import numpy as np
from tensorflow.keras.preprocessing.image import img_to_array, load_img
import os
from flask_cors import CORS

# Initialize the Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS

# Define model and encoder paths
MODEL_PATH = r"C:\Users\CHINMAY\OneDrive\Desktop\Agriguardian-2,0\crop_yield_model.h5"
ENCODER_PATH = r"C:\Users\CHINMAY\OneDrive\Desktop\Agriguardian-2,0\label_encoders.pkl"

# Verify that the model file exists
if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError(f"Model file not found at: {MODEL_PATH}")

# Load the model
model = tf.keras.models.load_model(MODEL_PATH)

# Verify that the encoder file exists
if not os.path.exists(ENCODER_PATH):
    raise FileNotFoundError(f"Label encoder file not found at: {ENCODER_PATH}")

# Load the label encoders
with open(ENCODER_PATH, 'rb') as encoder_file:
    label_encoders = pickle.load(encoder_file)

# Define a function to preprocess the input image
def preprocess_image(image_path, target_size):
    image = load_img(image_path, target_size=target_size)
    image = img_to_array(image)
    image = np.expand_dims(image, axis=0)
    image /= 255.0  # Rescale image
    return image

# Define a route for predictions
@app.route('/predict', methods=['POST'])
def predict():
    # Ensure an image file was provided
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400

    # Get the file from the request
    file = request.files['file']

    # Save the file to a temporary location
    file_path = 'temp.jpg'
    file.save(file_path)

    # Preprocess the image
    processed_image = preprocess_image(file_path, target_size=(224, 224))

    # Make the prediction
    prediction = model.predict(processed_image)
    predicted_class = np.argmax(prediction, axis=1)

    # Decode the predicted class using the label encoders
    inverse_label_map = {v: k for k, v in label_encoders.items()}
    predicted_label = inverse_label_map[predicted_class[0]]

    # Return the prediction as JSON
    return jsonify({'predicted_class': predicted_label, 'confidence': float(np.max(prediction))})

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
