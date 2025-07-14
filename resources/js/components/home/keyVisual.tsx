import React, { Fragment } from "react";
const KeyVisual = ({backgroundPath = '',imgPath = ''}: {backgroundPath:string, imgPath: string}) => {
    const imgLoaded = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.target.className = "keyVisual"; // start anime after img loaded
    }
    return (
        <div className="keyVisualContainer" style={{backgroundImage : `url(${backgroundPath})`, backgroundSize: `contain`}}>
            {imgPath?
            <img src={imgPath} onLoad={(e) => {imgLoaded(e)}}/>:
            <Fragment/>
            }
        </div>
    );
}
export default KeyVisual;