/* eslint-disable @typescript-eslint/no-explicit-any */
import Navbar from "@/components/common/navbar";
import { baseApi, uploadRes } from "@/lib/api";
import { Head } from "@inertiajs/react";
import { Fragment, useEffect, useState } from "react";

const GroupList = () => {
    const [groupList, setGroupList] = useState<any[]>([]);
    const init = () => {
        baseApi('getGroup',{})
        .then((res: uploadRes) => {
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
            {groupList.map(()=>
                <div>

                </div>
            )}
        </Fragment>
    );
}

export default GroupList;