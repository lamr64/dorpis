<?php

$token = "8543757769:AAGZhW-1zXsmyVXw0lW9tW2BT4hPs_EK6Xc";
$chat_id = "381660343";

$name = $_POST['name'];
$phone = $_POST['phone'];
$message = $_POST['message'];

$text = "📩 Новая заявка с сайта\n\n";
$text .= "👤 Имя: $name\n";
$text .= "📞 Телефон: $phone\n";
$text .= "💬 Сообщение: $message\n";

$url = "https://api.telegram.org/bot$token/sendMessage";

$data = [
    'chat_id' => $chat_id,
    'text' => $text
];

$options = [
    'http' => [
        'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
        'method'  => 'POST',
        'content' => http_build_query($data),
    ],
];

$context  = stream_context_create($options);
$result = file_get_contents($url, false, $context);

echo "ok";

?>