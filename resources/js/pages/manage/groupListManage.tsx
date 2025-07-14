/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

// component
import Card from "@/components/common/card";
import AppLayout from "@/layouts/app-layout";

// function
import { baseApi, uploadRes } from "@/lib/api";

// scss
import '../../../css/group.scss';
import '../../../css/common.scss';

const GroupListManage = () => {
    const [list, setList] = useState([]);
    const init = () => {
        baseApi('getGroupListWithImg',{})
        .then((res: uploadRes) => {
            setList(res.data);
        })
    }
    useEffect(()=>{
        init();
    },[])
    return (
        <AppLayout>
            <div className="container">
                <div className="row mt-4">
                    {list.map((item: {[key:string]:any}) => (
                        <div className="col-sm-4 card-maxHeight my-2">
                            <Card title={item.name} imgName={item.imgName} class="h-100"/>
                        </div>
                    ))}
                    {list.map((item: {[key:string]:any}) => (
                        <div className="col-sm-4 card-maxHeight my-2">
                            <Card title={item.name} imgName={item.imgName} class="h-100"/>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    )
}
export default GroupListManage;