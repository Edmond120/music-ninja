import sqlite3
import os
import hashlib
from flask import session

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

#return the 5 highest scores for a user
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
    db = sqlite3.connect()
    c = db.cursor()
    if get_pass(username) is None:
		password = hashlib.sha224(password).hexdigest()
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

#checks if the password matches the account referenced by the username
def match(username,password):
	p = get_pass(username)
	if(p == None):
		return False
	else:
		return (p == hashlib.sha224(password).hexdigest())

#checks if the password is correct, then creates a cookie
def login(username,password):
	if(match(username,password)):
		session['username'] = username
		session['password'] = hashlib.sha224(password).hexdigest()
		return True
	else:
		return False

#checks if there is a login session and if the credentials are correct
def in_session():
	if(not('username' in session and 'password' in session)):
		return False
	p = get_pass(session.get('username'))
	if(p == None):
		return False
	else:
		return (p == session.get('password'))

#removes the login session
def logout():
	if('username' in session):
		session.pop('username')
	if('password' in session):
		session.pop('password')

