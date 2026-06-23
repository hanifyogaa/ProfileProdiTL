<?php

namespace App\Filament\Widgets;

use App\Models\News;
use Filament\Tables\Columns\BadgeColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget;
use Illuminate\Database\Eloquent\Builder;

class LatestNewsWidget extends TableWidget
{
    protected static ?int $sort = 2;

    protected int|string|array $columnSpan = 2;

    public function table(Table $table): Table
    {
        return $table
            ->heading('Berita Terbaru')
            ->query(
                News::where('status', 'published')
                    ->orderByDesc('published_at')
                    ->limit(5)
            )
            ->columns([
                TextColumn::make('title_id')
                    ->label('Judul')
                    ->limit(45)
                    ->searchable(),

                TextColumn::make('category')
                    ->label('Kategori')
                    ->badge()
                    ->colors([
                        'primary' => 'akademik',
                        'success' => 'kegiatan',
                        'warning' => 'pengumuman',
                        'danger'  => 'prestasi',
                    ]),

                TextColumn::make('published_at')
                    ->label('Tanggal')
                    ->dateTime('d M Y')
                    ->sortable(),

                TextColumn::make('views')
                    ->label('Views')
                    ->sortable(),
            ])
            ->paginated(false)
            ->striped();
    }
}
