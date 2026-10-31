<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use Illuminate\Http\Request;

class BrandController extends Controller
{
    public function listBrand(Request $request)
    {
        $query = Brand::latest();

        if ($request->seach) {
            $query = $query->where("name", "LIKE", '%' . $request->search . '%');
        }
        ;

        $data = $query->paginate(5);

        return response()->json([
            "status" => true,
            "data" => $data
        ], 200);
    }

    public function createBrand(Request $request)
    {
        $request->validate([
            "name" => 'required|string|max:100'
        ]);

        $brand = new Brand();

        $brand->name = $request->name;
        $brand->description = $request->description;

        $brand->save();

        return response()->json([
            "status" => true,
            "data" => $brand,
            "message" => "Brand created successfully!"
        ], 201);
    }

    public function showBrand(Request $request)
    {
        $brand = Brand::find($request->id);

        if (!$brand) {
            return response()->json([
                "status" => false,
                "message" => "Brand not found!"
            ], 404);
        }

        return response()->json([
            "status" => true,
            "data" => $brand,
        ], 200);
    }

    public function updateBrand(Request $request)
    {
        $request->validate([
            "name" => 'required|string|max:100'
        ]);

        $brand = Brand::find($request->id);

        if (!$brand) {
            return response()->json([
                "status" => false,
                "message" => "Brand not exist!"
            ], 404);
        }

        $brand->name = $request->name;
        $brand->description = $request->description;

        $brand->update();

        return response()->json([
            "status" => true,
            "data" => $brand,
            "message" => "Brand updated successfully!"
        ], 200);
    }


    public function deleteBrand(Request $request)
    {
        $brand = Brand::find($request->id);

        if (!$brand) {
            return response()->json([
                "status" => false,
                "message" => "Brand not found!"
            ], 404);
        }

        $brand->delete();

        return response()->noContent();
    }
}
