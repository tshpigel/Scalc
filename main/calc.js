// declarations

const max = 3e5;
const lss = new Blob(Object.values(localStorage)).size;
const extraObj = {};
const allowedPlusChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'A', 'Backspace', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
const lsEA = (localStorage.entries) ? localStorage.entries.split(',') : [];
const LSF = prop => (localStorage[prop] || '').split(',').filter(e => e.length > 0);
let lsEV = LSF("entryVals");
let lsE = LSF("entries");
let lsD = LSF("date");
const LS = [lsEV, lsE, lsD];
const init = LS.map(e => e.length).sort()[0];
for(let L of LS) L = L.slice(0, init);
localStorage.entryVals = lsEV.join(',') + ',';
localStorage.entries = lsE.join(',') + ',';
localStorage.date = lsD.join(',') + ',';
const ansRgx = /Ans\((\d+)\)/i;
const digKeyCodeArr = Array.from({ length: 9 }, (_, i) => i + 48);
const defaultSeriesConfigSettings = {
    start : "1",
    type : 'arithmetic',
    difference_ratio : "1"
};
let mutableSeriesConfigSettings = {
    start : "1",
    type : 'arithmetic',
    difference_ratio : "1"
}; 
let ans = (localStorage.entryVals) ? localStorage.entryVals.split(',')[localStorage.entryVals.split(',').length - 2] : null;
let memory = 0;
let inputIndex;
let deg = true;
let exact = false;
let sbef = false;
let nbef = false;
let obef = false;
let errMode = false;
let expr = '';
let ePos = 0;
let fixed = 2;
let logBase = 10;
let seqErr = false;
let logErr = false;
let blinkingCursor = false;
let timesClickedAfterEvaluation = 0;
let timesActivated = 0;
let sndactive = false;
let sinstr = 'SinReal', cosstr = 'CosReal', tanstr = 'TanReal', 
    asinstr = 'aSinReal', acosstr = 'aCosReal', atanstr = 'aTanReal';

const bar = document.querySelector("#bar");
const extra = document.querySelector('#extra');
const ansE = document.querySelector("#ans");
const del = document.querySelector("#del");
const copy = document.querySelector("#copy");
const copyResult = document.querySelector("#copyCont span");
// const paste = document.querySelector("#paste");
// const pasteResult = document.querySelector("#pasteCont span");
const stval = document.querySelector('#stval');
const serDiff = document.querySelector('#diff');
const SIP = document.querySelector('#SIPower');
const LogE = document.querySelector('#logE');
const deg_rad = document.querySelector("#deg_rad");
const exc_rnd = document.querySelector('#exc_rnd');
const AEC = document.querySelector('#ansEntriesCont');
const resetC = document.querySelector("#resetC");
const entries = document.querySelector("#entries");
const eClear = document.querySelector("#eClear");
const eLeft = document.querySelector('#entryLeft');
const exit = document.querySelector('#exit');
const reset = document.querySelector("#reset");
const resetB = document.querySelector("#resetB");
const ercc = document.querySelector('#exc_rndChoiceCont');
const save = document.querySelector('#save');
const saveB = document.querySelector('#saveB');
const saveD = document.querySelector('#saveD');
const bnsbnrb = document.querySelectorAll("button:not(#saveB):not(#resetB)");
const bnsdnrd = document.querySelectorAll("button:not(#saveD):not(#resetD)");
const smalls = document.querySelectorAll(".small"), nbs = document.querySelectorAll(".nb"), size = smalls.length;
const fix = document.querySelector('#fixChoice');
const sndsub = document.querySelector('#sndsub');
const ari = document.querySelector('#ari');
const geo = document.querySelector('#geo');
const scc = document.querySelector('#serConfigCont');
const diffh2 = document.querySelector('#diffh2');
const baseSub = document.querySelector("#baseSubSer");
const baseSubPopup = document.querySelector('#baseSubPopup');
const resetD = document.querySelector('#resetD');
const logInput = document.querySelector('#baseChoice');
const lbc = document.querySelector("#logBaseCont");
const bnenrne = document.querySelectorAll("button:not(#entries):not(#resetC):not(#exit)");
const bnsnsnr = document.querySelectorAll("button:not(.ser):not(#save):not(#reset)");
const arrows = [document.querySelector(".ar"), document.querySelector(".al")];

const add = {
    conversion : "+",
    select : false
}; const sub = {
    conversion : "-",
    select : false
}; const mul = {
    conversion : "*",
    select : false
}; const div = {
    conversion : "/",
    select : false
}; const dot = {
    conversion : "."
}; const simpleOper = {
    "+" : add, 
    "-" : sub,
    "×" : mul,
    "÷" : div,
    "." : dot
};
const keyCodeList = [6, 13, 33, 37, 40, 42, 43, 45, 46, 47, ...digKeyCodeArr, 61, 64, 69, 76, 83, 94, 97, 99, 101, 108, 110, 112];
const operArr = [...Object.keys(simpleOper), "^"];

