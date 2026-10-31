<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request){
      $request->validate([
        "email" => 'required|email',
        "password" => 'required|string'
      ]);
      
      $user = User::where("email", $request->email)->first();

      if(!$user || !Hash::check($request->password, $user->password)){
        return response()->json([
          "status" => true,
          "message" => "Invalid email or password!"
        ], 401); # unauthorized, server does not know who it is
      }

      $token = $user->createToken(
        "estore-browser",
        ["*"],
        now()->addHour(8), 
      )->plainTextToken;
       
      return response()->json([
        "token" => $token
      ]);
    }

    public function currentUser(Request $request){
      $user = $request->user()->load("setting")->only(["id", "name", "email", "role", "setting"]);

      return response()->json([
        "status" => true,
        "data" => $user
      ], 200);
    }

    public function logout(Request $request){
      $request->user()->currentAccessToken()->delete();
      return response()->noContent();
    }
}
