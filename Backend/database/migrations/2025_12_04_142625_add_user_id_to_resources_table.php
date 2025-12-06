<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
public function up(): void
{
    Schema::table('resources', function (Blueprint $table) {
        // Ajouter la colonne user_id (nullable si certaines ressources n'ont pas encore d'auteur)
        $table->foreignId('user_id')
              ->nullable()
              ->constrained('users')
              ->onDelete('cascade');
    });
}

public function down(): void
{
    Schema::table('resources', function (Blueprint $table) {
        $table->dropForeign(['user_id']);
        $table->dropColumn('user_id');
    });
}

};
