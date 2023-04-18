from flask import Blueprint, request
from app.models import Exercise, db
from flask_login import login_required, current_user

exercise_routes = Blueprint('exercise', __name__)

def user_id_generator():
    return int(str(current_user).split('<User ')[1].split('>')[0])

@exercise_routes.route('/')
def initial():
    all_exercises = Exercise.query.all()
    return {"all_exercises": [exercise.to_dict() for exercise in all_exercises]}, 200

@exercise_routes.route('/<exercise_id>')
def one_exercise(exercise_id):
    one_exercise = Exercise.query.get(exercise_id) 
    if not one_exercise:
        error_obj = {"errors": "Exercise with the specified id could not be found."}
        return error_obj, 404
    return {"single_exercise": [one_exercise.to_dict()]}, 200

@exercise_routes.route('/', methods=['POST'])
@login_required
def create_exercise():
    user_id = user_id_generator()
    try:
        new_exercise = Exercise(
            creatorId = int(user_id),
            topicId = int(request.json.get('topicId')),
            name = request.json.get('name'),
            preview = request.json.get('preview'),
            image_url = request.json.get('image_url'),
            body = request.json.get('body')
        )
        db.session.add(new_exercise)
        db.session.commit()
        return new_exercise.to_dict()
    except:
        error_obj = {
            "message": "Validation Error",
            "errors": "Please fill out all the fields."
        }
        return error_obj, 400

@exercise_routes.route('/<exercise_id>', methods=['DELETE'])
@login_required
def delete_exercise(exercise_id):
    user_id = user_id_generator()
    exercise_exist = Exercise.query.get(exercise_id)
    if not exercise_exist:
        error_obj = {"errors": "Exercise with the specified id could not be found."}
        return error_obj, 404
    exercise_dict = exercise_exist.to_dict()
    if not exercise_dict.get("creatorId") == user_id:
        error_obj = {"errors": "Unauthorized - only creator may delete the post."}
        return error_obj, 403
    db.session.delete(exercise_exist)
    db.session.commit()
    resp_obj = {"message": "Exercise successfully deleted."}
    return resp_obj, 200

@exercise_routes.route('/<exercise_id>', methods=['PUT'])
@login_required
def edit_channel(exercise_id):
    user_id = user_id_generator()
    exercise_exist = Exercise.query.get(exercise_id)
    if not exercise_exist:
        error_obj = {"errors": "Exercise with the specified id could not be found."}
        return error_obj, 404
    exercise_dict = exercise_exist.to_dict()
    if not exercise_dict.get("creatorId") == user_id:
        error_obj = {"errors": "Unauthorized - only creator may delete the post."}
        return error_obj, 403
    try:
        exercise_exist.topicId = request.json.get('topicId')
        exercise_exist.name = request.json.get('name')
        exercise_exist.preview = request.json.get('preview')
        exercise_exist.image_url = request.json.get('image_url')
        exercise_exist.body = request.json.get('body')
        exercise_exist.updated_at = db.func.now()
        db.session.commit()
        return exercise_exist.to_dict()
    except:
        error_obj = {
            "message": "Validation Error",
            "errors": "Please fill out all the fields."
        }
        return error_obj, 400