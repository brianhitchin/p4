from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    exercises = db.relationship("Exercise", back_populates="eowner", cascade="all, delete, delete-orphan")
    stories = db.relationship("Story", back_populates="sowner", cascade="all, delete, delete-orphan")
    topics = db.relationship("Topic", back_populates="towner", cascade="all, delete, delete-orphan")
    groups = db.relationship("Group", back_populates="gowner", cascade="all, delete, delete-orphan")
    memberships = db.relationship("Membership", back_populates="mowner", cascade="all, delete, delete-orphan")
    storycomments = db.relationship("CommentS", back_populates="scommentowner", cascade="all, delete, delete-orphan")
    ecomments = db.relationship("CommentE", back_populates="ecommentowner", cascade="all, delete, delete-orphan")
    

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name
        }
