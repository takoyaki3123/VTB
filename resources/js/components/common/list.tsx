import * as React from "react"

const ListContainer = ({className, children}: React.ComponentProps<"div">) => {
    return (
        <div className={"list-group " + className}>
            {children}
        </div>
    )
}

const ListItem = ({className, children}: React.ComponentProps<"div">) => {
    return (
        <div className={"list-group-item " + className}>
            {children}
        </div>
    )
}

const ListItemAction = ({className, children}: React.ComponentProps<"div">) => {
    return (
        <div className={"list-group-item list-group-item-action " + className}>
            {children}
        </div>
    )
}
export {ListContainer, ListItem, ListItemAction}