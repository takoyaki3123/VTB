import { useEffect, useRef, useState } from "react";

// component
import Editor from "@/components/common/editor";
import MsgBox, { msgBoxAction } from "@/components/common/msgBox";
import { Uploader } from "@/components/common/uploader";
import { DialogCloseButton } from "@/components/common/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AppLayout from "@/layouts/app-layout";
import DateTimeSelector from "@/components/common/datetimeSelector";
// function
import { baseApi } from "@/lib/api";
// scss
import '../../css/common.scss'
import { eventVO } from "./vo";
import { renderTimeViewClock } from "@mui/x-date-pickers";
const ApplyEvent = () => {
    const [vo, setVo] = useState<typeof eventVO>({...eventVO});
    const [close, setClose] = useState(false);
    const [groupOpen, setGroupOpen] = useState(false);
    const [msg, setMsg] = useState("");
    const [groupList, setGroupList] = useState<any[]>([]);
    const [selectGroup, setSelectGroup] = useState<string>("");
    const promotionImgRef = useRef<HTMLInputElement>(null);
    const footerChild = <DialogCloseButton text="閉じる"></DialogCloseButton>;

    const updateVo = (value: string|number, key: string) => {
        setVo({...vo, [key]:value})
    }
    const setImgVo = () => {
        if (promotionImgRef.current!.files) {
            const file = promotionImgRef.current!.files[0];
            updateVo(file.name, 'promotion_img_name');
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
    const init = () => {
        getGroupList();

    }
    const closePage = () => {
        if (close) {
            window.close();
        }
    }

    const apply = () => {
        baseApi('applyNewEvent', vo)
        .then(() => {
            setMsg("申請完了");
            setClose(true);
            msgBoxAction('show');
        })
        .catch((res) => {
            if (res.data.errorMsg) {
                setMsg(res.data.errorMsg);
            }
            msgBoxAction('show');
        });
    }

    useEffect(() => {
        init();
    }, [])
    return (
        <AppLayout>

            <div className="container mx-auto">
                <h1 className="h3 mb-3 fw-normal text-center">イベント増加申請</h1>
                <div className="input-group mb-3">
                    <label className="input-group-text" htmlFor="keyBackground">開催グループ</label>
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
                    <input type="email" onChange={(e) => updateVo(e.target.value, 'title')} className="form-control" id="acct" placeholder="name@example.com"/>
                    <label htmlFor="acct">イベント名</label>
                </div>
                <div className="mb-3">
                    <label htmlFor="desc">いべんと概要</label>
                    <Editor value={vo.desc!} show={true} setValue={(val?: string) => {updateVo(val!, 'desc')}} id="desc"/>
                </div>
                <div className="form-floating py-1">
                    <input type="text" onChange={(e) => updateVo(e.target.value, 'link')} className="form-control" id="streamUrl" placeholder="配信チャンネル"/>
                    <label htmlFor="streamUrl">関連リンク</label>
                </div>
                <div className="input-group mb-3">
                    <Uploader setImgId={(id) => updateVo(id, 'promotion_img_id')} className="form-control" id="keyCharacter" ref={promotionImgRef} refChange={() => setImgVo()} />
                    <label className="input-group-text" htmlFor="keyCharacter">宣伝画像</label>
                </div>
                <div className="input-group mb-3">
                    <DateTimeSelector
                        label="開催開始時間"
                        onChange={(val) => {updateVo(val, 'start')}}
                        viewRenderers={{
                            hours: renderTimeViewClock,
                            minutes: renderTimeViewClock,
                        }}
                    /> ~ 
                    <DateTimeSelector
                        label="開催終了時間"
                        onChange={(val) => {updateVo(val, 'end')}}
                        viewRenderers={{
                            hours: renderTimeViewClock,
                            minutes: renderTimeViewClock,
                        }}
                    />
                </div>
                <button className="w-100 btn btn-lg btn-primary" onClick={() => apply()}>申請</button>
            </div>
            <MsgBox msg={msg} footer={{"footerChild" : footerChild}} onClose={() => closePage()}/>
        </AppLayout>
    )
}
export default ApplyEvent;