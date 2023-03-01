<?php

namespace App\Http\Controllers\api;

use App\Helpers\ResponseFormatter;
use App\Http\Controllers\Controller;
use App\Models\Profile;
use App\Models\StudentParent;
use App\Models\SuperAdmin;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function add_user(Request $request){
        try {
            $request->validate([
                'role' => 'required',
                'name' => ['required', 'string', 'max:255'],
                'email' => ['string', 'email'],
                'password' => ['required', 'string']
            ]);

            if($request->role == 1 || $request->role == 2 || $request->role == 3){
                //Super Admin / Admin / Orang Tua
                $request->validate([
                    'username' => ['required', 'string', 'max:255']
                ]);

                $user = User::where('username', $request->username)->firstOrFail();
                if ($user){
                    return ResponseFormatter::error([
                        'message' => $request->username.' Sudah Terdaftar.'
                    ],'User already exist.', 409);
                }
            } elseif ($request->role == 4 || $request->role == 5){
                //Guru / Kepala Sekolah
                $request->validate([
                    'nip' => ['required', 'string', 'max:18', 'min:18']
                ]);

                $user = User::where('nip', $request->nip)->firstOrFail();
                if ($user){
                    return ResponseFormatter::error([
                        'message' => $request->nip.' Sudah Terdaftar.'
                    ],'User already exist.', 409);
                }

            } elseif ($request->role == 6){
                //Siswa
                $request->validate([
                    'nis' => ['required', 'string', 'min:10', 'max:10']
                ]);

                $user = User::where('nis', $request->nis)->firstOrFail();
                if ($user){
                    return ResponseFormatter::error([
                        'message' => $request->nis.' Sudah Terdaftar.'
                    ],'User already exist.', 409);
                }
            } else{
                return ResponseFormatter::error([
                    'message' => 'Cek kembali role anda.'
                ],'Role not found', 404);
            }

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email ?: null,
                'username' => $request->username ?: null,
                'nip' => $request->nip ?: null,
                'nis' => $request->nis ?: null,
                'password' => Hash::make($request->password)
            ]);

            if ($request->role == 3){
                //Orang tua
                StudentParent::create([
                    'user_uuid' => $user->uuid,
                ]);
            }

            $profile = Profile::create([
                'user_uuid' => $user->uuid,
                'telp' => $request->telp ?: null,
                'address' => $request->address ?: null,
                'poto_profil' => $request->poto_profil ?: null,
            ]);

            return ResponseFormatter::success([
                'user' => $user,
                'profile' => $profile
            ],'Create user successfully.');
        }catch (\Exception $error){
            return ResponseFormatter::error([
                'error' => $error->getMessage()
            ],'Something went wrong', 500);
        }
    }
}
