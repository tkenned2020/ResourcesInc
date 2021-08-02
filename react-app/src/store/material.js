/* create and define action types as constains */

const ADD_MATERIAL = "material/ADD_MATERIAL";
const SET_MATERIALS = "material/SET_MATERIALS";
const SET_MATERIAL = "material/SET_MATERIAL";
const DELETE_ONE = "material/DELETE_ONE";

/* create and define action creators */


const addMaterialToStore = (material) => ({ //use to add one material to the store
  type: ADD_MATERIAL, //action type = action.type
  material //payload = action.payload
})

const setAllMaterialsToStore = (materials) => ({ //use to set all material to the store
  type: SET_MATERIALS, //action type = action.type
  materials //payload = action.payload
})

const grabOneMaterialFromStore = (material) => ({
  type: SET_MATERIAL, //action type = action.type})
  material //payload = action.payload

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


export const singleMaterial = (materialId) => async (dispatch) => {
  const response = await fetch(`/api/materials/${materialId}`)
  console.log('the response to the fetch call', response)

  if (response.ok){
    const oneMaterial = await response.json();
    // console.log('oneMaterial.id ---->', oneMaterial)

    console.log('this is for the win!', oneMaterial)
    dispatch(grabOneMaterialFromStore(oneMaterial))
    return oneMaterial;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  };
  /*
  this thunk grabs an existing material that to be displayed from the store/database
  if unsuccessful, it will return null
  */
}

export const editMaterial = (material) => async (dispatch) => {
  const response = await fetch(`/api/materials/${material.id}`, {
    method: "PATCH",
    body: JSON.stringify(material),
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
const initialState = {
  current: null,
  all: {}
  //state.material.materials
}


export default function reducer(state = initialState, action){

  let newState;
  switch (action.type){
    case ADD_MATERIAL:
      newState = {}
      newState[action.material.id] = action.material
      console.log('this is coming from the add_material case section', action.material)
      return { ...state, ...newState };
    case SET_MATERIAL:
      // newState.current = action.material

      // console.log('---------- what is this (action.material)', action.material)
      // console.log('---------- what about this (newState)', newState)
      return { ...state, current : action.material };
    case SET_MATERIALS:
      newState = {...state}
      // console.log(" is an Array --->", Array.isArray(action.materials))
      // console.log(" action.materials ----> ",action.materials)
      // console.log('array action.materials ---->',[action.materials])
      // console.log('----------------------------------')
      // console.log('what is this ',action.materials[0])
      // console.log('----------------------------------')
      // console.log('-------', Object.keys(action.materials))
      // console.log('-------', Object.values(action.materials))
      // console.log('what is this ', action)
      for(let key in action.materials){
        let material = action.materials[key]
        newState.all[key] = material
      }
      return newState;
    case DELETE_ONE:
      newState = Object.assign({}, state)
      delete newState[action.materialId]
      return { ...newState };
    default:
      return state;
  }
}
