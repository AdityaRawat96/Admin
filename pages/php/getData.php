<?php
session_start();
if($_SESSION['Username']=='')
{
    session_unset();
    session_destroy();
?> <script>window.open('../index.html','_self')</script> <?php
}
else
{
    $category=$_POST['category'];
//    echo $category;
   include('connection.php');
 $roh= mysqli_select_db($con,'wtintern_wt')
    or die("Unable to connect to the database server! <br><hr width=800 style=height:1px;></hr><center><input type=button value=OK id=1 class=buttons onclick=cancelit();></center>");



    if($category==1)
    {
        $category='Web Development';
    }
    else if($category==2)
    {
        $category='Content Writing';
    }
    else if($category==3)
    {
        $category='Digital Marketing';
    }
    else if($category==4)
    {
        $category='Graphic Designing';
    }
    else if($category==5)
    {
        $category='Public Relations';
    }
    else if($category==6)
    {
        $category='Video Editor';
    }
 $result= mysqli_query($con,"select * from users where category='$category' and rights='employee'")
or die('Uppss.. an Error accured...(unable to process this request)<br>Reason : &nbsp;'. mysqli_error($con));


    if(mysqli_num_rows($result)>0)
    {

       while($row=mysqli_fetch_array($result))
       {
           $p1=$row['id'];
           $p2=$row['name'];
        echo "<option value='$p1'>$p2</option>";
       }
    }
}
?>