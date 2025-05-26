/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/lib/api";
import { Fragment, useEffect, useState } from "react";

const Navbar = () => {
    const [user, setUser] = useState<any | null>(null);
    const getUser = () => {
        baseApi('user', {})
        .then((res) => {
            console.log(res.data);
            
            setUser(res.data);
        })
    }
    useEffect(() => {
        getUser();
    },[])
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
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    個人ページ
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="/apply/list">申請リスト</a></li>
                                    <li><a className="dropdown-item" href="#">個人情報</a></li>
                                </ul>
                            </li>
                        : <Fragment/>}
                        {user != null && (user.name == 'admin' || user.name == 'administrator') ?
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    管理
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="/applyGroupManage">グループ申請管理</a></li>
                                    <li><a className="dropdown-item" href="/applyMemberManage">メンバー申請管理</a></li>
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