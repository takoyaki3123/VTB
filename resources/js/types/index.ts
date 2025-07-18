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