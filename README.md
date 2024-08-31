# Agri-2.0

## Overview

Agri-2.0 is an integrated digital platform designed to address the key challenges faced by farmers today. By leveraging advanced technologies such as AI, machine learning, and data analytics, Agri-2.0 provides farmers with tools to make informed decisions, optimize farming practices, and ultimately increase productivity and profitability.

## Features

- **Yield Prediction**: AI-driven predictions based on soil health, weather patterns, and historical data to help farmers plan their crops more effectively.
- **Disease Detection**: Early identification of crop diseases using image processing and machine learning, minimizing potential crop losses.
- **Price Calculator**: Accurate market price forecasts based on historical data and global trends, allowing farmers to sell at the best possible prices.
- **Soil Analysis**: Comprehensive assessment of soil quality, providing tailored crop recommendations and treatment plans.
- **Weather Prediction**: Real-time weather forecasts that guide planting, irrigation, and harvesting schedules.
- **E-Commerce Integration**: A platform that connects farmers directly with buyers, ensuring fair prices and reducing reliance on intermediaries.
- **Chatbot**: AI-powered chatbot providing financial advice, including access to government schemes and insurance options.

## Installation

### 1. Clone the Repository

To begin using Agri-2.0, clone the repository to your local machine:

```bash
git clone https://github.com/Chinmay8181/Agri-2.0
cd Agri-2.0


### 2. Install Required Python Dependencies
Next, install the required dependencies by running:

bash
Copy code
pip install -r requirements.txt
## Prerequisites
### 1. Download Models and Dataset
Download the necessary model files and datasets from Google Drive. You can download the files from the following link: 

Google Drive Link = https://drive.google.com/drive/folders/1hhi8HjdHAgqoSTDfT1Pj2JBDk11t6lDa?usp=drive_link
### 2. Update Paths in Code
Once you've downloaded the models and datasets, make sure to update the paths in the code to reflect the location of the downloaded files.

In fapi.py, update the following paths:
python
Copy code
MODEL_PATH = "path/to/crop_yield_model.h5"
ENCODER_PATH = "path/to/label_encoders.pkl"
In fapi-price-pred.py, update the path to the CSV file:
python
Copy code
data = pd.read_csv("path/to/9ef84268-d588-465a-a308-a864a43d0070.csv")
In fapi-yield.py, update the paths to the model and encoders:
python
Copy code
with open("path/to/best_crop_yield_model.pkl", 'rb') as model_file:
    model = pickle.load(model_file)

with open("path/to/label_encoders_yield.pkl", 'rb') as encoder_file:
    label_encoders = pickle.load(encoder_file)
### 3. Add Your Gemini API Key
To integrate the chatbot functionality with the Gemini AI API, you will need to add your Gemini API key.

Navigate to the following file:

Agri-2.0/my-app/components/universal/Chatbot.jsx
Then, update the API key as follows:

javascript
Copy code
const genAI = new GoogleGenerativeAI("GEMINI_API_KEY");
### 4. Use the Dataset for Disease Detection
To use the disease detection feature, make sure to download the relevant dataset from the Google Drive link provided above. Use the images from this dataset for disease detection.

Technology Stack
Front-End: Next.js, Tailwind CSS, Material UI, React Leaflet
Back-End: Firebase, Flask, CORS
Model Training: Pickle, NumPy, TensorFlow, Pandas, Scikit-learn
## Usage
### 1. Running the Flask Backend

run fapi.py,
fapi-price-pred.py,
fapi-yield.py
fapi-soil.py in different terminals

### 2. Starting the Front-End Application
cd my-app
npm run dev
This will start the development server and allow you to interact with the Agri-2.0 platform through the web interface.


Contribution
Contributions are welcome! If you'd like to contribute to Agri-2.0, please feel free to submit issues, feature requests, or pull requests. All forms of help are appreciated.