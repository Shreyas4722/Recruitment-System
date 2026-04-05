const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// ─── IN-MEMORY DATABASE ───────────────────────────────────────────────────────
let db = {
  jobs: [
    {
      id: uuidv4(),
      title: "Senior Full-Stack Engineer",
      department: "Engineering",
      location: "Remote / New York",
      type: "Full-time",
      status: "active",
      salary: "$120,000 - $160,000",
      description: "We are looking for a Senior Full-Stack Engineer to join our growing team. You will architect and build scalable web applications using React, Node.js, and cloud technologies.",
      requirements: ["5+ years experience", "React & Node.js", "PostgreSQL", "AWS/GCP", "System Design"],
      postedDate: new Date(Date.now() - 7 * 86400000).toISOString(),
      applicants: 0,
      views: 142,
      closingDate: new Date(Date.now() + 30 * 86400000).toISOString()
    },
    {
      id: uuidv4(),
      title: "Product Manager",
      department: "Product",
      location: "San Francisco, CA",
      type: "Full-time",
      status: "active",
      salary: "$110,000 - $145,000",
      description: "Shape the future of our product as a Product Manager. You'll work closely with engineering, design, and business teams to deliver impactful features.",
      requirements: ["3+ years PM experience", "Agile/Scrum", "Data Analysis", "Roadmap planning", "Stakeholder management"],
      postedDate: new Date(Date.now() - 3 * 86400000).toISOString(),
      applicants: 0,
      views: 89,
      closingDate: new Date(Date.now() + 45 * 86400000).toISOString()
    },
    {
      id: uuidv4(),
      title: "UX/UI Designer",
      department: "Design",
      location: "Hybrid - Austin, TX",
      type: "Full-time",
      status: "active",
      salary: "$90,000 - $120,000",
      description: "Create beautiful and intuitive user experiences. You'll lead design projects from concept to delivery, collaborating with cross-functional teams.",
      requirements: ["Figma expert", "3+ years UX experience", "Design systems", "User research", "Prototyping"],
      postedDate: new Date(Date.now() - 1 * 86400000).toISOString(),
      applicants: 0,
      views: 67,
      closingDate: new Date(Date.now() + 21 * 86400000).toISOString()
    },
    {
      id: uuidv4(),
      title: "Data Scientist",
      department: "Analytics",
      location: "Remote",
      type: "Full-time",
      status: "paused",
      salary: "$105,000 - $135,000",
      description: "Drive data-driven decisions across the company. You'll build ML models, analyze large datasets, and present insights to leadership.",
      requirements: ["Python/R", "Machine Learning", "SQL", "TensorFlow/PyTorch", "Statistics"],
      postedDate: new Date(Date.now() - 14 * 86400000).toISOString(),
      applicants: 0,
      views: 203,
      closingDate: new Date(Date.now() + 15 * 86400000).toISOString()
    }
  ],
  candidates: [
    {
      id: uuidv4(),
      name: "Alexandra Chen",
      email: "alex.chen@email.com",
      phone: "+1 (555) 234-5678",
      jobId: null,
      jobTitle: "Senior Full-Stack Engineer",
      status: "interview",
      stage: "Technical Interview",
      score: 88,
      appliedDate: new Date(Date.now() - 5 * 86400000).toISOString(),
      resumeUrl: "#",
      skills: ["React", "Node.js", "PostgreSQL", "AWS"],
      experience: "6 years",
      notes: "Excellent technical background. Strong problem-solving skills demonstrated in screening call.",
      avatar: "AC",
      avatarColor: "#6366f1"
    },
    {
      id: uuidv4(),
      name: "Marcus Johnson",
      email: "m.johnson@email.com",
      phone: "+1 (555) 345-6789",
      jobId: null,
      jobTitle: "Product Manager",
      status: "screening",
      stage: "Resume Review",
      score: 74,
      appliedDate: new Date(Date.now() - 2 * 86400000).toISOString(),
      resumeUrl: "#",
      skills: ["Agile", "Roadmapping", "Analytics", "Stakeholder mgmt"],
      experience: "4 years",
      notes: "Strong background in B2B SaaS products. Need to evaluate technical understanding.",
      avatar: "MJ",
      avatarColor: "#f59e0b"
    },
    {
      id: uuidv4(),
      name: "Priya Patel",
      email: "priya.patel@email.com",
      phone: "+1 (555) 456-7890",
      jobId: null,
      jobTitle: "UX/UI Designer",
      status: "offer",
      stage: "Offer Extended",
      score: 95,
      appliedDate: new Date(Date.now() - 10 * 86400000).toISOString(),
      resumeUrl: "#",
      skills: ["Figma", "User Research", "Design Systems", "Prototyping"],
      experience: "5 years",
      notes: "Outstanding portfolio. Culture fit excellent. Offer extended at $115,000.",
      avatar: "PP",
      avatarColor: "#10b981"
    },
    {
      id: uuidv4(),
      name: "David Kim",
      email: "d.kim@email.com",
      phone: "+1 (555) 567-8901",
      jobId: null,
      jobTitle: "Senior Full-Stack Engineer",
      status: "applied",
      stage: "Application Received",
      score: 65,
      appliedDate: new Date(Date.now() - 1 * 86400000).toISOString(),
      resumeUrl: "#",
      skills: ["Vue.js", "Python", "MySQL", "Docker"],
      experience: "3 years",
      notes: "",
      avatar: "DK",
      avatarColor: "#ec4899"
    },
    {
      id: uuidv4(),
      name: "Sarah Williams",
      email: "s.williams@email.com",
      phone: "+1 (555) 678-9012",
      jobId: null,
      jobTitle: "Data Scientist",
      status: "rejected",
      stage: "Not Selected",
      score: 52,
      appliedDate: new Date(Date.now() - 8 * 86400000).toISOString(),
      resumeUrl: "#",
      skills: ["Python", "R", "SQL", "Tableau"],
      experience: "2 years",
      notes: "Lacks required ML experience. May reapply after gaining more expertise.",
      avatar: "SW",
      avatarColor: "#64748b"
    }
  ],
  interviews: [
    {
      id: uuidv4(),
      candidateId: null,
      candidateName: "Alexandra Chen",
      jobTitle: "Senior Full-Stack Engineer",
      type: "Technical Interview",
      date: new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0],
      time: "10:00",
      duration: 90,
      interviewers: ["James Liu", "Rachel Torres"],
      meetingLink: "https://meet.google.com/abc-defg-hij",
      status: "scheduled",
      notes: "Focus on system design and React architecture",
      location: "Video Call"
    },
    {
      id: uuidv4(),
      candidateId: null,
      candidateName: "Marcus Johnson",
      jobTitle: "Product Manager",
      type: "Phone Screening",
      date: new Date(Date.now() + 1 * 86400000).toISOString().split('T')[0],
      time: "14:30",
      duration: 45,
      interviewers: ["Sarah Kim"],
      meetingLink: "https://zoom.us/j/123456789",
      status: "scheduled",
      notes: "Initial screening - verify experience and motivation",
      location: "Phone"
    },
    {
      id: uuidv4(),
      candidateId: null,
      candidateName: "Priya Patel",
      jobTitle: "UX/UI Designer",
      type: "Portfolio Review",
      date: new Date(Date.now() - 3 * 86400000).toISOString().split('T')[0],
      time: "11:00",
      duration: 60,
      interviewers: ["Tom Anderson", "Lisa Park"],
      meetingLink: "https://meet.google.com/xyz-uvwx-yz",
      status: "completed",
      notes: "Excellent portfolio presentation. Recommend for offer.",
      location: "Video Call"
    }
  ],
  activities: [
    { id: uuidv4(), type: "application", message: "Priya Patel applied for UX/UI Designer", time: new Date(Date.now() - 10 * 86400000).toISOString(), icon: "📋" },
    { id: uuidv4(), type: "interview", message: "Interview scheduled with Alexandra Chen", time: new Date(Date.now() - 5 * 86400000).toISOString(), icon: "📅" },
    { id: uuidv4(), type: "offer", message: "Offer extended to Priya Patel", time: new Date(Date.now() - 1 * 86400000).toISOString(), icon: "🎉" },
    { id: uuidv4(), type: "job", message: "New job posted: UX/UI Designer", time: new Date(Date.now() - 1 * 86400000).toISOString(), icon: "💼" },
    { id: uuidv4(), type: "application", message: "David Kim applied for Full-Stack Engineer", time: new Date(Date.now() - 86400000).toISOString(), icon: "📋" }
  ]
};

