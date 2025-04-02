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
        Schema::table('Member', function (Blueprint $table) {
            //$table->foreignId('column name')->constrained('target table name', 'target column name');
            $table->foreignId('group_id')->constrained('Group', 'id');
            $table->foreignId('img_id')->constrained('ImgCollect', 'id');
        });
        Schema::table('Group', function (Blueprint $table) {
            //$table->foreignId('column name')->constrained('target table name', 'target column name');
            $table->foreignId('img_id')->constrained('ImgCollect', 'id');
        });
        Schema::table('KeyVisual', function (Blueprint $table) {
            //$table->foreignId('column name')->constrained('target table name', 'target column name');
            $table->foreignId('img_id')->constrained('ImgCollect', 'id');
            $table->foreignId('img2_id')->constrained('ImgCollect', 'id');
            $table->foreignId('group_id')->unique()->constrained('Group', 'id'); // 0 will be home
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('Member', function (Blueprint $table) {
            // {tablename}_{foreign key name}_foreign
            $table->dropForeign('member_group_id_foreign');
            $table->dropForeign('member_img_id_foreign');
        });
        Schema::table('Group', function (Blueprint $table) {
            // {tablename}_{foreign key name}_foreign
            $table->dropForeign('group_key_id_foreign');
            $table->dropForeign('group_img_id_foreign');
        });
    }
};
