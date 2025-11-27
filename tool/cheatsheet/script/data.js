// === DATA: Concept Cards ===
const KB_DATA = [{
    id: "js-promise-basic",
    title: "什么是 Promise？",
    category: "Async",
    language: "JavaScript",
    level: "beginner",
    explain: "Promise 就像你跟朋友说『我之后给你』。现在拿不到，未来会给你。它只是一个『未来才会出现的值』的盒子。",
    cheatsheet: [
      "Promise = 未来的值盒子",
      "有三种状态：等一下（pending）、成功（fulfilled）、失败（rejected）",
      "then()：成功后做什么",
      "catch()：失败时做什么"
    ],
    examples: [{
      title: "简单例子",
      code: `new Promise(resolve => resolve(123));`
    }]
  },
  {
    id: "js-resolve-meaning",
    title: "resolve() 是什么？",
    category: "Async",
    language: "JavaScript",
    level: "beginner",
    explain: "resolve() 是『告诉 Promise：好了，可以给答案了！』。它不会停止代码，只是把结果传出去。",
    cheatsheet: [
      "resolve = 把答案给 Promise",
      "resolve(x)：把 x 当作结果送给 then()",
      "不能当成『结束代码』用"
    ],
    examples: []
  },
  {
    id: "js-await-concept",
    title: "await 在做什么？",
    category: "Async",
    language: "JavaScript",
    level: "beginner",
    explain: "await 就像在等红绿灯：你这个 async function 会稍微停一下，但旁边的车（其他代码）还是继续走。",
    cheatsheet: [
      "await = 在 async function 里面『等一下』",
      "await 只能等 Promise",
      "await 后面的代码会等 Promise 完成才跑"
    ],
    examples: [{
      title: "例子",
      code: `async function test(){
const data = await fetch('/api');
console.log(data);
}`
    }]
  },
  {
    id: "js-variable-basics",
    title: "什么是变量？（var / let / const）",
    category: "Basics",
    language: "JavaScript",
    level: "beginner",
    explain: "变量就像贴了名字的小盒子，可以放东西。let/var 的盒子可以换里面的东西；const 的盒子贴死了，不能换名字，但里面的内容如果是对象还是能动。",
    cheatsheet: [
      "let：可换内容的小盒子（最常用）",
      "const：名字锁死，但里面如果是对象，内容还能改",
      "var：老盒子，功能怪怪的，现在很少用"
    ],
    examples: [
      { title: "Example", code: "let x = 5; const user = { name: 'A' };" }
    ]
  },
  {
    id: "js-function-basic",
    title: "什么是函数？",
    category: "Basics",
    language: "JavaScript",
    level: "beginner",
    explain: "函数就像一台自动机器，你给它东西，它帮你处理，再把结果给你。",
    cheatsheet: [
      "普通写法：function 做事机() {}",
      "箭头函数：更轻巧的写法 () => {}",
      "有名字是机器，有参数是可以输入材料"
    ],
    examples: [
      {
        title: "Function Forms",
        code: `function add(a, b){ return a + b; }\nconst add2 = (a, b) => a + b;`
      }
    ]
  },
  {
    id: "js-array-object",
    title: "Array vs Object",
    category: "Basics",
    language: "JavaScript",
    level: "beginner",
    explain: "Array 是排队的东西（用数字找）。Object 是有名字的抽屉（用名字找）。",
    cheatsheet: [
      "Array = 排队，位置编号：0、1、2…",
      "Object = 抽屉，一格一名字",
      "什么时候排队 → array；什么时候有名字 → object"
    ],
    examples: [
      {
        title: "Example",
        code: `const arr = ['apple', 'banana'];\nconst obj = { fruit: 'apple' };`
      }
    ]
  },
  {
    id: "js-this",
    title: "this 是谁？",
    category: "Core",
    language: "JavaScript",
    level: "beginner",
    explain: "this 的意思是『谁叫我，我就指谁』。像有人叫你的名字，你就看向那个人。",
    cheatsheet: [
      "谁用这个函数，this 就指向谁",
      "对象里面用方法 → this 指向那个对象",
      "箭头函数没有自己的 this（用外面的）"
    ],
    examples: [
      {
        title: "Example",
        code: `const user = { name:'A', say(){ console.log(this.name); } };`
      }
    ]
  },
  {
    id: "js-scope",
    title: "什么是作用域？（scope）",
    category: "Core",
    language: "JavaScript",
    level: "beginner",
    explain: "作用域就是『你站在哪里，就看得到哪些东西』。像房间：你在房间里面，看不到外面。",
    cheatsheet: [
      "大范围能看到小范围",
      "小范围看不到外面",
      "function 会产生自己的小房间（scope）"
    ],
    examples: [
      {
        title: "Example",
        code: `function test(){ let a = 1; }\n// 外面看不到 a`
      }
    ]
  },
  {
    id: "js-closure",
    title: "什么是闭包？（closure）",
    category: "Core",
    language: "JavaScript",
    level: "beginner",
    explain: "闭包就像你带了一把旧房间的钥匙，虽然你离开了房间，但你还是能打开那个抽屉。",
    cheatsheet: [
      "函数里面的函数，可以记住外面的变量",
      "房间都走出来了，钥匙还在",
      "最常用在：计数器、保存资料"
    ],
    examples: [
      {
        title: "Example",
        code: `function counter(){ let x = 0;\n  return ()=> x++;\n}`
      }
    ]
  },
  {
    id: "js-event",
    title: "什么是事件？（event）",
    category: "Web",
    language: "JavaScript",
    level: "beginner",
    explain: "事件像『有人敲你的肩膀』，告诉你：按钮被按了、页面加载好了、有人输入东西了。",
    cheatsheet: [
      "事件 = 某件事发生了",
      "你可以写：发生时要做什么",
      "常见：click、input、load、scroll"
    ],
    examples: [
      {
        title: "Example",
        code: `button.addEventListener('click', ()=>{\n  console.log('clicked');\n});`
      }
    ]
  },
  {
    id: "js-solid principles",
    title: "什么是 SOLID 原则？",
    category: "Basics",
    language: "JavaScript",
    level: "medium",
    explain: "SOLID 是五个写好代码的原则缩写，帮你写出又干净又好维护的代码。",
    cheatsheet: [
      "S - 单一职责原则（Single Responsibility Principle），意思是每个模块或类应该只有一个职责。",
      "O - 开闭原则（Open/Closed Principle），意思是软件实体应该对扩展开放，对修改关闭。",
      "L - 里氏替换原则（Liskov Substitution Principle），意思是子类对象应该可以替换掉父类对象而不影响程序的正确性。",
      "I - 接口隔离原则（Interface Segregation Principle），意思是客户端不应该被强迫依赖它们不使用的方法。",
      "D - 依赖倒置原则（Dependency Inversion Principle），意思是高层模块不应该依赖低层模块，二者都应该依赖于抽象。"
    ],
    examples: []
  }

];