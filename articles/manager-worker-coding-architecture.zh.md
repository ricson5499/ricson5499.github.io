# Manager-Worker Coding Architecture：AI Coding 的下一阶段

## 引言

过去两年，AI Coding Agent 的进步令人惊讶。

从代码补全，到自动修改文件，再到能够自主执行任务的 Agent IDE，例如 Cursor、Kiro、Claude Code 等，我们已经看到了 AI 开始具备软件工程师的部分能力。

然而，当我持续使用这些工具时，我发现了一个共同的问题：

AI Agent 越来越像开发者（Developer），却始终不像一个团队（Team）。

今天的大多数 Agent 系统都在追求更强大的单一模型，却忽略了软件开发中真正重要的角色：

**项目经理（Manager）与技术负责人（Tech Lead）。**

我认为，下一代 AI Coding System 不应该只是更强的 Coding Agent，而应该是一个完整的：

**Manager-Worker Coding Architecture。**

---

## 当前 Agent 的局限

目前大部分 Agent Workflow 长这样：

```text
User
 ↓
Planner
 ↓
Coding Agent
 ↓
Review Agent
 ↓
Done
```

或者：

```text
User
 ↓
Agent
 ↓
Code
```

看起来合理，但存在一个根本问题：

**任务分配是静态的。**

在任务开始之前，系统就已经决定使用哪个模型、哪个 Agent，以及如何执行。

现实的软件团队并不是这样运作的。

---

## 真实团队如何工作

想象一个软件项目经理。

当收到一个任务时，他不会立刻开始开发。

他会先思考：

* 这个需求影响哪些模块？
* 风险有多高？
* 需要多少人参与？
* 哪些人适合处理这个任务？
* 是否需要先做验证（POC）？

然后才会开始分配工作。

例如：

```text
新增 Button Hover 动画
```

可能只需要一位初级前端工程师。

但如果任务变成：

```text
重构整个 Authentication Flow
```

则可能需要：

* Backend Engineer
* Frontend Engineer
* Database Engineer
* Architect

共同参与。

真正重要的不是谁来写代码，而是谁决定谁来写代码。

---

## AI 缺少的并不是更多 Worker

今天的 AI 世界其实已经拥有大量 Worker。

例如：

* 擅长快速小修改的轻量模型
* 擅长代码生成的中型模型
* 擅长架构分析的大型模型

问题是：

没有一个足够聪明的 Manager 来调度它们。

很多系统会直接把整个项目丢给同一个模型。

但现实中：

```text
修改一个 CSS 动画
```

与：

```text
重构整个 MVC 架构
```

显然不应该使用同样的资源。

这就像让公司的 CTO 去修改一个按钮颜色。

技术上可以做到，但效率极低。

---

## Manager Agent 应该具备什么能力

Manager Agent 不一定需要成为最强的 Coding Model。

它更像现实中的项目经理。

一个道路工程经理不一定会亲自铺马路。

但他必须知道：

* 材料成本
* 工期评估
* 风险分析
* 人员配置
* 资源调度

同样地，AI Manager 也不一定需要写出最优秀的代码。

但它必须理解：

* 软件架构
* 模块关系
* 技术债务
* 风险评估
* Agent 能力边界

它需要知道：

哪些任务应该交给谁。

---

## 引入 POC 阶段

我认为未来 Agent Workflow 不应该直接开始编码。

而应该先进入一个类似真实团队的 POC（Proof of Concept）阶段。

流程可能如下：

```text
需求输入
 ↓
Manager 分析
 ↓
任务拆分
 ↓
多个 Agent 提交 POC
 ↓
Manager 评估方案
 ↓
自动测试
 ↓
正式开发
 ↓
Review
 ↓
自动测试
 ↓
Merge
```

这里最重要的是：

多个 Worker Agent 不一定立即开始写完整实现。

他们先提出解决方案。

Manager 再根据结果做决策。

这与现实团队中的技术评审流程非常相似。

---

## 动态任务分派

我认为最关键的能力是：

**任务分派必须是动态的。**

例如：

开始时系统认为：

```text
修改登录页面
```

属于简单任务。

于是分配给轻量模型。

但在分析过程中发现：

```text
登录页面
 ↓
OAuth
 ↓
Session
 ↓
Database
 ↓
Permission System
```

已经影响多个系统。

此时 Manager 应该能够：

```text
停止当前任务
 ↓
重新评估复杂度
 ↓
升级 Agent
 ↓
重新分派
```

而不是继续让错误的 Agent 完成错误的工作。

---

## 为什么这比更大的模型更重要

许多人认为未来的发展方向是：

```text
更大的模型
更长的 Context
更强的推理能力
```

但我认为真正重要的是：

```text
更好的调度
更好的任务拆分
更好的资源分配
```

因为软件开发本质上并不是一个人的工作。

它是一个团队协作过程。

如果 AI 最终要取代整个开发流程，那么它也必须学会团队协作。

---

## 结论

未来的 AI Coding System 或许不会只有一个超级模型。

它更可能像一家软件公司：

```text
Manager Agent
     ↓
Frontend Agent
Backend Agent
Database Agent
Testing Agent
Review Agent
```

其中最有价值的，不一定是写代码最快的 Worker。

而是那个能够理解全局、评估风险、组织资源，并动态调度整个团队的 Manager。

当 AI 拥有这样的能力时，它才真正开始从「会写代码的工具」进化为「能够完成项目的团队」。

而这，也许就是 AI Coding 的下一阶段：

Manager-Worker Coding Architecture。
