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

const ApplyDialog = (props: {processMember: {[key: string]: any}, approve: () => void}) => {

    const rejectReason = () => {
        dialogAction(rejectDialogID, 'show');
    }
    return (
        <DialogContainer id={applyDialogID} scrollAble={true}>
            <DialogHeader>
                <h3>メンバー申請 ー {props.processMember.name}</h3>
            </DialogHeader>
            <DialogBody>
                <div>
                    <div>アバター：<img className="apply-img" src={"/storage/image/" + props.processMember.imgName}/></div>
                    <div>名前：{props.processMember.name}</div>
                    <div>所属グループ：{props.processMember.groupName}</div>
                    <div>紹介：{props.processMember.desc}</div>
                    <div>配信Url：<a href={props.processMember.streamUrl}>{props.processMember.streamUrl}</a></div>
                    <div>SNS：<a href={props.processMember.socialUrl}>{props.processMember.socialUrl}</a></div>
                </div>
            </DialogBody>
            <DialogFooter>
                <button className="btn btn-success" onClick={() => {props.approve()}}>承認</button>
                <button className="btn btn-danger" onClick={() => {rejectReason()}}>拒否</button>
            </DialogFooter>
        </DialogContainer>
    )
}

const ApplyMemberManage = () => {
    const [applyList, setApplyList] = useState<any>([]);
    const [processMember, setProcessMember] = useState<any>({});
    const [msg, setMsg] = useState("");
    const footerChild = <DialogCloseButton text="關閉"></DialogCloseButton>;
    const init = () => {
        baseApi('getApplyMember', {})
        .then((res: uploadRes) => {
            setApplyList([...res.data]);
        })
    }
    const applyDialog = (index: number) => {
        setProcessMember(applyList[index]);
        dialogAction(applyDialogID, 'show');
    }
    const approve = () => {
        baseApi('approveMember', {id: processMember.id})
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
        baseApi('rejectMember', {id: processMember.id, rejectReason: reason})
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
                <h1>メンバー申請</h1>
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
            <ApplyDialog processMember={processMember} approve={() => {approve()}}/>
            <RejectReason reject={reject}/>
            <MsgBox msg={msg} footer={{"footerChild" : footerChild}}/>
        </Fragment>
    )
}
export default ApplyMemberManage;