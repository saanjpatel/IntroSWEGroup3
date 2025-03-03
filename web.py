from flask import Flask
import psycopg2
app = Flask(__name__)

def get_db_connection():
    conn = psycopg2.connect(host='localhost',
                            database='stayfit_db',
                            user='',
                            password='')
    return conn
# add own user and password
