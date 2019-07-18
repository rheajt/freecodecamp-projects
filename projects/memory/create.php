<?php 
$page_title = "Create your own";
include('includes/header.html');

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    // validate the data
    include 'mem_connect.php';

    $errors = array();
    if(isset($_POST['creator_email']) && filter_var($_POST['creator_email'], FILTER_VALIDATE_EMAIL)) {
        $creator_email = $mysqli->real_escape_string(trim($_POST['creator_email']));
    } else {
        $errors[] = 'You did not enter a valid email';
    }

    if(isset($_POST['game_name'])) {
        $game_name = $mysqli->real_escape_string(trim($_POST['game_name']));
    } else {
        $errors[] = 'You did not enter a game name';
    }

    if(isset($_POST['file_contents'])) {
        $file_contents = $mysqli->real_escape_string(trim($_POST['file_contents']));
        $user = explode('@', $creator_email);
        $gn = str_replace(' ', '_', $game_name);
        $file_name = 'files/'.$user[0].'_'.$gn.'.csv';
        $file = fopen($file_name, 'w');
        fwrite($file, $file_contents);
        fclose($file);
    } else {
        $errors[] = 'You did not create a game';
    }

    if(empty($errors)) {
        $q = "INSERT INTO games (creator_email, game_name, file_name, date_created) VALUES (?,?,?,NOW())";
        if($stmt = $mysqli->prepare($q)) {
            $stmt->bind_param("sss", $creator_email, $game_name, $file_name);
            $stmt->execute();

        } else {
            $errors[] = "mysql error: ".$stmt->error;
        }
        
    }
}



 ?>
<div class="container-fluid">
    <div class="errors">
        <?php 
        if(!empty($errors)){

            foreach($errors as $e) {
                echo '<p>'.$e.'</p>';
            }   
        } ?>
    </div>
    <div>
        <form action="" method="post">
            <input type="text" name="creator_email">
            <input type="text" name="game_name">
            <textarea type="text" name="file_contents"></textarea>
            <input class="btn btn-primary" type="submit" name="submit">
        </form>
    </div>
</div>



<?php 

$js_file = 'assets/create.js';
include('includes/footer.html'); 
?>