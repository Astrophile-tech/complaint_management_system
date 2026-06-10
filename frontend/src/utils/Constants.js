const DRAWER_W = 230;

const CATEGORIES = [
  "Classroom","Laboratory","Hostel","Library",
  "Internet/Wi-Fi","Electrical","Water Supply","Cleanliness","Other",
];

const STATUS_LIST = ["Pending", "In Progress", "Resolved"];

const CAT_ICONS = {
  Classroom:"🏫", Laboratory:"🔬", Hostel:"🏠", Library:"📚",
  "Internet/Wi-Fi":"📶", Electrical:"⚡", "Water Supply":"💧", Cleanliness:"🧹", Other:"📋",
};

const PIE_COLORS = ["#3B82F6", "#F59E0B", "#10B981"];
const BAR_COLORS = ["#3B82F6","#F59E0B","#10B981","#EF4444","#8B5CF6","#EC4899","#14B8A6","#F97316","#64748B"];

// ─── Seed Data ─────────────────────────────────────────────────────────────────
const INIT_USERS = [
  { id:"u1", name:"Arjun Menon",  email:"arjun@college.edu",  password:"pass123",  role:"student" },
  { id:"u2", name:"Priya Nair",   email:"priya@college.edu",  password:"pass123",  role:"student" },
  { id:"u3", name:"Admin Kumar",  email:"admin@college.edu",  password:"admin123", role:"admin"   },
];

const today = () => new Date().toISOString().split("T")[0];

const INIT_COMPLAINTS = [
  { id:"c1", title:"Projector not working in Room 204", category:"Classroom",    description:"The projector has been faulty for 3 days.", location:"Block A, Room 204",   status:"Pending",     createdBy:"u1", createdDate:"2025-06-01", resolution:"" },
  { id:"c2", title:"Wi-Fi dead in Library",             category:"Internet/Wi-Fi",description:"No connectivity on 2nd floor.",          location:"Library, 2nd Floor",   status:"In Progress", createdBy:"u1", createdDate:"2025-06-03", resolution:"" },
  { id:"c3", title:"Water leakage in Hostel Block C",   category:"Hostel",        description:"Pipe leaking near Room 12.",              location:"Hostel Block C",       status:"Resolved",    createdBy:"u2", createdDate:"2025-05-28", resolution:"Plumber fixed the pipe on June 4." },
  { id:"c4", title:"Lab computers very slow",           category:"Laboratory",    description:"CS lab PCs take 10+ min to boot.",        location:"CS Lab, Ground Floor", status:"Pending",     createdBy:"u2", createdDate:"2025-06-05", resolution:"" },
  { id:"c5", title:"Lights flickering in Corridor",     category:"Electrical",    description:"Corridor lights flicker after 6 PM.",     location:"Block B Corridor",     status:"In Progress", createdBy:"u1", createdDate:"2025-06-06", resolution:"" },
  { id:"c6", title:"Dustbins overflowing near canteen", category:"Cleanliness",   description:"Bins not emptied for 2 days.",            location:"Canteen Area",         status:"Resolved",    createdBy:"u2", createdDate:"2025-05-30", resolution:"Housekeeping cleared on June 1." },
];

export { DRAWER_W, CATEGORIES, CAT_ICONS, PIE_COLORS, BAR_COLORS, STATUS_LIST, INIT_USERS, INIT_COMPLAINTS, today };