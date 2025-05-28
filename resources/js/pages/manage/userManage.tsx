/* eslint-disable @typescript-eslint/no-explicit-any */
import { DialogCloseButton } from "@/components/common/dialog";
import MsgBox from "@/components/common/msgBox";
import Navbar from "@/components/common/navbar";
import { PromissionSelect } from "@/components/common/promission";
import { baseApi } from "@/lib/api";
import { Head } from "@inertiajs/react";
import { Fragment, useEffect, useState } from "react";

const UserManage = () => {
    const [list, setList] = useState<Array<any>>([]);
    const [msg, setMsg] = useState("");
    const footerChild = <DialogCloseButton text="關閉"></DialogCloseButton>;
    const init = () => {
        getUserList();
    }

    const getUserList = () => {
        baseApi('getUserList', {})
        .then((res) => {
            setList(res.data);
        });
    }
    const promissionChange = (val: string, param:{[key:string]: string}) => {
        baseApi('updatePromission', {newPromission: val, id: param.id})
        .then((res) => {
            if (res.data.errorMsg) {
                setMsg(res.data.errorMsg);
            }
        });
    }
    useEffect(() => {
        init();
    },[])
    return (
        <Fragment>
            <Head title={"皆のVTB"}></Head>
            <Navbar/>
            <div className="container">
                <h5>ユーザー管理</h5>
                <div className="row">

                    <div className="col-4">
                        名前
                    </div>
                    <div className="col-6">
                        アカウント
                    </div>
                    <div className="col-2">
                        権限
                    </div>
                    {list.length > 0 ?
                        list.map((item) => (
                            <Fragment key={item.id}>
                                <div className="col-4 my-1">
                                    {item.name}
                                </div>
                                <div className="col-6 my-1">
                                    {item.email}
                                </div>
                                <div className="col-2 my-1">
                                    <PromissionSelect value={item.manage_group.toString()} onChange={promissionChange} param={{id: item.id}}></PromissionSelect>
                                </div>
                            </Fragment>
                        ))
                        :<Fragment/>
                    }
                </div>
            </div>
            <MsgBox msg={msg} footer={{"footerChild" : footerChild}}/>
        </Fragment>
    )
}
export default UserManage;