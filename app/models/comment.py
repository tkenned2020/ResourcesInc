from .db import db


class Comments(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    material_documentationId = db.Column(db.Integer, db.ForeignKey("material_documentations.id"), nullable=False)
    comment = db.Column(db.Text, nullable=False)

    documentation = db.relationship("MaterialDocumentations", back_populates="comment")
    creators = db.relationship("User", back_populates="comments")

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'material_documentationId' : self.material_documentationId,
            'comment': self.comment
        }
