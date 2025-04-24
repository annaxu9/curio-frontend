export interface Topic {
  topic_id: string;
  title: string;
  description: string;
  modules: Module[];
  prerequisite_quiz_id: string;
  final_quiz_id: string;
}

export interface Module {
  module_id: string;
  title: string;
  description: string;
  order: number;
  content: {
    introduction: {
      text: string;
      learning_objectives: string[];
    };
    sections: {
      section_id: string;
      title: string;
      content: string;
    }[];
    summary: {
      text: string;
      key_points: string[];
    };
  };
  quiz_id: string;
  estimated_time: string;
}

export interface Quiz {
  quiz_id: string;
  quiz_type: string;
  topic_id: string;
  module_id: string;
  questions: {
    question: string;
    options: string[];
    correct_answer: number;
    explanation: string;
    topic_area: string;
  }[];
  passing_criteria: {
    minimum_score: number;
    required_topic_areas: string[];
  };
}

export interface MentalMap {
  map_id: string;
  topic_id: string;
  nodes: {
    id: string;
    label: string;
    type: string;
    description: string;
    difficulty_level: string;
    estimated_time: string;
    learning_objectives: string[];
    related_resources: string[];
  }[];
  edges: {
    from: string;
    to: string;
    relationship_type: string;
    weight: number;
    description: string;
  }[];
}

export interface UserProgress {
  completed_topics: string[];
  topic_progress: {
    [key: string]: {
      started_at: string;
      completed_at: string | null;
      current_module: string;
      completed_modules: string[];
      module_quiz_scores: { [key: string]: number };
      prerequisite_quiz_score: number | null;
      final_quiz_score: number | null;
      mental_maps_completed: string[];
    };
  };
  time_spent: number;
  current_topic: string;
  learning_path: string[];
}
