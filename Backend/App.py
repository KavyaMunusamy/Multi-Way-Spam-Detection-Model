# # from flask import Flask, render_template, request
# # import pandas as pd
# # from sklearn.feature_extraction.text import CountVectorizer
# # from sklearn.naive_bayes import MultinomialNB
# # from sklearn.model_selection import train_test_split

# # app = Flask(__name__)

# # @app.route('/')
# # def home():
# #     return render_template('index.html')

# # @app.route('/predict', methods=['POST'])
# # def predict():
# #     df = pd.read_csv(r"C:\Users\Dharshii\OneDrive\Desktop\chatbot\spam\NLP_Flask_Model\spam.csv", encoding="latin-1")
# #     df.drop(['Unnamed: 2', 'Unnamed: 3', 'Unnamed: 4'], axis=1, inplace=True)
# #     # Features and Labels
# #     df['label'] = df['class'].map({'ham': 0, 'spam': 1})
# #     X = df['message']
# #     y = df['label']
# #     # Extract Feature With CountVectorizer
# #     cv = CountVectorizer()
# #     X = cv.fit_transform(X)  # Fit the Data
# #     X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.33, random_state=42)
# #     # Naive Bayes Classifier
# #     clf = MultinomialNB()
# #     clf.fit(X_train, y_train)
# #     clf.score(X_test, y_test)
# #     if request.method == 'POST':
# #         message = request.form['message']
# #         data = [message]
# #         vect = cv.transform(data).toarray()
# #         my_prediction = clf.predict(vect)
# #     return render_template('index.html', prediction=my_prediction)

# # if __name__ == '__main__':
# #     app.run()

# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import pandas as pd
# from sklearn.feature_extraction.text import CountVectorizer
# from sklearn.naive_bayes import MultinomialNB
# from sklearn.model_selection import train_test_split

# app = Flask(__name__)
# CORS(app)  # Allow frontend to communicate with backend

# # Load and preprocess data
# df = pd.read_csv(r"C:\Users\Dharshii\OneDrive\Desktop\chatbot\spam\NLP_Flask_Model\spam.csv", encoding="latin-1")
# df.drop(['Unnamed: 2', 'Unnamed: 3', 'Unnamed: 4'], axis=1, inplace=True)
# df['label'] = df['class'].map({'ham': 0, 'spam': 1})
# X = df['message']
# y = df['label']

# # Feature extraction
# cv = CountVectorizer()
# X = cv.fit_transform(X)

# # Train the model
# X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.33, random_state=42)
# clf = MultinomialNB()
# clf.fit(X_train, y_train)

# @app.route('/predict', methods=['POST'])
# def predict():
#     try:
#         data = request.json
#         message = data.get('message', '')
#         if not message:
#             return jsonify({"error": "No message provided"}), 400

#         vect = cv.transform([message]).toarray()
#         prediction = clf.predict(vect)[0]

#         return jsonify({"prediction": 1 if prediction == 1 else 0})
    
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# if __name__ == '__main__':
#     app.run(debug=True)



from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.model_selection import train_test_split
import pytesseract
from PIL import Image
import re

app = Flask(__name__)
CORS(app)  # Allow frontend to communicate with backend

# Load and preprocess data for text-based spam detection
df = pd.read_csv(r"C:\Users\Dharshii\OneDrive\Desktop\chatbot\spam\NLP_Flask_Model\spam.csv", encoding="latin-1")
df.drop(['Unnamed: 2', 'Unnamed: 3', 'Unnamed: 4'], axis=1, inplace=True)
df['label'] = df['class'].map({'ham': 0, 'spam': 1})
X = df['message']
y = df['label']

# Feature extraction
cv = CountVectorizer()
X = cv.fit_transform(X)

# Train the model
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.33, random_state=42)
clf = MultinomialNB()
clf.fit(X_train, y_train)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        message = data.get('message', '')
        if not message:
            return jsonify({"error": "No message provided"}), 400

        vect = cv.transform([message]).toarray()
        prediction = clf.predict(vect)[0]

        return jsonify({"prediction": 1 if prediction == 1 else 0})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Image-based spam detection
@app.route('/analyze', methods=['POST'])
def analyze_image():
    try:
        if 'file' not in request.files:
            return jsonify({"error": "No file provided"}), 400
        
        file = request.files['file']
        image = Image.open(file)
        extracted_text = pytesseract.image_to_string(image)
        
        # Extract URLs from text
        urls = re.findall(r'https?://\S+', extracted_text)
        
        # Predict spam using the trained text model
        vect = cv.transform([extracted_text]).toarray()
        is_spam = clf.predict(vect)[0]
        
        return jsonify({
            "extracted_text": extracted_text,
            "urls": urls,
            "is_spam": bool(is_spam)
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
