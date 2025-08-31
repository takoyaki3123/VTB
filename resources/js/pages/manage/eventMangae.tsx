import { useEffect, useRef, useState } from "react";

// component
import Editor from "@/components/common/editor";
import MsgBox, { msgBoxAction } from "@/components/common/msgBox";
import { Uploader } from "@/components/common/uploader";
import { DialogCloseButton } from "@/components/common/dialog";
import AppLayout from "@/layouts/app-layout";
import DateTimeSelector from "@/components/common/datetimeSelector";
// function
import { baseApi } from "@/lib/api";
// scss
import '../../../css/common.scss'
import { eventVO } from "../vo";
import { renderTimeViewClock } from "@mui/x-date-pickers";
import moment from "moment";
import { Event, uploadParam } from "@/types";

const EventManage = (props: {id: number}) => {
    const [vo, setVo] = useState<Event>({...eventVO});
    const [close, setClose] = useState(false);
    const [msg, setMsg] = useState("");
    const uploaderParam:uploadParam = {type: 'event'};
    const promotionImgRef = useRef<HTMLInputElement>(null);
    const footerChild = <DialogCloseButton text="閉じる"></DialogCloseButton>;

    const updateVo = (value: string|number, key: string) => {
        setVo({...vo, [key]:value})
    }
    const setImgVo = () => {
        if (promotionImgRef.current!.files) {
            const file = promotionImgRef.current!.files[0];
            updateVo(file.name, 'imgName');
        }
    }

    const getEvent = () => {
        baseApi('getEvent', {})
        .then((res) => {
            setVo(res.data);
        });
    }

    const init = () => {
        getEvent();
    }
    const closePage = () => {
        if (close) {
            window.close();
        }
    }

    const updateEvent = () => {
        if (!checkVo()) {
            msgBoxAction('show');
            return;
        }
        baseApi('updateEvent', vo)
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

    const checkVo = () => {
        if (vo.title == '' || vo.link == '' || vo.desc == '' || vo.start == null || vo.end == null) {
            setMsg("入力していない資料があります");
            return false;
        } else if (vo.img_id != null) {
            if (vo.img_id! <= 0) {
                setMsg("宣伝画像に問題を生じました");
                return false;
            }
        }
        if (moment(vo.start).format("YYYY-MM-DD HH:m:s") <= moment(vo.end).format("YYYY-MM-DD HH:m:s")) {
            setMsg("開催終了時間は開始時間の前に設定されています");
            return false;
        }

        return true;
    }

    useEffect(() => {
        init();
    }, [])
    return (
        <AppLayout>
            <div className="container mx-auto">
                <h1 className="h3 mb-3 fw-normal text-center">イベント内容修正</h1>
                <div className="input-group mb-3">
                    <h5 className="input-group-text">開催グループ：</h5>
                </div>
                <div className="form-floating py-1">
                    <input type="text" onChange={(e) => updateVo(e.target.value, 'title')} className="form-control" id="title"/>
                    <label htmlFor="acct">イベント名</label>
                </div>
                <div className="mb-3">
                    <label htmlFor="desc">イベント概要</label>
                    <Editor value={vo.desc!} show={true} setValue={(val?: string) => {updateVo(val!, 'desc')}} id="desc"/>
                </div>
                <div className="form-floating py-1">
                    <input type="text" onChange={(e) => updateVo(e.target.value, 'link')} className="form-control" id="link" placeholder="関連リンク"/>
                    <label htmlFor="link">関連リンク</label>
                </div>
                <div className="input-group mb-3">
                    <Uploader
                        setImgId={(id) => updateVo(id, 'img_id')}
                        className="form-control"
                        id="promotionImg"
                        ref={promotionImgRef}
                        refChange={() => setImgVo()}
                        param={uploaderParam}
                    />
                    <label className="input-group-text" htmlFor="promotionImg">宣伝画像</label>
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
                <button className="w-100 btn btn-lg btn-primary" onClick={() => updateEvent()}>申請</button>
            </div>
            <MsgBox msg={msg} footer={{"footerChild" : footerChild}} onClose={() => closePage()}/>
        </AppLayout>
    )
}

export default EventManage;