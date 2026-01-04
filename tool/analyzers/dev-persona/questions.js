const dimensions = ["logic", "speed", "structure", "chaos"];

const questions = [
  {
    text: "你卡在一个 bug 30 分钟没进展，你会？",
    options: [
      { text: "查官方文档", score: { logic: 2, structure: 1 } },
      { text: "Google / StackOverflow", score: { speed: 2 } },
      { text: "询问 AI，请它解释问题原因", score: { logic: 1, speed: 1 } },
      { text: "让 AI Agent 直接尝试修", score: { speed: 2, chaos: 1 } },
      { text: "直接重写", score: { chaos: 2 } }
    ]
  },
  {
    text: "新项目你通常先做什么？",
    options: [
      { text: "画架构 / 设计", score: { structure: 2 } },
      { text: "直接写 MVP", score: { speed: 2 } },
      { text: "找现成 library", score: { logic: 1, speed: 1 } },
      { text: "等灵感", score: { chaos: 2 } }
    ]
  },
  {
    text: "你最讨厌哪种情况？",
    options: [
      { text: "没有文档", score: { structure: 2 } },
      { text: "需求不明确、AI 也讲不清", score: { chaos: 2 } },
      { text: "Legacy code", score: { logic: 1 } },
      { text: "Deadline", score: { chaos: 1 } }
    ]
  }
];

const personas = [
  {
    id: "ai_native",
    title: "🤖 AI-Native Engineer",
    match: s => s.speed > 0.6 && s.logic > 0.5 && s.chaos < 0.6,
    desc: "你把 AI 当成默认协作者，用它加速思考与实现，而不是替代判断。"
  },
  {
    id: "architect",
    title: "🧠 Systematic Architect",
    match: s => s.structure > 0.7 && s.logic > 0.6,
    desc: "你重视结构与长期维护性。"
  },
  {
    id: "hacker",
    title: "⚡ Speed Hacker",
    match: s => s.speed > 0.7,
    desc: "你追求快速试错与交付。"
  },
  {
    id: "chaos",
    title: "🌪 Chaos Explorer",
    match: s => s.chaos > 0.6,
    desc: "你富有创意，但有时过于随性。"
  }
];