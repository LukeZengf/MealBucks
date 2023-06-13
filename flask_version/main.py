from flask import Flask, render_template
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/other_page')
def other_page():
    return render_template('other_page.html')


if __name__ == "__main__":
    app.run()


