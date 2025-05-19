/* eslint-disable @typescript-eslint/no-explicit-any */

import { ReactNode } from "react";
import { Modal } from "bootstrap";
import $ from "jquery";
const DialogContainer = (props: {id: string, scrollAble: boolean,  children: ReactNode, className?: string, onClose?: () => void}) => {

    $('#' + props.id).on('hidden.bs.modal', function () {
        if (props.onClose) {
            props.onClose();
        }
    });
    return (
        <div className={"modal " + (props.className ?? '')} id={props.id} data-bs-backdrop="static">
            <div className={"modal-dialog  modal-dialog-centered" + (props.scrollAble ? ' modal-dialog-scrollable' : '')}>
                <div className="modal-content">
                    {props.children}
                </div>
            </div>
        </div>
    );
}

const DialogHeader = (props: {children?: ReactNode}) => {
    return (
        <div className="modal-header">
            {props.children}
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
    )
}

const DialogBody = (props: {children?: ReactNode}) => {
    return (
        <div className="modal-body">
            {props.children}
        </div>
    )
}

const DialogFooter = (props: {children?: ReactNode, className?: string}) => {
    return (
        <div className={"modal-footer " + props.className}>
            {props.children}
        </div>
    )
}
const DialogCloseButton = (props: {text: string, onClick?: (event: React.MouseEvent) => void}) => {
    return (
        <button type="button" className="btn btn-danger" onClick={props.onClick} data-bs-dismiss="modal" aria-label="Close">{props.text}</button>
    )
}
const DialogButton = (props: {target:string, text: string, className: string, onClick: (event: React.MouseEvent) => void | undefined}) => {
    return (
        <button type="button" className={"btn " + (props.className ?? '')} data-bs-toggle="modal" data-bs-target={props.target} onClick={props.onClick}>
            {props.text}
        </button>
    )
}
export function dialogAction (id: string, action: string) {
    const dialogTag = document.getElementById(id);
    if (dialogTag) {
        const dialog = Modal.getOrCreateInstance(dialogTag);
        
        switch(action) {
            case 'show':
                dialog.show();
                break;
            case 'hide':
                dialog.hide();
                break;
        }
    }
};

export {DialogContainer, DialogHeader, DialogBody, DialogFooter, DialogButton, DialogCloseButton};