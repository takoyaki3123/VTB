import { useEffect, useState } from 'react';

// component
import KeyVisual from '@/components/home/keyVisual';
import Carousel, { Group } from '@/components/home/carousel';
import Footer from '@/components/common/footer';
import AppLayout from '@/layouts/app-layout';

// function
import { baseApi, uploadRes } from '@/lib/api';
import { shuffle } from '@/lib/utils';

// scss
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
        baseApi('getHome', {})
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
        <AppLayout>
            <KeyVisual backgroundPath={"/storage/image/" + bg} imgPath={"/storage/image/" + character}/>
            <div className='container'>
                <Carousel groups={groups}/>
            </div>
            <Footer/>
        </AppLayout>
    );
}
