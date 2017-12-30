import sqlite3

f = "app.db"
db = sqlite3.connect(f)
c = db.cursor()
c.execute('CREATE TABLE IF NOT EXISTS users (username TEXT, password TEXT);')
c.execute('CREATE TABLE IF NOT EXISTS highscore (username TEXT, score INTEGER);')
db.close()
#add a score to the list
def addscore(username,score):
    f = "app.db"
    db = sqlite3.connect(f)
    c = db.cursor()
    c.execute('INSERT INTO highscore VALUES("%s", "%d");' %(result,username, password))
    db.commt()
    db.close()
    
#get 5 highest scores from all users 
def gethighscore():
    f = "app.db"
    db = sqlite3.connect()
    c = db.cursor()
    c.execute('SELECT * FROM highscore ORDER BY score DESC LIMIT 5;')
    results = c.fetchall()
    db.close
    return results

#return the 5 hishest scores for a user
def getuserhighscore(user):
    f = "app.db"
    db = sqlite3.connect()
    c = db.cursor()
    e.execute('SELECT * FROM highscores WHERE user = username ORDER BY score DESC LIMIT 5;')
    results = c.fetchall()
    db.close
    return results
    
#add the user to the databaseh
def adduser(username,password):
    f = "app.db"
    db = sqlite3.connect(f)
    c = db.cursor()
    if get_pass(username) is None:
        c.execute('INSERT INTO users VALUES("%s", "%s");' %(result,username, password))
        db.commit()
        db.close()
        return True
    db.close()
    return False

#returns the password of the user    
def get_pass(username):
    f = "app.db"
    db = sqlite3.connect(f)
    c = db.cursor()
    c.execute('SELECT password FROM users WHERE username= "%s";' %(username))
    result = c.fetchall()
    if result == []:
        db.close()
        return None
    else:
        db.close()
        return result[0][0]
   
