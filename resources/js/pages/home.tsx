
import Navbar from '@/components/common/navbar';
import KeyVisual from '@/components/home/keyVisual';
import { Head } from '@inertiajs/react';
import '../../css/home.scss'
import Carousel from '@/components/home/carousel';
import Footer from '@/components/common/footer';
import { useEffect, useState } from 'react';
import { baseApi, uploadRes } from '@/lib/api';
export default function Home() {
    // データーをとる
    // 1.キービジョン
    // 2.グループ関連

    const init = () => {
        baseApi('getHome', {})
        .then((res: uploadRes) => {
            setBg(res.data.background);
            setCharacter(res.data.character);
        });
    }
    const [bg,setBg] = useState("");
    const [character,setCharacter] = useState("");
    const groups = [{name: 'test',imgPath: 'https://hololivepro.com/wp-content/themes/hololive_production/images/top_talents_hololive.png'},
                    {name: 'test2',imgPath: 'https://hololivepro.com/wp-content/themes/hololive_production/images/top_talents_hololive.png'}];
    
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
