const lsevr = (localStorage.entryVals || '').split(',').reverse();
let lsEV = lsevr.filter(e => e.length > 0);
    // .filter(e => e.length > 0);
let lsE = (localStorage.entries || '').split(',').reverse().filter(e => e.length > 0);
    // .filter(e => e.length > 0).filter((_, i) => (lsevr[i] ?? '').length > 0);
let lsD = (localStorage.date || '').split(',').reverse().filter(e => e.length > 0);
    // .filter(e => e.length > 0).filter((_, i) => (lsevr[i] ?? '').length > 0);

function load(b) {
    if(b) {
        lsEV = lsEV.reverse();
        lsE = lsE.reverse();
        lsD = lsD.reverse();
    }
    
    const fresh = document.querySelectorAll('tr:not(#names)');
    for(const e of fresh) 
        document.querySelector("table").removeChild(e);

    if(localStorage.entries !== '' && localStorage.entries !== ',') {
        lsE.forEach((el, ix, arr) => {  
            const tr = document.createElement('tr');
            const id = document.createElement('td');
            id.classList.add("td", "id");
            id.textContent = arr.length - ix;
            tr.appendChild(id);

            const entry = document.createElement('td');
            entry.classList.add("td");
            entry.textContent = el;
            tr.appendChild(entry);

            const val = document.createElement('td');
            val.classList.add("td");
            val.textContent = lsEV[ix];
            tr.appendChild(val);

            const date = document.createElement('td');
            date.classList.add("td");
            date.textContent = lsD[ix];
            tr.appendChild(date);

            const x = document.createElement('td');
            const i = document.createElement('i');
            i.classList.add('fa-solid', 'fa-rectangle-xmark', 'close', 'fa-xl');
            i.style.opacity = 0;
            i.addEventListener('click', e => {
                const index = +e.target.parentNode.parentNode.querySelector('.id').textContent;
                lsE.splice(lsE.length - index, 1);
                lsEV.splice(lsEV.length - index, 1);
                lsD.splice(lsD.length - index, 1);
                localStorage.entries = lsE.reverse().join(',') + ',';
                localStorage.entryVals = lsEV.reverse().join(',') + ',';
                localStorage.date = lsD.reverse().join(',') + ',';
                load(true);
            });
            x.classList.add("td");
            x.appendChild(i);
            tr.appendChild(x);
            document.getElementById("table").appendChild(tr);
        }); 
    }
    for(const r of Array.from(document.querySelectorAll('tr:not(#names)'))) {
        r.addEventListener("mouseenter", e => {
            e.target.querySelector("i").style.opacity = 1;
        }); r.addEventListener("mouseleave", e => {
            e.target.querySelector("i").style.opacity = 0;
        });
    }
}

load();

const find = document.querySelector("#find");
const shfil = document.querySelector("#shfil");

const hashMin = document.querySelector("#hmin");
const hashMax = document.querySelector("#hmax");

const entrReg = document.querySelector("#ereg");
const entrLit = document.querySelector("#elit");

const valuReg = document.querySelector("#vreg");
const valuLit = document.querySelector("#vlit");

const dateMin = document.querySelector("#dmin");
const dateMax = document.querySelector("#dmax");

const rows = Array.from(document.querySelectorAll("tr:not(#names)")).reverse();

find.addEventListener("click", () => {
    const e = document.querySelector("#err");
    if(entrReg.value.length > 0 && entrLit.value.length > 0 || 
        valuReg.value.length > 0 && valuLit.value.length > 0) {
            e.textContent = "Cannot filter with regex and literal, only one is allowed"
        }

    else {
        try {
            e.textContent = "";
            document.querySelectorAll("tr").forEach(e => e.classList.remove('filt'));
            const entry = entrReg.value ? new RegExp(entrReg.value) : entrLit.value;
            const value = valuReg.value ? new RegExp(valuReg.value) : valuLit.value;
            
            for(let i = +(hashMin.value ? hashMin.value : 1); i <= +(hashMax.value ? hashMax.value : rows.length); i++) {
                const tds = rows[i - 1].querySelectorAll("td:not(.id):not(td:has(i))");
                const eb = (entry.source ? entry.test(tds[0].textContent) : tds[0].textContent === entry) || entry.length === 0;
                const vb = (value.source ? value.test(tds[1].textContent) : tds[1].textContent === value) || value.length === 0;
                const dmn = dateMin.value ? Date.parse(dateMin.value) : 0;
                const dmx = dateMax.value ? Date.parse(dateMax.value) : Infinity;
                const d = tds[2].textContent.split(/[/\s]/);
                const f = e => e.length === 1 ? '0' + e : e;
                const UNIX = Date.parse(`${d[2]}-${f(d[1])}-${f(d[0])}T${d[3]}`);
                const db = dmx >= UNIX && UNIX >= dmn;

                if(eb && vb && db) {
                    rows[i - 1].classList.add('filt');
                } else rows[i - 1].classList.remove('filt');
            }

            shfil.checked = true;
            filterFilter();
        } catch(err) {
            e.textContent = "Invalid regular expression";
        }
    }
});

