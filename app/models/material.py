from .db import db


class MaterialDocumentations(db.Model):
    __tablename__ = "material_documentations"

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    subjectId = db.Column(db.Integer, db.ForeignKey("subjects.id"), nullable=False)
    title = db.Column(db.String(250), nullable=False)
    synopsis = db.Column(db.TextArea, nullable=False)
    content = db.Colunm(db.TextArea, nullable=False)

 