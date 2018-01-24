from flask import Flask, render_template, request, redirect, url_for, session, flash
from db import *
from utils import ebay
import urllib
app = Flask(__name__)
app.secret_key = os.urandom(32)

ret = []

@app.route('/')
def root():
	if in_session():
		return redirect( url_for('home') )
	else:
		return render_template("welcome.html")


@app.route('/home')
def home():
	if in_session():
		# INFO to be passed: list of top 10 highcores
                print 'Your are in session!'
                print getcash(session['username'])
		return render_template("home.html", cash = getcash(session['username']), scores = [['apple', 1003], ['banana', 1002], ['cherry', 1000], ['dude', 1000], ['crazy', 1000], ['why', 1000], ['idk', 1000], ['wow', 1000], ['no', 999]] )
	else:
		# make sure scores are in order from highest to lowest in the list
		return render_template('welcome.html')


@app.route('/login', methods=['GET','POST'])
def login():
	if in_session():
		return redirect( url_for('home') )
	else:
		return render_template("login.html")

@app.route('/login_auth', methods=['POST'])
def login_auth():
    usr = request.form['usr']
    pwd = request.form['pwd']
    if usr != '':
        if match(usr,pwd):
            login_db(usr,pwd)
            return redirect( url_for('login') )
        return render_template('login.html', condition='1')
    else:
        return render_template('login.html', condition='1')

@app.route('/register_auth', methods=["POST"])
def register_auth():
        usr = request.form['usr']
        pwd = request.form['pwd']
        if get_pass(usr) is None:
                cfm = request.form['cfm']
                if pwd == cfm:
                        adduser(usr,pwd)
                        login_db(usr,pwd)
                        return redirect( url_for('login') )
                else:
                        return render_template("register.html", condition='1')

        else:
                return render_template("register.html", condition='2')

@app.route('/register')
def register():
	if in_session():
		return redirect( url_for('home') )
	else:
		return render_template("register.html")


@app.route('/store', methods=['POST','GET'])
def store():
	if in_session():
		# INFO to be passed: search result from the query
		# method=POST: if item purchased then subtract price of item from the amount of money the user has and refresh?
		# method=GET: search query? you can rearrange if you want
		return render_template("store.html", condition='0', cash=getcash(session['username']))
	else:
		return redirect( url_for('root') )

@app.route('/search', methods=['POST', 'GET'])
def search():
    search = request.form['keyword']
    ret = ebay.search(search)
    return render_template('store.html', condition='1', ret=ret)

@app.route('/buy', methods=['POST','GET'])
def buy():
        name = session['username']
        money = getcash(name)
        if canpurchase(name, ret['price']):
                item = [ret['title'], ret['image']]
                urllib.urlretrieve(ret['image'], ret['title'] + ".pgn")
                if additem:
                        money = money - ret['price']
                        changevalue(money, name)
                        return render_template("store.html", cash=money, condition='0')
                else:
                        return render_template("store.html", cash=money, condition='3')
        else:
            return render_template("store.html", cash=money, condition='2')


@app.route('/profile', methods=['GET','POST'])
def profile():
	if in_session():
		# INFO to be passed: items already bought by user and whether or not
		# user has chosen to use it in gameplay (0 means not chosen, 1 means chosen)
                items = {}
                usr = session['username']
                useitem = itemusinglist(session['username'])
                for item in itemlist(usr):
                        if item in useitem:
                                items[item] = 1
                        else:
                                items[item] = 0
                return render_template("profile.html", cash=getcash(session['username']), items = items)
	else:
		return redirect( url_for('root') )

@app.route('/equip', methods=['POST', 'GET'])
def equip():
    name = session['username']
    item = request.form['item']
    print item
    if item in itemusinglist(name):
        notuse(name,item)
    else:
        use(name,item)
    return render_template( url_for('profile') )

@app.route('/logout')
def logout():
        logout_db()
        return render_template("welcome.html")


@app.route('/play',methods=['POST','GET'])
def play():
	if in_session():
		return render_template("play.html")
	else:
		return redirect( url_for('root') )


if __name__ == '__main__':
    app.debug = True
    app.run()
