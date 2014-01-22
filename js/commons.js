QueryLoader.init();

$(document).ready(function () {

$("img.lazy").lazyload();

//**************************************//
//************ INIT ********************//
//**************************************//

	var height = $(window).height(),
		width = $(window).width(),
		pages = ["intro", "works","timeline","presentation", "thoughts"],
		currentPage = 0,
		links,
		venues = [];
	
	if((width>400)&&(width<height)){
		$('#container').css({"display":"none"});
		$('#orientation').css({"display":"block"});
	}

if(width>400){
	reflow();
	map();
}

$('#elements').jScrollPane({
	showArrows: true
}).bind('mousewheel', function(e){
   e.preventDefault();
});
$('#elements').data('jsp').scrollToX(2000);

//**************************************//
//************ EVENTS ********************//
//**************************************//

var rtime = new Date(1, 1, 2000, 12,00,00);
var timeout = false;
var delta = 200;

// Update
 $(window).resize(function() {
	
	rtime = new Date();
    if (timeout === false) {
        timeout = true;
        setTimeout(resizeend, delta);
    }
 });

function resizeend(){
	if (new Date() - rtime < delta) {
        setTimeout(resizeend, delta);
    } else {
        timeout = false;
 					height = $(window).height();
					width = $(window).width();
 					reflow();
    }

}


// Menu
$('.logo').click(function(){
	$.scrollTo( '#'+pages[0],500, {axis:'xy'});
});


// Main
$('#intro h1, #intro .logo, #intro .def').hover(function(){
	$("#intro .def").stop(true, true).animate({
		opacity:0.8
	},200);
},function(){
	$("#intro .def").stop(true, true).animate({
		opacity:0.2
	},200);
});

$('#presentation .legend .tags li').live("click",function(){

	var tag = $(this).attr('class');

	$('#presentation .legend .tags li').removeClass('active');
	$(this).addClass("active");

	if(tag!="all"){
		$.each(links,function(index,type){
			if(index==tag){
				$.each(type,function(index,value){
					value["svg"].show();
				});
			}else{
				$.each(type,function(index,value){
					value["svg"].hide();
				});
			};
		});
	}else{
		$.each(links,function(index,type){
			$.each(type,function(index,value){
				value["svg"].show();
			});
		});
	}

	$.each(venues,function(index,venue){
		if(typeof(venue.geo) != "undefined"){
			venue.geo.toFront();
		}
	});
});

$('#thetimeline #elements table.month td.news,#thetimeline #elements table.month td.big-news').hover(function(e){
	$("#hover-table").html($(this).children('.info-box').html()).css({
		"left":$(this).offset().left,
		"top":$(this).offset().top
	}).fadeIn();
	$("#hover-table").mouseleave(function(){
		$(this).fadeOut();
	});
});
$('#thetimeline #elements table.month').hover(function(){
	$(this).mousemove(function(e){
		$('.tool-tip').css({
			"display":"block",
			"left":e.pageX-50,
			"top": $(this).offset().top-37
		}).html($(this).attr('class').split(" ")[1]+" "+$(this).attr('class').split(" ")[2].replace("a",""));
	})
},function(){
	$(".tool-tip").hide();
})
//get current month
tableMonth = new Date();
tableYear = new Date();
var cssMonth = ["janvier","fevrier","mars","avril","mai","juin","juillet","aout","septembre","octobre","novembre","decembre"];
 $('table.month.'+cssMonth[tableMonth.getMonth()]+".a"+tableYear.getFullYear()+" td:last-child ").css({
 	borderRight: '1px solid #f36324'
 })
$("#works .works-list li").hover(function(){
	if($(this).find(".inner .bottom").hasClass('hasLink')){
		$(this).find('.inner .bottom img').animate({
			opacity:0.2
		},200);
		$(this).find('.inner .bottom .button').fadeIn();
	}
},function(){
	if($(this).find(".inner .bottom.hasLink")){
		$(this).find('.inner .bottom img').animate({
			opacity:1
			},200);
		$(this).find('.inner .bottom .button').fadeOut();
	}
});
$(".button-credits").hover(function(){
	$('#contact .credits').fadeIn();
},function(){
	setTimeout("$('#contact .credits').fadeOut()",4000);
})


//**************************************//
//******* FUNCTIONS ********************//
//**************************************//


function reflow(){
	// On coupe les events

	var menuWidth = parseInt($("#navigation .opacity").css("width"));
	if(menuWidth>=80){
		menuWidth = 80;
		$("#navigation .opacity").css("width",80);
	}
	if(width>400){
		$.each(pages,function(index,value){
			$("#"+value).css({
				"height": height,
				"width": width
			});
		});
	}
	
	// Compute de size of the navigation
	$('#navigation .logo img').css({
		"width":(menuWidth*0.7)
	})
	$('#navigation .buttons > div, .nav-arrow .prev, .nav-arrow .next, #navigation .logo').css({
		"width" : menuWidth,
		"height" : menuWidth*0.8
	});
	$('#navigation .buttons div').css({
		"height":menuWidth*0.8
	})
	$(".nav-arrow .next img, .nav-arrow .prev img").css({
		"height": menuWidth*0.8
	});
	$(".nav-arrow .next img, .nav-arrow .prev img").hover(function(){
		$(this).css({
			"margin-left" : -1*menuWidth
		});
	},function(){
		$(this).css({
			"margin-left" : 0
		});
	});
	$("#navigation .opacity").css("height",pages.length*height);

	$("#navigation .buttons > div").hover(function(){
		$(this).children('div').stop(true, true).animate({
			left:menuWidth
		}, 300);
	},function(){
		$(this).children('div').stop(true, true).animate({
			left: (menuWidth+150)*-1
		}, 300);
	});

	$('#navigation .buttons > div').click(function(){
		$.scrollTo('#'+$(this).attr('class').split(' ')[0],500, {axis:'xy'});
	});

	// compute the size of content in main section
	// Commons
	if(height>800){
		$('#video .content, #presentation .content ,#timeline .content, #works .content, #team .content, #thoughts .content').css({"padding-top": (height*0.1)});
	}else{
		$('#video .content, #presentation .content ,#timeline .content, #works .content, #team .content, #thoughts .content').css({"padding-top": (height*0.05)});
	}
	// Intro
	$('#intro .content').css({"padding-top": (height*0.3)});
	// Présentation
	if(height>1000){
		$('#presentation .svg').css({
			"margin-top": (height)*0.10
		})
	}

	// Timeline

	var tableSize = Math.round((height*0.6)/25);
	$("table.month td").css({
		width: tableSize,
		height: tableSize
	})
	$("#thetimeline #elements > table").css("width",$('#thetimeline .events > td').length*(tableSize*4));
	
	$("#thetimeline div.categ > div").css("height",(tableSize*5));
	
	$('#thetimeline  .legend').css({"width":$("#thetimeline div#elements").width()+28});

	// works

	$("#works .works-list li").css("width",width*0.315);
	$("#works-slider").jcarousel({
        scroll: 1,
        initCallback: controlWorks,
        buttonNextHTML: null,
        buttonPrevHTML: null,
		wrap: 'circular'
    });
	// Team
	$('#team .content ul').css({"margin-top": (height*0.2)})
	// Thoughts

	// contact
	$('#contact .content').css({"padding-top": (height*0.3)})

}



function controlWorks(carousel) {
    $('#works .works-nav .next').bind('click', function() {
        carousel.next();
        return false;
    });
    $('#works .works-nav .prev').bind('click', function() {
        carousel.prev();
        return false;
    });
};



function plot_point(lat, lng) {
    // Mercator projection
    x = (668 * (180 + lng) / 360) % 668 + -4.177;
    lat = lat * Math.PI / 180;
    y = Math.log(Math.tan((lat/2) + (Math.PI/4)));
    y = (524 / 2) - (668 * y / (2 * Math.PI)) + -157.6725;
	x = x*2120;
	y = y*2060;
    return [x,y];
}

function relative_time(time_value) {
  var values = time_value.split(" ");
  time_value = values[1] + " " + values[2] + ", " + values[5] + " " + values[3];
  var parsed_date = Date.parse(time_value);
  var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
  var delta = parseInt((relative_to.getTime() - parsed_date) / 1000);
  delta = delta + (relative_to.getTimezoneOffset() * 60);
  if (delta < 60) {
    return "Il y a moins d'une minute";
  } else if(delta < 120) {
    return 'Il y a environ une minute';
  } else if(delta < (60*60)) {
    return 'Il y a ' + (parseInt(delta / 60)).toString() + ' minutes';
  } else if(delta < (120*60)) {
    return 'Il y a une heure';
  } else if(delta < (24*60*60)) {
    return 'Il y a ' + (parseInt(delta / 3600)).toString() + ' heures';
  } else if(delta < (48*60*60)) {
    return 'Il y a un jour';
  } else {
    return 'Il y a ' + (parseInt(delta / 86400)).toString() + ' jours';
  }
}

function map(){

	var paper = Raphael("canvas", 800, 600),
			i = 0,
			tag;

	paper.image("img/map.png",15,20,668,542).toBack();
	paper.rect(0,0,800,600).attr({"fill":"#3cb5a2","stroke":"none"}).toBack();
	$.ajax({
		type: "GET",
		url: "/data.json",
		dataType: 'json',
		success: function(data){
			var venues = data.venues;
			links = data.links;
			$.each(venues,function(index,value){

				var pos = plot_point(venues[index].lat,venues[index].long);

				venues[index].x = pos[0]+15;
				venues[index].y = pos[1]+20;
				venues[index].cap = value.cap;
				venues[index].topTags = value.topTags;
				venues[index].tags = value.tags;
				venues[index].name = value.name;
				venues[index].cp = value.cp.toString().substring(3, value.cp.length);
				venues[index].box = paper.set();
				tag = "";
				$.each(value.topTags,function(index,value){
					tag += index.charAt(0).toUpperCase() + index.slice(1)+", ";
				});
				tag = tag.substring(0, tag.length-2);
				if(tag!=""){
					venues[index].geo = paper.circle(value.x,value.y,Math.log(value.cap)).attr({stroke:"#3cb5a2","stroke-width":0,fill:"#115d77"});
					venues[index].geo.venueId = index;
					venues[index].box.push(
						paper.text(venues[index].x+20,venues[index].y-30, venues[index].name.charAt(0).toUpperCase() + venues[index].name.slice(1)).attr({"font-family":"Droid Sans","font-size":20,"font-weight":"bold","fill":"#0b486c","text-anchor":"start"}),
						paper.text(venues[index].x+20,venues[index].y-5,"PARIS "+venues[index].cp+"e" ).attr({"font-family":"Droid Sans","font-size":16,"fill":"#3cb5a2","text-anchor":"start"}),
						paper.text(venues[index].x+20,venues[index].y+17,	venues[index].cap+" places" ).attr({"font-family":"Droid Sans","font-size":14,"fill":"#0b486c","text-anchor":"start"}),
						paper.text(venues[index].x+20,venues[index].y+40, "Top tags : "+tag).attr({"font-family":"Droid Sans","font-size":12,"fill":"#0b486c","text-anchor":"start"})
					).attr({opacity:0});

					venues[index].geo.hover(function () {
						this.backBox = paper.rect(this.attrs.cx,this.attrs.cy-60,venues[index].box.getBBox()["width"]+30,120,10 ).attr({fill:"#f7f7f7",stroke:"none"});
						this.circle = paper.circle(this.attrs.cx,this.attrs.cy,15).attr({fill:"#f7f7f7",stroke:"none"});
						this.attr({r:10,"stroke-width":3});
						venues[index].box.toFront().animate({opacity:1},400).show();
						if(Raphael.svg){
							this.toFront();
						}
					}, function () {
						this.animate({r:Math.log(venues[index].cap),"stroke-width":0},200);
						this.backBox.animate({opacity:0},400).hide();
						this.circle.animate({opacity:0},400).hide();
						venues[this.venueId].box.animate({opacity:0},400).hide();
					});
				}
			});
			$.each(links,function(index,type){

				$('#presentation .legend .tags-list').append("<li class="+index+">"+index.charAt(0).toUpperCase()+index.slice(1)+"</li>");

				$.each(type,function(index,value){

					var opacity = 0;
					if(value.poids<=1){
						var opacity = 0;
					}else if ((value.poids>=2)&&(value.poids<=4)){
						var opacity = 0;
					}else if((value.poids>=5)&&(value.poids<=7)){
						var opacity = 0.17;
					}else{
						var opacity = 0.20;
					}
					value["svg"] = paper.path("M"+venues[value.from].x+" "+venues[value.from].y+"L "+venues[value.to].x+" "+venues[value.to].y).attr({"opacity":opacity,"stroke-width":2,"stroke":"#FFF"});

				});
			});
			$.each(venues,function(index,venue){
				if(typeof venue.geo != "undefined"){
					venue.geo.toFront();
				}
			});
		}
	});
}
});