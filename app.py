from flask import Flask, request, jsonify, session, redirect, send_from_directory
import psycopg2
from flask_cors import CORS
import requests
import os

# Initialize Flask – static_folder is used for production builds if needed.
app = Flask(__name__, static_folder="build", static_url_path="")
# Generate a strong secret key (for development, os.urandom(24) is acceptable)
app.secret_key = os.urandom(24)

# Configure session so that cookies are sent cross-origin.
app.config.update(
    SESSION_COOKIE_SAMESITE="None",    # "None" if front end and back end are on different ports
    SESSION_COOKIE_SECURE=False         # Set to True in production if using HTTPS
)

# Allow credentials in CORS so that session cookies are passed.
CORS(app, supports_credentials=True)

def get_db_connection():
    conn = psycopg2.connect(
        host='localhost',
        database='stayfit_db',
<<<<<<< Updated upstream
        user='',
        password='',
=======
        user='postgres',
        password='Google232.',
>>>>>>> Stashed changes
        port='5432'
    )
    return conn

############################################
# Registration Endpoint
############################################
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = str(data.get('email'))
    password = str(data.get('password'))
    confirmPassword = str(data.get('confirmPassword'))
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('SELECT * FROM logs WHERE username = %s', (email,))
        user_entry = cur.fetchone()
        cur.execute('SELECT * FROM logs WHERE password = %s', (password,))
        password_entry = cur.fetchone()
        cur.close()
        conn.close()

        if (not email.endswith('@ufl.edu')) and (password != confirmPassword):
            print("Passwords do not match and email does not end with @ufl.edu!")
            return jsonify({'error': 'Passwords do not match and email does not end with @ufl.edu!'}), 401
        elif password != confirmPassword:
            print("Passwords do not match!")
            return jsonify({'error': 'Passwords do not match!'}), 401
        elif not email.endswith('@ufl.edu'):
            print("Email does not end with @ufl.edu!")
            return jsonify({'error': 'Email does not end with @ufl.edu!'}), 401
        elif not user_entry and not password_entry:
            conn = get_db_connection()
            cur = conn.cursor()
            cur.execute('INSERT INTO logs (username, password) VALUES (%s, %s)', (email, password))
            conn.commit()
            cur.close()
            conn.close()
            print("Registration successful")
            return jsonify({'message': 'Registration successful'}), 200
        elif user_entry:
            print("Email already exists")
            return jsonify({'error': 'Email already exists'}), 401

    except Exception as e:
        print("Database error:", str(e))
        return jsonify({'error': str(e)}), 500

############################################
# Login Endpoint
############################################
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    print("Received login for:", email)
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('SELECT password FROM logs WHERE username = %s', (email,))
        result = cur.fetchone()
        print("DB returned:", result)
        cur.close()
        conn.close()
    except Exception as e:
        print("Database error:", str(e))
        return jsonify({'error': str(e)}), 500

    if result and result[0] == password:
        print("Login successful")
        return jsonify({'message': 'Login successful'}), 200

    print("Login failed: credentials do not match.")
    return jsonify({'error': 'Invalid credentials'}), 401

############################################
# Update Password Endpoint
############################################
@app.route('/update-password', methods=['POST'])
def update_password():
    data = request.get_json()
    email = data.get('email')
    new_password = data.get('new_password')
    confirm_password = data.get('confirm_password')

    if not email or not new_password or not confirm_password:
        return jsonify({'error': 'Missing fields'}), 400

    if new_password != confirm_password:
        print("New passwords do not match for", email)
        return jsonify({'error': 'Passwords do not match'}), 401

    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('SELECT * FROM logs WHERE username = %s', (email,))
        user_record = cur.fetchone()
        if not user_record:
            cur.close()
            conn.close()
            print("No user found with email:", email)
            return jsonify({'error': 'User not found'}), 404

        cur.execute('UPDATE logs SET password = %s WHERE username = %s', (new_password, email))
        conn.commit()
        cur.close()
        conn.close()
        print("Password successfully updated for:", email)
        return jsonify({'message': 'Password updated successfully'}), 200

    except Exception as e:
        print("Database error during update password:", str(e))
        return jsonify({'error': str(e)}), 500

############################################
# Logout Endpoint
############################################
@app.route('/logout', methods=['POST'])
def logout():
    try:
        curr_email = request.get_json()
        print(curr_email)
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('SELECT * FROM logs WHERE username = %s', (curr_email['email'],))
        logged_user = cur.fetchone()
        cur.close()
        conn.close()
        if not logged_user:
            return jsonify({'error': 'User not found'}), 404
        else:
            print("Logout successful")
            return jsonify({'message': 'Logout successful'}), 200
    except Exception as e:
        print("Database error during logout:", str(e))
        return jsonify({'error': str(e)}), 500

