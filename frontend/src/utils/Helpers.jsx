
const uid = () => "c" + Math.random().toString(36).slice(2, 9);

import PendingActionsIcon from '@mui/icons-material/PendingActions';
import SyncIcon from '@mui/icons-material/Sync';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Chip } from '@mui/material';

const statusChip = (status) => {
  const map = {
    "Pending":     { color: "primary",  icon: <PendingActionsIcon sx={{ fontSize: 14 }} /> },
    "In Progress": { color: "warning",  icon: <SyncIcon sx={{ fontSize: 14 }} /> },
    "Resolved":    { color: "success",  icon: <CheckCircleIcon sx={{ fontSize: 14 }} /> },
  };
  const cfg = map[status] || map["Pending"];
  return (
    <Chip
      label={status}
      color={cfg.color}
      icon={cfg.icon}
      size="small"
      variant="filled"
      sx={{ fontWeight: 600 }}
    />
  );
}
export default statusChip;
export { uid };