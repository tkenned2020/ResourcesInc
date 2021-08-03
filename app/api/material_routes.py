from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.forms.material_form import MaterialCreationForm, EditMaterialForm
from app.models import db, MaterialDocumentations


material_routes = Blueprint('materials', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@material_routes.route('')
def get_materials():
    """
    this retrieves all of the material/documentation from the database
    """
    all_materials = MaterialDocumentations.query.all()
    # print('what is this actually', [material.to_dict() for material in all_materials])
    if all_materials:
        return {"materials" : [material.to_dict() for material in all_materials]}
    else:
        return {"There seems to be a disconnect, an error occurred trying to retrieve documentation from the database"}



@material_routes.route('/<int:id>')
def get_material(id):
    """
    this retrieves a single material/documentation
    """
    material = MaterialDocumentations.query.get(id)
    if material:
        # material_json = jsonify({ "payload" : { "material" : material.to_dict()}})
        return material.to_dict()
        # return material_json
    else:
        return {f'There seems to be a disconnect, an error occurred trying to retrieve {material} from the database'}



@material_routes.route('/create', methods=['POST'])
@login_required
def create_material():
    """
    this creates material/documentation and sends it to the database
    """
    form = MaterialCreationForm()
    #As written in the MaterialCreationForm(variables)
    form['csrf_token'].data = request.cookies['csrf_token']
    form['title'].data = request.json['material']['title']
    form['subject'].data = request.json['material']['subject']
    form['synopsis'].data = request.json['material']['synopsis']
    form['content'].data = request.json['material']['content']
    form['citation'].data = request.json['material']['citation']

    if form.validate_on_submit():
        material = request.json['material']
        #creating an instance of the MaterialDocumentations class
        material = MaterialDocumentations(
            user_id=material["userId"],
            subject_id=material["subjectId"],
            title=material["title"],
            synopsis=material["synopsis"],
            content=material["content"],
            citation=material['citation'],
            created_at=material["created_at"],
        )
        #adding and commiting to the database
        db.session.add(material)
        db.session.commit()
        #grabbing the newly created instance and returning it
        id = material.id
        newly_created_material = MaterialDocumentations.query.get(id)
        new_material = newly_created_material.to_dict()

        return {"new_material": new_material}
    # if !validatated_on_submit
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401


@material_routes.route("/<int:id>/edit", methods=["PATCH"])
def edit_material(id):
    """
    This grabs material from the database to be edited
    """
    form = EditMaterialForm()
# right side is form var ------------- left side is the model var
    form["csrf_token"].data = request.cookies['csrf_token']
    form["title"].data = request.json["title"]
    form["subject"].data = request.json["subjectId"]
    form["synopsis"].data = request.json["synopsis"]
    form["content"].data = request.json["content"]
    form["citation"].data = request.json["citation"]

    if form.validate_on_submit():
    #if successful, grabs the specific material by id
        material = MaterialDocumentations.query.get(id)

        material.title = form["title"].data
        material.subjectId = form["subject"].data
        material.synopsis = form["synopsis"].data
        material.content = form["content"].data
        material.citation = form["citation"].data
        material.created_at= form["created_at"].data
    #if successful, add the edited material's content to the database and return it
        db.session.add(material)
        db.session.commit()
        return material.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@material_routes.route('/<int:id>', methods=['DELETE'])
def delete_material(id):
    """
    this retrieves a single material/documentation and destroys it
    """
    material = MaterialDocumentations.query.get(id)
    db.session.delete(material)
    db.session.commit()
    return {"Deletion": f'{material} has been erased'}
