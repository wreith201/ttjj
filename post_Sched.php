<?php

//echo 'Current PHP version: ' . phpinfo();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $json = $_POST['post_Sched_jstringed'];
    print_r($_POST);

    $file = fopen('post_Sched.json','w+');
    fwrite($file, json_encode($json)); // The object is automatically deserialized, so if you want it as json, it has to be serialized again
    fclose($file);

}

?>