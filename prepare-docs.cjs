const fs=require('node:fs');const path=require('node:path');const vm=require('node:vm');
const base=__dirname;const source=path.resolve(base,'content');
const context={window:{}};vm.createContext(context);vm.runInContext(fs.readFileSync(path.join(base,'dist/data.js'),'utf8'),context);
const {COURSES,RESOURCES,DOCS}=context.window;
vm.runInContext(fs.readFileSync(path.join(base,'dist/audio-data.js'),'utf8'),context);
Object.assign(context,context.window);
vm.runInContext(fs.readFileSync(path.join(base,'dist/learning-data.js'),'utf8'),context);
vm.runInContext(fs.readFileSync(path.join(base,'dist/vocab-data.js'),'utf8'),context);
const vocabulary=context.window.VOCABULARY;
let manual='# 12模块职场英语课程手册\n\n对象：鲁琨；统计学背景；制造业外企项目管理/数据分析。每周一个模块，配合学习路线中的90分钟节奏。\n\n口头表达标准回答根据个人简历与经历核验稿整理。听力及对应邮件为模拟练习，两种情境分别标注。每章综合检测统一包含25道词汇题和2道同周听力情境题；完整词表见词汇手册，听力原文和邮件范文见联动练习手册。\n';
for(const c of COURSES){manual+=`\n## 第${c.week}周｜${c.title}\n\n${c.en} · ${c.track}\n\n学习目标：${c.goal}\n\n重点：${c.focus}\n\n表达框架：${c.framework}\n\n### 核心表达\n\n${c.phrases.map(p=>`- ${p[0]} — ${p[1]}`).join('\n')}\n\n### 英文示例\n\n${c.sample}\n\n${c.translation}\n\n### 学习步骤\n\n${c.steps.map((s,i)=>`${i+1}. ${s}`).join('\n')}\n\n### 练习任务\n\n口语：${c.speaking}\n\n写作：${c.writing}\n\n### 自检\n\n${c.checks.map(s=>`- ${s}`).join('\n')}\n\n### 配套学习链接\n\n${c.resources.map(id=>{const r=RESOURCES.find(r=>r.id===id);return`- [${r.title}](${r.url})：${r.note}`}).join('\n')}\n\n### 模块自测（答案在本节最后）\n\n${c.questions.map((q,i)=>`${i+1}. ${q.q}\n${q.options.map((s,j)=>`   ${String.fromCharCode(65+j)}. ${s}`).join('\n')}`).join('\n\n')}\n\n参考答案：${c.questions.map((q,i)=>`${i+1}. ${String.fromCharCode(65+q.a)}，${q.why}`).join('；')}\n`;}
fs.writeFileSync(path.join(source,'06_模块课程手册.md'),manual,'utf8');fs.mkdirSync(path.join(base,'dist/docs'),{recursive:true});
let vocabularyManual='# 每章25词｜职场英语章节词汇手册\n\n12章，每章25个词汇或常用词组，共300个不重复条目。释义与例句为本课程原创教学内容，按制造业项目管理与数据分析场景取义，未列出词语的全部词典义项。\n\n学习入口：https://lu36366.github.io/work-english-lab/?v=4#vocab/1\n\n每天先学5个：理解释义、朗读例句、遮住释义回忆、替换场景造句。标记“再练一次”或“我能使用了”，后者为自评。\n\n测验：章节综合检测27题（25词汇+2同周听力情境，20分钟）；跨章节综合检测25题（20词汇+5情境，20分钟）。词汇题包含英文释义与带中文意图的语境选词。每个词在同一次章节综合检测中只出现一次，选项顺序会随机变化。错词自动进入“需复习”；答对不自动等同掌握。\n\n旧的60分钟听读写说综合评估保留原来的5项权重；章节综合检测单独记录，不把词汇选择题当作口语或写作能力认证。词汇学习状态包含在学习记录JSON导入/导出中。\n';
for(const c of COURSES){vocabularyManual+=`\n## W${c.id}｜${c.title}\n\n[在线学习本章词汇](https://lu36366.github.io/work-english-lab/?v=4#vocab/${c.id})\n\n${vocabulary[c.id].map((w,i)=>`### ${String(i+1).padStart(2,'0')}. ${w.term}\n\n${w.pos} ${w.meaning}\n\n${w.example}\n`).join('\n')}`;}
fs.writeFileSync(path.join(source,'08_章节词汇手册.md'),vocabularyManual,'utf8');
let linkedManual='# 听力与邮件联动练习｜12周标准回答\n\n每周顺序：听本周录音 → 记事实 → 写对应邮件 → 对照范文修改 → 完成27题章节综合检测（25词汇＋2情境，20分钟）。\n\n口头回答根据个人经历整理；邮件沿用本周录音的模拟情境。原始简历、联系方式和内部业务文件不作为网站附件。\n';
for(const u of context.window.LEARNING_UNITS){const a=context.window.AUDIO_LESSONS.find(a=>a.id===u.id);linkedManual+=`\n## W${u.id}｜${COURSES[u.id-1].title}\n\n### 简历标准回答\n\n${u.answer}\n\n${u.cn}\n\n经历依据：${u.source}\n\n### 同周听力原文\n\n${a.segments.map(s=>s[0]).join('\n\n')}\n\n### 邮件任务\n\n${u.writing}\n\n${u.facts.map(f=>'- '+f).join('\n')}\n\n### 对应邮件范文\n\n${u.email}\n`;}
fs.writeFileSync(path.join(source,'09_听力写作联动练习.md'),linkedManual,'utf8');
const docs=DOCS.map(d=>{const t=fs.readFileSync(path.join(source,d[1]),'utf8');fs.writeFileSync(path.join(base,'dist/docs',d[1]),t,'utf8');return t;});
fs.writeFileSync(path.join(base,'dist/docs-data.js'),'window.DOC_CONTENT = '+JSON.stringify(docs)+';\n','utf8');
console.log(JSON.stringify({modules:COURSES.length,businessQuestions:COURSES.reduce((n,c)=>n+c.questions.length,0),vocabularyEntries:Object.values(vocabulary).flat().length,documents:docs.length}));
