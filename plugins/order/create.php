<?php
ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

use RetailCrm\ApiClient;


function ex($arr, $die = true)
{
    echo "<pre>";
    var_dump($arr);
    echo "</pre>";
    $t = debug_backtrace();
    echo "<br>" . $t[0]['file'] . " Line:" . $t[0]['line'] . "<br>";
    if ($die !== false) {
        die('die by parameter');
    }
}



require_once __DIR__ . '/../../core/vendor/autoload.php';



function Helper_encode($content, $doubleEncode = true)
{
    return htmlspecialchars($content, ENT_QUOTES | ENT_SUBSTITUTE,   'UTF-8', $doubleEncode);
}




///service

function create($params)
{

    $source = [];

    if ($params['url']) {
        $parts = parse_url($params['url']);
        if (isset($parts['query'])){
            parse_str($parts['query'], $query);

            foreach ($query as $key => $value) {

                $lower_key = mb_strtolower($key);

                if ($lower_key === "utm_source") $source['source'] = $value;
                if ($lower_key === "utm_medium") $source['medium'] = $value;
                if ($lower_key === "utm_campaign") $source['campaign'] = $value;
                if ($lower_key === "utm_content") $source['keyword'] = $value;
                if ($lower_key === "utm_term") $source['content'] = $value;
            }
        }

    }

    $items = [];
    foreach ($params['items'] as $item) {
        $items[] = ['offer' => ['externalId' => $item]];
    }


    $client = new   ApiClient(
        'https://pride43.retailcrm.ru',
        'HE3xUIXEEupOZwbjF67e6HhaNld4b2Kh',
         ApiClient::V4,
        'trubogib-gibbon-ru'
    );

    $params = [
        'externalId' => 'order_' . time() . rand(100, 999),
        'firstName' => $params['name'],
        'phone' => $params['phone'],
        'items' => $items,
        'customFields' => ['url' => $params['url']],
    ];

    if (count($source)){
        $params['source'] = $source;
    }

    $data = $client->request->ordersCreate($params);

    return $data;


}

///controller
header('Content-Type: application/json');
$data['success'] = true;

try {

    $params = [
        'items' => isset($_REQUEST['items']) ? $_REQUEST['items'] : [],
        'name' => isset($_REQUEST['name']) ? Helper_encode($_REQUEST['name']) : '',
        'phone' => isset($_REQUEST['phone']) ? Helper_encode($_REQUEST['phone']) : '',
        'url' => isset($_REQUEST['url']) ? $_REQUEST['url'] : '',
    ];


    if (empty($params['name'])) {
        throw new Exception('name is empty');
    }
    if (empty($params['phone'])) {
        throw new Exception('phone is empty');
    }
    if (empty($params['url'])) {
        throw new Exception('url is empty');
    }

    $responce = create($params);
     ;
    if ($responce->isSuccessful() && 201 === $responce->getStatusCode()) {
        $data['message'] = 'Заказ создан №' . $responce->id;
    } else {
        throw new Exception(sprintf(
            "Error: [HTTP-code %s] %s",
            $responce->getStatusCode(),
            $responce->getErrorMsg()
        ));
    }

} catch (Exception $e) {
    $data['success'] = false;
    $data['message'] = $e->getMessage();
}

echo json_encode($data);