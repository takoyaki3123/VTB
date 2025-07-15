<?php

namespace Database\Seeders;

use App\Models\MemberModel;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MemberSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $data = [
            ['name' => '一ノ瀬うるは', 'desc' => 'うるぱんち！！', 'streamUrl' => 'https://www.youtube.com/@uruhaichinose', 'socialUrl' => 'https://x.com/uruha_ichinose', 'status' => true, 'group_id' => 3, 'img_id' => 3, 'apply_user' => 1]
        ];
        foreach ($data as $imgCollectData) {
            $model = new MemberModel;
            $model->name = $imgCollectData['name'];
            $model->desc = $imgCollectData['desc'];
            $model->streamUrl = $imgCollectData['streamUrl'];
            $model->socialUrl = $imgCollectData['socialUrl'];
            $model->status = $imgCollectData['status'];
            $model->group_id = $imgCollectData['group_id'];
            $model->img_id = $imgCollectData['img_id'];
            $model->apply_user = $imgCollectData['apply_user'];
            $model->save();
        }
    }
}
