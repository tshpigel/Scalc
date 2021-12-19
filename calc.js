const bar = document.getElementById("bar");
const max = 2e5 - 20;
let lss = new Blob(Object.values(localStorage)).size;
var timesClickedAfterEvaluation = 0;
var extra = document.getElementById('extra');
var extraObj = {};
let proxEOBJ = new Proxy(extraObj, {
    set: (t, p, v) => {
        t[p] = v;
        let extraMarkup = "";
        Object.values(t).forEach(e => {
            extraMarkup += e + "  ";
        });
        extra.innerHTML = extraMarkup;
    }
});

function reset() {
    clearTimeout(this.downTimer);
}

bar.focus();
function input() {
    bar.focus();
}
document.body.addEventListener("click", input);

function limit(num) {
    let numStr = [...num.toString()];
    var max = 14;
    if(numStr.length > max) {
        num = num.toPrecision(max);
    }
    return num;
}

function fadeOut(id) {
    let interval = setInterval(_=>{
        if(document.getElementById(id).style.opacity > 0) {
            document.getElementById(id).style.opacity -= 0.1;
        } else clearInterval(interval);
    }, 120);
}

function formatKP(num) {
    return num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
}

function decCount(num) {
    let s = String(num).split('\.');
    return s[1] ? s[1].length : 0;
}

var memory = 0;
var inputIndex;
var lsEA = (localStorage.entries) ? localStorage.entries.split(',') : [];
var ans = (localStorage.entryVals) ? localStorage.entryVals.split(',')[localStorage.entryVals.split(',').length - 2] : null;
var deg = true;
var exact = false;
var err = document.getElementById('errtext');
var fixed = 2;
const SIP = document.getElementById('SIP');
var deg_rad = document.getElementById("deg_rad");
var exc_rnd = document.getElementById('exc_rnd');

function ansEntry() {
    document.getElementById('ans').onclick = null;
    bar.disabled = true;
    document.querySelectorAll("button:not(#entries):not(#resetC):not(#exit)").forEach(e => {
        e.disabled = true;
    });
}

function ansEntries() {
    let reference = document.getElementById('ans').onclick;
    clearTimeout(this.downTimer);
    this.downTimer = setTimeout(_=>{
        document.getElementById('ansEntriesCont').style.visibility = "visible";
        document.getElementById('ans').addEventListener("mouseup", ansEntry);
        document.getElementById('resetC').addEventListener("click", _=>{
            localStorage.removeItem("entries");
            localStorage.removeItem("entryVals");
            localStorage.removeItem("date");
            document.getElementById('eClear').style.opacity = 1;
            fadeOut('eClear');
            document.getElementById('entryLeft').innerHTML = "Max vacant entries";
        });
    }, 1000);
    document.getElementById('ans').removeEventListener("mouseup", ansEntry);
    document.getElementById('exit').addEventListener("click", _=>{
        document.getElementById('ans').onclick = reference;
        bar.disabled = false;
        document.querySelectorAll("button:not(#entries):not(#resetC):not(#exit)").forEach(e => {
            e.disabled = false;
        });
        document.getElementById('ansEntriesCont').style.visibility = "hidden";
    });
}
document.getElementById("ans").addEventListener("mousedown", ansEntries);
document.getElementById("ans").addEventListener("mouseup", reset);

function getEntries() {
    let amountLeft = max - lss;
    let avg = 0;
    lsEA.forEach(el => {
        avg += el.length;
    });
    avg /= lsEA.length;
    var entriesLeft = Math.round(amountLeft / avg);

    if(!Number.isInteger(entriesLeft)) {
        document.getElementById('entryLeft').innerHTML = "Max vacant entries";
    } else document.getElementById('entryLeft').innerHTML = formatKP(entriesLeft) + " vacant entries";
    
}
getEntries();

var sinstr = 'sinReal', cosstr = 'cosReal', tanstr = 'tanReal', 
asinstr = 'asinReal', acosstr = 'acosReal', atanstr = 'atanReal';

