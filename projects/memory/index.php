<?php 
include('includes/header.html');

$dir = opendir('files');
while ($files = readdir($dir)) {
    if ($files != '.' && $files != '..') {
        $file_arr[] = $files;     
    }
}

 ?>

    <div class="container-fluid">
    <h1>Title</h1>
    <div class="col-md-8">
        <?php foreach($file_arr as $f) {
                
                echo '
                    <div class="well">
                        <a href="memory.php?file='.$f.'">'.$f.'</a>
                    </div>

                ';
                
            }

         ?>
    </div>
    <div class="col-md-4">
        <div id="sideBar">
            
        </div>
    </div>

    </div>

<?php include('includes/footer.html'); ?>