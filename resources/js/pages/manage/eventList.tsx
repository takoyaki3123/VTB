import Card from "@/components/common/card";
import AppLayout from "@/layouts/app-layout";
import { baseApi } from "@/lib/api";
import { reducerType } from "@/store";
import { EventListType, User } from "@/types";
import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const EventList = () => {
    const user = useSelector<reducerType, User>(state => state.user);
    const [list, setList] = useState<EventListType[]>([]);

    const getEvent = () => {
        const url = user.isAdmin ? 'getGroupEventList' : 'getGroupEventList';
        baseApi(url, {'group_id': user.manage_group})
        .then((res) => {
            setList(res.data);
        });
    }
    const init = () => {
        getEvent();
    }
    useEffect(() => {
        if (user.permissionChecked && user.manage_group != -1) {
            init();
        }
    },[])

    return (
        <AppLayout>
            <div className='container'>
                <h3>イベントリスト</h3>
                <div className="row mt-4">
                    {list ? list.map((event) => (
                        <div className="col-sm-4 card-maxHeight my-2" key={event.id}>
                            <a href={ "/manage/event/" + event.id}>
                                <Card title={event.title} imgName={event.imgName} class="h-100"/>
                            </a>
                        </div>
                    ))
                    :
                    <Fragment/>}
                </div>
            </div>
        </AppLayout>
    )
}
export default EventList;