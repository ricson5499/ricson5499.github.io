// prompts.js
const prompts = [
  {
    category: "AI行為控制記憶",
    description: "這些提示詞用於控制AI的行為和記憶，幫助AI在回答問題時遵循特定的原則和規範。",
    items: [
      {
        title: "反幻覺提示詞",
        usage: "用於要求AI在回答前進行事實檢查，避免生成不正確或未經證實的資訊。",
        prompt: `回答前先進行事實檢查。僅依據已知或已查證資訊作答；資料不足時直接說明「無法確定」，不得臆測或補完內容。引用或推論需說明依據，假設需明確標示。問題不明時先詢問，不擴大使用者原意。產出前確認答案有依據、未超出範圍、未加入未被明確提及的內容。原則：寧可不知道，不可捏造。`
      },
      {
        title: "Template-based, maintainable generation prompt",
        usage: "用於要求AI採用基於模板、可維護的生成方式，避免即興生成或字符串連接生成。",
        prompt:`Wants to adopt and follow the personal coding principle: 'Template-based, maintainable generation' — preferring template-first approaches with clear structure and maintainability over ad-hoc echo-based or string-concatenation generation, and asks me to remember this rule for future coding discussions.`
      }
    ]
  },
  {
    category: "AI Context Management",
    description: "這些提示詞用於管理AI的上下文，幫助AI在對話中保持一致性和連貫性。",
    items: [
      {
        title: "Context Compression (Project Ready) - Generate Key Context Markdown",
        usage: "用於將對話內容壓縮成適合專案使用的Markdown上下文文件。",
        prompt:`Please compress this conversation into a Project-ready Markdown context file.

It is a context-compression file intended for another Large Language Model conversation, so preserve everything that will affect future reasoning while removing everything else.

Requirements:

- Output ONLY valid Markdown.
- Do not explain what you are doing.
- Remove greetings, filler, repeated discussions, trial-and-error, and duplicated ideas.
- Keep only information that would help another Large Language Model continue this project with minimal context loss.

The output should contain these sections:

# Project Overview
A concise explanation of the project's objective and current progress.

# Final Decisions
List every confirmed decision that was made.
Do NOT include ideas that were rejected or only discussed.

# Important Facts
Record all factual information that future conversations may depend on.
Examples:
- versions
- APIs
- libraries
- file names
- configurations
- URLs
- dependencies
- environment
- commands
- architecture
- constraints

# Key Reasoning
Only preserve reasoning that explains WHY a decision was made.
Do not include failed attempts unless they explain the final solution.

# Current State
Describe exactly where the project currently stands.

# Remaining Tasks
List unfinished work.

# Risks / Known Issues
List unresolved problems, assumptions, edge cases, technical debt, or uncertainties.

# Useful Snippets
Include only code snippets, commands, prompts, regex, SQL, or configuration that are likely to be reused later.

# Conversation Memory
Anything about user preferences or project conventions established during this conversation that future Large Language Model should continue following.

Compression rules:

- Remove approximately 70–90% of conversational text.
- Preserve 95%+ of the information needed to continue the project.
- Merge duplicated information.
- Convert long explanations into concise bullet points.
- Prefer structured data over paragraphs.
- Keep technical accuracy.
- Do not invent or infer missing information.
- If information is uncertain, explicitly mark it as "Unconfirmed".

The resulting Markdown should be suitable for attaching to a new Project as the primary context document.`
      }
    ]
  }
];
export default prompts;