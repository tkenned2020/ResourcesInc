import React, { /*useState,*/ useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getMaterials } from '../../store/material';
import { getComments } from '../../store/comment';
// import { }
import styles from './Material.module.css'


export default function Material() {
  const dispatch = useDispatch();
  const materials = useSelector(state => Object.values(state.material.all))
  const comments = useSelector(state => Object.values(state.comments.all))
  console.log('what does this useSelector return', materials)
  console.log('what does this useSelector/comments return ', comments)


  materials.map(material => console.log('show me the comments===>',material.comments))

  useEffect( () => {
    dispatch(getMaterials())
    dispatch(getComments())
  }, [dispatch])


  return (
    <div className={styles.materialHolder}>
    <br/>
    {materials.map((material, idx) => (
      <React.Fragment>
      <div className={styles.singleMaterial}  style={{border: 'solid', marginBottom: "12px"}} key={idx}>
        <h2 ><NavLink to={`/materials/${material.id}`}>{material.title}</NavLink> </h2>
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
        <div>{material.citation === null ? "Citations belong here" : material.citation}</div>
        <div>constructed by: <strong>{material.userId === 1 ? "JacksonW21" : null ||
                             material.userId === 2 ? "MarcusG44" : null
                             }</strong>
        </div>
        <br/>
      </div>

      <div>
      {material.comments.map(comment => comment.comment)}
      </div>
    </React.Fragment>
    ))}
    <br/>

    </div>
  );
}
//
