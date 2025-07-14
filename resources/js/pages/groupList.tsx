/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, useEffect, useState } from "react";

// component
import Card from "@/components/common/card";
import AppLayout from "@/layouts/app-layout";

// function
import { baseApi, uploadRes } from "@/lib/api";

// scss
import '../../css/group.scss';
import '../../css/common.scss';

const GroupList = () => {
    const [groupList, setGroupList] = useState<any>([]);
    const init = () => {
        baseApi('getGroupListWithImg',{})
        .then((res: uploadRes) => {
            setGroupList([...res.data]);
        });
    }
    
    useEffect(()=>{
        init();
    },[])

    return (
        <AppLayout>
            <div className="container">
                <div className="row mt-4">
                    {groupList.length > 0 ? groupList.map((item: {[key:string]:any}) => (
                        <div className="col-sm-4 card-maxHeight my-2">
                            <a href={ "/group/" + item.id}>
                                <Card title={item.name} imgName={item.imgName} class="h-100"/>
                            </a>
                        </div>
                    )) : <Fragment/>}
                </div>
            </div>
        </AppLayout>
    );
}

export default GroupList;