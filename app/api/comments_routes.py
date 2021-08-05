from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, MaterialDocumentations, Comments

comments_routes = Blueprint('comments', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@comments_routes.route('')
def get_comments():
    """
    this retrieves all of the material/documentation from the database
    """
    all_comments = Comments.query.all()
    print('what is this actually',  [comment.to_dict() for comment in all_comments])
    if all_comments:
        return {"comments" : [comment.to_dict() for comment in all_comments]}
    else:
        return {"There seems to be a disconnect, an error occurred trying to retrieve documentation from the database"}


# @comments_routes.route()
