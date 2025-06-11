/* eslint-disable @typescript-eslint/no-explicit-any */
import Navbar from "@/components/common/navbar";
import Editor from "@/components/common/editor";
import { Uploader } from "@/components/common/uploader";
import { Head } from "@inertiajs/react";
import { useRef, useState } from "react";
import { Fragment } from "react/jsx-runtime";
import { groupVO } from "./vo";
import { baseApi } from "@/lib/api";
import '../../css/common.scss'
import MsgBox, { msgBoxAction } from "@/components/common/msgBox";
import { DialogCloseButton } from "@/components/common/dialog";

//グループ増加の申請、管理者が許可と修正をする
const ApplyGroup = () => {
    const [vo, setVo] = useState<typeof groupVO>({...groupVO});
    const [msg, setMsg] = useState("");
    const groupImgRef = useRef<HTMLInputElement>(null);
    const updateVo = (value: string|{[key:string]:any}, key: string) => {
        setVo({...vo, [key]:value})
    }
    const setImgId = (id: number) => {
        setVo({ ...vo, visual: { ...vo.visual, id: id } });
    }
    const setImgVo = () => {
        if (groupImgRef.current!.files) {
            const file = groupImgRef.current!.files[0];
            setVo({ ...vo, visual: { ...vo.background, name: file.name, type: file.type, size: file.size } });
        }
    }

    const apply = () => {
        baseApi('applyNewGroup', {...vo})
        .then((res) => {
            if (res.data.errorMsg) {
                setMsg(res.data.errorMsg);
            } else {
                setMsg("申請完成");
            }
            msgBoxAction('show');
        });
    }

    const closePage = () => {
        window.close();
    }
    const footerChild = <DialogCloseButton text="閉じる"></DialogCloseButton>;
    return (
        <Fragment>
            <Head title={"皆のVTB"}></Head>
            <Navbar/>

            <div className="container-half mx-auto">
                <h1 className="h3 mb-3 fw-normal text-center">グループ増加申請</h1>

                <div className="form-floating py-1">
                    <input type="text" onChange={(e) => updateVo(e.target.value, 'name')} className="form-control" id="acct"/>
                    <label htmlFor="acct">グループ名</label>
                </div>
                <div className="form-floating py-1">
                    <input type="text" onChange={(e) => updateVo(e.target.value, 'link')} className="form-control" id="ps" placeholder="https://"/>
                    <label htmlFor="ps">サイト</label>
                </div>
                <div className="mb-3">
                    <label htmlFor="keyBackground">紹介文</label>
                    <Editor value={vo.desc} show={true} setValue={(val?: string) => {updateVo(val!, 'desc')}} />
                </div>
                <div className="input-group mb-3">
                    <Uploader setImgId={(id) => setImgId(id)} className="form-control" id="keyCharacter" ref={groupImgRef} refChange={() => setImgVo()} />
                    <label className="input-group-text" htmlFor="keyCharacter">宣伝画像</label>
                </div>
                <button className="w-100 btn btn-lg btn-primary" onClick={() => apply()}>申請</button>
            </div>
            <MsgBox msg={msg} footer={{"footerChild" : footerChild}} onClose={closePage}/>
        </Fragment>
    )
}
export default ApplyGroup;