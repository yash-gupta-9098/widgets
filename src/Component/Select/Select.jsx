import { useEffect, useMemo} from "react";

export function Select({
    label, 
    options, 
    value,
    name,
    disabled,
    placeholder,
    setPrice, 
    price,
    id,
    imageUrl,
    setImageUrl,
    setVid, 
    vid,
    comparePrice, 
    setComparePrice
}){   

    // Find the selected variant data using useMemo for optimization
    const selectedVariant = useMemo(() => (
        options.find((item) => item.node.id === vid)
    ), [vid, options]);

    // Update price, compare price, and image URL when the selected variant changes
    useEffect(() => {
        if (selectedVariant) {
            console.log(selectedVariant, "Selected Variant");

            // Set price and compare price if available
            setPrice(selectedVariant.node.price);
            setComparePrice(selectedVariant.node.compareAtPrice);

            console.log(`Price: ${selectedVariant.node.price}`);
            console.log(`Compare Price: ${selectedVariant.node.compareAtPrice}`);
            // Update the image URL if available
            if (selectedVariant.node.image && selectedVariant.node.image.url) {
                setImageUrl(selectedVariant.node.image.url);
            }
        }
    }, [selectedVariant, setPrice, setComparePrice, setImageUrl]);

    // Auto-select the first variant when options are loaded
    useEffect(() => {
        const firstEnabledOption = options.find(option => option.node.availableForSale); 
        if (firstEnabledOption) {
            setVid(firstEnabledOption.node.id);
        }
    }, [options, setVid]);

    // Handle change event when a variant is selected from the dropdown
    const handleSelectChange = (e) => {
        const selectedVariantId = e.target.value;
        setVid(selectedVariantId); // Update the selected variant ID
    };

    return (      
        <>
        {options && options.length > 1 && 
        <select
            id={id}
            onChange={handleSelectChange}
            className="ws_Product_options"
        >
            {placeholder && <option disabled value="">{placeholder}</option>}
            {options.map((option) => (
                <option 
                    disabled={!option.node.availableForSale} 
                    key={option.node.id} 
                    value={option.node.id}
                >
                    {option.node.title}
                </option>
            ))}
        </select>
        }
        </>
    );
}
