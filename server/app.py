from flask import Flask, send_from_directory
from flask_migrate import Migrate, upgrade
from flask_cors import CORS
from os.path import exists
import os
import sys

from json_postgres_loader import runPopulate

from extensions import db

# BLUEPRINT IMPORTS
from blueprints.chengyu import chengyu_bp
from blueprints.log import log_bp
from blueprints.goals import goal_bp
from blueprints.milestones import milestone_bp
from blueprints.statistics import statistics_bp

# MODEL IMPORTS FOR FLASK-MIGRATE
from models.chengyu import Chengyu
from models.goal_message import GoalMessage
from models.log import Log
from models.note import Note
from models.user import User
from models.action import Action
from models.statistic import StatisticSnapshot

from flask import render_template
from config import DevelopmentConfig

from getDB import db_path

populate = False
if not exists(db_path):
  populate = True

if getattr(sys, 'frozen', False):
    template_folder=os.path.abspath("dist")
    static_folder=os.path.abspath('dist/_nuxt')
else:
    template_folder="../src/.output/public"
    static_folder='../src/.output/public/'

def create_app():
    app = Flask(__name__, template_folder=template_folder, static_folder=static_folder)

    @app.route("/")
    def hello():
        return render_template('index.html')

    @app.route('/favicon.ico')
    def favicon():
        return send_from_directory(os.path.abspath("dist"), 'favicon.ico', mimetype='image/vnd.microsoft.icon')

    app.config.from_object(DevelopmentConfig())
    db.init_app(app)

    CORS(
        app,
        resources={r"*": {"origins": [
            "http://localhost:3000", "http://127.0.0.1:3000",
            "http://localhost:5000", "http://127.0.0.1:5000",
        ]}},
        supports_credentials=True,
    )

    # register blueprints
    app.register_blueprint(chengyu_bp)
    app.register_blueprint(log_bp)
    app.register_blueprint(goal_bp)
    app.register_blueprint(milestone_bp)
    app.register_blueprint(statistics_bp)

    Migrate(app, db, compare_type=True, render_as_batch=True)
    with app.app_context():
        db.create_all()

    if populate:
      runPopulate()

    return app
