//Error Handling 
window.onerror = function (mesg, url, num) {;return true;}

 var hexaDemo1;
            text1 = 'INCEPTUM'.split(''),//ιηςερτμɱ
			text2 = '2K14'.split(''),//ιηςερτμɱ
            settings = {
                size: 110,
                margin: 5,
                fontSize: 72,
                perspective: 800
            },
            makeObject = function(a){
                var o = {};
				var newA=new Array();
				for(var i=0;i<a.length;i++){
					newA.push(new Array());
				for(var j=0;j<a.length;j++)
					newA[i].push(a[i]);
				}
                for(var i = 0, l = a.length; i < l; i++){
                    o['letter' + i] = a;//newA[i];
                }
                return o;
            },
            getSequence = function(a, reverse, random){
                var o = {}, p;
                for(var i = 0, l = a.length; i < l; i++){
                    if(reverse){
                        p = l - i - 1;
                    }else if(random){
                        p = Math.floor(Math.random() * l);
                    }else{
                        p = i;
                    }
					
                    o['letter' + i] = a[p];
                }
                return o;
            };
    
        document.addEventListener('DOMContentLoaded', function(){
            hexaDemo1 = new HexaFlip(document.getElementById('hexaflip-demo1'), makeObject(text1), settings);
			hexaDemo2 = new HexaFlip(document.getElementById('hexaflip-demo2'), makeObject(text2), settings);
			$("#hexaflip-demo1").css("left",($(window).width()-$("#hexaflip-demo1").width())/2+'px');
			$("#hexaflip-demo2").css("left",($(window).width()-$("#hexaflip-demo2").width())/2+'px');
			
            setTimeout(function(){
                hexaDemo1.setValue(getSequence(text1, true));
                hexaDemo2.setValue(getSequence(text2, true));
            }, 0);
    
            setTimeout(function(){
                hexaDemo1.setValue(getSequence(text1));
                hexaDemo2.setValue(getSequence(text2));
            }, 1000);
    
            setTimeout(function(){
			
				setInterval(function(){
                    hexaDemo1.setValue(getSequence(text1, false,true));
					setTimeout(function(){hexaDemo1.setValue(getSequence(text1))},500);
                }, 3000);
            }, 4000);
			setTimeout(function(){
			
				setInterval(function(){
                    hexaDemo2.setValue(getSequence(text2, false,true));
					setTimeout(function(){hexaDemo2.setValue(getSequence(text2))},500);
                }, 3000);
            }, 1500);
        }, false);
		
		
//map
$(".mapMap").gmap3({ 
  getroute:{
    options:{
        origin:"28.544559,77.264441",
        destination:"28.547382,77.271614",
        travelMode: google.maps.DirectionsTravelMode.WALKING
    },
    callback: function(results){
      if (!results) return;
      $(this).gmap3({
        map:{
          options:{
			mapTypeId: google.maps.MapTypeId.SATELLITE,
            zoom: 12,  
            center: [-33.879, 151.235]
          }
        },
        directionsrenderer:{
          container: $(document.createElement("div")).addClass("googlemap").insertAfter($(".mapMap")),
          options:{
            directions:results
          } 
        }
      });
    }
  }
},
{ 
  marker:{
    latLng:[28.544559,77.264441]
  },
  overlay:{
    latLng: [28.544559,77.264441],
    options:{
      content:  '<div style="color:#fff; border:1px solid #fff; ' +
                'background-color: #3c81b5; line-height:20px; ' +
                'height: 40px; text-align:center">Govinpuri<br>Metro Station !</div>',
      offset:{
        y:20,
        x:0
      }
      
    }
  }
  
},
{ 
  marker:{
    latLng:[28.547382,77.271614]
  },
  overlay:{
    latLng: [28.547382,77.271614],
    options:{
      content:  '<div style="color:#fff; border:1px solid #fff; ' +
                'background-color: #3c81b5; width:200px; line-height:20px; ' +
                'height: 40px; text-align:center">Inceptum to be held here !!<br>GBPEC New Delhi !</div>',
      offset:{
        y:-40,
        x:-200
      }
      
    }
  }
  
});



//schedule

$(".scheduleTitle").text("Schedule");