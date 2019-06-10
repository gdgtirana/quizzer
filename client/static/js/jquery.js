$(document).ready(function () {

  slide = $('.slide');
  move = 5000;
  bg = $('.bg-inner');
  width1 = $('body').width();
  width = width1;
  number = 2;
  number1 = 1;
  values = [];
  questionNr = $('.question-number div p')
  question = 45;

  $(".slide label").on("click", function () {

    $('.button-option-mobile .next button').fadeIn("slow");

  });

  $(".slide:last-child label").on("click", function () {

    $('.button-option-mobile .submit button').fadeIn("slow");

  });

  if ($(window).width() < 769) {
    move = 2500;

    question = 31;
    if ($(window).width() < 420) {

      move = 1500;

      question = 24;

    }

    $(".button-option-mobile .next button").on("click", function () {

      title = $('.title .h1_' + number);

      titlePrev = $('.title .h1_' + number1);

      if ($('input[type=radio]').is(':checked')) {

        val = $('input[type=radio]:checked').val();

        $(".slide").each(function () {

          TweenLite.to(bg, 1, {x: -move, ease: Sine.easeOut, delay: 0.5});
          TweenLite.to(slide, 1, {x: -width, ease: Sine.easeOut});
          TweenLite.to(titlePrev, 1, {opacity: 0});
          TweenLite.to(title, 1, {opacity: 1, delay: 1});
          TweenLite.to(questionNr, 1, {y: -question});

        });

        $('.button-option-mobile .next button').fadeOut("fast");
        setTimeout(function () {
          $('input[type=radio]:checked').prop('checked', false);
        }, 700);

        values.push(val);

        move += 500;

        width += width1;

        number += 1;

        number1 += 1;

        question += 24;

      } else {

        toastr["warning"]("Please select the correct answer!!!", "Answer is required!!!", {

          "closeButton": true,
          "positionClass": "toast-top-right"

        });

      }

    });

  } else {

    $('.slide .next button').fadeIn("slow");

    $(".slide .next button").on("click", function () {

      title = $('.title .h1_' + number);

      titlePrev = $('.title .h1_' + number1);

      if ($('input[type=radio]').is(':checked')) {

        val = $('input[type=radio]:checked').val();

        $(".slide").each(function () {

          TweenLite.to(bg, 2, {x: -move, ease: SlowMo.ease.config(1, 0.1, false)});
          TweenLite.to(slide, 1, {x: -width, delay: 0.5});
          TweenLite.to(titlePrev, 1, {opacity: 0});
          TweenLite.to(title, 1, {opacity: 1, delay: 1});
          TweenLite.to(questionNr, 1, {y: -question});


          $('.slide .next button').fadeOut("fast");

        });

        setTimeout(function () {
          $('input[type=radio]:checked').prop('checked', false);
          $('.slide .next button').fadeIn("fast");
        }, 1500);

        $('.slide:nth-last-child(2) .next button').click(function () {
          setTimeout(function () {
            $('.slide .submit button').fadeIn("fast");
          }, 1500);
        });



        values.push(val);

        move += 1700;

        width += width1;

        number += 1;

        number1 += 1;

        question += 45;

      } else {

        toastr["warning"]("Please select the correct answer!!!", "Answer is required!!!", {

          "closeButton": true,
          "positionClass": "toast-top-right"

        });

      }

    });

  }

  $("#menu2").click(function () {
    $(this).toggleClass("active");
    $(".line2.middle").toggleClass("hide");
    // $(".menu").slideToggle();
    $('#overlay').toggleClass('open');
  });

  $(".finish").click(function () {

    $('#wrap-popup').fadeIn('fast');

    var pieces = 70,
      speed = 1,
      pieceW = 30,
      pieceH = 35;


    for (var i = pieces - 1; i >= 0; i--) {
      $('#popup').prepend('<div class="piece" style="width:' + pieceW + 'px; height:' + pieceH + 'px"></div>');
    }
    ;

    function breakGlass(from) {
      if (from === "reverse") {
        $('.piece').each(function () {
          TweenLite.to($(this), speed, {x: 0, y: 0, rotationX: 0, rotationY: 0, opacity: 1, z: 0});
          TweenLite.to($('#popup h1'), 0.2, {opacity: 1, delay: speed});
        });
        return;
      }

      if (!from) {
        TweenLite.to($('#popup h1'), 0.2, {opacity: 0});
      } else {
        TweenLite.from($('#popup h1'), 0.5, {opacity: 0, delay: speed});
      }

      $('.piece').each(function () {
        var distX = getRandomArbitrary(-250, 250),
          distY = getRandomArbitrary(-250, 250),
          rotY = getRandomArbitrary(-720, 720),
          rotX = getRandomArbitrary(-720, 720),
          z = getRandomArbitrary(-500, 500);

        if (!from) {
          TweenLite.to($(this), speed, {
            x: distX,
            y: distY,
            rotationX: rotX,
            rotationY: rotY,
            opacity: 0,
            z: z
          });
        } else {
          TweenLite.from($(this), speed, {
            x: distX,
            y: distY,
            rotationX: rotX,
            rotationY: rotY,
            opacity: 0,
            z: z
          });
        }
      });
    }

    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }

    $('.finish').click(function () {
      breakGlass('reverse');
    });

    breakGlass(true);

  });

  moveTop = 1500;

  if ($(window).width() < 420) {
    moveTop = 3000;
  }

  $('.next-step').click(function () {

    var empty = $(this).siblings("input").filter(function() {
      return this.value === "";
    });

    if(empty.length) {
      toastr["warning"]("Please fill all the fields.", "Field is required!!!", {

        "closeButton": true,
        "positionClass": "toast-top-right"

      });
    }else {

      $(this).parent('section').toggleClass('height', 'display');
      $(this).parent('section').next('section').addClass('display');

      TweenLite.to('.cq-bg', 2, {y: -moveTop, ease: SlowMo.ease.config(1, 0.1, false)});

    }

  });

  $('.step-title').click(function () {
    $(this).parent().parent().removeClass('height')
  })


  $('.tags-input').magicSuggest({
    placeholder: '',
    data: ['Banana', 'Apple', 'Orange', 'Lemon']
  });
});
