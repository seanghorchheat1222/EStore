<?php

namespace App\Http\Controllers;

use App\Models\ProductSize;
use Illuminate\Http\Request;

class ProductSizeController extends Controller
{
    public function deleteProductSize(Request $request)
    {

        $productSize = ProductSize::find($request->id);

        if (!$productSize) {
            return response()->json([
                "status" => false,
                "message" => "ProductSize not found!"
            ], 404);
        }

        $productSize->delete();

        return response()->noContent();
    }
}
