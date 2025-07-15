<?php

namespace Database\Seeders;

use App\Models\KeyVisualModel;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class KeyVisualSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $data = [
            ['background_img_id' => '9', 'character_img_id' => '9', 'group_id' => 1,],
            ['background_img_id' => '13', 'character_img_id' => '14', 'group_id' => 2,],
            ['background_img_id' => '16', 'character_img_id' => '17', 'group_id' => 3,],
        ];
        foreach ($data as $imgCollectData) {
            $model = new KeyVisualModel;
            $model->background_img_id = $imgCollectData['background_img_id'];
            $model->character_img_id = $imgCollectData['character_img_id'];
            $model->group_id = $imgCollectData['group_id'];
            $model->save();
        }
    }
}
