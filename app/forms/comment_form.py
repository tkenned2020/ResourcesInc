from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import Comments




class CommentsForm(FlaskForm):
    comments = StringField('comments', validators=[DataRequired()] )
    


class CommentsEditForm(FlaskForm):
    comments = StringField('comments', validators=[DataRequired()] )
    
