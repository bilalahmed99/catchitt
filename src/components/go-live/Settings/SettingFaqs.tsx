import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Divider
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

interface FAQsProps {
  onBack: () => void;
}

const FAQs: React.FC<FAQsProps> = ({ onBack }) => {
  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', px: 2, py: 2 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <IconButton size="small" aria-label="back" onClick={onBack}>
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center', ml: -4 }}>
          FAQs
        </Typography>
      </Box>

      <Divider />

      {/* Question 1 */}
      <Box mt={2}>
        <Typography variant="subtitle1" fontWeight="bold">
          What can moderators do during my LIVE?
        </Typography>
        <Typography variant="body2" mt={0.5}>
          Moderators can manage your comment settings, your muted and blocked account lists, and more.
        </Typography>
      </Box>

      {/* Question 2 */}
      <Box mt={3}>
        <Typography variant="subtitle1" fontWeight="bold">
          How do I add moderators?
        </Typography>
        <Typography variant="body2" mt={0.5}>
          • Before LIVE: GO to Settings &gt; Moderators &gt; Add moderators<br />
          • During LIVE: Go to Admin settings &gt; Moderators &gt; Add moderators<br />
          • During LIVE: Tap a viewer’s username &gt; Manage &gt; Add moderators
        </Typography>
      </Box>

      {/* Question 3 */}
      <Box mt={3}>
        <Typography variant="subtitle1" fontWeight="bold">
          Can I manage access for each moderator?
        </Typography>
        <Typography variant="body2" mt={0.5}>
          Yes, you can either add or remove access for each moderator. Each moderator needs to have at least one fundamental or advanced access.
        </Typography>
      </Box>
    </Box>
  );
};

export default FAQs;
