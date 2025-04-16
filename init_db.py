import psycopg2

conn = psycopg2.connect(    
    host="localhost",
    database="stayfit_db",
    user='postgres',
    password='Google232.', port='5432')
# add own user and password
cur = conn.cursor()

cur.execute('DROP TABLE IF EXISTS logs;')

cur.execute('CREATE TABLE logs (id serial PRIMARY KEY,'
            'username text,'
            'password text)'
            )
cur.execute('DROP TABLE IF EXISTS track;')
cur.execute('CREATE TABLE track (id serial PRIMARY KEY,'
            'username text,'
            'type text,'
            'time text,'
            'date text)'
            )
cur.execute('DROP TABLE IF EXISTS goal;')
cur.execute('CREATE TABLE goal (id serial PRIMARY KEY,'
            'username text,'
            'type text,'
            'time text,'
            'date text)'
            )
# insertion of a sample record into the logs table


conn.commit()

cur.close()
conn.close()
