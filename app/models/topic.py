from .db import db, environment, SCHEMA, add_prefix_for_prod

class Topic(db.Model):
    __tablename__ = 'topics'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    creatorId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    topic = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.now())
    updated_at = db.Column(db.DateTime, default=db.func.now())

    exercisetopic = db.relationship("Exercise", back_populates="etopic")
    storytopic = db.relationship("Story", back_populates="stopic")
    towner = db.relationship("User", back_populates="topics")

    def to_dict(self):
        return {
            'id': self.id,
            'creatorId': self.creatorId,
            'topic': self.topic
        }