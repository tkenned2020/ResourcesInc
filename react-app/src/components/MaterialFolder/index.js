import React, { /*useState,*/ useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getMaterials } from '../../store/material';
import styles from './Material.module.css'


function Material() {
  const dispatch = useDispatch();
  const materials = useSelector(state => Object.values(state.material.all))
  console.log('what does this useSelector return', materials)
  console.log(
    'why isnt material.citation displayed', materials.citation
  )

  useEffect( () => {
    dispatch(getMaterials())
  }, [dispatch])


  return (
    <div className={styles.materialHolder} styles={{margin: '12px 13px 14px 15px'}}>
    <br/>
    {materials.map((material, idx) => (
      <div style={{border: 'solid', marginBottom: "12px"}} key={idx}>
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
        <div>{material.citation}</div>
        <div><h4>{material.synopsis}</h4></div>
        <div><p>{material.content}</p></div>
        <div>constructed by: <strong>{material.userId === 1 ? "JacksonW21" : null ||
                             material.userId === 2 ? "MarcusG44" : null
                             }</strong>
        </div>
        <br/>

        <div><button type="button">Comment</button>
        <button type="button">Delete</button>
        </div>
        <br/>
      </div>

    ))}
    </div>
  );
}
export default Material;
//
