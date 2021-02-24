<?php

include($_SERVER['DOCUMENT_ROOT'] . '/php/phpmailer/classes/class.phpmailer.php');
include($_SERVER['DOCUMENT_ROOT'] . '/php/phpmailer/classes/class.smtp.php');
include($_SERVER['DOCUMENT_ROOT'] . '/scripts/settings.php');

if (!isset($_POST['info'][0]) || empty( $_POST['info'][0] )){
	echo "address does not set";
	exit();	
}

$mail1 = new PHPMailer();
$mail1->isSMTP(); 
$mail1->Host = "smtp.mail.ru"; 
$mail1->SMTPAuth = true; 
$mail1->Username = $accountLogin;
$mail1->Password = $accountPass;
$mail1->SMTPSecure = "ssl"; 
$mail1->Port = 465;
$mail1->setFrom($fullEmail);
//$mail1->addAddress('sm@trubogib-gibbon.ru');
$mail->addAddress('gertruda91@mail.ru');
$mail1->isHTML(true); 
$mail1->CharSet = "utf-8";
$mail1->Subject = "На сайте заполнен тест";

$mail1->Body = "
<table cellpadding=0 cellspacing=0 border=0 style='color:#000000; text-align:left;'>
<tr>
<td><b>На сайте запрошена отправка книги!</b><br /><br /></td>
</tr>
<tr>
<td>Почта заполнившего: ".$_POST['info'][0]."</td>
</tr>
</table>";

if ( !$mail1->Send() )
{
	echo "message1 could not be send";
	exit();	
}



$mail2 = new PHPMailer();
$mail2->isSMTP(); 
$mail2->Host = "smtp.mail.ru"; 
$mail2->SMTPAuth = true; 
$mail2->Username = $accountLogin;
$mail2->Password = $accountPass;
$mail2->SMTPSecure = "ssl"; 
$mail2->Port = 465;
$mail2->setFrom($fullEmail);
$mail2->addAddress($_POST['info'][0]);
$mail2->isHTML(true); 
$mail2->CharSet = "utf-8";
$mail2->Subject = "Электронная книга 'Советы мудрого Гиббона' с чертежами и рекомендациями";

$mail2->Body = "
<table cellpadding=0 cellspacing=0 border=0 style='max-width:700px; font-size: 14px; line-height: 16px; color:#000000; text-align:left;'>
<tr>
<td>Здравствуйте!<br /><br /></td>
</tr>".$body_text."</table>";

if ( !$mail2->Send() )
{
	echo "message2 could not be send";
	exit();	
}

echo 'good';

?>