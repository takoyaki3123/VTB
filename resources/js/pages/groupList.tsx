/* eslint-disable @typescript-eslint/no-explicit-any */
import Card from "@/components/common/card";
import Navbar from "@/components/common/navbar";
import { baseApi, uploadRes } from "@/lib/api";
import { Head } from "@inertiajs/react";
import { Fragment, useEffect, useState } from "react";
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
        <Fragment>
            <Head title={"皆のVTB"}></Head>
            <Navbar/>
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
        </Fragment>
    );
}

export default GroupList;