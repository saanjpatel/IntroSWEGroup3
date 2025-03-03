import psycopg2

conn = psycopg2.connect(
        host="localhost",
        database="stayfit_db",
        user='',
        password='', port='5432')
# add own user and password
cur = conn.cursor()

cur.execute('DROP TABLE IF EXISTS logs;')
cur.execute('CREATE TABLE logs (id serial PRIMARY KEY,'
                                 'username text,'
                                 'password text,'
                                 )
cur.execute('INSERT INTO logs (username, password)'
            'VALUES (%s, %s)',
            ('sampleuser',
             'samplepassword',
             )
            )
conn.commit()
cur.close()
conn.close()