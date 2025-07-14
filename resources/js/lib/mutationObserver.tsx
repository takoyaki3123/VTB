import { mutationOption } from "@/types";
import { RefObject, useEffect } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const useMutationObserver = (
    ref: RefObject<any>,
    callback: () => any,
    options: mutationOption = {
        CharacterData: false,
        childList: false,
        subtree: false,
        attributes: true,
    }
    ) => {
    useEffect(() => {
        if (ref.current) {
        const observer = new MutationObserver(callback);
        observer.observe(ref.current, options);
        return () => observer.disconnect();
        }
    }, [ref]);
};
