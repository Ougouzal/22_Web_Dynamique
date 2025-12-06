<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            if (!Schema::hasColumn('users', 'bio')) {
                $table->text('bio')->nullable()->after('email');
            }
            if (!Schema::hasColumn('users', 'campus')) {
                $table->string('campus')->nullable()->after('bio');
            }
            if (!Schema::hasColumn('users', 'filiere')) {
                $table->string('filiere')->nullable()->after('campus');
            }
            if (!Schema::hasColumn('users', 'graduation_year')) {
                $table->string('graduation_year', 4)->nullable()->after('filiere');
            }
            if (!Schema::hasColumn('users', 'avatar')) {
                $table->string('avatar')->nullable()->after('graduation_year');
            }
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['bio', 'campus', 'filiere', 'graduation_year', 'avatar']);
        });
    }
};