from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import MaterialDocumentations




class MaterialCreationForm(FlaskForm):
    title = StringField("title", validators=[DataRequired(), Length(min=1, max=250, message="title must be less than or equal to 250 characters")])
    subject = StringField("subject", validators=[DataRequired()])
    synopsis = StringField("synopsis", validators=[DataRequired()])
    content = StringField("content", validators=[DataRequired()])



class EditMaterialForm(FlaskForm):
    title = StringField("title", validators=[DataRequired(), Length(min=1, max=250, message="title must be less than or equal to 250 characters")])
    subject = StringField("subject", validators=[DataRequired()])
    synopsis = StringField("synopsis", validators=[DataRequired()])
    content = StringField("content", validators=[DataRequired()])
