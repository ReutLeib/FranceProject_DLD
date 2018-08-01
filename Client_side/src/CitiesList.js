
import React from 'react';

// add the card of book
const CitiesList = ({ values, index }) => (
  <div>
   { values && values.map( (item, index) => 
       <div key={'container'+index}className="card" style={{width: 18 + 'rem'}}>
         <div className="card-body">
          <div key={'book'+index} index={index} >
              <h5 className="card-title">{item[0]}</h5>
               <p className="card-text">{item[1]}</p>
          </div>
        </div>
      </div>
    )}
  </div>
    
  );

export default CitiesList;