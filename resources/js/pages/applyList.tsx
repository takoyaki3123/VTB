import Navbar from "@/components/common/navbar";
import { TabItemParam, Tabs } from "@/components/common/tabs";
import { baseApi } from "@/lib/api";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { Fragment } from "react/jsx-runtime";

const ApplyList = () => {
    const [tabContent, setTabContent] = useState<TabItemParam[]>();

    const init = () => {
        baseApi('getApplyList', {})
        .then((res) => {
            console.log(res);
        })
    }
    useEffect(() => {
        init();
    },[])
    return (
        <Fragment>
            <Head title={"皆のVTB"}></Head>
            <Navbar/>
            <div className="container-half mx-auto">
                {tabContent != null ?     
                    <Tabs tabItem={tabContent}/>
                    :<Fragment/>
                }
            </div>
        </Fragment>
    )
}
export default ApplyList;