// Auto-link candidates to jobs
db.candidates.forEach(c => {
  const job = db.jobs.find(j => j.title === c.jobTitle);
  if (job) { c.jobId = job.id; job.applicants++; }
});
db.interviews.forEach(i => {
  const candidate = db.candidates.find(c => c.name === i.candidateName);
  if (candidate) i.candidateId = candidate.id;
});

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function addActivity(type, message, icon) {
  db.activities.unshift({ id: uuidv4(), type, message, time: new Date().toISOString(), icon });
  if (db.activities.length > 50) db.activities = db.activities.slice(0, 50);
}

// ─── DASHBOARD ───────────────────────────────────────────────────────────────
app.get('/api/dashboard', (req, res) => {
  const stats = {
    totalJobs: db.jobs.filter(j => j.status === 'active').length,
    totalCandidates: db.candidates.length,
    scheduledInterviews: db.interviews.filter(i => i.status === 'scheduled').length,
    offersExtended: db.candidates.filter(c => c.status === 'offer').length,
    conversionRate: Math.round((db.candidates.filter(c => c.status === 'offer' || c.status === 'hired').length / Math.max(db.candidates.length, 1)) * 100),
    avgTimeToHire: 18,
    pipeline: {
      applied: db.candidates.filter(c => c.status === 'applied').length,
      screening: db.candidates.filter(c => c.status === 'screening').length,
      interview: db.candidates.filter(c => c.status === 'interview').length,
      offer: db.candidates.filter(c => c.status === 'offer').length,
      hired: db.candidates.filter(c => c.status === 'hired').length,
      rejected: db.candidates.filter(c => c.status === 'rejected').length
    },
    recentActivities: db.activities.slice(0, 8),
    upcomingInterviews: db.interviews
      .filter(i => i.status === 'scheduled')
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 3),
    topCandidates: db.candidates
      .filter(c => c.score >= 70)
      .sort((a, b) => b.score - a.score)
      .slice(0, 4)
  };
  res.json({ success: true, data: stats });
});

