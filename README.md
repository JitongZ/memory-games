# memory-games
Web games related to our memory for educational purposes. Currently there is one game that tests short-term memory.

# Instructions
In the command line (e.g. Terminal on MacOS), do the followings:
1. Clone this repo `git clone https://github.com/JitongZ/memory-games.git`
2. Enter the root directory if you haven't done so: `cd memory-games`
3. (Optional) Create a python3 virtual environment and activate it. [Python venv](https://docs.python.org/3/library/venv.html)
4. Run `pip3 install -r requirements.txt` to install the required libraries.
5. Then, run `gunicorn --worker-class eventlet -w 1 wsgi:app` and go to `http://127.0.0.1:8000` in your browser.
6. If the web page does not show up, check the output of the previous command and go to the url provided after `[INFO] Listening at: <some url>`

If the browser shows "accessed denied" try using safari and open a new private window.

Currently, the app is deployed at [https://short-term-memory-game.onrender.com](https://short-term-memory-game.onrender.com). However, the free version of render might be expired soon.

# Citations
Uses the code structure and css styles of [this repo](https://www.section.io/engineering-education/creating-a-simple-hunt-the-wumpus-game-using-python-flask-and-socketio/)
