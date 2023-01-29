import React from 'react'
import {Loader} from "semantic-ui-react";

const BackDrop = () => {
    return (
        <div className="loader-wrapper">
            <Loader active size={"big"} />
        </div>
    )
}

export default BackDrop
