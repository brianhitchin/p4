from .db import db, environment, SCHEMA, add_prefix_for_prod

class CommentS(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    creatorId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    storyId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("stories.id")), nullable=False)
    body = db.Column(db.Text)
    rating = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.now())
    updated_at = db.Column(db.DateTime, default=db.func.now())

    scommentowner = db.relationship("User", back_populates="scomments")
    scommentstory = db.relationship("Story", back_populates="storycomments")

    def to_dict(self):
        return {
            'id': self.id,
            'creatorId': self.creatorId,
            'storyId': self.storyId,
            'body': self.body,
            'rating': self.rating,
            'created_at': self.created_at
        }