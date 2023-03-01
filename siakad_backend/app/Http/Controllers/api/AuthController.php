<?php

namespace App\Http\Controllers\api;

use App\Helpers\ResponseFormatter;
use App\Http\Controllers\Controller;
use App\Models\User;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        try {
            $request->validate([
                'name' => ['required', 'string', 'max:255'],
                'email' => ['required', 'string', 'email'],
                'password' => ['required', 'string', 'min:8']
            ]);

            $user = User::where('email', $request->email)->first();
            if($user){
                return ResponseFormatter::error([
                    'message' => 'Akun sudah ada.'
                ], 'User was already exist.', 409);
            }

            $data = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password)
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
                'email' => ['required', 'string', 'email'],
                'password' => ['required', 'string']
            ]);

            $credential = request(['email', 'password']);
            if(!Auth::attempt($credential)){
                return ResponseFormatter::error([
                    'message' => 'Unauthorized'
                ],'Auth Failed', 401);
            }

            $user = User::where('email', $request->email)->first();
            if(!Hash::check($request->password, $user->password, [])){
                throw new \Exception('Invalid Credential');
            }

            $token = $user->createToken('c2lha2FkMjAyMw==')->plainTextToken;
            return ResponseFormatter::success([
                'token' => $token,
                'user' => $user
            ],'Auth Berhasil');
        }catch (\Exception $error){
            return ResponseFormatter::error([
                'message' => $error->getMessage()
            ], 'Something went wrong.', 500);
        }
    }

    public function logout(Request $request){
        $token = $request->user()->currentAccessToken()->delete();
        return ResponseFormatter::success($token, 'Logged out');
    }

    public function fetch(Request $request){
        return ResponseFormatter::success($request->user(), 'Data berhasil di fetch.');
    }
}
