import { Topic, Module, Quiz, MentalMap, UserProgress } from "./types";

export const mockTopics: Topic[] = [
  {
    topic_id: "tax_filing_101",
    title: "How to File Your Taxes",
    description:
      "Learn the essential steps to file your taxes correctly and maximize your refund.",
    modules: [
      {
        module_id: "tax_basics_01",
        title: "Understanding Tax Basics",
        description:
          "Learn the fundamental concepts of income tax and filing requirements",
        order: 1,
        content: {
          introduction: {
            text: "Understanding the basics of income tax is crucial for every taxpayer. In this module, you'll learn about tax filing requirements, important deadlines, and basic tax concepts.",
            learning_objectives: [
              "Understand who needs to file taxes",
              "Learn about important tax deadlines",
              "Understand basic tax terminology",
            ],
          },
          sections: [
            {
              section_id: "filing_requirements",
              title: "Who Needs to File Taxes?",
              content:
                "Most U.S. citizens and permanent residents need to file a tax return if their income exceeds certain thresholds. These thresholds vary based on filing status (single, married filing jointly, etc.) and age. Even if your income is below the threshold, you might need to file if you're self-employed or have certain types of income.",
            },
            {
              section_id: "important_dates",
              title: "Important Tax Deadlines",
              content:
                "The main tax filing deadline is April 15th of each year. However, if you need more time, you can file for an extension until October 15th. It's important to note that while an extension gives you more time to file, it doesn't extend the time to pay any taxes owed.",
            },
          ],
          summary: {
            text: "In this module, we've covered the basic requirements for filing taxes and important deadlines to keep in mind.",
            key_points: [
              "Most people need to file if their income exceeds certain thresholds",
              "The main filing deadline is April 15th",
              "Extensions are available but don't extend payment deadlines",
            ],
          },
        },
        quiz_id: "quiz_tax_basics_01",
        estimated_time: "30 minutes",
      },
      {
        module_id: "tax_documents_02",
        title: "Gathering Required Documents",
        description: "Learn what documents you need to prepare your tax return",
        order: 2,
        content: {
          introduction: {
            text: "Proper tax preparation starts with gathering all necessary documents. In this module, you'll learn what documents you need and how to organize them effectively.",
            learning_objectives: [
              "Identify required tax documents",
              "Understand how to obtain missing documents",
              "Learn how to organize tax documents",
            ],
          },
          sections: [
            {
              section_id: "required_documents",
              title: "Essential Tax Documents",
              content:
                "The most important documents you'll need include: W-2 forms from employers, 1099 forms for other income, records of deductions and credits, and previous year's tax return. You'll also need your Social Security number and any relevant receipts for deductions.",
            },
            {
              section_id: "document_organization",
              title: "Organizing Your Documents",
              content:
                "Create a system to organize your tax documents. Consider using folders for different types of documents (income, deductions, credits) and keep digital copies of important documents. This organization will make the filing process much smoother.",
            },
          ],
          summary: {
            text: "You've learned about the essential documents needed for tax filing and how to organize them effectively.",
            key_points: [
              "W-2 and 1099 forms are essential income documents",
              "Keep records of all deductions and credits",
              "Organize documents by category for easy access",
            ],
          },
        },
        quiz_id: "quiz_tax_documents_02",
        estimated_time: "45 minutes",
      },
    ],
    prerequisite_quiz_id: "quiz_tax_prereq",
    final_quiz_id: "quiz_tax_final",
  },
];

export const mockMentalMap: MentalMap = {
  map_id: "map_tax_filing",
  topic_id: "tax_filing_101",
  nodes: [
    {
      id: "1",
      label: "Tax Basics",
      type: "concept",
      description: "Understanding fundamental tax concepts and requirements",
      difficulty_level: "beginner",
      estimated_time: "30 minutes",
      learning_objectives: [
        "Understand filing requirements",
        "Learn important deadlines",
        "Grasp basic tax terminology",
      ],
      related_resources: ["tax_basics_01"],
    },
    {
      id: "2",
      label: "Required Documents",
      type: "concept",
      description: "Identifying and organizing necessary tax documents",
      difficulty_level: "beginner",
      estimated_time: "45 minutes",
      learning_objectives: [
        "Identify required documents",
        "Learn document organization",
        "Understand document retention",
      ],
      related_resources: ["tax_documents_02"],
    },
  ],
  edges: [
    {
      from: "1",
      to: "2",
      relationship_type: "prerequisite",
      weight: 1,
      description:
        "Understanding tax basics is required before gathering documents",
    },
  ],
};

