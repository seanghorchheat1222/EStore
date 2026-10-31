<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Mail;

class UserController extends Controller
{   
    public function listUser(Request $request){
        $userId = $request->user()->id;

        $query = User::where("id", "!=", $userId)->latest();
        
        if($request->search){
            $query = $query->where("name", "LIKE" , '%' . $request->search . '%');
        }

        $data = $query->paginate(5);
        
        return response([
         "status" => true,
         "data"=> $data
        ], 200);
    }

    public function requestOtp(Request $request){
        $request->validate([
            "email" => 'required|email'
        ]);

        $user = User::where("email", $request->email)->first();

        if($user){
            return response()->json([
                "status" => false,
                "message" => "Email already Exit!"
            ], 409);
        }

        $otp = rand(100000, 999999);

        Cache::put("otp_" . $request->email, $otp, now()->addMinute());

        Mail::raw("Your OTP is: $otp", function($message) use ($request){ // because anonymouse functoins php not allow to access variable from surrounding scope, so we have to user "use ()"
            $message->to($request->email);
            $message->subject("Your OTP from EStore");
        });

        return response()->json([
            "status" => true,
            "message" => "OTP sent successfully & expired in 1min!"
        ], 200);    
    }

    public function confirmOtp(Request $request){
        $request->validate([
            "email" => 'required|email',
            "otp" => 'required|digits:6'
        ]);


        $otp = Cache::get("otp_" . $request->email);

        if(!$otp){
            return response()->json([
                "status" => false,
                "message" => "OTP expired or not found!"
            ], 400); # bad request
        }

        if($otp != $request->otp){
           return response()->json([
            "status" => false,
            "message" => "Invalid OTP!"
           ], 400);
        }

        cache::forget("otp_" . $request->email);

        return response()->json([
            "status" => true,
            "message" => "Verified OTP successfully!"
        ], 200);
    }

    public function createUser(Request $request){
        $request->validate([
            "name" => 'required|string|max:100',
            "email" => 'required|email',
            "password" => 'required|string'
        ]);

        $user = new User();

        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->email_verified_at = Carbon::now();

        if($request->role){
            $user->role = $request->role;
        }

        $user->save();

        return response()->json([
            "status" => true,
            "message" => "Account create successfully!"
        ], 201);

    }

     public function resetPassword(Request $request){
        $request->validate([
            "password" => 'required|string'
        ]);

        $userId = $request->user()->only(["id"]);

        $user = User::findOrFail($userId)->first();

        $user->password = Hash::make($request->password);

        $user->save();

        return response()->json([
            "status" => true,
            "message" => "Password reset successfully!"
        ], 200);
    }

    
}
