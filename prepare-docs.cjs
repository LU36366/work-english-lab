const fs=require('node:fs');const path=require('node:path');const vm=require('node:vm');
const base=__dirname;const source=path.resolve(base,'content');
const context={window:{}};vm.createContext(context);vm.runInContext(fs.readFileSync(path.join(base,'dist/data.js'),'utf8'),context);
const {COURSES,RESOURCES,DOCS}=context.window;
let manual='# 12模块职场英语课程手册\n\n对象：鲁琨；统计学背景；制造业外企项目管理/数据分析。每周一个模块，配合学习路线中的90分钟节奏。\n\n所有业务场景和数字均为模拟；个人经历模板需换成真实内容。配套网站提供草稿保存、模块小测、学习记录与文档阅读。\n';
for(const c of COURSES){manual+=`\n## 第${c.week}周｜${c.title}\n\n${c.en} · ${c.track}\n\n学习目标：${c.goal}\n\n重点：${c.focus}\n\n表达框架：${c.framework}\n\n### 核心表达\n\n${c.phrases.map(p=>`- ${p[0]} — ${p[1]}`).join('\n')}\n\n### 英文示例\n\n${c.sample}\n\n${c.translation}\n\n### 学习步骤\n\n${c.steps.map((s,i)=>`${i+1}. ${s}`).join('\n')}\n\n### 练习任务\n\n口语：${c.speaking}\n\n写作：${c.writing}\n\n### 自检\n\n${c.checks.map(s=>`- ${s}`).join('\n')}\n\n### 配套学习链接\n\n${c.resources.map(id=>{const r=RESOURCES.find(r=>r.id===id);return`- [${r.title}](${r.url})：${r.note}`}).join('\n')}\n\n### 模块自测（答案在本节最后）\n\n${c.questions.map((q,i)=>`${i+1}. ${q.q}\n${q.options.map((s,j)=>`   ${String.fromCharCode(65+j)}. ${s}`).join('\n')}`).join('\n\n')}\n\n参考答案：${c.questions.map((q,i)=>`${i+1}. ${String.fromCharCode(65+q.a)}，${q.why}`).join('；')}\n`;}
fs.writeFileSync(path.join(source,'06_模块课程手册.md'),manual,'utf8');fs.mkdirSync(path.join(base,'dist/docs'),{recursive:true});
const docs=DOCS.map(d=>{const t=fs.readFileSync(path.join(source,d[1]),'utf8');fs.writeFileSync(path.join(base,'dist/docs',d[1]),t,'utf8');return t;});
fs.writeFileSync(path.join(base,'dist/docs-data.js'),'window.DOC_CONTENT = '+JSON.stringify(docs)+';\n','utf8');
console.log(JSON.stringify({modules:COURSES.length,questions:COURSES.reduce((n,c)=>n+c.questions.length,0),documents:docs.length}));
