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


@app.route('/home') #goes to home.html
def home():
	if in_session():
		# INFO to be passed: list of top 10 highcores
		return render_template("home.html")
	else:
		return redirect( url_for('root') )


@app.route('/login')
def login():
	if in_session():
		return redirect( url_for('home') )
	else:
		return render_template("login.html")

@app.route('/auth', methods=["POST"])
def auth():
        usr = request.form['usr']
        pwd = request.form['pwd']
        if get_pass(usr) is None:
                cfm = request.form['cfm']
                if pwd == cfm:
                        adduser(usr,pwd)
                        login_db(usr,pwd)
                        return redirect( url_for('login') )
                else:
                        flash("Sorry, the password is not the same")
                        return render_template("register.html")

        else:
                flash("Sorry, the username already exist")
                return render_template("register.html")
        
                
        


@app.route('/register')
def register():
	if in_session():
		return redirect( url_for('home') )
	else:
		return render_template("register.html")


@app.route('/store')
def store():
	if in_session():
		# INFO to be passed: search results from the query
		return render_template("store.html", items = ['apple', 'banana', 'cherry'])
	else:
		return redirect( url_for('login') )


@app.route('/profile')
def profile():
	if in_session():
		# INFO to be passed: items already bought by user and whether or not
		# user has chosen to use it in gameplay
		return render_template("profile.html")
	else:
		return redirect( url_for('login') )


@app.route('/play')
def play():
	if in_session():
		return render_template("play.html")
	else:
		return redirect( url_for('login') )



if __name__ == '__main__':
	app.debug = True
	app.run()
