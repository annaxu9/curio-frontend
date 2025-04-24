import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Paper,
  Box,
  CircularProgress,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Alert,
  Stack,
  LinearProgress,
  Breadcrumbs,
  Link,
} from "@mui/material";
import {
  CheckCircle as CheckCircleIcon,
  Home as HomeIcon,
  NavigateNext as NavigateNextIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";
import api, { Quiz as QuizType } from "../services/api";

const Quiz: React.FC = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const [quiz, setQuiz] = useState<QuizType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const fetchQuiz = async () => {
    if (!quizId) return;

    try {
      const data = await api.getQuiz(quizId);
      setQuiz(data);
      setSelectedAnswers(new Array(data.questions.length).fill(-1));
      setLoading(false);
      setShowResults(false);
      setCurrentQuestion(0);
    } catch (err) {
      setError("Failed to load quiz");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, [quizId]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error || !quiz) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <Typography color="error">{error || "Quiz not found"}</Typography>
      </Box>
    );
  }

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[questionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const calculateScore = () => {
    if (!quiz) return 0;
    const correctAnswers = quiz.questions.filter(
      (q, i) => q.correct_answer === selectedAnswers[i]
    ).length;
    return (correctAnswers / quiz.questions.length) * 100;
  };

  const isPassing = () => {
    const score = calculateScore();
    return score >= quiz.passing_criteria.minimum_score;
  };

  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  if (showResults) {
    return (
      <Container maxWidth="md">
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          sx={{ mb: 3 }}
        >
          <Link
            component="button"
            variant="body1"
            onClick={() => navigate("/")}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="small" />
            Home
          </Link>
          <Typography color="text.primary">
            {quiz.quiz_type === "prerequisite"
              ? "Prerequisite Quiz"
              : "Module Quiz"}
          </Typography>
        </Breadcrumbs>

        <Paper elevation={0} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" gutterBottom>
            Quiz Results
          </Typography>
          <Typography variant="h5" gutterBottom>
            Score: {calculateScore().toFixed(1)}%
          </Typography>
          <Alert severity={isPassing() ? "success" : "error"} sx={{ mb: 3 }}>
            {isPassing()
              ? "Congratulations! You passed the quiz."
              : "You did not pass the quiz. Please try again."}
          </Alert>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate(-1)}
            >
              Back to Topic
            </Button>
            {!isPassing() && (
              <Button
                variant="outlined"
                color="primary"
                startIcon={<RefreshIcon />}
                onClick={fetchQuiz}
              >
                Try Again
              </Button>
            )}
          </Stack>
        </Paper>
      </Container>
    );
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Container maxWidth={false} sx={{ width: "100%", px: 0 }}>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          sx={{ mb: 3, px: 2 }}
        >
          <Link
            component="button"
            variant="body1"
            onClick={() => navigate("/")}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="small" />
            Home
          </Link>
          <Typography color="text.primary">
            {quiz.quiz_type === "prerequisite"
              ? "Prerequisite Quiz"
              : "Module Quiz"}
          </Typography>
        </Breadcrumbs>

        <Container maxWidth="md">
          <Paper elevation={0} sx={{ p: 4, borderRadius: 2 }}>
            <Box mb={3}>
              <Typography variant="h4" gutterBottom>
                {quiz.quiz_type === "prerequisite"
                  ? "Prerequisite Quiz"
                  : "Module Quiz"}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" paragraph>
                Question {currentQuestion + 1} of {quiz.questions.length}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{ height: 8, borderRadius: 4 }}
              />
            </Box>

            <Box mb={4}>
              <FormControl component="fieldset" fullWidth>
                <FormLabel
                  component="legend"
                  sx={{ mb: 2, fontSize: "1.1rem" }}
                >
                  {quiz.questions[currentQuestion].question}
                </FormLabel>
                <RadioGroup>
                  {quiz.questions[currentQuestion].options.map(
                    (option, index) => (
                      <FormControlLabel
                        key={index}
                        value={index}
                        control={
                          <Radio
                            checked={selectedAnswers[currentQuestion] === index}
                            onChange={() =>
                              handleAnswerSelect(currentQuestion, index)
                            }
                          />
                        }
                        label={option}
                        sx={{
                          mb: 1,
                          p: 1,
                          borderRadius: 1,
                          "&:hover": {
                            backgroundColor: "action.hover",
                          },
                        }}
                      />
                    )
                  )}
                </RadioGroup>
              </FormControl>
            </Box>

            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                onClick={() => setCurrentQuestion(currentQuestion - 1)}
                disabled={currentQuestion === 0}
              >
                Previous
              </Button>
              {currentQuestion < quiz.questions.length - 1 ? (
                <Button
                  variant="contained"
                  onClick={() => setCurrentQuestion(currentQuestion + 1)}
                  disabled={selectedAnswers[currentQuestion] === -1}
                >
                  Next
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<CheckCircleIcon />}
                  onClick={handleSubmit}
                  disabled={selectedAnswers.includes(-1)}
                >
                  Submit Quiz
                </Button>
              )}
            </Stack>
          </Paper>
        </Container>
      </Container>
    </Box>
  );
};

export default Quiz;
