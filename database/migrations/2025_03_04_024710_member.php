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
        Schema::create('Member', function (Blueprint $table) {
            $table->id();
            // img id
            // group id
            $table->string('name');
            $table->string('desc');
            $table->string('streamUrl');
            $table->string('streamPlatform');
            $table->string('socialUrl');
            $table->string('socialPlatform');
            $table->timestamp('ctime')->useCurrent();
            $table->timestamp('utime')->useCurrent()->useCurrentOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('Member');
    }
};
