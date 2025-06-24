/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, useEffect, useState } from 'react';

// component
import KeyVisual from '@/components/home/keyVisual';
import Footer from '@/components/common/footer';
import Editor from '@/components/common/editor';
import Card from '@/components/common/card';
import AppLayout from '@/layouts/app-layout';

// function
import { baseApi, uploadRes } from '@/lib/api';

// scss
import '../../css/common.scss';
import '../../css/group.scss';
import Youtube from '@/class/youtubeAPI';
function Group(props: {id: string}) {
    // データーをとる
    // 1.キービジョン
    // 2.グループ関連
    const [bg,setBg] = useState("");
    const [character,setCharacter] = useState("");
    const [desc, setDesc] = useState("");
    const [memberList, setMemberList] = useState<Array<any>>([]);

    const init = () => {
        getGroup();
        getMemberList();
    }

    const getGroup = () => {
        baseApi('getGroup', {group_id: props.id})
        .then((res: uploadRes) => {
            setBg(res.data.background);
            setCharacter(res.data.character);
            setDesc(res.data.desc);
        });
    }

    const getMemberList = () => {
        baseApi('getMemberList', {group_id: props.id})
        .then((res: uploadRes) => {
            const pattern = /https:\/\/www\.youtube\.com\/(@.+)/i;
            const tmpList = res.data.map((row: {[key:string]: any}) => {
                const handle = row.streamUrl.match(pattern);
                const yt = new Youtube(handle);
                yt.searchLiveStatus();

                return {...row, handle: handle, liveStatus: yt.getLiveStatus(), liveID: yt.getLiveID()};
            })
            setMemberList(tmpList);
        });
    }
    
    useEffect(()=>{
        init();
    },[])
    return (
        <AppLayout>
            <KeyVisual backgroundPath={"/storage/image/" + bg} imgPath={"/storage/image/" + character}/>
            <div className='container'>
                <Editor value={desc} show={false} />
            </div>
            <hr/>
            <div className='container'>
                <h3>メンバーリスト</h3>
                <div className="row mt-4">
                    {memberList.length > 0 ? memberList.map((item: {[key:string]:any}) => (
                        <div className="col-sm-4 card-maxHeight my-2" key={item.id}>
                            <a href={ "/member/" + item.id + '/' + item.liveID}>
                                <Card tag={item.liveStatus ? 'live' : ''} title={item.name} imgName={item.imgName} class="h-100"/>
                            </a>
                        </div>
                    )) : <Fragment/>}
                </div>

            </div>
            <Footer/>
        </AppLayout>
    );
}
export default Group;
