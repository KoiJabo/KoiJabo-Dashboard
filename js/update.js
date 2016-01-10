$( document ).ready(function() {
	
	$("#loading-gif").hide();
	$("#detailed-error-message").hide();
	var _id = getParameterByName("id");
	var name = $("#Name").val();
	loadDataOnHtml(_id);

	$("button").click(function(e){
		e.preventDefault();
		$("#loading-gif").show();
		var formData = $("#create-form").serializeArray();
		formJson = JSON.stringify(formData);
		console.log(formJson);
		
		try{
			$.ajax({
				dataType: "json",
				type: "POST",				
				url: "http://koijaboapi.azurewebsites.net/api/restaurant/FormDataUpdate",
				// url: "http://localhost:25389/api/restaurant/FormDataUpdate",
				data: { '' : formData},
				success: success,
				error : error
			}).fail(function($xhr) {
				var data = $xhr.responseJSON;
				console.log(data);
			});
		} catch(e){
			console.log(e);
			$("#loading-gif").hide();
			$("#success").html("Failed to Update <b>" + name + "</b> info on Database !");
			$("#success").css({color : "red"});
			$("#detailed-error-message").show();
			$("#detailed-error-message").html("Why don't you try to submit again ? it might be a network issue !!!");
		}

		function success(success){
			$("#loading-gif").hide();
			console.log(success);
			if(success){
				$("#detailed-error-message").hide();
				$("#success").html("You have Successfully Updated <b>" + name + "</b> info on Database !");
				$("#success").css({color : "green"});				
			} else {
				$("#success").html("Failed to Update <b>" + name + "</b> info on Database !");
				$("#success").css({color : "red"});
				
				$("#detailed-error-message").show();
				$("#detailed-error-message").html("Why don't you try to submit again ? it might be a network issue !!!");
			}
			setTimeout(function(){
				$("#success").html("");
				$("#detailed-error-message").html("");
			}, 20000);
			
		}
		
		function error(error){
			$("#loading-gif").hide();
			$("#success").html("Failed to insert <b>" + name + "</b> info on Database !");
			$("#success").css({color : "red"});
			$("#detailed-error-message").html("Why don't you try to submit again ? it might be a network issue !!!");			
			console.log(error);
		}
	})
});
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
function initMap(lat, lng, name) {
  var location = {lat: lat, lng: lng};
 
  // Create a map object and specify the DOM element for display.
  var map = new google.maps.Map(document.getElementById('map'), {
    center: location,
    scrollwheel: false,
    zoom: 17
  });

  // Create a marker and set its position.
  var marker = new google.maps.Marker({
    map: map,
    position: location,
    title: name
  });
}



function loadDataOnHtml(_id){	
	$.getJSON("http://koijaboapi.azurewebsites.net/api/Restaurant/Get?id=" + _id, function(data){
	// $.getJSON("http://localhost:25389/api/Restaurant/Get?id=" + _id, function(data){
		console.log(data);
		initMap(data.GeoPoint.coordinates[1], data.GeoPoint.coordinates[0])

		$("#_id").val(data._id);
		$("#Name").val(data.Name);
		if (data.IsOpenNow)
			$("#IsOpenNow").val("Open")
		else
			$("#IsOpenNow").val("Closed")
		$("#Area").val(data.Area);
		$("#Address").val(data.Address);
		$("#TitleImageUrl").val(data.TitleImageUrl);		 
		$("#PhoneNumber").val(data.PhoneNumber);
		$("#CostUpperLimit").val(data.CostUpperLimit);
		$("#CostLowerLimit").val(data.CostLowerLimit);		
		$("#Latitude").val(data.GeoPoint.coordinates[1]);
		$("#Longitude").val(data.GeoPoint.coordinates[0]);
		

		loadTheCheckBoxFromData(".GoodFor", data.GoodFor);
		loadTheCheckBoxFromData(".CreditCards", data.CreditCards);
		loadTheCheckBoxFromData(".EstablishmentType", data.EstablishmentType);
		loadTheCheckBoxFromData(".Cuisines", data.Cuisines);

		function loadTheCheckBoxFromData (className, data) {
			$(className).each(function(index, value){
				$.each(data, function (i,v) {
					if (v == value.value) {
						value.checked = true;
					};
				})
			});
		}


		loadTheRadioFromData(".Parking", data.Parking);
		loadTheRadioFromData(".Attire", data.Attire);
		loadTheRadioFromData(".NoiseLevel", data.NoiseLevel);
		loadTheRadioFromData(".Rooftop", data.Rooftop);
		loadTheRadioFromData(".Reservation", data.Reservation);
		loadTheRadioFromData(".TakeOut", data.TakeOut);
		loadTheRadioFromData(".OutDoor", data.OutDoor);
		loadTheRadioFromData(".Wifi", data.Wifi);
		loadTheRadioFromData(".Tv", data.Tv);
		loadTheRadioFromData(".CandleLight", data.CandleLight);
		loadTheRadioFromData(".LuxuryDining", data.LuxuryDining);
		loadTheRadioFromData(".Washroom", data.Washroom);
		loadTheRadioFromData(".Toilet", data.Toilet);
		function loadTheRadioFromData (className, data) {
			$(className).each(function(index, value){
				if (value.value != "true" && value.value != "false") {
					if (data == value.value) {
						value.checked = true;
					};
				} else {
					if (data && value.value == "true") {
						value.checked = true;	
					} else if(!data && value.value == "false") {
						value.checked = true;
					}
				};
			});

		}
		
		$.each(data.TimeTable, function(index, value) {
			switch(value.Day){
				case "Saturday" :
					$("#SaturdayStartTime").val(value.StartTime);				
					$("#SaturdayStopTime").val(value.EndTime);
					break;																
				case "Sunday" :
					$("#SundayStartTime").val(value.StartTime);				
					$("#SundayStopTime").val(value.EndTime);
					break;																
				case "Monday" :
					$("#MondayStartTime").val(value.StartTime);				
					$("#MondayStopTime").val(value.EndTime);
					break;																
				case "Tuesday" :
					$("#TuesdayStartTime").val(value.StartTime);				
					$("#TuesdayStopTime").val(value.EndTime);
					break;																
				case "Wednesday" :
					$("#WednesdayStartTime").val(value.StartTime);				
					$("#WednesdayStopTime").val(value.EndTime);
					break;																
				case "Thursday" :
					$("#ThursdayStartTime").val(value.StartTime);				
					$("#ThursdayStopTime").val(value.EndTime);
					break;																
				case "Friday" :
					$("#FridayStartTime").val(value.StartTime);				
					$("#FridayStopTime").val(value.EndTime);
					break;																
			}
		});
		
				
		
		$.each(data.Tags, function(index, value){
			var list = $("<li>");
			var tag = $("<h4>",{
				'text' : value 
			});
			tag.appendTo(list);
			list.appendTo("#Tags");
			
		});
		$.each(data.Cuisines, function(index, value){
			var list = $("<li>");
			var tag = $("<h4>",{
				'text' : value 
			});
			tag.appendTo(list);
			list.appendTo("#Cuisines");			
		});
		
	});
}

