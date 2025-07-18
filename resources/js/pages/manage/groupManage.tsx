/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, useEffect, useRef, useState } from "react";

// component
import KeyVisual from "@/components/home/keyVisual";
import Editor from "@/components/common/editor";
import AppLayout from "@/layouts/app-layout";
import { Uploader } from "@/components/common/uploader";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// function
import { baseApi, uploadRes } from "@/lib/api";

// vo
import { groupVO } from "../vo";

// scss
import '../../../css/group.scss';
import '../../../css/common.scss';
import { useSelector } from "react-redux";
import { reducerType } from "@/store";
import { User } from "@/types";
import { ADMIN_GROUP_MANAGE } from "../settings/globalConst";

const GroupManage = () => {
    const [vo, setVo] = useState<typeof groupVO>({ ...groupVO });
    const backgroundRef = useRef<HTMLInputElement>(null);
    const characterRef = useRef<HTMLInputElement>(null);
    const visualRef = useRef<HTMLInputElement>(null);
    const [groupOpen, setGroupOpen] = useState(false);
    const [bg, setBg] = useState("");
    const [character, setCharacter] = useState("");
    const [groupList, setGroupList] = useState<any[]>([]);
    const [desc, setDesc] = useState<string>("");
    const [selectGroup, setSelectGroup] = useState<string>("");
    const [groupImg, setGroupImg] = useState("");
    const user = useSelector<reducerType, User>(state => state.user);
    const init = () => {
        if (user.manage_group != ADMIN_GROUP_MANAGE) {
            getGroupData(user.manage_group);
        } else {
            getGroupList();
        }
    }

    const getGroupList = () => {
        baseApi('getGroupList', {})
        .then((res: uploadRes) => {
            setGroupList(res.data);
            getGroupData(res.data[0].id);
            setSelectGroup(res.data[0].id);
        });
    }
    const getGroupData = (group_id: any) => {
        baseApi('getGroup', { 'group_id': group_id })
        .then((res: uploadRes) => {
            setBg(res.data.background);
            setCharacter(res.data.character);
            setGroupImg(res.data.groupImg);
            setDesc(res.data.desc);
            setVo({
                ...vo,
                id: group_id,
                desc: res.data.desc,
                name: res.data.name,
            });
        });
    }

    // vo set
    const backgroundChange = () => {
        if (backgroundRef.current!.files) {
            const file = backgroundRef.current!.files[0];
            setVo({ ...vo, background: { ...vo.background, name: file.name, type: file.type, size: file.size } });
        }
    }
    const characterChange = () => {
        if (characterRef.current!.files) {
            const file = characterRef.current!.files[0];
            setVo({ ...vo, background: { ...vo.background, name: file.name, type: file.type, size: file.size } });
        }
    }
    const visualChange = () => {
        if (visualRef.current!.files) {
            const file = visualRef.current!.files[0];
            setVo({ ...vo, background: { ...vo.background, name: file.name, type: file.type, size: file.size } });
        }
    }
    const descChange = (val?: string) => {
        if (val) {
            setVo({ ...vo, desc: val });
        }
    }
    const setImgId = (id: number, type: number) => {
        if (type == 0) {
            setVo({ ...vo, visual: { ...vo.visual, id: id } });
        } else if (type == 1) {
            setVo({ ...vo, background: { ...vo.background, id: id } });
        } else if (type == 2) {
            setVo({ ...vo, character: { ...vo.character, id: id } });
        }
    }

    const groupChange = (e: string) => {
        getGroupData(e);
        setSelectGroup(e);
    }

    const update = () => {
        baseApi('updateGroup', vo)
            .then((res: uploadRes) => {
                if (res.data.msg) {
                    alert('update faile!');
                } else {
                    getGroupData(vo.id);
                }
            });
    }
    useEffect(() => {
        if (user.id != 0) {
            init();
        }
    }, [user])
    return (
        <AppLayout>
            <div className='manageContainer'>
                {user.manage_group != ADMIN_GROUP_MANAGE ? <Fragment/>
                :
                <div className="input-group mb-3">
                    <label className="input-group-text" htmlFor="keyBackground">グループ</label>
                    <Select onValueChange={(v) => groupChange(v)} open={groupOpen} onOpenChange={setGroupOpen} value={selectGroup}>
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
                }
                <div className="input-group mb-3">
                    <label className="input-group-text" htmlFor="visual">ビジュアルダイアグラム</label>
                    <Uploader setImgId={(id) => setImgId(id, 0)} className="form-control" id="visual" ref={visualRef} refChange={() => visualChange()} />
                </div>
                <div className="input-group mb-3">
                    <label className="input-group-text" htmlFor="keyBackground">背景</label>
                    <Uploader setImgId={(id) => setImgId(id, 1)} className="form-control" id="keyBackground" ref={backgroundRef} refChange={() => backgroundChange()} />
                </div>
                <div className="input-group mb-3">
                    <label className="input-group-text" htmlFor="keyCharacter">キャラ画像</label>
                    <Uploader setImgId={(id) => setImgId(id, 2)} className="form-control" id="keyCharacter" ref={characterRef} refChange={() => characterChange()} />
                </div>
                <div className="input-group mb-3">
                    <label className="input-group-text" htmlFor="desc">紹介文</label>
                    <Editor value={vo.desc} show={true} setValue={descChange} id="desc"/>
                </div>
                <Button type="button" className="btn btn-primary" onClick={() => update()}>確認</Button>
            </div>
            <KeyVisual backgroundPath={"/storage/image/" + bg} imgPath={"/storage/image/" + character} />
            <div className="container">
                <Editor value={desc} show={false} />
                <hr/>
                <div className="group_img_container">
                    グループイメージ写真はこちら
                    <img src={"/storage/image/" + groupImg}/>
                </div>
            </div>
        </AppLayout>
    );
};
GroupManage.propTypes = {

}
export default GroupManage;