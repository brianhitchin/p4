from .db import db, environment, SCHEMA, add_prefix_for_prod

class Exercise(db.Model):
    __tablename__ = 'exercises'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    creatorId = db.Column(db.Integer, nullable=False)
    topicId = db.Column(db.Integer, nullable=False)
    name = db.Column(db.String, nullable=False)
    preview = db.Column(db.String(100))
    image_url = db.Column(db.String)
    body = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=db.func.now())
    updated_at = db.Column(db.DateTime, default=db.func.now())

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