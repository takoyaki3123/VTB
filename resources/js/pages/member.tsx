/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, useEffect, useState } from 'react';
// component
import Footer from '@/components/common/footer';
import Editor from '@/components/common/editor';
import AppLayout from '@/layouts/app-layout';

// function
import { baseApi, uploadRes } from '@/lib/api';

// scss
import '../../css/common.scss';
import '../../css/member.scss';
function Member(props: {id: string, liveStatus: boolean, liveID: string}) {
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
                    <div className='w-100 d-flex justify-content-center mb-4'>
                        <img src={'/storage/image/' + imgName} alt="no img" className='thumbnail'/>
                    </div>
                    <h4 className='member-name my-2'>{name}{props.liveStatus? <a className='badge bg-danger mx-2' href={"https://www.youtube.com/watch?v=" + props.liveID}>配信中</a>: <Fragment/>}</h4>
                    
                    <Editor value={desc} show={false} />
            </div>
            <Footer/>
        </AppLayout>
    );
}
export default Member;
