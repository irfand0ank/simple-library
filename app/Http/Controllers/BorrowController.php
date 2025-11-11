<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Borrow;
use App\Models\Member;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BorrowController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Borrows/Index', [
            'borrows' => Borrow::with(['book', 'member'])->latest()->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Borrows/Create', [
            'books' => Book::where('available_copies', '>', 0)->get(),
            'members' => Member::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $data = $request->validate([
            'book_id' => 'required|exists:books,id',
            'member_id' => 'required|exists:members,id',
            'due_date' => 'nullable|date|after_or_equal:today',
        ]);

        Borrow::create($data);
        Book::find($data['book_id'])->decrement('available_copies');

        return redirect()->route('borrows.index')->with('success', 'Borrow recorded!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Borrow $borrow)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Borrow $borrow)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    /** @var \App\Models\Borrow $borrow */

    public function update(Request $request, Borrow $borrow)
    {
        // mark as returned
        $borrow->update(['returned_at' => now()]);
        $borrow->book->increment('available_copies');

        return redirect()->route('borrows.index')->with('success', 'Book returned!');
    }

    /**
     * Remove the specified resource from storage.
     */
    /** @var \App\Models\Borrow $borrow */

    public function destroy(Borrow $borrow)
    {
        $borrow->delete();
        return redirect()->route('borrows.index');
    }
}
