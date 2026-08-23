/* ------------- copied from calc.js for simplicity ------------- */

let timesActivated = 0;
let sndactive = false;
const smalls = document.querySelectorAll(".small"), nbs = document.querySelectorAll(".nb"), size = smalls.length;
const tbbody = document.querySelector("#tbbody");
const tblogser = document.querySelector("#tblogser");
const tbmemvar = document.querySelector("#tbmemvar");
const tbfunc = document.querySelector("#tbfunc");

const refbutton = document.querySelector("#reference");
const editbutton = document.querySelector("#edit");
const refoptions = document.querySelector("#refcont div");

const finishTheme = document.querySelector("#finish button");
const finalBox = document.querySelector("#finalBox");
const thmConfirm = document.querySelector("#confirm");
const thmCancel = document.querySelector("#cancel");
const glass = document.querySelector("#glass");

let saved = false;
let canedit = true;
let editing = {
    active: false,
    segue: false,
    theme: "",
    currentEdit: {},
    beforeEdit: {}
};

if(!localStorage.customThemes) localStorage.customThemes = "{}";
if(localStorage.customThemes === "{}") {
    editbutton.classList.add('dnone');
    canedit = false;
}

let curTheme = {
    bg: "#e8e7e7",
    body: "#eeeeee",
    bodyshadow: "#bcbcbc",
    barnotes: "#000000",
    copy: ["e9e9ea#d0d0d2", "caced0#bbbebf", "#000000"],
    paste: ["e9e9ea#d0d0d2", "caced0#bbbebf", "#000000"],
    curbut: ["e9e9ea#d0d0d2", "caced0#bbbebf", "#000000"],
    textcol: "#000000",
    holdbtnborder: "#000000",
    arrows: ["ffffff#f1f4f0", "#000000"],
    memvar: {
        subbtns: ["e9e9ea#d0d0d2", "caced0#bbbebf", "#000000"],
        bg: "rgba(255, 255, 255, 0.7)"
    },
    logserbase: {
        constant: "#eccc68",
        answer: "#0be881",
        error: "#ea2027"
    },
    delacbrac: ["e9e9ea#d0d0d2", "caced0#bbbebf", "#000000"],
    snd: ["e9e9ea#d0d0d2", "caced0#bbbebf", "#000000"],
    num: ["e9e9ea#d0d0d2", "caced0#bbbebf", "#000000"],
    ans: ["e9e9ea#d0d0d2", "caced0#bbbebf", "#000000"],
    radround: ["e9e9ea#d0d0d2", "caced0#bbbebf", "#000000"],
    opers: ["e9e9ea#d0d0d2", "caced0#bbbebf", "#000000"],
    specfncs: {
        normal: {
            base: ["e9e9ea#d0d0d2", "caced0#bbbebf", "#000000"],
            up: ["#000000", 0.6]
        },
        sndmode: {
            // base: ["d9d4ef#cdc9de", "d8d2f3#cac5e1", "#000000"],
            up: ["#221040", 1]
        }
    }
};

const original = curTheme;
let prevOriginal = structuredClone(curTheme);

