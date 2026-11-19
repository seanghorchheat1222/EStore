<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class RecordController extends Controller
{
    public function listRecord(Request $request)
    {
        $query = Order::with(["orderItems", "user"])->withCount('orderItems')->latest();

        $data = $query->paginate(5);
    
        return response()->json([
            "status" => true,
            "data" => $data,
        ], 200);
    }

    public function showRecord(Request $request){
        $record = Order::find($request->id);

        if(!$record){
            return response()->json([
                "status" => false,
                "message" => "Record not found!"
            ], 404);
        }

        $record = $record->load(["orderItems.product", "user"]);

        return response()->json([
            "status" => true,
            "data" => $record
        ], 200);
    }
}
