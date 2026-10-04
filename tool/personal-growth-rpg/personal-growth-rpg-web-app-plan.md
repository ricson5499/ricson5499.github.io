# Personal Growth RPG Web App — Product Plan

> 暂定定位：把「自我提升」做成一款像 RPG 一样可以每天玩的 Web App。  
> 核心体验：**不是逼用户改变，而是让用户每天完成几个小任务，就能看到自己的角色逐渐成长。**

---

## 1. 产品概念

### 一句话

一个把现实生活中的健康、力量、心灵、专注、目标等成长行为，转换成 RPG **任务、经验值、等级和属性成长**的个人成长 Web App。

### 核心循环

```text
回答几个问题
    ↓
建立自己的成长角色
    ↓
选择目标与期限
    ↓
系统生成每日任务
    ↓
完成现实生活任务
    ↓
获得 XP / 属性成长
    ↓
角色升级
    ↓
解锁新的任务与挑战
    ↓
继续成长
```

### 产品想解决的问题

很多自我提升 App 的问题是：

- 一开始很有动力，几天后就放弃
- 任务太复杂
- 只记录数据，却没有「成长感」
- 用户不知道今天到底应该做什么
- 目标太大，容易产生压力
- 单纯的 To-do List 缺少游戏反馈

本产品的重点不是增加更多待办事项，而是：

> **把现实生活中的小行动，变成「我的角色正在变强」的感觉。**

---

# 2. 核心设计哲学

## 2.1 小任务 > 大目标

不要告诉用户：

> 「你应该变得更健康。」

而是告诉用户：

> 「今天完成 10 个深蹲。」

不要：

> 「改善你的视力。」

而是：

> 「看远处 5 分钟。」

不要：

> 「提高心理状态。」

而是：

> 「今天花 5 分钟安静下来。」

每个任务都应该：

- 明确
- 可执行
- 有完成标准
- 尽量在几分钟到几十分钟内完成

---

## 2.2 游戏化，但不能让用户觉得自己在玩假的游戏

现实行为就是游戏的来源。

例如：

| Reality | Game |
|---|---|
| 做 20 个深蹲 | +10 XP / 力量 |
| 走路 20 分钟 | +10 XP / 身体 |
| 喝水 | +5 XP / 健康 |
| 阅读 10 分钟 | +8 XP / 智慧 |
| 冥想 5 分钟 | +8 XP / 心灵 |
| 完成每日目标 | Daily Clear |
| 连续完成 7 天 | Streak |
| 完成阶段目标 | Achievement |
| 达到等级 | Level Up |

---

# 3. 用户角色系统

用户拥有一个「现实成长角色」。

## 3.1 Level

角色等级代表：

> **这个人持续完成成长行为的程度。**

例如：

```text
Level 1
Novice

Level 5
Awakened

Level 10
Disciplined

Level 20
Advanced

Level 30
Elite

Level 50
Master
```

等级不应该单纯由运动量决定，而应该综合：

- 完成任务数量
- 连续天数
- 阶段目标完成
- 不同属性成长
- 挑战完成

### XP

```text
Daily Quest → XP
Bonus Quest → XP
Weekly Challenge → XP
Milestone → XP
```

等级公式可以先使用简单模型：

```text
Level XP = 100 × Level^1.25
```

MVP 不需要复杂计算。

---

# 4. Character Attributes

角色拥有多个属性。

建议 MVP 使用 6 个：

```text
BODY
身体

MIND
心智

REST
休息

FUEL
能量 / 饮食

CONNECTION
连接

PURPOSE
目标
```

也可以在 UI 上显示成：

- 身体
- 心智
- 休息
- 燃料
- 连接
- 目标

---

## 4.1 身体 Body

可能影响：

- 力量
- 活动量
- 体能
- 灵活性

任务例子：

```text
10 Squats
5 Push-ups
20 sec Plank
10 min Walk
Stretch 5 min
```

---

## 4.2 心智 Mind

可能影响：

- 专注
- 学习
- 阅读
- 思考
- 情绪管理

任务例子：

```text
Read 10 minutes
Focus 15 minutes
Write 3 things you learned
No-phone focus session
Breathing exercise
```

---

## 4.3 休息 Rest

可能影响：

- 睡眠
- 放松
- 恢复
- 工作与休息平衡

任务例子：

```text
Prepare for bed 30 minutes earlier
No screen for 10 minutes
Take a 5-minute break
Relax before sleeping
```

---

## 4.4 燃料 Fuel

