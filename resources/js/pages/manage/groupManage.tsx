import KeyVisual from "@/components/home/keyVisual";
import { Uploader } from "@/components/ui/uploader";
import { baseApi, uploadRes } from "@/lib/api";
import { useEffect, useRef, useState } from "react";
import { HomeVO } from "./vo";
import { Button } from "@/components/ui/button";

const GroupManage = () => {
    const [vo,setVo] = useState<typeof HomeVO>({...HomeVO});
    const backgroundRef = useRef<HTMLInputElement>(null);
    const characterRef = useRef<HTMLInputElement>(null);
    const [bg,setBg] = useState("");
    const [character,setCharacter] = useState("");

    const init = () => {
        getGroupData();
        getGroupList();
    }

    const getGroupList = () => {
        baseApi('getGroupList', {})
        .then((res: uploadRes) => {
            setBg(res.data.background);
            setCharacter(res.data.character);
        });
    }

    const getGroupData = () => {
        baseApi('getHome', {'group_id': '0'})
        .then((res: uploadRes) => {
            setBg(res.data.background);
            setCharacter(res.data.character);
        });
    }

    const backgroundChange = () => {
        if(backgroundRef.current!.files){
            const file = backgroundRef.current!.files[0];
            setVo({...vo,background: {...vo.background, name: file.name, type: file.type, size: file.size}});
        }
    }
    const characterChange = () => {
        if(characterRef.current!.files){
            const file = characterRef.current!.files[0];
            setVo({...vo,background: {...vo.background, name: file.name, type: file.type, size: file.size}});
        }
    }

    const setImgId = (id: number, type: number) => {
        if(type == 0) {
            setVo({...vo, background:{...vo.background, id: id}});
        }
        else {
            setVo({...vo, character:{...vo.character, id: id}});
        }
    }

    const upload = () => {
        baseApi('updateGroup', { ...vo })
        .then((res: uploadRes) => {
            if (res.data.msg) {
                alert("update fail!");
            }
            else {
                init();
            }
        });
    }
    useEffect(() => {
        init();
    })
    return (
        <>

            <div className='manageContainer'>
                <div className="input-group mb-3">
                    <label className="input-group-text" htmlFor="keyBackground">背景</label>
                    <Uploader setImgId={(id) => setImgId(id, 0)} className="form-control" id="keyBackground" ref={backgroundRef} refChange={() => backgroundChange()}/>
                </div>
                <div className="input-group mb-3">
                    <label className="input-group-text" htmlFor="keyCharacter">キャラ画像</label>
                    <Uploader setImgId={(id) => setImgId(id, 1)} className="form-control" id="keyCharacter" ref={characterRef} refChange={() => characterChange()}/>
                </div>
                <Button type="button" className="btn btn-primary" onClick={() => upload()}>確認</Button>
            </div>
            <KeyVisual backgroundPath={"/storage/image/" + bg} imgPath={"/storage/image/" + character}/>
        </>
    );
};
export default GroupManage;