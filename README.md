# Work English Lab · 职场英语学习室

面向统计学背景、制造业外企项目管理与数据分析岗位的个人英语学习网站。

**在线学习入口：[Work English Lab](https://LU36366.github.io/work-english-lab/)**。直接打开即可使用，不需要账号密码。本仓库公开提供网站源码与课程内容，通过GitHub Pages发布。

## 学习内容

- 12周完整课程：自我介绍、英文面试、项目周报、邮件往来、数据汇报、口径核实、供应与验证协调、会议闭环、行业阅读、意见表达及综合应用。
- 每个模块包含表达框架、核心句式、英文示例、口语与写作任务、自检清单、学习链接和25个实用词汇。
- 12章共300个不重复词汇，含词性、中文释义和原创业务例句，支持浏览器朗读、遮义回忆、自评掌握、错词复习和词表导出。
- 本章词汇专项25题、本章测验27题（25词汇+2业务）、综合抽测25题（20词汇+5业务）；提交后查看解释，错词自动加入复习。
- 练习稿自动保存、录音回听与下载、学习日志、综合成绩录入、JSON备份、文档在线阅读和下载。
- 12段原创合成示范音频，可直接播放下载；支持逐句播放、0.65—1.5倍速、跟读留白、循环与A—B选段。可导入本机音频，不上传第三方录音。

## 本地使用

原生HTML、CSS、JavaScript，无需安装依赖。

直接打开 `dist/index.html` 即可使用主体功能。需要本地HTTP环境时：

```sh
node preview.cjs
```

然后访问 [http://127.0.0.1:4387](http://127.0.0.1:4387)。麦克风功能需要支持的浏览器、安全上下文与用户授权。

也可以运行 `npm start`，同样不需要先安装依赖。

## 文档入口

1. [学习路线与第一周安排](content/01_学习路线.md)
2. [起点测试与阶段复测](content/02_起点测试与复测.md)
3. [评分标准与参考答案](content/03_评分标准与答案_测试后再看.md)
4. [日常练习包](content/04_日常练习包.md)
5. [开源学习项目调研](content/05_开源项目参考.md)
6. [12模块完整课程手册](content/06_模块课程手册.md)
7. [听力跟读与音频使用](content/07_听力跟读指南.md)
8. [每章25词与词汇测验](content/08_章节词汇手册.md)

## 修改与更新

- 课程内容、资源、小测：编辑 `dist/data.js`。
- 章节词汇：编辑 `dist/vocab-data.js`；词汇学习和出题逻辑：编辑 `dist/vocab.js`。
- 交互逻辑：编辑 `dist/app.js`；样式：编辑 `dist/styles.css`。
- 文档原稿：编辑 `content/` 中的文件。
- 执行 `npm run prepare` 更新网站内置文档及生成模块手册。
- 执行 `npm run check` 检查JavaScript语法。

`content/06_模块课程手册.md` 从课程数据生成，直接修改该文件会在下次生成时被覆盖，应修改 `dist/data.js`。

网站发布产物是 `dist/`。向 `main` 分支推送后，GitHub Actions会生成文档、检查JavaScript并自动更新GitHub Pages网站。工作流见 `.github/workflows/pages.yml`。

原有的Sites版本独立维护；不同网址的浏览器学习记录不会自动迁移。更换网址前，可在学习档案中导出JSON，再在新网址导入。

## 数据与评分

学习记录和草稿存于当前浏览器的localStorage，不上传本仓库，也不会自动跨设备同步。可在学习档案中导入/导出JSON备份。录音不上传，不自动长期保存，需单独下载。

导入的听力文件保存在当前浏览器IndexedDB，不包含在JSON备份中，请另行保存原文件。本站示范音频来自原创脚本，使用Microsoft Zira Desktop合成；第三方官方材料保留完整课程链接。重新生成示范音频可在安装Zira英语声音的Windows电脑上运行 `scripts/generate-audio.ps1`。

本版没有内置AI评分服务。邮件、口头汇报与互动按真实证据评价；空白分项为未测，不能用文字稿推断发音和实际流畅度。练习分不换算为正式语言等级。

## 开源参考

调研了 [OpenLingo](https://github.com/pretzelai/openlingo)、[Qwerty Learner](https://github.com/RealKai42/qwerty-learner)、[Lute](https://github.com/LuteOrg/lute-v3)、[LinguaCafe](https://github.com/simjanos-dev/LinguaCafe)。本版独立实现，借鉴学习流程并提供入口，没有复制这些项目的源码。详细选型说明见课程文档。
