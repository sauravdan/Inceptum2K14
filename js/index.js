
 var hexaDemo1;
            text1 = 'INCEPTUM 2014'.split(''),//ιηςερτμɱ
            settings = {
                size: 80,
                margin: 2,
                fontSize: 50,
                perspective: 550
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
    
            setTimeout(function(){
                hexaDemo1.setValue(getSequence(text1, true));
            }, 0);
    
            setTimeout(function(){
                hexaDemo1.setValue(getSequence(text1));
            }, 1000);
    
            setTimeout(function(){
			
				setInterval(function(){
                    hexaDemo1.setValue(getSequence(text1, false,true));
					setTimeout(function(){hexaDemo1.setValue(getSequence(text1))},500);
                }, 2000);
            }, 1000);
        }, false);