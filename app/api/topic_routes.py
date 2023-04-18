from flask import Blueprint, request
from app.models import Topic, db
from flask_login import login_required, current_user

topic_routes = Blueprint('topic', __name__)

@topic_routes.route('/')
def initial():
    all_topics = Topic.query.all()
    return {"all_stories": [topic.to_dict() for topic in all_topics]}, 200

@topic_routes.route('/', methods=['POST'])
@login_required
def create_topic():
    try:
        new_topic = Topic(
            topic = request.json.get('topic')
        )
        db.session.add(new_topic)
        db.session.commit()
        return new_topic.to_dict()
    except:
        error_obj = {
            "message": "Validation Error",
            "errors": "Please fill out all the topic field."
        }
        return error_obj, 400