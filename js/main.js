$(document).ready(function(){
  // hide all li elements from 3-th //
  // $('ul.ul-element').each(function() {
  //   $(this).children().slice(3).hide();
  // });

  // scroll triangle in right corner
  $(document).scroll(function() {
    var y = $(this).scrollTop();
    if (y > 550) {
      $('#to-top').fadeIn();
    } else {
      $('#to-top').fadeOut();
    }
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

  //header image down triangle click
  $('#to-bottom').on('click', function() {
    window.scroll(0, 600);
  });

  // click on checkbox
  $('input:checkbox').click(function checkboxClick() {
    var checkboxId = $(this).prop('id');
    var articleId = checkboxId.slice(0, checkboxId.indexOf('-'));
    var articleSelector = $('article[id^="'+ articleId +'"][id$="-products"]');

    $(articleSelector).css('display') == 'none' ? $(articleSelector).css('display', '') : $(articleSelector).css('display', 'none');

  });

  // click "select all" button
  $('#selectAll').click(function() {
    $('input:checkbox').prop('checked', true);
    $('article.products').css('display', '');
  });


  // products sroll
  function productButtonClicked(article, direction) {
    var selectorLi = '#' + article + ' .ul-element li',
        liElements = $(selectorLi),
        firstVisibleElement = undefined,
        lastVisibleElement,
        selectorButton = '#' + article.substr(0, article.indexOf('-')+1) + direction,
        spanPage = '#' + article.substr(0, article.indexOf('-')+1) + 'page';

    for (var i = 0; i < liElements.length; i+=1) {
      if (liElements[i].className == 'visible-products') {
        if (firstVisibleElement == undefined) {
          firstVisibleElement = i;
        } else {
          lastVisibleElement = i;
        }
      }
    }

    if (direction == 'next') {
      if (firstVisibleElement + 3 < liElements.length - 1) {
        for (let j = firstVisibleElement; j < lastVisibleElement + 1; j+=1) {
          liElements[j].className = '';
          if (liElements[j+3] != undefined) {
            liElements[j+3].className = "visible-products";
          }
        }
        $(spanPage).text(Math.round((lastVisibleElement+3)/3));
      }
    } else {
      if (firstVisibleElement != '0') {
        for (let j = lastVisibleElement; j > lastVisibleElement - 3; j-=1) {
          if (liElements[j].className == 'visible-products') {
            liElements[j].className = '';
            if (liElements[j-3] != undefined) {
              liElements[j-3].className = "visible-products";
            }
          } else {
            liElements[j].className = 'visible-products';
          }
        }
        $(spanPage).text(Math.round((firstVisibleElement)/3));
      }
    }
  }

  $('#men-next').on('click', function() { productButtonClicked('men-products', 'next'); });
  $('#men-prev').on('click', function() { productButtonClicked('men-products', 'prev'); });

  $('#women-next').on('click', function() { productButtonClicked('women-products', 'next'); });
  $('#women-prev').on('click', function() { productButtonClicked('women-products', 'prev'); });

  $('#children-next').on('click', function() { productButtonClicked('children-products', 'next'); });
  $('#children-prev').on('click', function() { productButtonClicked('children-products', 'prev'); });

  //product bay button click
  $('.buy-btn').on('click', function() {
    var bayProduct = $(this).prev().text();
    $('#item-count').html(Number($('#item-count').text())+1).css('display', 'block');
    $('#shopping-card-window ul').append('<li>' + bayProduct + '</li>');
    window.scrollTo(0, 0);
  });

  //shopping-card icon hover
  $('.fa-shopping-cart').on('click', function(){
    if (Number($('#item-count').text()) > 0) {
      $('#shopping-card-window').css('display') == 'none' ? $('#shopping-card-window').css('display', 'block') : $('#shopping-card-window').css('display', 'none');
    }
  });

});

// https://codepen.io/Paul34/pen/oxQvEv