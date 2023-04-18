from flask import Blueprint
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
            creatorId = user_id
            topicId = request.json.get('topicId'),
            name = request.json.get('name'),
            preview = request.json.get('preview'),
            image_url = request.json.get('image_url'),
            body = request.json.get('body'),
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

@channel_routes.route('/<exercise_id>', methods=['DELETE'])
@login_required
def delete_exercise(exercise_id):
    user_id = user_id_generator()
    exercise_exist = Exercise.query.get(exercise_exist)
    if not exercise_exist:
        error_obj = {"errors": "Exercise with the specified id could not be found."}
        return error_obj, 404
    if not exercise_exist.to_dict().creatorId == user_id:
        error_obj = {"errors": "Unauthorized - only creator may delete the post."}
        return error_obj, 403
    db.session.delete(exercise_exist)
    db.session.commit()
    resp_obj = {"message": "Exercise successfully deleted."}
    return resp_obj, 200