const pieE = {
    conversion : "pi",
    variable : "b",
    snd : {
        conversion : "euler",
        variable : "b"
    }
}; const root = {
    conversion : "sqr",
    block : "√(",
    variable : "l",
    fnc : true,
    snd : {
        conversion : "pow($2,1/$1)",
        block : "n√(",
        fnc : true
    }
}; const facPerc = {
    conversion : "fac($1)",
    fnc : true,
    variable : 's',
    snd : {
        conversion : "/100",
        variable : 'r'
    }
}; const permsAndCombs = {
    conversion : "co($1,$2)",
    fnc : true,
    snd : {
        conversion : "pe($1,$2)",
        fnc : true
    } 
}; const sin = {
    conversion : sinstr,
    block : "sin(",
    variable : "l",
    fnc : true,
    snd : {
        conversion : asinstr,
        block : "arcsin(",
        variable : "l",
        fnc : true
    }
}; const cos = {
    conversion : cosstr,
    block : "cos(",
    variable : "l",
    fnc : true,
    snd : {
        conversion : acosstr,
        block : "arccos(",
        variable : "l",
        fnc : true
    }
}; const tan = {
    conversion : tanstr,
    block : "tan(",
    variable : "l",
    fnc : true,
    snd : {
        conversion : atanstr,
        block : "arctan(",
        variable : "l",
        fnc : true
    }
}; const logE = {
    conversion : 'loga($2)',
    variable : "l",
    block : "log(",
    fnc : true,
    snd : {
        conversion : "ET",
        variable : "l"
    }
}; const expoSpec = {
    conversion : "pow($1,$2)",
    snd : {
        conversion : "seq($1)",
        variable : "l",
        fnc : true
    },
    otherSnd : {
        conversion: "nth($1)",
        variable: "l",
        fnc : true
    }
}; const lnexp = {
    conversion : "laun",
    variable : "l",
    block : "ln(",
    fnc : true,
    snd : {
        conversion : "etxp",
        variable : "l",
        block : "exp(",
        fnc : true
    }
};
const delMoveArr = [pieE, root, facPerc, permsAndCombs, sin, cos, tan, logE, expoSpec, lnexp];
const blockArr = [root, sin, cos, tan, lnexp, logE];
const fullBlockArr = ["Ans"];
blockArr.forEach(e => {
    if(!!e.snd?.block) fullBlockArr.push(e.snd.block);
    fullBlockArr.push(e.block);
});


// helper functions

function ERR(m) {
    const err = document.createElement("div");
    expr = bar.value;
    ePos = bar.selectionStart;
    err.textContent = m;
    err.id = "err";
    document.body.append(err);
    errMode = true;
    err.classList.add('fadeIn');
    setTimeout(() => {
        err.classList.remove('fadeIn');
        err.classList.add('fadeOut');
        setTimeout(() => {
            if(err) document.body.removeChild(err);
            errMode = false;
            bar.value = expr;
            bar.setSelectionRange(ePos, ePos);
        }, 1000);
    }, 3000);
}

function count(c, s) {
    let o = 0;
    for(const ch of [...s]) 
        if(c === ch) o++;
    return o;
}

function perms(n, r) {
    return fac(n) / fac(n - r);
} function combs(n, r) {
    return fac(n) / (fac(n - r) * fac(r));
}

function NP(s) { // negative parse
    if(s[0] === '⁻') return -s.slice(1);
    else return +s;
} function RNP(s) { // reverse negative parse
    return s.replace(/^-(\d+(?:\.\d+)?)$/, "⁻$1");
}

function CEVAL(str, op = false) {
    if(count("(", str) !== count(")", str)) {
        if(!op) ERR("Invalid Expression");
        return "CalculationError";
    }

    const nReg = "(⁻?\\d+(?:\\.\\d+)?(?:e[+-]\\d+)?)";

    const funcs = {
        "SinReal": [sinReal, 1],
        "CosReal": [cosReal, 1],
        "TanReal": [tanReal, 1],
        "SinFake": [sinFake, 1],
        "CosFake": [cosFake, 1],
        "TanFake": [tanFake, 1],
        "aSinFake": [asinFake, 1],
        "aCosFake": [acosFake, 1],
        "aTanFake": [atanFake, 1],
        "aSinReal": [asinReal, 1],
        "aCosReal": [acosReal, 1],
        "aTanReal": [atanReal, 1],
        "fac": [fac, 1],
        "seq": [ser2, 1],
        "nth": [nth2, 1],
        "sqr": [Math.sqrt, 1],
        "pow": [Math.pow, 2],
        "loga": [LOG, 1],
        "laun": [LN, 1],
        "etxp": [Math.exp, 1],
        "pe": [perms, 2],
        "co": [combs, 2]
    };
    let c = str;
    c = c.replaceAll('pi', Math.PI);
    c = c.replaceAll('euler', euler);
    c = c.replaceAll('ET', '10^');
    try {
        while(/\(.*\)/.test(c)) {
            c = c.replace(/([a-zA-Z]+)?\(([^()]*)\)/, (_, p1, p2) => {
                if(p1) {
                    const args = p2.split(',').map(e => isNaN(e) ? NP(CEVAL(e)) : (e.length === 0 ? '' : +NP(e))).filter(Boolean);
                    if(args.length < funcs[p1][1]) {
                        console.log('args error');
                        if(!op) ERR("Invalid Expression");
                        c = "CalculationError";
                        return c;
                    } else {
                        return RNP(String(funcs[p1][0](...args)));
                    }
                }
                else return String(CEVAL(p2));
            });
        }
        console.log(c);
        function srepl(op, cb) {
            let r = c;
            while(new RegExp(`[${op}]`).test(r) && !/^-\d+(\.\d+)?$/.test(r)) {
                let br = r; // before replace
                r = r.replace(new RegExp(`${nReg}([${op}])${nReg}`, 'g'), cb);
                let ar = r; // after replace
                console.log(br, ar);
                if(ar === br) break;
            }
            return r;
        }
        if(/^[*/+\^-]|[*/+\^-]$/.test(c)) throw Error()

        c = srepl('\\^', (_, p1, p2, p3) => String(NP(p1) ** NP(p3)));
        c = srepl('*/', (_, p1, p2, p3) => String(p2 === '*' ? NP(p1) * NP(p3) : (
            +p3 === 0 ? 'ZeroDivisionError' : NP(p1) / NP(p3)
        )));
        if(c === 'ZeroDivisionError') {
            if(!op) ERR("Division By 0");
            return c;
        }
        c = srepl('+-', (_, p1, p2, p3) => String(p2 === '+' && !p1.endsWith('e') ? NP(p1) + NP(p3) : NP(p1) - NP(p3)));
    } catch(e) {
        console.log('main error', op);
        if(!op) ERR("Invalid Expression");
        c = "CalculationError";
    }
    if(c === 'Infinity') {
        console.log('infinity error');
        if(!op) ERR("Calculation involves too large value (exceeds 1.7976931348623157E308)");
        c = "CalculationError";
    } else if(c !== c || !(new RegExp(`^${nReg}$`).test(RNP(c))) && !c.includes('Error')) { // if c is exactly NaN or the string is not a number (but not NaN)
        console.log('nan error', c)
        if(!op) ERR("Invalid Expression");
        c = "CalculationError";
    }

    c = expoParse(c);
    return c.includes("Error") ? c : RNP(c);
}

