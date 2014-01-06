$(document).ready(function() {
	
	var month = new Date();
	var year = new Date();
	month = month.getMonth();
	if(month<6){
		year = (year.getFullYear()-2010-1);
		month = month+6;
	}else{
		year = (year.getFullYear()-2010);
		month = month-6;
	}
	$('#timeline .text p.title').html('Nous avons '+year+' ans et '+month+' mois');
	
});















