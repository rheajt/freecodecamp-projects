<?php 
$page_title = "Memory";
include 'includes/header.html';

//open the right file, validate $_GET data
$get_file = 'files/'.$_GET['file'];

$words = file($get_file, FILE_IGNORE_NEW_LINES);

foreach($words as $word) {
    $pair = explode(',', $word);
    $synonym_arr[] = array($pair[0], $pair[0]);
    $synonym_arr[] = array($pair[1], $pair[0]);
}

shuffle($synonym_arr);

 ?>
 <div class="container-fluid">
 <div class="row">
    <div class="h1 text-center">Memory Game</div>
 </div>  
 <div class="row">
     <div class="gameboard">
         
<?php 

foreach($synonym_arr as $arr) {
    echo '
        <div class="box unsolved" id="'.$arr[0].'">
            <h1>'.$arr[0].'</h1>
            <p class="key">'.$arr[1].'</p>
        </div>
    ';

}

 ?>
     </div>
 </div>    

<div class="row">
    <div class="scoreboard"></div>
</div>
</div>

<!-- End of the main container div -->
</div> 
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
    <script src="assets/memory.js"></script>
</body>
</html>