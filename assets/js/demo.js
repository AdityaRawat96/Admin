"use strict";


$().ready(function(){
  $sidebar = $('.sidebar');
  var $sidebar_img_container = $sidebar.find('.sidebar-background');

  var $full_page = $('.full-page');

  var $sidebar_responsive = $('body > .navbar-collapse');

  var window_width = $(window).width();

  var fixed_plugin_open = $('.sidebar .sidebar-wrapper .nav li.active a p').html();

  if( window_width > 767 && fixed_plugin_open == 'Dashboard' ){
    if($('.fixed-plugin .dropdown').hasClass('show-dropdown')){
      $('.fixed-plugin .dropdown').addClass('open');
    }

  }

  $('.fixed-plugin a').click(function(event){

    // Alex if we click on switch, stop propagation of the event, so the dropdown will not be hide, otherwise we set the  section active
    if($(this).hasClass('switch-trigger')){
      if(event.stopPropagation){
        event.stopPropagation();
      }
      else if(window.event){
        window.event.cancelBubble = true;
      }
    }
  });

  $('.fixed-plugin .active-color span').click(function(){


    var $topbar_background = $('.navbar');

    var new_color = $(this).data('color');

    $topbar_background.attr('data-topbar-color',new_color);

    /*
    $full_page_background = $('.full-page-background');

    $(this).siblings().removeClass('active');
    $(this).addClass('active');

    var new_color = $(this).data('color');

    if($sidebar.length != 0){
    $sidebar.attr('data-active-color',new_color);
  }

  if($full_page.length != 0){
  $full_page.attr('filter-color',new_color);
}

if($sidebar_responsive.length != 0){
$sidebar_responsive.attr('data-color',new_color);
}

*/
});

$('.fixed-plugin .background-color span').click(function(){
  $(this).siblings().removeClass('active');
  $(this).addClass('active');

  var new_color = $(this).data('color');

  if($sidebar.length != 0){
    $sidebar.attr('data-background-color',new_color);
  }
});

$('.fixed-plugin .img-holder').click(function(){
  $full_page_background = $('.full-page-background');

  $(this).parent('li').siblings().removeClass('active');
  $(this).parent('li').addClass('active');


  var new_image = $(this).find("img").attr('src');

  if( $sidebar_img_container.length !=0 && $('.switch-sidebar-image input:checked').length != 0 ){
    $sidebar_img_container.fadeOut('fast', function(){
      $sidebar_img_container.css('background-image','url("' + new_image + '")');
      $sidebar_img_container.fadeIn('fast');
    });
  }

  if($full_page_background.length != 0 && $('.switch-sidebar-image input:checked').length != 0 ) {
    var new_image_full_page = $('.fixed-plugin li.active .img-holder').find('img').data('src');

    $full_page_background.fadeOut('fast', function(){
      $full_page_background.css('background-image','url("' + new_image_full_page + '")');
      $full_page_background.fadeIn('fast');
    });
  }

  if( $('.switch-sidebar-image input:checked').length == 0 ){
    var new_image = $('.fixed-plugin li.active .img-holder').find("img").attr('src');
    var new_image_full_page = $('.fixed-plugin li.active .img-holder').find('img').data('src');

    $sidebar_img_container.css('background-image','url("' + new_image + '")');
    $full_page_background.css('background-image','url("' + new_image_full_page + '")');
  }

  if($sidebar_responsive.length != 0){
    $sidebar_responsive.css('background-image','url("' + new_image + '")');
  }
});

$('.switch-sidebar-image input').change(function(){

  var $full_page_background = $('.full-page-background');

  var $input = $(this);
  var background_image;

  if($input.is(':checked')){
    if($sidebar_img_container.length != 0){
      $sidebar_img_container.fadeIn('fast');
      $sidebar.attr('data-image','#');
    }

    if($full_page_background.length != 0){
      $full_page_background.fadeIn('fast');
      $full_page.attr('data-image','#');
    }

    background_image = true;
  } else {
    if($sidebar_img_container.length != 0){
      $sidebar.removeAttr('data-image');
      $sidebar_img_container.fadeOut('fast');
    }

    if($full_page_background.length != 0){
      $full_page.removeAttr('data-image','#');
      $full_page_background.fadeOut('fast');
    }

    background_image = false;
  }
});

$('.switch-sidebar-mini input').change(function(){
  var $body = $('body');

  var $input = $(this);

  if(md.misc.sidebar_mini_active == true){
    $('body').removeClass('sidebar-mini');
    md.misc.sidebar_mini_active = false;

    if(!($('body').hasClass('compact-menu') || $('body').hasClass('horizontal-menu'))) {
      $('.sidebar .sidebar-wrapper, .main-panel').perfectScrollbar();
    }

  }else{

    $('.sidebar .collapse').collapse('hide').on('hidden.bs.collapse',function(){
      $(this).css('height','auto');
    });

    $('.sidebar .sidebar-wrapper, .main-panel').perfectScrollbar('destroy');

    setTimeout(function(){
      $('body').addClass('sidebar-mini');

      $('.sidebar .collapse').css('height','auto');
      md.misc.sidebar_mini_active = true;
    },300);
  }

  // we simulate the window Resize so the charts will get updated in realtime.
  var simulateWindowResize = setInterval(function(){
    window.dispatchEvent(new Event('resize'));
  },180);

  // we stop the simulation of Window Resize after the animations are completed
  setTimeout(function(){
    clearInterval(simulateWindowResize);
  },1000);

});




});


