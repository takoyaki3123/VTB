/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
// component
import Editor from '@/components/common/editor';
import AppLayout from '@/layouts/app-layout';

// function
import { baseApi } from '@/lib/api';

// scss
import '../../css/common.scss';
import '../../css/event.scss';
type eventInfo = {
    imgName: string;
    desc: string;
    title: string;
    link: string;
    start: string;
    end: string;
    groupName: string;
};
function EventPage(props: {id: string}) {
    // データーをとる
    // 1.キービジョン
    // 2.グループ関連
    const [info, setInfo] = useState<eventInfo>({
        imgName: "",
        desc: "",
        title: "",
        link: "",
        start: "",
        end: "",
        groupName: "",
    });

    const init = () => {
        getMember();
    }

    const getMember = () => {
        baseApi('getEvent', {id: props.id})
        .then((res) => {
            console.log(res.data)
            setInfo(res.data);
        });
    }
    
    useEffect(()=>{
        init();
    },[])
    return (
        <AppLayout>
            <div className='container-half mx-auto'>
                <div className='w-100 d-flex justify-content-center mb-4'>
                    <img src={'/storage/image/' + info.imgName} alt="no img" className='eventImg'/>
                </div>
                <h4 className='event-title my-2'>{info.title}</h4>
                <div className='event-info'>
                    <b>
                        <p>開催グループ：{info.groupName}</p>
                        <p>開催期間：{info.start} ~ {info.end}</p>
                        <p>公式サイト：<a href={info.link}>{info.link}</a></p>
                    </b>
                </div>
                <Editor value={info.desc} show={false} />
            </div>
        </AppLayout>
    );
}
export default EventPage;
