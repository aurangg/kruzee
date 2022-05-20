import React from 'react';
import './common.css';

function Paragraph(props){
    return(
        <p className='onboarding-description'>
            {props.paragraph}
        </p>
    )
}

export default Paragraph;