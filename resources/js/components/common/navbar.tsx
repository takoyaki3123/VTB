/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/lib/api";
import { Fragment, useEffect, useState } from "react";
import { GetPermissionPair, PermissionCheck } from "./permission";
import { useDispatch, useSelector } from "react-redux";
import { reducerType } from "@/store";
import { User } from "@/types";
import { setUser } from "@/store/actionList";
import Avatar from "./avatar";

const Navbar = () => {
    const pairList = GetPermissionPair();
    const user = useSelector<reducerType, User>(state => state.user);
    const dispatch = useDispatch();
    const [permissionChecked, setPermissionCheck] = useState(false);
    const getUser = () => {
        baseApi('user', {})
        .then((res) => {
            dispatch(setUser({...user, ...res.data}));
        })
    }
    const init = () => {
        getUser();
    }
    useEffect(() => {
        init();
    },[]);
    useEffect(() => {
        if (!permissionChecked && user.manage_group != -1) {
            PermissionCheck(user, pairList, dispatch);
            setPermissionCheck(true);
        }
    }, [user])
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
                            <a className="nav-link" aria-current="page" href="/about">VTBとは</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/groupList">グループ</a>
                        </li>
                        {user != null && user.isAdmin ?
                            <li className="nav-item dropdown" id="manageNavbar">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    管理
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="manageNavbar">
                                    <li><a className="dropdown-item" href="/homeManage">ホームページ管理</a></li>
                                    <li><a className="dropdown-item" href="/applyGroupManage">グループ申請管理</a></li>
                                    <li><a className="dropdown-item" href="/applyMemberManage">メンバー申請管理</a></li>
                                    <li><a className="dropdown-item" href="/groupManage">グループ管理</a></li>
                                    <li><a className="dropdown-item" href="manage/memberList">メンバー管理</a></li>
                                    <li><a className="dropdown-item" href="/userManage">ユーザー管理</a></li>
                                </ul>
                            </li>
                        : <Fragment/>}

                        {user != null && user.name != "" ? 
                            <li className="nav-item dropdown" id="personal">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <Avatar size="small"/>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="personal">
                                    <li><a className="dropdown-item" href="/apply/list">申請リスト</a></li>
                                    <li><a className="dropdown-item" href="/personal">個人情報</a></li>
                                    <li><a className="dropdown-item" href="/logout">ログアウト</a></li>
                                </ul>
                            </li>
                        : 
                            <li className="nav-item">
                                <a className="nav-link" href="/login">ログイン</a>
                            </li>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );

}
export default Navbar;