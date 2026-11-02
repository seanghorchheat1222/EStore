<?php

namespace App\Http\Controllers;

use App\Models\Inventory;
use App\Models\Product;
use App\Models\ProductColor;
use App\Models\ProductImage;
use App\Models\ProductSize;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use PHPUnit\TextUI\XmlConfiguration\FailedSchemaDetectionResult;

class ProductController extends Controller
{
    public function listProduct(Request $request)
    {

        $query = Product::with(["brand", "category", "inventory", "productSizes", "productColors", "productImages"])->latest();

        if ($request->search) {
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

            $product = $product->load(["brand", "category", "inventory", "productSizes", "productColors", "productImages"]);


            return response()->json([
                "status" => true,
                "data" => $product,
                "message" => "Product create  successfully!"
            ], 201);
        });
    }

    public function showProduct(Request $request)
    {
        $product = Product::find($request->id);

        if (!$product) {
            return response()->json([
                "status" => false,
                "message" => "Product not found!"
            ], 404);
        }

        $product = $product->load(["brand", "category", "inventory", "productSizes", "productColors", "productImages"]);

        return response()->json([
            "status" => true,
            "data" => $product
        ], 200);
    }


    public function updateProduct(Request $request)
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

            $productOld = Product::find($request->id);


            if (!$productOld) {
                return response()->json([
                    "status" => false,
                    "message" => "Product not found!"
                ], 404);
            }

            $productOld->brand_id = $request->brand_id;
            $productOld->category_id = $request->category_id;
            $productOld->name = $request->name;
            $productOld->price = $request->price;
            $productOld->description = $request->description;

            if ($request->is_active) {
                $productOld->is_active = $request->is_active;
            }

            $productOld->update();

            $inventoryOld = Inventory::where("product_id", $productOld->id)->first();

            $inventoryOld->product_id = $productOld->id;
            $inventoryOld->stock = $request->stock;

            $inventoryOld->update();

            if ($request->productsizes) {

                foreach ($request->productsizes as $productsize) {

                    $productsizeExit = ProductSize::where('product_id', $productsize['product_id'])->where('id', $productsize['id'])->first();

                    if (!$productsizeExit) {

                        $productSize = new ProductSize();

                        $productSize->product_id = $productOld->id;
                        $productSize->name = $productsize['name'];

                        $productSize->save();

                    } else {

                        $findProductsizeOldest = ProductSize::find($productsizeExit->id);

                        $findProductsizeOldest->product_id = $productOld->id;
                        $findProductsizeOldest->name = $productsize['name'];

                        $findProductsizeOldest->update();

                    }
                }
            }


            if ($request->productcolors) {
 
                foreach ($request->productcolors as $productcolor) {

                    $productcolorExit = ProductColor::where('product_id', $productcolor['product_id'])->where('id', $productcolor['id'])->first();

                    if (!$productcolorExit) {

                        $productColor = new ProductColor();

                        $productColor->product_id = $productOld->id;
                        $productColor->name = $productcolor['name'];

                        $productColor->save();

                    } else {

                        $findProductcolorOldest = ProductColor::find($productcolorExit->id);

                        $findProductcolorOldest->product_id = $productOld->id;
                        $findProductcolorOldest->name = $productcolor['name'];

                        $findProductcolorOldest->update();

                    }

                }
            }

            if ($request->productimages) {

                foreach ($request->productimages as $productimage) {

                    $productimageExit = ProductImage::where('product_id', $productimage['product_id'])->where('id', $productimage['id'])->first();

                    if (!$productimageExit) {

                        $productImage = new ProductImage();

                        $productImage->product_id = $productOld->id;
                        $productImage->image_path = $productimage['image']?->store('products', 'public');

                        $productImage->save();

                    } else {

                        $findProductimageOldest = ProductImage::find($productimageExit->id);

                        if ($findProductimageOldest->image_path) {
                            Storage::disk('public')->delete($findProductimageOldest->image_path);
                        }

                        $findProductimageOldest->product_id = $productOld->id;
                        $findProductimageOldest->image_path = $productimage['image']?->store('products', 'public');

                        $findProductimageOldest->update();

                    }

                }
            }

            $productOld = $productOld->load(["brand", "category", "inventory", "productSizes", "productColors", "productImages"]);


            return response()->json([
                "status" => true,
                "data" => $productOld,
                "message" => "Product updated successfully!"
            ], 200);
        });
    }


    public function deleteProduct(Request $request)
    {
        $product = Product::find($request->id);

        if (!$product) {
            return response()->json([
                "status" => false,
                "message" => "Product not found!"
            ], 404);
        }

        $product = $product->load(["brand", "category", "inventory", "productSizes", "productColors", "productImages"]);

        foreach($product->productImages as $product_image){
           if($product_image->image_path){
                Storage::disk('public')->delete($product_image->image_path);
           }
        }

        $product->delete();

        return response()->noContent();
    }

}
