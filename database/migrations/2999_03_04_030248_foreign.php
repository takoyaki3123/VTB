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
            $table->foreignId('group_id')->constrained('Group', 'id', 'member_group_id_foreign');
            $table->foreignId('img_id')->constrained('ImgCollect', 'id', 'member_img_id_foreign');
            $table->foreignId('apply_user')->nullable()->constrained('users', 'id', 'member_apply_user_foreign');
        });
        Schema::table('events', function (Blueprint $table) {
            //$table->foreignId('column name')->constrained('target table name', 'target column name');
            $table->foreignId('group_id')->constrained('Group', 'id', 'event_group_id_foreign');
            $table->foreignId('promotion_img_id')->constrained('ImgCollect', 'id', 'event_promotion_img_id_foreign');
            $table->foreignId('apply_user')->nullable()->constrained('users', 'id', 'event_apply_user_foreign');
        });
        Schema::table('Group', function (Blueprint $table) {
            $table->foreignId('img_id')->constrained('ImgCollect', 'id', 'group_img_id_foreign');
            $table->foreignId('apply_user')->nullable()->constrained('users', 'id', 'group_apply_user_foreign');
        });
        Schema::table('KeyVisual', function (Blueprint $table) {
            //$table->foreignId('column name')->constrained('target table name', 'target column name');
            $table->foreignId('background_img_id')->constrained('ImgCollect', 'id', 'keyvisual_background_img_id_foreign'); //背景
            $table->foreignId('character_img_id')->constrained('ImgCollect', 'id', 'keyvisual_character_img_id_foreign');//背景前のキャラ
            $table->foreignId('group_id')->unique()->constrained('Group', 'id', 'keyvisual_group_id_foreign'); // 0 will be home
        });
        Schema::table('Home', function (Blueprint $table) {
            $table->foreignId('background')->constrained('ImgCollect', 'id', 'home_background_foreign');
            $table->foreignId('character')->nullable()->constrained('ImgCollect', 'id', 'home_character_foreign');
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
            $table->dropForeign('member_apply_user_foreign');
        });
        Schema::table('events', function (Blueprint $table) {
            // {tablename}_{foreign key name}_foreign
            $table->dropForeign('event_group_id_foreign');
            $table->dropForeign('event_promotion_img_id_foreign');
            $table->dropForeign('event_apply_user_foreign');
        });
        Schema::table('Group', function (Blueprint $table) {
            // {tablename}_{foreign key name}_foreign
            $table->dropForeign('group_img_id_foreign');
            $table->dropForeign('group_apply_user_foreign');
        });
        Schema::table('KeyVisual', function (Blueprint $table) {
            // {tablename}_{foreign key name}_foreign
            $table->dropForeign('keyvisual_group_id_foreign');
            $table->dropForeign('keyvisual_character_img_id_foreign');
            $table->dropForeign('keyvisual_background_img_id_foreign');
        });
        Schema::table('Home', function (Blueprint $table) {
            $table->dropForeign('home_background_foreign');
            $table->dropForeign('home_character_foreign');
        });
    }
};
