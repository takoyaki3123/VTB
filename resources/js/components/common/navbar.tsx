/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/lib/api";
import { Fragment, useEffect, useState } from "react";
import { GetPromissionPair } from "./promission";

const Navbar = () => {
    const [user, setUser] = useState<any | null>(null);
    const pairList = GetPromissionPair();
    const getUser = () => {
        baseApi('user', {})
        .then((res) => {
            setUser(res.data);
        })
    }
    function isAdmin (id: number| string) {
        if (pairList[id] == 'admin') {
            return true;
        }
        return false;
    }
    useEffect(() => {
        getUser();
        
    },[]);
    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">皆のVTB</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link" aria-current="page" href="#">VTBとは</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link" href="/groupList">グループ</a>
                        </li>
                        {user != null ? 
                            <li className="nav-item dropdown" id="personal">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    個人ページ
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="personal">
                                    <li><a className="dropdown-item" href="/apply/list">申請リスト</a></li>
                                    <li><a className="dropdown-item" href="#">個人情報</a></li>
                                </ul>
                            </li>
                        : <Fragment/>}
                        {user != null && isAdmin(user.id) ?
                            <li className="nav-item dropdown" id="manageNavbar">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    管理
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="manageNavbar">
                                    <li><a className="dropdown-item" href="/applyGroupManage">グループ申請管理</a></li>
                                    <li><a className="dropdown-item" href="/applyMemberManage">メンバー申請管理</a></li>
                                    <li><a className="dropdown-item" href="/userManage">ユーザー管理</a></li>
                                </ul>
                            </li>
                        : <Fragment/>}
                    </ul>
                </div>
            </div>
        </nav>
    );

}
export default Navbar;