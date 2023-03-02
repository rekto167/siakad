<?php

namespace App\Http\Controllers\api;

use App\Helpers\ResponseFormatter;
use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    public function index()
    {
        try{
            $data = Role::all();
            return response()->json($data);
        } catch (Exception $error){
            return ResponseFormatter::error([
                'error' => $error->getMessage()
            ],'Something went wrong.', 500);
        }
    }
}