function degRad() {
    if(deg == true) {
        deg = false;
        document.getElementById('deg_rad').innerHTML = "DEG";
        proxEOBJ.rad = "RAD";
    } else {
        deg = true;
        document.getElementById('deg_rad').innerHTML = "RAD";
        proxEOBJ.rad = "";
    }
    sinstr = deg == false ? "Math.sin" : "sinReal";
    cosstr = deg == false ? "Math.cos" : "cosReal";
    tanstr = deg == false ? "Math.tan" : "tanReal";

    asinstr = deg == false ? "Math.asin" : "asinReal";
    acosstr = deg == false ? "Math.acos" : "acosReal";
    atanstr = deg == false ? "Math.atan" : "atanReal";
} 
deg_rad.addEventListener("click", degRad);

function fixChoice() {
    let reset = document.getElementById("resetB");
    let reference = document.getElementById('exc_rnd');
    if(exact == false) return;
    else {
        clearTimeout(this.downTimer);
        this.downTimer = setTimeout(_=>{
            document.getElementById('exc_rndChoiceCont').style.visibility = "visible";
            exc_rnd.addEventListener("mouseup", FCev);
            fix.addEventListener("keypress", _=>{
                reset.visibility = "visible";
            });
            reset.addEventListener("click", _=>{
                fix.value = 2;
                reset.visibility = "hidden";
            });
        }, 1000);
        exc_rnd.removeEventListener("mouseup", FCev);
        document.getElementById('saveB').addEventListener("click", _=>{
            if(fix.value >= 0 && fix.value <= 6) {
                exc_rnd.innerHTML = "ROUND";
                exc_rnd.onclick = reference;
                bar.disabled = false;
                document.querySelectorAll("button:not(#saveB):not(#resetB)").forEach(el => {
                    el.disabled = false;
                });
                document.querySelector('#exc_rndChoiceCont').style.visibility = "hidden";
                reset.style.visibility = "hidden";
                fixed = fix.value;
            }
        });
    }
}

function excRnd() {
    if(exact == true) {
        exc_rnd.innerHTML = "ROUND";
        if(bar.value == ans && decCount(ans) > 2) {
            bar.value = ans.toFixed(fixed);
        }
        exact = false;
        proxEOBJ.exc_rnd = "";
    } else {
        exc_rnd.innerHTML = "EXACT";
        exact = true;
        proxEOBJ.exc_rnd = "FIX "+fixed;
    }
}
exc_rnd.addEventListener("click", excRnd);
exc_rnd.addEventListener("mousedown", fixChoice);
exc_rnd.addEventListener("mouseup", reset);
function FCev() {
    document.getElementById('exc_rnd').onclick = null;
    bar.disabled = true;
    document.querySelectorAll("button:not(#saveB):not(#resetB)").forEach(e => {
        e.disabled = true;
    });
}

var fix = document.getElementById('fixChoice');

bar.addEventListener("click", e => {
    inputIndex = e.target.selectionStart;
});

var mutableSeriesConfigSettings = {
    start : 1,
    type : 'arithmetic',
    difference_ratio : 1
}; 
const defaultSeriesConfigSettings = {
    start : 1,
    type : 'arithmetic',
    difference_ratio : 1
}

function brackForClick(ix, str, add) {
    str = [...str];
    str.splice(ix + 1, 0, add).join('');
    return str.join('');
}

function mc() {
    memory = 0;
    bar.value = "";
} function mp() {
    if(!isNaN(bar.value)) {
        memory += Number.parseFloat(bar.value);
        bar.value = "";
    }
} function mm() {
    if(!isNaN(bar.value)) {
        memory -= Number.parseFloat(bar.value);
        bar.value = "";
    }
} function mr() {
    bar.value = memory;
}

document.getElementById('mc').addEventListener("click", mc);
document.getElementById('mp').addEventListener("click", mp);
document.getElementById('mm').addEventListener("click", mm);
document.getElementById('mr').addEventListener("click", mr);

var smalls = document.getElementsByClassName("small"), nbs = document.getElementsByClassName("nb"), size = smalls.length;
var timesActivated = 0;
var sndactive = false;

