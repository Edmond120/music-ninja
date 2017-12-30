from flask import Flask, render_template, request, redirect, url_for, session, flash

app = Flask(__name__)

@app.route('/')
def root():
	if in_session():
		return redirect( url_for('home') )
	else:
		return render_template("welcome.html")

@app.route('/home') #goes to home.html
def home():
	if in_session():
		return render_template("home.html")
	else:
		return redirect( url_for('root') )

@my_app.route('/login')
def login():
	if in_session():
		return redirect( url_for('home') )
	else:
		return render_template("login.html")

@app.route('/register')
def register():
	if in_session():
		return redirect( url_for('home') )
	else:
		return render_template("register.html")


@my_app.route('/store')
def store():
	if in_session():
		return render_template("store.html")
	else:
		return redirect( url_for('login') )

@app.route('/profile')
def profile():
	if in_session():
		return render_template("profile.html")
	else:
		return redirect( url_for('login') )

@my_app.route('/play')
def play():
	if in_session():
		return render_template("play.html")
	else:
		return redirect( url_for('login') )

if __name__ == '__main__':
	app.debug = True
	app.run()
