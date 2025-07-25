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
        Schema::create('ImgCollect', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // not contain path
            $table->string('size'); // maybe kb
            $table->string('type'); // png jpg jpeg...
            $table->dateTime('ctime')->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ImgCollect');
    }
};
