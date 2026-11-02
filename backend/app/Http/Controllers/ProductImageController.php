<?php

namespace App\Http\Controllers;

use App\Models\ProductImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductImageController extends Controller
{
    public function deleteProductImage(Request $request)
    {

        $productImage = ProductImage::find($request->id);

        if (!$productImage) {
            return response()->json([
                "status" => false,
                "message" => "ProductImage not found!"
            ], 404);
        }

        if($productImage->image_path){
            Storage::disk('public')->delete($productImage->image_path);
        }

        $productImage->delete();

        return response()->noContent();
    }
}
