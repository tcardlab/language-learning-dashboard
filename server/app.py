from flask import Flask
from flask_migrate import Migrate, upgrade
from flask_cors import CORS
from os.path import exists
import os
from appdirs import user_data_dir

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

app_data_dir = user_data_dir('ll-dashboard', appauthor='programs') # prob windows only path
src_path = os.path.join(app_data_dir, 'resources/src')
static_path = os.path.join(app_data_dir, 'resources/src/_nuxt')

def create_app():
    app = Flask(__name__, template_folder=src_path, static_folder=static_path)

    @app.route("/")
    def hello():
        return render_template('index.html')

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
