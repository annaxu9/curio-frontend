import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Paper,
  Box,
  CircularProgress,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Breadcrumbs,
  Link,
} from "@mui/material";
import {
  Home as HomeIcon,
  NavigateNext as NavigateNextIcon,
  CheckCircle as CheckCircleIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import api, { Topic, Module } from "../services/api";

const ModuleContent: React.FC = () => {
  const { topicId, moduleId } = useParams<{
    topicId: string;
    moduleId: string;
  }>();
  const [topic, setTopic] = useState<Topic | null>(null);
  const [module, setModule] = useState<Module | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!topicId || !moduleId) return;

      try {
        const topicData = await api.getTopic(topicId);
        setTopic(topicData);
        const moduleData = topicData.modules.find(
          (m) => m.module_id === moduleId
        );
        if (moduleData) {
          setModule(moduleData);
        } else {
          setError("Module not found");
        }
        setLoading(false);
      } catch (err) {
        setError("Failed to load module");
        setLoading(false);
      }
    };

    fetchData();
  }, [topicId, moduleId]);

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

  if (error || !topic || !module) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <Typography color="error">{error || "Module not found"}</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
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
        <Link
          component="button"
          variant="body1"
          onClick={() => navigate(`/topics/${topicId}`)}
        >
          {topic.title}
        </Link>
        <Typography color="text.primary">{module.title}</Typography>
      </Breadcrumbs>

      <Paper elevation={0} sx={{ p: 4, mb: 4, borderRadius: 2 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(`/topics/${topicId}`)}
            sx={{ mr: 2 }}
          >
            Back to Topic
          </Button>
          <Typography variant="h4" component="h1">
            {module.title}
          </Typography>
        </Box>

        <Typography variant="body1" paragraph>
          {module.description}
        </Typography>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          Learning Objectives
        </Typography>
        <List>
          {module.content.introduction.learning_objectives.map(
            (objective, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <CheckCircleIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary={objective} />
              </ListItem>
            )
          )}
        </List>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          Content
        </Typography>
        {module.content.sections.map((section) => (
          <Box key={section.section_id} mb={4}>
            <Typography variant="h6" gutterBottom>
              {section.title}
            </Typography>
            <Typography variant="body1">{section.content}</Typography>
          </Box>
        ))}

        <Box mt={4}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => {
              if (module.quiz_id) {
                navigate(`/quiz/${module.quiz_id}`);
              }
            }}
          >
            Take Module Quiz
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ModuleContent;
