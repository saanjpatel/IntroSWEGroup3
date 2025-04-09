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
# Ticketmaster Discovery API Proxy Endpoint with Location Search
############################################
@app.route('/api/tm-events', methods=['GET'])
def tm_events():
    # Retrieve query parameters
    countryCode = request.args.get('countryCode', 'US')
    keyword = request.args.get('keyword', '')
    radius = request.args.get('radius', '')
    unit = request.args.get('unit', 'miles')
    size = request.args.get('size', '20')
    page = request.args.get('page', '0')
    # New parameter: location search by city
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
        # Adding the city parameter so Ticketmaster can filter by location.
        params["city"] = city

    response = requests.get("https://app.ticketmaster.com/discovery/v2/events.json", params=params)
    data = response.json()
    return jsonify(data), response.status_code


if __name__ == "__main__":
    app.run(debug=True)