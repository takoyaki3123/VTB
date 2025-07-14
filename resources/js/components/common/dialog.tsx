/* eslint-disable @typescript-eslint/no-explicit-any */

import { ReactNode, useRef } from "react";
import { Modal } from "bootstrap";
import { useMutationObserver } from "@/lib/mutationObserver";
import { mutationOption } from "@/types";
const DialogContainer = (props: {id: string,  children: ReactNode, scrollAble?: boolean, className?: string, onClose?: () => void}) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const option: mutationOption = {
        CharacterData: false,
        childList: false,
        subtree: false,
        attributes: true,
        attributeFilter: ['class']
    }
    const mutationCallback = () => {
        if (props.onClose != undefined) {
            if (!modalRef.current!.classList.contains("show")) {
                props.onClose();
            }
        }
    }

    useMutationObserver(modalRef, mutationCallback, option);
    return (
        <div className={"modal " + (props.className ?? '')} id={props.id} data-bs-backdrop="static" ref={modalRef}>
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