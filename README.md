# Work English Lab · 职场英语学习室

面向统计学背景、制造业外企项目管理与数据分析岗位的个人英语学习网站。

**在线学习入口：[Work English Lab](https://work-english-lab-lukun.yummy-stork-2657.chatgpt.site)**（个人访问权限）。本仓库为私有源码与课程备份，未启用GitHub Pages。

## 学习内容

- 12周完整课程：自我介绍、英文面试、项目周报、邮件往来、数据汇报、口径核实、供应与验证协调、会议闭环、行业阅读、意见表达及综合应用。
- 每个模块包含表达框架、核心句式、英文示例、口语与写作任务、自检清单、学习链接和2道小测题。
- 24道客观题支持模块小测与随机8题测验，提交后查看答案解释。
- 练习稿自动保存、录音回听与下载、学习日志、综合成绩录入、JSON备份、文档在线阅读和下载。

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

## 修改与更新

- 课程内容、资源、小测：编辑 `dist/data.js`。
- 交互逻辑：编辑 `dist/app.js`；样式：编辑 `dist/styles.css`。
- 文档原稿：编辑 `content/` 中的文件。
- 执行 `npm run prepare` 更新网站内置文档及生成模块手册。
- 执行 `npm run check` 检查JavaScript语法。

`content/06_模块课程手册.md` 从课程数据生成，直接修改该文件会在下次生成时被覆盖，应修改 `dist/data.js`。

网站发布产物是 `dist/`。在线版本需要将更新后的产物重新部署；向这个仓库推送代码不会自动更新现有Sites网站。

## 数据与评分

学习记录和草稿存于当前浏览器的localStorage，不上传本仓库，也不会自动跨设备同步。可在学习档案中导入/导出JSON备份。录音不上传，不自动长期保存，需单独下载。

本版没有内置AI评分服务。邮件、口头汇报与互动按真实证据评价；空白分项为未测，不能用文字稿推断发音和实际流畅度。练习分不换算为正式语言等级。

## 开源参考

调研了 [OpenLingo](https://github.com/pretzelai/openlingo)、[Qwerty Learner](https://github.com/RealKai42/qwerty-learner)、[Lute](https://github.com/LuteOrg/lute-v3)、[LinguaCafe](https://github.com/simjanos-dev/LinguaCafe)。本版独立实现，借鉴学习流程并提供入口，没有复制这些项目的源码。详细选型说明见课程文档。
