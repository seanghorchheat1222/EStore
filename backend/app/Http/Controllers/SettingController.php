<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Client\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SettingController extends Controller
{
    public function setSetting(Request $request)
    {
        $user_id = $request->user()->id;

        $oldSetting = Setting::where("user_id", $user_id)->first();

        if (!$oldSetting) {
            $setting = new Setting();

            $setting->user_id = $user_id;
            $setting->phone_number = $request->phone_number;
            $setting->address = $request->address;
            $setting->date_birth = $request->date_birth;

            if ($request->file('image')) {
                $setting->image = $request->file('image')?->store('profiles', 'public');
            }

            $setting->save();

            return response()->json([
                "status" => true,
                "message" => "Setting set successfully!"
            ], 201);
        }

        $oldSetting->user_id = $user_id;
        $oldSetting->phone_number = $request->phone_number;
        $oldSetting->address = $request->address;
        $oldSetting->date_birth = $request->date_birth;

        if ($request->file('image')) {
            if ($oldSetting->image) {
                Storage::disk('public')->delete($oldSetting->image);
            }
            $oldSetting->image = $request->file('image')?->store('profiles', 'public');
        }

        $oldSetting->update();

        return response()->json([
            "status" => true,
            "message" => "Setting updated successfully!"
        ], 200);

    }
}
