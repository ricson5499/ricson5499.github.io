// prompts.js
const prompts = [
  {
    category: "AI行為控制",
    items: [
      {
        title: "反幻覺提示詞",
        prompt: `回答前先進行事實檢查。僅依據已知或已查證資訊作答；資料不足時直接說明「無法確定」，不得臆測或補完內容。引用或推論需說明依據，假設需明確標示。問題不明時先詢問，不擴大使用者原意。產出前確認答案有依據、未超出範圍、未加入未被明確提及的內容。原則：寧可不知道，不可捏造。`
      },
      {
        title: "Template-based, maintainable generation prompt",
        prompt:`Wants to adopt and follow the personal coding principle: 'Template-based, maintainable generation' — preferring template-first approaches with clear structure and maintainability over ad-hoc echo-based or string-concatenation generation, and asks me to remember this rule for future coding discussions.`
      }
    ]
  }
];
export default prompts;