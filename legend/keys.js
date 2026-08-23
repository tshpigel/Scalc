const themes = { // copied from calc.js for simplicity
    default: {
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
                up: ["#b8e994", 1]
            }
        }
    },
    light: {
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
                up: ["#192b4a", 1]
            }
        }
    },
    dark: {
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
                up: ["#fc9a5e", 1]
            }
        }
    },

    ...JSON.parse(localStorage.customThemes)
};

function loadThemeSimple(thm) {
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

    extss += `.holding {
        border: 2px solid ${thm.holdbtnborder};
    }\n`
    bcbsh('#copy', thm.copy);
    bcbsh('#paste', thm.paste);
    bcbsh('#bcContainer', thm.curbut);
    document.querySelector('#blinkingCursor').style.background = thm.curbut[2];

    extss += `@keyframes fadecursorout {
        0% {caret-color: ${thm.textcol};}
        100% {caret-color: transparent;}
    } @keyframes fadecursorin {
        0% {caret-color: transparent;}
        100% {caret-color: ${thm.textcol};}
    }\n`;

    bcbsh('.arrow', thm.arrows);
    extss += `.arrow>* {
        border: solid ${thm.arrows[1]};
    }\n`;
    

    ['.memory', '#mem', '#var'].forEach(mv => bcbsh(mv, thm.memvar.subbtns));
    ['#brack', '#del', '#cac'].forEach(dab => bcbsh(dab, thm.delacbrac));
    bcbsh('.snd', thm.snd);
    bcbsh('.numbers', thm.num);
    bcbsh('#ans', thm.ans);
    bcbsh('#deg_rad', thm.radround);
    bcbsh('#exc_rnd', thm.radround);
    bcbsh('.operat', thm.opers);
    bcbsh('.specs', thm.specfncs.normal.base);
    
    document.querySelectorAll(".switch1").forEach(s => s.style.color = thm.specfncs.sndmode.up[0]);
    document.querySelectorAll(".switch2").forEach(s => s.style.opacity = thm.specfncs.normal.up[1]);

    const ss = document.createElement('style');
    ss.classList.add('toreplace');
    ss.appendChild(document.createTextNode(extss));
    document.querySelector('head').appendChild(ss);
}

const degrad = document.querySelector("#deg_rad");
const excrnd = document.querySelector("#exc_rnd");
const snd = document.querySelector(".snd");

let smode = false;
let rmode = false;
let fmode = false;

document.querySelector("#next").addEventListener("click", () => {
    window.location.href = "./notes.html";
});

function hexToRGB(hex) {
    if(hex === "#fff") hex = "#ffffff";
    else if (hex === "#000") hex = "#000000";
    const [_, r, g, b] = /#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})/i.exec(hex).map(e => parseInt(e, 16));
    return [r, g, b].join(", "); // specific format for snd
}

snd.addEventListener("click", () => {
    const sndcol = themes[localStorage.scalcTheme].snd[2];
    snd.style.color = !smode ? `rgba(${hexToRGB(sndcol)}, 0.3)` : sndcol;
    smode = !smode;
});

degrad.addEventListener("click", () => {
    degrad.textContent = rmode ? "RAD" : "DEG";
    rmode = !rmode;
});

excrnd.addEventListener("click", () => {
    excrnd.textContent = fmode ? "ROUND" : "EXACT";
    excrnd.classList.toggle("holding");
    fmode = !fmode;
});

loadThemeSimple(themes[localStorage.scalcTheme]);