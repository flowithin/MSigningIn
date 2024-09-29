from flask import Flask, request, jsonify, render_template
import base64
from inference_sdk import InferenceHTTPClient
import re

app = Flask(__name__)

# Initialize the Inference Client
CLIENT = InferenceHTTPClient(
    api_url="https://detect.roboflow.com",
    api_key="BT4KxlE2juKk8VYpNYt3"
)

# Route to render the homepage
@app.route('/')
def index():
    return render_template('index.html')

# Function to decode Base64 image
def decode_base64_image(data):
    # Remove the data:image/jpeg;base64, part
    img_str = re.sub('^data:image/.+;base64,', '', data)
    return base64.b64decode(img_str)

# Route to handle frame uploads
@app.route('/upload_frame', methods=['POST'])
def upload_frame():
    data = request.get_json()

    # Decode the Base64 image
    image_data = decode_base64_image(data['image'])

    # Run inference on the image using Roboflow API
    encoded_image = base64.b64encode(image_data).decode('utf-8')
    result = CLIENT.infer(encoded_image, model_id="american-sign-language-letters/6")
    
    # Extract predictions
    predictions = result.get('predictions', [])
    class_values = [pred['class'] for pred in predictions] if predictions else []
    return jsonify({"predictions": class_values})

if __name__ == '__main__':
    app.run(debug=True)

