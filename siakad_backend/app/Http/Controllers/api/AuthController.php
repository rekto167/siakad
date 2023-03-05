<?php

namespace App\Http\Controllers\api;

use App\Helpers\ResponseFormatter;
use App\Http\Controllers\Controller;
use App\Models\User;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        try {
            $request->validate([
                'name' => ['required', 'string', 'max:255'],
                'username' => ['required', 'string'],
                'password' => ['required', 'string', 'min:8']
            ]);

            $role = Role::where('name', $request->role)->first();

            $user = User::where('username', $request->username)->first();
            if($user){
               return response()->json([
                   'message' => 'Akun sudah terdaftar'
               ],409);
            }

            $data = User::create([
                'name' => $request->name,
                'email' => $request->email ?: null,
                'username' => $request->username,
                'password' => Hash::make($request->password),
                'role_id' => $role->id
            ]);

            $token_result = $data->createToken('c2lha2FkMjAyMw==')->plainTextToken;

            return ResponseFormatter::success([
                'token' => $token_result,
                'user' => $data
            ],'Successfully create user');
        } catch (\Exception $error){
            return response()->json($error->getMessage());
        }
    }

    public function login(Request $request)
    {
        try {
            $request->validate([
                'role' => ['required', 'string'],
                'username_info' => ['required', 'string'],
                'password' => ['required', 'string']
            ]);

            if ($request->role == 'admin'){
                if(!Auth::attempt(['username' => $request->username_info, 'password' => $request->password])){
                    return response()->json([
                        'message' => 'Auth gagal'
                    ],401);
                }
                $user = User::where('username', $request->username_info)->first();
            } elseif($request->role == 'guru'){
                if(!Auth::attempt(['nip' => $request->username_info, 'password' => $request->password])){
                    return response()->json([
                        'message' => 'Auth gagal'
                    ],401);
                }
                $user = User::where('nip', $request->username_info)->first();
            } elseif ($request->role == 'siswa'){
                if(!Auth::attempt(['nis' => $request->username_info, 'password' => $request->password])){
                    return response()->json([
                        'message' => 'Auth gagal'
                    ],401);
                }
                $user = User::where('nis', $request->username_info)->first();
            } else{
                return response()->json([
                    'message' => 'Pastikan role login anda benar'
                ],404);
            }

            if(!Hash::check($request->password, $user->password, [])){
                throw new \Exception('Invalid Credential');
            }

            $token = $user->createToken('c2lha2FkMjAyMw==')->plainTextToken;
            return response()->json([
                'token' => $token,
                'user' => $user
            ]);
        }catch (\Exception $error){
           return response()->json([
               'error' => $error->getMessage()
           ],500);
        }
    }

    public function logout(Request $request){
        $token = $request->user()->currentAccessToken()->delete();
        return ResponseFormatter::success($token, 'Logged out');
    }

    public function fetch(Request $request){
        return response()->json($request->user());
    }
}
