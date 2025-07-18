/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, useEffect, useState } from "react";
import { reducerType } from "@/store";
import { useSelector } from "react-redux";

//component
import Card from "@/components/common/card";
import AppLayout from "@/layouts/app-layout";

// type
import { User } from "@/types";

// function
import { valueAsKey } from "@/lib/utils";
import { baseApi } from "@/lib/api";

// scss
import '../../../css/common.scss';
import '../../../css/member.scss';

const MemberList = () => {

    const user = useSelector<reducerType, User>(state => state.user);
    const [memberList, setMemberList] = useState<Array<any>>([]);
    const getMemberList = () => {
        
        const url = user.isAdmin ? 'getAllMemberList' : 'getMemberList';
        console.log(url);
        baseApi(url, {'group_id': user.manage_group})
        .then((res) => {
            const newArr = valueAsKey(res.data, 'group_id');
            setMemberList(newArr);
        })
    }
    const init = () => {
        getMemberList();
    }
    useEffect(() => {
        if (user.permissionChecked && user.manage_group != -1) {
            init();
        }
    },[user])
    return(
        <AppLayout>
            <div className='container'>
                <h3>メンバーリスト</h3>
                <div className="row mt-4">
                    {Object.keys(memberList).length > 0 ? memberList.map((groupMembers: {[key:string]:any}) => (
                        <Fragment>
                            {groupMembers.map((member: {[key:string]:any}) => (
                                <div className="col-sm-4 card-maxHeight my-2" key={member.id}>
                                    <a href={ "/manage/member/" + member.id}>
                                        <Card title={member.name} imgName={member.imgName} class="h-100"/>
                                    </a>
                                </div>
                            ))}
                        </Fragment>
                    )) : <Fragment/>}
                </div>

            </div>
        </AppLayout>
    )
}
export default MemberList;