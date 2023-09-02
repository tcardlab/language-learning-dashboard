from datetime import datetime, timedelta, timezone
from getDB import db_uri

class Config(object):
    DEBUG = False
    TESTING = False
    
    SQLALCHEMY_DATABASE_URI = db_uri
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    CSRF_ENABLED = True
    CORS_HEADERS = "Content-Type"


class ProductionConfig(Config):
    DEBUG = False


class StagingConfig(Config):
    DEVELOPMENT = True
    DEBUG = True


class DevelopmentConfig(Config):
    DEVELOPMENT = True
    DEBUG = True
    # JWT_COOKIE_CSRF_PROTECT = False


class TestingConfig(Config):
    TESTING = True