// ─── JOBS ─────────────────────────────────────────────────────────────────────
app.get('/api/jobs', (req, res) => {
  const { status, department, search } = req.query;
  let jobs = [...db.jobs];
  if (status) jobs = jobs.filter(j => j.status === status);
  if (department) jobs = jobs.filter(j => j.department === department);
  if (search) jobs = jobs.filter(j =>
    j.title.toLowerCase().includes(search.toLowerCase()) ||
    j.department.toLowerCase().includes(search.toLowerCase())
  );
  res.json({ success: true, data: jobs, total: jobs.length });
});

app.get('/api/jobs/:id', (req, res) => {
  const job = db.jobs.find(j => j.id === req.params.id);
  if (!job) return res.status(404).json({ success: false, message: 'Job not found' });
  const applicants = db.candidates.filter(c => c.jobId === job.id);
  res.json({ success: true, data: { ...job, applicantsList: applicants } });
});

app.post('/api/jobs', (req, res) => {
  const { title, department, location, type, salary, description, requirements, closingDate } = req.body;
  if (!title || !department) return res.status(400).json({ success: false, message: 'Title and department are required' });
  const job = {
    id: uuidv4(),
    title, department, location: location || 'Remote',
    type: type || 'Full-time',
    status: 'active',
    salary: salary || 'Competitive',
    description: description || '',
    requirements: requirements || [],
    postedDate: new Date().toISOString(),
    applicants: 0,
    views: 0,
    closingDate: closingDate || new Date(Date.now() + 30 * 86400000).toISOString()
  };
  db.jobs.push(job);
  addActivity('job', `New job posted: ${title}`, '💼');
  res.status(201).json({ success: true, data: job, message: 'Job posted successfully' });
});

