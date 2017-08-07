function addPageNumber(ulType) {
  var pageId = '#' + ulType + '-page';

  $(pageId).append(1);
}

function addPagesCouner(ulType, count) {
  var pagesId = '#' + ulType + '-pages',
      liCount = count;

  $(pagesId).append(Math.round(liCount/3));
}

function pagination(ulType) {
  var ulElements = '#' + ulType + "-elements",
      liCount = $(ulElements).children().length;

  addPageNumber(ulType);
  addPagesCouner(ulType, liCount);

  //hide arrows if number of pages is 1
  if (liCount/3 == 1) {
    $(ulElements).siblings('.arrows').children('*').css('visibility', 'hidden');
  }
}
