/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react"

import { cn } from "@/lib/utils"
import { uploadApi, uploadRes } from "@/lib/api";

function Uploader({ className, id, ref, setImgId, refChange }: {className:string, id:string, ref:React.RefObject<HTMLInputElement | null>, setImgId:(id:number) => void, refChange:(ref: React.RefObject<HTMLInputElement | null>)=>void}) {
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        refChange(ref);
        if(e.target!.files![0]) {
            uploadApi("uploadImg",{'image': e.target.files![0]})
            .then((res: uploadRes) => {
                if(res.data.msg){
                    alert("upload fail!");
                }
                setImgId(res.data.id);
            });
        }
    }
    return (
        <input
            type='file'
            data-slot="input"
            className={cn(
                "border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                className
            )}
            onChange={e=>{handleChange(e)}}
            ref={ref}
            id={id}
        />
    )
}

export { Uploader }
