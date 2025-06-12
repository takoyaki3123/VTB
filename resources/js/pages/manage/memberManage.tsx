/* eslint-disable @typescript-eslint/no-explicit-any */
import { RefObject, useEffect, useRef, useState } from 'react';

// component
import Footer from '@/components/common/footer';
import Editor from '@/components/common/editor';
import { dialogAction, DialogBody, DialogCloseButton, DialogContainer, DialogFooter, DialogHeader } from '@/components/common/dialog';
import { Uploader } from '@/components/common/uploader';
import MsgBox, { msgBoxAction } from '@/components/common/msgBox';
import AppLayout from '@/layouts/app-layout';

// vo
import { memberVO } from '../vo';

// function
import { baseApi, uploadRes } from '@/lib/api';

// scss
import '../../../css/common.scss';
import '../../../css/member.scss';

const MemberManage = (props: {id: number}) => {
    const avatarImgRef = useRef<HTMLInputElement>(null);
    const dialogID = "memberUpdateDialog";
    const footerChild = <DialogCloseButton text="閉じる"></DialogCloseButton>;
    const [imgName, setImgName] = useState("");
    const [desc, setDesc] = useState("");
    const [name, setName] = useState("");
    const [streamUrl, setStreamUrl] = useState("");
    const [socialUrl, setScoialUrl] = useState("");
    const [vo, setVo] = useState<typeof memberVO>({...memberVO});
    const [originVo, setOriginVo] = useState<typeof memberVO>({...memberVO});
    const [msg, setMsg] = useState("");
    // init
    const init = () => {
        getMember();
    }

    const getMember = () => {
        baseApi('getMember', {id: props.id})
        .then((res: uploadRes) => {
            setImgName(res.data.imgName);
            setDesc(res.data.desc);
            setName(res.data.name);
            setScoialUrl(res.data.socialUrl);
            setStreamUrl(res.data.streamUrl);
            setVo({...vo, id: res.data.id, desc: res.data.desc, name: res.data.name, socialUrl: res.data.socialUrl, streamUrl: res.data.streamUrl, avatar: {...vo.avatar, id: res.data.img_id, name: res.data.imgName}});
            setOriginVo({...vo, id: res.data.id, desc: res.data.desc, name: res.data.name, socialUrl: res.data.socialUrl, streamUrl: res.data.streamUrl, avatar: {...vo.avatar, id: res.data.img_id, name: res.data.imgName}});
        });
    }


    // update
    const updateVo = (value: string, key: string) => {
        setVo({...vo, [key]: value});
    }

    const setImgId = (id: number) => {
        setVo({ ...vo, avatar: { ...vo.avatar, id: id } });
    }

    const setImgVo = (ref: RefObject<HTMLInputElement | null>) => {
        if (ref.current!.files) {
            const file = ref.current!.files[0];
            setVo({ ...vo, avatar: { ...vo.avatar, name: file.name, type: file.type, size: file.size } });
        }
    }

    const updateMember = () => {
        baseApi('updateMember', vo)
        .then((res) => {
            if (res.data.errorMsg) {
                setMsg(res.data.errorMsg);
                msgBoxAction('show');
            } else {
                dialogAction(dialogID, 'hide');
                setMsg('変更完成');
                msgBoxAction('show');

                setImgName(vo.avatar!.name!.toString());
                setDesc(vo.desc);
                setName(vo.name);
                setScoialUrl(vo.socialUrl);
                setStreamUrl(vo.streamUrl);
            }
        })
    }

    const openDialog = () => {
        setVo(originVo);
        dialogAction(dialogID, 'show');
    }
    
    useEffect(()=>{
        init();
    },[])
    return (
        <AppLayout>
            <div className='container-half mx-auto'>
                <button className="btn btn-primary" onClick={() => openDialog()}>変更</button>
                <div className='d-flex flex-wrap'>
                    <img src={'/storage/image/' + imgName} alt="no img" className='thumbnail'/>
                    <h3>{name}</h3>
                    <Editor value={desc} show={false} />
                    <div className='mt-2'>配信チャンネル：<a href={streamUrl} target='_blank'>{streamUrl}</a></div>
                    <div>SNS：<a href={socialUrl} target='_blank'>{socialUrl}</a></div>
                </div>
            </div>
            <DialogContainer id={dialogID} className='modal-lg'>
                <DialogHeader>
                    <h2>{ name }</h2>
                </DialogHeader>
                <DialogBody>
                    <div className="form-floating py-1">
                        <input type="text" onChange={(e) => updateVo(e.target.value, 'name')} className="form-control" id="acct" placeholder="name@example.com" value={vo.name}/>
                        <label htmlFor="acct">名前</label>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="desc">紹介文</label>
                        <Editor value={vo.desc} show={true} setValue={(val?: string) => {updateVo(val!, 'desc')}} id="desc"/>
                    </div>
                    <div className="form-floating py-1">
                        <input type="text" onChange={(e) => updateVo(e.target.value, 'streamUrl')} className="form-control" id="streamUrl" placeholder="配信チャンネル" value={vo.streamUrl}/>
                        <label htmlFor="streamUrl">配信チャンネル</label>
                    </div>
                    <div className="form-floating py-1 mb-1">
                        <input type="text" onChange={(e) => updateVo(e.target.value, 'socialUrl')} className="form-control" id="socialUrl" placeholder="SNS" value={vo.socialUrl}/>
                        <label htmlFor="socialUrl">SNS</label>
                    </div>
                    <div className="input-group mb-3">
                        <Uploader setImgId={(id) => setImgId(id)} className="form-control" id="keyCharacter" ref={avatarImgRef} refChange={(ref: RefObject<HTMLInputElement | null>) => setImgVo(ref)} />
                        <label className="input-group-text" htmlFor="keyCharacter">宣伝画像</label>
                    </div>
                    <img src={'/storage/image/' + vo.avatar?.name} alt="no img" className='thumbnail'/>
                </DialogBody>
                <DialogFooter>
                    <button className="btn btn-success" onClick={() => {updateMember()}}>確認</button>
                    <DialogCloseButton text="取り消し"/>
                </DialogFooter>
            </DialogContainer>
            <MsgBox msg={msg} footer={{"footerChild" : footerChild}}/>
            <Footer/>
        </AppLayout>
    );
}
export default MemberManage;