app.put('/api/jobs/:id', (req, res) => {
  const idx = db.jobs.findIndex(j => j.id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Job not found' });
  db.jobs[idx] = { ...db.jobs[idx], ...req.body, id: req.params.id };
  res.json({ success: true, data: db.jobs[idx], message: 'Job updated successfully' });
});

app.delete('/api/jobs/:id', (req, res) => {
  const idx = db.jobs.findIndex(j => j.id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Job not found' });
  const job = db.jobs.splice(idx, 1)[0];
  res.json({ success: true, message: `Job "${job.title}" deleted successfully` });
});

app.patch('/api/jobs/:id/status', (req, res) => {
  const job = db.jobs.find(j => j.id === req.params.id);
  if (!job) return res.status(404).json({ success: false, message: 'Job not found' });
  job.status = req.body.status;
  res.json({ success: true, data: job, message: 'Job status updated' });
});

// ─── CANDIDATES ───────────────────────────────────────────────────────────────
app.get('/api/candidates', (req, res) => {
  const { status, jobId, search } = req.query;
  let candidates = [...db.candidates];
  if (status) candidates = candidates.filter(c => c.status === status);
  if (jobId) candidates = candidates.filter(c => c.jobId === jobId);
  if (search) candidates = candidates.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.jobTitle.toLowerCase().includes(search.toLowerCase())
  );
  res.json({ success: true, data: candidates, total: candidates.length });
});

app.get('/api/candidates/:id', (req, res) => {
  const candidate = db.candidates.find(c => c.id === req.params.id);
  if (!candidate) return res.status(404).json({ success: false, message: 'Candidate not found' });
  const interviews = db.interviews.filter(i => i.candidateId === candidate.id);
  res.json({ success: true, data: { ...candidate, interviews } });
});

app.post('/api/candidates', (req, res) => {
  const { name, email, phone, jobId, jobTitle, skills, experience } = req.body;
  if (!name || !email) return res.status(400).json({ success: false, message: 'Name and email are required' });
  const colors = ['#6366f1', '#f59e0b', '#10b981', '#ec4899', '#3b82f6', '#8b5cf6'];
  const candidate = {
    id: uuidv4(),
    name, email,
    phone: phone || '',
    jobId: jobId || null,
    jobTitle: jobTitle || '',
    status: 'applied',
    stage: 'Application Received',
    score: Math.floor(Math.random() * 30) + 60,
    appliedDate: new Date().toISOString(),
    resumeUrl: '#',
    skills: skills || [],
    experience: experience || '',
    notes: '',
    avatar: name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
    avatarColor: colors[Math.floor(Math.random() * colors.length)]
  };
  if (jobId) {
    const job = db.jobs.find(j => j.id === jobId);
    if (job) job.applicants++;
  }
  db.candidates.push(candidate);
  addActivity('application', `${name} applied for ${jobTitle || 'a position'}`, '📋');
  res.status(201).json({ success: true, data: candidate, message: 'Candidate added successfully' });
});

app.put('/api/candidates/:id', (req, res) => {
  const idx = db.candidates.findIndex(c => c.id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Candidate not found' });
  db.candidates[idx] = { ...db.candidates[idx], ...req.body, id: req.params.id };
  res.json({ success: true, data: db.candidates[idx], message: 'Candidate updated successfully' });
});

app.patch('/api/candidates/:id/status', (req, res) => {
  const candidate = db.candidates.find(c => c.id === req.params.id);
  if (!candidate) return res.status(404).json({ success: false, message: 'Candidate not found' });
  const stageMap = {
    applied: 'Application Received',
    screening: 'Resume Review',
    interview: 'Technical Interview',
    offer: 'Offer Extended',
    hired: 'Hired',
    rejected: 'Not Selected'
  };
  candidate.status = req.body.status;
  candidate.stage = stageMap[req.body.status] || candidate.stage;
  addActivity('status', `${candidate.name} moved to ${candidate.stage}`, '🔄');
  res.json({ success: true, data: candidate, message: 'Status updated' });
});

app.delete('/api/candidates/:id', (req, res) => {
  const idx = db.candidates.findIndex(c => c.id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Candidate not found' });
  const candidate = db.candidates.splice(idx, 1)[0];
  const job = db.jobs.find(j => j.id === candidate.jobId);
  if (job && job.applicants > 0) job.applicants--;
  res.json({ success: true, message: `Candidate "${candidate.name}" removed` });
});

// ─── INTERVIEWS ───────────────────────────────────────────────────────────────
app.get('/api/interviews', (req, res) => {
  const { status, date } = req.query;
  let interviews = [...db.interviews];
  if (status) interviews = interviews.filter(i => i.status === status);
  if (date) interviews = interviews.filter(i => i.date === date);
  interviews.sort((a, b) => new Date(a.date + 'T' + a.time) - new Date(b.date + 'T' + b.time));
  res.json({ success: true, data: interviews, total: interviews.length });
});

app.post('/api/interviews', (req, res) => {
  const { candidateId, candidateName, jobTitle, type, date, time, duration, interviewers, meetingLink, notes, location } = req.body;
  if (!candidateName || !date || !time) return res.status(400).json({ success: false, message: 'Candidate, date, and time are required' });
  const interview = {
    id: uuidv4(),
    candidateId: candidateId || null,
    candidateName, jobTitle: jobTitle || '',
    type: type || 'Interview',
    date, time,
    duration: duration || 60,
    interviewers: interviewers || [],
    meetingLink: meetingLink || '',
    status: 'scheduled',
    notes: notes || '',
    location: location || 'Video Call'
  };
  db.interviews.push(interview);
  addActivity('interview', `Interview scheduled with ${candidateName}`, '📅');
  if (candidateId) {
    const candidate = db.candidates.find(c => c.id === candidateId);
    if (candidate && candidate.status === 'screening') {
      candidate.status = 'interview';
      candidate.stage = 'Technical Interview';
    }
  }
  res.status(201).json({ success: true, data: interview, message: 'Interview scheduled successfully' });
});

app.put('/api/interviews/:id', (req, res) => {
  const idx = db.interviews.findIndex(i => i.id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Interview not found' });
  db.interviews[idx] = { ...db.interviews[idx], ...req.body, id: req.params.id };
  res.json({ success: true, data: db.interviews[idx], message: 'Interview updated' });
});

app.patch('/api/interviews/:id/status', (req, res) => {
  const interview = db.interviews.find(i => i.id === req.params.id);
  if (!interview) return res.status(404).json({ success: false, message: 'Interview not found' });
  interview.status = req.body.status;
  res.json({ success: true, data: interview, message: 'Interview status updated' });
});

app.delete('/api/interviews/:id', (req, res) => {
  const idx = db.interviews.findIndex(i => i.id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Interview not found' });
  db.interviews.splice(idx, 1);
  res.json({ success: true, message: 'Interview cancelled' });
});

// ─── SCREENING / AI SCORE ─────────────────────────────────────────────────────
app.post('/api/screen', (req, res) => {
  const { candidateId, skills, experience, jobRequirements } = req.body;
  const matchedSkills = skills?.filter(s => jobRequirements?.some(r => r.toLowerCase().includes(s.toLowerCase()))) || [];
  const score = Math.min(100, Math.floor(
    (matchedSkills.length / Math.max(jobRequirements?.length || 1, 1)) * 60 +
    Math.min(parseInt(experience) || 0, 10) * 3 +
    Math.random() * 10
  ));
  const verdict = score >= 80 ? 'Highly Recommended' : score >= 65 ? 'Recommended' : score >= 50 ? 'Consider' : 'Not Recommended';
  const feedback = [
    score >= 70 ? '✅ Strong skills match' : '⚠️ Skills gap identified',
    parseInt(experience) >= 4 ? '✅ Sufficient experience' : '⚠️ Limited experience',
    matchedSkills.length > 0 ? `✅ Matched: ${matchedSkills.join(', ')}` : '❌ No direct skill match'
  ];
  if (candidateId) {
    const candidate = db.candidates.find(c => c.id === candidateId);
    if (candidate) { candidate.score = score; candidate.status = 'screening'; candidate.stage = 'Resume Review'; }
  }
  res.json({ success: true, data: { score, verdict, feedback, matchedSkills } });
});

// ─── ANALYTICS ────────────────────────────────────────────────────────────────
app.get('/api/analytics', (req, res) => {
  const byDept = db.jobs.reduce((acc, j) => {
    acc[j.department] = (acc[j.department] || 0) + j.applicants;
    return acc;
  }, {});
  const byStatus = Object.entries(
    db.candidates.reduce((acc, c) => { acc[c.status] = (acc[c.status] || 0) + 1; return acc; }, {})
  ).map(([name, value]) => ({ name, value }));

  const weekly = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000);
    const dayStr = d.toISOString().split('T')[0];
    weekly.push({
      day: d.toLocaleDateString('en', { weekday: 'short' }),
      applications: db.candidates.filter(c => c.appliedDate.split('T')[0] <= dayStr).length,
      interviews: db.interviews.filter(iv => iv.date <= dayStr).length
    });
  }

  res.json({
    success: true, data: {
      byDepartment: Object.entries(byDept).map(([name, value]) => ({ name, value })),
      byStatus,
      weeklyTrend: weekly,
      avgScore: Math.round(db.candidates.reduce((s, c) => s + c.score, 0) / Math.max(db.candidates.length, 1)),
      topSkills: ['React', 'Python', 'Node.js', 'Figma', 'SQL', 'AWS'].map(s => ({
        skill: s,
        count: db.candidates.filter(c => c.skills.includes(s)).length
      }))
    }
  });
});

// ─── SERVER ───────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 Recruitment API running at http://localhost:${PORT}`);
  console.log(`📊 Dashboard:   GET  /api/dashboard`);
  console.log(`💼 Jobs:        GET  /api/jobs`);
  console.log(`👥 Candidates:  GET  /api/candidates`);
  console.log(`📅 Interviews:  GET  /api/interviews`);
  console.log(`📈 Analytics:   GET  /api/analytics\n`);
});

module.exports = app;
