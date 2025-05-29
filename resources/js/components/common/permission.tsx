/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/lib/api";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reducerType } from "@/store";
import { setPermission, setUser } from "@/store/actionList";
import { pairType, User } from "@/types";


const GetPermissionPair = () => {

    const permission = useSelector<reducerType, any>(state => state.permission);
    const dispatch = useDispatch();
    const [pair, setPair] = useState<pairType>({});
    const init = () => {
        baseApi('getGroupList', {})
        .then((res) => {
            const tmpList = res.data.reduce((obj: pairType, item: any) => {
                obj[item.id] = item.name;
                return obj;
            }, {} as pairType)
            setPair({0: 'user', 1: 'admin', ...tmpList});
            dispatch(setPermission({...tmpList}))
            console.log(permission);
            
        });
    }
    useEffect(() => {
        init();
    },[])
    return pair;
}


const PermissionSelect = (props: {onChange: ((value: string, param: {[key:string]: any}) => void), value: string, param: {[key:string]: any}}) => {
    const [value, setValue] = useState(props.value);
    const [open, setOpen] = useState(false);
    const pairList = useSelector<reducerType, pairType>(state => state.permission);

    return (
        <Select onValueChange={(e) => {props.onChange(e, {id: props.param}); setValue(e);}} open={open} onOpenChange={setOpen} value={value}>
            <SelectTrigger onClick={() => setOpen(!open)}>
                <SelectValue placeholder="Select an option..." />
            </SelectTrigger>
            <SelectContent>
                {Object.entries(pairList).map(([id, name]) => (
                    <SelectItem key={id} value={id.toString()}><span style={{ userSelect: "none" }}>{name}</span></SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}


const PermissionCheck = () => {
    const pairList = useSelector<reducerType, pairType>(state => state.permission);
    const user = useSelector<reducerType, User>(state => state.user);
    const dispatch = useDispatch();
    if (pairList[user.manage_group] == 'admin') {
        dispatch(setUser({...user, isAdmin: true}));
    } else if (pairList[user.manage_group] != 'user') {
        dispatch(setUser({...user, isGroupManager: true}));
    }
}

export {PermissionSelect, GetPermissionPair, PermissionCheck};