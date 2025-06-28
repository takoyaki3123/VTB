import AppLayout from "@/layouts/app-layout";

const About = () => {
    return (
        <AppLayout>
            <div className="container px-4">
                <h1>VTBとは</h1>
                <div className="w-100 px-4">
                    <p>
                        VTBはバーチャルYouTuberの略称、
                        2DCGや3DCGで描画されたキャラクター（アバター）、
                        もしくはそれらを用いて主にインターネットなどのメディアで活動する動画投稿・ 生放送を行う配信者の総称を指す語。
                    </p>
                    <br />
                    <p>
                        初出は2016年12月に活動を開始した
                        <a href="https://www.youtube.com/channel/UC4YaOt1yT-ZeyB0OmxHgolA">キズナアイ</a>がYouTuber活動を行う際の自称である。
                        活動や運営方針に合わせた肩書や呼称としてバーチャルアイドル、バーチャルシンガー、バーチャルライバー、バーチャルタレント、Vの者などがある。
                        バーチャルYouTuberの活動の場はYouTubeのみならず、
                        他のプラットフォームなどでも行われており、
                        その活動は多岐におよぶ。
                        語釈には様々な解釈・定義・解説があり、ミライアカリによれば「定義ははっきりと決まっていない」状態にある。
                    </p>
                </div>
            </div>
        </AppLayout>
    )
}
export default About;