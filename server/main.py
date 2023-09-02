from flaskwebgui import FlaskUI
from flask import render_template
from app import create_app

import sys

app = create_app()

if __name__ == "__main__":
  if 'headless' in sys.argv:
    app.run(debug=True, port=5000)
  elif 'dev' in sys.argv:
    FlaskUI(
      server="flask",
      server_kwargs={"port": 5000, "app": app},
      width=1200,
      height=820,
      port=3000
    ).run()
  else:
    FlaskUI(
      app=app, 
      server="flask",
      width=1200,
      height=820,
      port=5000
    ).run()