不是要求用户严格节食，而是鼓励更好的日常习惯。

任务例子：

```text
Drink water
Eat one serving of fruit
Eat vegetables
Avoid sugary drink today
Prepare a balanced meal
```

---

## 4.5 连接 Connection

帮助用户保持人与人的连接。

任务例子：

```text
Message a friend
Talk to family
Thank someone
Spend 15 minutes with someone
```

---

## 4.6 目标 Purpose

让用户不要只做「健康任务」，也持续靠近自己的长期目标。

任务例子：

```text
Work on your personal project 20 min
Learn something new
Write tomorrow's goal
Complete one important task
```

---

# 5. 属性不是传统 RPG 的「战斗能力」

这是一个重要设计。

不要让：

```text
STR = 90
INT = 20
```

产生「谁比较厉害」的感觉。

属性应该表达：

> **你正在培养什么。**

例如：

```text
Body       62
Mind       48
Rest       55
Fuel       43
Connection 71
Purpose    60
```

用户可以看到：

> 「我最近主要在提升身体和目标。」

---

# 6. Onboarding

第一次进入 App，不直接要求用户建立复杂计划。

应该像游戏开始前的 Character Creation。

---

## Step 1 — 你想改变什么？

多选：

```text
[ ] 身体
[ ] 力量
[ ] 健康
[ ] 心灵
[ ] 专注
[ ] 睡眠
[ ] 饮食
[ ] 学习
[ ] 工作效率
[ ] 人际关系
[ ] 个人目标
```

---

## Step 2 — 你的主要目标

例如：

```text
我想：

○ 变得更健康
○ 变得更强
○ 建立规律
○ 改善精神状态
○ 提高专注力
○ 完成一个个人目标
○ 建立更好的生活习惯
○ 自定义
```

---

## Step 3 — 你的挑战风格

这是非常重要的个性化设置。

```text
你希望系统如何推动你？

○ 温柔陪伴
○ 平衡
○ 积极挑战
○ 严格训练
```

例如：

### 温柔

> 今天已经完成 3 个任务了。  
> 如果还有一点能量，可以试试最后一个任务。

### 平衡

> 还有 2 个任务。  
> 完成它们，你今天就 Clear 了。

### 积极

> 你的目标还差最后一步。  
> 今天不要停在这里。

---

# 7. 目标日期

用户选择一个成长周期：

```text
14 Days
30 Days
45 Days
66 Days
90 Days
Custom
```

推荐第一次体验：

> **14 Days**

原因：

- 门槛低
- 容易完成
- 用户可以快速体验完整成长循环

完成后可以进入：

```text
30 Days
66 Days
90 Days
```

---

# 8. 用户生活环境

系统需要知道任务能不能执行。

例如：

### 训练地点

```text
○ 室内
○ 户外
○ 两者都可以
```

### 器材

```text
[ ] 不需要器材
[ ] 哑铃
[ ] 瑜伽垫
[ ] 跑步机
[ ] 健身房
[ ] 其他
```

### 时间

```text
每天大约可以投入：

○ 5–10 分钟
○ 10–20 分钟
○ 20–30 分钟
○ 30–60 分钟
○ 60+ 分钟
```

---

# 9. 身体 / 生活限制

为了避免系统乱给任务，需要询问：

```text
有没有某些活动不方便？

[ ] 跑步
[ ] 跳跃
[ ] 蹲下
[ ] 长时间站立
[ ] 户外活动
[ ] 其他
```

也可以：

```text
□ 我希望系统尽量避免高强度任务
```

这里应该明确：

> App 是习惯与成长工具，不是医疗诊断工具。

涉及疼痛、疾病或医疗问题时，不应该由 AI 自行诊断或制定治疗方案。

---

# 10. AI Growth Planner

完成 onboarding 后，由 Planner 生成成长计划。

输入：

```text
User Profile
+
Goals
+
Preferred Difficulty
+
Available Time
+
Environment
+
Equipment
+
Duration
+
Current Progress
```

输出：

```text
Growth Plan
```

---

# 11. 每日任务系统

首页应该非常简单。

例如：

```text
DAY 07

LEVEL 4
████████░░  78%


TODAY'S QUESTS

┌────────────────────────┐
│ ⚔  Body                │
│                        │
│ 15 Squats              │
│ +10 XP                 │
│                        │
│              [START]   │
└────────────────────────┘

┌────────────────────────┐
│ 🧠 Mind                │
│                        │
│ Focus for 15 minutes   │
│ +10 XP                 │
│                        │
│              [START]   │
└────────────────────────┘

┌────────────────────────┐
│ 💧 Fuel                │
│                        │
│ Drink 6 glasses water  │
│ +8 XP                  │
│                        │
│              [DONE]    │
└────────────────────────┘
```

