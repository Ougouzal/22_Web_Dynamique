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
    Schema::create('resources', function (Blueprint $table) {
        $table->id();
        $table->string('title');
        $table->string('driveLink');
        $table->text('description')->nullable();
        $table->string('resourceType');
        $table->string('filiere')->nullable();
        $table->string('module')->nullable();
        $table->string('semester')->nullable();
        $table->string('academicYear')->nullable();
        $table->string('campus')->nullable();
        $table->integer('views')->default(0);
        $table->timestamps();
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('resources');
        // $table->dropColumn('views');
    }
};
