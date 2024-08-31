from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

# Load your data into a DataFrame
# Assuming the data is stored in a CSV file named 'data.csv'
data = pd.read_csv(r"my-app\backend\9ef84268-d588-465a-a308-a864a43d0070.csv")

def get_price_info(data, state, district, market, commodity, variety, grade):
    # Filter the dataset based on the input parameters
    filtered_data = data[(data['State'] == state) & 
                         (data['District'] == district) & 
                         (data['Market'] == market) & 
                         (data['Commodity'] == commodity) & 
                         (data['Variety'] == variety) & 
                         (data['Grade'] == grade)]
    
    if filtered_data.empty:
        return "No matching data found"
    
    # Extract the price information
    min_price = filtered_data['Min_x0020_Price'].values[0]
    max_price = filtered_data['Max_x0020_Price'].values[0]
    modal_price = filtered_data['Modal_x0020_Price'].values[0]
    
    return {
        'Min Price': min_price,
        'Max Price': max_price,
        'Modal Price': modal_price
    }

@app.route('/get_price_info', methods=['GET'])
def price_info():
    # Get parameters from the request
    state = request.args.get('state')
    district = request.args.get('district')
    market = request.args.get('market')
    commodity = request.args.get('commodity')
    variety = request.args.get('variety')
    grade = request.args.get('grade')
    
    # Validate parameters
    if not all([state, district, market, commodity, variety, grade]):
        return jsonify({'error': 'Missing parameters'}), 400
    
    # Get the price information
    result = get_price_info(data, state, district, market, commodity, variety, grade)
    
    return jsonify(result)

@app.route('/get_options', methods=['GET'])
def get_options():
    state = request.args.get('state')
    district = request.args.get('district')
    market = request.args.get('market')
    commodity = request.args.get('commodity')
    variety = request.args.get('variety')

    filtered_data = data

    if state:
        filtered_data = filtered_data[filtered_data['State'] == state]
    if district:
        filtered_data = filtered_data[filtered_data['District'] == district]
    if market:
        filtered_data = filtered_data[filtered_data['Market'] == market]
    if commodity:
        filtered_data = filtered_data[filtered_data['Commodity'] == commodity]
    if variety:
        filtered_data = filtered_data[filtered_data['Variety'] == variety]

    options = {
        'State': data['State'].unique().tolist(),
        'District': filtered_data['District'].unique().tolist(),
        'Market': filtered_data['Market'].unique().tolist(),
        'Commodity': filtered_data['Commodity'].unique().tolist(),
        'Variety': filtered_data['Variety'].unique().tolist(),
        'Grade': filtered_data['Grade'].unique().tolist()
    }
    return jsonify(options)

if __name__ == '__main__':
    app.run(port=5010)