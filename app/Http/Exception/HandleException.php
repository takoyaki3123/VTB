<?php
    namespace App\Http\Exception;

    use Illuminate\Contracts\Support\Responsable;
use Illuminate\Support\Facades\Log;

    class HandleException implements Responsable {
        protected int $httpCode;
        protected array|string $data;
        protected string $errorMsg;

        public function __construct(int $httpCode, array|string $data, string $errorMsg)
        {
            $this->httpCode = $httpCode;
            $this->data = $data;
            $this->errorMsg = $errorMsg;
        }
        public function toResponse($request)
        {
            $payload = match (true) {
                $this->httpCode >= 500 => ['errorMsg' => 'server error!'],
                $this->httpCode >= 400 => ['errorMsg' => $this->errorMsg],
                $this->httpCode >= 200 => $this->data,
            };
            Log::debug("my response payload: ". json_encode($payload));
            return response()->json(
                data: $payload,
                status: $this->httpCode,
                options: JSON_UNESCAPED_UNICODE,
            );
        }
    }
