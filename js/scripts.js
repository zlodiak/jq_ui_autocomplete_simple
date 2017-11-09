$( document ).ready(function() {

	var countriesArr = [],
			countriesObj = {};

	function getData() {
		$.get( "http://api.vk.com/method/database.getCountries?v=5.5", function( data ) {
			var countriesRaw = data['response']['items'];
		  console.log( countriesRaw );

		  countriesArr = countriesRaw.map(function(country) {
		  	return country.title;
		  });
		  console.log(countriesArr);

		  countriesRaw.forEach(function(country) {
		  	countriesObj[country.title] = country.id;
		  });
		  console.log(countriesObj);

		  initCountryAutocomplete();
		});	
	};

	function initCountryAutocomplete() {
		$( "#country" ).autocomplete({
			delay: 0.5,
			source: countriesArr,
			select: function(event, ui) {
          console.log(event, ui);
      }
		});		
	};

	getData();

	document.getElementById('submit').addEventListener('click', function() {
		var selectedCountry = document.getElementById('country').value;
		var selectedCountryId = countriesObj[selectedCountry];
		console.log('selected country is', selectedCountry, selectedCountryId);
	});



});