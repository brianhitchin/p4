from flask import Blueprint, request
from app.models import Group, db, Membership
from flask_login import login_required, current_user

group_routes = Blueprint('group', __name__)

def user_id_generator():
    return int(str(current_user).split('<User ')[1].split('>')[0])

@group_routes.route('/')
def get_groups():
    all_groups = Group.query.all()
    resp_obj = []
    for indiv_group in all_groups:
        dicted = indiv_group.to_dict()
        members = Membership.query.filter(Membership.groupId == dicted.get("id")).all()
        dicted["members"] = [member.to_dict() for member in members]
        resp_obj.append(dicted)
    return {"all_groups": resp_obj}

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

@group_routes.route('/<group_id>/membership', methods=['DELETE'])
@login_required
def delete_membership(group_id):
    user_id = user_id_generator()
    mchk = Membership.query.filter(Membership.userId == user_id, Membership.groupId == group_id).first()
    if not mchk:
        return {"message": "No membership!"}, 400
    db.session.delete(mchk)
    db.session.commit()
    resp_obj = {"message": "Membership successfully deleted."}
    return resp_obj, 200
