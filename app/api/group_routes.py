from flask import Blueprint, request
from app.models import Group, db, Membership
from flask_login import login_required, current_user

group_routes = Blueprint('group', __name__)

def user_id_generator():
    return int(str(current_user).split('<User ')[1].split('>')[0])

@group_routes.route('/')
def get_groups():
    all_groups = Group.query.all()
    return {"all_groups": [group.to_dict() for group in all_groups]}

@group_routes.route('/<group_id>/membership', methods=['POST'])
@login_required
def create_membership(group_id):
    user_id = user_id_generator()
    mchk = Membership.query.filter(Membership.userId == user_id, Membership.groupId == group_id).first()
    if mchk:
        return mchk.to_dict()
    nm = Membership(
        userId = int(user_id),
        groupId = group_id,
        role= "Member"
    )
    db.session.add(nm)
    db.session.commit()
    return nm.to_dict()