var demo = {
  initPickColor: function(){
    $('.pick-class-label').on('click',function(){
      var new_class = $(this).attr('new-class');
      var old_class = $('#display-buttons').attr('data-class');
      var display_div = $('#display-buttons');
      if(display_div.length) {
        var display_buttons = display_div.find('.btn');
        display_buttons.removeClass(old_class);
        display_buttons.addClass(new_class);
        display_div.attr('data-class', new_class);
      }
    });
  },

  checkFullPageBackgroundImage: function(){
    var $page = $('.full-page');
    var image_src = $page.data('image');

    if(image_src !== undefined){
      var image_container = '<div class="full-page-background" style="background-image: url(' + image_src + ') "/>'
      $page.append(image_container);
    }
  },

  initDocExtendedDatetimepickers: function(){
    $('.datetimepicker').datetimepicker({
      icons: {
        time: "fa fa-clock-o",
        date: "fa fa-calendar",
        up: "fa fa-chevron-up",
        down: "fa fa-chevron-down",
        previous: 'fa fa-chevron-left',
        next: 'fa fa-chevron-right',
        today: 'fa fa-screenshot',
        clear: 'fa fa-trash',
        close: 'fa fa-remove',
        inline: true
      }
    });
  },

  initFormExtendedDatetimepickers: function(){
    $('.datetimepicker').datetimepicker({
      icons: {
        time: "fa fa-clock-o",
        date: "fa fa-calendar",
        up: "fa fa-chevron-up",
        down: "fa fa-chevron-down",
        previous: 'fa fa-chevron-left',
        next: 'fa fa-chevron-right',
        today: 'fa fa-screenshot',
        clear: 'fa fa-trash',
        close: 'fa fa-remove',
        inline: true
      }
    });

    $('.datepicker').datetimepicker({
      format: 'MM/DD/YYYY',
      icons: {
        time: "fa fa-clock-o",
        date: "fa fa-calendar",
        up: "fa fa-chevron-up",
        down: "fa fa-chevron-down",
        previous: 'fa fa-chevron-left',
        next: 'fa fa-chevron-right',
        today: 'fa fa-screenshot',
        clear: 'fa fa-trash',
        close: 'fa fa-remove',
        inline: true
      }
    });

    $('.timepicker').datetimepicker({
      //          format: 'H:mm',    // use this format if you want the 24hours timepicker
      format: 'h:mm A',    //use this format if you want the 12hours timpiecker with AM/PM toggle
      icons: {
        time: "fa fa-clock-o",
        date: "fa fa-calendar",
        up: "fa fa-chevron-up",
        down: "fa fa-chevron-down",
        previous: 'fa fa-chevron-left',
        next: 'fa fa-chevron-right',
        today: 'fa fa-screenshot',
        clear: 'fa fa-trash',
        close: 'fa fa-remove',
        inline: true

      }
    });
  },

  initMaterialWizard: function(){
    // Code for the Validator
    var $validator = $('.wizard-card form').validate({
      rules: {
        firstname: {
          required: true,
          minlength: 3
        },
        lastname: {
          required: true,
          minlength: 3
        },
        phone: {
          required: true,
          minlength: 10
        },
        email: {
          required: true,
          minlength: 3
        },
        userImage:{
          required: true
        },
        jobb:{
          required:true
        }
      },

      errorPlacement: function(error, element) {
        if($(element).attr('name')=="userImage"){
          $('#picError').css('display','inline-block');
        }
        else if($(element).attr('name')=="jobb"){
          $('#skillError').css('display','inline-block');
        }
        else{
          $(element).parent('div').addClass('has-error');
        }
      }
    });

    // Wizard Initialization
    $('.wizard-card').bootstrapWizard({
      'tabClass': 'nav nav-pills',
      'nextSelector': '.btn-next',
      'previousSelector': '.btn-previous',

      onNext: function(tab, navigation, index) {
        var $valid = $('.wizard-card form').valid();
        if(!$valid) {
          $validator.focusInvalid();
          return false;
        }
      },

      onInit : function(tab, navigation, index){

        //check number of tabs and fill the entire row
        var $total = navigation.find('li').length;
        var $width = 100/$total;
        var $wizard = navigation.closest('.wizard-card');

        var $display_width = $(document).width();

        if($display_width < 600 && $total > 3){
          $width = 100/$total;
        }

        navigation.find('li').css('width',$width + '%');
        var $first_li = navigation.find('li:first-child a').html();
        var $moving_div = $('<div class="moving-tab">' + $first_li + '</div>');
        $('.wizard-card .wizard-navigation').append($moving_div);
        refreshAnimation($wizard, index);
        $('.moving-tab').css('transition','transform 0s');
      },

      onTabClick : function(tab, navigation, index){
        var $valid = $('.wizard-card form').valid();

        if(!$valid){
          return false;
        } else{
          return true;
        }
      },

      onTabShow: function(tab, navigation, index) {
        var $total = navigation.find('li').length;
        var $current = index+1;

        var $wizard = navigation.closest('.wizard-card');

        // If it's the last tab then hide the last button and show the finish instead
        if($current >= $total) {
          confirmResult();
          $($wizard).find('.btn-next').hide();
          $($wizard).find('.btn-finish').show();
        } else {
          $($wizard).find('.btn-next').show();
          $($wizard).find('.btn-finish').hide();
        }

        var button_text = navigation.find('li:nth-child(' + $current + ') a').html();

        setTimeout(function(){
          $('.moving-tab').text(button_text);
        }, 150);

        var checkbox = $('.footer-checkbox');

        if( !index == 0 ){
          $(checkbox).css({
            'opacity':'0',
            'visibility':'hidden',
            'position':'absolute'
          });
        } else {
          $(checkbox).css({
            'opacity':'1',
            'visibility':'visible'
          });
        }

        refreshAnimation($wizard, index);
      }
    });


    // Prepare the preview for profile picture
    $("#wizard-picture").change(function(){
      readURL(this);
    });

    $('[data-toggle="wizard-radio"]').on('click',function(){
      wizard = $(this).closest('.wizard-card');
      wizard.find('[data-toggle="wizard-radio"]').removeClass('active');
      $(this).addClass('active');
      $(wizard).find('[type="radio"]').removeAttr('checked');
      $(this).find('[type="radio"]').attr('checked','true');
    });

    $('[data-toggle="wizard-checkbox"]').on('click',function(){
      $('#checkboxGD').removeAttr("checked");
      $('#checkboxCW').removeAttr("checked");
      $('#checkboxWD').removeAttr("checked");
      $('#checkboxDM').removeAttr("checked");
      $('#checkboxVE').removeAttr("checked");
      $('#checkboxPR').removeAttr("checked");
      $('#checkboxDivGD').removeClass("active");
      $('#checkboxDivCW').removeClass("active");
      $('#checkboxDivWD').removeClass("active");
      $('#checkboxDivDM').removeClass("active");
      $('#checkboxDivVE').removeClass("active");
      $('#checkboxDivPR').removeClass("active");
      $(this).addClass('active');
      $(this).find('[type="checkbox"]').attr('checked','true');
    });

    $('.set-full-height').css('height', 'auto');

    //Function to show image before upload
    var reader;
    function readURL(input) {
      if (input.files && input.files[0]) {
        reader = new FileReader();

        reader.onload = function (e) {
          $('#image-3').croppie('destroy');
          $('#image-3').attr('src', e.target.result);
          $('#imageModal').trigger('click');
          $('#image-3').croppie({
            enableExif: true,
            viewport: {
              width: 200,
              height: 200,
              type: 'circle'
            },
            boundary: {
              width: 300,
              height: 300
            }
          });
          setTimeout(loadCroppie,200);
        }
      }
      reader.readAsDataURL(input.files[0]);
    }

    function refreshAnimation($wizard, index){
      var total_steps = $wizard.find('li').length;
      var move_distance = $wizard.width() / total_steps;
      var step_width = move_distance;
      move_distance *= index;

      var $current = index + 1;

      if($current == 1){
        move_distance -= 8;
      } else if($current == total_steps){
        move_distance += 8;
      }

      $wizard.find('.moving-tab').css('width', step_width);
      $('.moving-tab').css({
        'transform':'translate3d(' + move_distance + 'px, 0, 0)',
        'transition': 'all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)'

      });
    }
  },


  showSwal: function(type){

    if(type == 'basic'){
      swal({
        title: "Here's a message!",
        buttonsStyling: false,
        confirmButtonClass: "btn btn-success"
      });

    }else if(type == 'title-and-text'){
      swal({
        title: "Here's a message!",
        text: "It's pretty, isn't it?",
        buttonsStyling: false,
        confirmButtonClass: "btn btn-info"
      });

    }else if(type == 'success-message'){
      swal({
        title: "Good job!",
        text: "You clicked the button!",
        buttonsStyling: false,
        confirmButtonClass: "btn btn-success",
        type: "success"
      });

    }else if(type == 'warning-message-and-confirmation'){
      swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        confirmButtonText: 'Yes, delete it!',
        buttonsStyling: false
      }).then(function() {
        swal({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          type: 'success',
          confirmButtonClass: "btn btn-success",
          buttonsStyling: false
        })
      });
    }else if(type == 'warning-message-and-cancel'){
      swal({
        title: 'Are you sure?',
        text: 'You will not be able to recover this imaginary file!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it',
        confirmButtonClass: "btn btn-success",
        cancelButtonClass: "btn btn-danger",
        buttonsStyling: false
      }).then(function() {
        swal({
          title: 'Deleted!',
          text: 'Your imaginary file has been deleted.',
          type: 'success',
          confirmButtonClass: "btn btn-success",
          buttonsStyling: false
        })
      }, function(dismiss) {
        // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
        if (dismiss === 'cancel') {
          swal({
            title: 'Cancelled',
            text: 'Your imaginary file is safe :)',
            type: 'error',
            confirmButtonClass: "btn btn-info",
            buttonsStyling: false
          })
        }
      })

    }else if(type == 'custom-html'){
      swal({
        title: 'HTML example',
        buttonsStyling: false,
        confirmButtonClass: "btn btn-success",
        html:
        'You can use <b>bold text</b>, ' +
        '<a href="http://github.com">links</a> ' +
        'and other HTML tags'
      });

    }else if(type == 'auto-close'){
      swal({ title: "Auto close alert!",
      text: "I will close in 2 seconds.",
      timer: 2000,
      showConfirmButton: false
    });
  } else if(type == 'input-field'){
    swal({
      title: 'Input something',
      html: '<div class="form-group">' +
      '<input id="input-field" type="text" class="form-control" />' +
      '</div>',
      showCancelButton: true,
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false
    }).then(function(result) {
      swal({
        type: 'success',
        html: 'You entered: <strong>' +
        $('#input-field').val() +
        '</strong>',
        confirmButtonClass: 'btn btn-success',
        buttonsStyling: false

      })
    }).catch(swal.noop)
  }
},

