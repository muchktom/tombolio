function onload() {
	if(checkRequirements()) {
		document.getElementById('page_source-file').addEventListener('change', handleFileSelect, false);
	}
}

function checkRequirements() {
	if (window.FileReader) {
		return true;
	} else {
	  alert('Prohlížeč nepodporuje nahrávání ze souboru. Použij jiný prohlížeč.');
	}
}

function handleFileSelect(evt) {
	var files = evt.target.files;
    var f = files[0];
    var reader = new FileReader();

    let fileName = document.getElementById("page_source-file_name");
    fileName.textContent = f.name;
    fileName.style.display = "block";
     
	reader.onload = (function(theFile) {
	    return function(e) {
    		let prizes = e.target.result.trim().split("\n");
    		let splitPrices = prizes.map(function(item){
    			let line = item.split(",").reverse();
			   return line;
			});
	      	showContent(splitPrices);
	    };
	})(f);

	reader.readAsText(f);
}

function showContent(prizes) {
	let prizesWrapper = document.getElementById("page_prizes");
	prizesWrapper.innerHTML="";
  let template = document.getElementById("prize_template");
  // Get the DIV element from the template:
  let prizeNameElement = template.content.querySelector(".prize");
  // For each item in the array:
  for (let i = 0; i < prizes.length; i++) {
    // Create a new node, based on the template:
    let node = document.importNode(prizeNameElement, true);
    // Add data from the array:
    node.textContent= prizes[i][0];
    if(prizes[i].length ===2) {
    	node.value= prizes[i][1];
    }
    // Append the new node wherever you like:
    prizesWrapper.appendChild(node);
  }
}

function changeColor (element) {
	document.getElementById("app-content").className=element.value;
	
	if (element.selectedIndex == -1) {
        return null;
	}

    document.getElementById("paper-header").textContent = element.options[element.selectedIndex].text;
}