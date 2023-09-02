from appdirs import user_data_dir
import os

app_data_dir = user_data_dir('ll-dashboard', appauthor='programs') # programs/ may be win only
db_filename = 'll-dashboard.db'

os.makedirs(app_data_dir, exist_ok=True)

db_path = os.path.join(app_data_dir, db_filename)
db_uri = f'sqlite:///{db_path}'

db_data_path = os.path.join(app_data_dir, 'resources/server/data/chengyu.json')