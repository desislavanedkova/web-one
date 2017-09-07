$(document).ready(function(){

  // scroll triangle in right corner
  $(document).scroll(function() {
    var y = $(this).scrollTop();

    y > 550 ? $('#to-top').fadeIn() : $('#to-top').fadeOut();
  });

  // header image scroll
  function buttonClicked(direction){

    var currentElement = $('.visible'),
        newElement;

    if (direction === 'next') {
      newElement = currentElement.next().length == 0 ? $('.list li').first() : currentElement.next();
    } else if (direction === 'prev'){
      newElement = currentElement.prev().length == 0 ? $('.list li').last() : currentElement.prev();
    }

    newElement.toggleClass('visible');
    currentElement.toggleClass('visible');
  }

  // setInterval(function() { buttonClicked('next'); }, 6000);

  $('#next').on('click', function() { buttonClicked('next'); });
  $('#prev').on('click', function() { buttonClicked('prev'); });

  //header image down triangle and products button click
  $('.to-products').on('click', function() {
    $('html, body').animate({
        scrollTop: $(".filter-products").offset().top
    }, 2000);
  });

  // click on checkbox
  $('input:checkbox').click(function checkboxClick() {
    var checkboxId = $(this).prop('id');
    var articleId = checkboxId.slice(0, checkboxId.indexOf('-'));
    var articleSelector = $('article[id^="'+ articleId +'"][id$="-products"]');

    $(articleSelector).css('display') == 'none' ? $(articleSelector).show() : $(articleSelector).hide();

  });

  // click "select all" button
  $('#selectAll').click(function() {
    $('input:checkbox').prop('checked', true);
    $('article.products').css('display', '');
  });

  //finding index of first and last visible element
  function findFirstAndLastVisibleProduct(arrLi) {
    var firstVisibleElement = undefined,
        lastVisibleElement,
        arrLis = arrLi;

        for (var i = 0; i < arrLis.length; i+= 1) {
          if (arrLis[i].className == 'visible-products') {
            firstVisibleElement == undefined ? firstVisibleElement = i : lastVisibleElement = i;
          }
        }
        return [firstVisibleElement, lastVisibleElement];
  }

  //write the visible page number
  function addPageFromPages(pageID, elements) {
    var $pageID = pageID;

    $pageID.text(Math.round((elements)/3));
  }

  //right button click
  $('.right-btn').on("click", function() {
    var arrLi = $(this).parents('article').find('ul').children('li'),
        spanPage = $(this).parents('article').find("span[id$='page']"),
        data = findFirstAndLastVisibleProduct(arrLi),
        firstVisibleElement = data[0],
        lastVisibleElement = data[1];

        if (firstVisibleElement + 3 < arrLi.length - 1) {
          for (var i = 0; i < lastVisibleElement + 1; i+= 1) {
            arrLi[i].className = '';
            if (arrLi[i+3] != undefined) {
              arrLi[i+3].className = 'visible-products';
            }
          }
        }

        addPageFromPages(spanPage, (lastVisibleElement + 3));
  });

  //left button click
  $('.left-btn').on("click", function() {
    var arrLi = $(this).parents('article').find('ul').children('li'),
        spanPage = $(this).parents('article').find("span[id$='page']"),
        data = findFirstAndLastVisibleProduct(arrLi),
        firstVisibleElement = data[0],
        lastVisibleElement = data[1];

        if (firstVisibleElement != 0 ) {
          if (lastVisibleElement - firstVisibleElement > 1) {
            for (var i = lastVisibleElement; i > lastVisibleElement - 3; i-= 1) {
              if (arrLi[i].className == 'visible-products') {
                arrLi[i].className = '';
                if (arrLi[i - 3] != undefined) {
                  arrLi[i-3].className = 'visible-products';
                }
              }
            }
          } else {
            for (var i = lastVisibleElement; i > lastVisibleElement - 3; i-= 1) {
              if (arrLi[i].className == 'visible-products') {
                arrLi[i].className = '';
                if (arrLi[i - 3] != undefined) {
                  arrLi[i-3].className = 'visible-products';
                }
              } else {
                arrLi[i].className = 'visible-products';
              }
            }
          }
          addPageFromPages(spanPage, firstVisibleElement);
        }
  });

  function isProductAlreadyIn(bayProductID) {
    var $productsIn = $('#shopping-card-window ul').children('li'),
        count = 1;
    debugger;
        for (var i = 0; i < $productsIn.length; i+=1) {
          $productsIn[i].className == bayProductID ? count += 1 : count = 1;
            // count = Number($productsIn[i].childNodes('span').text()) + 1;
        }
        return count;
  }

  //product bay button click
  $('.buy-btn').on('click', function() {
    var bayProductInfo = $(this).siblings('.row-p').text(),
        bayProductID = $(this).parents('li').attr('ID');

    count = isProductAlreadyIn(bayProductID);

    if (count == 1) {
      $('#shopping-card-window ul').append("<li class=" + bayProductID + "><button class='del btn' onclick='return false;'>X</button>" + bayProductInfo + "<span>" + count + "</span> piece</li>");
    } else {
      // $('#shopping-card-window ul').find('id:') attr('class', bayProductID).children('span').text(count);
    }

    $('#item-count').html(Number($('#item-count').text())+1).show();
    // window.scrollTo(0, 0);
  });

  //delete item from shopping cord
  $('#shopping-card-window').on('click', '.del' , function() {
    $(this).parent('li').remove();
      $('#item-count').text() == 1 ? $('#item-count').html('').hide() :  $('#item-count').html(Number($('#item-count').text())-1).show();
  });

  //hide a DIV when the user clicks outside of it
  $(document).click(function(e){
    // if the target of the click isn't the shopping-card-window nor a descendant of the shopping-card-window
    if(!$("#shopping-card-window").is(e.target) && !$('.fa-shopping-cart').is(e.target) && !$('.del').is(e.target) && $("#shopping-card-window").has(e.target).length == 0){
      $("#shopping-card-window").hide();
    }
  });


  //shopping-card icon click
  $('.fa-shopping-cart').on('click', function(){
    if (Number($('#item-count').text()) > 0) {
      $('#shopping-card-window').css('display') == 'none' ? $('#shopping-card-window').show() : $('#shopping-card-window').hide();
    }
  });

});

// https://codepen.io/Paul34/pen/oxQvEv
