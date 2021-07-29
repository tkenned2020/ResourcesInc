from .db import db
from datetime import datetime

class MaterialDocumentations(db.Model):
    __tablename__ = "material_documentations"

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    subjectId = db.Column(db.Integer, db.ForeignKey("subjects.id"), nullable=False)
    title = db.Column(db.String(250), nullable=False)
    synopsis = db.Column(db.Text, nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    subject = db.relationship("Subjects", back_populates="material")
    comment = db.relationship("Comments", back_populates="documentation")
    material_creator = db.relationship("User", back_populates="documentation")

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'subjectId' : self.subjectId,
            'title': self.title,
            'synopsis' : self.synopsis,
            'content' : self.content
        }
