import React from 'react'

export function SkeletonBodyText({line}) {
    let array = [] 
    array.length = line;
    array.fill(5);
  return (          
      <>
      
       
    { array && array.length > 0 && array.map((i)=> (        
        <div className='ws_SkeletonBodyText'></div>
    ))}
</> 
  )
    
    } 
    
  








