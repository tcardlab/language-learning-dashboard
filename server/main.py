from flask import render_template
from app import create_app
import ensure_close

app = create_app()

if __name__ == "__main__":
  app.run(debug=True, port=5000)