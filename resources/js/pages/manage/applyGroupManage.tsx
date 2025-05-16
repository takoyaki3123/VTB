/* eslint-disable @typescript-eslint/no-explicit-any */
import { ListContainer, ListItemAction } from "@/components/common/list";
import Navbar from "@/components/common/navbar";
import { baseApi, uploadRes } from "@/lib/api";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { Fragment } from "react/jsx-runtime";
import '../../../css/common.scss';

const ApplyGroupManage = () => {
    const [applyList, setApplyList] = useState<any>([]);
    const init = () => {
        baseApi('getApplyGroup', {})
        .then((res: uploadRes) => {
            console.log(res);
            setApplyList([...res.data]);
        })
    }
    useEffect(() => {
        init();
    },[])
    return (
        <Fragment>
            <Head></Head>
            <Navbar/>
            <div className="container-half mx-auto">
                <h1>グループ申請</h1>
                <ListContainer>
                    {applyList.length > 0 ?
                    applyList.map((item: {[key:string]: any}) => (
                        <ListItemAction>
                            <div className="row">

                                <div className="col">{item.name}</div>
                                <div className="col">{item.ctime}</div>
                            </div>
                        </ListItemAction>
                    ))
                    : <Fragment/>}
                    
                </ListContainer>
            </div>
        </Fragment>
    )
}
export default ApplyGroupManage;