from flask import Flask, render_template, session, request, redirect, url_for
from flask_socketio import SocketIO, emit
from flask_session import Session
from uuid import uuid4
import random
import string
import sys

app = Flask(__name__)
app.config['SECRET_KEY'] = uuid4().hex

app.config["SESSION_PERMANENT"] = True
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

socketio = SocketIO(app)

def generate_numbers(length, game_type):
    session['samples'] = []
    if (game_type == "letters"):
        samples = list(string.ascii_uppercase)
    else:
        samples = [str(x) for x in range(10)]
    for _ in range(10):
        session['samples'].append(random.choices(samples, k=int(length)))
    session['curr_health'] = 3
    session['curr_combo'] = 0
    placeholder = "-" * int(length)
    # return redirect(url_for("memory_game"))
    return render_template('test.html', placeholder=placeholder)

@socketio.on('connect')
def connect():
    session['sid'] = request.sid
    #print(app.config['SECRET_KEY'])
    #print(session['sid'])

@socketio.on('start')
def start_game(message):
    if 'ans' in message.keys():
        # print(message['ans'], file=sys.stderr)
        # print("".join(session['samples'][int(message['counter'])-1]), file=sys.stderr)
        truth = "".join(session['samples'][int(message['counter'])-1]).lower()
        ans = message['ans'].lower()
        if truth == ans:
            session['curr_combo'] += 1
        else:
            session['curr_combo'] = 0
            session['curr_health'] -= 1

    socketio.emit('update_samples', 
                {'samples':session['samples'],
                'game_type':session['game_type'],
                'curr_health': session['curr_health'],
                'curr_combo':session['curr_combo']}, 
                room=session['sid'])
    return

@socketio.on('win')
def win(message):
    sample_length = str(message['length'])
    rsp = "Congratulations! Your short-term memory can store " + sample_length + " " + session['game_type'] + " at a time!"
    socketio.emit('win_show', 
                {'msg':rsp},
                room=session['sid'])
    return

@socketio.on('lose')
def lose(message):
    sample_length = str(message['length'])
    rsp = "That was close! Seems like memorizing" + sample_length + " " + session['game_type'] + " at a time is too much for your short-term memory. Let's try with less number of items!"
    socketio.emit('lose_show', 
                {'msg':rsp},
                room=session['sid'])
    return

@app.route("/", methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        session['length'] = request.form['length']
        session['game_type'] = request.form['game_type']
        return redirect(url_for("memory_game"))
    return render_template('index.html')

@app.route("/memory_game", methods=['GET', 'POST'])
def memory_game():
    return generate_numbers(session['length'], session['game_type'])

if __name__ == "__main__":
    socketio.run(app, host='0.0.0.0', debug=True)