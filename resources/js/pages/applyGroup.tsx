/* eslint-disable @typescript-eslint/no-explicit-any */
import Editor from "@/components/common/editor";
import { useRef, useState } from "react";

// component
import { Uploader } from "@/components/common/uploader";
import MsgBox, { msgBoxAction } from "@/components/common/msgBox";
import { DialogCloseButton } from "@/components/common/dialog";
import AppLayout from "@/layouts/app-layout";

// vo
import { groupVO } from "./vo";

// function
import { baseApi } from "@/lib/api";

// scss
import '../../css/common.scss'

//グループ増加の申請、管理者が許可と修正をする
const ApplyGroup = () => {
    const [vo, setVo] = useState<typeof groupVO>({...groupVO});
    const [msg, setMsg] = useState("");
    const [close, setClose] = useState(false);
    const kvBgRef = useRef<HTMLInputElement>(null);
    const kvChRef = useRef<HTMLInputElement>(null);
    const groupImgRef = useRef<HTMLInputElement>(null);
    const updateVo = (value: string|{[key:string]:any}, key: string) => {
        setVo({...vo, [key]:value})
    }
    const setImgId = (id: number, key: string) => {
        setVo({ ...vo, [key]: { ...vo[key], id: id } });
    }
    const setImgVo = () => {
        if (groupImgRef.current!.files) {
            const file = groupImgRef.current!.files[0];
            setVo({ ...vo, visual: { ...vo.background, name: file.name, type: file.type, size: file.size } });
        }
    }

    const apply = () => {
        if (!checkVo()) {
            setMsg("請確認欄位接填寫完成");
            msgBoxAction('show');
        }
        baseApi('applyNewGroup', {...vo})
        .then((res) => {
            if (res.data.errorMsg) {
                setMsg(res.data.errorMsg);
            } else {
                setClose(true);
                setMsg("申請完成");
            }
            msgBoxAction('show');
        });
    }

    const checkVo = (): boolean => {
        if (vo.name == '' || vo.link == '' || vo.desc == '' || vo.visual == null) {
            return false;
        } else if (vo.visual != null) {
            if (vo.visual.id! <= 0 || vo.visual.id == null) {
                return false;
            }
        }
        return true;
    }

    const closePage = () => {
        if (close) {
            window.close();
        }
    }
    const footerChild = <DialogCloseButton text="閉じる"></DialogCloseButton>;
    return (
        <AppLayout>
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
                    <label>紹介文</label>
                    <Editor value={vo.desc} show={true} setValue={(val?: string) => {updateVo(val!, 'desc')}} />
                </div>
                <div className="input-group mb-3">
                    <Uploader setImgId={(id) => setImgId(id, 'visual')} className="form-control" id="keyVisual" ref={groupImgRef} refChange={() => setImgVo()} />
                    <label className="input-group-text" htmlFor="keyVisual">宣伝画像</label>
                </div>
                <div className="input-group mb-3">
                    <Uploader setImgId={(id) => setImgId(id, 'background')} className="form-control" id="keyBackground" ref={kvBgRef} refChange={() => setImgVo()} />
                    <label className="input-group-text" htmlFor="keyBackground">背景画像</label>
                </div>
                <div className="input-group mb-3">
                    <Uploader setImgId={(id) => setImgId(id, 'character')} className="form-control" id="keyCharacter" ref={kvChRef} refChange={() => setImgVo()} />
                    <label className="input-group-text" htmlFor="keyCharacter">キャラ画像</label>
                </div>
                <button className="w-100 btn btn-lg btn-primary" onClick={() => apply()}>申請</button>
            </div>
            <MsgBox msg={msg} footer={{"footerChild" : footerChild}} onClose={closePage}/>
        </AppLayout>
    )
}
export default ApplyGroup;