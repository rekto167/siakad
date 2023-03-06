<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function add_user(Request $request){
        try {
            $request->validate([
                'role' => ['required'],
                'name' => ['required', 'string', 'max:255'],
                'email' => ['string', 'email'],
                'password' => ['required', 'string']
            ]);
            $role = Role::where('name', $request->role)->first();

            if ($request->role == 'admin'){
                $request->validate([
                    'username' => ['required', 'string']
                ]);
            }elseif($request->role == 'guru'){
                $request->validate([
                    'nip' => ['required', 'string', 'max:18']
                ]);
            } elseif ($request->role == 'siswa'){
                $request->validate([
                    'nis' => ['required', 'string', 'max:10']
                ]);
            } else {
                return response()->json([
                    'message' => 'Cek kembali role'
                ], 401);
            }

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email ?: null,
                'username' => $request->username ?: null,
                'nip' => $request->nip ?: null,
                'nis' => $request->nis ?: null,
                'password' => Hash::make($request->password),
                'role_id' => $role->id
            ]);

            if ($request->role == 'guru'){
                Teacher::create([
                    'user_uuid' => $user->uuid,
                ]);
            }
            if ($request->role == 'siswa'){
                Student::create([
                    'user_uuid' => $user->uuid,
                ]);
            }
            $user->assignRole($request->role);

            $profile = Profile::create([
                'user_uuid' => $user->uuid,
                'telp' => $request->telp ?: null,
                'address' => $request->address ?: null,
                'poto_profil' => $request->poto_profil ?: null,
            ]);

            return response()->json([
                'message' => 'Berhasil tambah user',
                'user' => $user,
                'profile' => $profile
            ]);
        }catch (\Exception $error){
            return response()->json([
                'error' => $error->getMessage()
            ],500);
        }
    }
}
