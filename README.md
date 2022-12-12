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

# Screenshots
Home page

<img src="https://user-images.githubusercontent.com/21675671/206961269-8fafd5d3-6748-44dd-8613-8264d371299e.png" width="800" height="500">

Start a game with 5 numbers

<img src="https://user-images.githubusercontent.com/21675671/206961356-f4f6ed94-0fbf-47e5-8f81-4022943d0de1.png" width="800" height="500">

Win the game

<img src="https://user-images.githubusercontent.com/21675671/206961500-6a3cea34-2e78-4470-84fd-d6421667d0b7.png" width="800" height="500">

Lost the game with 9 letters

<img src="https://user-images.githubusercontent.com/21675671/206961630-2c1fbd24-cc97-4f93-93df-97e0e21cfffd.png" width="800" height="500">

# Citations
Uses the code structure and css styles of [this repo](https://www.section.io/engineering-education/creating-a-simple-hunt-the-wumpus-game-using-python-flask-and-socketio/)