---

# 12. Quest 类型

## Daily Quest

每天固定出现。

```text
Drink Water
Walk
Stretch
Read
Sleep
```

---

## Challenge Quest

比普通任务稍难。

例如：

```text
20 Push-ups
30 min Walk
30 min Deep Work
```

---

## Bonus Quest

不是必须完成。

例如：

```text
+ BONUS

Take a 20-minute walk

Reward:
+15 XP
+3 Body
```

---

## Boss Challenge

阶段性挑战。

例如 14 天计划：

```text
DAY 1–3
Tutorial

DAY 4–7
First Challenge

DAY 8–10
Difficulty Increase

DAY 11–13
Final Preparation

DAY 14
BOSS QUEST
```

Boss Quest 可以是：

```text
30-minute walk
Complete a personal project milestone
Long focus session
Complete a healthy routine
```

重点不是「越痛苦越好」，而是完成一个具有仪式感的阶段目标。

---

# 13. Quest Difficulty

每个任务有难度：

```text
Easy
Normal
Hard
Epic
Boss
```

例如：

```text
Easy
Drink water

Normal
20 squats

Hard
30-minute walk

Epic
60-minute workout

Boss
Complete 14-day challenge
```

---

# 14. Task Completion

完成任务后不要只出现：

```text
✓ Done
```

应该有游戏反馈。

例如：

```text
QUEST COMPLETE

15 Squats

+10 XP
+2 BODY

━━━━━━━━━━━━

LEVEL UP!

LEVEL 3 → LEVEL 4
```

可以有：

- XP 动画
- 属性数字跳动
- Progress bar
- Character animation
- Achievement popup
- Sound effect（可选）

---

# 15. Streak 系统

连续完成任务：

```text
🔥 3 Day Streak
🔥 7 Day Streak
🔥 14 Day Streak
🔥 30 Day Streak
🔥 66 Day Streak
```

但不要让 Streak 太惩罚用户。

例如漏一天：

不要：

```text
STREAK LOST
YOU FAILED
```

而是：

```text
Yesterday was a rest day.

Your journey continues.

Current Streak: 0
Total Progress: 23 days
```

避免用户因为一次失败而直接放弃。

---

# 16. Rest Day

这是非常重要的系统。

不是每天都要变强。

可以主动安排：

```text
REST DAY

Today's goal:

Recover.

Optional:
5 min stretching
Drink water
Relax
Sleep early
```

这样可以避免：

> 游戏化 → 用户每天疯狂完成任务 → 过度训练 → 放弃。

---

# 17. Character Progress

角色页面：

```text
MY CHARACTER

        [Character]

LEVEL 12
████████████░░ 82%

NEXT LEVEL
1,240 XP


ATTRIBUTES

BODY       ███████░░░  68
MIND       ██████░░░░  57
REST       █████░░░░░  48
FUEL       ██████░░░░  55
CONNECTION ████████░░  76
PURPOSE    ███████░░░  69
```

---

# 18. Growth Radar

使用 Radar Chart 表示属性。

例如：

```text
           BODY
            /\
           /  \
 PURPOSE  /    \ MIND
          \    /
           \  /
       CONNECTION
```

可以提供：

```text
DAY 1
vs
DAY 14
```

让用户看到：

> 「我真的改变了。」

这会是产品非常重要的情绪反馈。

---

# 19. Progress Timeline

用户可以看到自己的成长历史。

```text
DAY 01
Started Journey
↓
DAY 03
First Streak
↓
DAY 07
Level Up
↓
DAY 10
Body +5
↓
DAY 14
Challenge Complete
↓
DAY 30
New Rank
```

---

# 20. Achievement

类似游戏成就。

例如：

```text
🏃 First Step
Complete your first activity.

🔥 Consistency
Complete tasks 7 days.

💪 Stronger
Gain 20 Body points.

🧠 Focused
Complete 10 focus quests.

🌙 Rested
Complete 5 rest days.

⚔ Awakened
Reach Level 10.

👑 66 Days
Complete a 66-day journey.
```

---

# 21. Rank System

可以增加长期成长感。

```text
F Rank
E Rank
D Rank
C Rank
B Rank
A Rank
S Rank
```

