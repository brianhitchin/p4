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

@story_routes.route('/<story_id>')
def one_story(story_id):
    one_story = Story.query.get(story_id) 
    if not one_story:
        error_obj = {"errors": "Story with the specified id could not be found."}
        return error_obj, 404
    return {"single_story": [one_story.to_dict()]}, 200

@story_routes.route('/mine')
@login_required
def my_story():
    user_id = user_id_generator()
    all_story = Story.query.all()
    dict_story = [story.to_dict() for story in all_story]
    filter_story = list(filter(lambda story: story["creatorId"] == user_id, dict_story))
    return {"my_stories": filter_story}

@story_routes.route('/', methods=['POST'])
@login_required
def new_story():
    user_id = user_id_generator()
    new_story = Story(
        creatorId = int(user_id),
        topicId = int(request.json.get('topicId')),
        title = request.json.get('title'),
        preview = request.json.get('preview'),
        mood = int(request.json.get('mood')),
        image_url = request.json.get('image_url'),
        body = request.json.get('body')
    )
    db.session.add(new_story)
    db.session.commit()
    return new_story.to_dict()
        #error_obj = {
        #    "message": "Validation Error",
        #    "errors": "Please fill out all the fields."
        #}
        #return error_obj, 400

@story_routes.route('/<story_id>', methods=['DELETE'])
@login_required
def deletestory(story_id):
    user_id = user_id_generator()
    story_exist = Story.query.get(story_id)
    story_dict = story_exist.to_dict()
    if not story_exist:
        error_obj = {"errors": "Story with the specified id could not be found."}
        return error_obj, 404
    if not story_dict.get("creatorId") == user_id:
        error_obj = {"errors": "Unauthorized - only creator may delete the post."}
        return error_obj, 403
    db.session.delete(story_exist)
    db.session.commit()
    resp_obj = {"message": "Story successfully deleted."}
    return resp_obj, 200

@story_routes.route('/<story_id>', methods=['PUT'])
@login_required
def editstory(story_id):
    user_id = user_id_generator()
    story_exist = Story.query.get(story_id)
    story_dict = story_exist.to_dict()
    if not story_exist:
        error_obj = {"errors": "Story with the specified id could not be found."}
        return error_obj, 404
    if not story_dict.get("creatorId") == user_id:
        error_obj = {"errors": "Unauthorized - only creator may edit the post."}
        return error_obj, 403
    try:
        story_exist.topicId = request.json.get('topicId')
        story_exist.title = request.json.get('title')
        story_exist.mood = request.json.get('mood')
        story_exist.preview = request.json.get('preview')
        story_exist.image_url = request.json.get('image_url')
        story_exist.body = request.json.get('body')
        story_exist.updated_at = db.func.now()
        db.session.commit()
        return story_exist.to_dict()
    except:
        error_obj = {
            "message": "Validation Error",
            "errors": "Please fill out all the fields."
        }
        return error_obj, 400