import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CircularProgress,
  Box,
  Chip,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  School as SchoolIcon,
  Timer as TimerIcon,
  ArrowForward as ArrowForwardIcon,
} from "@mui/icons-material";
import api, { Topic } from "../services/api";

const TopicList: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const data = await api.getTopics();
        setTopics(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load topics");
        setLoading(false);
      }
    };

    fetchTopics();
  }, []);

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

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Available Topics
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Explore our comprehensive learning materials and start your journey
          today
        </Typography>
      </Box>
      <Grid container spacing={4}>
        {topics.map((topic) => (
          <Grid item xs={12} sm={6} md={4} key={topic.topic_id}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                  {topic.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {topic.description}
                </Typography>
                <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                  <Chip
                    icon={<SchoolIcon />}
                    label={`${topic.modules.length} modules`}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                  <Chip
                    icon={<TimerIcon />}
                    label="Self-paced"
                    size="small"
                    color="secondary"
                    variant="outlined"
                  />
                </Stack>
              </CardContent>
              <CardActions sx={{ p: 2, pt: 0 }}>
                <Button
                  size="medium"
                  color="primary"
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => navigate(`/topics/${topic.topic_id}`)}
                  fullWidth
                >
                  Start Learning
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TopicList;
