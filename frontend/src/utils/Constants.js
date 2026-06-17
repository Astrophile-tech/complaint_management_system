// ─── Layout ───────────────────────────────────────────────────────────────────
const DRAWER_W = 230;

// ─── Complaint categories ─────────────────────────────────────────────────────
const CATEGORIES = [
  'Classroom', 'Laboratory', 'Hostel', 'Library',
  'Internet/Wi-Fi', 'Electrical', 'Water Supply', 'Cleanliness', 'Other',
];

// ─── Status options ───────────────────────────────────────────────────────────
const STATUS_LIST = ['Pending', 'In Progress', 'Resolved'];

// ─── Category emoji icons ─────────────────────────────────────────────────────
const CAT_ICONS = {
  Classroom:       '🏫',
  Laboratory:      '🔬',
  Hostel:          '🏠',
  Library:         '📚',
  'Internet/Wi-Fi':'📶',
  Electrical:      '⚡',
  'Water Supply':  '💧',
  Cleanliness:     '🧹',
  Other:           '📋',
};

// ─── Chart colours ────────────────────────────────────────────────────────────
const PIE_COLORS = ['#3B82F6', '#F59E0B', '#10B981'];

const BAR_COLORS = [
  '#3B82F6', '#F59E0B', '#10B981', '#EF4444',
  '#8B5CF6', '#EC4899', '#14B8A6', '#F97316', '#64748B',
];

// ─── NOTE ─────────────────────────────────────────────────────────────────────
// INIT_USERS and INIT_COMPLAINTS have been removed.
// All data is now stored in MongoDB and fetched via the Express API.
// Admin credentials are seeded from ADMIN_INITIAL_PASSWORD in backend/.env
// on first server start and stored (hashed) in the adminconfigs collection.

export { DRAWER_W, CATEGORIES, CAT_ICONS, PIE_COLORS, BAR_COLORS, STATUS_LIST };