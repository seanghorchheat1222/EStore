<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    public function brand()
    {
        return $this->belongsTo(Brand::class, 'brand_id');
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function inventory()
    {
        return $this->hasOne(Inventory::class);
    }

    public function productSize()
    {
        return $this->hasMany(ProductSize::class);
    }

    public function productColor()
    {
        return $this->hasMany(ProductColor::class);
    }

    public function productImage()
    {
        return $this->hasMany(ProductImage::class);
    }
}
