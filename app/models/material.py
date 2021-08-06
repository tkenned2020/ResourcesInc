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
    citation = db.Column(db.String, nullable=True)
    created_at = db.Column(db.DateTime, nullable=True, default=datetime.utcnow)

    subject = db.relationship("Subjects", back_populates="material")
    comment = db.relationship("Comments", back_populates="documentation",  cascade="all, delete", passive_deletes=True)
    material_creator = db.relationship("User", back_populates="documentation")

    # class MaterialDocumentations(Base):
    # __tablename__ = 'parent'
    # id = Column(Integer, primary_key=True)
    # children = relationship(
    #     "Child", back_populates="parent",
    #     cascade="all, delete",
    #     passive_deletes=True
    # )

# class Child(Base):
#     __tablename__ = 'child'
#     id = Column(Integer, primary_key=True)
#     parent_id = Column(Integer, ForeignKey('parent.id', ondelete="CASCADE"))
#     parent = relationship("Parent", back_populates="children")


    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'subjectId' : self.subjectId,
            'title': self.title,
            'synopsis' : self.synopsis,
            'content' : self.content,
            'citation' : self.citation
        }

    @property
    def set_title(self):
        return self.title

    @set_title.setter
    def set_title(self, title):
        self.title = title

    @property
    def set_subjectId(self):
        return self.subjectId

    @set_subjectId.setter
    def set_subjectId(self, subjectId):
        self.subjectId = subjectId

    @property
    def set_synopsis(self):
        return self.synopsis

    @set_synopsis.setter
    def set_synopsis(self, synopsis):
        self.synopsis = synopsis

    @property
    def set_content(self):
        return self.content

    @set_content.setter
    def set_content(self, content):
        self.content = content

    @property
    def set_citation(self):
        return self.citation

    @set_citation.setter
    def set_citation(self, citation):
        self.citation = citation
