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
        Schema::create('KeyVisual', function (Blueprint $table) {
            $table->id();
            // img id 背景
            // img2 id 前のキャラクター
            // group id, 0 will be home key visual
            $table->timestamp('ctime')->useCurrent();
            $table->timestamp('utime')->useCurrent()->useCurrentOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('KeyVisual');
    }
};
