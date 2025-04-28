import Navbar from '@/components/common/navbar';
import KeyVisual from '@/components/home/keyVisual';
import { Head } from '@inertiajs/react';
import '../../../css/home.scss'
import Carousel from '@/components/home/carousel';
import Footer from '@/components/common/footer';
import { Button } from '@/components/ui/button';
import { useEffect, useRef, useState } from 'react';
import { HomeVO } from './vo';
import { Uploader } from '@/components/ui/uploader';
import { baseApi, uploadRes } from '@/lib/api';

// 只修改主視覺
// 輪播是所有group都播
// 輪播的圖由group頁面修改
const HomeManage = () => {
    const [vo, setVo] = useState<typeof HomeVO>({ ...HomeVO });
    const backgroundRef = useRef<HTMLInputElement>(null);
    const characterRef = useRef<HTMLInputElement>(null);
    const [bg, setBg] = useState("");
    const [character, setCharacter] = useState("");
    // const keyVisual = {'background': {name: 'DSr2Qw-XkAExk2N.jpg', imgPath: 'https://pbs.twimg.com/media/'}, 'character': {name: 'top_talents_hololive.png', imgPath: 'https://hololivepro.com/wp-content/themes/hololive_production/images/'}};
    const groups = [{ name: 'test', imgPath: 'https://hololivepro.com/wp-content/themes/hololive_production/images/top_talents_hololive.png' },
    { name: 'test2', imgPath: 'https://hololivepro.com/wp-content/themes/hololive_production/images/top_talents_hololive.png' }];
    const backgroundChange = () => {
        if (backgroundRef.current!.files) {
            const file = backgroundRef.current!.files[0];
            setVo({ ...vo, background: { ...vo.background, name: file.name, type: file.type, size: file.size } });
        }
    }
    const characterChange = () => {
        if (characterRef.current!.files) {
            const file = characterRef.current!.files[0];
            setVo({ ...vo, background: { ...vo.background, name: file.name, type: file.type, size: file.size } });
        }
    }
    const init = () => {
        baseApi('getHome', { 'group_id': '0' })
            .then((res: uploadRes) => {
                setBg(res.data.background);
                setCharacter(res.data.character);
            });
    }
    const upload = () => {
        baseApi('updateHome', { ...vo })
            .then((res: uploadRes) => {
                if (res.data.msg) {
                    alert("update fail!");
                }
                else {
                    init();
                }
            });
    }
    const setImgId = (id: number, type: number) => {
        if (type == 0) {
            setVo({ ...vo, background: { ...vo.background, id: id } });
        }
        else {
            setVo({ ...vo, character: { ...vo.character, id: id } });
        }
    }
    useEffect(() => {
        init();
    }, [])
    return (
        <>
            <Head title="皆のVTB">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className='manageContainer'>
                <div className="input-group mb-3">
                    <label className="input-group-text" htmlFor="keyBackground">背景</label>
                    <Uploader setImgId={(id) => setImgId(id, 0)} className="form-control" id="keyBackground" ref={backgroundRef} refChange={() => backgroundChange()} />
                </div>
                <div className="input-group mb-3">
                    <label className="input-group-text" htmlFor="keyCharacter">キャラ画像</label>
                    <Uploader setImgId={(id) => setImgId(id, 1)} className="form-control" id="keyCharacter" ref={characterRef} refChange={() => characterChange()} />
                </div>
                <Button type="button" className="btn btn-primary" onClick={() => upload()}>確認</Button>
            </div>
            <Navbar />
            <KeyVisual backgroundPath={"/storage/image/" + bg} imgPath={"/storage/image/" + character} />
            <div className='container'>
                <Carousel groups={groups} />
            </div>
            <Footer />
        </>
    );
}
export default HomeManage;