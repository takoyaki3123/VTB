/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, useEffect, useState } from "react";

// component
import { DialogCloseButton } from "@/components/common/dialog";
import MsgBox from "@/components/common/msgBox";
import AppLayout from "@/layouts/app-layout";

// function
import { PermissionSelect } from "@/components/common/permission";
import { baseApi } from "@/lib/api";

const UserManage = () => {
    const [list, setList] = useState<Array<any>>([]);
    const [msg, setMsg] = useState("");
    const footerChild = <DialogCloseButton text="閉じる"></DialogCloseButton>;
    const init = () => {
        getUserList();
    }

    const getUserList = () => {
        baseApi('getUserList', {})
        .then((res) => {
            setList(res.data);
        });
    }
    const permissionChange = (val: string, param:{[key:string]: string}) => {
        baseApi('updatePermission', {newPermission: val, id: param.id})
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
        <AppLayout>
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
                                    <PermissionSelect value={item.manage_group.toString()} onChange={permissionChange} param={{id: item.id}}></PermissionSelect>
                                </div>
                            </Fragment>
                        ))
                        :<Fragment/>
                    }
                </div>
            </div>
            <MsgBox msg={msg} footer={{"footerChild" : footerChild}}/>
        </AppLayout>
    )
}
export default UserManage;