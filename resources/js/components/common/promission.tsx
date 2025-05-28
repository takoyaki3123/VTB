/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/lib/api";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";

interface pairType {
    [id:string|number]: any;
}

const GetPromissionPair = () => {
    const [pair, setPair] = useState<pairType>({});
    const init = () => {
        baseApi('getGroupList', {})
        .then((res) => {
            const tmpList = res.data.reduce((obj: pairType, item: any) => {
                obj[item.id] = item.name;
                return obj;
            }, {} as pairType)
            setPair({0: 'user', 1: 'admin', ...tmpList});
        });
    }
    useEffect(() => {
        init();
    },[])
    return pair;
}


const PromissionSelect = (props: {onChange: ((value: string, param: {[key:string]: any}) => void), value: string, param: {[key:string]: any}}) => {
    const [value, setValue] = useState(props.value);
    const [open, setOpen] = useState(false);
    const pairList = GetPromissionPair();

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

export {PromissionSelect, GetPromissionPair};