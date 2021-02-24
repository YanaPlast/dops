<?php

include($_SERVER['DOCUMENT_ROOT'] . '/php/phpmailer/classes/class.phpmailer.php');
include($_SERVER['DOCUMENT_ROOT'] . '/php/phpmailer/classes/class.smtp.php');
include($_SERVER['DOCUMENT_ROOT'] . '/scripts/settings.php');

if ( empty($_POST['request_info'][0]) || empty( $_POST['request_info'][1])  ){
	echo "address does not set";
	exit();	
}

$file = $_FILES['myfile'];

$mail = new PHPMailer();
$mail->isSMTP(); 
$mail->Host = "smtp.mail.ru"; 
$mail->SMTPAuth = true; 
$mail->SMTPDebug = 2;
$mail->Username = $accountLogin;
$mail->Password = $accountPass;
$mail->SMTPSecure = "ssl"; 
$mail->Port = 465;
$mail->setFrom($fullEmail);
$mail->addAddress('sm@trubogib-gibbon.ru');
// $mail->addAddress('gertruda91@mail.ru');
$mail->isHTML(true); 
$mail->CharSet = "utf-8";
$mail->Subject = "Новый отзыв на сайте";



$mail->Body = "
<table cellpadding=0 cellspacing=0 border=0 style='color:#000000; text-align:left;'>
<tr>
<td>Новый отзыв на сайте</td>
</tr>
<tr>
<td>Телефон клиента, оставившего отзыв   ".$_POST['request_info'][1]."</td>
</tr>
<tr>
<td>Текст отзыва:   ".$_POST['request_info'][0]."<br /></td>
</tr>
<tr>
<td>Прикрепленные фотографии:<br /></td>
</tr>
</table> ";

// if (!empty($file['name'][0])) {
//     for ($ct = 0; $ct < count($file['tmp_name']); $ct++) {
//         $filePath = __DIR__ . "/files/" . $file['name'][$ct]); 
//         $filename = $file['name'][$ct];
//         $mail->addAttachment($filePath, $filename);
//     }   
// } 


if (!empty($_FILES['image']['tmp_name'])) {
    //путь загрузки файла
    $filePath = __DIR__ . "/files/" . $_FILES['image']['name']; 
    //грузим файл
    if (copy($_FILES['image']['tmp_name'], $filePath)){
        $fileAttach = $filePath;
        $body.='<p><strong>Фото в приложении</strong>';
        $mail->addAttachment($fileAttach);
    }
}


if ( !$mail->Send() )
{
	echo "message could not be send";
	exit();	
}

echo 'good';

?>