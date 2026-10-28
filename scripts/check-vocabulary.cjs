const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const ctx={window:{},document:{addEventListener(){}},state:{vocabProgress:{}},today:()=> '2026-10-26',location:{hash:''},renderQuiz(){},tickQuiz(){},clearInterval(){},setInterval(){return 1;},activeQuiz:null,quizTimer:null};
vm.createContext(ctx);
for(const file of ['data.js','vocab-data.js','audio-data.js','learning-data.js']){vm.runInContext(fs.readFileSync(path.join(root,'dist',file),'utf8'),ctx);Object.assign(ctx,ctx.window);}
vm.runInContext(fs.readFileSync(path.join(root,'dist/vocab.js'),'utf8'),ctx);Object.assign(ctx,ctx.window);
const words=Object.values(ctx.VOCABULARY).flat();assert.equal(words.length,300);assert.equal(new Set(words.map(w=>w.term.toLowerCase())).size,300);
for(const group of Object.values(ctx.VOCABULARY))assert.equal(group.length,25);
for(const w of words)for(const field of ['term','pos','meaning','example'])assert.ok(typeof w[field]==='string'&&w[field].trim(),`${w.id}: ${field}`);
const bank=ctx.vocabularyQuestionBank();assert.equal(bank.length,300);assert.equal(new Set(bank.map(q=>q.vocabId)).size,300);
for(const q of bank){const w=words.find(w=>w.id===q.vocabId);assert.equal(q.options.length,4);assert.equal(new Set(q.options).size,4,`Ambiguous choices: ${q.id}`);assert.ok(q.a>=0&&q.a<4);assert.equal(q.options[q.a],q.kind==='语境选词'?w.term:w.meaning);if(q.kind==='语境选词')assert.ok(q.q.includes('_____'),`Missing blank: ${q.id}`);assert.ok(q.why.includes(w.example));}
ctx.course=id=>ctx.COURSES.find(c=>c.id===Number(id));
const app=fs.readFileSync(path.join(root,'dist/app.js'),'utf8'),start=app.indexOf('function startQuiz('),end=app.indexOf('\nfunction renderQuiz()',start);assert.ok(start>=0&&end>start);vm.runInContext(app.slice(start,end),ctx);
for(let id=1;id<=12;id++){ctx.startQuiz(id);assert.equal(ctx.activeQuiz.questions.length,27);const vocab=ctx.activeQuiz.questions.filter(q=>q.vocabId);assert.equal(vocab.length,25);assert.equal(new Set(vocab.map(q=>q.vocabId)).size,25);assert.ok(vocab.every(q=>q.chapter===id));}
ctx.startQuiz();assert.equal(ctx.activeQuiz.questions.length,25);assert.equal(ctx.activeQuiz.questions.filter(q=>q.vocabId).length,20);assert.equal(ctx.activeQuiz.questions.filter(q=>!q.vocabId).length,5);
const questions=ctx.vocabularyQuestionBank(1),answers=Object.fromEntries(questions.map((q,i)=>[i,q.a]));ctx.trackVocabularyResult(questions,answers);assert.equal(Object.keys(ctx.state.vocabProgress).length,0,'Correct answers must not create mastered status');answers[0]=(questions[0].a+1)%4;delete answers[1];ctx.trackVocabularyResult(questions,answers);assert.equal(ctx.state.vocabProgress[questions[0].vocabId].status,'review');assert.equal(ctx.state.vocabProgress[questions[1].vocabId].status,'review');assert.equal(Object.keys(ctx.state.vocabProgress).length,2,'Only incorrect and unanswered words enter review');
console.log('Vocabulary checks passed: 300 unique entries; choices and cloze; chapter/global counts; wrong-word review.');
