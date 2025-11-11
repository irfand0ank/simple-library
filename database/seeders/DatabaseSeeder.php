<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Book;
use Illuminate\Database\Seeder;
use App\Models\Borrow;
use App\Models\Member;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Get all existing books and members from the database
        $books = Book::factory(20)->create();
        $members = Member::factory(10)->create();

        // Each member borrows random books
        $members->each(function ($member) use ($books) {
            Borrow::factory(3)->create([
                'member_id' => $member->id,
                'book_id' => $books->random()->id,
            ]);
        });
    }
}
