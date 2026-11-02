<?php

namespace App\Services;

use App\Models\Order;
use Illuminate\Support\Facades\Http;

class PaywayPaymentService
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function createPayment(Order $order)
    {
        $reqTime = now('UTC')->format('YmdHis');

        $amount = number_format($order->total, 2, '.', '');

        $merchantId = env('PAYWAY_MERCHANT_ID');
        $apiKey = env('PAYWAY_API_KEY');

        $paymentOption = env(
            'PAYWAY_PAYMENT_OPTION',
            'abapay_khqr'
        );

        $currency = env(
            'PAYWAY_CURRENCY',
            'USD'
        );

        $lifetime = env(
            'PAYWAY_QR_LIFETIME_MINUTES',
            10
        );

        $callbackUrl = base64_encode(
            env('PAYWAY_CALLBACK_URL')
        );

        $items = base64_encode(
            json_encode([])
        );

        $tranId = 'ORDER-' . $order->id;

        $hashData =
            $reqTime .
            $merchantId .
            $tranId .
            $amount .
            $items .
            '' .
            '' .
            '' .
            '' .
            'purchase' .
            $paymentOption .
            $callbackUrl .
            $currency .
            $tranId .
            $lifetime .
            'template1_color';

        $hash = base64_encode(
            hash_hmac(
                'sha512',
                $hashData,
                $apiKey,
                true
            )
        );


        $response = Http::acceptJson()
            ->asJson()
            ->post(
                env('PAYWAY_BASE_URL') .
                '/api/payment-gateway/v1/payments/generate-qr',
                [
                    'req_time' => $reqTime,
                    'merchant_id' => $merchantId,
                    'tran_id' => $tranId,

                    'first_name' => '',
                    'last_name' => '',
                    'email' => '',
                    'phone' => '',

                    'amount' => $amount,

                    'purchase_type' => 'purchase',
                    'payment_option' => $paymentOption,
                    'items' => $items,
                    'currency' => $currency,

                    'callback_url' => $callbackUrl,
                    'return_params' => $tranId,

                    'lifetime' => $lifetime,
                    'qr_image_template' => 'template1_color',

                    'hash' => $hash,
                ]
            );

        return $response->json();
    }


}
