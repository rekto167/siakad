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
                'name' => 'super_admin',
                'alias_name' => 'Super Admin'
            ],
            [
                'name' => 'admin',
                'alias_name' => 'Admin'
            ],
            [
                'name' => 'orang_tua',
                'alias_name' => 'Orang Tua'
            ],
            [
                'name' => 'guru',
                'alias_name' => 'Guru'
            ],
            [
                'name' => 'kepala_sekolah',
                'alias_name' => 'Kepala Sekolah'
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
