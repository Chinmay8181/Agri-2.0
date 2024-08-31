# Agri-2.0

## Overview of the website 

Agri-2.0 is an integrated digital platform designed to address the key challenges faced by farmers today. By leveraging advanced technologies such as AI, machine learning, and data analytics, Agri-2.0 provides farmers with tools to make informed decisions, optimize farming practices, and ultimately increase productivity and profitability.

## Youtube Video Link
https://youtu.be/g81cOqYadBA

## Homepage
![Homepage](imgs/Screenshot_20240831_083034.png)
## Features

- **Crop Disease Detection**
  ![Crop Disease Detection](imgs/Screenshot_20240831_083309.png)
  Uses CNN to identify six crop diseases from uploaded images, enabling early intervention to reduce losses.

- **Crop Yield Prediction**
  ![Crop Yield Prediction](imgs/Screenshot_20240831_083208.png)
  Employs a Random Forest model with 83% accuracy to forecast yields, aiding in resource planning and management.

- **Price Forecasting**
  ![Price Forecasting](imgs/Screenshot_20240831_083553.png)
  Fine-tuned with Gemini’s Min-Max and Modal Class methods, this feature predicts market prices to help farmers sell at optimal times.
  
- **Soil Analysis**
  Utilizes a Random Forest model with 91% accuracy for detailed soil insights, offering crop and fertilization recommendations.

- **Fertilizer Calculation**
  Calculates optimal fertilizer use based on NPK ratios and crop requirements, promoting cost-effective nutrient management.

- **Crop Rotation Planning**
  ![Crop Rotation Planning](imgs/Screenshot_20240831_083629.png)
  Uses a KNN model (85% accuracy) to suggest optimal crop sequences, maintaining soil health and productivity.

- **E-Commerce Integration**
  ![E-Commerce Integration](imgs/Screenshot_20240831_083717.png)
  Connects farmers directly with buyers, removing intermediaries to ensure fair pricing and better market access.

- **Chatbot for Financial Advice and Government Schemes**
  ![Chatbot](imgs/Screenshot_20240831_083822.png)
  Provides financial guidance and information on relevant government schemes to support farmer decisions.

- **Weather Forecasting and Disaster Management**
  ![Weather Forecasting](imgs/Screenshot_20240831_083651.png)
  Delivers 7-day weather updates and alerts to help farmers plan activities and mitigate risks.

## Flowchart
# AgriGuardian 360 Project Overview

```mermaid
graph TD;
    classDef title fill:#2c3e50,stroke:#2c3e50,stroke-width:4px,color:#fff,font-size:24px;
    classDef feature fill:#e67e22,stroke:#d35400,stroke-width:2px,color:#fff,font-size:20px;
    classDef detail fill:#1abc9c,stroke:#16a085,stroke-width:2px,color:#fff,font-size:18px;
    classDef impact fill:#f39c12,stroke:#e74c3c,stroke-width:3px,color:#fff,font-size:20px;
    classDef implementation fill:#8e44ad,stroke:#9b59b6,stroke-width:3px,color:#fff,stroke-dasharray: 5 5,font-size:20px;

    A[AgriGuardian 360 Project Overview]:::title -->|Key Features| B[Feature Overview]:::feature

    B -->|Crop Disease Detection - 92% Accuracy| C1[CNN-based System: Detects six crop diseases from images, enabling early action and better yields]:::detail

    B -->|Crop Yield Prediction - 89% Accuracy| D1[Random Forest Model: Predicts yield based on data and weather, aiding in resource planning]:::detail

    B -->|Soil Analysis - 85% Accuracy| E1[Random Forest Model: Analyzes pH, texture, nutrients, providing crop and fertilizer recommendations]:::detail

    B -->|Price Forecasting - 88% Accuracy| F1[AI Models with Gemini's Min-Max and Modal Class Methods: Predicts market prices, minimizing losses and maximizing profits]:::detail

    B -->|Fertilizer Calculation| G1[Optimal Fertilizer Recommendations: Considers NPK ratio and crop needs, promoting sustainable farming]:::detail

    B -->|Crop Rotation Planning| H1[K-Nearest Neighbors Model: Suggests best crop sequences to maintain soil health]:::detail

    B -->|E-Commerce Integration| I1[Connects Farmers with Buyers: Removes middlemen, ensuring fair prices and improving farmers' income]:::detail

    B -->|Chatbot for Financial Advice and Government Schemes| J1[AI-powered Chatbot: Provides financial advice and scheme info, aiding better financial decisions]:::detail

    B -->|Weather Forecast Integration| K1[AI-driven Hyper-local Weather Forecasts: Provides real-time and predicted weather data for informed decisions on irrigation, planting, harvesting]:::detail

    B -->|Implementation| L1[Integration of AI/ML Models: Processes real-time data, accessible via web and mobile apps]:::implementation

    B -->|Impact| M1[Enhancing Productivity, Reducing Risks, Promoting Sustainability, Empowering Farmers, Supporting the Backbone of the Nation]:::impact

    L1 --> N1[Transforms Agriculture in India: Provides tools and support to farmers]:::impact

    linkStyle 0,1,2,3,4,5,6,7,8,9,10,11 stroke:#2c3e50,stroke-width:2px,color:#2980b9,stroke-dasharray: 5 5;
```


