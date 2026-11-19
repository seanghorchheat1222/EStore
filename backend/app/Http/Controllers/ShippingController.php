<?php

namespace App\Http\Controllers;

use App\Models\Shipping;

class ShippingController extends Controller
{
    public function listShipping(){

      $data = Shipping::with(['order'])->latest();

      $data = $data->paginate(5);

      return response()->json([
         "status" => true,
         "data" => $data
      ], 200);
    }
}
