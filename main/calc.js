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
if(!localStorage.varVals) localStorage.varVals = "{}";
const ansRgx = /Ans\((\d+)\)/i;
const digKeyCodeArr = Array.from({ length: 9 }, (_, i) => i + 48);
const vnl = JSON.parse(localStorage.varVals); // variable name list
const hvqo = {}; // hover value query object
const themes = {
    default: {
        // icon: ["c56cf0#eae5d8", "f7d794#eccc68"],
        bg: "linear-gradient(90deg, hsla(238, 100%, 71%, 1) 0%, hsla(295, 100%, 84%, 1) 100%)",
        body: "#c8d6e5",
        bodyshadow: "#222f3e",
        barnotes: "#000",
        copy: ["78e08f#b8e994", "2ed573#7bed9f", "#000"],
        paste: ["ca53b0#d770c1", "af4898#be66ab", "#000"],
        curbut: ["ffffff#f1f2f6", "ecf0f1#dfe6e9", "#000"],
        textcol: "#000",
        holdbtnborder: "#000",
        arrows: ["1e272e#000000", "#fff"],
        memvar: {
            subbtns: ["686de0#4834d4", "4b7bec#3867d6", "#000"],
            bg: "rgba(255, 255, 255, 0.7)"
        },
        logserbase: {
            constant: "#eccc68",
            answer: "#0be881",
            error: "#ea2027"
        },
        delacbrac: ["686de0#4834d4", "4b7bec#3867d6", "#000"],
        snd: ["ff6b81#ff4757", "ef5777#f53b57", "#000"],
        num: ["c56cf0#cd84f1", "a55eea#8854d0", "#000"],
        ans: ["778ca3#4b6584", "a4b0be#747d8c", "#000"],
        radround: ["ffbe76#f0932b", "fea47f#f97f51", "#000"],
        opers: ["f7d794#f5cd79", "eccc68#ffa502", "#000"],
        specfncs: {
            normal: {
                base: ["686de0#4834d4", "4b7bec#3867d6", "#000"],
                up: ["#000", 0.6]
            },
            sndmode: {
                base: ["686de0#4834d4", "4b7bec#3867d6", "#000"],
                up: ["#b8e994", 1]
            }
        }
    },
    light: {
        // icon: ["f7f1e3#eae5d8", "f5f6fa#eeeff4"],
        bg: "#d8d5d5",
        body: "#e9eef3",
        bodyshadow: "#404040",
        barnotes: "#000",
        copy: ["55e6c1#9aecdb", "33d9b2#84dbc7", "#000"],
        paste: ["df6886#bf5771", "cc5170#b9264b", "#000"],
        curbut: ["ffffff#f1f2f6", "ecf0f1#dfe6e9", "#000"],
        textcol: "#000",
        holdbtnborder: "#142c4c",
        arrows: ["1e272e#000000", "#fff"],
        memvar: {
            subbtns: ["dfe4ea#ced6e0", "b6c9e0#98b5da", "#000"],
            bg: "rgba(255, 255, 255, 0.7)"
        },
        logserbase: {
            constant: "#868437",
            answer: "#00bd65",
            error: "#ea2027"
        },
        delacbrac: ["dfe4ea#ced6e0", "b6c9e0#98b5da", "#000"],
        snd: ["f8efba#fad390", "f6e58d#f9ca24", "#000"],
        num: ["f7f1e3#d1ccc0", "f2e8cb#e9cf71", "#000"],
        ans: ["d3e4e6#c3d6d8", "d1d8e0#a5b1c2", "#000"],
        radround: ["c5cfcb#a2aca8", "a9c4b9#869d94", "#000"],
        opers: ["eeeff4#cad3c8", "f5f6fa#95afc0", "#000"],
        specfncs: {
            normal: {
                base: ["f3cfe7#dfb5d1", "d293bd#cb76af", "#000"],
                up: ["#000", 0.6]
            },
            sndmode: {
                base: ["f3cfe7#dfb5d1", "d293bd#cb76af", "#000"],
                up: ["#192b4a", 1]
            }
        }
    },
    dark: {
        // icon: ["2f3542#57606f", "3d3d3d#4b4b4b"],
        bg: "#272530",
        body: "#131216",
        bodyshadow: "#464548",
        barnotes: "#fff",
        copy: ["3784dd#2b66aa", "006be8#1c66ba","#000"],
        paste: ["ffa134#dc8d33", "e97c00#b36600", "#000"],
        curbut: ["1a1a1a#504c4c", "2d2d2d#686464", "#fff"],
        textcol: "#fff",
        holdbtnborder: "#e8dfdf",
        arrows: ["badeee#a3c3d1", "#000"],
        memvar: {
            subbtns: ["192045#282f53", "243069#36417c", "#fff"],
            bg: "rgba(229, 252, 255, 0.8)"
        },
        logserbase: {
            constant: "#eccc68",
            answer: "#0be881",
            error: "#ea2027"
        },
        delacbrac: ["3d4955#506070", "2f4051#385069", "#fff"],
        snd: ["3939f6#5c5cf3", "4545ae#5a5a9f", "#fff"],
        num: ["11111e#212137", "232336#313162", "#fff"],
        ans: ["2b2b4b#3e3e65", "424258#5e5e76", "#fff"],
        radround: ["2b5364#436b7c", "296c88#4892b2", "#fff"],
        opers: ["24222d#33313a", "312d42#464258", "#fff"],
        specfncs: {
            normal: {
                base: ["222123#3b393c", "2e2837#433c4e", "#fff"],
                up: ["#fff", 0.4]
            },
            sndmode: {
                base: ["f3cfe7#dfb5d1", "d293bd#cb76af", "#fff"],
                up: ["#fc9a5e", 1]
            }
        }
    }
};

localStorage.scalcTheme = localStorage.scalcTheme ?? 'default';
TBT(localStorage.scalcTheme);
let curTheme = themes[localStorage.scalcTheme];
const defaultSeriesConfigSettings = {
    start : "1",
    type : 'arithmetic',
    difference_ratio : "1"
}; const jsonDef = JSON.stringify(defaultSeriesConfigSettings);
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
const paste = document.querySelector("#paste");
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
const eCount = document.querySelector('#entryCount');
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
const baseSubLog = document.querySelector("#baseSub");
const bnenrne = document.querySelectorAll("button:not(#entries):not(#resetC):not(#exit)");
const bnsnsnr = document.querySelectorAll("button:not(.ser):not(#save):not(#reset)");
const arrows = [document.querySelector(".ar"), document.querySelector(".al")];
const dmem = document.querySelector("#dmem");
const dvar = document.querySelector("#dvar");
const varval = document.querySelector("#varval");
const varname = document.querySelector("#varname");
const [varb1, varb2] = document.querySelectorAll("#dvar > h5:nth-child(1) > button");
const flexbut = document.querySelector("#flexbut");
const themeLink = document.querySelector("#themeLink");
const themeUI = document.querySelector("#themes");
const newplus = document.querySelector("#newplus");

// live state of the calculator (to save if extension is closed)
if(!localStorage.saveState) localStorage.saveState = JSON.stringify({bar:'',proxEOBJ:{},caret:false,tcae:0,cpos:0});
const saveState = JSON.parse(localStorage.saveState);
console.log(saveState, 'save state');

