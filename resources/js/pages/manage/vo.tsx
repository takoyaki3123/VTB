export interface HomeVO {
    id: number;
    background: {id?: number | null, name?: string | null; type?: string | null; size?: number | null } | null;
    character: {id?: number | null, name?: string | null; type?: string | null; size?: number | null } | null;
    group: string; // 確保 type 屬性是 string[]
}
export const HomeVO: HomeVO = {
    id: 3,
    background: {
        id: 0,
        name: "DSr2Qw-XkAExk2N.jpg",
        type: "",
        size: 0,
    },
    character: {
        id: 0,
        name: "top_talents_hololive.png",
        type: "",
        size: 0,
    },
    group: "0",
};
export interface GroupVO {
    id: number;
    name: string;
    background: {id?: number | null, name?: string | null; type?: string | null; size?: number | null } | null;
    character: {id?: number | null, name?: string | null; type?: string | null; size?: number | null } | null;
    visual: {id?: number | null, name?: string | null; type?: string | null; size?: number | null } | null;
    desc: string;
    link: string;
}
export const groupVO: GroupVO = {
    id: 0,
    name: '',
    background: {
        id: 0,
        name: "DSr2Qw-XkAExk2N.jpg",
        type: "",
        size: 0,
    },
    character: {
        id: 0,
        name: "top_talents_hololive.png",
        type: "",
        size: 0,
    },
    visual: {
        id: 0,
        name: "top_talents_hololive.png",
        type: "",
        size: 0,
    },
    desc: '',
    link: '#',
}

interface MemberVO {
    id: number | null;
    name: string;
    desc: string;
    streamUrl: string | null;
    streamPlatform: string | null;
    socialUrl: string | null;
    socialPlatform: string | null;
    avatar: {id?: number | null, name?: string | null; type?: string | null; size?: number | null } | null;
    group_id: number | null;
}
export const memberVO: MemberVO = {
    id: null,
    name: '',
    desc: '',
    streamUrl:  null,
    streamPlatform:  null,
    socialUrl:  null,
    socialPlatform: null,
    avatar: null,
    group_id: null,
}