<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Borrow extends Model
{
    use HasFactory;

    protected $fillable = [
        'member_id',
        'book_id',
        'borrowed_at',
        'returned_at',
        'due_date',     // 👈 add this

    ];

    /**
     * Automatically set borrowed_at when creating.
     */
    protected static function booted()
    {
        static::creating(function ($borrow) {
            if (empty($borrow->borrowed_at)) {
                $borrow->borrowed_at = now();
            }

            // 👇 Automatically set due_date to +7 days if not given
            if (empty($borrow->due_date)) {
                $borrow->due_date = now()->addDays(7);
            }
        });
    }


    public function member()
    {
        return $this->belongsTo(Member::class);
    }

    public function book()
    {
        return $this->belongsTo(Book::class);
    }
}
