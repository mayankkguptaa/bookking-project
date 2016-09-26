/*
(function() {
  var video_player = document.getElementById('video_player');
  var video = video_player.getElementsByTagName('video')[0];
  var video_links = video_player.getElementsByTagName('figcaption')[0];
  var source = video.getElementsByTagName('source');
  var link_list = [],
    i,
    nextVid,
    index,
    vidDir = 'modules/training/client/demovideos/',
    currentVid = 0,
    allLnks = video_links.children,
    lnkNum = allLnks.length;
  video.removeAttribute('controls');
  video.removeAttribute('poster');

  function playVid(index) {
    video_links.children[index].classList.add('currentvid');
    source[0].src = vidDir + link_list[index] + '.webm';
    // source[0].src = vidDir + link_list[index] + ".mp4";
    currentVid = index;
    video.load();
    video.play();
  }


  for (i = 0; i < lnkNum; i++) {
    var filename = allLnks[i].href;
    link_list[i] = filename.match(/([^\/]+)(?=\.\w+$)/)[0];
    outsideLoop(i);
  }

  function outsideLoop(index) {
    allLnks[i].onclick = function (i) {
      i.preventDefault();
      for (i = 0; i < lnkNum; i++) {
        allLnks[i].classList.remove('currentvid');
      }
      playVid(index);
    };
  }

  video.addEventListener('ended', function () {
    allLnks[currentVid].classList.remove('currentvid');
    if ((currentVid + 1) >= lnkNum) { nextVid = 0; } else { nextVid = currentVid + 1; }
    playVid(nextVid);
  });

  video.addEventListener('mouseenter', function() {
    video.setAttribute('controls', 'true');
  });

  video.addEventListener('mouseleave', function() {
    video.removeAttribute('controls');
  });

  var indexOf = function(needle) {
    if (typeof Array.prototype.indexOf === 'function') {
      indexOf = Array.prototype.indexOf;
    } else {
      indexOf = function(needle) {
        i = -1; index = -1;
        for (i = 0; i < this.length; i++) {
          if (this[i] === needle) {
            index = i;
            break;
          }}
        return index;
      };}
    return indexOf.call(this, needle);
  };
  var focusedLink = document.activeElement;
  index = indexOf.call(allLnks, focusedLink);

  document.addEventListener('keydown', function(e) {
    if (index) {
      var focusedElement = document.activeElement;
      if (e.keyCode === 40 || e.keyCode === 39) { // down or right cursor
        var nextNode = focusedElement.nextElementSibling;
        if (nextNode) { nextNode.focus(); } else { video_links.firstElementChild.focus(); }
      }
      if (e.keyCode === 38 || e.keyCode === 37) { // up or left cursor
        var previousNode = focusedElement.previousElementSibling;
        if (previousNode) { previousNode.focus(); } else { video_links.lastElementChild.focus(); }
      }
    }
  });
}());
*/
