import { useEffect, useRef, useState } from 'react';

//component
import KeyVisual from '@/components/home/keyVisual';
import Carousel, { Group } from '@/components/home/carousel';
import Footer from '@/components/common/footer';
import { Button } from '@/components/ui/button';
import { HomeVO } from '../vo';
import { Uploader } from '@/components/common/uploader';
import AppLayout from '@/layouts/app-layout';

//function
import { shuffle } from '@/lib/utils';
import { baseApi, uploadRes } from '@/lib/api';

// scss
import '../../../css/common.scss';
import '../../../css/home.scss';

// 只修改主視覺
// 輪播是所有group都播
// 輪播的圖由group頁面修改
const HomeManage = () => {
    const [vo, setVo] = useState<typeof HomeVO>({ ...HomeVO });
    const backgroundRef = useRef<HTMLInputElement>(null);
    const characterRef = useRef<HTMLInputElement>(null);
    const [bg, setBg] = useState("");
    const [character, setCharacter] = useState("");
    const [groups, setGroups] = useState<Array<Group>>([]);
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

    const getGroup = () => {
        baseApi('getGroupListWithImg', {})
        .then((res: uploadRes) => {
            const showGroup = shuffle(res.data);
            console.log(showGroup);
            
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
        <AppLayout>
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
            <hr/>
            <h5>實際顯示內容</h5>
            <KeyVisual backgroundPath={"/storage/image/" + bg} imgPath={"/storage/image/" + character} />
            <div className='container'>
                <Carousel groups={groups} />
            </div>
        </AppLayout>
    );
}
export default HomeManage;