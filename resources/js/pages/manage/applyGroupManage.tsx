/* eslint-disable @typescript-eslint/no-explicit-any */
import { ListContainer, ListItemAction } from "@/components/common/list";
import Navbar from "@/components/common/navbar";
import { baseApi, uploadRes } from "@/lib/api";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { Fragment } from "react/jsx-runtime";
import { dialogAction, DialogBody, DialogCloseButton, DialogContainer, DialogFooter, DialogHeader } from "@/components/common/dialog";
import MsgBox, { msgBoxAction } from "@/components/common/msgBox";
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

const ApplyDialog = (props: {processGroup: {[key: string]: any}, approve: () => void}) => {

    const rejectReason = () => {
        dialogAction(rejectDialogID, 'show');
    }
    return (
        <DialogContainer id={applyDialogID} scrollAble={true}>
            <DialogHeader>
                <h3>グループ申請ー{props.processGroup.name}</h3>
            </DialogHeader>
            <DialogBody>
                <div>
                    <div>グループ名：{props.processGroup.name}</div>
                    <div>グループ紹介：{props.processGroup.desc}</div>
                    <div>サイト：<a href={props.processGroup.link}>{props.processGroup.link}</a></div>
                    <div>宣伝図：<img className="apply-img" src={"/storage/image/" + props.processGroup.imgName}/></div>
                </div>
            </DialogBody>
            <DialogFooter>
                <button className="btn btn-success" onClick={() => {props.approve()}}>承認</button>
                <button className="btn btn-danger" onClick={() => {rejectReason()}}>拒否</button>
            </DialogFooter>
        </DialogContainer>
    )
}

const ApplyGroupManage = () => {
    const [applyList, setApplyList] = useState<any>([]);
    const [processGroup, setProcessGroup] = useState<any>({});
    const [msg, setMsg] = useState("");
    const footerChild = <DialogCloseButton text="閉じる"></DialogCloseButton>;
    const init = () => {
        baseApi('getApplyGroup', {})
        .then((res: uploadRes) => {
            setApplyList([...res.data]);
        })
    }
    const applyDialog = (index: number) => {
        setProcessGroup(applyList[index]);
        dialogAction(applyDialogID, 'show');
    }
    const approve = () => {
        baseApi('approveGroup', {id: processGroup.id})
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
        baseApi('rejectGroup', {id: processGroup.id, rejectReason: reason})
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
        <Fragment>
            <Head></Head>
            <Navbar/>
            <div className="container-half mx-auto">
                <h1>グループ申請</h1>
                <ListContainer>
                    {applyList.length > 0 ?
                    applyList.map((item: {[key:string]: any}, index: number) => (
                        <div onClick={() => {applyDialog(index)}}>
                            <ListItemAction>
                                <div className="row">
                                    <div className="col">{item.name}</div>
                                    <div className="col">{item.ctime}</div>
                                </div>
                            </ListItemAction>
                        </div>
                    ))
                    : <Fragment/>}
                    
                </ListContainer>
            </div>
            <ApplyDialog processGroup={processGroup} approve={() => {approve()}}/>
            <RejectReason reject={reject}/>
            <MsgBox msg={msg} footer={{"footerChild" : footerChild}}/>
        </Fragment>
    )
}
export default ApplyGroupManage;