function expoParse(s) {
    if(+s !== 0 && +s >= 1e15 || +s > -9e-6 && +s < 1e-6) return (+s).toExponential()
        .replace(/(\d(?:\.\d{8,})?)e([+-]\d+)/, (_, p1, p2) => 
            `${p1.slice(0, 11)}E${(p2[0] === '+' ? '' : '⁻') + p2.slice(1)}`)
    else return s;
}

function digitCount(S) {
	let c = 0;
	let t = S;
	while(t.search(/\d/) > -1) {
		c++;
		t = t.slice(t.search(/\d/) + 1);
	}
	return c;
}

function limit(num) {
    const numStr = [...num.toString()];
    const maxLim = 16;
    if(numStr.length > maxLim) {
        num = Number(num).toFixed(maxLim);
    }
    return num;
}

function fadeOut(id) {
    let interval = setInterval(() => {
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

function getEntries() {
    const amountLeft = max - lss;
    let avg = 0;
    lsEA.forEach(el => {
        avg += el.length;
    });
    avg /= lsEA.length;
    const entriesLeft = Math.round(amountLeft / avg);

    if(!Number.isInteger(entriesLeft)) {
        eLeft.textContent = "Max vacant entries";
    } else eLeft.textContent = (entriesLeft <= 0 ? 0 : `~${formatKP(entriesLeft)}`) + " vacant entries";
    
}
getEntries();

function brackForClick(ix, str, adder) {
    str = [...str];
    str.splice(ix + 1, 0, adder).join('');
    return str.join('');
}

function fullMSCS(val) {
    return !(!!val.match(/^\d+$/)) ? `<span class="ansHoverValue">${val}</span>` : val;
}

function gamma(z) {
    return Math.sqrt(2 * Math.PI / z) * Math.pow((1 / Math.E) * (z + 1 / (12 * z - 1 / (10 * z))), z);
}

function fac(num) {
    if(Number.isInteger(num)) {
        return Math.round(gamma(num + 1));
    } else return gamma(num + 1);
} function series(a, dor, n, type) {
    if(!Number.isInteger(+n) || n < 1) return false;
    else {
        if(type === 'arithmetic') {
            return (+n / 2) * (2 * +a + +dor * (+n - 1));
        } else if (type === 'geometric') {
            return (+a * (1 - (+dor) ** +n)) / (1 - +dor);
        }
    }
} function nth(a, dor, n, type) {
    if(type === 'arithmetic') return +a + (+n - 1) * +dor;
    else if (type === 'geometric') return +a * (+dor) ** (+n - 1);
}

function close(num) {
	const rgxi = /^\.49/;
    const rgx9 = /\.9{9,}/;
    const rgx0 = /^(?<!0)\.0{9,}|\.\d*0+$/;
    const nts = String(num);
    console.log(nts);
    if (rgxi.test(nts) && rgx9.test(nts)) return undefined;
    else return rgx9.test(nts) || rgx0.test(nts);
}

function closeTemplate(main) {
    console.log('close', main);
    console.log(close(main));
    if(close(main)) return Math.round(main);
    else if (close(main) === undefined) return 0.5; 
    else return main;
}

function realTemplate(val, fnc) {
    const main = Math[fnc](val * Math.PI / 180);
    return closeTemplate(main);
} function fakeTemplate(val, fnc) {
    const main = Math[fnc](val);
    return closeTemplate(main);
}

function sinFake(val) { return fakeTemplate(val, "sin") }
function cosFake(val) { return fakeTemplate(val, "cos") }
function tanFake(val) { return fakeTemplate(val, "tan") }
function sinReal(val) { return realTemplate(val, "sin") }
function cosReal(val) { return realTemplate(val, "cos") }
function tanReal(val) { return realTemplate(val, "tan") }

function arealTemplate(val, fnc) {
    const main = Math[fnc](val) / Math.PI * 180;
	return closeTemplate(main);
} function afakeTemplate(val, fnc) {
    const main = Math[fnc](val);
    return closeTemplate(main);
}
function asinFake(val) { return afakeTemplate(val, "asin") }
function acosFake(val) { return afakeTemplate(val, "acos") }
function atanFake(val) { return afakeTemplate(val, "atan") }
function asinReal(val) { return arealTemplate(val, "asin") }
function acosReal(val) { return arealTemplate(val, "acos") }
function atanReal(val) { return arealTemplate(val, "atan") }


function ser2(num) {
    const { start:st, type:ty, difference_ratio:dr } = mutableSeriesConfigSettings;
    return series(st, dr, num, ty);
} function nth2(num) {
    const { start:st, type:ty, difference_ratio:dr } = mutableSeriesConfigSettings;
    return nth(st, dr, num, ty);
}

function calcEuler() {
    const eArray = Array.from({ length: 50 }, (_, i) => 1 / fac(i));
    return eArray.reduce((t, n) => t + n);
}

function LOG(value) {
    return Math.log(value) / Math.log(logBase);
} function LN(value) {
    return Math.log(value) / Math.log(calcEuler());
}

const euler = calcEuler();

function getKeyByValue(obj, val) {
    return Object.keys(obj).find(k => obj[k] === val);
}




document.body.addEventListener("contextmenu", ev => {
    ev.preventDefault();
});
del.addEventListener("click", DEL);
function proxySet(t) {
    extra.innerHTML = Object.values(t).reduce((a, c) => a + c + " ", "");
    document.querySelectorAll(".ansHoverValue").forEach(qsaHover);
} function proxyDelete(t, p) {
    if(p in t) delete t[p];
    proxySet(t);
}
const proxEOBJ = new Proxy(extraObj, {
    deleteProperty: proxyDelete,
    set: (t, p, v) => {
        t[p] = v;
        proxySet(t);
    }
});

function ansInput(ansinput, ev, reset, dec = false) {
    const brackPos = [ansinput.value.search(/\(/), ansinput.value.search(/\)/)];
    const brackBool = ansinput.value.includes("(");
    if([...allowedPlusChars, dec ? '.' : ''].includes(ev.key)) {
        if(digitCount(ansinput.value) === 5 && /\d/.test(ev.key)) ev.preventDefault();
        if(ansinput.value !== 10) {
            reset.style.visibility = "visible";
        } else reset.style.visibility = "hidden";
        if(ev.key.toLowerCase() === "a") {
            ev.preventDefault();
            if(!brackBool)  {
                ansinput.value = "Ans()";
                ev.target.setSelectionRange(4, 4);
            }
        } 
        if(!(
                brackBool && 
                (
                    ev.target.selectionStart >= brackPos[0] + 1 
                    && ev.target.selectionStart <= brackPos[1]
                )
            ) && 
            brackBool &&
            ["Backspace", "ArrowLeft", "ArrowRight"].indexOf(ev.key) === -1
        ) {
            ev.preventDefault();
        }
        if(ev.key === "Backspace" && ansinput.value === "Ans()") {
            ansinput.value = "";
        } //else if (ev.key === "Backspace" && ansinput.value === "Ans()")
    } else ev.preventDefault();
}

function resetDownTimer() {
    clearTimeout(this.downTimer);
}

bar.focus();
function input() {
    bar.focus();
}
document.body.addEventListener("click", input);

function ansEntry() {
    ansE.onclick = null;
    bar.disabled = true;
    bnenrne.forEach(e => {
        e.disabled = true;
    });
}

function ansEntries() {
    const reference = ansE.onclick;
    clearTimeout(this.downTimer);
    this.downTimer = setTimeout(() => {
        AEC.style.visibility = "visible";
        ansEntry();
        resetC.addEventListener("click", () => {
            localStorage.removeItem("entries");
            localStorage.removeItem("entryVals");
            localStorage.removeItem("date");
            eClear.style.opacity = 1;
            fadeOut('eClear');
            eLeft.textContent = "Max vacant entries";
        });
    }, 1000);
    exit.addEventListener("click", () => {
        ansE.onclick = reference;
        bar.disabled = false;
        bnenrne.forEach(e => {
            e.disabled = false;
        });
        AEC.style.visibility = "hidden";
    });
}
ansE.addEventListener("mousedown", ansEntries);
ansE.addEventListener("mouseup", resetDownTimer);

function FCev() {
    exc_rnd.onclick = null;
    bar.disabled = true;
    bnsbnrb.forEach(e => {
        e.disabled = true;
    });
}

function fixChoice() {
    const reference = document.querySelectorAll('#exc_rnd');
    if(!exact) return;
    else {
        clearTimeout(this.downTimer);
        this.downTimer = setTimeout(() => {
            ercc.style.visibility = "visible";
            FCev();
            fix.addEventListener("keydown", e => {
                const ek = e.key.length === 1 ? e.key : '';
                const m = +brackForClick(fix.selectionStart, fix.value, ek);
                if(isNaN(m) || m < 1 || m > 9) e.preventDefault();
                else resetB.style.visibility = fix.value + ek !== '2' ? "visible" : "hidden";
            });
            resetB.addEventListener("click", () => {
                fix.value = 2;
                resetB.style.visibility = "hidden";
            });
        }, 1000);
        saveB.addEventListener("click", () => {
            if(fix.value >= 1 && fix.value <= 9) {
                exc_rnd.onclick = reference;
                bar.disabled = false;
                bnsbnrb.forEach(el => {
                    el.disabled = false;
                });
                ercc.style.visibility = "hidden";
                resetB.style.visibility = "hidden";
                fixed = +fix.value;
                proxEOBJ.exc_rnd = "FIX" + fixed;
            }
        });
    }
}

function excRnd() {
    exc_rnd.classList.toggle("holding");
    if(exact) {
        exc_rnd.textContent = "ROUND";
        if(bar.value === ans && decCount(ans) > fixed) {
            bar.value = Number(bar.value).toFixed(fixed);
        }
        delete proxEOBJ.exc_rnd;
    } else {
        if(bar.value === ans && decCount(ans) > fixed) {
            bar.value = Number(bar.value).toFixed(fixed);
        }
        exc_rnd.textContent = "EXACT";
        proxEOBJ.exc_rnd = "FIX"+fixed;
    }
    exact = !exact;
}
exc_rnd.addEventListener("click", excRnd);
exc_rnd.addEventListener("mousedown", fixChoice);
exc_rnd.addEventListener("mouseup", resetDownTimer);

bar.addEventListener("click", e => {
    inputIndex = e.target.selectionStart;
});

function mc() {
    memory = 0;
    bar.value = "";
} function mp() {
    if(!isNaN(bar.value)) {
        memory += parseFloat(bar.value);
        bar.value = "";
    }
} function mm() {
    if(!isNaN(bar.value)) {
        memory -= parseFloat(bar.value);
        bar.value = "";
    }
} function mr() {
    bar.value = memory;
}

document.getElementById('mc').addEventListener("click", mc);
document.getElementById('mp').addEventListener("click", mp);
document.getElementById('mm').addEventListener("click", mm);
document.getElementById('mr').addEventListener("click", mr);

function sndAction() {
    timesActivated++;
    if(timesActivated & 1 === 1) {
        proxEOBJ.snd = "2ND";
        for(let i = 0; i < size; i++) {
            const si = smalls[i];
            const ni = nbs[i];
            si.style.opacity = 1;
            si.style.fontWeight = 600;
            si.style.color = "#b8e994";
            ni.style.opacity = 0.3;
            if(/S[a-zA-Z]/.test(si.textContent) || ni.textContent.includes('log')) 
                ni.parentNode.classList.toggle('holding');
        }

        sndactive = true;
        sndsub.style.opacity = 1;
        sndsub.style.fontWeight = 600;
    } else {
        delete proxEOBJ.snd;
        for(let i = 0; i < size; i++) {
            const si = smalls[i];
            const ni = nbs[i];
            si.style.opacity = 0.6;
            si.style.fontWeight = 400;
            si.style.color = "#000";
            ni.style.opacity = 1;
            if(/S[a-zA-Z]/.test(si.textContent) || ni.textContent.includes('log')) 
                ni.parentNode.classList.toggle('holding');
        }

        sndactive = false;
        sndsub.style.opacity = 0.6;
        sndsub.style.fontWeight = 400;
    }
}

document.getElementById("sndb").addEventListener("click", sndAction);

function qsaHover(ahv) {
    ahv.addEventListener("mouseover", () => {
        const seqVal = Number(ahv.textContent.replace(ansRgx, "$1"));
        const seqEval = localStorage.entryVals ? localStorage.entryVals : '';
        const seqIx = seqEval.split(',')[seqVal - 1];

        const AHV = document.createElement("div");
        AHV.id = "ahv";
        AHV.textContent = ahv.textContent.replace(ansRgx, "Ans #$1 --> ") + seqIx;
        AHV.classList.add('fadeIn');
        document.body.append(AHV);
    });
    ahv.addEventListener("mouseout", () => {
        document.body.removeChild(document.querySelector("#ahv"));
    });
}

function SIPev() {
    SIP.onclick = null;
    bar.disabled = true;
    bnsnsnr.forEach(el => {
        el.disabled = true;
    });
}

function config() {
    const reference = SIP.onclick;
    if(!sndactive) return;
    else {
        clearTimeout(this.downTimer);
        this.downTimer = setTimeout(() => {
            const jsonDef = JSON.stringify(defaultSeriesConfigSettings);
            if(jsonDef === JSON.stringify(mutableSeriesConfigSettings)) {
                reset.style.visibility = "hidden";
            } else reset.style.visibility = "visible";
            scc.style.visibility = "visible";
            SIPev();
            ari.addEventListener("click", () => {
                geo.style.opacity = 0.5;
                ari.style.opacity = 1;
                mutableSeriesConfigSettings.type = "arithmetic";
                if(JSON.stringify(mutableSeriesConfigSettings) === jsonDef) {
                    reset.style.visibility = "hidden";
                }
                diffh2.textContent = "Difference";
            }); geo.addEventListener("click", () => {
                geo.style.opacity = 1;
                ari.style.opacity = 0.5;
                mutableSeriesConfigSettings.type = "geometric";
                reset.style.visibility = "visible";
                diffh2.textContent = "Ratio";
            });
            stval.addEventListener("keydown", ev => {
                ansInput(stval, ev, reset, true);
                if(JSON.stringify(mutableSeriesConfigSettings) !== jsonDef) {
                    reset.style.visibility = "visible";
                } else reset.style.visibility = "hidden";
            }); serDiff.addEventListener("keydown", ev => {
                ansInput(serDiff, ev, reset, true);
                if(JSON.stringify(mutableSeriesConfigSettings) !== jsonDef) {
                    reset.style.visibility = "visible";
                } else reset.style.visibility = "hidden";
            });

            reset.addEventListener("click", () => {
                mutableSeriesConfigSettings = { ...defaultSeriesConfigSettings };
                geo.style.opacity = 0.5;
                ari.style.opacity = 1;
                stval.value = 1;
                serDiff.value = 1;
                reset.style.visibility = "hidden";
                baseSub.textContent = 'x'
                baseSub.style.color = "#b8e994";
            });
        }, 1000);
        save.addEventListener("click", () => {
            if(serDiff.value.length > 0 && stval.value.length > 0) {
                mutableSeriesConfigSettings.start = stval.value;
                mutableSeriesConfigSettings.difference_ratio = serDiff.value;
                const mscst = [...mutableSeriesConfigSettings.type][0].toUpperCase();
                const mscsdr = mutableSeriesConfigSettings.difference_ratio;
                const fmscsdr = fullMSCS(mscsdr);
                const mscsv = mutableSeriesConfigSettings.start;
                const fmscsv = fullMSCS(mscsv);
                if(JSON.stringify(mutableSeriesConfigSettings) !== JSON.stringify(defaultSeriesConfigSettings)) {
                    if(ansRgx.test(stval.value)) {
                        const seqVal1 = Number(mscsdr.replace(ansRgx, "$1"));
                        const seqVal2 = Number(mscsv.replace(ansRgx, "$1"));
                        const seqEval = localStorage.entryVals.split(',');
                        const seqIx1 = Number(seqEval[seqVal1 - 1]);
                        const seqIx2 = Number(seqEval[seqVal2 - 1]);
                        console.log(seqIx1, seqIx2);
                        if((!isNaN(seqVal1) && seqVal1 >= 1 && seqVal1 < seqEval.length) && 
                        (!isNaN(seqVal2) && seqVal2 >= 1 && seqVal2 < seqEval.length) && 
                        [seqVal1, seqVal2].every(Number.isInteger)) {
                            mutableSeriesConfigSettings.difference_ratio = seqIx1;
                            mutableSeriesConfigSettings.start = seqIx2;
                            baseSub.textContent = "A";
                            baseSub.style.color = "#0be881";
                            baseSubPopup.textContent = seqIx1;
                            seqErr = false;
                        } else {
                            baseSub.textContent = "E";
                            baseSub.style.color = "#ea2027";
                            seqErr = true;
                        }
                    }
                    proxEOBJ.sequence = `S<sub>${mscst}</sub>V<sub>${fmscsv}</sub>${mscst == 'G' ? 'R' : 'D'}<sub>${fmscsdr}</sub>`;
                } else {
                    delete proxEOBJ.sequence;
                    seqErr = false;
                }
                document.querySelectorAll(".ansHoverValue").forEach(qsaHover);
                SIP.onclick = reference;
                bar.disabled = false;
                bnsnsnr.forEach(el => {
                    el.disabled = false;
                });
                scc.style.visibility = "hidden";
                reset.style.visibility = "hidden";
            }
        });
    }
} 
SIP.addEventListener("mousedown", config);
SIP.addEventListener("mouseup", resetDownTimer);

function LBev() {
    LogE.onclick = null;
    bar.disabled = true;
    bnsdnrd.forEach(el => {
        el.disabled = true;
    });
}

function logBaseHold() {
    const reference = LogE.onclick;
    if(sndactive) return;
    else {
        clearTimeout(this.downTimer);
        this.downTimer = setTimeout(() => {
            resetD.style.visibility = logBase === 10 ? "hidden" : "visible";
            lbc.style.visibility = "visible";
            LBev();
            logInput.addEventListener("keydown", ev => {
                ansInput(logInput, ev, resetD);
            });

            resetD.addEventListener("click", () => {
                resetD.style.visibility = "hidden";
                logInput.value = 10;
            });
        }, 1000);
        saveD.addEventListener('click', () => {
            if(logInput.value.length > 0) {
                const baseSub = document.querySelector("#baseSub");
                if(logInput.value !== "10" && logInput.value.includes("(")) {
                    proxEOBJ.log = "LOG"+`<sub>${logInput.value}</sub>`;
                } else {
                    baseSub.textContent = logInput.value;
                    logErr = false;
                    delete proxEOBJ.log;
                }
                if(logInput.value.search(ansRgx) > -1) {
                    proxEOBJ.log = "LOG"+`<span class="ansHoverValue"><sub>${logInput.value}</sub></span>`;
                    const baseVal = Number(logInput.value.replace(ansRgx, "$1"));
                    const evals = localStorage.entryVals.split(',');
                    const indexedVal = Number(evals[baseVal - 1]);
                    let baseSubPopup = document.getElementById('baseSubPopup');
                    if(Number.isInteger(baseVal) && baseVal >= 1 && baseVal <= evals.length) {
                        logBase = indexedVal;
                        baseSub.textContent = "A";
                        baseSub.style.color = "#0be881";
                        baseSubPopup.textContent = indexedVal;
                        logErr = false;
                    } else {
                        baseSub.textContent = "E";
                        baseSub.style.color = "#ea2027";
                        baseSubPopup.innerHTML = "<em>x</em> in Ans(x) is not valid";
                        logErr = true;
                    }   
                } else if (logInput.value !== "10") {
                    proxEOBJ.log = `LOG<sub>${logInput.value}</sub>`;
                    baseSub.textContent = "X";
                    baseSub.style.color = "#eccc68";
                    logBase = logInput.value;
                    logErr = false;
                } else {
                    logBase = 10;
                    baseSub.style.color = "#000000";
                    logErr = false;
                }
                document.querySelectorAll(".ansHoverValue").forEach(qsaHover);
                LogE.onclick = reference;
                bar.disabled = false;
                bnsdnrd.forEach(el => {
                    el.disabled = false;
                });
                lbc.style.visibility = "hidden";
                resetD.style.visibility = "hidden";
            }
        });
    }
}

LogE.addEventListener("mousedown", logBaseHold);
LogE.addEventListener("mouseup", resetDownTimer);

function setValue(v) {
    if(errMode) {
        document.body.removeChild(document.querySelector("#err"));
        errMode = false;
        bar.value = expr;
        bar.setSelectionRange(ePos, ePos);
    } else {
        timesClickedAfterEvaluation++;
        let inputIx = bar.selectionStart;
        function template(dset, attr) {
            let i = Number(dset);
            let a = inputIx + i;
            bar.value = brackForClick(inputIx - 1, bar.value, v.getAttribute(attr));
            bar.setSelectionRange(a, a);
        }
        if(!sndactive || sndactive && !v.hasAttribute("data-specVal")) {
            if(!(v.getAttribute("data-val") === '.' && !Number.isInteger(+ans))) {
                if(timesClickedAfterEvaluation === 1) bar.value = '';
                const io = [...operArr, '!', '%'].includes(v.getAttribute("data-val"));
                if(io && bar.value === '') {
                    bar.value = 'Ans';
                    inputIx = bar.selectionStart;
                } if(!(obef && io)) {
                    if(v.getAttribute("data-val") === 'log()' && logErr) {
                        ERR(`Invalid entry input for log() function`);
                        bar.value = "EntryError";
                    } else template(v.dataset.valix, "data-val");
                }
            } 
        } else if (sndactive && v.hasAttribute("data-specVal")) {
            const svi = v.dataset.specvalix;
            if(v.dataset.specval === 'S' && (sbef || nbef)) {
                if(seqErr) {
                    ERR(`Invalid entry input for ${sbef ? 'N' : 'S'} function`);
                    bar.value = "EntryError";
                } else {
                    const s = [...bar.value];
                    const bss = bar.selectionStart;
                    s.splice(bss - 1, 1, sbef ? 'N' : 'S');
                    bar.value = s.join('');
                    bar.setSelectionRange(bss, bss);
                }
            } else template(svi, "data-specval");
        }
    }
}

document.querySelectorAll(".val")
    .forEach(n => n.addEventListener("click", () => setValue(n)));

document.getElementById('cac').addEventListener("click", () => {
    bar.value = "";
    timesClickedAfterEvaluation = 0;
});

function degRad() {
    if(deg) {
        deg = false;
        deg_rad.textContent = "DEG";
        proxEOBJ.rad = "RAD";
    } else {
        deg = true;
        deg_rad.textContent = "RAD";
        delete proxEOBJ.rad;
    }
    sin.conversion = !deg ? "SinFake" : "SinReal";
    cos.conversion = !deg ? "CosFake" : "CosReal";
    tan.conversion = !deg ? "TanFake" : "TanReal";

    sin.snd.conversion = !deg ? "aSinFake" : "aSinReal";
    cos.snd.conversion = !deg ? "aCosFake" : "aCosReal";
    tan.snd.conversion = !deg ? "aTanFake" : "aTanReal";
} 
deg_rad.addEventListener("click", degRad);

function evaluate(string) {
    const rgxVal = "(⁻?\\d+(?:\\.\\d+)?|\\(.*\\)|(?<!ak|p)e|π)";

    const { snd: peb, ...pea } = pieE;
    const { snd: rob, ...roa } = root;
    const { snd: fpb, ...fpa } = facPerc;
    const { snd: pcb, ...pca } = permsAndCombs;
    const { snd: sib, ...sia } = sin;
    const { snd: cob, ...coa } = cos;
    const { snd: tab, ...taa } = tan;
    const { snd: esb, otherSnd: esc, ...esa } = expoSpec;
    const { snd: leb, ...lea } = logE;
    const { snd: lxb, ...lxa } = lnexp;

    const sndOper = {
        "π" : pea, 
        "e(?!xp)" : peb,

        "(?<!n)√" : roa, 
        [rgxVal + "n√\\(" + rgxVal + "\\)"] : rob,

        [rgxVal + "!"] : fpa, 
        "%" : fpb,
        
        [rgxVal + "C" + rgxVal] : pca, 
        [rgxVal + "P" + rgxVal] : pcb,

        "(?<!arc)sin" : sia, 
        "arcsin" : sib,

        "(?<!arc)cos" : coa, 
        "arccos" : cob,

        "(?<!arc)tan" : taa, 
        "arctan" : tab,

        [rgxVal + "\\^" + rgxVal] : esa,
        ["S" + rgxVal] : esb,
        ["N" + rgxVal] : esc,

        ["log(" + rgxVal + ")"] : lea,
        "E" : leb,

        "ln" : lxa,
        "exp" : lxb
    };

    let str = '';
    for(let t of string) {
        if(t in simpleOper) t = simpleOper[t].conversion;
        str += t;
    }

    function serr(r, v) {
        str = str.replace(r, v);
    }

    if(ans !== null) {
        const rgx = new RegExp(`${rgxVal}(?!\\*)Ans|(?<r>Ans(?!\\*)${rgxVal})`);
        let i = str.search(rgx);
        while(i >= 0) {
            str = brackForClick(rgx.exec(str)?.groups?.r ? i + 2 : i, str, "*");
            i = str.search(rgx);
        }
        serr(/Ans/g, ans);
    }

    // implicit multiplication
    for(const k in sndOper) {
        const val = sndOper[k];
        const rgx = new RegExp(k, 'g');
        const scopy = str;
        if(rgx.test(str) && val?.variable) {
            // console.log(val, rgx);
            const type = val.variable;
            const rstr = new RegExp(type === 'b' ? `${rgxVal}(?!\\*)${k}|${k}(?!\\*)${rgxVal}` : (
                type === 'l' ? `${rgxVal}(?!\\*)${k}` : `${k}(?!\\*)${rgxVal}`
            ));
            let ix = str.search(rstr);
            let equ = str === scopy;
            const o = type === 's' ? 1 : 0;
            while(ix >= 0 && equ) {
                str = brackForClick(ix + o, str, "*");
                equ = str !== scopy;
                ix = str.search(rstr);
            }
        }
    }
    
    // replacements
    for(const k in sndOper) {
        const val = sndOper[k];
        const rgx = new RegExp(k, 'g');
        let initTest = rgx.test(str);
        if(initTest) {
            if(val?.fnc) while(str.search(rgx) > -1) 
                serr(rgx, val.conversion);
            else serr(rgx, val.conversion);
        } 
    }

    const brackRGX = new RegExp(`\\)\\(|\\)${rgxVal}|${rgxVal}\\(`);
    const TbrackRGX = /\)\(/g;
    serr(TbrackRGX, ")*(");
    while(brackRGX.test(str)) {
        str = brackForClick(str.search(brackRGX), str, "*");
    }

    console.log(str);
    const evaluation = CEVAL(str);
    if(evaluation?.includes('Error')) return evaluation;
    else {
        const evalN = closeTemplate(evaluation);
        return expoParse(!exact ? limit(evalN) : (+evalN).toFixed(fixed));
    }
}

function evalSet() {
    timesClickedAfterEvaluation = 0;
    if(lss < max) {
        if(!localStorage.entries) {
            localStorage.entries = bar.value + ",";
        } else localStorage.entries += bar.value + ",";
        
        bar.value = evaluate(bar.value);
        ans = bar.value; 
        if(!localStorage.entryVals) {
            localStorage.entryVals = ans.toString()+",";
        } else localStorage.entryVals += ans.toString()+",";

        const time = new Date();
        const day = time.getDate();
        const month = time.getMonth() + 1;
        const year = time.getFullYear();
        const hour = time.getHours();
        const minute = time.getMinutes();

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
        ERR("No more space for answer entries");
        bar.value = 'EntryError';
        eLeft.textContent = "0 vacant entries";
    }
}

document.getElementById("equb").addEventListener("click", evalSet);

copy.addEventListener("click", () => {
    const type = "text/plain";
    navigator.clipboard.write([new ClipboardItem({ [type]: new Blob([bar.value], { type }) })])
        .then(() => {
            copyResult.style.color = "#4cd137";
            copyResult.textContent = "Bar was successfully copied";
        })
        .catch(() => {
            copyResult.style.color = "red";
            copyResult.textContent = "Bar was unable to be copied";
        });
    copyResult.classList.add("fadeIn");
    setTimeout(() => {
        copyResult.classList.add("fadeOut");
        copyResult.classList.remove("fadeIn");
    }, 1000);
});

// paste.addEventListener("click", () => {
//     document.execCommand("paste");
// });

// document.addEventListener("paste", e => {
//     e.preventDefault();
//     // const paste = e.clipboardData.getData("text");
//     // console.log(+evaluate(paste, true), 'evaluationsdfjl');
//     // if(String(CEVAL(paste, true)).includes('Error') && !isNaN(+evaluate(paste, true))) {
//     //     ERR("Invalid Expression Pasted");
//     //     bar.value = "PasteError";
//     // } else 
//     bar.value = brackForClick(bar.setSelectionStart, bar.value, paste);
//     pasteResult.classList.add("fadeIn");
//     setTimeout(() => {
//         pasteResult.classList.add("fadeOut");
//         pasteResult.classList.remove("fadeIn");
//     }, 1000);
//     // }
// });

function DEL() {
    if(timesClickedAfterEvaluation === 0 || bar.value === '') bar.value = '';
    else {
        let barPos = bar.selectionStart;
        if(bar.value.length === 1 && barPos === 1) {
            bar.value = '';
        } else {
            const BV = [...bar.value];
            let isBlock = false;
            let rangeValue = barPos === 0 || barPos == bar.value.length - 1 ? barPos : barPos - 1;
            for(const e of fullBlockArr) {
                const ee = e + ")";
                const l = e.length;
                const ll = ee.length;
                const r = barPos - l;
                const rr = barPos - ll;
                const block = BV.slice(r, barPos).join('');
                const block2 = BV.slice(rr, barPos).join('');
                if(block2 === ee) {
                    const adder = operArr.indexOf(BV[barPos + 1]) > -1 ? 2 : 1;
                    BV.splice(r - 1, l + adder);
                    rangeValue -= block2.length;
                }
                if(block === e) {
                    if(BV[barPos] === ")" && e !== "Ans") {
                        const adder = operArr.indexOf(BV[barPos + 1]) > -1 ? 2 : 1;
                        BV.splice(r, l + adder);
                    }
                    else BV.splice(r, l);
                    bar.value = BV.join('');
                    rangeValue -= block.length - 1;
                    isBlock = true;
                    break;
                } else continue;
            }
            if(!isBlock) {
                if(barPos > 0) BV.splice(barPos - 1, 1);
                bar.value = BV.join('');
                if(barPos === rangeValue) rangeValue--;
            }
            bar.setSelectionRange(rangeValue, rangeValue);
        }
    }
}

function ARROW(binaryDirection) {
    if(bar.value.length > 0) {
        const b = !!binaryDirection;
        const barPos = bar.selectionStart;
        const BV = [...bar.value];
        const isBlock = false;
        for(const e of fullBlockArr) {
            const l = e.length;
            const r = !b ? barPos - l : barPos + l;
            const block = (!b ? BV.slice(r, barPos) : BV.slice(barPos, r)).join('');
            if(block === e) {
                bar.setSelectionRange(r, r);
                isBlock = true;
                break;
            } else continue;
        }
        if(!isBlock) {
            const caret = bar.selectionStart;
            bar.setSelectionRange((!b ? caret - 1 : caret + 1), (!b ? caret - 1 : caret + 1));
        }
    }
}

bar.addEventListener("keydown", ev => {
    if(errMode) {
        ev.preventDefault();
        document.body.removeChild(document.querySelector("#err"));
        errMode = false;
        bar.value = expr;
        bar.setSelectionRange(ePos, ePos);
    } else {
        function operIsThere() {
            return operArr.indexOf(bar.value[ev.target.selectionStart - 1]) > -1;
        }

        function type(s, i) {
            const etss = ev.target.selectionStart;
            if(!(ev.key === '.' && !Number.isInteger(+ans) && bar.value.slice(etss - 3, etss) === 'Ans')) {
                const inputIx = ev.target.selectionStart;
                bar.value = timesClickedAfterEvaluation === 0 ? s : brackForClick(inputIx - 1, bar.value, s);
                bar.setSelectionRange(inputIx + i, inputIx + i);
                inputIndex += i;
                timesClickedAfterEvaluation++;
            }
        }
        
        function superType(char) {
            function ansSuperTypeTemplate() {
                type("Ans" + char, 4);
            }
            if(bar.value === '' || timesClickedAfterEvaluation === 0) {
                if(ans != null || timesClickedAfterEvaluation === 1) {
                    if(Number.isInteger(+ans) && char === '.' || char !== '.') {
                        bar.value = '';
                        ansSuperTypeTemplate();
                    }
                }
            } else type(char, 1);
        } 

        function evalSetFunc() {
            ev.preventDefault();
            evalSet();
        }

        switch(ev.key) {
            case "A":
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
                if(!sndactive) type("sin()", 4);
                else type("arcsin()", 7);
                break;

            case "t":
                ev.preventDefault();
                if(!sndactive) type("tan()", 4);
                else type("arctan()", 7);
                break;

            case "c":
                ev.preventDefault();
                if(!sndactive) type("cos()", 4);
                else type("arccos()", 7);
                break;

            case "C":
                ev.preventDefault();
                type("C", 1);
                break;

            case "P":
                ev.preventDefault();
                type("P", 1);
                break;

            case "N":
                ev.preventDefault();
                type("N", 1);
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
                evalSetFunc();
                break;

            case "Enter":
                evalSetFunc();
                break;

            case "l":
                ev.preventDefault();
                if(logErr) {
                    ERR("Invalid entry input for log() function");
                    bar.value = "EntryError";
                } else type("log()", 4);
                break;

            case "S":
                ev.preventDefault();
                if(seqErr) {
                    ERR("Invalid entry input for S function");
                    bar.value = "EntryError";
                } else type("S", 1);
                break;

            case "N":
                ev.preventDefault();
                if(seqErr) {
                    ERR("Invalid entry input for N function");
                    bar.value = "EntryError";
                } else type("N", 1);
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
                ev.preventDefault();
                ARROW(0);
                break;
            
            case "ArrowRight":
                ev.preventDefault();
                ARROW(1);
                break;

            case "Backspace":
                ev.preventDefault();
                DEL();
                break;

            case " ":
                ev.preventDefault();
                blinker();
                break;

            case "_":
                ev.preventDefault();
                type("⁻", 1);
                break;

            default:
                ev.preventDefault();
        }
    }
}); 

function neg() {
    if(!isNaN(bar.value.replace('⁻', '-'))) {
        bar.value = bar.value[0] === '⁻' ? bar.value.slice(1) : '⁻' + bar.value;
    }
}
document.getElementById("top").addEventListener("click", neg);

function sendToEntries() {
    window.open('../entries/entries.html');
}
entries.addEventListener("click", sendToEntries);

arrows[0].addEventListener("click", () => { ARROW(1) });
arrows[1].addEventListener("click", () => { ARROW(0) });

function blinkToggle(remove, adder, visibility, aniPlayState) {
    const cursor = document.getElementById('blinkingCursor');
    if(bar.classList.value.indexOf(remove) > -1) bar.classList.remove(remove);
    bar.classList.add(adder);
    cursor.style.visibility = visibility;
    cursor.style.animationPlayState = aniPlayState;
}

function blinker() {
    const cursorP = ["forCursorFadeIn", "forCursorFadeOut"];
    if(!blinkingCursor) blinkToggle(cursorP[1], cursorP[0], "hidden", "paused");
    else blinkToggle(cursorP[0], cursorP[1], "visible", "initial");
    blinkingCursor = !blinkingCursor;
}

document.getElementById("bcContainer").addEventListener("click", blinker);

document.addEventListener("selectionchange", () => {
    const prev = bar.value[bar.selectionStart - 1];
    sbef = prev === 'S';
    nbef = prev === 'N';

    obef = operArr.includes(prev);
});