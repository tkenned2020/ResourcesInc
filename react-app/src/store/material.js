/* create and define action types as constains */

const ADD_MATERIAL = "session/ADD_MATERIAL";
const SET_MATERIALS = "session/SET_MATERIALS";
const DELETE_ONE = "session/DELETE_ONE";

/* create and define action creators */


const addMaterialToStore = (material) => ({ //use to add one material to the store
  type: ADD_MATERIAL, //action type = action.type
  material //payload = action.payload
})

const setAllMaterialsToStore = (materials) => ({ //use to set all material to the store
  type: SET_MATERIALS, //action type = action.type
  materials //payload = action.payload
})

const deleteMaterialFromStore = (materialId) => ({ //use to retrieve material that is destined for deletion from store
  type: DELETE_ONE, //action type = action.type
  materialId //payload = action.payload
})


/* create and define thunk action creators */

export const getMaterials = () => async (dispatch) => {
  const response = await fetch("/api/materials")

  if (response.ok){
    const data = await response.json();
    const allMaterials = data.materials
    dispatch(setAllMaterialsToStore(allMaterials))
    return allMaterials;

  } else if (response.status < 500) {
    const data = await response.json();

    if (data.errors) {
      return data.errors;
    }

  } else {
    return ['An error occurred. Please try again.']
  }
  /*
  this thunk grabs all the material to be displayed and styled
  if unsuccessful it will send errors
  */
}


export const editMaterial = (materialToBeEdit) => async (dispatch) => {
  const response = await fetch(`/api/materials/${materialToBeEdit.id}/edit`, {
    method: "PATCH",
    body: JSON.stringify(materialToBeEdit),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok){
    const editMaterialContent = await response.json();
    dispatch(addMaterialToStore(editMaterialContent))
    return editMaterialContent;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }

  /*
  this thunk grabs a pre-existing material to be edited and returns the edit version of the material.
  if unsuccessful, it will return errors
  */
}

export const deleteMaterial = (materialId) => async dispatch => {
  const response = await fetch(`/api/materials/${materialId}`, { method: 'DELETE', })

  if (response.ok){
    const deletedMaterial = response.json();
    dispatch(deleteMaterialFromStore(materialId))
    return deletedMaterial;
  }
  return null;
  /*
  this thunk grabs an existing material that is destined to be deleted from the store/database
  if unsuccessful, it will return null
  */
}


/* create and define initialstate */
const initialState = {}


export default function materialReducer(state = initialState, action){
  let newState;
  switch (action.type){
    case ADD_MATERIAL:
      newState = {}
      newState[action.material.id] = action.material
      return { ...state, ...newState };
    case SET_MATERIALS:
      newState = {}
      action.materials.forEach(material => (newState[material.id] = material))
      return { ...state, ...newState };
    case DELETE_ONE:
      newState = Object.assign({}, state)
      delete newState[action.materialId]
      return { ...newState };
    default:
      return state;
  }
}
