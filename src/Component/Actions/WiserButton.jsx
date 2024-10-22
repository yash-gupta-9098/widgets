import React from 'react'



function CustomButton({href , type ,  disabled , name  , value , className , Buttonstate , children , icon , tone , role , onClick , onFocus , onBlur , onKeyPress , onKeyUp , onKeyDown , onMouseEnter}){
    


        return (
          <>
          {href && (
            <a children={children} href={href} className={`${className}`}>{children}</a>
            )}
            {
              !href && (
                <button children={children} type={type} className={`${className}`} onClick={onClick}>{children}</button>
              )
            }
          </>
        )
        
}





export function WiserButton({text , href ,  role , type , name , className , onClick}) {
  return (
    <CustomButton href={href} children={text} role={role}  type={type} name={name} className={className} onClick={onClick}/> 
  )
}

