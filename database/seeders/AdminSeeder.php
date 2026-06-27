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
                'password'          => Hash::make(env('SEED_ADMIN_PASSWORD', 'change-me-now')),
                'email_verified_at' => now(),
                'is_admin'          => true,
            ]
        );
    }
}
