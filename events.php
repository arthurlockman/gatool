<?php 
if ($_GET['year']) {
	$year = $_GET['year'];
}
else
{
	$year = 2016;
}

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://frc-api.firstinspires.org/v2.0/{$year}/events");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
curl_setopt($ch, CURLOPT_HEADER, FALSE);

curl_setopt($ch, CURLOPT_HTTPHEADER, array(
  "Authorization:Basic bG9ja2phdzh5OTpGNkQ5NDJBMS1FQjlDLTRCRUYtQjQyNC01MkMxMTNCRkYyOTA=",
));

$response = curl_exec($ch);
curl_close($ch);
$events = json_decode($response, true); //true option forces the creation of associative arrays.
//$events = json_decode($response); //true option forces the creation of associative arrays.

$output = $events['Events'];
echo json_encode($output); ?>