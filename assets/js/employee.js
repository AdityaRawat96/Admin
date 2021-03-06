$(document).ready(function(){
  $("#uploadForm").on("submit", function(e){
    e.preventDefault();

    $.ajax({
      //  alert("registration success");
      url:"../../pages/php/upload.php",
      type:"POST",
      data: new FormData(this),   //data is retrieved through name attribute
      contentType:false,
      cache:false,
      processData:false,
      beforeSend:function()
      {

      },
      success: function(response)
      {
        if(response.match(/error/))
        {
          $('.loader').fadeOut();
          alert("Problem occured during Registration.Please try again later. Sorry for inconvenience");
        }
        else{
          $('.loader').fadeOut();
          showAlert();
        }
      }
    });
  });
});
function showAlert(){
  swal({
    title: "Done!",
    timer: 5000,
    text: "Employee added successfully!",
    buttonsStyling: false,
    confirmButtonClass: "btn btn-success",
    type: "success"
  }).then(function(){
    window.open('addEmployee.php','_self');
  });
}
