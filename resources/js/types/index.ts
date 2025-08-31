/* eslint-disable @typescript-eslint/no-explicit-any */
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    url: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at?: string;
    updated_at?: string;
    manage_group: number;
    isAdmin: boolean;
    isGroupManager: boolean;
    [key: string]: unknown; // This allows for additional properties...
}

export interface pairType {
    [id: string|number]: any;
}


export interface mutationOption {
    subtree?: boolean;
    childList?: boolean;
    attributes?: boolean;
    attributeFilter?: Array<string>;
    attributeOldValue?: boolean;
    CharacterData?: boolean;
    characterDataOldValue?: boolean;
}

export interface carouselType {
    imgName: string;
    title?: string;
    name?: string;
    link?: string;
};

export type Group = {
    name: string,
    imgName: string,
    [key: string]: any,
};

export type EventListType = {
    id: number,
    group_id: number,
    imgName: string,
    title: string,
};

export type Event = {
    id: number,
    title: string,
    desc: string,
    link: string,
    start: string,
    end: string,
    group_id: number,
    groupName: string,
    img_id: number,
    imgName: string,
    rejectReason: string,
    status: number,
};

export type uploadParam = {
    type: string,
    group?: number,
}
// todo: use type to process all variable