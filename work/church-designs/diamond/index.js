// Navbar menu
$('.menu-btn').mouseenter(()=>{

})

$('.menu-btn').mouseleave(()=>{

})

$('.menu-btn').click(()=>{
    
})




// Locations section
$('.location-inner').mouseenter(function(){
    $(this).addClass('location-inner-hover');
    $(this).children().children().addClass('white-text');
})

$('.location-inner').mouseleave(function(){
    $(this).removeClass('location-inner-hover');
    $(this).children().children().removeClass('white-text');
})

// Hover over mission and beliefs
$('#mission').mouseenter(function(){
    $(this).addClass('mission-lighten');
})

$('#mission').mouseleave(function(){
    $(this).removeClass('mission-lighten');
})

$('#beliefs').mouseenter(function(){
    $(this).addClass('beliefs-lighten');
})

$('#beliefs').mouseleave(function(){
    $(this).removeClass('beliefs-lighten');
})