var fontList = [];
const fontsPerPage = 20;
var currentlyDisplays = 0;
const defaultFontSize = "32px";
const defaultText = "Then came the night of the first falling star.";
var listView = false;

$(function () {
	$.ajax({
		url: "getFontsObject",
		success: function (data) {
			prepareFontList(data);
			reset();
		}
	});
});

var fixSpaces = function (str, c) {
	return (str.replace(/ /g, c));
}

var prepareFontList = function (data) {
	var variant = "";

	data.items.forEach(function(item){		
		fontList.push({family: item.family, files:item.files, isLoaded:0, isShown:0, variant:getDefaultVariant(item.variants)});
	});

//	fontList = fontList.slice(0, 9);

	loadMoreFonts(0);
	$("main").css('display', 'block');
};

var loadMoreFonts = function (min) {
	var newHtml = "";
	var family = ""
	var familyUrl = "";
	var familyNoSpaces = "";
	var counter = 0;
	var variant = "";
	var newFontCard = "";
	var extraDiv = "";

	for (var i=min; counter<fontsPerPage && i<fontList.length; i++) {
		family = fontList[i].family;

		if (isShowFont(family) && fontList[i].isLoaded == 0) {
			familyUrl = fixSpaces(family, "+");
			familyNoSpaces = fixSpaces(family, "");
			variant = fontList[i].variant;
			
			//newFontCard = document.createElement("li");
			newFontCard = document.createElement("li");
			newFontCard.setAttribute("class", "fontCard " + familyNoSpaces);
			
			extraButton = document.createElement("button");
			extraButton.setAttribute("class", "addFont");
			extraButton.setAttribute("title", "add "+family)
			extraButton.setAttribute("alt", "add "+family)
			extraButton.innerHTML = "+";
			
			extraDiv = document.createElement("div");
			extraDiv.setAttribute("class", "family");
			extraDiv.innerHTML = family;
			
			extraDiv.appendChild(extraButton)
			//newFontCard.appendChild(extraButton);
			newFontCard.appendChild(extraDiv);
			
			extraDiv = document.createElement("div");
			extraDiv.setAttribute("class", "text");
			extraDiv.setAttribute("style", "font-family:"+family);
			extraDiv.innerHTML = getText();
			newFontCard.appendChild(extraDiv);
			document.getElementById("mainFontList").appendChild(newFontCard);

			var newFontScript = document.createElement("link");
			newFontScript.setAttribute("href", "https://fonts.googleapis.com/css?family=" + familyUrl + variant);
			newFontScript.setAttribute("rel", "stylesheet");
			newFontScript.setAttribute("type", "text/css");
			document.getElementById("fontLoading").appendChild(newFontScript);

			currentlyDisplays++;
			counter++;

			fontList[i].isLoaded=1;
			fontList[i].isShown=1;
		}
	}	
}

// Change all input values to default
var reset = function () {
	document.getElementById("title").value = "";
	updateText();
	document.getElementById("sizePicker").value = defaultFontSize;
	changeTextSize(defaultFontSize);
	document.getElementById("search").value = "";
	document.getElementById("light").checked = true;
	setViewMode('light');
	listView = true;
	changeListView();
	search();
}

var changeTextSize = function (val) {
	$("#main").attr("fontsize", val)
}

var getText = function () {
	var text = document.getElementById("title").value;
	if (text == "" || text == "undefined") {
		text = defaultText;
	}
	return (text);	
}

var updateText = function () {
	$(".fontCard .text").html(getText());
}

window.onscroll = function () {
	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		$("#goToTop").show();
	} else {
		$("#goToTop").hide();
	}

	if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 2) {
		loadMoreFonts(currentlyDisplays)	
	}
};

var goToTop = function () {
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
};

var search = function () {
	if (/[^a-zA-Z0-9]/.test(document.getElementById("search").value) == null)  {
		throw ("That's not a valid font name! " + document.getElementById("search").value);
		return null;
	} 
	var str = new RegExp(document.getElementById("search").value, "gi");
	for (var i=0; i<fontList.length; i++) {
		var family = fontList[i].family;
		var familyNoSpaces = fixSpaces(family, "");
		if (family.match(str)) {
			fontList[i].isShown = 1;
			$('.' + familyNoSpaces).show();
		} else {
			fontList[i].isShown = 0;
			$('.' + familyNoSpaces).hide();
		}
	}
	loadMoreFonts(currentlyDisplays)
}

var isShowFont = function(family) {
	var str = new RegExp(document.getElementById("search").value, "gi");
	var found = family.match(str);	
	return found;
}

var getDefaultVariant = function (variants) {
	var i=0;
	while (i < variants.length) {
		if (variants[i].toLowerCase() == "regular") {
			return ("");
		}
		i++;
	}
	return (":" + variants[0]);
}

var setViewMode = function (mode) {
	document.body.setAttribute("viewMode", mode);
}

var changeListView = function () {
	listView = !listView;
	document.body.setAttribute("listView", listView);
}