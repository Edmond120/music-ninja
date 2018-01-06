import sqlite3
import os
import hashlib
from flask import session

f = "app.db"
db = sqlite3.connect(f)
c = db.cursor()
#if a item has 0 the user is not using the item. If it is 1 they user is using
c.execute('CREATE TABLE IF NOT EXISTS items (user TEXT, item TEXT, playing INTEGER);')
c.execute('CREATE TABLE IF NOT EXISTS users (username TEXT, password TEXT, cash INTEGER);')
c.execute('CREATE TABLE IF NOT EXISTS highscore (username TEXT, score INTEGER);')
db.close()

#changes cash amount
def changevalue(change,user):
    if canpurchase(change,user):
        f = "app.db"
        db = sqlite3.connect(f)
        c = db.cursor()
        c.execute('UPDATE users SET.cash = (SELECT cash FROM users WHERE username = "%s") + "%d" WHERE username = "%s";' %(user,change,user))
        db.commit()
        db.close()

#checks if program can purchase
def canpurchase(change,value):
    f = "app.db"
    db = sqlite3.connect(f)
    c = db.cursor()
    c.execute('SELECT cash FROM users WHERE username = "%s";' %(user) )
    results = c.fetchall()
    db.close()
    return results[0][0] + change  >= 0


#add item to list
def additem(user,item):
    if isunique(user,item) == False:
        f = "app.db"
        db = sqlite3.connect(f)
        c = db.cursor()
        c.execute('INSERT INTO items VALUES("%s%", "%s%, 0");' %(user,item) )
        db.commit()
        db.close()

#returns a list of items the user is using
def itemlist(user):
    f = "app.db"
    db = sqlite3.connect(f)
    c = db.cursor()
    c.execute('SELECT * FROM items WHERE username = "%s";' %(user) )
    results = c.fetchall()
    d.close()
    return results

#returns a list of items the user is using
def itemusinglist(user):
    f = "app.db"
    db = sqlite3.connect(f)
    c = db.cursor()
    c.execute('SELECT * FROM items WHERE username = "%s" AND playing = 1 LIMIT 8;' %(user) )
    results = c.fetchall()
    d.close()
    return results

#helper function for adding that prevents adding if there is 8 items selected
def isnotmax(list):
    return list.len() != 8

#checks if the item being added is a duplicate
def isunique(user,item):
    f = "app.db"
    db = sqlite3.connect(f)
    c = db.cursor()
    c.execute('SELECT * FROM  items WHERE username = "%s" AND ITEM = "%s";' %(user,item) )
    results = c.fetchall()
    if results == []:
        return False
    return True

#allows player to use item
def use(user,item):
    if isnotmax(itemusinglist(user)):
        f = "app.db"
        db = sqlite3.connect(f)
        c = db.cursor()
        c.execute('UPDATE users SET.playing=1 WHERE username = "%s" AND item = "%s";' %(user,item) )
        db.commit()
        db.close()

    #turns off item
def notuse(user,item):
    f = "app.db"
    db = sqlite3.connect(f)
    c = db.cursor()
    c.execute('UPDATE users SET.playing= 0 WHERE username = "%s" AND item = "%s" ;' %(user,item) )
    db.commit()
    db.close()

#add score to score table
def addscore(user,score):
    f = "app.db"
    db = sqlite3.connect(f)
    c = db.cursor()
    c.execute('INSERT INTO highscore VALUES("%s", "%d");' %(user, score))
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
def gethighscore(user):
    f = "app.db"
    db = sqlite3.connect()
    c = db.cursor()
    e.execute('SELECT * FROM highscores WHERE username= "%s" ORDER BY score DESC LIMIT 5;' %(user) )
    results = c.fetchall()
    db.close
    return results

#add the user to the databaseh
def adduser(user,password):
	f = "app.db"
	db = sqlite3.connect(f)
	c = db.cursor()
	if get_pass(user) is None:
		password = hashlib.sha224(password).hexdigest()
		c.execute('INSERT INTO users VALUES("%s", "%s", 10000);' %(user, password))
		db.commit()
		db.close()
		return True
	db.close()
	return False

#returns the password of the user
def get_pass(user):
    f = "app.db"
    db = sqlite3.connect(f)
    c = db.cursor()
    c.execute('SELECT password FROM users WHERE username= "%s";' %(user))
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