function sndAction() {
    timesActivated++;
    if(timesActivated & 1 == 1) {
        proxEOBJ.snd = "2ND";
        for(var i = 0; i < size; i++) {
            smalls[i].style.opacity = 1;
            smalls[i].style.fontWeight = 600;
            smalls[i].style.color = "#b8e994";
            nbs[i].style.opacity = 0.3;
        }

        sndactive = true;
        document.getElementById('sndsub').style.opacity = 1;
        document.getElementById('sndsub').style.fontWeight = 600;
    } else {
        proxEOBJ.snd = "";
        for(var i = 0; i < size; i++) {
            smalls[i].style.opacity = 0.6;
            smalls[i].style.fontWeight = 400;
            smalls[i].style.color = "#000";
            nbs[i].style.opacity = 1;
        }

        sndactive = false;
        document.getElementById('sndsub').style.opacity = 0.6;
        document.getElementById('sndsub').style.fontWeight = 400;
    }
}

function sndfnc() {
    sndAction();
} 
document.getElementById("sndb").addEventListener("click", sndfnc);

function SIPev() {
    SIP.onclick = null;
    bar.disabled = true;
    document.querySelectorAll("button:not(.ser):not(#save):not(#reset)").forEach(el => {
        el.disabled = true;
    });
}

function config() {
    var reset = document.getElementById('reset');
    var reference = SIP.onclick;
    if(sndactive == false) return;
    else {
        clearTimeout(this.downTimer);
        this.downTimer = setTimeout(_=>{
            var ari = document.getElementById('ari');
            var geo = document.getElementById('geo');
            var jsonDef = JSON.stringify(defaultSeriesConfigSettings);
            if(jsonDef === JSON.stringify(mutableSeriesConfigSettings)) {
                reset.style.visibility = "hidden";
            } else reset.style.visibility = "visible";
            document.getElementById('serConfigCont').style.visibility = "visible";
            SIP.addEventListener("mouseup", SIPev);
            ari.addEventListener("click", _=>{
                geo.style.opacity = 0.5;
                ari.style.opacity = 1;
                mutableSeriesConfigSettings.type = "arithmetic";
                if(JSON.stringify(mutableSeriesConfigSettings) === jsonDef) {
                    reset.style.visibility = "hidden";
                }
                document.getElementById('diffh2').innerHTML = "Difference";
            }); geo.addEventListener("click", _=>{
                geo.style.opacity = 1;
                ari.style.opacity = 0.5;
                mutableSeriesConfigSettings.type = "geometric";
                reset.style.visibility = "visible";
                document.getElementById('diffh2').innerHTML = "Ratio";
            });
            document.getElementById('stval').addEventListener("keyup", _=>{
                mutableSeriesConfigSettings.start = document.getElementById('stval').value;
                if(JSON.stringify(mutableSeriesConfigSettings) !== jsonDef) {
                    reset.style.visibility = "visible";
                } else reset.style.visibility = "hidden";
            }); document.getElementById('diff').addEventListener("keyup", _=>{
                mutableSeriesConfigSettings.difference_ratio = document.getElementById('diff').value;
                if(JSON.stringify(mutableSeriesConfigSettings) !== jsonDef) {
                    reset.style.visibility = "visible";
                } else reset.style.visibility = "hidden";
            });

            reset.addEventListener("click", _=>{
                mutableSeriesConfigSettings = defaultSeriesConfigSettings;
                geo.style.opacity = 0.5;
                ari.style.opacity = 1;
                document.getElementById('stval').value = 1;
                document.getElementById('diff').value = 1;
                reset.style.visibility = "hidden";
            });
        }, 1000);
        SIP.removeEventListener("mouseup", SIPev);
        document.getElementById('save').addEventListener("click", _=>{
            SIP.onclick = reference;
            bar.disabled = false;
            document.querySelectorAll("button:not(.ser):not(#save):not(#reset)").forEach(el => {
                el.disabled = false;
            });
            document.querySelector('#serConfigCont').style.visibility = "hidden";
            reset.style.visibility = "hidden";
        });
    }
} 
SIP.addEventListener("mousedown", config);
SIP.addEventListener("mouseup", reset);

function setValue(v) {
    let inputIx = bar.selectionStart;
    function template(dset, attr) {
        let i = Number(dset);
        let a = inputIx + i;
        bar.value = brackForClick(inputIx - 1, bar.value, v.getAttribute(attr));
        bar.setSelectionRange(a, a);
    }
    if(sndactive == false || sndactive == true && !v.hasAttribute("data-specVal")) {
        template(v.dataset.valix, "data-val");
    } else if (sndactive == true && v.hasAttribute("data-specVal")) {
        template(v.dataset.specvalix, "data-specval");
    } 
}

