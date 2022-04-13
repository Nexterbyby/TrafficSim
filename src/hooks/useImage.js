import { useState } from "react";

const useImage = initialValue => {
    const [image, setImage] = useState(initialValue);

    const setHeight = height => {
        image.height = height;
    }

    const setWidth = width => {
        image.width = width;
    }

    return [image, setImage, setHeight, setWidth];
}

export default useImage;