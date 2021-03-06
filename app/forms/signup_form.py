from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    first_name = StringField('first_name', validators=[DataRequired(message='first name is required')])
    last_name = StringField('last_name', validators=[DataRequired(message='first name is required')])
    areas_of_interest = StringField('areas_of_interest')
    biography = StringField('biography', validators=[DataRequired(message='biography is required')])
    username = StringField('username', validators=[DataRequired(message='username is required'), username_exists])
    email = StringField('email', validators=[DataRequired(message='email is required'), user_exists])
    password = StringField('password', validators=[DataRequired(message='password is required')])
