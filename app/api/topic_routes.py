from flask import Blueprint, request
from app.models import Topic, db, Story, Exercise
from flask_login import login_required, current_user

topic_routes = Blueprint('topic', __name__)

def user_id_generator():
    return int(str(current_user).split('<User ')[1].split('>')[0])

@topic_routes.route('/')
def initial():
    all_topics = Topic.query.all()
    return {"all_topics": [topic.to_dict() for topic in all_topics]}, 200

@topic_routes.route('/<topic_id>/story')
def filtered(topic_id):
    topic_exist = Topic.query.get(topic_id)
    if not topic_exist:
        error_obj = {"errors": "Topic with the specified id could not be found."}
        return error_obj, 404
    filtered_stories = Story.query.filter(Story.topicId == topic_id).all()
    return {"filtered_stories": [story.to_dict() for story in filtered_stories]}, 200

@topic_routes.route('/<topic_id>/exercise')
def efiltered(topic_id):
    topic_exist = Topic.query.get(topic_id)
    if not topic_exist:
        error_obj = {"errors": "Topic with the specified id could not be found."}
        return error_obj, 404
    exercises = Exercise.query.filter(Exercise.topicId == topic_id).all()
    return {"filtered_exercises": [exercise.to_dict() for exercise in exercises]}, 200

@topic_routes.route('/', methods=['POST'])
@login_required
def create_topic():
    user_id = user_id_generator()
    try:
        new_topic = Topic(
            creatorId = user_id,
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

@topic_routes.route('/<topic_id>', methods=['PUT'])
@login_required
def edittopic(topic_id):
    user_id = user_id_generator()
    topic_exist = Topic.query.get(topic_id)
    topic_dict = topic_exist.to_dict()
    if not topic_exist:
        error_obj = {"errors": "Topic  with the specified id could not be found."}
        return error_obj, 404
    if not topic_dict.get("creatorId") == user_id:
        error_obj = {"errors": "Unauthorized - only creator may edit the topic."}
        return error_obj, 403
    try:
        topic_exist.topic = request.json.get('topic')
        topic_exist.updated_at = db.func.now()
        db.session.commit()
        return topic_exist.to_dict()
    except:
        error_obj = {
            "message": "Validation Error",
            "errors": "Please fill out the topic."
        }
        return error_obj, 400

@topic_routes.route('/<topic_id>', methods=['DELETE'])
@login_required
def deletetopic(topic_id):
    user_id = user_id_generator()
    topic_exist = Topic.query.get(topic_id)
    if not topic_exist:
        error_obj = {"errors": "Topic with the specified id could not be found."}
        return error_obj, 404
    topic_dict = topic_exist.to_dict()
    if not topic_dict.get("creatorId") == user_id:
        error_obj = {"errors": "Unauthorized - only creator may delete the topic."}
        return error_obj, 403
    db.session.delete(topic_exist)
    db.session.commit()
    resp_obj = {"message": "Topic successfully deleted."}
    return resp_obj, 200