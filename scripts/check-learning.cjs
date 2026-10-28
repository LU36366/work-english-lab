const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
const base=path.resolve(__dirname,'..'),ctx={window:{}};vm.createContext(ctx);
for(const file of ['data.js','audio-data.js','audio-timings.js','learning-data.js']){vm.runInContext(fs.readFileSync(path.join(base,'dist',file),'utf8'),ctx);Object.assign(ctx,ctx.window);}
assert.equal(ctx.LEARNING_UNITS.length,12);
assert.equal(new Set(ctx.LEARNING_UNITS.map(u=>u.id)).size,12);
for(const c of ctx.COURSES){const u=ctx.LEARNING_UNITS.find(u=>u.id===c.id),audio=ctx.AUDIO_LESSONS.find(a=>a.id===c.id);assert.ok(u&&audio);assert.equal(c.sample,u.answer);assert.equal(c.writing,u.writing);assert.ok(c.answerSource.length>10);assert.ok(!/\[[^\]]+\]/.test(c.sample),'Personal answers must have no placeholders');assert.ok(u.email.startsWith('Subject: '));assert.ok(u.email.endsWith('Lu Kun'));assert.ok(u.facts.length>=3);assert.equal(c.questions.length,2);for(const q of c.questions){assert.ok(q.q.includes('W'+c.id));assert.ok(q.options[q.a]);assert.ok(q.why);}assert.ok(fs.existsSync(path.join(base,'dist',ctx.AUDIO_TIMINGS[c.id].url)));}
const mail=id=>ctx.LEARNING_UNITS.find(u=>u.id===id).email;
assert.ok(/200/.test(mail(4))&&/13 November/.test(mail(4))&&/14:00 China Standard Time/.test(mail(4)));
assert.ok(/900/.test(mail(5))&&/36/.test(mail(5))&&/one percentage point/.test(mail(5))&&!/88%|92%|on-time delivery/.test(mail(5)));
assert.ok(/80/.test(mail(7))&&/120/.test(mail(7))&&/quotation and approval/.test(mail(7)));
assert.ok(/agreed time/.test(mail(8))&&!/14:00|13 November/.test(mail(8)));
assert.ok(/not established a link/.test(mail(12))&&/before the next review/.test(mail(12)));
const index=fs.readFileSync(path.join(base,'dist/index.html'),'utf8'),app=fs.readFileSync(path.join(base,'dist/app.js'),'utf8'),vocab=fs.readFileSync(path.join(base,'dist/vocab.js'),'utf8');
assert.ok(!/href="#resources"|data-nav="resources"/.test(index));assert.ok(!app.includes('function resources('));assert.ok(!app.includes('vocabularyOnly'));assert.ok(!vocab.includes('词汇专项'));
assert.ok(index.indexOf('learning-data.js')>index.indexOf('audio-data.js'));assert.ok(index.indexOf('learning.js')<index.indexOf('app.js'));
console.log('Learning checks passed: 12 resume answers; 12 linked audio/email tasks; weekly fact regressions; unified assessments; resource hub removed.');
