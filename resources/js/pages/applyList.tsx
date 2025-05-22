/* eslint-disable @typescript-eslint/no-explicit-any */
import { ListContainer, ListItemAction } from "@/components/common/list";
import Navbar from "@/components/common/navbar";
import { TabItemParam, Tabs } from "@/components/common/tabs";
import { baseApi } from "@/lib/api";
import { Head } from "@inertiajs/react";
import { ReactNode, useEffect, useState } from "react";
import { Fragment } from "react/jsx-runtime";
import { statusCompare } from "./compare";
import { dialogAction, DialogBody, DialogContainer, DialogHeader } from "@/components/common/dialog";
import '../../css/common.scss';
import '../../css/group.scss';

const groupDialogID = 'groupDialog';
const memberDialogID = 'memberDialog';
const GroupDialog = (props: {group: {[key: string]: any}}) => {

    return (
        <DialogContainer id={groupDialogID} scrollAble={true}>
            <DialogHeader>
                <h3>グループ申請ー{props.group.name}</h3>
            </DialogHeader>
            <DialogBody>
                <div>
                    <div>グループ名：{props.group.name}</div>
                    <div>グループ紹介：{props.group.desc}</div>
                    <div>サイト：<a href={props.group.link}>{props.group.link}</a></div>
                    <div>宣伝図：<img className="apply-img" src={"/storage/image/" + props.group.imgName}/></div>
                </div>
            </DialogBody>
        </DialogContainer>
    )
}
const MemberDialog = (props: {member: {[key: string]: any}}) => {

    return (
        <DialogContainer id={memberDialogID} scrollAble={true}>
            <DialogHeader>
                <h3>グループ申請ー{props.member.name}</h3>
            </DialogHeader>
            <DialogBody>
                <div>
                    <div>宣伝図：<img className="apply-img" src={"/storage/image/" + props.member.imgName}/></div>
                    <div>グループ名：{props.member.groupName}</div>
                    <div>名前：{props.member.name}</div>
                    <div>紹介：{props.member.desc}</div>
                    <div>配信URL：<a href={props.member.streamUrl}>{props.member.streamUrl}</a></div>
                    <div>配信SNS：<a href={props.member.socialUrl}>{props.member.socialUrl}</a></div>
                </div>
            </DialogBody>
        </DialogContainer>
    )
}

const ApplyList = () => {
    const [tabContent, setTabContent] = useState<TabItemParam[]>();
    const [group, setGroup] = useState<any>({});
    const [member, setMember] = useState<any>({});

    const init = () => {
        baseApi('getApplyList', {})
        .then((res) => {
            console.log(res);
            const groupTab:ReactNode = 
            <div className="d-flex flex-wrap justify-content-center">
                <ListContainer className="w-100">
                    {
                        res.data.group.map((groupData: { [key: string]: any; }, index: number) => {
                            return (
                                <div key={index} onClick={() => {setGroup(groupData);dialogAction(groupDialogID, 'show');}}>
                                    <ListItemAction>
                                        <div className="row">
                                            <div className="col">{groupData.name}</div>
                                            <div className="col">{groupData.ctime}</div>
                                            <div className="col">{statusCompare[groupData.status]}</div>
                                        </div>
                                    </ListItemAction>
                                </div>
                            )
                        })
                    }
                </ListContainer>
                <a className="btn btn-primary my-2" target="_blank" href="/apply/group">申請</a>
            </div>;
            const memberTab:ReactNode = 
            <div className="d-flex flex-wrap justify-content-center">
                <ListContainer className="w-100">
                {
                    res.data.member.map((memberData: { [key: string]: any; }, index: number) => {
                        return (
                            <div key={index} onClick={() => {setMember(memberData);dialogAction(memberDialogID, 'show');}}>
                                <ListItemAction>
                                    <div className="row">
                                        <div className="col">{memberData.name}</div>
                                        <div className="col">{memberData.ctime}</div>
                                        <div className="col">{statusCompare[memberData.status]}</div>
                                    </div>
                                </ListItemAction>
                            </div>
                        )
                    })
                }
                </ListContainer>
                <a className="btn btn-primary my-2" target="_blank" href="/apply/member">申請</a>
            </div>;
            
            setTabContent([
                {id: 'groupTab', title: 'グループ', children: groupTab},
                {id: 'memberTab', title: 'メンバー', children: memberTab}
            ]);
        })
    }
    useEffect(() => {
        init();
    },[])
    return (
        <Fragment>
            <Head title={"皆のVTB"}></Head>
            <Navbar/>
            <div className="container-half mx-auto">
                <h1>申請リスト</h1>
                {tabContent != null ?     
                    <Tabs tabItem={tabContent}/>
                    :<Fragment/>
                }
            </div>
            <GroupDialog group={group}/>
            <MemberDialog member={member}/>
        </Fragment>
    )
}
export default ApplyList;