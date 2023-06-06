from flask import Blueprint, request
from app.models import Group, db
from flask_login import login_required, current_user

group_routes = Blueprint('group', __name__)

@group_routes.route('/')
def get_groups():
    all_groups = Group.query.all()
    return {"all_groups": [group.to_dict() for group in all_groups]}