document.querySelectorAll(".val").forEach(n => {
    n.addEventListener("click", () => {
        setValue(n);
    });
});

function gamma(z) {
    return Math.sqrt(2 * Math.PI / z) * Math.pow((1 / Math.E) * (z + 1 / (12 * z - 1 / (10 * z))), z);
}

function fac(num) {
    if(Number.isInteger(num)) {
        return Math.round(gamma(num + 1))
    } else return(gamma(num + 1));
} function series(a, dor, n, type) {
    if(!Number.isInteger(n) || n < 1) {
        return false;
    } else  {
        if(type == 'arithmetic') {
            return (n / 2) * (2 * a + dor * (n - 1));
        } else if (type == 'geometric') {
            return (a * (1 - dor ** n)) / (1 - dor);
        }
    }
}

document.getElementById('cac').addEventListener("click", function() {
    bar.value = "";
});

var add = {
    conversion : "+",
    select : false
}; var sub = {
    conversion : "-",
    select : false
}; var mul = {
    conversion : "*",
    select : false
}; var div = {
    conversion : "/",
    select : false
}; var dot = {
    conversion : "."
}

let simpleOper = {
    "+" : add, 
    "-" : sub,
    "×" : mul,
    "÷" : div,
    "." : dot
};

function close(num) {
	let rgxi = new RegExp("\.49");
    let rgx9 = new RegExp("\.9{10}");
    let rgx0 = new RegExp("\.0{10}");
    if (rgxi.test(num.toString()) && rgx9.test(num.toString())) return undefined;
    else if(rgx9.test(num.toString()) || rgx0.test(num.toString())) return true;
    else return false;
}

function sinReal(val) {
	var main = Math.sin(val * Math.PI / 180);
	if(close(main)) return Math.round(main);
    else if (close(main) == undefined) return 0.5; 
    else if(main < 1e-12) return 0;
    else return main;
} function cosReal(val) {
	var main = Math.cos(val * Math.PI / 180);
	if(close(main)) return Math.round(main);
    else if (close(main) == undefined) return 0.5; 
    else if(main < 1e-12) return 0;
    else return main;
} function tanReal(val) {
    var main = Math.tan(val * Math.PI / 180);
	if(close(main)) return Math.round(main);
    else if (close(main) == undefined) return 0.5; 
    else return main;
}

function asinReal(val) {
    var main = Math.asin(val) / Math.PI * 180;
	if(close(main)) return Math.round(main);
    else if (close(main) == undefined) return 0.5; 
    else return main;
} function acosReal(val) {
    var main = Math.acos(val) / Math.PI * 180;
	if(close(main)) return Math.round(main);
    else if (close(main) == undefined) return 0.5; 
    else return main;
} function atanReal(val) {
    var main = Math.atan(val) / Math.PI * 180;
	if(close(main)) return Math.round(main);
    else if (close(main) == undefined) return 0.5; 
    else return main; 
}

function ser2(num) {
    const { start:st, type:ty, difference_ratio:dr } = mutableSeriesConfigSettings;
    return series(st, dr, num, ty);
}

function calcEuler() {
    let eArray = [];
    for(let i = 0; i < 50; i++) {
        eArray.push(1 / fac(i));
    }
    return eArray.reduce((t, n) => { return t + n; });
}

function __proto__DeprecationWarning(message = "") {
    this.name = "__proto__DeprecationWarning";
    this.message = message;
}
__proto__DeprecationWarning.prototype = Error.prototype;

if(Math.__proto__) {
    Math.__proto__.euler = function() {
        return calcEuler();
    };
} else {
    console.log("cannot calculate euler's number");
}
var euler = Math.__proto__ ? Math.euler() : new __proto__DeprecationWarning("Euler's number cannot be calculated");

let pieE, root, facSpec, frac, sin, cos, tan, exponent, lnexp, logE;
var blockArr = [root, sin, cos, tan, lnexp, logE];

function getKeyByValue(obj, val) {
    return Object.keys(obj).find(k => {
        obj[k] === val
    });
}

