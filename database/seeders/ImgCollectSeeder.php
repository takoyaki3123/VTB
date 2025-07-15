<?php

namespace Database\Seeders;

use App\Models\ImgCollectModel;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ImgCollectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $data = [
            ['name' => 'VTB_KV.webp', 'size' => 129236, 'type' => 'webp'],
            ['name' => 'FifbVPhaEAEhZMM.jpg', 'size' => 75057, 'type' => 'jpg'],
            ['name' => 'FpzozIjagAA34hK.jpg', 'size' => 1163866, 'type' => 'jpg'],
            ['name' => '見下す式.jpg', 'size' => 237911, 'type' => 'jpg'],
            ['name' => 'maxresdefault.jpg', 'size' => 182636, 'type' => 'jpg'],
            ['name' => '82284.jpg', 'size' => 1608002, 'type' => 'jpg'],
            ['name' => 'home_background.png', 'size' => 134873, 'type' => 'png'],
            ['name' => 'home_character.png', 'size' => 862129, 'type' => 'png'],
            ['name' => 'hololive_宣伝.webp', 'size' => 582670, 'type' => 'webp'],
            ['name' => 'hololive_background.png', 'size' => 256277, 'type' => 'png'],
            ['name' => '103054721_p0_master1200.jpg', 'size' => 423287, 'type' => 'jpg'],
            ['name' => 'nijisannji_宣伝.jpg', 'size' => 326522, 'type' => 'jpg'],
            ['name' => 'nijisanji_background.jpg', 'size' => 82475, 'type' => 'jpg'],
            ['name' => 'niji_character.jpeg', 'size' => 337172, 'type' => 'jpeg'],
            ['name' => 'vspo_宣伝.jfif', 'size' => 137072, 'type' => 'jfif'],
            ['name' => 'vspo_background.png', 'size' => 158717, 'type' => 'png'],
            ['name' => 'VSPO_character.webp', 'size' => 758962, 'type' => 'webp'],
        ];
        foreach ($data as $imgCollectData) {
            $model = new ImgCollectModel;
            $model->name = $imgCollectData['name'];
            $model->size = $imgCollectData['size'];
            $model->type = $imgCollectData['type'];
            $model->save();
        }
    }
}
