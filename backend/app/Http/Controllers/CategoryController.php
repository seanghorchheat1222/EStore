<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function listCategory(Request $request)
    {
        $query = Category::latest();

        if ($request->seach) {
            $query = $query->where("name", "LIKE", '%' . $request->search . '%');
        }
        ;

        $data = $query->paginate($request->per_page ?? 5);

        return response()->json([
            "status" => true,
            "data" => $data
        ], 200);
    }

    public function createCategory(Request $request)
    {
        $request->validate([
            "name" => 'required|string|max:100'
        ]);

        $category = new Category();

        $category->name = $request->name;
        $category->description = $request->description;

        $category->save();

        return response()->json([
            "status" => true,
            "data" => $category,
            "message" => "Category created successfully!"
        ], 201);
    }

    public function showCategory(Request $request)
    {
        $category = Category::find($request->id);

        if (!$category) {
            return response()->json([
                "status" => false,
                "message" => "Category not found!"
            ], 404);
        }

        return response()->json([
            "status" => true,
            "data" => $category,
        ], 200);
    }

    public function updateCategory(Request $request)
    {
        $request->validate([
            "name" => 'required|string|max:100'
        ]);

        $category = Category::find($request->id);

        if (!$category) {
            return response()->json([
                "status" => false,
                "message" => "Category not found!"
            ], 404);
        }

        $category->name = $request->name;
        $category->description = $request->description;

        $category->update();

        return response()->json([
            "status" => true,
            "data" => $category,
            "message" => "Category updated successfully!"
        ], 201);
    }


    public function deleteCategory(Request $request)
    {
        $category = Category::find($request->id);

        if (!$category) {
            return response()->json([
                "status" => false,
                "message" => "Category not found!"
            ], 404);
        }

        $category->delete();

        return response()->noContent();
    }
}
