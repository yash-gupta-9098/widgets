

function CustomText({ as, variant, className, children }) {

    const CustomElement = as; 
    return (
      <CustomElement  className={`${className}`}>
        {children}
      </CustomElement>
    );
  } 



  export function Heading({
    className = '', 
    as,
    text,
    ...props
}) {
    return (
        <CustomText as={as} className={`${className}`} children={text} />
    )
}

 