window.onload =_=>{
    var lsEV = localStorage.entryVals.split(',').reverse();
    var lsE = localStorage.entries.split(',').reverse();
    var lsD = localStorage.date.split(',').reverse();
    lsEV.shift();
    lsE.shift();
    lsD.shift();

    if(localStorage.entries != "") {
        lsE.forEach((el, ix, arr) => {  
            var tr = document.createElement('tr');
            var id = document.createElement('td');
            id.id = "td";
            id.innerHTML = arr.length - ix;
            tr.appendChild(id);

            var entry = document.createElement('td');
            entry.id = "td";
            entry.innerHTML = el;
            tr.appendChild(entry);

            var val = document.createElement('td');
            val.id = "td";
            val.innerHTML = lsEV[ix];
            tr.appendChild(val);

            var date = document.createElement('td');
            date.id = "td";
            date.innerHTML = lsD[ix];
            tr.appendChild(date);

            var x = document.createElement('td');
            x.style.width = "0px";
            var img = document.createElement("img");
            img.src = "error.png";
            img.width = "15";
            img.height = "15";
            img.alt = "Delete";
            img.style.visibility = "hidden";
            img.id = "close";
            x.id = "td";
            x.appendChild(img);
            tr.appendChild(x);
            document.getElementById("table").appendChild(tr);
        }); 
    }

    var allTRS = document.getElementsByTagName("tr");
    for(let tr of allTRS) {
        tr.addEventListener("mouseenter", _=>{
            tr.querySelector("#close").style.visibility = "visible";
        });
        tr.addEventListener("mouseleave", _=>{
            tr.querySelector("#close").style.visibility = "hidden";
        });
    }
}