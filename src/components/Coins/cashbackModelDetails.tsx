// components/CashBackWaveDialog.jsx
import React from "react";
import {
  Box,
  Dialog,
  Typography,
  IconButton,
  Button,
  TextField,
  Tabs,
  Tab,
  Avatar,
  Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export default function CashBackWaveDialogDetails({ open , onClose }) {
  const [tab, setTab] = React.useState(0);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs" PaperProps={{ sx: { borderRadius: 3, overflow: "visible" } }}>
      <Box sx={{ position: "relative", p: 0, backgroundColor: "#f9f9f9" }}>
        {/* Date Badge */}
        <Box sx={{ position: "absolute", top: 8, left: 8, backgroundColor: "#333", color: "#fff", px: 1.5, py: 0.25, borderRadius: 2, fontSize: 12 }}>
          4/23 - 4/30
        </Box>

        {/* Close Button */}
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 8, right: 8, color: "#000" }}
        >
          <CloseIcon />
        </IconButton>

        {/* Header */}
        <Box
          sx={{
            pt: 6,
            pb: 2,
            px: 2,
            textAlign: "center",
            background: "linear-gradient(to bottom, #000, #222)",
            color: "#fff",
            minHeight: 180,
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            Cash Back Wave
          </Typography>
        </Box>

        {/* Cashback Estimate Card */}
        <Paper elevation={2} sx={{ mx: 2, mt: -4, p: 0, borderRadius: 3,  overflow: "hidden", border: " 3px solid rgba(213, 160, 105, 1)"}} >
          <Box display="flex" alignItems="center" p={1.5}  gap={1} mb={1} sx={{
              background: "linear-gradient(135deg, #FED9AF 0%, #D59F69 55.94%)",
              display: "flex",
              alignItems: "center",
              gap: 1,
              mb: 1}}>
            <Avatar
              src="https://i.pravatar.cc/100"
              sx={{ width: 32, height: 32 }}
            />
            <Box >
                <Typography fontSize={12} sx={{ color: "#fff" }} fontWeight="bold">
                Estimated cash back received:
                </Typography>
                <Typography sx={{ color: "#fff" }} fontSize={16} fontWeight="bold">
                    USD0.00
                </Typography>
            </Box>
        </Box>
          {/* Referral Block */}
          <Box px={3} py={2}>
            <Typography fontWeight="bold" textAlign={"center"} fontSize={14}>
                Invite friends to recharge and <b style={{ color: "#f7931e" }}>get up to 3% cash back</b> on their Coin purchases for 7 days
            </Typography>

            {/* Code Box */}
            <Box
                sx={{
                    mt: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    px: 1,
                    py: 0.5,
                    border: "1px solid #ccc",
                    borderRadius: 7,
                    bgcolor: "#f4f4f4",
                    }}>
                <Typography fontSize={12} fontWeight="bold">483CLXVV</Typography>
                    <IconButton size="small">
                        <ContentCopyIcon fontSize="small" />
                    </IconButton>
            </Box>

            <Button
                variant="contained"
                fullWidth
                sx={{ mt: 2, backgroundColor: "#f7931e", textTransform: "none", borderRadius: 5 }}>
                Share invitation link
            </Button>
          </Box>
        </Paper>

        {/* Rewards Section */}
        <Box sx={{ p: 2 }}>
          {/* Cashback */}
          <Typography fontWeight="bold" mb={1}>
            Get rewards when you recharge
          </Typography>

          <Paper sx={{ p: 2, mb: 2, borderRadius: 2 }}>
            <Typography fontSize={14} fontWeight="bold">
              Get cash back when you recharge
            </Typography>
            <Typography fontSize={14} mt={1}>
              <b style={{ color: "#f7931e" }}>5%</b> - Up to USD250 back on 1 order.
            </Typography>
          </Paper>

          {/* Gift Unlock */}
          <Paper sx={{ p: 2, mb: 2, borderRadius: 2 }}>
            <Typography fontSize={14} fontWeight="bold">
              Unlock special Gifts
            </Typography>
            <Box display="flex" gap={2} mt={1}>
              <img
                src="https://www.tiktok.com/static/image.png" // Replace with actual image
                alt="Gift"
                style={{ width: 64, height: 64 }}
              />
              <Box>
                <Typography fontSize={14} fontWeight="bold">
                  Sage's Slash 🔵 399
                </Typography>
                <Typography fontSize={12}>
                  Sage could turn a single Coin into many with remarkable ease...
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>

        {/* Tabs */}
        <Box sx={{ borderTop: "1px solid #ccc" }}>
          <Tabs value={tab} onChange={(_, v) => setTab(v)} variant="fullWidth">
            <Tab label="How it works" />
            <Tab label="Rules" />
          </Tabs>
          <Box sx={{ p: 2 }}>
            {tab === 0 ? (
              <Typography fontSize={14}>
                • If your eligible friends have never recharged on seezitt.com...
              </Typography>
            ) : (
              <Typography fontSize={14}>
                • To grant you 7 days of cash back, your eligible friends must complete...
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
}
