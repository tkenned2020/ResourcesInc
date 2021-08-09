from .db import db
from datetime import datetime

class Comments(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    material_documentationId = db.Column(db.Integer, db.ForeignKey("material_documentations.id", ondelete="CASCADE"), nullable=False)
    comment = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow())

    documentation = db.relationship("MaterialDocumentations", back_populates="comment")
    creators = db.relationship("User", back_populates="comments")

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'material_documentationId' : self.material_documentationId,
            'comment': self.comment,
            'created_at' : self.created_at,
        }

    @property
    def set_userId(self):
        return self.userId

    @set_userId.setter
    def set_userId(self, userId):
        self.userId = userId

    @property
    def set_material_documentationId(self):
        return self.material_documentationId

    @set_material_documentationId.setter
    def set_material_documentationId(self, material_documentationId):
        self.material_documentationId = material_documentationId

    @property
    def set_comment(self):
        return self.comment

    @set_comment.setter
    def set_comment(self, comment):
        self.comment = comment

    @property
    def set_created_at(self):
        return self.created_at

    @set_created_at.setter
    def set_created_at(self, created_at):
        self.created_at = created_at