但 Rank 不应该表示一个人的真实价值。

它只是：

> **你在这个 App 中持续完成成长计划的进度。**

例如：

```text
LEVEL 1–4
F

LEVEL 5–9
E

LEVEL 10–19
D

...
```

---

# 22. Adaptive Difficulty

这是 AI 最值得使用的地方。

系统每天观察：

```text
Completion Rate
Task Difficulty
Skipped Tasks
User Feedback
Time Available
Recent Streak
Attribute Progress
```

然后自动调整。

例如：

用户连续 5 天：

```text
20 Squats
✓
✓
✓
✓
✓
```

系统可以：

```text
New Quest Unlocked

30 Squats
```

但如果：

```text
20 Squats
✗
✗
✗
```

系统应该降低难度：

```text
Today's Quest

10 Squats

Let's rebuild the streak.
```

核心原则：

> **系统应该适应人，而不是逼人适应系统。**

---

# 23. AI Coach

可以加入一个角色作为用户的成长伙伴。

不是传统 Chatbot，而是：

```text
Growth Coach
```

它可以：

- 解释今天为什么有这些任务
- 鼓励用户
- 调整任务
- 回顾过去几天
- 回答成长相关问题
- 帮用户重新制定计划

例如：

> 「为什么今天只有两个任务？」

AI：

> 「你昨天完成了比较高强度的训练，所以今天安排了恢复和轻度活动。今天不是偷懒，而是让身体有时间适应。」

---

# 24. 不要让 AI 生成完全随机任务

AI 应该负责：

```text
Planning
Personalization
Adjustment
Explanation
Motivation
```

真正的任务应该来自：

```text
Task Library
```

例如数据库：

```text
tasks

id
name
category
attribute
difficulty
duration
environment
equipment
min_age
max_age
contraindications
instructions
xp
attribute_xp
```

AI 从 Task Library 选择和组合。

这样比：

```text
LLM 随机生成运动
```

安全、稳定，也更容易维护。

---

# 25. Web App 页面结构

建议 MVP：

```text
/
Landing

/onboarding
Character Creation

/dashboard
Today's Quests

/character
Character + Attributes

/quests
Quest History

/progress
Growth Analytics

/achievements
Achievements

/plan
Current Growth Plan

/settings
Profile + Preferences
```

---

# 26. Dashboard

Dashboard 是整个 App 最重要的页面。

目标：

> 用户打开 App 后，3 秒内知道今天应该做什么。

结构：

```text
┌─────────────────────────────┐
│ DAY 12              ⚙       │
│                             │
│ LEVEL 6                     │
│ █████████░░░ 82%            │
│                             │
│ "Keep going."               │
│                             │
├─────────────────────────────┤
│ TODAY                       │
│                             │
│ ✓ Drink Water               │
│ □ 15 Squats                 │
│ □ Walk 20 min               │
│ □ Focus 15 min              │
│                             │
├─────────────────────────────┤
│        3 / 4 QUESTS         │
│                             │
│       [ COMPLETE ]          │
└─────────────────────────────┘
```

---

# 27. Daily Score

可以有一个当天完成度：

```text
TODAY

████████░░ 80%

3 / 4 quests
```

但是不要设计成：

```text
80% = 今天失败
```

而应该：

```text
You've done enough today.

1 optional quest remaining.
```

---

# 28. Notification

通知应该像游戏任务提醒。

不要：

> 「你今天还没运动。」

可以：

> ⚔ Your next quest is waiting.

或者：

> 🌙 Recovery Quest unlocked.

或者：

> 🔥 6-day streak. One more day to reach 7.

用户可以关闭通知。

---

# 29. 视觉设计方向

参考方向：

```text
Dark UI
+
Orange / Amber Accent
+
Glass panels
+
Subtle gradients
+
Game HUD
+
Minimal anime/RPG feeling
```

整体感觉：

> **现代健康 App + RPG HUD + 少量动漫成长感**

不要做成：

- 纯健身 App
- 纯游戏 UI
- 太幼稚的卡通
- 太复杂的 RPG inventory

---

# 30. 色彩

推荐：

```text
Background
#0F0F12

Primary
#FF6A00

Secondary
#FF9D42

Text
#FFFFFF

Muted
#9A9A9A

Success
#70D6A0
```

如果希望更有「觉醒」感觉，可以使用：

```text
Black
Orange
White
Small amount of Purple
```

---

# 31. Character Visual

MVP 不需要复杂 3D Character。

可以先：

