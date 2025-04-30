/* eslint-disable @typescript-eslint/no-explicit-any */
import Card from "@/components/common/card";
import Navbar from "@/components/common/navbar";
import { baseApi, uploadRes } from "@/lib/api";
import { Head } from "@inertiajs/react";
import { Fragment, useEffect, useState } from "react";
import '../../css/group.scss';

const GroupList = () => {
    const [groupList, setGroupList] = useState<any>([]);
    const init = () => {
        baseApi('getGroupListWithImg',{})
        .then((res: uploadRes) => {
            console.log(res.data);
            setGroupList([...res.data]);
        });
    }
    
    useEffect(()=>{
        init();
    },[])

    return (
        <Fragment>
            <Head title="皆のVTB">
            </Head>
            <Navbar/>
            <div className="row">
                {groupList.map((group: {[key:string]:any})=>
                    <div className="col-sm-4">
                        <a href={"/group/" + group.id}>
                            <Card imgName={group.imgName} title={group.name}/>
                        </a>
                    </div>
                )}

            </div>
        </Fragment>
    );
}

export default GroupList;