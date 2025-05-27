/* eslint-disable @typescript-eslint/no-explicit-any */

import Navbar from '@/components/common/navbar';
import KeyVisual from '@/components/home/keyVisual';
import { Head } from '@inertiajs/react';
import Carousel, { Group } from '@/components/home/carousel';
import Footer from '@/components/common/footer';
import { useEffect, useState } from 'react';
import { baseApi, uploadRes } from '@/lib/api';
import { shuffle } from '@/lib/utils';
import '../../css/common.scss';
import '../../css/home.scss';
export default function Home() {
    const [bg,setBg] = useState("");
    const [character,setCharacter] = useState("");
    const [groups, setGroups] = useState<Array<Group>>([]);
    // データーをとる
    // 1.キービジョン
    // 2.グループ関連

    const getGroup = () => {
        baseApi('getGroupListWithImg', {})
        .then((res: uploadRes) => {
            const showGroup = shuffle(res.data);
            setGroups(showGroup.slice(0,3));
        });
    }

    const getKeyVisual = () => {
        baseApi('getHome', {group_id: 0})
        .then((res: uploadRes) => {
            setBg(res.data.background);
            setCharacter(res.data.character);
        });
    }

    const init = () => {
        getKeyVisual();
        getGroup();
    }
    
    useEffect(()=>{
        init();
    },[])
    return (
        <>
            <Head title="皆のVTB">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <Navbar/>
            <KeyVisual backgroundPath={"/storage/image/" + bg} imgPath={"/storage/image/" + character}/>
            <div className='container'>
                <Carousel groups={groups}/>
            </div>
            <Footer/>
        </>
    );
}