function evaluate(string) {
    const rgxVal = "(\\d+|\\d+\\.\\d+|\\(.*\\))";

    pieE = {
        conversion : "Math.PI",
        variable : "var",
        snd : {
            conversion : "euler",
            variable : "var"
        }
    }; root = {
        conversion : "Math.sqrt",
        block : "√(",
        variable : "var",
        snd : {
            conversion : "Math.pow($2, 1 / $1)",
            special : true,
            bracket : true,
            block : "n√("
        }
    }; facSpec = {
        conversion : "fac($1)",
        special : true,
        bracket : true,
        snd : {
            conversion : "ser2($1)",
            bracket : true
        }
    }; frac = {
        conversion : "/100",
        snd : {
            conversion : "1/$1",
            special : true
        } 
    }; sin = {
        conversion : sinstr,
        block : "sin(",
        variable : "var",
        snd : {
            conversion : asinstr,
            block : "arcsin(",
            variable : "var"
        }
    }; cos = {
        conversion : cosstr,
        block : "cos(",
        variable : "var",
        snd : {
            conversion : acosstr,
            block : "arccos(",
            variable : "var"
        }
    }; tan = {
        conversion : tanstr,
        block : "tan(",
        variable : "var",
        snd : {
            conversion : atanstr,
            block : "arctan(",
            variable : "var"
        }
    }; logE = {
        conversion : "Math.log10",
        variable : "var",
        block : "log(",
        snd : {
            conversion : "1e",
            variable : "var"
        }
    }; exponent = {
        conversion : "Math.pow($1, $2)",
        special : true,
    }; lnexp = {
        conversion : "Math.log",
        variable : "var",
        block : "ln(",
        snd : {
            conversion : "Math.exp",
            variable : "var",
            block : "exp("
        }
    }

    const {conversion : PIa, variable : PIb, snd : PIc} = pieE;
    const {conversion : Ra, snd : Rb} = root;
    const {conversion : FSa, bracket : FSb, snd : FSc} = facSpec;
    const {conversion : Fa, snd : Fb} = frac;
    const {conversion : Sa, word : Sb, variable : Sc, snd : Sd} = sin;
    const {conversion : Ca, word : Cb, variable : Cc, snd : Cd} = cos;
    const {conversion : Ta, word : Tb, variable : Tc, snd : Td} = tan;
    const {conversion : Pa} = exponent;
    const {conversion : La, word : Lb, variable : Lc, snd : Ld} = logE;
    const {conversion : LNa, variable : LNb, word : LNc, snd : LNd} = lnexp;

    let sndOper = {
        "π" : [PIa, PIb], 
        "e(?!xp)" : PIc,

        "(?<!n)√" : Ra, 
        [rgxVal + "n√\\(" + rgxVal + "\\)"] : Rb,

        [rgxVal + "\!"] : [FSa, FSb], 
        ["S" + rgxVal] : FSc,
        
        "%" : Fa, 
        ["1/" + rgxVal] : Fb,

        "(?<!arc)sin" : [Sa, Sb, Sc], 
        "arcsin" : Sd,

        "(?<!arc)cos" : [Ca, Cb, Cc], 
        "arccos" : Cd,

        "(?<!arc)tan" : [Ta, Tb, Tc], 
        "arctan" : Td,

        [rgxVal + "\\^" + rgxVal] : Pa,

        "log" : [La, Lb, Lc],
        "E" : Ld,

        "ln" : [LNa, LNb, LNc],
        "exp" : LNd
    };

    let str = '';
    for(let t of string) {
    	if(t in simpleOper) t = simpleOper[t].conversion;
        str += t;
    }
    
    function serr(v) {
        str = str.replace(rgx, v);
    }

    if(ans != null) {
        let rgx = new RegExp("Ans", 'g');
        str = str.replace(rgx, ans);
    }
    
    for(let k in sndOper) {
        var val = sndOper[k];
        var rgx = new RegExp(k, 'g');
        var brackRGX = new RegExp("\\)" + rgxVal);
        if(rgx.test(str)) {
            if((Array.isArray(val) ? val : []).indexOf('var') > -1) {
                let ix = str.search(new RegExp(rgxVal + "(?!\\*)" + k));
                while(ix >= 0) {
                    str = brackForClick(ix, str, "*");
                    ix = str.search(new RegExp(rgxVal + "(?!\\*)" + k));
                }
            }
            while(brackRGX.test(str)) {
                str = brackForClick(str.search(brackRGX, str), str, "*");
            }
            if(Array.isArray(val)) serr(val[0]);
            else {
                if(val.conversion == undefined) {
                    serr(val);
                } else serr(val.conversion);
            }
        } 
    }

    if(exact == false) {
        return limit(eval(str));
    } else {
        return eval(str).toFixed(fixed);
    }
}

