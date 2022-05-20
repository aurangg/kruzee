import React from "react";
import './common.css';


function LargeHeading(props){
    return(
        <h2 className="onboarding-heading">
            {props.large_heading}
        </h2>
    )
}

export default LargeHeading;