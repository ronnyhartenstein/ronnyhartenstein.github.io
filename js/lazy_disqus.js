
// based on http://christian-fei.com/tutorials/how-to-lazy-load-disqus-comments/

var comments = document.getElementById('disqus_thread'),
    disqusLoaded = false;

function loadDisqus() {
  var d = document, s = d.createElement('script');
  s.type = 'text/javascript';
  s.async = true;
  s.src = '//rhflow.disqus.com/embed.js';
  s.setAttribute('data-timestamp', +new Date());
  (d.head || d.body).appendChild(s);
  disqusLoaded = true;
}

function findTop(obj) {
  var curtop = 0;
  if (obj.offsetParent) {
    do {
      curtop += obj.offsetTop;
    } while (obj = obj.offsetParent);
    return curtop;
  }
}

if(window.location.hash.indexOf('#comments') > 0) {
  loadDisqus();
}

if(comments) {
  var commentsOffset = findTop(comments);
  window.onscroll = function() {
    if(!disqusLoaded && window.pageYOffset > commentsOffset - 1000)
      loadDisqus();
  }
}
