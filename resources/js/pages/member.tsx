/* eslint-disable @typescript-eslint/no-explicit-any */

import Navbar from '@/components/common/navbar';
import { Head } from '@inertiajs/react';
import '../../css/common.scss';
import '../../css/member.scss';
import Footer from '@/components/common/footer';
import { Fragment, useEffect, useState } from 'react';
import { baseApi, uploadRes } from '@/lib/api';
import Editor from '@/components/common/editor';
function Member(props: {id: string}) {
    // データーをとる
    // 1.キービジョン
    // 2.グループ関連
    const [imgName, setImgName] = useState("");
    const [desc, setDesc] = useState("");
    const [title, setTitle] = useState("");

    const init = () => {
        getMember();
    }

    const getMember = () => {
        baseApi('getMember', {id: props.id})
        .then((res: uploadRes) => {
            setImgName(res.data.imgName);
            setDesc(res.data.desc);
            setTitle(res.data.name);
        });
    }
    
    useEffect(()=>{
        init();
    },[])
    return (
        <Fragment>
            <Head title={"皆のVTB - " + title}>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <Navbar/>
            <div className='container-half mx-auto'>
                <div className='d-flex flex-wrap'>
                    <img src={'/storage/image/' + imgName} alt="no img" className='thumbnail'/>
                    <Editor value={desc} show={false} />
                </div>
            </div>
            <Footer/>
        </Fragment>
    );
}
export default Member;
