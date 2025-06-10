/* eslint-disable @typescript-eslint/no-explicit-any */
import Card from "@/components/common/card";
import Navbar from "@/components/common/navbar";
import { baseApi } from "@/lib/api";
import { valueAsKey } from "@/lib/utils";
import { reducerType } from "@/store";
import { User } from "@/types";
import { Head } from "@inertiajs/react";
import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import '../../../css/common.scss';
import '../../../css/member.scss';

const MemberList = () => {

    const user = useSelector<reducerType, User>(state => state.user);
    const [memberList, setMemberList] = useState<Array<any>>([]);
    const getMemberList = () => {
        
        const url = user.isAdmin ? 'getAllMemberList' : 'getMemberList';
        console.log(url);
        baseApi(url, {})
        .then((res) => {
            const newArr = valueAsKey(res.data, 'group_id');
            setMemberList(newArr);
            console.log(newArr);
            
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
        <Fragment>
            <Head title={"皆のVTB"}>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <Navbar/>

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
        </Fragment>
    )
}
export default MemberList;