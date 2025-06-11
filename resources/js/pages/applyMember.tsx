/* eslint-disable @typescript-eslint/no-explicit-any */
import Editor from "@/components/common/editor";
import MsgBox, { msgBoxAction } from "@/components/common/msgBox";
import Navbar from "@/components/common/navbar";
import { Uploader } from "@/components/common/uploader";
import { Head } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";
import { Fragment } from "react/jsx-runtime";
import { memberVO } from "./vo";
import { baseApi } from "@/lib/api";
import { DialogCloseButton } from "@/components/common/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import '../../css/common.scss'

//グループメンバー増加の申請、管理者が許可と修正をする
const ApplyMember = () => {
    const [vo, setVo] = useState<typeof memberVO>({...memberVO});
    const [msg, setMsg] = useState("");
    const [groupOpen, setGroupOpen] = useState(false);
    const [groupList, setGroupList] = useState<any[]>([]);
    const [selectGroup, setSelectGroup] = useState<string>("");
    const avatarImgRef = useRef<HTMLInputElement>(null);
    const footerChild = <DialogCloseButton text="閉じる"></DialogCloseButton>;

    const updateVo = (value: string|{[key:string]:any}, key: string) => {
        setVo({...vo, [key]:value})
    }
    const setImgId = (id: number) => {
        setVo({ ...vo, avatar: { ...vo.avatar, id: id } });
    }
    const setImgVo = () => {
        if (avatarImgRef.current!.files) {
            const file = avatarImgRef.current!.files[0];
            setVo({ ...vo, avatar: { ...vo.avatar, name: file.name, type: file.type, size: file.size } });
        }
    }

    const getGroupList = () => {
        baseApi('getGroupList', {})
        .then((res) => {
            setGroupList(res.data);
            setSelectGroup(res.data[0].id);
            updateVo(res.data[0].id, 'group_id');
        });
    }
    const apply = () => {
        baseApi('applyNewMember', {...vo})
        .then(() => {
            setMsg("申請完成");
            msgBoxAction('show');
        })
        .catch((res) => {
            if (res.data.errorMsg) {
                setMsg(res.data.errorMsg);
            }
            msgBoxAction('show');
        });
    }
    const init = () => {
        getGroupList();
    }

    const closePage = () => {
        window.close();
    }

    useEffect(() => {
        init();
    }, [])
    return (
        <Fragment>
            <Head title={"皆のVTB"}></Head>
            <Navbar/>

            <div className="container mx-auto">
                <h1 className="h3 mb-3 fw-normal text-center">メンバー増加申請</h1>
                <div className="input-group mb-3">
                    <label className="input-group-text" htmlFor="keyBackground">所属グループ</label>
                    <Select onValueChange={(v) => {updateVo(v, 'group_id');setSelectGroup(v)}} open={groupOpen} onOpenChange={setGroupOpen} value={selectGroup}>
                        <SelectTrigger onClick={() => setGroupOpen(!groupOpen)}>
                            <SelectValue placeholder="Select an option..." />
                        </SelectTrigger>
                        <SelectContent>
                            {groupList.map((item) => (
                                <SelectItem key={item.id} value={item.id}><span style={{ userSelect: "none" }}>{item.name}</span></SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="form-floating py-1">
                    <input type="email" onChange={(e) => updateVo(e.target.value, 'name')} className="form-control" id="acct" placeholder="name@example.com"/>
                    <label htmlFor="acct">名前</label>
                </div>
                <div className="mb-3">
                    <label htmlFor="desc">紹介文</label>
                    <Editor value={vo.desc} show={true} setValue={(val?: string) => {updateVo(val!, 'desc')}} id="desc"/>
                </div>
                <div className="form-floating py-1">
                    <input type="text" onChange={(e) => updateVo(e.target.value, 'streamUrl')} className="form-control" id="streamUrl" placeholder="配信チャンネル"/>
                    <label htmlFor="streamUrl">配信チャンネル</label>
                </div>
                <div className="form-floating py-1 mb-1">
                    <input type="text" onChange={(e) => updateVo(e.target.value, 'socialUrl')} className="form-control" id="socialUrl" placeholder="SNS"/>
                    <label htmlFor="socialUrl">SNS</label>
                </div>
                <div className="input-group mb-3">
                    <Uploader setImgId={(id) => setImgId(id)} className="form-control" id="keyCharacter" ref={avatarImgRef} refChange={() => setImgVo()} />
                    <label className="input-group-text" htmlFor="keyCharacter">宣伝画像</label>
                </div>
                <button className="w-100 btn btn-lg btn-primary" onClick={() => apply()}>申請</button>
            </div>
            <MsgBox msg={msg} footer={{"footerChild" : footerChild}} onClose={() => closePage()}/>
        </Fragment>
    )
}
export default ApplyMember;