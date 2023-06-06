from .db import db, environment, SCHEMA, add_prefix_for_prod

class CommentE(db.Model):
    __tablename__ = 'commente'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    creatorId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    exerciseId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("exercises.id")), nullable=False)
    body = db.Column(db.Text)
    rating = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.now())
    updated_at = db.Column(db.DateTime, default=db.func.now())

    ecommentowner = db.relationship("User", back_populates="ecomments")
    ecommentexercise = db.relationship("Exercise", back_populates="exercisecomments")

    def to_dict(self):
        return {
            'id': self.id,
            'creatorId': self.creatorId,
            'exerciseId': self.exerciseId,
            'body': self.body,
            'rating': self.rating,
            'created_at': self.created_at
        }