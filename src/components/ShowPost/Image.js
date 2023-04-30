import React from 'react';

const Image = ({ src, caption }) => {
    return (
        <img className='img'
            src={src}
            alt={caption}
        />
    );
};

export default Image;