<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $data = [
            ['name' => 'admin', 'email' => env('DEFAULT_EMAIL', 'test@test.test'), 'password' => '$2y$12$Orz2vQiXVnZrvdMDXl244.xFnISvcgQ3m8/THDZUh8dJtZp9FG5QO', 'icon' => '', 'manage_group' => 10242048]
        ];
        foreach ($data as $imgCollectData) {
            $model = new User;
            $model->name = $imgCollectData['name'];
            $model->email = $imgCollectData['email'];
            $model->password = $imgCollectData['password'];
            $model->icon = $imgCollectData['icon'];
            $model->manage_group = $imgCollectData['manage_group'];
            $model->save();
        }
    }
}
