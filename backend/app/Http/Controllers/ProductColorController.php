<?php

namespace App\Http\Controllers;

use App\Models\ProductColor;
use Illuminate\Http\Request;

class ProductColorController extends Controller
{
    public function deleteProductColor(Request $request){
     
        $productColor = ProductColor::find($request->id);
        
        if(!$productColor){
            return response()->json([
                "status" => false,
                "message" => "ProductColor not found!"
            ], 404);
        }

        $productColor->delete();

        return response()->noContent();
    }
}
