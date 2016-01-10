$(document).ready(function(){
	
	$("#loading-gif").hide();
	$("#detailed-error-message").hide();
	
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
				url: "http://koijaboapi.azurewebsites.net/api/restaurant/formdatainput",
				// url: "http://localhost:25389/api/restaurant/formdatainput",
				data: { '' : formData},
				success: success,
				error : error,
			}).fail(function($xhr) {
				var data = $xhr.responseJSON;
				console.log(data);
			});
		} catch(e){
			console.log(e);
			$("#success").html("Failed to insert <b>" + name + "</b> info on Database !");
			$("#success").css({color : "red"});
			$("#detailed-error-message").show();
			$("#detailed-error-message").html("Why don't you try to submit again ? it might be a network issue !!!");
		}

		function success(success){
			$("#loading-gif").hide();
			console.log(success);
			var name = $("#name").val();
			if(success){
				$("#detailed-error-message").hide();
				$("#success").html("You have Successfully inserted <b>" + name + "</b> info on Database !");
				$("#success").css({color : "green"});
				$("#create-form").trigger("reset");
			} else {
				$("#success").html("Failed to insert <b>" + name + "</b> info on Database !");
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
			var name = $("#name").val();
			$("#success").html("Failed to insert <b>" + name + "</b> info on Database !");
			$("#success").css({color : "red"});
			$("#detailed-error-message").html("Why don't you try to submit again ? it might be a network issue !!!");			
			console.log(error);
		}
	})
});