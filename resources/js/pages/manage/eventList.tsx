import AppLayout from "@/layouts/app-layout";
import { baseApi } from "@/lib/api";
import { reducerType } from "@/store";
import { User } from "@/types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const EventList = () => {
    const user = useSelector<reducerType, User>(state => state.user);
    const [list, setList] = useState([]);

    const getEvent = () => {
        const url = user.isAdmin ? 'getGroupEventList' : 'getGroupEventList';
        baseApi(url, {'group_id': user.manage_group})
        .then((res) => {
            console.log(res.data);
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

                </div>
            </div>
        </AppLayout>
    )
}
export default EventList;