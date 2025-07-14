import { Fragment, ReactNode } from "react";

export interface TabItemParam {
    id: string;
    title: string;
    children: ReactNode|string;
}
const Tabs = (props: {tabItem: TabItemParam[]}) => {
    return(
        <Fragment>
            <ul className="nav nav-tabs" id="tab" role="tablist">
                {props.tabItem? 
                props.tabItem.map((item, index) => (
                    <li className="nav-item" role="presentation" key={index}>
                        <button className={"nav-link" + (index === 0 ? " active" : "")} id={item.id + 'tab'} data-bs-toggle="tab" data-bs-target={"#" + item.id} type="button" role="tab" aria-controls={item.id} aria-selected="true">{item.title}</button>
                    </li>
                ))
                :<Fragment/>}
            </ul>
            <div className="tab-content" id="tabContent">
                {props.tabItem? 
                props.tabItem.map((item, index) => (
                    <div className={"tab-pane fade" + (index === 0 ? " show active" : "")} id={item.id} role="tabpanel" aria-labelledby="home-tab" key={index}>
                        {item.children}
                    </div>
                ))
                :<Fragment/>}
            </div>
        </Fragment>
    )
}
export { Tabs };