function evalSet() {
    timesClickedAfterEvaluation = 0;
    if(lss < max) {
        if(!localStorage.entries) {
            localStorage.entries = bar.value+",";
        } else localStorage.entries += bar.value+",";
        
        bar.value = evaluate(bar.value);
        ans = evaluate(bar.value); 
        if(!localStorage.entryVals) {
            localStorage.entryVals = ans.toString()+",";
        } else localStorage.entryVals += ans.toString()+",";

        var time = new Date();
        var day = time.getDate();
        var month = time.getMonth() + 1;
        var year = time.getFullYear();
        var hour = time.getHours();
        var minute = time.getMinutes();

        function add0(variable) {
            return (variable.toString().length == 1) ? "0"+variable : variable;
        }

        if(!localStorage.date) {
            localStorage.date = `${day}/${month}/${year} ${add0(hour)}:${add0(minute)},`.toString();
        } else {
            localStorage.date += `${day}/${month}/${year} ${add0(hour)}:${add0(minute)},`.toString();
        }

        getEntries();
    } else {
        var farvA = [...localStorage.entryVals.split(',', 1)[1]].push(ans.toString());
        var farnvA = [...localStorage.entries.split(',', 1)[1]].push(bar.value);
        
        localStorage.entries = farvA.join(',');
        localStorage.entryVals = farnvA.join(',');

        err.innerHTML = "No more space for answer entries";
        document.getElementById('entryLeft').innerHTML = "0 vacant entries";
    }
}

function equ() {
    evalSet();
}
document.getElementById("equb").addEventListener("click", equ);

var digKeyCodeArr = [];

for(let i = 0; i < 9; i++) {
    digKeyCodeArr.push(i+48);
}

var keyCodeList = [6, 13, 33, 37, 40, 42, 43, 45, 46, 47, ...digKeyCodeArr, 61, 64, 69, 76, 83, 94, 97, 99, 101, 108, 110, 112];
var operArr = [...Object.keys(simpleOper), "^"];
var fullBlockArr = [];
for(let el of blockArr) {
    if(el != logE) {
        fullBlockArr.push(el.block, el.snd.block);
    } else fullBlockArr.push(logE?.block);
}

bar.addEventListener("paste", e => {
    e.preventDefault();
});

