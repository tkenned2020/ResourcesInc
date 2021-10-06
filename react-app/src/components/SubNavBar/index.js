/*
In this component there will be a sub nav bar that will list all of the subjects
 { Art, Math, Science, etc }

 each section will take the user to a web page that will display content on that subject
*/

import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { subject } from '../../store/'
