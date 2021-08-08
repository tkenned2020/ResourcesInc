import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory, Navlink } from 'react-router-dom/cjs/react-router-dom.min';
import { getMaterials } from '../../store/material';

export default function HomeComp (){
  return (
    <div>
      <div>
        <h1>Resources Incorporated</h1>
      </div>
      <div>
        <h2>Welcomes you to express</h2>
      </div>
      <div>
        <h2>Your Knowledge</h2>
      </div>
      <div>
        <p>
        Resources Incorporated stands behind the Ideology of
        "Each One Teach One" and provides this platform to do just that.
        </p>
      </div>
    </div>
  )
}
