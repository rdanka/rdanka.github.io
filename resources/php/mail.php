<?php
function isEmail($email){
if(preg_match("/^(\w+((-\w+)|(\w.\w+))*)\@(\w+((\.|-)\w+)*\.\w+$)/",$email)){
return true;
}
else {
return false;
}
}
 
if( isEmail($_POST['email']) ) {
$name = $_POST['name'];
$email = $_POST['email'];
$comment = $_POST['comment'] . "\r\n\r\n-- \r\n$name";
$datetime = date("Y-m-d H:i:s");
$your_email = 'FILL IN YOUR EMAIL';
$subject = 'Comment from HTML-form: ' . substr($comment, 0, 15) . '...';
}
if( mail ($your_email, $subject, $comment, "From: $email")){
header("Location: index.html"); //Here, you can replace contact.html with another page that will say "Thank you for your feedback or something like that.
}
else {
echo "Something messed up! I'm sorry! =( <br> Here are the data you sent to this page. Send it to me in an email at $your_email, and I'll answer you. =)<br><br>Name: $name<br>E-mail: $email<br>Comment:<br>$comment";
}
