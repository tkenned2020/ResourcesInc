/* create and define action types as const */

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


const setMaterialToStore = (material) => ({
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


export const createMaterial = (material, history) => async (dispatch) => {
  console.log('this is material from createMaterial', material)
  const response = await fetch(`/api/materials/create`, {
    method: "POST",
    headers: { 'Content-Type' : 'application/json'},
    body: JSON.stringify(material),

  })
  // console.log('this is response.body', response.body)
  console.log('this is response from the fetch', response)
  if (response.ok){
    const newMaterial = await response.json()
    console.log("this is newMaterial from response.json")
    dispatch(setMaterialToStore(newMaterial))
    history.push('/materials')
  } else if (response.status < 500) {
    const data = await response.json();
    console.log("what is data", data)
    if (data.errors) {
      return data.errors;
    }
  }
}


export const singleMaterial = (materialId) => async (dispatch) => {
  const response = await fetch(`/api/materials/${materialId}`)
  // console.log('the response to the fetch call', response)

  if (response.ok){
    const oneMaterial = await response.json();
    // console.log('oneMaterial.id ---->', oneMaterial)

    console.log('this is for the win!', oneMaterial)
    dispatch(setMaterialToStore(oneMaterial))
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

export const editMaterial = (editMaterial) => async (dispatch) => {
  console.log("this is editMaterial -->", editMaterial)
  const response = await fetch(`/api/materials/${editMaterial.id}/edit`, {

    method: "PATCH",
    body: JSON.stringify(editMaterial),
    headers: {
      "Content-Type": "application/json",
    },

  });
  console.log('does this response return correctly', response)
  if (response.ok){
    const editMaterialContent = await response.json();
    console.log('this is the response.json()', editMaterialContent)
    dispatch(setMaterialToStore(editMaterialContent))
    return editMaterialContent;
  } else {
    const data = await response.json()
    return data.errors
  };


  /*
  this thunk grabs a pre-existing material to be edited and returns the edit version of the material.
  if unsuccessful, it will return errors
  */
}


export const deleteMaterial = (materialId, history) => async dispatch => {
  // console.log('what is materialId--->', materialId)
  // const { id } = formObj
  // const formData = {id}
  const response = await fetch(`/api/materials/${materialId}`,
  { method: 'DELETE',
    // body: JSON.stringify(formData)
})

  if (response.ok){
    const data = await response.json();
    const updatedMaterialsList = data.materials
    console.log('what is this data.materials', data.materials)
    dispatch(setAllMaterialsToStore(updatedMaterialsList))
    history.push('/materials')
    return updatedMaterialsList;
  } else {
    const data = await response.json()
    return data.errors
  }
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
      return { ...state, current : action.material };
    case SET_MATERIAL:
      return { ...state, current : action.material };
    case SET_MATERIALS:
      newState = {...state}
      for(let key in action.materials){
        let material = action.materials[key]
        newState.all[key] = material
      }
      return newState;
    default:
      return state;
  }
}