############################################
# Delete Account Endpoint
############################################
@app.route('/delete', methods=['POST', 'DELETE'])
def delete():
    try:
        curr_email = request.get_json()
        print(curr_email)
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('DELETE FROM logs WHERE username = %s', (curr_email['email'],))
        conn.commit()
        cur.close()
        conn.close()
        print("Delete successful")
        return jsonify({'message': 'Delete successful'}), 200
    except Exception as e:
        print("Database error:", str(e))
        return jsonify({'error': str(e)}), 500

<<<<<<< Updated upstream
@app.route('/addtracking', methods=['POST'])
def addtracking():
    data = request.get_json()
    email = str(data.get('email'))
    exerciseType = str(data.get('exerciseType'))
    exerciseTime = str(data.get('exerciseTime'))
    date = str(data.get('date'))
    print("got data")
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('INSERT INTO track (username, type, time, date) VALUES (%s, %s, %s, %s)', (email, exerciseType, exerciseTime, date))
        conn.commit()
        cur.close()
        conn.close()
        print("Tracking successful")
        return jsonify({'message': 'Tracking successful'}), 200
    except Exception as e:
        print("Database error:", str(e))
        return jsonify({'error': str(e)}), 500

@app.route('/checktracking', methods=['POST', 'GET'])
def checktracking():
    print("check")
    curr_email = request.get_json()
    print(curr_email)
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('SELECT * FROM track WHERE username = %s', (curr_email,))
        data = cur.fetchall()
        conn.commit()
        cur.close()
        conn.close()
        print("Tracking successful")
        return jsonify(data)
    except Exception as e:
        print("Database error:", str(e))
        return jsonify({'error': str(e)}), 500
@app.route('/')
def home():
    return "Flask API"
=======
############################################
# Eventbrite OAuth Redirect Endpoint
# (Automatically starts OAuth if no code is provided)
############################################
@app.route('/oauth/redirect', methods=['GET'])
def oauth_redirect():
    code = request.args.get('code')
    if not code:
        client_id = "EYPKMDVUGG73ZWQBXB"
        redirect_uri = "http://localhost:5000/oauth/redirect"
        auth_url = (
            f"https://www.eventbrite.com/oauth/authorize?"
            f"response_type=code&client_id={client_id}&redirect_uri={redirect_uri}"
        )
        return redirect(auth_url)
    token_url = "https://www.eventbrite.com/oauth/token"
    payload = {
        "grant_type": "authorization_code",
        "client_id": "EYPKMDVUGG73ZWQBXB",
        "client_secret": "5OC3BNXGN425RGOQ4WWBZJNFCSRS73SRCRLWEX77RENG7NDYD6",
        "code": code,
        "redirect_uri": "http://localhost:5000/oauth/redirect",
    }
    headers = {"content-type": "application/x-www-form-urlencoded"}
    response = requests.post(token_url, data=payload, headers=headers)
    data = response.json()
    if response.ok:
        private_token = data.get("access_token")
        session["eventbrite_token"] = private_token
        print("OAuth successful, token:", private_token)
        return jsonify({"message": "Successfully authenticated", "private_token": private_token}), 200
    else:
        return jsonify({"error": data.get("error_description", "OAuth token exchange failed")}), 500

############################################
# API Endpoint to Proxy Eventbrite Events
############################################
@app.route('/api/events', methods=['GET'])
def api_events():
    token = session.get("eventbrite_token")
    if not token:
        # Instead of a 302 redirect (which XHR won’t follow automatically), return an error with auth_url.
        client_id = "EYPKMDVUGG73ZWQBXB"
        redirect_uri = "http://localhost:5000/oauth/redirect"
        auth_url = (
            f"https://www.eventbrite.com/oauth/authorize?"
            f"response_type=code&client_id={client_id}&redirect_uri={redirect_uri}"
        )
        return jsonify({"error": "Not authenticated with Eventbrite", "auth_url": auth_url}), 401

    # Read query parameters; default location is Gainesville, FL.
    location = request.args.get('location', "Gainesville, FL")
    q = request.args.get('q', "")
    params = {
        "location.address": location,
        "q": q
    }
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    response = requests.get("https://www.eventbriteapi.com/v3/events/search/", params=params, headers=headers)
    data = response.json()
    return jsonify(data), response.status_code

############################################
# (Optional) Catch-All Route for Serving React Production Build
############################################
# Uncomment these lines in production if serving your React build from Flask:
#
# @app.route('/', defaults={'path': ''})
# @app.route('/<path:path>')
# def catch_all(path):
#     return send_from_directory(app.static_folder, "index.html")
>>>>>>> Stashed changes

if __name__ == '__main__':
    app.run(debug=True)