import { DialogBody, DialogContainer, DialogFooter, DialogHeader } from "@/components/common/dialog";
import { Modal } from "bootstrap";
import { Fragment, ReactNode } from "react";

const MsgBox = (props: {msg: string, header?: {headerChild: ReactNode}, footer?: {footerChild: ReactNode}}) => {
    return (
        <DialogContainer id="messageBox" scrollAble={false}>
            {props.header?
                <DialogHeader>
                    {props.header.headerChild}
                </DialogHeader>
            : <Fragment/>}
            <DialogBody>
                <div className="d-flex justify-content-center">
                    {props.msg}
                </div>
            </DialogBody>

            {props.footer ?
            <DialogFooter className="d-flex justify-content-center">
                {props.footer.footerChild}
            </DialogFooter>
            : <Fragment/>}
        </DialogContainer>
    );
}
export function msgBoxAction (action: string) {
    const msgBoxTag = document.getElementById('messageBox');
    if (msgBoxTag) {
        const msgBoxDialog = new Modal(msgBoxTag);
        console.log(msgBoxTag);
        
        switch(action) {
            case 'show':
                msgBoxDialog.show();
                break;
            case 'hide':
                msgBoxDialog.hide();
                break;
        }
    }
};

export default MsgBox;

