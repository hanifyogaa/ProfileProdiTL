<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@proditl.ac.id'],
            [
                'name'              => 'Admin Prodi TL',
                'email'             => 'admin@proditl.ac.id',
                'password'          => Hash::make('admin123'),
                'email_verified_at' => now(),
            ]
        );
    }
}
