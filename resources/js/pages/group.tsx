/* eslint-disable @typescript-eslint/no-explicit-any */

import KeyVisual from '@/components/home/keyVisual';
import '../../css/common.scss';
import '../../css/group.scss';
import Footer from '@/components/common/footer';
import { Fragment, useEffect, useState } from 'react';
import { baseApi, uploadRes } from '@/lib/api';
import Editor from '@/components/common/editor';
import PropTypes from "prop-types";
import Card from '@/components/common/card';
import AppLayout from '@/layouts/app-layout';
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
            setMemberList(res.data);
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
                            <a href={ "/member/" + item.id}>
                                <Card title={item.name} imgName={item.imgName} class="h-100"/>
                            </a>
                        </div>
                    )) : <Fragment/>}
                </div>

            </div>
            <Footer/>
        </AppLayout>
    );
}
Group.propTypes = {
    id: PropTypes.string.isRequired,
}
export default Group;
