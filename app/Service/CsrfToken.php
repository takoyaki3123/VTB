<?php
    namespace App\Services;

    class CsrfToken {
        public function generate ():string {
            return csrf_token();
        }
    }
