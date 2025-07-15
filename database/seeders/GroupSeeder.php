<?php

namespace Database\Seeders;

use App\Models\GroupModel;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GroupSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $data = [
            ['name' => 'ホロライブ', 'desc' => 'VTuber事務所「**ホロライブプロダクション**」では、多彩な才能の発掘を目的に、タレントオーディションを開催しています。

我々は、世界が愛するカルチャーをつくります。', 'link' => 'https://hololivepro.com/', 'apply_user' => 1, 'status' => true, 'img_id' => 9],
            ['name' => 'にじさんじ', 'desc' => '## **魔法のような、新体験を。**

僕らは、テクノロジーで、エンタメを変える。
もっと自由で、もっと多彩で、
もっとディープなコンテンツを送り出し、
魔法のような新体験を世界に届ける。', 'link' => 'https://www.nijisanji.jp/', 'apply_user' => 1, 'status' => true, 'img_id' => 12],
            ['name' => 'VSPO', 'desc' => '「**ぶいすぽっ！**」は、ゲームに本気で取り組み、ゲーム・esportsという共通言語を通じて、新しい挑戦や努力によって応援してくださる皆様に新しい一歩を踏み出すきっかけを届ける、次世代Virtual esports Projectです。

VTuberとしての配信活動、esports大会への出場、アニメやコミックなど、様々なメディアミックスを展開しています。', 'link' => 'https://vspo.jp/', 'apply_user' => 1, 'status' => true, 'img_id' => 15],
        ];
        
        foreach ($data as $imgCollectData) {
            $model = new GroupModel;
            $model->name = $imgCollectData['name'];
            $model->desc = $imgCollectData['desc'];
            $model->link = $imgCollectData['link'];
            $model->apply_user = $imgCollectData['apply_user'];
            $model->status = $imgCollectData['status'];
            $model->img_id = $imgCollectData['img_id'];
            $model->save();
        }
    }
}
