import { useEffect, useState } from 'react';

// component
import KeyVisual from '@/components/common/keyVisual';
import Carousel from '@/components/home/carousel';
import AppLayout from '@/layouts/app-layout';

// function
import { baseApi } from '@/lib/api';
import { shuffle } from '@/lib/utils';

// scss
import '../../css/common.scss';
import '../../css/home.scss';

import { Event, Group } from '@/types';

export default function Home() {
    const [bg,setBg] = useState("");
    const [character,setCharacter] = useState("");
    const [groups, setGroups] = useState<Array<Group>>([]);
    const [event, setEvent] = useState<Array<Event>>([]);
    // データーをとる
    // 1.キービジョン
    // 2.グループ関連

    const getGroup = () => {
        baseApi('getGroupListWithImg', {})
        .then((res) => {
            const showGroup = shuffle(res.data);
            setGroups(showGroup.slice(0, 3));
        });
    }

    const getKeyVisual = () => {
        baseApi('getHome', {})
        .then((res) => {
            setBg(res.data.background);
            setCharacter(res.data.character);
        });
    }

    const getEvent = () => {
        baseApi('getEventList', {})
        .then((res) => {
            const showEvent = shuffle(res.data);
            setEvent(showEvent.slice(0, 3));
        })
    }

    const init = () => {
        getKeyVisual();
        getGroup();
        getEvent();
    }
    
    useEffect(()=>{
        init();
    },[])
    return (
        <AppLayout>
            <KeyVisual backgroundPath={"/storage/image/" + bg} imgPath={"/storage/image/" + character}/>
            <div className='container'>
                <div className='group-carousel my-4'>
                    <h3>グループ</h3>
                    <Carousel items={groups}/>
                    <a className='btn group-link border rounded-corner' href="/groupList">グループ一覧</a>
                </div>
                <div className='event-carousel my-4'>
                    <h3>イベント</h3>
                    <Carousel items={event}/>
                </div>
            </div>
        </AppLayout>
    );
}
