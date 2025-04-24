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
    ],
    passing_criteria: {
      minimum_score: 70,
      required_topic_areas: ["basics", "documents"],
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