## Installation

### 1. Clone the Repository

To begin using Agri-2.0, clone the repository to your local machine:

```bash
git clone https://github.com/Chinmay8181/Agri-2.0
cd Agri-2.0
```

### 2. Install Required Python Dependencies

Next, install the required dependencies by running:

```bash
pip install -r requirements.txt
```

### 3. Prerequisites

#### 1. Download Models and Dataset

Download the necessary model files and datasets from Google Drive. You can download the files from the following link: [Google Drive Link](https://drive.google.com/drive/folders/1hhi8HjdHAgqoSTDfT1Pj2JBDk11t6lDa?usp=drive_link)

#### 2. Update Paths in Code

Once you've downloaded the models and datasets, make sure to update the paths in the code to reflect the location of the downloaded files.

In `fapi.py`, update the following paths:

```python
MODEL_PATH = "path/to/crop_yield_model.h5"
ENCODER_PATH = "path/to/label_encoders.pkl"
```

In `fapi-price-pred.py`, update the path to the CSV file:

```python
data = pd.read_csv("path/to/9ef84268-d588-465a-a308-a864a43d0070.csv")
```

In `fapi-yield.py`, update the paths to the model and encoders:

```python
with open("path/to/best_crop_yield_model.pkl", 'rb') as model_file:
    model = pickle.load(model_file)

with open("path/to/label_encoders_yield.pkl", 'rb') as encoder_file:
    label_encoders = pickle.load(encoder_file)
```

#### 3. Add Your Gemini API Key

To integrate the chatbot functionality with the Gemini AI API, you will need to add your Gemini API key.

Navigate to the following file:

`Agri-2.0/my-app/components/universal/Chatbot.jsx`

Then, update the API key as follows:

```javascript
const genAI = new GoogleGenerativeAI("GEMINI_API_KEY");
```

#### 4. Use the Dataset for Disease Detection

To use the disease detection feature, make sure to download the relevant dataset from the Google Drive link provided above. Use the images from this dataset for disease detection.

## Technology Stack

- **Front-End**: Next.js, Tailwind CSS, Material UI, React Leaflet
- **Back-End**: Firebase, Flask, CORS
- **Model Training**: Pickle, NumPy, TensorFlow, Pandas, Scikit-learn

## Usage

### 1. Running the Flask Backend

Run the following files in different terminals:

```bash
python fapi.py
python fapi-price-pred.py
python fapi-yield.py
python fapi-soil.py
```

### 2. Starting the Front-End Application

Navigate to the front-end application directory and start the Next.js application:

```bash
cd my-app
npm run dev
```

This will start the development server and allow you to interact with the Agri-2.0 platform through the web interface.

