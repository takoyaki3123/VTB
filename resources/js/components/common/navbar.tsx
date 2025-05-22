const Navbar = () => {
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
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                グループ
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">VSPO</a></li>
                                <li><a className="dropdown-item" href="#">HOLOLIVE</a></li>
                                <li><a className="dropdown-item" href="#">にじさんじ</a></li>
                                <li><a className="dropdown-item" href="#">のりプロ</a></li>
                                <li><a className="dropdown-item" href="#">あおきり高校</a></li>
                                <li><a className="dropdown-item" href="#">多すぎって全部はできない！</a></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                個人ページ
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="/apply/list">申請リスト</a></li>
                                <li><a className="dropdown-item" href="#">個人情報</a></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">追加したい情報</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );

}
export default Navbar;