```text
Silhouette
+
Level
+
Aura
```

例如：

```text
Level 1
普通角色

Level 10
角色出现 Aura

Level 20
装备变化

Level 30
特殊视觉效果

Level 50
高级形态
```

这样未来可以加入真正的 Avatar System。

---

# 32. 66-Day Journey

长期核心玩法：

```text
THE 66 DAY JOURNEY
```

用户进入：

```text
DAY 01
        ↓
DAY 07
        ↓
DAY 14
        ↓
DAY 30
        ↓
DAY 45
        ↓
DAY 66
```

每一个阶段都有新的视觉变化。

例如：

### Day 1

> The journey begins.

### Day 7

> First awakening.

### Day 14

> Your habits are taking shape.

### Day 30

> You are no longer the person who started.

### Day 66

> Journey Complete.

---

# 33. 66 Day Completion Screen

最终页面可以非常有仪式感：

```text
66 DAYS COMPLETE

PLAYER LEVEL 18

        [ CHARACTER ]

BODY        +18
MIND        +11
REST        +9
FUEL        +14
CONNECTION  +7
PURPOSE     +16

━━━━━━━━━━━━━━━━

You completed:

142 Quests
31 Challenges
12 Achievements

━━━━━━━━━━━━━━━━

"我做過最值得的投資。
從不後悔。"
```

然后：

```text
START NEXT JOURNEY
```

---

# 34. MVP 范围

第一版不要做太大。

## MVP 必须有

### Account

- Login
- User profile

### Onboarding

- Goals
- Preferred style
- Duration
- Environment
- Equipment
- Available time

### Character

- Level
- XP
- 6 Attributes

### Quest

- Daily quests
- Complete quest
- XP reward
- Attribute reward

### Progress

- Daily history
- Streak
- Attribute chart
- Level progression

### Plan

- 14 / 30 / 66 day plan

---

# 35. MVP 暂时不要做

以下功能可以第二阶段再做：

```text
❌ Multiplayer
❌ PvP
❌ Complex inventory
❌ Equipment system
❌ Character combat
❌ 3D character
❌ Social feed
❌ Leaderboard
❌ Marketplace
❌ Gacha
❌ Cryptocurrency
```

尤其不要做 Leaderboard。

因为这个 App 的核心不是：

> 谁比别人强。

而是：

> **我比过去的自己强多少。**

---

# 36. 第二阶段

可以增加：

```text
Achievements
Boss Challenges
AI Coach
Adaptive Difficulty
Character customization
Quest categories
More advanced analytics
Weekly reports
```

---

# 37. 第三阶段

可以加入更强的 RPG 感：

```text
Character Classes

Warrior
Focus: Body

Mage
Focus: Mind

Guardian
Focus: Rest

Ranger
Focus: Health

Monk
Focus: Mind + Rest

Hero
Balanced
```

Class 不代表限制，只是提供不同的成长路线。

用户也可以：

```text
Change Class
```

---

# 38. 技术架构建议

如果是个人开发，建议保持简单。

## Frontend

```text
Nuxt / Vue
TypeScript
Tailwind CSS
```

或者如果希望更轻：

```text
Vue
Vite
TypeScript
```

---

## Backend

MVP：

```text
Node.js
REST API
```

或者使用：

```text
Supabase
```

直接提供：

- Authentication
- PostgreSQL
- API
- Storage

---

# 39. Database

基本结构：

```text
users

id
email
created_at
```

```text
profiles

user_id
name
goal
difficulty
preferred_environment
available_time
journey_days
start_date
end_date
```

```text
attributes

user_id
body
mind
rest
fuel
connection
purpose
```

```text
quests

id
name
category
attribute
difficulty
duration
xp
```

```text
daily_quests

id
user_id
quest_id
date
status
xp_earned
completed_at
```

```text
journeys

id
user_id
start_date
end_date
current_day
status
```

```text
achievements

id
name
description
condition
reward
```

```text
user_achievements

user_id
achievement_id
unlocked_at
```

---

# 40. AI Architecture

不要让 AI 直接修改用户属性。

建议：

```text
User
 ↓
Onboarding
 ↓
Growth Planner
 ↓
Task Selection
 ↓
Rule Engine
 ↓
Daily Quest
 ↓
User Completion
 ↓
Progress Engine
 ↓
AI Adjustment
```

AI 只负责：

```text
Recommend
Explain
Personalize
Adjust
Motivate
```

核心数据计算由系统负责：

```text
XP
Level
Attributes
Streak
Achievements
Progress
```

