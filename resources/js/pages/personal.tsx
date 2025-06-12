import AppLayout from "@/layouts/app-layout";
import { reducerType } from "@/store";
import { User } from "@/types";
import { dialogAction, DialogBody, DialogCloseButton, DialogContainer, DialogFooter, DialogHeader } from '@/components/common/dialog';
import MsgBox, { msgBoxAction } from '@/components/common/msgBox';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@/components/common/avatar";

// function
import { GetPermissionPair } from "@/components/common/permission";

// scss
import '../../css/common.scss';
import '../../css/user.scss';
import { baseApi } from "@/lib/api";
import { setUser } from "@/store/actionList";

const Personal = () => {
    const pairList = GetPermissionPair();
    const dialogID = "personalDialog";
    const user = useSelector<reducerType, User>(state => state.user);
    const dispatch = useDispatch();
    const [userVo, setUserVo] = useState<User>({...user});
    const [msg, setMsg] = useState("");
    const footerChild = <DialogCloseButton text="閉じる"></DialogCloseButton>;

    const openDialog = () => {
        dialogAction(dialogID, 'show');
        setUserVo({...user});
    }

    const updateVo = (value: string, key: string) => {
        setUserVo({...userVo, [key]: value});
    }

    const updatePersonal = () => {
        baseApi('updatePersonal', userVo)
        .then((res) => {
            if (res.data.errorMsg) {
                setMsg(res.data.errorMsg);
                msgBoxAction('show');
            } else {
                dialogAction(dialogID, 'hide');
                setMsg('変更完成');
                msgBoxAction('show');
                dispatch(setUser({...userVo}))
            }
        })
    }
    return (
        <AppLayout>
            <div className="container-half mx-auto">
                <div className="personal-container">
                    <Avatar size="large"/>
                    <hr />
                    <div className="info-container d-flex justify-content-center flex-wrap">
                        <div className="row w-100 mb-4">
                            <div className="col-6">
                                <span className="me-2">名前：</span>
                                { user.name }
                            </div>
                            <div className="col-6">
                                <span className="me-2">Email：</span>
                                { user.email }
                            </div>
                            <div className="col-6">
                                <span className="me-2">権限：</span>
                                {user.manage_group == 0 ? '一般使用者' : pairList[user.manage_group] + "管理者"}
                            </div>
                        </div>
                        <button className="btn btn-primary mx-auto" onClick={openDialog}>変更</button>
                    </div>
                </div>
            </div>

            <DialogContainer id={dialogID} className='modal-lg'>
                <DialogHeader>
                    <h2>使用者情報変更</h2>
                </DialogHeader>
                <DialogBody>
                    <div className="form-floating py-1">
                        <input type="text" onChange={(e) => updateVo(e.target.value, 'name')} className="form-control" id="acct" placeholder="name@example.com" value={userVo.name}/>
                        <label htmlFor="acct">名前</label>
                    </div>
                    <div className="form-floating py-1">
                        <input type="email" onChange={(e) => updateVo(e.target.value, 'email')} className="form-control" id="email" placeholder="配信チャンネル" value={userVo.email}/>
                        <label htmlFor="email">Email</label>
                    </div>
                </DialogBody>
                <DialogFooter>
                    <button className="btn btn-success" onClick={() => {updatePersonal()}}>確認</button>
                    <DialogCloseButton text="取り消し"/>
                </DialogFooter>
            </DialogContainer>
            <MsgBox msg={msg} footer={{"footerChild" : footerChild}}/>
        </AppLayout>
    )
}
export default Personal;