const proxEOBJ = new Proxy(extraObj, {
    deleteProperty: (t, p) => {
        proxyDelete(t, p);
        delete saveState.proxEOBJ[p];
        USS();
        // console.log('del proxy', localStorage.proxyStorage);
    },
    set: (t, p, v) => {
        t[p] = v;
        proxySet(t);
        console.log(t, p, v);
        saveUpdate(p, v, true);
        // console.log('set proxy', localStorage.proxyStorage);
    }
});

const proxFUNCS = {
    exc_rnd: (s) => {
        fix.value = +s.slice(-1);
        fixed = +s.slice(-1);
        excRnd();
    }, snd: (s) => {
        sndAction();
    },
    rad: (s) => {
        deg = true;
        degRad();
    },
    log: (s) => {
        const ivalue = /(?<=sub\>)[^<]+(?=\<\/sub)/.exec(s)[0];
        logInput.value = ivalue;
        if(ivalue.includes('Ans')) ansLogTemplate(ivalue);
        else nonAnsLogTemplate(ivalue);
    },
    vars: (s) => {
        for(const [n, v] of Object.entries(vnl))
            setvarTemplate(n, v);
    },
    sequence: (s) => {
        const [S, V, R] = [...s.matchAll(/(?<=sub\>)[^<]+(?=\<\/sub)/g)].map(e => e[0]);
        if(S === 'G') geomTemplate();
        else arithTemplate();
        reset.style.visibility = "hidden";
        
        mainConfigTemplate(V, R);
        stval.value = V;
        serDiff.value = R;

        console.log(S, V, R, mutableSeriesConfigSettings, 'seq matching');
    }
}

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

const ansFunc = {
    conversion : "ansf($1)",
    variable : "l",
    block : "Ans(",
    fnc : true,
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
    variable : 'r',
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
        conversion : "esn($1)",
        variable: "l"
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
}; const accvar = { // actual variable
    conversion : "V$1",
    variable : "b"
};
const delMoveArr = [pieE, root, facPerc, permsAndCombs, sin, cos, tan, logE, expoSpec, lnexp];
const blockArr = [root, sin, cos, tan, lnexp, logE];
const fullBlockArr = ["Ans"];
blockArr.forEach(e => {
    if(!!e.snd?.block) fullBlockArr.push(e.snd.block);
    fullBlockArr.push(e.block);
});
fullBlockArr.push("(");

loadTheme(curTheme);

// helper functions

function saveUpdate(k, v, p = false) {
    if(p) saveState.proxEOBJ[k] = v;
    else saveState[k] = v;

    USS();
}

function barvalue(text) {
    bar.value = text;
    if(!errMode)
        saveUpdate('bar', text);
}

function HVQS() {
    return document.querySelector("#hv");
}

function decFS() { // decrease font size
    const bvl = bar.value.length;
    if(bvl > 15 && bvl <= 20) bar.style.fontSize = "35px";
    else if (bvl > 20 && bvl <= 25) bar.style.fontSize = "30px";
    else if (bvl > 25) bar.style.fontSize = "25px";
    else bar.style.fontSize = "40px";
}

function TBT(theme) { // theme border toggle
    document.querySelector(`#${theme}T div`).classList.toggle('seltheme');
    document.querySelector(`#${theme}T span`).classList.toggle('boldtheme');
}

function loadTheme(thm) {
    let extss = ''; // external style sheet
    function bcbsh(sel, arr) { // button color, box shadow, hover (selector, array)
        const elems = document.querySelectorAll(sel);
        function hashSplit(str) { return str.split('#').map(e => '#' + e); }
        if(arr.length === 3) {
            const [reg, hov, col] = arr; // [regular, hover, color]
            const regc = hashSplit(reg);
            const hovc = hashSplit(hov);
            elems.forEach(e => {
                e.style.backgroundColor = `${regc[0]}`;
                e.style.boxShadow = '0 5px ' + regc[1];
                e.style.color = col;
            });
            extss += `${sel}:hover {
                background-color: ${hovc[0]} !important;
                box-shadow: 0 5px ${hovc[1]} !important;
            }\n`;
        } else if (arr.length === 2) {
            const [rhf, col] = arr; // [regular-hover function, color]
            const rhfc = hashSplit(rhf);
            elems.forEach(e => {
                e.style.backgroundColor = rhfc[0];
                e.style.color = col;
            });
            extss += `${sel}:hover {
                background-color: ${rhfc[1]} !important;
            }\n`;
        }
    }
    document.body.style.background = thm.bg;
    document.querySelector('input').style.background = thm.body;
    document.querySelector('#body').style.background = thm.body;
    document.querySelector('#body').style.border = `3px solid ${thm.body}`;
    document.querySelector('#body').style.boxShadow = `15px 15px 0 ${thm.bodyshadow}`;
    document.querySelector('#vtext').style.color = thm.textcol;
    extra.style.color = thm.barnotes;
    extss += `.holding {
        border: 2px solid ${thm.holdbtnborder};
    }\n`
    bcbsh('#copy', thm.copy);
    bcbsh('#paste', thm.paste);
    bcbsh('#bcContainer', thm.curbut);
    document.querySelector('#blinkingCursor').style.background = thm.curbut[2];
    bar.style.color = thm.textcol;
    extss += `@keyframes fadecursorout {
        0% {caret-color: ${thm.textcol};}
        100% {caret-color: transparent;}
    } @keyframes fadecursorin {
        0% {caret-color: transparent;}
        100% {caret-color: ${thm.textcol};}
    }\n`;

    bcbsh('.arrow', thm.arrows);
    // document.querySelectorAll(".arrow i").forEach(a => a.style.border = `solid ${thm.arrows[1]}`);
    extss += `.arrow>* {
        border: solid ${thm.arrows[1]};
    }\n`;


    const [col, opac] = thm.specfncs[sndactive ? "sndmode" : "normal"].up;
    smalls.forEach(e => {
        e.style.color = col;
        e.style.opacity = opac;
    });

    const bst = baseSub.textContent;
    const bslt = baseSubLog.textContent;
    if(proxEOBJ.sequence || proxEOBJ.log) {
        if(proxEOBJ.sequence)
            baseSub.style.color = thm.logserbase[bst === 'A' ? "answer" : (bst === 'E' ? "error" : "constant")];
        if(proxEOBJ.log)
            baseSubLog.style.color = thm.logserbase[bslt === 'A' ? "answer" : (bslt === 'E' ? "error" : "constant")];
    } else {
        baseSub.style.color = thm.color;
        baseSubLog.style.color = thm.color;
    }
    

    ['.memory', '#mem', '#var'].forEach(mv => bcbsh(mv, thm.memvar.subbtns));
    document.querySelectorAll('#dmem, #dvar').forEach(d => d.style.background = thm.memvar.bg);
    ['#brack', '#del', '#cac'].forEach(dab => bcbsh(dab, thm.delacbrac));
    bcbsh('.snd', thm.snd);
    bcbsh('.numbers', thm.num);
    bcbsh('#ans', thm.ans);
    bcbsh('#drer *', thm.radround);
    bcbsh('.operat', thm.opers);
    bcbsh('.specs', thm.specfncs.normal.base);

    const sndcols = thm.specfncs.sndmode.base;
    extss += `.sndcolor {
        background: #${sndcols[0].slice(0, 6)};
        box-shadow: 0 5px ${sndcols[0].slice(6)};
        color: ${sndcols[2]};
    } .sndcolor:hover {
        background: #${sndcols[1].slice(0, 6)};
        box-shadow: 0 5px ${sndcols[1].slice(6)};
    }\n`;

    const ss = document.createElement('style');
    ss.appendChild(document.createTextNode(extss));

    const toReplace = document.querySelector('head style');
    if(toReplace) document.querySelector('head').removeChild(toReplace);
    document.querySelector('head').appendChild(ss);
}

