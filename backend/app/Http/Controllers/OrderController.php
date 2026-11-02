<?php

namespace App\Http\Controllers;

use App\Models\Inventory;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Payment;
use App\Models\Product;
use App\Models\Shipping;
use App\Services\PaywayPaymentService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{   

    public function order(Request $request, PaywayPaymentService $paywaypayment)
    {
        return DB::transaction(function () use ($request, $paywaypayment) {
            $request->validate([
                "type_order" => 'required|string|max:100',
                "type_payment" => 'required|string|max:100',
                "orderitems" => 'array'
            ]);

            $user_id = $request->user()->id;

            $order = new Order();

            $order->user_id = $user_id;
            $order->type_order = $request->type_order;
            $order->type_payment = $request->type_payment;

            $total = 0;

            foreach ($request->orderitems as $orderitem) {

                $product = Product::find($orderitem['id']);

                if (!$product)
                    return response()->isNotFound();

                $sub_total = $product->price * $orderitem['quantity'];

                $total = $total + $sub_total;
            }

            $order->total = $total;

            $order->save();


            foreach ($request->orderitems as $orderitem) {

                $product = Product::find($orderitem['id']);

                if (!$product)
                    return response()->json([
                        "status " => false,
                        "message" => "Product not found!"
                    ], 404);

                $newOrderitem = new OrderItem();

                $newOrderitem->order_id = $order->id;
                $newOrderitem->product_id = $orderitem['id'];
                $newOrderitem->price = $product->price;
                $newOrderitem->quantity = $orderitem['quantity'];
                $newOrderitem->sub_total = $product->price * $orderitem['quantity'];

                $newOrderitem->save();
            }


            foreach ($request->orderitems as $orderitem) {
                $inventory = Inventory::where("product_id", $orderitem['id'])->first();

                if ($inventory['stock'] < $orderitem['quantity'])

                    return response()->json([
                        "status" => false,
                        "message" => "Stock not enougth"
                    ], 400);

                $final_stock = $inventory['stock'] - $orderitem['quantity'];

                $inventory->product_id = $orderitem['id'];
                $inventory->stock = $final_stock;

                $inventory->update();
            }

            if ($request->type_order === "online") {

                $request->validate([
                    'name'  => 'required|string',
                    'email' => 'required|email',
                    'phone_number' => 'required|string',
                    'country' => 'required|string',
                    'address' => 'required|string',
                    'city' => 'required|string',
                    'postal_code' => 'required|string',
                ]);

                $createPayway = $paywaypayment->createPayment($order);

                $payment = new Payment();

                $payment->order_id = $order->id;
                $payment->total = $total;

                $payment->save();

                $payment->load('order');

                $shipping = new Shipping();
                 
                $shipping->order_id = $order->id;
                $shipping->name = $request->name;
                $shipping->email = $request->email;
                $shipping->phone_number = $request->phone_number;
                $shipping->country = $request->country;
                $shipping->address = $request->address;
                $shipping->city = $request->city;
                $shipping->postal_code = $request->postal_code;
                
                $shipping->save();

                $payment = [
                    'payment' => $payment,
                    'createPayway' => $createPayway,
                    'shipping' => $shipping
                ];

            

                return response()->json([
                    "status" => true,
                    "data" => $payment,
                    "message" => "Order successfully!",
                ], 201);

            }

            if ($request->type_payment === 'cash') {
                $payment = new Payment();

                $payment->order_id = $order->id;
                $payment->total = $total;

                $payment->save();

                $payment->load('order');

                return response()->json([
                    "status" => true,
                    "order" => $payment,
                    "message" => "Order successfully!",
                ], 201);
            }

            $createPayway = $paywaypayment->createPayment($order);

            $payment = new Payment();

            $payment->order_id = $order->id;
            $payment->total = $total;

            $payment->save();

            $payment->load('order');

            $payment = [
                'payment' => $payment,
                'createPayway' => $createPayway
            ];

            return response()->json([
                "status" => true,
                "order" => $payment,
                "message" => "Order successfully!",
            ], 201);

        });
    }
}
