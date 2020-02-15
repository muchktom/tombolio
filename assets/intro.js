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
          showContent(prizes);
      };
  })(f);

  reader.readAsText(f);
}

function showContent(items) {
  let itemsWrapper = document.getElementById("page_prizes");
  itemsWrapper.innerHTML="";
  let categoryTemplate = document.getElementById("category_template").content.querySelector(".item");
  let itemTemplate = document.getElementById("item_template").content.querySelector(".item");
  // For each item in the array:
  for (let i = 0; i < items.length; i++) {
    let node;
    if (items[i].startsWith("#")) {
      items[i]=items[i].substr(1);
      node = document.importNode(categoryTemplate, true);
    }
    else {
      node = document.importNode(itemTemplate, true);
    }
    // Add data from the array:
    node.textContent= items[i];
    // Append the new node wherever you like:
    itemsWrapper.appendChild(node);
  }
}