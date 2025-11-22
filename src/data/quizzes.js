export const quizzes = {
  html: [
    {
      question: "What does HTML stand for?",
      options: [
        "HyperText Markup Language",
        "Hyper Transfer Markup Level",
        "HighText Machine Language",
        "Hyperlink Text Mode Language",
      ],
      answer: 0,
    },
    {
      question: "Which tag is used for the largest heading?",
      options: ["<heading>", "<h6>", "<h1>", "<head>"],
      answer: 2,
    },
    {
      question: "Which tag is used for a line break?",
      options: ["<break>", "<br>", "<lb>", "<enter>"],
      answer: 1,
    },
    {
      question: "Which attribute adds a link?",
      options: ["src", "href", "link", "ref"],
      answer: 1,
    },
    {
      question: "HTML comments are written as?",
      options: ["{-- comment --}", "// comment", "<!-- comment -->", "[* comment *]"],
      answer: 2,
    },
  ],

  css: [
    {
      question: "Which property changes text color?",
      options: ["font-color", "text-style", "color", "font-type"],
      answer: 2,
    },
    {
      question: "Which unit is relative to root font size?",
      options: ["em", "px", "rem", "%"],
      answer: 2,
    },
    {
      question: "Which property makes a flex container?",
      options: ["display: block", "display: table", "display: flex", "position: flex"],
      answer: 2,
    },
    {
      question: "Which property controls spacing inside a box?",
      options: ["margin", "padding", "border", "gap"],
      answer: 1,
    },
    {
      question: "Which selector targets an ID?",
      options: [".id", "#id", "*id", "id:"],
      answer: 1,
    },
  ],

  javascript: [
    {
      question: "Which keyword declares a constant?",
      options: ["let", "const", "var", "define"],
      answer: 1,
    },
    {
      question: "Which method converts JSON string to object?",
      options: ["JSON.parse()", "JSON.stringify()", "JSON.toObject()", "parseJSON()"],
      answer: 0,
    },
    {
      question: "How do you write an arrow function?",
      options: ["function => () {}", "() => {}", "{ ()=> function }", "=> function()"],
      answer: 1,
    },
    {
      question: "Which data type is NOT primitive?",
      options: ["string", "number", "object", "boolean"],
      answer: 2,
    },
    {
      question: "What is `typeof null`?",
      options: ["null", "object", "undefined", "string"],
      answer: 1,
    },
  ],

  react: [
    {
      question: "What is JSX?",
      options: [
        "JavaScript XML",
        "JSON style XML",
        "Java Syntax Extension",
        "React Compiler",
      ],
      answer: 0,
    },
    {
      question: "Which hook handles state?",
      options: ["useFetch", "useState", "useJs", "useClass"],
      answer: 1,
    },
    {
      question: "Which command creates a React project?",
      options: ["npm create react", "npx create-react-app", "npm init react", "react start"],
      answer: 1,
    },
    {
      question: "Props are...?",
      options: [
        "Internal state of component",
        "External data passed to component",
        "React CSS classes",
        "API methods",
      ],
      answer: 1,
    },
    {
      question: "Which hook handles side effects?",
      options: ["useEffect", "useSide", "useImpact", "useRun"],
      answer: 0,
    },
  ],
};
