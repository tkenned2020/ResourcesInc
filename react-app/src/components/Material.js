import React, { /*useState,*/ useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getMaterials } from '../store/material';

function Material() {
  const dispatch = useDispatch();
  const materials = useSelector(state => Object.values(state.materials))
  console.log('what does this useSelector return', materials)


  useEffect( () => {
    dispatch(getMaterials())
  }, [dispatch])


  return (
    <div>
    {materials.map((material, idx) => (
      <div  key={idx}>
        <h2 >{material.title}</h2>
        <div>
          <h3><strong>{
          material.subjectId === 1 ? "Art"  : null ||
          material.subjectId === 2 ? "Mathematics"  : null ||
          material.subjectId === 3 ? "Welding"  : null ||
          material.subjectId === 4 ? "Automotive"  : null ||
          material.subjectId === 5 ? "Psychology"  : null ||
          material.subjectId === 6 ? "Software_Development"  : null ||
          material.subjectId === 7 ? "Construction"  : null ||
          material.subjectId === 8 ? "Agriculture"  : null
          }
          </strong></h3>
        </div>
        <div><h4>{material.synopsis}</h4></div>
        <div><p>{material.content}</p></div>
        <div>constructed by: <strong>{material.userId === 1 ? "JacksonW21" : null ||
                             material.userId === 2 ? "MarcusG44" : null
                             }</strong>
        </div>
        <br/>
        <div><button type="button">Comment</button> <button type="button">Edit</button> <button type="button">Delete</button>
        </div>
      </div>

    ))}
    </div>
  );
}
export default Material;
