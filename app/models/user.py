from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    areas_of_interest = db.Column(db.Text, nullable=True)
    biography = db.Column(db.Text, nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    comments = db.relationship("Comments", back_populates="creators")
    documentation = db.relationship("MaterialDocumentations", back_populates="material_creator")


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
            'first_name' : self.first_name,
            'last_name' : self.last_name,
            'areas_of_interest' : self.areas_of_interest,
            'biography' : self.biography,
            'username': self.username,
            'email': self.email
        }
