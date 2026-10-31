<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');



Route::middleware(['auth:sanctum', 'can:admin'])->group(function () {

    Route::prefix('user')->group(function () {
        Route::get('/list_user', [UserController::class, 'listUser']);
    });

    Route::prefix('brand')->group(function () {
        Route::get('/list_brand', [BrandController::class, "listBrand"]);
        Route::post('/create_brand', [BrandController::class, "createBrand"]);
        Route::get('/show_brand/{id}', [BrandController::class, "showBrand"]);
        Route::put('/update_brand/{id}', [BrandController::class, "updateBrand"]);
        Route::delete('/delete_brand/{id}', [BrandController::class, "deleteBrand"]);
    });

    Route::prefix('category')->group(function () {
        Route::get('/list_category', [CategoryController::class, "listCategory"]);
        Route::post('/create_category', [CategoryController::class, "createCategory"]);
        Route::get('/show_category/{id}', [CategoryController::class, "showCategory"]);
        Route::put('/update_category/{id}', [CategoryController::class, "updateCategory"]);
        Route::delete('/delete_category/{id}', [CategoryController::class, "deleteCategory"]);
    });

    Route::prefix('product')->group(function () {
        Route::post('/create_product', [ProductController::class, "createProduct"]);
    });

});

Route::middleware('auth:sanctum')->group(function () {
    Route::prefix(('auth'))->group(function () {
        Route::get('/current_user', [AuthController::class, "currentUser"]);
        Route::post('/logout', [AuthController::class, "logout"]);
    });

    Route::prefix('user')->group(function () {
        Route::post('/reset_password', [UserController::class, 'resetPassword']);
    });

    Route::prefix('setting')->group(function () {
        Route::post('/set_setting', [SettingController::class, 'setSetting']);
    });

    Route::prefix('product')->group(function () {
        Route::get('/list_product', [ProductController::class, "listProduct"]);
    });
});

Route::prefix('user')->group(function () {
    Route::post('/request_otp', [UserController::class, 'requestOtp']);
    Route::post('/confirm_otp', [UserController::class, 'confirmOtp']);
    Route::post('/create_user', [UserController::class, 'createUser']);
});

Route::prefix('auth')->group(function () {
    Route::post("/login", [AuthController::class, "login"]);
});

