<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('dashboard', [
        'projects' => [
            ['name' => 'EDA & Dashboard: UMR dan Pasar Kerja', 'category' => 'Analytics', 'status' => 'Direncanakan', 'progress' => 0, 'updated' => 'Roadmap · Bulan 1', 'tone' => 'blue'],
            ['name' => 'Analisis Statistik & A/B Testing', 'category' => 'Analytics', 'status' => 'Direncanakan', 'progress' => 0, 'updated' => 'Roadmap · Bulan 1', 'tone' => 'violet'],
            ['name' => 'Prediksi Churn Pelanggan', 'category' => 'Classical ML', 'status' => 'Berjalan', 'progress' => 65, 'updated' => 'Sedang dikerjakan', 'tone' => 'rose'],
            ['name' => 'Prediksi Harga Properti + API', 'category' => 'Classical ML', 'status' => 'Direncanakan', 'progress' => 0, 'updated' => 'Roadmap · Bulan 2', 'tone' => 'amber'],
            ['name' => 'Sentimen Ulasan Bahasa Indonesia', 'category' => 'NLP', 'status' => 'Berjalan', 'progress' => 45, 'updated' => 'Sedang dikerjakan', 'tone' => 'teal'],
        ],
        'totalProjects' => 12,
    ]);
});