export const mockQuizzes: Quiz[] = [
  {
    quiz_id: "quiz_tax_prereq",
    quiz_type: "prerequisite",
    topic_id: "tax_filing_101",
    module_id: "",
    questions: [
      {
        question: "What is the main purpose of filing taxes?",
        options: [
          "To report income and calculate tax liability",
          "To get a refund",
          "To avoid penalties",
          "To maintain citizenship",
        ],
        correct_answer: 0,
        explanation:
          "The main purpose of filing taxes is to report your income and calculate your tax liability to the government.",
        topic_area: "basics",
      },
      {
        question: "What is a W-2 form?",
        options: [
          "A form that reports your wages and taxes withheld",
          "A form for claiming deductions",
          "A form for requesting a refund",
          "A form for reporting business income",
        ],
        correct_answer: 0,
        explanation:
          "A W-2 form is provided by your employer and reports your wages and taxes withheld for the year.",
        topic_area: "documents",
      },
      {
        question:
          "What is the difference between a tax deduction and a tax credit?",
        options: [
          "A deduction reduces taxable income, while a credit reduces tax owed directly",
          "A deduction reduces tax owed directly, while a credit reduces taxable income",
          "There is no difference between deductions and credits",
          "Deductions are for businesses only, while credits are for individuals",
        ],
        correct_answer: 0,
        explanation:
          "A tax deduction reduces your taxable income, while a tax credit directly reduces the amount of tax you owe. Credits are generally more valuable than deductions.",
        topic_area: "tax_concepts",
      },
      {
        question: "What is the standard deduction?",
        options: [
          "A fixed amount that reduces taxable income without requiring itemization",
          "A deduction that requires detailed documentation",
          "A deduction only available to business owners",
          "A deduction that must be approved by the IRS",
        ],
        correct_answer: 0,
        explanation:
          "The standard deduction is a fixed amount that reduces your taxable income without requiring you to itemize your deductions. It's available to all taxpayers.",
        topic_area: "deductions",
      },
      {
        question:
          "What is the difference between a tax refund and a tax return?",
        options: [
          "A tax return is the form you file, while a refund is money returned to you",
          "A tax return is money returned to you, while a refund is the form you file",
          "They are the same thing",
          "A tax return is for businesses, while a refund is for individuals",
        ],
        correct_answer: 0,
        explanation:
          "A tax return is the form you file with the IRS to report your income and taxes, while a tax refund is money that the government returns to you if you overpaid your taxes.",
        topic_area: "tax_terminology",
      },
      {
        question:
          "What is the purpose of a Social Security number for tax purposes?",
        options: [
          "It's used to identify taxpayers and track their tax history",
          "It's only used for Social Security benefits",
          "It's optional for tax filing",
          "It's only required for business taxes",
        ],
        correct_answer: 0,
        explanation:
          "Your Social Security number is used to identify you as a taxpayer and track your tax history. It's required for filing taxes and receiving tax benefits.",
        topic_area: "identification",
      },
      {
        question: "What is the difference between gross income and net income?",
        options: [
          "Gross income is total earnings before deductions, while net income is after deductions",
          "Gross income is after deductions, while net income is total earnings",
          "They are the same thing",
          "Gross income is for businesses only, while net income is for individuals",
        ],
        correct_answer: 0,
        explanation:
          "Gross income is your total earnings before any deductions or taxes are taken out, while net income is what you actually receive after all deductions and taxes.",
        topic_area: "income_types",
      },
    ],
    passing_criteria: {
      minimum_score: 70,
      required_topic_areas: [
        "basics",
        "documents",
        "tax_concepts",
        "deductions",
        "tax_terminology",
        "identification",
        "income_types",
      ],
    },
  },
  {
    quiz_id: "quiz_tax_basics_01",
    quiz_type: "module",
    topic_id: "tax_filing_101",
    module_id: "tax_basics_01",
    questions: [
      {
        question: "What is the main tax filing deadline for most taxpayers?",
        options: ["April 15th", "March 15th", "May 15th", "June 15th"],
        correct_answer: 0,
        explanation: "The main tax filing deadline is April 15th of each year.",
        topic_area: "deadlines",
      },
      {
        question: "Which of the following is NOT a valid filing status?",
        options: [
          "Single with dependents",
          "Married filing jointly",
          "Head of household",
          "Qualifying widow(er)",
        ],
        correct_answer: 0,
        explanation:
          "Single with dependents is not a valid filing status. The correct status would be Head of household if you have dependents.",
        topic_area: "filing_status",
      },
      {
        question: "What happens if you need more time to file your taxes?",
        options: [
          "You can file for an extension until October 15th",
          "You can file for an extension until December 31st",
          "You cannot get an extension",
          "You must pay a penalty to get an extension",
        ],
        correct_answer: 0,
        explanation:
          "You can file for an extension until October 15th, but this only extends the time to file, not the time to pay any taxes owed.",
        topic_area: "extensions",
      },
      {
        question: "Who is required to file a tax return?",
        options: [
          "Anyone whose income exceeds certain thresholds based on filing status and age",
          "Only people who expect a refund",
          "Only people who are employed",
          "Only people who own property",
        ],
        correct_answer: 0,
        explanation:
          "Most U.S. citizens and permanent residents need to file if their income exceeds certain thresholds, which vary based on filing status and age.",
        topic_area: "filing_requirements",
      },
    ],
    passing_criteria: {
      minimum_score: 75,
      required_topic_areas: [
        "deadlines",
        "filing_status",
        "extensions",
        "filing_requirements",
      ],
    },
  },
  {
    quiz_id: "quiz_tax_documents_02",
    quiz_type: "module",
    topic_id: "tax_filing_101",
    module_id: "tax_documents_02",
    questions: [
      {
        question:
          "Which of the following is NOT typically needed for tax filing?",
        options: [
          "Birth certificate",
          "W-2 forms",
          "1099 forms",
          "Previous year's tax return",
        ],
        correct_answer: 0,
        explanation:
          "A birth certificate is not typically needed for tax filing. W-2 forms, 1099 forms, and previous year's tax return are commonly required documents.",
        topic_area: "required_documents",
      },
      {
        question: "What information does a W-2 form contain?",
        options: [
          "Wages earned and taxes withheld",
          "Only wages earned",
          "Only taxes withheld",
          "Only employer information",
        ],
        correct_answer: 0,
        explanation:
          "A W-2 form contains both wages earned and taxes withheld for the year.",
        topic_area: "w2",
      },
      {
        question: "When should you receive your W-2 form from your employer?",
        options: [
          "By January 31st",
          "By December 31st",
          "By February 15th",
          "By March 1st",
        ],
        correct_answer: 0,
        explanation:
          "Employers must provide W-2 forms to employees by January 31st of the following year.",
        topic_area: "document_timing",
      },
      {
        question: "What should you do if you don't receive your W-2 form?",
        options: [
          "Contact your employer and request a replacement",
          "File your taxes without it",
          "Wait until you receive it",
          "Estimate your income",
        ],
        correct_answer: 0,
        explanation:
          "If you don't receive your W-2 form, you should contact your employer to request a replacement. Do not file without it.",
        topic_area: "missing_documents",
      },
      {
        question:
          "Which of the following is the best way to organize tax documents?",
        options: [
          "Create separate folders for income, deductions, and credits",
          "Keep everything in one folder",
          "Store everything digitally only",
          "Keep only paper copies",
        ],
        correct_answer: 0,
        explanation:
          "Creating separate folders for different types of documents (income, deductions, credits) helps keep your tax documents organized and easily accessible.",
        topic_area: "organization",
      },
    ],
    passing_criteria: {
      minimum_score: 80,
      required_topic_areas: [
        "required_documents",
        "w2",
        "document_timing",
        "missing_documents",
        "organization",
      ],
    },
  },
];

export const mockUserProgress: UserProgress = {
  completed_topics: [],
  topic_progress: {
    tax_filing_101: {
      started_at: new Date().toISOString(),
      completed_at: null,
      current_module: "tax_basics_01",
      completed_modules: [],
      module_quiz_scores: {},
      prerequisite_quiz_score: null,
      final_quiz_score: null,
      mental_maps_completed: [],
    },
  },
  time_spent: 0,
  current_topic: "tax_filing_101",
  learning_path: ["tax_filing_101"],
};
