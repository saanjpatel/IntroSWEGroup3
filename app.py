from flask import Flask, request, jsonify, session
import psycopg2
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
app = Flask(__name__)
CORS(app)


def get_db_connection():
    conn = psycopg2.connect(
        host='localhost',
        database='',
        user='postgres',
        password='',
        port='5432'
    )
    return conn

# Registration endpoint – note: adjusted .edu check example
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
        elif user_entry and password_entry:
            print("Email and password already exists")
            return jsonify({'error': 'Email and password already exists'}), 401
        elif user_entry:
            print("Email already exists")
            return jsonify({'error': 'Email already exists'}), 401
        elif password_entry:
            print("Password already exists")
            return jsonify({'error': 'Password already exists'}), 401
    except Exception as e:
        print("database error:", str(e))
        return jsonify({'error': str(e)}), 500

# Login endpoint (no encryption)
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

# Update Password endpoint
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
        # Check if user exists
        cur.execute('SELECT * FROM logs WHERE username = %s', (email,))
        user_record = cur.fetchone()
        if not user_record:
            cur.close()
            conn.close()
            print("No user found with email:", email)
            return jsonify({'error': 'User not found'}), 404

        # Update password for the user
        cur.execute('UPDATE logs SET password = %s WHERE username = %s', (new_password, email))
        conn.commit()
        cur.close()
        conn.close()
        print("Password successfully updated for:", email)
        return jsonify({'message': 'Password updated successfully'}), 200

    except Exception as e:
        print("Database error during update password:", str(e))
        return jsonify({'error': str(e)}), 500
# logout verify backend
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
            print("logout successful")
            return jsonify({'message': 'logout successful'}), 200

    except Exception as e:
        print("Database error during logout:", str(e))
        return jsonify({'error': str(e)}), 500
# delete account backend
@app.route('/delete', methods=['POST','DELETE'])
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


@app.route('/')
def home():
    return "Flask API"

if __name__ == '__main__':
    app.run(debug=True)