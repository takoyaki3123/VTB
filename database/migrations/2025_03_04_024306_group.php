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
        Schema::create('Group', function (Blueprint $table) {
            $table->id();
            // img id リストで出る画像
            $table->string('name');
            $table->text('desc');
            $table->string('link')->nullable();
            $table->string('apply_user')->nullable();
            $table->string('status')->default('0');
            $table->text('rejectReason')->nullable();
            $table->dateTime('ctime')->useCurrent();
            $table->dateTime('utime')->useCurrent()->useCurrentOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('Group');
    }
};
