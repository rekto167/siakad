<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            [
                'name' => 'admin',
                'alias_name' => 'Admin'
            ],
            [
                'name' => 'guru',
                'alias_name' => 'Guru'
            ],
            [
                'name' => 'siswa',
                'alias_name' => 'Siswa'
            ]
        ];
        foreach($data as $item){
            Role::create($item);
        }
    }
}
