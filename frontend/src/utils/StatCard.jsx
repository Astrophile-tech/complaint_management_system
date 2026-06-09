import {Box, Typography, Card, CardContent} from '@mui/material'



function StatCard({ label, value, icon, color, sub }) {
  return (
    <Card sx={{ position: "relative", overflow: "hidden" }}>
      <Box
        sx={{
          position: "absolute", top: 0, left: 0, right: 0, height: 4,
          background: color,
        }}
      />
      <CardContent sx={{ pt: 2.5 }}>
        <Typography variant="caption" color="text.secondary" fontWeight={700}
          sx={{ textTransform: "uppercase", letterSpacing: "0.5px" }}>
          {label}
        </Typography>
        <Typography variant="h4" sx={{ my: 0.5, color: "text.primary" }}>{value}</Typography>
        <Typography variant="caption" color="text.secondary">{sub}</Typography>
        <Box sx={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)",
          opacity: 0.1, fontSize: 40 }}>
          {icon}
        </Box>
      </CardContent>
    </Card>
  );
}

export default StatCard;