这样可以避免 AI 每次计算结果不一致。

---

# 41. Anti-Cheat / Trust

因为任务主要依赖用户自行确认，所以不需要过度防作弊。

例如：

```text
Did you complete this quest?

[ YES ]
```

产品哲学：

> 这是你的成长，不是考试。

用户骗系统其实等于骗自己。

未来可以增加：

```text
Apple Health
Google Fit
Step Count
Workout data
Sleep data
```

作为可选验证。

---

# 42. Monetization

可以考虑 Freemium。

## Free

```text
1 active journey
Basic quests
Basic attributes
Basic progress
Basic achievements
```

## Premium

```text
Unlimited journeys
Advanced AI Coach
Adaptive plans
Advanced analytics
Custom goals
More character styles
Advanced challenges
Historical reports
```

不要把核心成长功能全部锁死。

---

# 43. 最重要的 UX 原则

### Rule 1

**打开 App 后马上知道今天做什么。**

### Rule 2

**任务必须足够简单，可以马上开始。**

### Rule 3

**完成任务必须有即时反馈。**

### Rule 4

**用户失败不能产生羞耻感。**

### Rule 5

**休息也是成长的一部分。**

### Rule 6

**不要让游戏系统盖过真实生活。**

---

# 44. 核心 Product Loop

最终整个产品可以浓缩成：

```text
                 ┌──────────────┐
                 │   REAL LIFE  │
                 └──────┬───────┘
                        │
                        ▼
                ┌───────────────┐
                │  DAILY QUEST  │
                └──────┬────────┘
                       │
                       ▼
                ┌───────────────┐
                │ COMPLETE TASK │
                └──────┬────────┘
                       │
                       ▼
                ┌───────────────┐
                │   XP + STATS  │
                └──────┬────────┘
                       │
                       ▼
                ┌───────────────┐
                │  LEVEL UP     │
                └──────┬────────┘
                       │
                       ▼
                ┌───────────────┐
                │ NEW CHALLENGE │
                └──────┬────────┘
                       │
                       └───────────────┐
                                       ▼
                                  REAL LIFE
```

---

# 45. 产品最核心的一句话

> **You don't level up in the game.  
> You level up in real life.**

中文：

> **你升级的不是游戏角色，而是现实中的自己。**

这应该成为整个 Web App 的核心。

---

# 46. 第一版开发顺序

建议按这个顺序做：

```text
Phase 1
基础 UI
↓
Dashboard
↓
Character Page
↓
Attribute System
↓
XP / Level System
↓
Quest System
↓
Daily Quest
↓
Quest Completion Animation
↓
Progress History
↓
Onboarding
↓
Journey System
↓
14 / 30 / 66 Day
↓
AI Planner
↓
AI Adaptive Difficulty
↓
Achievements
↓
Polish
```

---

# 47. 最小可玩的 Prototype

甚至可以把第一版缩到只有：

```text
1. Onboarding

2. Choose:
   - Goal
   - Difficulty
   - Duration

3. Generate 3 daily quests

4. Complete quest

5. +XP

6. Attribute increases

7. Level increases

8. Character screen

9. Day 1 → Day 14 progression
```

只要这个 Loop 好玩，就已经证明产品方向成立。

其他功能都可以慢慢加。

---

# 48. 最终产品体验

用户打开：

> **DAY 23**

看到：

```text
LEVEL 8
████████░░

TODAY'S QUESTS

✓ Drink Water
✓ 15 Squats
□ Walk 20 min
□ Focus 15 min
```

完成最后一个任务。

画面：

```text
QUEST COMPLETE

+12 XP
+2 BODY
+1 MIND

LEVEL UP

8 → 9
```

然后出现：

```text
NEW ACHIEVEMENT

CONSISTENCY

23 DAYS

Keep going.
```

用户关掉 App。

然后继续真实生活。

---

# 49. 产品愿景

最终不是一个：

> 「帮你管理 Todo List 的 App」

也不是：

> 「健身 App」

更不是：

> 「AI Chatbot」

而是：

> **一个把现实人生转换成 RPG 成长系统的个人成长平台。**

用户每天只需要做一点点。

但几周、几个月后回头看：

```text
Day 1
       ↓
Day 14
       ↓
Day 30
       ↓
Day 66
       ↓
Day 365
```

看到自己的属性、习惯、目标和生活轨迹真的发生变化。

**游戏的奖励不是虚拟装备。**

**奖励是现实中的自己变得更强。**
