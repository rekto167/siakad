<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\AuthController;
use App\Http\Controllers\api\RoleController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/roles', [RoleController::class,'index']);
Route::middleware('auth:sanctum')->group(function(){
    Route::prefix('user')->group(function (){
        Route::get('/', [AuthController::class, 'fetch']);
        Route::post('/tambah', [\App\Http\Controllers\api\UserController::class, 'add_user']);
    });
    Route::post('/logout', [AuthController::class, 'logout']);
});
