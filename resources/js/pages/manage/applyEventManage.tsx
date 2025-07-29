/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

// component
import AppLayout from "@/layouts/app-layout";
import { ListContainer, ListItemAction } from "@/components/common/list";
import { dialogAction, DialogBody, DialogCloseButton, DialogContainer, DialogFooter, DialogHeader } from "@/components/common/dialog";
import MsgBox, { msgBoxAction } from "@/components/common/msgBox";
import { Fragment } from "react/jsx-runtime";

// function
import { baseApi, uploadRes } from "@/lib/api";

//scss
import '../../../css/common.scss';
import '../../../css/group.scss';

const rejectDialogID = 'rejectReason';
const applyDialogID = 'apply';
const RejectReason = (props: {reject: (reason: string) => void}) => {
    const [reason, setReason] = useState("");
    const submit = () => {
        dialogAction(rejectDialogID, 'hide');
        props.reject(reason);
    }
    return (
        <DialogContainer id={rejectDialogID} scrollAble={true}>
            <DialogHeader>
                申請拒否理由
            </DialogHeader>
            <DialogBody>
                <div>
                    <textarea className="reject-textarea" rows={4} onChange={(e) => {setReason(e.target.value)}}></textarea>
                </div>
            </DialogBody>
            <DialogFooter>
                <button className="btn btn-success" onClick={() => {submit()}}>確認</button>
                <DialogCloseButton text="取り消し"/>
            </DialogFooter>
        </DialogContainer>
    )
}

const ApplyDialog = (props: {event: {[key: string]: any}, approve: () => void}) => {

    const rejectReason = () => {
        dialogAction(rejectDialogID, 'show');
    }
    return (
        <DialogContainer id={applyDialogID} scrollAble={true}>
            <DialogHeader>
                <h3>イベントー申請 ー {props.event.title}</h3>
            </DialogHeader>
            <DialogBody>
                <div>
                    <div>宣伝図：<img className="apply-img" src={"/storage/image/" + props.event.imgName}/></div>
                    <div>イベント名：{props.event.title}</div>
                    <div>開催グループ：{props.event.groupName}</div>
                    <div>イベンド概要：{props.event.desc}</div>
                    <div>関連リンク：<a href={props.event.link}>{props.event.link}</a></div>
                    <div>
                        開催期間：
                        {props.event.start} ~ {props.event.end}
                    </div>
                </div>
            </DialogBody>
            <DialogFooter>
                <button className="btn btn-success" onClick={() => {props.approve()}}>承認</button>
                <button className="btn btn-danger" onClick={() => {rejectReason()}}>拒否</button>
            </DialogFooter>
        </DialogContainer>
    )
}

const ApplyEventManage = () => {
    const [applyList, setApplyList] = useState<any>([]);
    const [processEvent, setProcessEvent] = useState<any>({});
    const [msg, setMsg] = useState("");
    const footerChild = <DialogCloseButton text="閉じる"></DialogCloseButton>;
    const init = () => {
        baseApi('getApplyEvent', {})
        .then((res) => {
            setApplyList([...res.data]);
        })
    }
    const applyDialog = (index: number) => {
        setProcessEvent(applyList[index]);
        dialogAction(applyDialogID, 'show');
    }
    const approve = () => {
        baseApi('approveEvent', {id: processEvent.id, group_id: processEvent.group_id})
        .then((res: uploadRes) => {
            if (res.data.errorMsg) {
                setMsg(res.data.errorMsg);
            } else {
                setMsg("申請を承認しました");
                msgBoxAction('show');
                dialogAction(applyDialogID, 'hide');
                init();
            }
        });
    }
    const reject = (reason: string) => {
        baseApi('rejectEvent', {id: processEvent.id, rejectReason: reason})
        .then((res: uploadRes) => {
            if (res.data.errorMsg) {
                setMsg(res.data.errorMsg);
            } else {
                setMsg("申請を拒否しました");
                msgBoxAction('show');
                dialogAction(applyDialogID, 'hide');
                init();
            }
        });
    }
    useEffect(() => {
        init();
    },[])
    return (
        <AppLayout>
            <div className="container-half mx-auto">
                <h1>イベント申請</h1>
                <ListContainer>
                    {applyList.length > 0 ?
                    applyList.map((item: {[key:string]: any}, index: number) => (
                        <div onClick={() => {applyDialog(index)}}>
                            <ListItemAction>
                                <div className="row">
                                    <div className="col">{item.title}</div>
                                    <div className="col">{item.ctime}</div>
                                </div>
                            </ListItemAction>
                        </div>
                    ))
                    : <Fragment/>}
                    
                </ListContainer>
            </div>
            <ApplyDialog event={processEvent} approve={() => {approve()}}/>
            <RejectReason reject={reject}/>
            <MsgBox msg={msg} footer={{"footerChild" : footerChild}}/>
        </AppLayout>
    )
}
export default ApplyEventManage;