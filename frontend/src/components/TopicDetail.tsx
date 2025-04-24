import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Box,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Chip,
  Stack,
  Breadcrumbs,
  Link,
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  School as SchoolIcon,
  Timer as TimerIcon,
  CheckCircle as CheckCircleIcon,
  Home as HomeIcon,
  NavigateNext as NavigateNextIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import api, { Topic, Module } from "../services/api";

const TopicDetail: React.FC = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const [topic, setTopic] = useState<Topic | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopic = async () => {
      if (!topicId) return;

      try {
        const data = await api.getTopic(topicId);
        setTopic(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load topic");
        setLoading(false);
      }
    };

    fetchTopic();
  }, [topicId]);

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

  if (error || !topic) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <Typography color="error">{error || "Topic not found"}</Typography>
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
        <Typography color="text.primary">{topic.title}</Typography>
      </Breadcrumbs>

      <Paper elevation={0} sx={{ p: 4, mb: 4, borderRadius: 2 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          {topic.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" paragraph>
          {topic.description}
        </Typography>
        <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
          <Chip
            icon={<SchoolIcon />}
            label={`${topic.modules.length} modules`}
            color="primary"
            variant="outlined"
          />
          <Chip
            icon={<TimerIcon />}
            label="Self-paced"
            color="secondary"
            variant="outlined"
          />
        </Stack>
        <Box display="flex" gap={2}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<SchoolIcon />}
            onClick={() => {
              /* Handle start learning */
            }}
          >
            Start Learning
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            startIcon={<CheckCircleIcon />}
            onClick={() => {
              /* Handle take quiz */
            }}
          >
            Take Prerequisite Quiz
          </Button>
        </Box>
      </Paper>

      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Course Modules
      </Typography>

      {topic.modules.map((module: Module, index: number) => (
        <Accordion
          key={module.module_id}
          sx={{
            mb: 2,
            borderRadius: "12px !important",
            "&:before": { display: "none" },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              backgroundColor: "background.paper",
              borderRadius: "12px",
              "&:hover": {
                backgroundColor: "action.hover",
              },
            }}
          >
            <Box display="flex" alignItems="center" width="100%">
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Module {index + 1}: {module.title}
              </Typography>
              <Box display="flex" alignItems="center" gap={2}>
                <Chip
                  icon={<TimerIcon />}
                  label={module.estimated_time}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 3 }}>
            <Typography variant="body1" paragraph>
              {module.description}
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
              Learning Objectives
            </Typography>
            <List dense>
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

            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
              Content
            </Typography>
            {module.content.sections.map((section) => (
              <Box key={section.section_id} mb={3}>
                <Typography variant="subtitle1" gutterBottom>
                  {section.title}
                </Typography>
                <Typography variant="body2">{section.content}</Typography>
              </Box>
            ))}

            <Box mt={3}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<SchoolIcon />}
                onClick={() => {
                  /* Handle start module */
                }}
              >
                Start Module
              </Button>
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
};

export default TopicDetail;
