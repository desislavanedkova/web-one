function pagesCount(ulId, spanPageId, spanPagesId, prevId, nextId) {
  var liCount= document.getElementById(ulId).childElementCount;

  document.getElementById(spanPageId).append(1);
  document.getElementById(spanPagesId).append(Math.round(liCount/3));
  
  if (liCount/3 == 1) {
    document.getElementById(prevId).style.visibility = "hidden";
    document.getElementById(nextId).style.visibility = "hidden";
  }
}
