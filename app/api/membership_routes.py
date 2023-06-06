from flask import Blueprint, request
from app.models import Membership, db
from flask_login import login_required, current_user

membership_routes = Blueprint('membership', __name__)

@membership_routes.route('/<membership_id>')
def one_membership(membership_id):
    right_one = Membership.query.get(membership_id)
    return {"single_membership": right_one.to_dict()}

