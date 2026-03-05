import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'Server is running', timestamp: new Date() });
});

// API Routes (Mock Data for now)
app.get('/api/user', (req, res) => {
    res.json({
        id: 1,
        name: 'Student',
        email: 'student@example.com',
        streak: 12,
        totalProblems: 120,
        accuracy: 87,
        weeklyTime: 420
    });
});

app.get('/api/tasks', (req, res) => {
    res.json([
        {
            id: 1,
            title: 'Two Sum Array',
            platform: 'LeetCode',
            difficulty: 'Medium',
            category: 'Arrays & Hashing',
            timeEstimate: 30,
            weakArea: true,
            description: 'Optimize your approach to find two numbers that add up to a target',
            url: 'https://leetcode.com/problems/two-sum/'
        },
        {
            id: 2,
            title: 'Tree Traversal Basics',
            platform: 'HackerRank',
            difficulty: 'Easy',
            category: 'Trees & Graphs',
            timeEstimate: 20,
            warmup: true,
            description: 'Build fundamentals in tree traversal techniques',
            url: 'https://www.hackerrank.com/challenges/tree-level-order-traversal/'
        },
        {
            id: 3,
            title: 'Dynamic Programming Challenge',
            platform: 'CodeChef',
            difficulty: 'Hard',
            category: 'Recursion & DP',
            timeEstimate: 60,
            strengthen: true,
            description: 'Challenge yourself with advanced dynamic programming problems',
            url: 'https://www.codechef.com/'
        }
    ]);
});

app.get('/api/progress', (req, res) => {
    res.json({
        streak: 12,
        weeklyTime: 420,
        tasksCompleted: 18,
        tasksTotal: 21,
        accuracy: 87,
        weeklyGoal: 300
    });
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password required' });
    }
    
    // Mock authentication
    res.json({
        success: true,
        token: 'mock_jwt_token_' + Date.now(),
        user: {
            id: 1,
            username: username,
            email: username + '@example.com'
        }
    });
});

app.post('/api/register', (req, res) => {
    const { username, email, password } = req.body;
    
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'All fields required' });
    }
    
    res.json({
        success: true,
        message: 'Registration successful',
        user: {
            id: Date.now(),
            username: username,
            email: email
        }
    });
});

app.post('/api/task-progress', (req, res) => {
    const { taskId, status } = req.body;
    
    res.json({
        success: true,
        message: `Task ${taskId} marked as ${status}`,
        timestamp: new Date()
    });
});

app.get('/api/platforms', (req, res) => {
    res.json([
        {
            name: 'LeetCode',
            icon: '💎',
            description: '1500+ DSA problems across difficulty levels',
            url: 'https://leetcode.com'
        },
        {
            name: 'HackerRank',
            icon: '🏆',
            description: 'Structured coding challenges with instant feedback',
            url: 'https://www.hackerrank.com'
        },
        {
            name: 'CodeChef',
            icon: '🍳',
            description: 'Competitive programming and contest problems',
            url: 'https://www.codechef.com'
        },
        {
            name: 'GeeksforGeeks',
            icon: '📚',
            description: 'Problems with detailed explanations',
            url: 'https://www.geeksforgeeks.org'
        },
        {
            name: 'InterviewBit',
            icon: '⚡',
            description: 'Interview preparation with curated problems',
            url: 'https://www.interviewbit.com'
        },
        {
            name: 'Codewars',
            icon: '🎯',
            description: 'Gamified coding challenges for skill building',
            url: 'https://www.codewars.com'
        }
    ]);
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 AI Placement Mentor Server running on http://localhost:${PORT}`);
    console.log(`📊 API Health: http://localhost:${PORT}/api/health`);
    console.log(`📚 Tasks: http://localhost:${PORT}/api/tasks`);
});
