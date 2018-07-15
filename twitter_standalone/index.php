<?php


// Include config file and twitter PHP Library
include_once("config.php");
include_once("twitter/twitteroauth.php");

session_start();

// print_r($_SESSION);
// echo 're';


if(isset($_GET['request']))
{
		//Fresh authentication
		$connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET);
		$request_token = $connection->getRequestToken(OAUTH_CALLBACK);

		//Received token info from twitter
		$_SESSION['token'] 			= $request_token['oauth_token'];
		$_SESSION['token_secret'] 	= $request_token['oauth_token_secret'];
		$_SESSION['uid'] = $_COOKIE['uid'];
		$_SESSION['id'] = $_REQUEST['id'];

		//Any value other than 200 is failure, so continue only if http code is 200
		if($connection->http_code == '200')
		{
		//redirect user to twitter
		$twitter_url = $connection->getAuthorizeURL($request_token['oauth_token']);
		?>
		<script>
		window.location.href ="<?php echo $twitter_url; ?>";
		</script>
		<?php
		// header('Location: ' . $twitter_url);
		die();
		}else{
		die("error connecting to twitter! try again later!");
		}
}


?>

<?php
	if(isset($_REQUEST['oauth_token']) && $_SESSION['token'] == $_REQUEST['oauth_token']){

			$connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, $_SESSION['token'] , $_SESSION['token_secret']);
			$access_token = $connection->getAccessToken($_REQUEST['oauth_verifier']);
			// print_r($access_token);
			// die();
			if($connection->http_code == '200')
			{
				
				//die( $access_token['oauth_token'] . "we're here" . $_SESSION['id'] . "-" . $access_token['oauth_token_secret']);

				$user_data = $connection->get('account/verify_credentials');
				
				file_put_contents('store.txt', 'id:' . $_SESSION['id'] . ':::user_handle:' . $user_data['screen_name'] . ':::follows:' . $user_data['friends_count'] .PHP_EOL, FILE_APPEND);
				
				if (file_get_contents('http://skochvoting.tk/b/uAuth/user/follow_twitter_multiple' . '/' . $access_token['oauth_token'] . '/' . $access_token['oauth_token_secret']) == 'ok'){
					
						echo '<h1>Form submitted successfully <a href="//skoch.in">Click here</a> to go to home website.<h1>							<script>							window.setTimeout(function(){	window.location = "http://skoch.in";							}, 3000);							</script>';
						
						//header('Location: http://skochvoting.tk/user/signin/redirect.html?twitter=true&voting_id=' . $_SESSION['voting_id']);
						die();
				}
die('were hhere');
				$user_data = $connection->get('account/verify_credentials');
				$result = '<h1>Twiiter Profile Details </h1>';
				$result .= '<img src="'.$user_data['profile_image_url'].'">';
				$result .= '<br/>Twiiter ID : ' . $user_data['id'];
				$result .= '<br/>Name : ' . $user_data['name'];
				$result .= '<br/>Twiiter Handle : ' . $user_data['screen_name'];
				$result .= '<br/>Follower : ' . $user_data['followers_count'];
				$result .= '<br/>Follows : ' . $user_data['friends_count'];
				$result .= '<br/>Logout from <a href="logout.php?logout">Twiiter</a>';
                echo '<div>'.$result.'</div>';
			
			
			}else{
			       die("error, try again later!");
			}
			
			

	}else{
		//Display login button
		echo '<a id="signIn" href="index.php?request=twitter&id=' . $_REQUEST['id'] . '"><img src="image/login_button.jpg"></a>';
	}
?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>Login with Twitter</title>

</head>
<body>
	<script type="text/javascript">
		window.onload = function(){
			document.getElementById("signIn").click();
		}
		
	</script>
</body>
</html>
