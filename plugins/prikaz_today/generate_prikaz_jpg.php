<?php
header('Content-Type: text/html; charset=utf-8');
ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);




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
$path_env = dirname(__FILE__);
require_once __DIR__ . '/../../core/vendor/autoload.php';


$file = 'prikaz_template.docx';
$file_new = 'prikaz.docx';
$file_jpeg = __DIR__ . '/../../images/prikaz.jpg';




echo 'Начало<br>';

function time_add_day($num){
    return convert_time("+$num day");
}
function time_sub_day($num){
    return convert_time("-$num day");
}


function format_date(){
    return 'd.m.Y';
}
function convert_time($time){
    return strtotime($time);
}


function programToday(){
    $dates = ["action_begin" => '26.03.1991',"action_end" => '07.07.2021'];

    $date_A  = date(format_date(), time_sub_day(13));
    $today = time();
    $date_B = date(format_date(),time_add_day(1));

    $dates['action_begin'] = $date_A;
    $dates['action_end'] = $date_B;

    return $dates;
}




$dates = programToday();

$action_begin_dm = date('d.m.Y',strtotime($dates['action_begin']));

$replace_vars = [
     'action_begin' => $dates['action_begin'],
    'action_dm' => $action_begin_dm,
    'action_end' => $dates['action_end'],
    'acti1'=> $dates['action_begin'],
    'acti11'=> $dates['action_begin']
];


$file_extension = pathinfo($file)['extension'];
$file_filename = pathinfo($file)['filename'];

$file_zip = $file_filename . '.zip';

copy($file, $file_zip);

$zip = new ZipArchive;
$zip->open($file_zip);


if (($index = $zip->locateName("word/document.xml")) !== false) {

    $text = $zip->getFromIndex($index);

    $keys = array_keys($replace_vars);
    $values = array_values($replace_vars);


    $text = str_replace($keys, $values, $text);

    $zip->deleteIndex($index);


    $zip->addFromString("word/document.xml", $text);


}
$zip->close();

rename($file_zip, $file_new);

echo 'В шаблон даты добавлены<br>';

\ConvertApi\ConvertApi::setApiSecret('zF3rNO481zY4wgpQ');
$result = \ConvertApi\ConvertApi::convert('jpg', ['File' => $file_new], 'docx');
$result->getFile()->save($file_jpeg);
echo 'Запрос на конвертацию исполнен<br>';

echo 'Конец<br>';