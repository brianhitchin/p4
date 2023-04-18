from flask import Blueprint, request
from app.models import Topic, db
from flask_login import login_required, current_user

topic_routes = Blueprint('topic', __name__)

@topic_routes.route('/')
def initial():
    all_topics = Topic.query.all()
    return {"all_stories": [topic.to_dict() for topic in all_topics]}, 200