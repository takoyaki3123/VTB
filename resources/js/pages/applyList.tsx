/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, useEffect, useState } from "react";

// component
import { ListContainer, ListItemAction } from "@/components/common/list";
import { TabItemParam, Tabs } from "@/components/common/tabs";
import { Fragment } from "react/jsx-runtime";
import { dialogAction, DialogBody, DialogContainer, DialogHeader } from "@/components/common/dialog";
import AppLayout from "@/layouts/app-layout";

// type
import { statusCompare } from "../types/compare";

// function
import { baseApi } from "@/lib/api";
import moment from "moment";

// scss
import '../../css/common.scss';
import '../../css/group.scss';
import KeyVisual from "@/components/common/keyVisual";

const groupDialogID = 'groupDialog';
const memberDialogID = 'memberDialog';
const eventDialogID = 'eventDialog';
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
                    <div>宣伝図：<img className="apply-img" src={"/storage/image/" + props.group.groupImg}/></div>
                    <div>紹介画像：
                        <KeyVisual backgroundPath={"/storage/image/" + props.group.background} imgPath={"/storage/image/" + props.group.character}/>
                    </div>
                    {props.group.rejectReason != '' ?
                        <div>
                            申請拒否の理由：{props.group.rejectReason}
                        </div>
                    :
                        <Fragment/>
                    }
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

const EventDialog = (props: {event: {[key: string]: any}, timeChange: (time: string, name: string) => void}) => {

    return (
        <DialogContainer id={eventDialogID} scrollAble={true}>
            <DialogHeader>
                <h3>イベント申請ー{props.event.name}</h3>
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
        </DialogContainer>
    )
}

const ApplyList = () => {
    const [tabContent, setTabContent] = useState<TabItemParam[]>();
    const [group, setGroup] = useState<any>({});
    const [member, setMember] = useState<any>({});
    const [event, setEvent] = useState<any>({});

    const init = () => {
        baseApi('getApplyList', {})
        .then((res) => {
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
                                            <div className="col">{moment(groupData.ctime).format('YYYY-MM-DD HH:m:s')}</div>
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
                                        <div className="col">{moment(memberData.ctime).format('YYYY-MM-DD h:mm:ss')}</div>
                                        <div className="col">{statusCompare[memberData.status]}</div>
                                    </div>
                                </ListItemAction>
                            </div>
                        )
                    })
                }
                </ListContainer>
                <a className="btn btn-primary my-2" target="_blank" href="/apply/event">申請</a>
            </div>;
            
            const eventTab:ReactNode = 
            <div className="d-flex flex-wrap justify-content-center">
                <ListContainer className="w-100">
                {
                    res.data.event.map((eventData: { [key: string]: any; }, index: number) => {
                        return (
                            <div key={index} onClick={() => {setEvent(eventData);dialogAction(eventDialogID, 'show');}}>
                                <ListItemAction>
                                    <div className="row">
                                        <div className="col">{eventData.title}</div>
                                        <div className="col">{moment(eventData.ctime).format('YYYY-MM-DD H:m:s')}</div>
                                        <div className="col">{statusCompare[eventData.status]}</div>
                                    </div>
                                </ListItemAction>
                            </div>
                        )
                    })
                }
                </ListContainer>
                <a className="btn btn-primary my-2" target="_blank" href="/apply/event">申請</a>
            </div>;
            setTabContent([
                {id: 'groupTab', title: 'グループ', children: groupTab},
                {id: 'memberTab', title: 'メンバー', children: memberTab},
                {id: 'eventTab', title: 'イベント', children: eventTab},
            ]);
        })
    }

    const timeChange = (time:string, name:string) => {
        setEvent({...event, [name]: time});
    }
    useEffect(() => {
        init();
    },[])
    return (
        <AppLayout>
            <div className="container-half mx-auto">
                <h1>申請リスト</h1>
                {tabContent != null ?     
                    <Tabs tabItem={tabContent}/>
                    :<Fragment/>
                }
            </div>
            <GroupDialog group={group}/>
            <MemberDialog member={member}/>
            <EventDialog event={event} timeChange={timeChange}/>
        </AppLayout>
    )
}
export default ApplyList;