const themes = {
    default: {
        bg: "#e8e7e7",
        body: "#c8d6e5",
        bodyshadow: "#222f3e",
        barnotes: "#000000",
        copy: ["78e08f#b8e994", "2ed573#7bed9f", "#000000"],
        paste: ["ca53b0#d770c1", "af4898#be66ab", "#000000"],
        curbut: ["ffffff#f1f2f6", "ecf0f1#dfe6e9", "#000000"],
        textcol: "#000000",
        holdbtnborder: "#000000",
        arrows: ["1e272e#000000", "#ffffff"],
        memvar: {
            subbtns: ["686de0#4834d4", "4b7bec#3867d6", "#000000"],
            bg: "rgba(255, 255, 255, 0.7)"
        },
        logserbase: {
            constant: "#eccc68",
            answer: "#0be881",
            error: "#ea2027"
        },
        delacbrac: ["686de0#4834d4", "4b7bec#3867d6", "#000000"],
        snd: ["ff6b81#ff4757", "ef5777#f53b57", "#000000"],
        num: ["c56cf0#cd84f1", "a55eea#8854d0", "#000000"],
        ans: ["778ca3#4b6584", "a4b0be#747d8c", "#000000"],
        radround: ["ffbe76#f0932b", "fea47f#f97f51", "#000000"],
        opers: ["f7d794#f5cd79", "eccc68#ffa502", "#000000"],
        specfncs: {
            normal: {
                base: ["686de0#4834d4", "4b7bec#3867d6", "#000000"],
                up: ["#000000", 0.6]
            },
            sndmode: {
                // base: ["686de0#4834d4", "4b7bec#3867d6", "#000000"],
                up: ["#b8e994", 1]
            }
        }
    },
    light: {
        bg: "#d8d5d5",
        body: "#e9eef3",
        bodyshadow: "#404040",
        barnotes: "#000000",
        copy: ["55e6c1#9aecdb", "33d9b2#84dbc7", "#000000"],
        paste: ["df6886#bf5771", "cc5170#b9264b", "#000000"],
        curbut: ["ffffff#f1f2f6", "ecf0f1#dfe6e9", "#000000"],
        textcol: "#000000",
        holdbtnborder: "#142c4c",
        arrows: ["1e272e#000000", "#ffffff"],
        memvar: {
            subbtns: ["dfe4ea#ced6e0", "b6c9e0#98b5da", "#000000"],
            bg: "rgba(255, 255, 255, 0.7)"
        },
        logserbase: {
            constant: "#868437",
            answer: "#00bd65",
            error: "#ea2027"
        },
        delacbrac: ["dfe4ea#ced6e0", "b6c9e0#98b5da", "#000000"],
        snd: ["f8efba#fad390", "f6e58d#f9ca24", "#000000"],
        num: ["f7f1e3#d1ccc0", "f2e8cb#e9cf71", "#000000"],
        ans: ["d3e4e6#c3d6d8", "d1d8e0#a5b1c2", "#000000"],
        radround: ["c5cfcb#a2aca8", "a9c4b9#869d94", "#000000"],
        opers: ["eeeff4#cad3c8", "f5f6fa#95afc0", "#000000"],
        specfncs: {
            normal: {
                base: ["f3cfe7#dfb5d1", "d293bd#cb76af", "#000000"],
                up: ["#000000", 0.6]
            },
            sndmode: {
                // base: ["f3cfe7#dfb5d1", "d293bd#cb76af", "#000000"],
                up: ["#192b4a", 1]
            }
        }
    },
    dark: {
        bg: "#272530",
        body: "#131216",
        bodyshadow: "#464548",
        barnotes: "#ffffff",
        copy: ["3784dd#2b66aa", "006be8#1c66ba","#000000"],
        paste: ["ffa134#dc8d33", "e97c00#b36600", "#000000"],
        curbut: ["1a1a1a#504c4c", "2d2d2d#686464", "#ffffff"],
        textcol: "#ffffff",
        holdbtnborder: "#e8dfdf",
        arrows: ["badeee#a3c3d1", "#000000"],
        memvar: {
            subbtns: ["192045#282f53", "243069#36417c", "#ffffff"],
            bg: "rgba(229, 252, 255, 0.8)"
        },
        logserbase: {
            constant: "#eccc68",
            answer: "#0be881",
            error: "#ea2027"
        },
        delacbrac: ["3d4955#506070", "2f4051#385069", "#ffffff"],
        snd: ["3939f6#5c5cf3", "4545ae#5a5a9f", "#ffffff"],
        num: ["11111e#212137", "232336#313162", "#ffffff"],
        ans: ["2b2b4b#3e3e65", "424258#5e5e76", "#ffffff"],
        radround: ["2b5364#436b7c", "296c88#4892b2", "#ffffff"],
        opers: ["24222d#33313a", "312d42#464258", "#ffffff"],
        specfncs: {
            normal: {
                base: ["222123#3b393c", "2e2837#433c4e", "#ffffff"],
                up: ["#ffffff", 0.4]
            },
            sndmode: {
                // base: ["222123#3b393c", "2e2837#433c4e", "#ffffff"],
                up: ["#fc9a5e", 1]
            }
        }
    },
    original,

    ...JSON.parse(localStorage.customThemes)
};

