<?php

namespace App\Http\Controllers;

use App\Models\Inventory;
use App\Models\Product;
use App\Models\ProductColor;
use App\Models\ProductImage;
use App\Models\ProductSize;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    public function listProduct(Request $request)
    {

        $query = Product::with(["brand", "category", "inventory", "productSize", "productColor", "productImage"])->latest();

        if($request->search){
          $query = $query->where("name", "LIKE", '%' . $request->search . '%');
        }

        $data = $query->paginate(5);

        return response()->json([
            "status" => true,
            "data" => $data
        ], 200);

    }

    public function createProduct(Request $request)
    {
        return DB::transaction(function () use ($request) {
            $request->validate([
                'brand_id' => 'required|integer',
                'category_id' => 'required|integer',
                'name' => 'required|string|max:100',
                'price' => 'required',
                'stock' => 'required',
                'productsizes' => 'sometimes|array',
                'productcolors' => 'sometimes|array',
                'productimages' => 'sometimes|array'
            ]);

            $product = new Product();

            $product->brand_id = $request->brand_id;
            $product->category_id = $request->category_id;
            $product->name = $request->name;
            $product->price = $request->price;
            $product->description = $request->description;

            if ($request->is_active) {
                $product->is_active = $request->is_active;
            }

            $product->save();

            $inventory = new Inventory();

            $inventory->product_id = $product->id;
            $inventory->stock = $request->stock;

            $inventory->save();

            if ($request->productsizes) {
                foreach ($request->productsizes as $productsize) {

                    $productSize = new ProductSize();

                    $productSize->product_id = $product->id;
                    $productSize->name = $productsize['name'];

                    $productSize->save();
                }
            }

            if ($request->productcolors) {
                foreach ($request->productcolors as $productcolor) {

                    $productColor = new ProductColor();

                    $productColor->product_id = $product->id;
                    $productColor->name = $productcolor['name'];

                    $productColor->save();
                }
            }

            if ($request->hasFile('productimages')) {
                foreach ($request->file('productimages') as $productimage) {

                    $productImage = new ProductImage();

                    $productImage->product_id = $product->id;
                    $productImage->image_path = $productimage['image']?->store('products', 'public');

                    $productImage->save();
                }
            };

            $product = $product->load(["brand", "category", "inventory", "productSize", "productColor", "productImage"]);


            return response()->json([
                "status" => true,
                "data" => $product,
                "message" => "Product create  successfully!"
            ], 201);
        });
    }
}
