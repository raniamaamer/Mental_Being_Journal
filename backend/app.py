from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_login import LoginManager, login_user, login_required, logout_user, current_user
from flask_bcrypt import Bcrypt
from models import db, User, Entry
import os

app = Flask(__name__)
CORS(app, supports_credentials=True)
app.config['SECRET_KEY'] = 'your_secret_key_here' # TODO: Change this in production
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mindjournal.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
bcrypt = Bcrypt(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login'

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'Email already exists'}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User created successfully'}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    if user and bcrypt.check_password_hash(user.password, password):
        login_user(user)
        return jsonify({'message': 'Login successful'}), 200
    
    return jsonify({'message': 'Invalid credentials'}), 401

@app.route('/api/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({'message': 'Logged out successfully'}), 200

@app.route('/api/user', methods=['GET'])
@login_required
def get_user():
    return jsonify({
        'name': current_user.name,
        'email': current_user.email
    }), 200


from textblob import TextBlob
from textblob_fr import PatternAnalyzer

def analyze_sentiment(text):
    # English Analysis
    blob_en = TextBlob(text)
    score_en = blob_en.sentiment.polarity
    
    # French Analysis
    blob_fr = TextBlob(text, analyzer=PatternAnalyzer())
    score_fr = blob_fr.sentiment[0] # PatternAnalyzer returns (polarity, subjectivity)
    
    # Hybrid Logic: Use the score with the higher absolute value (stronger sentiment)
    # This avoids language detection complexity and works well for mixed use
    if abs(score_fr) > abs(score_en):
        final_score = score_fr
    else:
        final_score = score_en
        
    if final_score > 0.1:
        label = "Positive"
    elif final_score < -0.1:
        label = "Negative"
    else:
        label = "Neutral"
        
    return final_score, label

@app.route('/api/entries', methods=['POST'])
@login_required
def add_entry():
    data = request.get_json()
    text = data.get('text')
    
    sentiment_score, sentiment_label = analyze_sentiment(text)

    new_entry = Entry(text=text, user_id=current_user.id, sentiment_score=sentiment_score, sentiment_label=sentiment_label)
    db.session.add(new_entry)
    db.session.commit()

    return jsonify({
        'message': 'Entry added successfully',
        'sentiment_label': sentiment_label,
        'sentiment_score': sentiment_score
    }), 201

@app.route('/api/entries/<int:id>', methods=['PUT'])
@login_required
def update_entry(id):
    entry = Entry.query.get_or_404(id)
    
    if entry.user_id != current_user.id:
        return jsonify({'message': 'Unauthorized'}), 403
        
    data = request.get_json()
    text = data.get('text')
    
    if text:
        entry.text = text
        # Re-analyze sentiment when text changes
        sentiment_score, sentiment_label = analyze_sentiment(text)
        entry.sentiment_score = sentiment_score
        entry.sentiment_label = sentiment_label
        
    db.session.commit()
    
    return jsonify({
        'message': 'Entry updated successfully',
        'sentiment_label': entry.sentiment_label,
        'sentiment_score': entry.sentiment_score
    }), 200

@app.route('/api/entries/<int:id>', methods=['DELETE'])
@login_required
def delete_entry(id):
    entry = Entry.query.get_or_404(id)
    
    if entry.user_id != current_user.id:
        return jsonify({'message': 'Unauthorized'}), 403
        
    db.session.delete(entry)
    db.session.commit()
    
    return jsonify({'message': 'Entry deleted successfully'}), 200

@app.route('/api/entries', methods=['GET'])
@login_required
def get_entries():
    entries = Entry.query.filter_by(user_id=current_user.id).order_by(Entry.timestamp.desc()).all()
    output = []
    for entry in entries:
        output.append({
            'id': entry.id,
            'text': entry.text,
            'timestamp': entry.timestamp,
            'sentiment_score': entry.sentiment_score,
            'sentiment_label': entry.sentiment_label
        })
    return jsonify(output), 200

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    print(app.url_map)
    app.run(debug=True)
