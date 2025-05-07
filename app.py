#!/usr/bin/env python3
from flask import Flask, request, jsonify, redirect, send_from_directory
import psycopg2
from flask_cors import CORS
import requests
import os

# Initialize Flask – static_folder is used for production builds if needed.
app = Flask(__name__, static_folder="build", static_url_path="")

# For development, use a randomly generated key; in production, use a fixed strong secret.
app.secret_key = os.urandom(24)

# Enable CORS (for API calls from your React front end)
CORS(app)

def get_db_connection():
    conn = psycopg2.connect(
        host='localhost',
        database='stayfit_db',
        user='',
        password='',
        port='5432'
    )
    return conn

############################################
# (Other endpoints: /register, /login, /update-password, /logout, /delete, etc.)
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
        elif not user_entry:
            conn = get_db_connection()
            cur = conn.cursor()
            cur.execute('INSERT INTO logs (username, password) VALUES (%s, %s)', (email, password))
            conn.commit()
            cur.close()
            conn.close()
            print("Registration successful")
            return jsonify({'message': 'Registration successful'}), 200
        else:
            print("Email already exists")
            return jsonify({'error': 'Email already exists'}), 401

    except Exception as e:
        print("Database error:", str(e))
        return jsonify({'error': str(e)}), 500

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

############################################
# Ticketmaster Discovery API Proxy Endpoint with Keyword Search
############################################
@app.route('/api/tm-events', methods=['GET'])
def tm_events():
    # Retrieve query parameters
    countryCode = request.args.get('countryCode', 'US')
    # This keyword parameter will now perform a general keyword search
    keyword = request.args.get('keyword', '')
    radius = request.args.get('radius', '')
    unit = request.args.get('unit', 'miles')
    size = request.args.get('size', '20')
    page = request.args.get('page', '0')
    city = request.args.get('city', '')

    # Your Ticketmaster API key
    tm_api_key = "hAg0tYg9wKuYyPMhX1CdWd2ZAVKJuucA"

    params = {
        "apikey": tm_api_key,
        "countryCode": countryCode,
        "size": size,
        "page": page
    }
    if keyword:
        params["keyword"] = keyword
    if radius:
        params["radius"] = radius
        params["unit"] = unit
    if city:
        params["city"] = city

    response = requests.get("https://app.ticketmaster.com/discovery/v2/events.json", params=params)
    data = response.json()
    return jsonify(data), response.status_code

@app.route('/api/event-details/<event_id>', methods=['GET'])
def get_event_details(event_id):
    tm_api_key = "hAg0tYg9wKuYyPMhX1CdWd2ZAVKJuucA"
    base_url = "https://app.ticketmaster.com/discovery/v2/events"
    url = f"{base_url}/{event_id}.json"

    params = {
        "apikey": tm_api_key
    }

    try:
        response = requests.get(url, params=params)
        response.raise_for_status()  # This will raise an error for a bad response
        event_data = response.json()
        return jsonify(event_data), response.status_code
    except requests.exceptions.HTTPError as http_err:
        return jsonify({"error": f"HTTP error occurred: {http_err}"}), response.status_code
    except Exception as err:
        return jsonify({"error": f"An unexpected error occurred: {err}"}), 500

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
@app.route('/deletetracking', methods=['POST', 'DELETE'])
def deletetracking():
    try:
        curr_id = request.get_json()
        print(curr_id)
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('DELETE FROM track WHERE id = %s', (curr_id["id"],))
        conn.commit()
        cur.close()
        conn.close()
        print("Delete successful")
        return jsonify({'message': 'Delete successful'}), 200
    except Exception as e:
        print("Database error:", str(e))
        return jsonify({'error': str(e)}), 500
@app.route('/addgoal', methods=['POST'])
def addgoal():
    data = request.get_json()
    email = str(data.get('email'))
    goalType = str(data.get('goalType'))
    goalTime = str(data.get('goalTime'))
    date = str(data.get('date'))
    print("got data")
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('INSERT INTO goal (username, type, time, date) VALUES (%s, %s, %s, %s)', (email, goalType, goalTime, date))
        conn.commit()
        cur.close()
        conn.close()
        print("Goal successful")
        return jsonify({'message': 'Goal successful'}), 200
    except Exception as e:
        print("Database error:", str(e))
        return jsonify({'error': str(e)}), 500

@app.route('/checkgoal', methods=['POST', 'GET'])
def checkgoal():
    print("check")
    curr_email = request.get_json()
    print(curr_email)
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('SELECT * FROM goal WHERE username = %s', (curr_email,))
        data = cur.fetchall()
        conn.commit()
        cur.close()
        conn.close()
        print("Goal successful")
        return jsonify(data)
    except Exception as e:
        print("Database error:", str(e))
        return jsonify({'error': str(e)}), 500
@app.route('/deletegoal', methods=['POST', 'DELETE'])
def deletegoal():
    try:
        curr_id = request.get_json()
        print(curr_id)
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('DELETE FROM goal WHERE id = %s', (curr_id["id"],))
        conn.commit()
        cur.close()
        conn.close()
        print("Delete successful")
        return jsonify({'message': 'Delete successful'}), 200
    except Exception as e:
        print("Database error:", str(e))
        return jsonify({'error': str(e)}), 500
@app.route('/checkanalytics', methods=['POST', 'GET'])
def checkanalytics():
    print("check")
    curr_email = request.get_json()
    print(curr_email)
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('SELECT * FROM track JOIN goal ON track.username = goal.username and track.type = goal.type and track.date = goal.date WHERE track.username = %s', (curr_email,))
        data = cur.fetchall()
        conn.commit()
        cur.close()
        conn.close()
        print("Analytics successful")
        return jsonify(data)
    except Exception as e:
        print("Database error:", str(e))
        return jsonify({'error': str(e)}), 500
############################################
# (Optional) Catch-All Route for Serving React Production Build
############################################
# @app.route('/', defaults={'path': ''})
# @app.route('/<path:path>')
# def catch_all(path):
#     return send_from_directory(app.static_folder, "index.html")

if __name__ == "__main__":
    app.run(debug=True)