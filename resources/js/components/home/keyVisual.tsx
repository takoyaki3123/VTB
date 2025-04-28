import React, { Fragment } from "react";
const KeyVisual = ({backgroundPath = '',imgPath = ''}: {backgroundPath:string, imgPath: string}) => {
    return (
        <div className="keyVisualContainer" style={{backgroundImage : `url(${backgroundPath})`, backgroundSize: `cover`}}>
            {imgPath?
            <img className="keyVisual" src={imgPath}/>:
            <Fragment/>
            }
        </div>
    );
}
export default KeyVisual;