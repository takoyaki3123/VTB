/* eslint-disable @typescript-eslint/no-explicit-any */
import Card from "@/components/common/card";
import Navbar from "@/components/common/navbar";
import { baseApi, uploadRes } from "@/lib/api";
import { Head } from "@inertiajs/react";
import { Fragment, useEffect, useState } from "react";
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
        <Fragment>
            <Head title={"皆のVTB"}></Head>
            <Navbar/>
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
        </Fragment>
    )
}
export default GroupListManage;