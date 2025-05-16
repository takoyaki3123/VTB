/* eslint-disable @typescript-eslint/no-explicit-any */

import { Fragment } from "react/jsx-runtime";

const Card = (props:{imgName: string, title?: string, content?: string, class?: string}) => {
    return (
        <div className={"card " + props.class}>
            <div className="card-img-container">
                <img src={"/storage/image/" + props.imgName} className="card-img-top img-fluid" alt="..."></img>
            </div>
            <div className="card-body">
                { (props.title) ? <h5 className="card-title">{props.title}</h5> : <Fragment></Fragment> }
                { (props.content) ? <p className="card-text">{props.content}</p> : <Fragment></Fragment> }
            </div>
        </div>
    )
}
export default Card;