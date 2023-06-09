from .db import db, environment, SCHEMA, add_prefix_for_prod

class Group(db.Model):
    __tablename__ = 'groups'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)        
    creatorId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    topicId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("topics.id")), nullable=False)
    title = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.now())
    updated_at = db.Column(db.DateTime, default=db.func.now())

    gowner = db.relationship("User", back_populates="groups")
    gtopic = db.relationship("Topic", back_populates="grouptopic")
    groupmembers = db.relationship("Membership", back_populates="gmember", cascade="all, delete, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'creatorId': self.creatorId,
            'topicId': self.topicId,
            'title': self.title,
            'created_at': self.created_at
        }