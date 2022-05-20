import React from 'react';
import { Link } from 'react-scroll'

function ButtonLink(){
    function handleClick(){
        console.log("Clicked")
    }
    return(
        <Link to="test1" spy={true} smooth={true} duration={500} onClick={handleClick}>
                <button>
                    Click
                </button>
        </Link>
    )
}

export default ButtonLink