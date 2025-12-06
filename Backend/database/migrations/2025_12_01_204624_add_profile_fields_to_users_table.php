<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->text('bio')->nullable()->after('email');
            $table->string('campus')->nullable()->after('bio');
            $table->string('filiere')->nullable()->after('campus');
            $table->string('graduation_year')->nullable()->after('filiere');
            $table->string('avatar')->nullable()->after('graduation_year');
        });
    }

    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['bio', 'campus', 'filiere', 'graduation_year', 'avatar']);
        });
    }
};