function loadTheme(thm) {
    let extss = ''; // external style sheet
    function hashSplit(str) { return str.split('#').map(e => '#' + e); }

    function bcbsh(sel, arr) { // button color, box shadow, hover (selector, array)
        const elems = document.querySelectorAll(sel);
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
    } function inputbcbsh(sel, elem) { // similar function but sets input values from tb elements instead
        const inputs = document.querySelector(sel).querySelectorAll('input');
        let arr;
        if (Array.isArray(elem)) {
            if (elem.length > 2) {
                const [reg, hov, ...col] = elem;
                arr = [...hashSplit(reg), ...hashSplit(hov), ...col];
            } else if (elem.length === 2) {
                const [rhf, col] = elem;
                arr = [...hashSplit(rhf), col];
            }
        } else arr = [elem];

        inputs.forEach((e, i) => e.value = arr[i]);
    }

    document.body.style.background = thm.bg;
    inputbcbsh("#tbpage", thm.bg);

    document.querySelector('input').style.background = thm.body;
    document.querySelector('#body').style.background = thm.body;
    document.querySelector('#body').style.border = `3px solid ${thm.body}`;
    document.querySelector('#body').style.boxShadow = `15px 15px 0 ${thm.bodyshadow}`;
    tbbody.querySelectorAll("input").forEach((e, i) => e.value = [thm.body, thm.bodyshadow][i]);

    document.querySelector("#extra").style.color = thm.barnotes;
    extss += `.holding {
        border: 2px solid ${thm.holdbtnborder};
    }\n`;
    inputbcbsh("#tbhold", thm.holdbtnborder);

    bcbsh('#copy', thm.copy);
    bcbsh('#paste', thm.paste);
    bcbsh('#bcContainer', thm.curbut);
    document.querySelector('#blinkingCursor').style.background = thm.curbut[2];
    inputbcbsh("#tbcopy", thm.copy);
    inputbcbsh("#tbpaste", thm.paste);
    inputbcbsh("#tbcursor", thm.curbut);

    bar.style.color = thm.textcol;
    inputbcbsh("#tbtext", thm.textcol);
    inputbcbsh("#tbnotes", thm.barnotes);
    extss += `@keyframes fadecursorout {
        0% {caret-color: ${thm.textcol};}
        100% {caret-color: transparent;}
    } @keyframes fadecursorin {
        0% {caret-color: transparent;}
        100% {caret-color: ${thm.textcol};}
    }\n`;

    bcbsh('.arrow', thm.arrows);
    inputbcbsh("#tbarrow", thm.arrows);
    extss += `.arrow>* {
        border: solid ${thm.arrows[1]};
    }\n`;


    const [col, opac] = thm.specfncs[sndactive ? "sndmode" : "normal"].up;
    smalls.forEach(e => {
        e.style.color = col;
        e.style.opacity = opac;
    });

    ['.memory', '#mem', '#var'].forEach(mv => bcbsh(mv, thm.memvar.subbtns));
    document.querySelectorAll('#dmem, #dvar').forEach(d => d.style.background = thm.memvar.bg);
    inputbcbsh("#tbmemvar", thm.memvar.subbtns);
    tbmemvar.querySelector("input:nth-last-child(2)").value = `rgb(${thm.memvar.bg.slice(5, -6)})`;
    tbmemvar.querySelector("input:last-child").value = +thm.memvar.bg.slice(-4, -1);

    ['#brack', '#del', '#cac'].forEach(dab => bcbsh(dab, thm.delacbrac));
    inputbcbsh("#tbdelacbrac", thm.delacbrac);
    bcbsh('.snd', thm.snd);
    inputbcbsh("#tbsnd", thm.snd);
    bcbsh('.numbers', thm.num);
    inputbcbsh("#tbnum", thm.num);
    bcbsh('#ans', thm.ans);
    inputbcbsh("#tbans", thm.ans);
    bcbsh('#drer *', thm.radround);
    inputbcbsh("#tbradround", thm.radround);
    bcbsh('.operat', thm.opers);
    inputbcbsh("#tbopers", thm.opers);
    bcbsh('.specs', thm.specfncs.normal.base);
    console.log([...thm.specfncs.normal.base, thm.specfncs.normal.up[0]]);
    inputbcbsh("#tbfunc", [...thm.specfncs.normal.base, thm.specfncs.normal.up[0], thm.specfncs.sndmode.up[0]]);
    tbfunc.querySelector("input:nth-last-child(4)").value = thm.specfncs.normal.up[0];
    tbfunc.querySelector("input:nth-last-child(2)").value = thm.specfncs.normal.up[1];
    tbfunc.querySelector("input:nth-last-child(3)").value = thm.specfncs.sndmode.up[0];
    tbfunc.querySelector("input:nth-last-child(1)").value = thm.specfncs.sndmode.up[1];

    const tl = thm.logserbase;
    tblogser.querySelectorAll('input').forEach((e, i) => e.value = [tl.answer, tl.error, tl.constant][i]);
    document.querySelector("#logconst").style.color = tl.constant;
    document.querySelector("#servalid").style.color = tl.answer;
    document.querySelector("#sererror").style.color = tl.error;

    const ss = document.createElement('style');
    ss.appendChild(document.createTextNode(extss));

    const toReplace = document.querySelector('head style');
    if(toReplace) document.querySelector('head').removeChild(toReplace);
    document.querySelector('head').appendChild(ss);
}

