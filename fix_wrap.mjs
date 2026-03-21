import fs from 'fs';

const p = 'c:\\dev\\Personal\\my-agency\\src\\app\\[locale]\\_components\\FoundationGrid.tsx';
let c = fs.readFileSync(p, 'utf-8');

const t = `                <div className="h-2 w-2 bg-emerald-400 rounded-full animate-pulse" />\r\n                <span className="text-xs font-bold text-slate-400">Foundation</span>\r\n\r\n                  const isSelected = f.id === foundation;`;
const t2 = `                <div className="h-2 w-2 bg-emerald-400 rounded-full animate-pulse" />\n                <span className="text-xs font-bold text-slate-400">Foundation</span>\n\n                  const isSelected = f.id === foundation;`;


const replace = `                <div className="h-2 w-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-xs font-bold text-slate-400">Foundation</span>
              </div>

              {/* Quick-Swap Pills */}
              <div className="flex gap-1 overflow-x-auto scrollbar-hide max-w-full sm:max-w-[65%] w-full sm:w-auto">
                {FOUNDATIONS.map((f) => {
                  const isSelected = f.id === foundation;`;

if (c.includes(t)) {
    c = c.replace(t, replace);
} else if (c.includes(t2)) {
    c = c.replace(t2, replace);
} else {
    console.log("Not found");
}

/* also fix any missing scrollbar-hide in mobile view just in case */
if (!c.includes('scrollbar-hide pb-2')) {
    c = c.replace('gap-4  pb-2"', 'gap-4 scrollbar-hide pb-2"');
}

fs.writeFileSync(p, c, 'utf-8');
console.log('Fixed wrapper');
