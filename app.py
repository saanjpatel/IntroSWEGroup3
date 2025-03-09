from flask import Flask, request, jsonify
import psycopg2
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def get_db_connection():
    conn = psycopg2.connect(
        host='localhost',
        database='stayfit_db',
        user='',
        password=''
    )
    return conn
# registration while checking that it ends with @ufl.edu and passwords match
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = str(data.get('email'))
    password = str(data.get('password'))
    confirmPassword = str(data.get('confirmPassword'))
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('SELECT * FROM logs WHERE username = %s', (email, ))
        user_entry = cur.fetchone()
        cur.execute('SELECT * FROM logs WHERE password = %s', (password, ))
        password_entry = cur.fetchone()
        cur.close()
        conn.close()
        if not email.endswith('@ufl.edu') and password != confirmPassword:
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
            cur.execute('INSERT INTO logs (username, password)'
                        ' VALUES (%s, %s)'
                        , (email, password))
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


# login endpoint without password encryption
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

    # Compare plain text passwords
    if result and result[0] == password:
        print("Login successful")
        return jsonify({'message': 'Login successful'}), 200

    print("Login failed: credentials do not match.")
    return jsonify({'error': 'Invalid credentials'}), 401

@app.route('/')
def home():
    return "Flask API"

if __name__ == '__main__':
    app.run(debug=True)
