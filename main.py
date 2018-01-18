from flask import Flask, render_template, request, redirect, url_for, session, flash
from db import *
app = Flask(__name__)
app.secret_key = os.urandom(32)

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
		return render_template("home.html", cash = 1000000, scores = [['apple', 1003], ['banana', 1002], ['cherry', 1000]] )
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
		return render_template("store.html", cash = 100, items = {'apple': 2.50, 'banana': 3.50})
	else:
		return redirect( url_for('root') )
    
@app.route('/search')
def search():
    search = request.form['search']
    ret = []
    ret = ebay.search(search)
    return redirect( url_for(results), result = ret)

@app.route('/buy', methods=['POST','GET'])
def buy():
        item = request.form('buy')
        usr = session['username']
        additem(usr,item)
        return render_template("store.html", cash = 100, items = {'apple': 2.50, 'banana': 3.50})


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
                return render_template("profile.html", cash = 1000000, items = {'apple': 1, 'banana': 0})
	#else:
		#return redirect( url_for('root') )

@app.route('/logout')
def logout():
        logout_db()
        return render_template("welcome.html")


@app.route('/play')
def play():
	if in_session():
		return render_template("play.html")
	else:
		return redirect( url_for('root') )

#@app.route('/logout')
#def logout():


if __name__ == '__main__':
	app.debug = True
	app.run()