function select(e) {
    e.target.parentNode.classList.toggle('sel');
}
function move(e) {
    console.log(e.clientX, e.clientY);
}
const smode = document.querySelector("#smode");
smode.addEventListener("change", e => {
    if(e.target.checked) {
        document.querySelectorAll("tr").forEach(e => {
            const i = e.querySelector('i');
            if(i) {
                e.style.userSelect = 'none';
                i.style.display = 'none';
                e.addEventListener('click', select);
            }
        });
        document.querySelector("table").addEventListener("mousedown", e => {
            e.target.addEventListener("mousemove", move);
        }); document.querySelector("table").addEventListener("mouseup", e => {
            e.target.removeEventListener("mousemove", move);
        });
    } else {
        document.querySelectorAll("tr").forEach(e => {
            const i = e.querySelector('i');
            if(i) {
                e.style.userSelect = 'text';
                i.style.display = 'unset';
                e.removeEventListener('click', select);
            }
        });
    }
});

function filterFilter() {
    document.querySelectorAll("tr:not(#names)").forEach(e => {
        if(!e.classList.contains('filt')) {
            e.classList.add('dnone');
        }
    });
}

shfil.addEventListener("change", e => {
    if(e.target.checked) {
        filterFilter();
    } else {
        document.querySelectorAll("tr").forEach(e => {
            e.classList.remove('dnone');
        });
    }
});

const sfil = document.querySelector("#select");
sfil.addEventListener("click", () => {
    document.querySelectorAll("tr:has(i)").forEach(e => {
        if(e.classList.contains('filt')) {
            e.classList.remove('filt');
            e.classList.add('sel');
        }
    });
});

const cfil = document.querySelector("#cfil");
cfil.addEventListener("click", () => {
    document.querySelectorAll("tr:has(i)").forEach(e => {
        if(e.classList.contains('filt')) 
            e.classList.remove('filt');
    });
});

const cfd = document.querySelector("#cfd");
cfd.addEventListener("click", () => {
    document.querySelectorAll("input").forEach(e => e.value = '');
});

const csel = document.querySelector("#csel");
csel.addEventListener("click", () => {
    document.querySelectorAll("tr:has(i)").forEach(e => {
        if(e.classList.contains('sel')) 
            e.classList.remove('sel');
    });
});

const del = document.querySelector("#delete");
del.addEventListener("click", () => {
    document.querySelectorAll("tr:has(i)").forEach(e => {
        if(e.classList.contains('sel')) {
            const index = +e.querySelector('.id').textContent;
            lsE.splice(lsE.length - index, 1);
            lsEV.splice(lsEV.length - index, 1);
            lsD.splice(lsD.length - index, 1);
            localStorage.entries = lsE.reverse().join(',') + ',';
            localStorage.entryVals = lsEV.reverse().join(',') + ',';
            localStorage.date = lsD.reverse().join(',') + ',';
        }
    });
    load(true);
});

const delf = document.querySelector("#dfil");
delf.addEventListener("click", () => {
    document.querySelectorAll("tr:has(i)").forEach(e => {
        if(e.classList.contains('filt')) {
            const index = +e.querySelector('.id').textContent;
            lsE.splice(lsE.length - index, 1);
            lsEV.splice(lsEV.length - index, 1);
            lsD.splice(lsD.length - index, 1);
            localStorage.entries = lsE.reverse().join(',') + ',';
            localStorage.entryVals = lsEV.reverse().join(',') + ',';
            localStorage.date = lsD.reverse().join(',') + ',';
        }
    });
    load(true);
});