from .db import db, environment, SCHEMA, add_prefix_for_prod

class Story(db.Model):
    __tablename__ = 'stories'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)        
    creatorId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    topicId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("topics.id")), nullable=False)
    title = db.Column(db.String, nullable=False)
    mood = db.Column(db.Integer, nullable=False)
    preview = db.Column(db.String(100))
    image_url = db.Column(db.String)
    body = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=db.func.now())
    updated_at = db.Column(db.DateTime, default=db.func.now())

    sowner = db.relationship("User", back_populates="stories")
    stopic = db.relationship("Topic", back_populates="storytopic")

    def to_dict(self):
        return {
            'id': self.id,
            'creatorId': self.creatorId,
            'topicId': self.topicId,
            'title': self.title,
            'mood': self.mood,
            'image_url': self.image_url,
            'preview': self.preview,
            'body': self.body,
            'created_at': self.created_at
        }