from .db import db, environment, SCHEMA, add_prefix_for_prod

class Membership(db.Model):
    __tablename__ = 'memberships'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    groupId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("groups.id")), nullable=False)
    role = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.now())
    updated_at = db.Column(db.DateTime, default=db.func.now())

    mowner = db.relationship("User", back_populates="memberships")
    gmember = db.relationship("Group", back_populates="groupmembers")

    def to_dict(self):
        return {
            'id': self.id,
            'creatorId': self.creatorId,
            'topicId': self.topicId,
            'name': self.name,
            'image_url': self.image_url,
            'preview': self.preview,
            'body': self.body,
            'created_at': self.created_at
        }