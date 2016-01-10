$(document).ready(function() {
	console.log("Why its not working ???")
    // $.getJSON("http://localhost:25389/api/Restaurant/search", function(data){
   $.getJSON("http://koijaboapi.azurewebsites.net/api/Restaurant/search", function(data){
		console.log(data);
		$.each(data, function(index, value){
			var list = $("<li/>");
			
			var name = $("<h2/>",{
				"class" : "list-name",
				"html"  : value.Name
			});
			
			var link = $("<a/>",{
				"href" : "update.html?id=" + value._id
			});
			
			name.appendTo(link);
			link.appendTo(list);
			list.appendTo("#restaurant-list");
		})
	})
});

