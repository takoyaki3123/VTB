import { useState } from "react";

// function
import { baseApi } from "@/lib/api";

// scss
import '../../../css/common.scss'

const Login = () => {
    const [acct, setAcct] = useState("");
    const [ps, setPs] = useState("");

    const login = () => {
        baseApi("loginVerify", {acct: acct, ps: ps})
        .then((res) => {
            
            if (res.data.name == 'admin') {
                location.href = "http://localhost:8000/manage/group";
            } else {
                location.href = "http://localhost:8000/";
            }
        })
    }

    return (
        <div className="container-half mx-auto">
            {/* <img className="mb-4" src="/docs/5.0/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"/> */}
            <h1 className="h3 mb-3 fw-normal text-center">管理者ログイン</h1>

            <div className="form-floating py-1">
                <input type="email" onChange={(e) => setAcct(e.target.value)} className="form-control" id="acct" placeholder="name@example.com"/>
                <label htmlFor="acct">アカウント</label>
            </div>
            <div className="form-floating py-1">
                <input type="password" onChange={(e) => setPs(e.target.value)} className="form-control" id="ps" placeholder="Password"/>
                <label htmlFor="ps">パスワード</label>
            </div>
            <button className="w-100 btn btn-lg btn-primary" onClick={() => login()}>ログイン</button>
        </div>
    )
}
export default Login;