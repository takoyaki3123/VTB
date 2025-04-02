import React from "react";
const KeyVisual = ({backgroundPath = '',imgPath = ''}: {backgroundPath:string, imgPath: string}) => {
    return (
        <div className="keyVisualContainer" style={{backgroundImage : `url(${backgroundPath})`, backgroundSize: `cover`}}>
            <img className="keyVisual" src={imgPath}/>
        </div>
    );
}
export default KeyVisual;