bar.addEventListener("keypress", ev => {
    if(keyCodeList.indexOf(ev.keyCode) > -1) {
        timesClickedAfterEvaluation++;
    }

    function operIsThere() {
        let bool;
        if(operArr.indexOf(bar.value[ev.target.selectionStart - 1]) > -1) {
            bool = true;
        } else {
            bool = false;
        }
        return bool;
    }

    function type(s, i) {
        let inputIx = ev.target.selectionStart;
        bar.value = brackForClick(inputIx - 1, bar.value, s);
        bar.setSelectionRange(inputIx + i, inputIx + i);
        inputIndex += i;
    }
    
    function superType(char) {
        function ansSuperTypeTemplate() {
            type("Ans"+char, 4);
        }
        if(bar.value == '' || timesClickedAfterEvaluation == 1) {
            if(ans != null) ansSuperTypeTemplate();
            if(timesClickedAfterEvaluation == 1 && bar.value != '') {
                bar.value = '';
                ansSuperTypeTemplate();
            }
        } else type(char, 1);
    } 

    function checkPos(str, ix, pos, rgx, fnc) {
        let check;
        console.log("plx");
        function template(val, pom) {
            check = val;
            if(check === rgx) {
                let rla3s = [];
                switch(pom) {
                    case "+":
                        rla3s = [str.selectionStart, str.selectionStart + rgx.length];
                    case "-":
                        rla3s = [str.selectionStart - rgx.length, str.selectionStart];
                    default:
                        console.log("Not valid input");
                }
                fnc(rla3s);
            } else console.log('whfyugkwhr');
        }
        let part;
        switch(pos) {
            case "r":
                part = str.substring(ix, rgx.length);
                template(part, "+");
                break;
            case "l":
                part = str.substring(0, ix);
                template(part, "-");
                break;
            default: 
                console.log("Not a valid position. Left (l) and right (r) are the options.");
        }
    }

    function arrowPossibilities(type) {
        for(el of fullBlockArr) {
            checkPos(bar.value, bar.selectionStart, type, el, function(R) {
                console.log(R);
            });
        }
    }

    switch(ev.key) {
        case "c":
            ev.preventDefault();
            bar.value = "";
            break;

        case "p":
            ev.preventDefault();
            type("π", 1);
            break;

        case "a":
            ev.preventDefault();
            if(ans == null) bar.value += "";
            else type("Ans", 3);
            break;

        case "(":
            ev.preventDefault();
            type("()", 1);
            break;

        case "s":
            ev.preventDefault();
            if(sndactive == false) type("sin()", 4);
            else type("arcsin()", 7);
            break;

        case "t":
            ev.preventDefault();
            if(sndactive == false) type("tan()", 4);
            else type("arctan()", 7);
            break;

        case "C":
            ev.preventDefault();
            if(sndactive == false) type("cos()", 4);
            else type("arccos()", 7);
            break;

        case "*":
            ev.preventDefault();
            if(!operIsThere())
                superType("×");
            break;

        case "/":
            ev.preventDefault();
            if(!operIsThere())
                superType("÷");
            break;

        case "=":
            ev.preventDefault();
            evalSet();
            break;

        case "Enter":
            ev.preventDefault();
            evalSet();
            break;

        case "l":
            ev.preventDefault();
            type("log()", 4);
            break;

        case "S":
            ev.preventDefault();
            type("S", 1);
            break;

        case "@":
            ev.preventDefault();
            sndAction();
            break;

        case "+":
            ev.preventDefault();
            if(!operIsThere())
                superType("+");
            break;

        case "-":
            ev.preventDefault();
            if(!operIsThere())
                superType("-");
            break;

        case "r":
            ev.preventDefault();
            type("√()", 2);
            break;

        case "0":
            ev.preventDefault();
            type("0", 1);
            break;

        case "1":
            ev.preventDefault();
            type("1", 1);
            break;

        case "2":
            ev.preventDefault();
            type("2", 1);
            break;

        case "3":
            ev.preventDefault();
            type("3", 1);
            break;

        case "4":
            ev.preventDefault();
            type("4", 1);
            break;

        case "5":
            ev.preventDefault();
            type("5", 1);
            break;

        case "6":
            ev.preventDefault();
            type("6", 1);
            break;

        case "7":
            ev.preventDefault();
            type("7", 1);
            break;

        case "8":
            ev.preventDefault();
            type("8", 1);
            break;

        case "9":
            ev.preventDefault();
            type("9", 1);
            break;

        case "e":
            ev.preventDefault();
            type("e", 1);
            break;

        case "E":
            ev.preventDefault();
            type("E", 1);
            break;

        case "!":
            ev.preventDefault();
            superType("!");
            break;
            
        case "^":
            ev.preventDefault();
            if(!operIsThere())
                superType("^");
            break;

        case ".":
            ev.preventDefault();
            if(!operIsThere())
                superType(".");
            break;

        case "L":
            ev.preventDefault();
            type("ln()", 3);
            break;

        case "%":
            ev.preventDefault();
            superType("%");
            break;

        case "n":
            ev.preventDefault();
            type("n√()", 3);
            break;

        case "x":
            ev.preventDefault();
            type("exp()", 4);
            break;
        

        case "ArrowLeft":
            arrowPossibilities("l");
            break;
        
        case "ArrowRight":
            arrowPossibilities("r");
            break;

        default:
            ev.preventDefault();
    }
}); 

function neg() {
    if(!isNaN(bar.value)) {
        bar.value = bar.value * -1;
    }
}
document.getElementById("top").addEventListener("click", neg);

function sendToEntries() {
    window.open('entries.html');
}
document.getElementById("entries").addEventListener("click", sendToEntries);