initVectorMap: function(){
  var mapData = {
    "AU": 760,
    "BR": 550,
    "CA": 120,
    "DE": 1300,
    "FR": 540,
    "GB": 690,
    "GE": 200,
    "IN": 200,
    "RO": 600,
    "RU": 300,
    "US": 2920,
  };

  $('#worldMap').vectorMap({
    map: 'world_mill_en',
    backgroundColor: "transparent",
    zoomOnScroll: false,
    regionStyle: {
      initial: {
        fill: '#e4e4e4',
        "fill-opacity": 0.9,
        stroke: 'none',
        "stroke-width": 0,
        "stroke-opacity": 0
      }
    },

    series: {
      regions: [{
        values: mapData,
        scale: ["#AAAAAA","#444444"],
        normalizeFunction: 'polynomial'
      }]
    },
  });
},

initGoogleMaps: function(){
  var myLatlng = new google.maps.LatLng(40.748817, -73.985428);
  var mapOptions = {
    zoom: 13,
    center: myLatlng,
    scrollwheel: false, //we disable de scroll over the map, it is a really annoing when you scroll through page
    styles: [{"featureType":"water","stylers":[{"saturation":43},{"lightness":-11},{"hue":"#0088ff"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"hue":"#ff0000"},{"saturation":-100},{"lightness":99}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"color":"#808080"},{"lightness":54}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"color":"#ece2d9"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#ccdca1"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#767676"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]},{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#b8cb93"}]},{"featureType":"poi.park","stylers":[{"visibility":"on"}]},{"featureType":"poi.sports_complex","stylers":[{"visibility":"on"}]},{"featureType":"poi.medical","stylers":[{"visibility":"on"}]},{"featureType":"poi.business","stylers":[{"visibility":"simplified"}]}]

  }
  var map = new google.maps.Map(document.getElementById("map"), mapOptions);

  var marker = new google.maps.Marker({
    position: myLatlng,
    title:"Hello World!"
  });

  // To add the marker to the map, call setMap();
  marker.setMap(map);
},

initSmallGoogleMaps: function(){

  // Regular Map
  var myLatlng = new google.maps.LatLng(40.748817, -73.985428);
  var mapOptions = {
    zoom: 8,
    center: myLatlng,
    scrollwheel: false, //we disable de scroll over the map, it is a really annoing when you scroll through page
  }

  var map = new google.maps.Map(document.getElementById("regularMap"), mapOptions);

  var marker = new google.maps.Marker({
    position: myLatlng,
    title:"Regular Map!"
  });

  marker.setMap(map);


},

showNotification: function(from, align){
  type = ['','info','success','warning','danger','rose','primary'];

  color = Math.floor((Math.random() * 6) + 1);

  $.notify({
    icon: "notifications",
    message: "Welcome to <b>Material Dashboard</b> - a beautiful freebie for every web developer."

  },{
    type: type[color],
    timer: 3000,
    placement: {
      from: from,
      align: align
    }
  });
}

}
