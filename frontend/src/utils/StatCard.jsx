import { Box, Typography, Card, CardContent } from '@mui/material';

function StatCard({ label, value, icon, color, sub }) {
  return (
    <Card sx={{ position: 'relative', overflow: 'hidden', height: '100%',width: '100%', borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', transition: '0.3s', '&:hover':{transform:'translateY(-5px)', boxShadow:'0 8px 30px rgba(0,0,0,0.12)'} }}>
      {/* Coloured top accent bar */}
      <Box sx={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: 6, background: color,
      }} />

      <CardContent sx={{ textAlign: 'center' }}>
        <Typography
          variant="caption"
          color="text.secondary"
          fontWeight={700}
          sx={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}
        >
          {label}
        </Typography>

        <Typography variant="h4" sx={{ my: 0.5, color: 'text.primary', fontWeight: 700 }}>
          {value ?? 0}
        </Typography>

        <Typography variant="caption" color="text.secondary">{sub}</Typography>

        {/* Large faded icon in background */}
        <Box sx={{
          position: 'absolute', right: 25, top: '50%',
          transform: 'translateY(-50%)',
          opacity: 0.08, fontSize: 50, lineHeight: 1,
          userSelect: 'none', pointerEvents: 'none',
        }}>
          {icon}
        </Box>
      </CardContent>
    </Card>
  );
}

export default StatCard;