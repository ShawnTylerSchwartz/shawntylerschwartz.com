//
//
// Copyright (C) Shawn Tyler Schwartz, 2018
// https://shawntylerschwartz.com
// 
// shawnschwartz@ucla.edu
//
//

// Cache selectors
var lastId,
 topMenu = $("#mainNav"),
 topMenuHeight = topMenu.outerHeight()+1,
 // All list items
 menuItems = topMenu.find("a"),
 // Anchors corresponding to menu items
 scrollItems = menuItems.map(function(){
   var item = $($(this).attr("href"));
    if (item.length) { return item; }
 });

// Bind click handler to menu items
// so we can get a fancy scroll animation
menuItems.click(function(e){
  var href = $(this).attr("href"),
      offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
  $('html, body').stop().animate({ 
      scrollTop: offsetTop
  }, 850);
  e.preventDefault();
});

// Bind to scroll
$(window).scroll(function(){
   // Get container scroll position
   var fromTop = $(this).scrollTop()+topMenuHeight;
   
   // Get id of current scroll item
   var cur = scrollItems.map(function(){
     if ($(this).offset().top < fromTop)
       return this;
   });
   // Get the id of the current element
   cur = cur[cur.length-1];
   var id = cur && cur.length ? cur[0].id : "";
   
   if (lastId !== id) {
       lastId = id;
       // Set/remove active class
       menuItems
         .parent().removeClass("active")
         .end().filter("[href=#"+id+"]").parent().addClass("active");
   }                 
});

new Typed('#shawn', {
    strings: ["UCLA Undergraduate", "software developer", "digital designer", "cognitive psychology RA"],
    typeSpeed: 70,
    backSpeed: 40,
    backDelay: 1000,
    loop: true,
    onComplete: function() {
      var cursor = document.getElementsByClassName('typed-cursor')[0];
      setTimeout(function() {
        cursor.style.animationIterationCount = 0;
      }, 2000);
    }
  });

new Typed('#terminal', {
    strings: ['npm install shawn...<br /><br />^1000\n `I\'m an undergrad thesis candidate @ UCLA in cognitive science and biology...<br /><br />` ^1000\n `I was the lead student web developer for ASUCLA Marketing...<br /><br />` ^1000\n `I\'ve previously developed software for UCLA Health!`'],
    typeSpeed: 65,
    backSpeed: 25,
    backDelay: 500,
    loop: false,
    onComplete: function() {
      var cursor = document.getElementsByClassName('typed-cursor')[0];
      setTimeout(function() {
        cursor.style.animationIterationCount = 0;
      }, 2000);
    }
  });

// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          // $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            // $target.focus(); // Set focus again
          };
        });
      }
    }
  });