function ERR(m) {
    if(!errMode) {
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
        timesClickedAfterEvaluation++;
        saveState.tcae++;
        USS();

        decFS();
    }
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

function esn(n) {
    return 10 ** n;
}

function rvv(name) { // retrieve variable value
    const val = vnl?.[name];
    console.log(name, val, 'rvvcall');
    if(!val) {
        ERR("Invalid Variable Name");
        return "VariableError";
    }

    return val;
}

function NP(s) { // negative parse
    if(s[0] === '⁻') return -s.slice(1);
    else return +s;
} function RNP(s) { // reverse negative parse
    return s.replace(/(\.\d*[^0])0+[Ee]/, "$1E")
            .replace(/^-(\d+(?:\.\d+)?)$/, "⁻$1");
}


function ansLoc(ix) {
    const eval = localStorage.entryVals ? localStorage.entryVals : '';
    return eval.split(',')[ix - 1];
}

function ansLocEval(ix) {
    if(ix > LSF("entries").length) {
        ERR(`Ans #${ix} is out of bounds`);
        return 'EntryError';
    }
    const a = ansLoc(ix);
    if(a.includes("Error")) {
        ERR(`Ans #${ix} results in ${a}`);
        return 'EntryError';
    }

    return a.replace('E', '*10^');
}

function CEVAL(str, op = false, exact = false) {
    if(count("(", str) !== count(")", str)) {
        if(!op) ERR("Invalid Bracketing");
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
        "ansf": [ansLocEval, 1],
        "pow": [Math.pow, 2],
        "loga": [LOG, 1],
        "laun": [LN, 1],
        "etxp": [Math.exp, 1],
        "pe": [perms, 2],
        "co": [combs, 2],
        "esn": [esn, 1]
    };
    let c = str;
    c = c.replaceAll('pi', Math.PI);
    c = c.replaceAll('euler', euler);
    c = c.replaceAll('()', '(0)');

    try {
        let whileIndex = 0;
        while(/\(.*\)/.test(c)) {
            if(++whileIndex > 1000) {
                ERR("Invalid Expression");
                return "CalculationError";
            }
            c = c.replace(/([a-zA-Z]+)?\(([^()]*)\)/, (_, p1, p2) => {
                if(p1) {
                    console.log(p1, p2, 'p1 p2 log')
                    const args = p2.split(',').map(e => isNaN(e) ? NP(CEVAL(e)) : (e.length === 0 ? '' : +NP(e)));
                    console.log(args);
                    //const args2 = args.filter(Boolean);
                    console.log(args, 'args log');
                    if(args.length < funcs[p1][1]) {
                        console.log('args error', p2);
                        if(!op) ERR("Invalid Expression");
                        c = "CalculationError";
                        return c;
                    } else {
                        return RNP(String(funcs[p1][0](...args)));
                    }
                }
                else return String(CEVAL(p2, op, true));
            });
        }

        function srepl(op, cb) {
            let r = c;
            while(new RegExp(`[${op}]`).test(r) && !/^-\d+(\.\d+)?$/.test(r)) {
                let br = r; // before replace
                r = r.replace(new RegExp(`${nReg}([${op}])${nReg}`), cb);
                let ar = r; // after replace
                console.log(br, ar);
                if(ar === br) break;
            }
            return r;
        }
        if(/^[)*/+\^-]|[(*/+\^-]$/.test(c)) throw Error();

        c = srepl('\\^', (_, p1, p2, p3) => String(NP(p1) ** NP(p3)));
        c = srepl('*/', (_, p1, p2, p3) => String(p2 === '*' ? NP(p1) * NP(p3) : (
            +p3 === 0 ? 'ZeroDivisionError' : NP(p1) / NP(p3)
        )));
        if(c.includes('ZeroDivisionError')) {
            if(!op) {
                c = 'ZeroDivisionError';
                ERR("Division By 0");
            }
            return c;
        }
        console.log(c, 'before add/sub')
        c = srepl('+-', (_, p1, p2, p3) => {
            console.log('srepl', p1, p2, p3);
            return RNP(String(p2 === '+' && !p1.endsWith('e') ? NP(p1) + NP(p3) : NP(p1) - NP(p3)))
        });
        console.log(c, 'after add/sub')
    } catch(e) {
        console.log('main error, op:', op);
        if(!op) ERR("Invalid Expression");
        c = "CalculationError";
    }
    if(c === 'Infinity') {
        console.log('infinity error');
        if(!op) ERR("Calculation involves value too large (exceeds ~1.7977E308)");
        c = "CalculationError";
    } else if(c !== c || !(new RegExp(`^${nReg}$`).test(RNP(c))) && !c.includes('Error')) { // if c is exactly NaN or the string is not a number (but not NaN)
        console.log('nan error', c)
        if(!op) ERR("Invalid Expression");
        c = "CalculationError";
    }

    c = (exact ? c : expoParse(c)).replace(/(?<=\.\d*)0+$/, "");
    c = c.replace(/\.$/, "");

    console.log(c, 'end of ceval');

    decFS();

    console.log(close(c), 'close c');

    return c.includes("Error") ? c : RNP(String(close(c)));
}

function expoParse(s) {
    const nps = NP(s);
    if(+nps >= 1e15 || +nps !== 0 && +nps > -9e-6 && +nps < 1e-6) return (+nps).toExponential()
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
        num = RNP(NP(num).toFixed(maxLim));
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
    return !(!!val.match(/^\d+$/)) ? `<span class="hoverValue"><sub>${val}</sub></span>` : `<sub>${val}</sub>`;
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
    console.log('nth calculation', a, dor, n, type);
    if(type === 'arithmetic') return +a + (+n - 1) * +dor;
    else if (type === 'geometric') return +a * (+dor) ** (+n - 1);
}

function close(num) {
    // const rgxe = /\./;
	const rgxi = /\.(\d)9/;
    const rgx9 = /\.[^9]+9{9,}/;
    const rgx0 = /(?<!0)\.0{9,}/
    const rgxd = /\.((0*)[^0]\d*)(0+$|0{9,})(?!\d*[eE])/;
    const nts = String(num);
    const neg = nts[0] === '-';

    const mfn = Math.floor(Math.abs(num));
    console.log(rgxd.exec(nts), 'rgxdexecnts')
    if(rgxi.test(nts) && rgx9.test(nts)) return (neg ? -1 : 1) * (mfn + Number(`0.${parseInt(rgxi.exec(nts)[1]) + 1}`));
    else if (rgx0.test(nts)) return mfn;
    else if (rgxd.test(nts)) return (neg ? -1 : 1) * (mfn + Number(`0.${rgxd.exec(nts)[1]}${rgxd.exec(nts)[2]}`));
    else return num;
}

function realTemplate(val, fnc) {
    const main = Math[fnc](val * Math.PI / 180);
    console.log('main', main);
    return (main / 1.2246467991473532e-16) % 1 === 0 && main < 1e-8 && main > -1e-8 && fnc !== 'cos' ? 0 : close(main);
} function fakeTemplate(val, fnc) {
    const main = Math[fnc](val);
    console.log('main', main);
    return (main / 1.2246467991473532e-16) % 1 === 0 && main < 1e-8 && main > -1e-8 && fnc !== 'cos' ? 0 : close(main);
}

function sinFake(val) { return fakeTemplate(val, "sin") }
function cosFake(val) { return fakeTemplate(val, "cos") }
function tanFake(val) { return fakeTemplate(val, "tan") }
function sinReal(val) { return realTemplate(val, "sin") }
function cosReal(val) { return realTemplate(val, "cos") }
function tanReal(val) { return realTemplate(val, "tan") }

function arealTemplate(val, fnc) {
    const main = Math[fnc](val) / Math.PI * 180;
	return close(main);
} function afakeTemplate(val, fnc) {
    const main = Math[fnc](val);
    return close(main);
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
    console.log('nth2 num input', num);
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

function rmvEvtList(pnode, ...elems) { // remove event listeners by cloning and replacing
    for(const e of elems) {
        const newNode = e.cloneNode(true);
        console.log(pnode, newNode, e, 'pne');
        pnode.replaceChild(newNode, e);
    }
}

function spliceString(str, add, ix) {
    const split = [...str];
    split.splice(ix, 0, ...add);
    return split.join('');
}

function changeVar(name, val, del = false) {
    if(del) delete vnl[name];
    else vnl[name] = val;
    localStorage.varVals = JSON.stringify(vnl);
}

function USS() { // update save state
    localStorage.saveState = JSON.stringify(saveState);
}



document.body.addEventListener("contextmenu", ev => {
    ev.preventDefault();
});
del.addEventListener("click", DEL);
function proxySet(t) {
    extra.innerHTML = Object.values(t).reduce((a, c) => a + c + " ", "");
    document.querySelectorAll(".hoverValue").forEach(e => {
        const val = e.querySelector("sub").textContent;
        console.log(val, 'val');
        qsaHover(e, val.length === 1 ? new RegExp(`V${val} --&gt; (\\d+|Ans #\\d+\\/\\d+ --&gt; \\d+(\\.\\d+)?) \\| `) : /Ans #\d+\/\d+ --&gt; \d+(\.\d+)?\s\|\s/);
    });
} function proxyDelete(t, p) {
    if(p in t) delete t[p];
    proxySet(t);
}

function ansInput(ansinput, ev, reset = null, dec = false) {
    const brackPos = [ansinput.value.search(/\(/), ansinput.value.search(/\)/)];
    const brackBool = ansinput.value.includes("(");
    if([...allowedPlusChars, dec ? '.' : ''].includes(ev.key)) {
        if(digitCount(ansinput.value) === 5 && reset && /\d/.test(ev.key) || 
            ['.', 'Ans'].some(e => ansinput.value.includes(e)) && ev.key === '.') ev.preventDefault();
        if(reset)
            if(ansinput.value !== 10) { // specifically for log, needs to be general
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
            eCount.textContent = "0";
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
        // if(bar.value === ans && decCount(ans) > fixed) {
        //     bar.value = RNP(NP(bar.value).toFixed(fixed));
        // }
        delete proxEOBJ.exc_rnd;
    } else {
        // if(bar.value === ans && decCount(ans) > fixed) {
        //     bar.value = RNP(NP(bar.value).toFixed(fixed));
        // }
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
    barvalue("");
} function mp() {
    if(!isNaN(bar.value)) {
        memory += parseFloat(bar.value);
        barvalue("");
    }
} function mm() {
    if(!isNaN(bar.value)) {
        memory -= parseFloat(bar.value);
        barvalue("");
    }
} function mr() {
    barvalue(memory);
}

document.getElementById('mc').addEventListener("click", mc);
document.getElementById('mp').addEventListener("click", mp);
document.getElementById('mm').addEventListener("click", mm);
document.getElementById('mr').addEventListener("click", mr);

function sndAction() {
    timesActivated++;
    document.querySelectorAll('.specs').forEach(s => {
        s.classList.toggle('sndcolor');
    });
    if(timesActivated & 1 === 1) {
        proxEOBJ.snd = "2ND";
        console.log('snd set');
        for(let i = 0; i < size; i++) {
            const si = smalls[i];
            const ni = nbs[i];
            si.style.opacity = curTheme.specfncs.sndmode.up[1];
            si.style.fontWeight = 600;
            si.style.color = curTheme.specfncs.sndmode.up[0];
            ni.style.opacity = 0.3;
            if(/S[a-zA-Z]/.test(si.textContent) || ni.textContent.includes('log')) 
                ni.parentNode.classList.toggle('holding');
        }

        sndactive = true;
        sndsub.style.opacity = 1;
        sndsub.style.fontWeight = 600;
    }
    else {
        delete proxEOBJ.snd;
        for(let i = 0; i < size; i++) {
            const si = smalls[i];
            const ni = nbs[i];
            si.style.opacity = curTheme.specfncs.normal.up[1];
            si.style.fontWeight = 400;
            si.style.color = curTheme.specfncs.normal.up[0];
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

function qsaHover(hv, rr) { // query selector answer hover (hover value, regex replacer)
    function simpleAnsfRepl(text) { // simple answer function replacement
        const ES = LSF("entries").length; // entry size
        if(ansRgx.test(text)) {
            let seqIx = ansLoc(Number(text.replace(ansRgx, "$1")));
            if(seqIx?.includes("Error")) seqIx = `<span class='red'>${seqIx}</span>`;
            else if(!seqIx) seqIx = "<span class='red'>Out of Bounds</span>";
            return text.replace(ansRgx, `Ans #$1/${ES} --> `) + seqIx;
        } else return text;
    }

    console.log(hv.textContent, 'qsahover');
    hv.addEventListener("mouseover", () => {
        const hvtc = hv.textContent;
        console.log(hvtc, HVQS(), 'hvtc + hvqs');
        if(!HVQS()) {
            const HV = document.createElement("div");
            HV.id = "hv";
            HV.classList.add('fadeIn');
            document.body.append(HV);
            // console.log(HVQS(), document.querySelector("#hv"), HV);
        }

        console.log(hvtc, HVQS(), 'hvtc + hvqs');
        if(hvtc.length === 1) {
            const varVal = vnl[hvtc];
            HVQS().innerHTML = `V${hvtc} --> ${simpleAnsfRepl(varVal)}` + (HVQS().textContent ? " | " + HVQS().innerHTML : "");
        } else HVQS().innerHTML = simpleAnsfRepl(hvtc) + (HVQS().textContent ? " | " + HVQS().innerHTML : "");
    });
    hv.addEventListener("mouseout", () => {
        console.log(HVQS().innerHTML, rr, 'hvqsmouseout');
        if(HVQS().textContent.includes(" |"))
            HVQS().innerHTML = HVQS().innerHTML.replace(rr, "");
        else
            document.body.removeChild(HVQS());
    });
}

function SIPev() {
    SIP.onclick = null;
    bar.disabled = true;
    bnsnsnr.forEach(el => {
        el.disabled = true;
    });
}

function mainConfigTemplate(stv, drv, addProxy = true) {
    mutableSeriesConfigSettings.start = stv;
    mutableSeriesConfigSettings.difference_ratio = drv;
    const mscst = [...mutableSeriesConfigSettings.type][0].toUpperCase();
    const mscsdr = mutableSeriesConfigSettings.difference_ratio;
    const fmscsdr = fullMSCS(mscsdr);
    const mscsv = mutableSeriesConfigSettings.start;
    const fmscsv = fullMSCS(mscsv);
    const evalRgx = /\d+(\.\d+)?(E⁻?\d+)?/;
    if(JSON.stringify(mutableSeriesConfigSettings) !== JSON.stringify(defaultSeriesConfigSettings)) {
        const seqVal1 = Number(mscsdr.replace(ansRgx, "$1"));
        const seqVal2 = Number(mscsv.replace(ansRgx, "$1"));
        const seqEval = localStorage.entryVals.split(',');
        const seqIx1 = Number(seqEval[seqVal1 - 1]);
        const seqIx2 = Number(seqEval[seqVal2 - 1]);
        const astv = ansRgx.test(stv);
        const adrv = ansRgx.test(drv);
        const estv = evalRgx.test(stv) && !isNaN(seqIx1);
        const edrv = evalRgx.test(drv) && !isNaN(seqIx2);
        console.log(seqIx1, seqIx2, 'seqixs');
        console.log(seqVal1, seqVal2, 'seq values');
        if((!astv && !adrv) || (!isNaN(seqVal1) && seqVal1 >= 1 && seqVal1 < seqEval.length) && 
        (!isNaN(seqVal2) && seqVal2 >= 1 && seqVal2 < seqEval.length) && 
        [seqVal1, seqVal2].every(Number.isInteger) && (astv ? estv : true) && (adrv ? edrv : true)) {
            console.log(astv, adrv, estv, edrv, 'config stage A/X');
            mutableSeriesConfigSettings.difference_ratio = adrv ? seqIx1 : +mscsdr;
            mutableSeriesConfigSettings.start = astv ? seqIx2 : +mscsv;
            baseSub.textContent = astv || adrv ? "A" : "X";
            baseSub.style.color = curTheme.logserbase[astv || adrv ? "answer" : "constant"]; 
            baseSubPopup.textContent = ansRgx.test(stv) ? seqIx1 : +mscsdr;
            seqErr = false;
            console.log(mutableSeriesConfigSettings, 'mutableseriesconfigsettings');
        } else {
            baseSub.textContent = "E";
            baseSub.style.color = curTheme.logserbase.error;
            seqErr = true;
        }
        
        if(addProxy)
            proxEOBJ.sequence = `S<sub>${mscst}</sub>V${fmscsv}${mscst == 'G' ? 'R' : 'D'}${fmscsdr}`;
    } else {
        if(addProxy) {
            delete proxEOBJ.sequence;
            seqErr = false;
        }
    }
}

function arithTemplate() {
    geo.style.opacity = 0.5;
    ari.style.opacity = 1;
    mutableSeriesConfigSettings.type = "arithmetic";
    if(JSON.stringify(mutableSeriesConfigSettings) === jsonDef) {
        reset.style.visibility = "hidden";
    }
    diffh2.textContent = "Difference";
} function geomTemplate() {
    geo.style.opacity = 1;
    ari.style.opacity = 0.5;
    mutableSeriesConfigSettings.type = "geometric";
    reset.style.visibility = "visible";
    diffh2.textContent = "Ratio";
}

function config() {
    const reference = SIP.onclick;
    if(!sndactive) return;
    else {
        clearTimeout(this.downTimer);
        this.downTimer = setTimeout(() => {
            if(jsonDef === JSON.stringify(mutableSeriesConfigSettings)) {
                reset.style.visibility = "hidden";
            } else reset.style.visibility = "visible";
            scc.style.visibility = "visible";
            SIPev();
            ari.addEventListener("click", arithTemplate); 
            geo.addEventListener("click", geomTemplate);
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
                baseSub.style.color = curTheme.specfncs.sndmode.up[0];
            });
        }, 1000);
        save.addEventListener("click", () => {
            if(serDiff.value.length > 0 && stval.value.length > 0) {
                mainConfigTemplate(stval.value, serDiff.value);
                
                // document.querySelectorAll(".hoverValue").forEach(q => qsaHover(q, /Ans #\d+ --> \d+(\.\d+)?\s\|\s/));
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

function ansLogTemplate(liv) { // parameter is log input value
    const baseVal = Number(liv.replace(ansRgx, "$1"));
    const evals = localStorage.entryVals.split(',');
    const indexedVal = Number(evals[baseVal - 1]);
    const evalRgx = /\d+(\.\d+)?(E⁻?\d+)?/;
    let baseSubPopup = document.getElementById('baseSubPopup');
    if(Number.isInteger(baseVal) && baseVal >= 1 && baseVal <= evals.length && !evalRgx.test(indexedVal)) {
        logBase = indexedVal;
        baseSubLog.textContent = "A";
        baseSubLog.style.color = curTheme.logserbase.answer;
        baseSubPopup.textContent = indexedVal;
        logErr = false;
    } else {
        baseSubLog.textContent = "E";
        baseSubLog.style.color = curTheme.logserbase.error;
        baseSubPopup.innerHTML = "<em>x</em> in Ans(x) is not valid";
        logErr = true;
    }
} function nonAnsLogTemplate(liv) {
    baseSubLog.textContent = "X";
    baseSubLog.style.color = curTheme.logserbase.constant;
    logBase = liv;
    logErr = false;
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
                
                if(logInput.value !== "10" && logInput.value.includes("(")) {
                    proxEOBJ.log = "LOG"+`<sub>${logInput.value}</sub>`;
                } else {
                    baseSubLog.textContent = logInput.value;
                    logErr = false;
                    delete proxEOBJ.log;
                }
                if(logInput.value.search(ansRgx) > -1) {
                    proxEOBJ.log = "LOG"+`<span class="hoverValue"><sub>${logInput.value}</sub></span>`;
                    ansLogTemplate(logInput.value);
                } else if (logInput.value !== "10") {
                    proxEOBJ.log = `LOG<sub>${logInput.value}</sub>`;
                    nonAnsLogTemplate(logInput.value);
                } else {
                    logBase = 10;
                    baseSubLog.style.color = curTheme.textcol;
                    logErr = false;
                }
                // document.querySelectorAll(".hoverValue").forEach(q => qsaHover(q, /Ans #\d+ --> \d+(\.\d+)?\s\|\s/));
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

function unError() {
    document.body.removeChild(document.querySelector("#err"));
    errMode = false;
    bar.value = expr;
    bar.setSelectionRange(ePos, ePos);
}

function setValue(v) {
    console.log(v, 'setvalue');
    if(errMode) {
        unError();
    } else {
        timesClickedAfterEvaluation++;
        saveState.tcae++;
        USS();
        let inputIx = bar.selectionStart;
        function template(dset, attr, pre = "", app = "") {
            const vgaa = v.getAttribute(attr);
            console.log(dset, attr, pre, app, 'dset attr pre app');
            let i = Number(dset) + app.length + pre.length;
            let a = inputIx + i;
            barvalue(brackForClick(inputIx - 1, bar.value, pre + vgaa + app));
            const iftcae = timesClickedAfterEvaluation === 1 && ![...operArr, '!', '%'].includes(vgaa) ? i : a;
            console.log(iftcae, i, a);
            bar.setSelectionRange(iftcae, iftcae);
        }
        if(!sndactive || sndactive && !v.hasAttribute("data-specVal")) {
            const vgadv = v.getAttribute("data-val");
            if(vgadv === '.' && (obef || bar.value === '')) {
                template(v.dataset.valix, "data-val", "0");
            }
            if(!(vgadv === '.' && !Number.isInteger(+ans) && bar.value.slice(inputIx - 3, inputIx) === 'Ans')) {
                if(timesClickedAfterEvaluation === 1) barvalue('');
                const io = [...operArr, '!', '%'].includes(vgadv);
                if(io && bar.value === '') {
                    barvalue('Ans');
                    inputIx = bar.selectionStart;
                } if(!(obef && io)) {
                    if(vgadv === 'log()' && logErr) {
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
                    barvalue(s.join(''));
                    bar.setSelectionRange(bss, bss);
                }
            } else template(svi, "data-specval");
        }
    }

    decFS();
    ansFuncHover();
}

document.querySelectorAll(".val")
    .forEach(n => n.addEventListener("click", () => setValue(n)));

document.getElementById('cac').addEventListener("click", () => {
    if(!errMode) {
        barvalue("");
        timesClickedAfterEvaluation = 0;
        saveState.tcae = 0;
        USS();
        decFS();
        ansFuncHover();
    } else unError();
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

function evaluate(string, eop = false, noExtraBrack = false, onlyConversion = false) {
    const rgxVal = "(⁻?\\d+(?:\\.\\d+)?|(?<!ak|p)e|π|V.)";

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

    const ansf = ansFunc;
    const ava = accvar;

    const sndOper = {
        "(?<!n)√" : roa, 
        [rgxVal + "n√\\(" + rgxVal + "\\)"] : rob,

        [rgxVal + "!"] : fpa,
        "%" : fpb,
        
        [rgxVal + "C" + rgxVal] : pca, 
        [rgxVal + "P" + rgxVal] : pcb,

        ["log(" + rgxVal + ")"] : lea,
        ["E" + rgxVal] : leb,

        "π" : pea,
        "e(?!xp|sn)" : peb,

        "(?<!arc)sin" : sia,
        "arcsin" : sib,

        "(?<!arc)cos" : coa, 
        "arccos" : cob,

        "(?<!arc)tan" : taa, 
        "arctan" : tab,

        [rgxVal + "\\^" + rgxVal] : esa,
        ["S" + rgxVal] : esb,
        ["N" + rgxVal] : esc,

        "Ans(\\([1-9]\\d*\\))": ansf,
        "V.": ava,

        "ln" : lxa,
        "exp" : lxb
    };

    let str = '';
    for(let t of string) {
        if(t in simpleOper) t = simpleOper[t].conversion;
        str += t;
    }

    console.log(str, 'str');

    function serr(r, v) {
        str = str.replace(r, v);
    }

    if(ans !== null) {
        const rgx = new RegExp(`${rgxVal}(?!\\*)Ans(?!\\()|(?<r>Ans(?!\\*|\\()${rgxVal})`);
        let i = str.search(rgx);
        console.log(str);
        while(/AnsAns/.test(str)) str = str.replace(/AnsAns/, "Ans*Ans");
        let whileIndex = 0;
        while(i >= 0) {
            if(++whileIndex > 1000) {
                ERR("Invalid Expression");
                return "CalculationError";
            }

            str = brackForClick(rgx.exec(str)?.groups?.r ? i + 2 : i, str, "*");
            i = str.search(rgx);
        }
        serr(/Ans(?!\()/g, ans);
    }

    console.log(str, 'str before V switch');
    serr(/V(.)/g, "(V$1)");
    // serr(new RegExp(`${rgxVal}?(E${rgxVal})`), "($1$2)");
    console.log(str, 'str after V switch');

    // implicit multiplication
    for(const k in sndOper) {
        const val = sndOper[k];
        const rgx = new RegExp(k, 'g');
        const scopy = str;
        if(rgx.test(str) && val?.variable) {
            console.log(val, rgx, 'valrgx');
            const type = val.variable;
            const rvleft = spliceString(rgxVal, '(?<l>\\)|', 0) + ')'; // regex var for imp. mul. on the left
            const rvright = spliceString(rgxVal, '(?<r>\\(|', 0) + ')'; // regex var for imp. mul. on the right
            console.log(rvleft, rvright);
            const rstr = new RegExp(type === 'b' ? `${rvleft}(?!\\*)(?<r>${k})|(?<l>${k})(?!\\*)${rvright}` : (
                type === 'l' ? `${rvleft}(?!\\*)(?<r>${k})` : `(?<l>${k})(?!\\*)${rvright}`
            ));

            let ix = str.search(rstr);
            console.log(str, rstr, ix, 'rgxix')
            let equ = str === scopy;
            let whileIndex = 0;
            while(ix >= 0 && equ) {
                if(++whileIndex > 50) {
                    ERR("Invalid Expression");
                    return "CalculationError";
                }

                str = str.replace(rstr, rstr.exec(str)?.groups?.l + "*" + rstr.exec(str)?.groups?.r);
                equ = str !== scopy;
                ix = str.search(rstr);
            }
        }
    }


    console.log(str, 'str after impmul');

    serr(/V(.)/g, (_, p1) => rvv(p1)); // switch variables after implicit multiplication is present

    console.log(str, 'str after vswitch 2');

    // replacements
    const brackRGX = new RegExp(`\\)\\(|\\)${rgxVal}|${rgxVal}\\(`);
    const TbrackRGX = /\)\(/g;
    serr(TbrackRGX, ")*(");
    let whileIndex = 0;
    while(brackRGX.test(str)) {
        if(++whileIndex > 1000) {
            ERR("Invalid Expression");
            return "CalculationError";
        }
        str = brackForClick(str.search(brackRGX), str, "*");
    }

    function mainConversion() {
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
    }

    console.log(str, 'str before main conversion');

    mainConversion();

    console.log(str, 'str after main conversion');

    decFS();

    const evaluation = CEVAL(str, eop);
    if(evaluation?.includes('Error')) return evaluation;
    else {
        const evalN = close(evaluation);
        console.log((+evalN).toFixed(fixed), 'evaln');
        return expoParse(!exact ? limit(evalN) : RNP(NP(evalN).toFixed(fixed)));
    }
}

function evalSet() {
    if(bar.value === '') return;

    timesClickedAfterEvaluation = 0;
    saveState.tcae = 0;
    USS();
    if(lss < max && !errMode) {
        eCount.textContent++;
        if(!localStorage.entries) {
            localStorage.entries = bar.value + ",";
        } else localStorage.entries += bar.value + ",";
        
        // where bar changes value
        barvalue(evaluate(bar.value));
        ans = bar.value;
        
        decFS();
        ansFuncHover();

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
        if(!errMode) {
            ERR("No more space for answer entries");
            bar.value = 'EntryError';
            eLeft.textContent = "0 vacant entries";
        } else unError();
    }
}

document.getElementById("equb").addEventListener("click", evalSet);

copy.addEventListener("click", () => {
    const type = "text/plain";
    navigator.clipboard.write([new ClipboardItem({ [type]: new Blob([bar.value], { type }) })])
        .then(() => {
            copy.classList.add("success");
            setTimeout(() => {
                copy.classList.remove("success");
            }, 500);
        })
        .catch(() => {
            copy.classList.add("failure");
            setTimeout(() => {
                copy.classList.remove("failure");
            }, 500);
            ERR("Bar was unable to be copied");
            bar.value = "CopyError";
        });
});

paste.addEventListener("click", async () => {
    try {
        const pasted = (await navigator.clipboard.readText()).trim();
        const pastesplit = [...pasted];
        console.log(pastesplit, 'pastesplit');
        const exprPart = [...bar.value];
        if(pastesplit.every((e, i) => 
            [...operArr, '(', ')'].includes(e) || /\d|[πeCP!%NSE]/.test(e) || e === 'V' && /./.test(pastesplit[i + 1]))
            || /(((arc)?(sin|cos|tan))(?=\())|(n?√|ln|log|exp(?=\())/.test(pasted)) {
                exprPart.splice(bar.selectionStart, 0, pasted.replace(/\*/g, '×').replace(/\//g, '÷'));
                const newbss = bar.selectionStart + pasted.length;
                const accEP = exprPart.join('');
                barvalue(accEP);
                bar.setSelectionRange(newbss, newbss);
                saveUpdate('cpos', bar.selectionStart);
                timesClickedAfterEvaluation++;
                saveState.tcae++;
                USS();

                paste.classList.add("success");
                setTimeout(() => {
                    paste.classList.remove("success");
                }, 500);
        } else {
            paste.classList.add("failure");
            setTimeout(() => {
                paste.classList.remove("failure");
            }, 500);
            ERR("Invalid Expression Pasted");
            bar.value = "PasteError";
        }
    } catch (error) {
        paste.classList.add("failure");
        setTimeout(() => {
            paste.classList.remove("failure");
        }, 500);
        ERR("Could not read clipboard");
        bar.value = "PasteError";
    }
});

function DEL() {
    if(errMode) unError();
    else {
        if(timesClickedAfterEvaluation === 0 || bar.value === '') barvalue('');
        else {
            let barPos = bar.selectionStart;
            if(bar.value.length === 1 && barPos === 1) {
                barvalue('');
            } else {
                const BV = [...bar.value];
                let isBlock = false;
                let rangeValue = barPos === 0 || barPos == bar.value.length - 1 ? barPos : barPos - 1;
                for(const e of fullBlockArr) {
                    console.log(e, 'fba');
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
                        barvalue(BV.join(''));
                        rangeValue -= block.length - 1;
                        isBlock = true;
                        break;
                    } else continue;
                }
                if(!isBlock) {
                    if(barPos > 0) BV.splice(barPos - 1, 1);
                    barvalue(BV.join(''));
                    if(barPos === rangeValue) rangeValue--;
                }
                bar.setSelectionRange(rangeValue, rangeValue);
            }
        }
    }

    decFS();
    ansFuncHover();
}

function ARROW(binaryDirection) {
    if(bar.value.length > 0) {
        const b = !!binaryDirection;
        const barPos = bar.selectionStart;
        const BV = [...bar.value];
        let isBlock = false;
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
            saveUpdate('cpos', bar.selectionStart);
        }
    }
    decFS();
}

function ansFuncHover() {
    const ES = LSF("entries").length; // entry size
    const ARI = [...bar.value.matchAll(ansRgx.source, 'gi')].map(m => m[0].match(ansRgx)[1]); // answer regex indices
    if(!!ARI.length) {
        if(!HVQS()) {
            const hv = document.createElement("div");
            hv.id = "hv";
            hv.classList.add('fadeIn');
            document.body.appendChild(hv);
        }
        const textToAdd = Array.from(new Set(ARI.map(a => {
            let res = ansLoc(a);
            if(res?.includes("Error")) res = `<span class='red'>${res}</span>`;
            else if(!res) res = "<span class='red'>Out of Bounds</span>";
            return `Ans #${a}/${ES} ==&gt; ${res}`
        }))).join(', ');
        console.log(ARI.map(a => {
            let res = ansLoc(a);
            if(res?.includes("Error")) res = `<span class='red'>${res}</span>`;
            else if(!res) res = "<span class='red'>Out of Bounds</span>";
            return `Ans #${a}/${ES} ==&gt; ${res}`
        }), textToAdd, 'ari + texttoadd');

        if(/\|/.test(HVQS().textContent))
            HVQS().innerHTML = HVQS().innerHTML.replace(/(?<=\|\s)(.*)/, textToAdd);
        else
            HVQS().innerHTML = textToAdd;
    } else {
        if(HVQS()) document.body.removeChild(HVQS());
    }
}

bar.addEventListener("keyup", () => {
    decFS();
    ansFuncHover();
});

bar.addEventListener("beforeinput", ev => {
    if(ev.inputType === 'insertText' && ev.data === '. ') ev.preventDefault();
});

bar.addEventListener("keydown", ev => {
    if(errMode) {
        ev.preventDefault();
        document.body.removeChild(document.querySelector("#err"));
        errMode = false;
        barvalue(expr);
        bar.setSelectionRange(ePos, ePos);
    } else {
        function operIsThere(nodot = false) {
            return (nodot ? operArr.filter(o => o !== '.') : operArr).indexOf(bar.value[ev.target.selectionStart - 1]) > -1;
        }

        function type(s, i) {
            const etss = ev.target.selectionStart;
            if(!(ev.key === '.' && !Number.isInteger(+ans) && bar.value.slice(etss - 3, etss) === 'Ans')) {
                const inputIx = ev.target.selectionStart;
                barvalue(timesClickedAfterEvaluation === 0 ? s : brackForClick(inputIx - 1, bar.value, s));
                console.log(inputIx, 'inputix', i);
                const iftcae = timesClickedAfterEvaluation === 0 ? i : inputIx + i;
                bar.setSelectionRange(iftcae, iftcae);
                inputIndex += i;
                timesClickedAfterEvaluation++;
                saveState.tcae++;
                USS();
            }
        }
        
        function superType(char) {
            function ansSuperTypeTemplate() {
                type("Ans" + char, 4);
            }
            if(bar.value === '' || timesClickedAfterEvaluation === 0) {
                if(ans != null || timesClickedAfterEvaluation === 1) {
                    if(Number.isInteger(+ans) && char === '.' || char !== '.') {
                        barvalue('');
                        ansSuperTypeTemplate();
                    }
                }
            } else type(char, 1);
        } 

        function evalSetFunc() {
            ev.preventDefault();
            evalSet();
        }

        if(bar.value[ev.target.selectionStart - 1] === 'V') {
            if(!Object.keys(vnl).includes(ev.key) && !ev.key?.[1]) {
                ev.preventDefault();
                ERR(`Variable, ${ev.key} does not exist`);
                barvalue("VariableError");
            } 
            // else {
            //     console.log(vnl, ev.key);
            //     if(/Error|Bounds/.test(vnl[ev.key])) {
            //         ev.preventDefault();
            //         ERR(`Invalid entry input for variable, ${ev.key}`);
            //         bar.value = "EntryError";
            //     }
            // }
        } 

        else switch(ev.key) {
            case "A":
                ev.preventDefault();
                barvalue("");
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

            case ")":
                ev.preventDefault();
                const numOpenParen = [...bar.value].filter(e => e === '(').length;
                const numCloseParen = [...bar.value].filter(e => e === ')').length;
                if(numOpenParen > numCloseParen) type(")", 1);
                break;

            case "s":
                ev.preventDefault();
                console.log(bar.selectionStart, timesClickedAfterEvaluation, 'bss tcae');
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
                if(operIsThere(true) || bar.value === "")
                    type("0.", 2);
                else if (!operIsThere())
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

            case "v":
                ev.preventDefault();
                type("V", 1);
                break;
            
            case "V":
                ev.preventDefault();
                type("V", 1);
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

    decFS();
}); 

function neg() {
    if(!isNaN(bar.value.replace('⁻', '-'))) {
        barvalue(bar.value[0] === '⁻' ? bar.value.slice(1) : '⁻' + bar.value);
    } else {
        console.log('sup', bar.value[bar.selectionStart - 1]);
        if(bar.value[bar.selectionStart - 1] !== '⁻') {
            const ix = bar.selectionStart + 1;
            barvalue(brackForClick(bar.selectionStart - 1, bar.value, "⁻"));
            bar.setSelectionRange(ix, ix);
        }
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

function blinkMain() {
    const cursorP = ["forCursorFadeIn", "forCursorFadeOut"];
    if(!blinkingCursor) blinkToggle(cursorP[1], cursorP[0], "hidden", "paused");
    else blinkToggle(cursorP[0], cursorP[1], "visible", "initial");
}

function blinker() {
    blinkingCursor = !blinkingCursor;
    saveState.caret = !saveState.caret;
    blinkMain();
    USS();
}

document.getElementById("bcContainer").addEventListener("click", blinker);

document.addEventListener("selectionchange", () => {
    const prev = bar.value[bar.selectionStart - 1];
    sbef = prev === 'S';
    nbef = prev === 'N';

    obef = operArr.includes(prev);
});

document.getElementById("mem").addEventListener("click", () => {
    dmem.classList.toggle('dnone');
    dmem.classList.toggle('dbox');
});

let tog = true;
function VRev(toggle) {
    bar.disabled = toggle;
    document.querySelectorAll('#dvar input').forEach(el => {
        el.disabled = !toggle;
    });
}

function proxyVarsFunc() {
    proxEOBJ.vars = `V${Object.keys(vnl).sort().map(e => `<span class="hoverValue"><sub>${e}</sub></span>`).join('')}`
}

function setvarTemplate(name, val) {
    changeVar(name, val);
    const newvar = document.createElement("button");
    newvar.classList.add('chvar', 'val');
    newvar.dataset.val = 'V' + name;
    newvar.textContent = name;
    newvar.addEventListener("click", () => setValue(newvar));
    flexbut.appendChild(newvar);
}

function setvarF() {
    const vnv = varname.value;
    const vvv = varval.value;

    console.log(vnv, vnl, 'vnvvnl');
    if(vnv in vnl) changeVar(vnv, vvv);
    else setvarTemplate(vnv, vvv);
    varval.value = '';
    varname.value = '';
    varb1.removeEventListener("click", setvarF);
    varb1.id = '';
    varb1.classList.add('nostyle');
    varb1.classList.remove('stvc', 'h5but');

    proxyVarsFunc();
    outTemp();
} function removevarF() {
    const vnv = varname.value;
    flexbut.removeChild(flexbut.querySelector(`*[data-val="V${vnv}"]`));

    changeVar(vnv, '', true);
    if(!Object.keys(vnl).length) delete proxEOBJ.vars;
    else proxyVarsFunc();

    varval.value = '';
    varname.value = '';
    varb1.removeEventListener("click", setvarF);
    varb1.id = '';
    varb1.classList.add('nostyle');
    varb1.classList.remove('stvc', 'h5but');

    varb2.classList.add('nostyle');
    varb2.removeEventListener("click", removevarF);
    varb2.classList.remove('rmvc', 'h5but');
    varb2.textContent = '';
}


function setTemp() { // add template
    varb1.classList.remove('nostyle', 'rmvc');
    varb1.classList.add('stvc', 'h5but');
    varb1.textContent = 'Set';
    varb2.textContent = '';
    varb2.classList.remove('rmvc', 'h5but');
    varb2.classList.add('nostyle');

    varb1.addEventListener("click", setvarF);
    varb2.removeEventListener("click", removevarF);
} function rmTemp() { // remove template
    varb1.classList.remove('nostyle', 'stvc');
    varb1.classList.add('stvc', 'h5but');
    varb1.textContent = 'Set';
    varb2.textContent = 'Rmv';
    varb2.classList.add('rmvc', 'h5but');
    varb2.classList.remove('nostyle');

    varb1.addEventListener("click", setvarF);
    varb2.addEventListener("click", removevarF);
} function outTemp() { // out/exit template
    varb1.classList.remove('stvc', 'h5but');
    varb1.classList.add('nostyle');
    varb1.textContent = 'Set';

    varb2.classList.remove('rmvc', 'h5but');
    varb2.classList.add('nostyle');
    varb2.textContent = '';

    varb1.removeEventListener("click", setvarF);
    varb2.removeEventListener("click", removevarF);
}

function KUVevent(nov) { // keyup variable event (name or value)
    const varb = nov === 'v' ? varval : varname;
    if(!varb.value && varb1.classList.contains('h5but')) outTemp();
}

varval.addEventListener("keyup", () => { KUVevent('v') });
varname.addEventListener("keyup", e => { if(e.key !== 'Space') KUVevent('n') });

varval.addEventListener("keydown", ev => {
    ansInput(varval, ev, null, true);
    if(varname.value && /\d|\.|a/i.test(ev.key) && ev.key.length === 1 || varval.value) setTemp();
    else { if(varb1.classList.contains('h5but')) outTemp(); }
    
});

varname.addEventListener("keydown", ev => {
    if(ev.key !== 'Space') {
        console.log(varval.value);
        if(varval.value) setTemp();
        else { if(varb1.classList.contains('h5but')) outTemp(); }

        
        if(Object.keys(vnl).includes(ev.key)) {
            console.log('sup');
            const vek = vnl[ev.key];
            varval.value = vek;
            varval.setSelectionRange(0, vek.length);

            rmTemp();
        } 

        if(!ev.key[1]) {
            varname.value = ev.key;
            varval.focus();
            ev.preventDefault();
        }
    } else ev.preventDefault();
});

document.getElementById("var").addEventListener("click", () => {
    dvar.classList.toggle('dnone');
    dvar.classList.toggle('dbox');
    VRev(tog);
    tog = !tog;
});

themeLink.addEventListener("click", () => {
    themeUI.classList.toggle("dnone");
});

const [dft, lgt, drt] = document.querySelectorAll('#themes .theme');
dft.addEventListener('click',  () => {
    TBT(localStorage.scalcTheme);
    localStorage.scalcTheme = 'default';
    TBT(localStorage.scalcTheme);
    curTheme = themes.default;
    loadTheme(themes.default);
}); lgt.addEventListener('click',  () => {
    TBT(localStorage.scalcTheme);
    localStorage.scalcTheme = 'light';
    TBT(localStorage.scalcTheme);
    curTheme = themes.light;
    loadTheme(themes.light);
}); drt.addEventListener('click',  () => {
    TBT(localStorage.scalcTheme);
    localStorage.scalcTheme = 'dark';
    TBT(localStorage.scalcTheme);
    curTheme = themes.dark;
    loadTheme(themes.dark);
});


// initializing save state
for(const [k, v] of Object.entries(saveState)) {
    if(k === 'bar') barvalue(v);
    else if (k === 'caret') {
        console.log(k, v, 'karet value');
        blinkingCursor = v;
        blinkMain();
    }
    else if (k === 'cpos') bar.setSelectionRange(v, v);
    else if (k === 'tcae') timesClickedAfterEvaluation = v;
    else if (k === 'proxEOBJ') for(const [w, q] of Object.entries(saveState.proxEOBJ)) {
        proxEOBJ[w] = q;
        console.log(w, 'w');
        proxFUNCS[w](q);
    }   
}
eCount.textContent = lsE.length;
decFS();
// newplus.addEventListener("click", () => window.open('../themebuilder/tb.html', '_blank'));