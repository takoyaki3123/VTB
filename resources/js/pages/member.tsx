/* eslint-disable @typescript-eslint/no-explicit-any */

import '../../css/common.scss';
import '../../css/member.scss';
import Footer from '@/components/common/footer';
import { useEffect, useState } from 'react';
import { baseApi, uploadRes } from '@/lib/api';
import Editor from '@/components/common/editor';
import AppLayout from '@/layouts/app-layout';
function Member(props: {id: string}) {
    // データーをとる
    // 1.キービジョン
    // 2.グループ関連
    const [imgName, setImgName] = useState("");
    const [desc, setDesc] = useState("");
    const [name, setName] = useState("");

    const init = () => {
        getMember();
    }

    const getMember = () => {
        baseApi('getMember', {id: props.id})
        .then((res: uploadRes) => {
            setImgName(res.data.imgName);
            setDesc(res.data.desc);
            setName(res.data.name);
        });
    }
    
    useEffect(()=>{
        init();
    },[])
    return (
        <AppLayout>
            <div className='container-half mx-auto'>
                <div className='d-flex flex-wrap'>
                    <img src={'/storage/image/' + imgName} alt="no img" className='thumbnail'/>
                    <h4>{name}</h4>
                    <Editor value={desc} show={false} />
                </div>
            </div>
            <Footer/>
        </AppLayout>
    );
}
export default Member;