function sndAction() {
    timesActivated++;
    document.querySelectorAll('.specs').forEach(s => {
        s.classList.toggle('sndcolor');
    });
    if(timesActivated & 1 === 1) {
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

function capitalize(s) { // for custom theme names
    return s.split(/\s/).map(e => e[0].toUpperCase() + e.slice(1)).join(' ');
}

const others = Object.keys(JSON.parse(localStorage.customThemes));
for(const o of others) {
    const button = document.createElement("button");
    button.textContent = capitalize(o);
    button.classList.add('toedit');
    refoptions.append(button);
}

refbutton.addEventListener("click", () => {
    refbutton.classList.toggle('dnone');
    if(canedit) editbutton.classList.toggle('dnone');
    refoptions.classList.toggle('dnone');
});

function themeButtonEvent(evt) {
    refoptions.querySelectorAll("button").forEach(r => {
        if(r.classList.contains('dnone')) {
            r.classList.remove('dnone');
        }
    });
    evt.target.classList.add('dnone');

    refoptions.classList.toggle('dnone');
    refbutton.classList.toggle('dnone');
    if(canedit) editbutton.classList.toggle('dnone');

    if(editing.segue) {
        editbutton.textContent = "Leave Editing Mode";
        editbutton.classList.add('leaveEdit');
        const etlc = evt.target.textContent.toLowerCase();
        prevOriginal = structuredClone(themes.original);
        themes.original = structuredClone(themes[etlc]);
        editing.beforeEdit = structuredClone(themes[etlc]);
        console.log('before edit', editing.beforeEdit);
        console.log('edit mode', themes.original);
        editing.theme = etlc;
        delete themes[etlc];
        editing.segue = false;
        editing.active = true;
        curTheme = structuredClone(editing.currentEdit[etlc] ?? themes.original);
        loadTheme(curTheme);
        document.querySelector("#original").classList.add('dnone');
        refoptions.removeChild(evt.target);
    } else {
        curTheme = themes[evt.target.textContent.toLowerCase()];
        loadTheme(curTheme);
    }
}

editbutton.addEventListener("click", () => {
    if(!editing.active) {
        editing.segue = true;
        refoptions.querySelectorAll("button").forEach(r => {
            if(r.classList.contains('toedit')) {
                r.classList.remove('dnone');
            } else r.classList.add('dnone');
        });
        editbutton.classList.add('dnone');
        refbutton.classList.add('dnone');
        refoptions.classList.remove('dnone');
    } else {
        editing.currentEdit[editing.theme] = structuredClone(curTheme);
        editing.active = false;
        themes[editing.theme] = structuredClone(editing.beforeEdit);
        curTheme = structuredClone(editing.beforeEdit);
        console.log('after edit', curTheme);
        themes.original = structuredClone(prevOriginal);

        const button = document.createElement("button");
        button.textContent = capitalize(editing.theme);
        button.classList.add('toedit', 'dnone');
        button.addEventListener("click", themeButtonEvent);
        refoptions.append(button);

        document.querySelector("#original").classList.remove('dnone');
        editbutton.textContent = "Edit Custom Theme";
        editbutton.classList.toggle('leaveEdit');

        loadTheme(curTheme);
        console.log('themes post editing', themes);
    }
});

refoptions.querySelectorAll("button").forEach(e => e.addEventListener("click", themeButtonEvent));

dmem.classList.toggle('dnone');
dmem.classList.toggle('dbox');
document.getElementById("mem").addEventListener("click", () => {
    dmem.classList.toggle('dnone');
    dmem.classList.toggle('dbox');
});

dvar.classList.toggle('dnone');
dvar.classList.toggle('dbox');
document.getElementById("var").addEventListener("click", () => {
    dvar.classList.toggle('dnone');
    dvar.classList.toggle('dbox');
});


function applyStyling(elems, prop, val) {
    elems.forEach(e => e.style[prop] = val);
}

function opacityRange(num) {
    if(Number(num) < 0) return 0;
    if(Number(num) > 1) return 1;
    else return Number(num).toFixed(1);
}

function hexToRGB(hex) {
    const [_, r, g, b] = /#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})/i.exec(hex).map(e => parseInt(e, 16));
    return [r, g, b].join(", ") + ", "; // specific format for memvar change
}

function nestedChecks(elem, key) {
    const ctk = curTheme[key];
    if (elem.parentElement.dataset.nested) {
        if (elem.dataset.nest1 && elem.dataset.nest2) {
            console.log('curtheme key', ctk);
            return ctk[elem.dataset.nest1][elem.dataset.nest2];
        }
        return ctk[elem.dataset.class];
    }
    return ctk;
}

document.querySelectorAll(".boxes input").forEach(input => {
    const type = input.className;
    const key = input.parentElement.dataset.class;
    const nested = input.parentElement.dataset.nested;
    input.addEventListener("change", e => {
        const value = nestedChecks(input, key);

        const etv = type === 'tbo' ? opacityRange(e.target.value) : e.target.value;

        console.log('value', value, 'nested', nested);
        if(Array.isArray(value)) {
            if(value.length === 3) {
                switch(type) {
                    case "tbbg":
                        nestedChecks(input, key)[0] = etv.slice(1) + value[0].slice(6);
                        break;
                    case "tbbs":
                        nestedChecks(input, key)[0] = value[0].slice(0, 6) + etv;
                        break;
                    case "tbhbg":
                        nestedChecks(input, key)[1] = etv.slice(1) + value[1].slice(6);
                        break;
                    case "tbhbs":
                        nestedChecks(input, key)[1] = value[1].slice(0, 6) + etv;
                        break;
                    case "tbc":
                        nestedChecks(input, key)[2] = etv;
                        break;
                }
                console.log(nestedChecks(input, key), '(possibly nested) curtheme key');
            } else if (value.length === 2) { // only applies to arrows
                switch(type) {
                    case "tbbg":
                        curTheme[key][0] = etv.slice(1) + value[0].slice(6);
                        break;
                    case "tbhbg":
                        curTheme[key][0] = value[0].slice(0, 6) + etv;
                        break;
                    case "tbc":
                        curTheme[key][1] = etv;
                        break;
                }
            }
        } else {
            if(key === "body") {
                if(type === "tbbg") curTheme.body = etv;
                else curTheme.bodyshadow = etv;
            } else if (key === "memvar") {
                if(type === "tbo") {
                    const cmb = curTheme.memvar.bg;
                    curTheme.memvar.bg = cmb.slice(0, -4) + Number(etv).toFixed(1) + ')';
                } else if (input.id === 'secondmv') {
                    const cmb = curTheme.memvar.bg;
                    curTheme.memvar.bg = `rgba(${hexToRGB(etv)}${cmb.slice(-4)}`;
                }
            } else if (key === "specfncs") {
                if(type === "tbo") {
                    curTheme.specfncs[input.dataset.nest].up[1] = Number(etv);
                } else if (input.classList.contains('endfunc')) {
                    curTheme.specfncs[input.dataset.nest].up[0] = etv;
                }
            } else {
                nested ? curTheme[key][input.dataset.class] = etv : curTheme[key] = etv;
            }
        }

        loadTheme(curTheme);
    });
});

loadTheme(curTheme);

const err = document.querySelector("#nameerr");
const tname = finalBox.querySelector("input");

tname.addEventListener("keyup", e => {
    if(Object.keys(themes).includes(e.target.value)) {
        err.classList.remove('dnone');
    } else {
        if(!err.classList.contains('dnone')) {
            err.classList.add('dnone');
        }
    }
});

finishTheme.addEventListener("click", () => {
    finalBox.classList.toggle('dnone');
    document.querySelector(".noedit").classList[editing.active ? "add" : "remove"]('dnone');
    document.querySelector(".yesedit").classList[editing.active ? "remove" : "add"]('dnone');
    console.log('is editing?', editing, document.querySelector(".noedit"), document.querySelector(".yesedit"));
    glass.classList.toggle("dnone");
    if(editing.active) tname.value = editing.theme;
    else tname.value = "theme-name";
    tname.focus();
    tname.setSelectionRange(0, 14);
});

thmConfirm.addEventListener("click", () => {
    if(err.classList.contains('dnone')) {
        const thmName = tname.value.replace(/"/g, '\'');
        if(editing.active) {
            const toUpdate = JSON.parse(localStorage.customThemes);
            delete toUpdate[editing.theme];
            toUpdate[thmName] = curTheme;
            if(localStorage.scalcTheme === editing.theme) {
                localStorage.scalcTheme = thmName;
            }

            localStorage.customThemes = JSON.stringify(toUpdate);
        } else {
            localStorage.customThemes = JSON.stringify({...JSON.parse(localStorage.customThemes), [thmName]: curTheme });
        }

        saved = true;
        finalBox.querySelectorAll('div').forEach(d => d.classList.toggle('dnone'));
    }
});

thmCancel.addEventListener("click", () => {
    finalBox.classList.toggle('dnone');
    glass.classList.toggle("dnone");
});

// prevents accidental reloads
window.addEventListener('beforeunload', e => {
    if(!saved) e.preventDefault();
});