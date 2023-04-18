from flask import Blueprint, request
from app.models import Story, db
from flask_login import login_required, current_user

story_routes = Blueprint('story', __name__)

def user_id_generator():
    return int(str(current_user).split('<User ')[1].split('>')[0])

@story_routes.route('/')
def initial():
    all_stories = Story.query.all()
    return {"all_stories": [story.to_dict() for story in all_stories]}, 200
