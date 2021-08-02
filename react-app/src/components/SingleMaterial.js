import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { singleMaterial } from '../store/material';

function SingleMaterial() {
  const dispatch = useDispatch();
  const { materialId } = useParams()
  console.log('what does this useParams return', materialId)


  useEffect(() => {
    // console.log('is this the info i need?', id)
    dispatch(singleMaterial(materialId))
  }, [dispatch, materialId])

const material = useSelector(state => state.material.current)
console.log('this is material from singleMaterial', material)

  return material && (
    <div styles={{margin: '12px 13px 14px 15px'}}>
    <br/>
      <div style={{border: 'solid', marginBottom: "12px"}} key={material.id}>
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
        <br/>
      </div>
    </div>
  );
}
export default SingleMaterial;
//
