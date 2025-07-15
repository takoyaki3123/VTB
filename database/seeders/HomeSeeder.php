<?php

namespace Database\Seeders;

use App\Models\HomeModel;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class HomeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $data = [
            ['background' => '7', 'character' => '8']
        ];
        
        foreach ($data as $imgCollectData) {
            $model = new HomeModel;
            $model->background = $imgCollectData['background'];
            $model->character = $imgCollectData['character'];
            $model->save();
        }
    }
}
