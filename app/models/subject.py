from .db import db


class Subjects(db.Model):
    __tablename__ = 'subjects'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)

    material = db.relationship("MaterialDocumentations", back_populates="subject")
