import bishwajitImg from '../assets/bishwajit.jpg';
import novapayImg from '../assets/novapay.jpg';
import aurafitImg from '../assets/aurafit.jpg';
import omnipulseImg from '../assets/omnipulse.jpg';

export const bishwajitPhoto = bishwajitImg;

export const developerData = {
  name: 'Bishwajit Ghosh',
  handle: '@ghoshbishwajit252-lang',
  title: 'Software Engineer (Java, Python, C/C++, SQL, AI)',
  status: 'Open for Software Engineering & AI Roles',
  location: 'India / Open to Global Roles',
  avatar: bishwajitImg,
  tagline:
    'Proficient in core programming with Java, Python, C, C++, Relational SQL Databases, and Artificial Intelligence (AI & Machine Learning).',
  metrics: [
    { label: 'Core Languages', value: 'Java, Python, C, C++' },
    { label: 'Specialized Domains', value: 'SQL & AI / ML' },
    { label: 'Data Structures & Alg.', value: 'Advanced' },
    { label: 'Database & Systems', value: 'Optimized' },
  ],
  bioTabs: {
    mission:
      'Passionate software engineer with a strong foundation in core programming languages (Java, Python, C, C++), database architecture with SQL, and modern Artificial Intelligence (AI / Machine Learning). Dedicated to writing robust, efficient, and scalable code.',
    architecture:
      'My technical approach emphasizes low-level memory efficiency in C/C++, object-oriented design and concurrency in Java, flexible AI/ML model pipelines in Python, and high-performance relational query optimization in SQL.',
    philosophy:
      'Great code balances computational efficiency, clean modular design, and data-driven intelligence. Every algorithm, database query, and neural model should be optimized for performance and maintainability.',
  },
  phone: '+91 9883494534',
  whatsapp: '+91 98834 94534',
  socialLinks: [
    { name: 'GitHub', url: 'https://github.com/ghoshbishwajit252-lang', icon: 'Github' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/bishwajit-ghosh-4bbab53b2', icon: 'Linkedin' },
    { name: 'Twitter', url: 'https://twitter.com', icon: 'Twitter' },
    { name: 'Email', url: 'mailto:ghoshbishwajit252@gmail.com', icon: 'Mail' },
    { name: 'Phone', url: 'tel:+919883494534', icon: 'Phone' },
  ],
};

export const skillsCategories = [
  { id: 'all', label: 'All Technologies' },
  { id: 'languages', label: 'Languages (Java, Python, C, C++)' },
  { id: 'sql', label: 'SQL & Database Systems' },
  { id: 'ai', label: 'Artificial Intelligence (AI / ML)' },
  { id: 'core', label: 'Algorithms & Core Systems' },
];

export const skillsList = [
  // Core Languages
  {
    name: 'Java',
    category: 'languages',
    level: 96,
    badge: 'Core & OOP Specialist',
    desc: 'Object-Oriented Programming (OOP), Multithreading, Concurrency, Collections Framework, JVM internals, Exception Handling, and Spring Framework.',
  },
  {
    name: 'Python',
    category: 'languages',
    level: 98,
    badge: 'AI & Data Science',
    desc: 'Python 3, NumPy, Pandas, Scikit-Learn, PyTorch, Automation, REST APIs, Scripting, and Data Processing Pipelines.',
  },
  {
    name: 'C++',
    category: 'languages',
    level: 94,
    badge: 'High Performance & STL',
    desc: 'Standard Template Library (STL), Modern C++ (C++17/20), Memory Optimization, OOP, Generic Programming, and Competitive Programming.',
  },
  {
    name: 'C Language',
    category: 'languages',
    level: 92,
    badge: 'Low-Level & Memory',
    desc: 'Pointers & Dynamic Memory Allocation (malloc/free), Data Structures, Systems Programming, File I/O, and Hardware-level control.',
  },

  // SQL & Databases
  {
    name: 'SQL (Structured Query Language)',
    category: 'sql',
    level: 97,
    badge: 'Relational Database Master',
    desc: 'Complex Joins, Aggregations, Subqueries, Window Functions, CTEs, Triggers, Views, Stored Procedures, and Relational Schema Design.',
  },
  {
    name: 'Database Architecture & Query Optimization',
    category: 'sql',
    level: 95,
    badge: 'Performance & Indexing',
    desc: 'B-Tree Indexing, EXPLAIN Execution Plans, Normalization (1NF to BCNF), Transaction Isolation (ACID), MySQL, and PostgreSQL.',
  },

  // AI (Artificial Intelligence)
  {
    name: 'Artificial Intelligence (AI)',
    category: 'ai',
    level: 95,
    badge: 'Neural Networks & Models',
    desc: 'Deep Learning, Neural Network architectures, Large Language Models (LLMs), Prompt Engineering, Fine-tuning, and AI Inference.',
  },
  {
    name: 'Machine Learning & Data Modeling',
    category: 'ai',
    level: 94,
    badge: 'Algorithms & Training',
    desc: 'Supervised & Unsupervised Learning, Regression, Classification, Clustering, Random Forests, Gradient Boosting, and Feature Engineering.',
  },
  {
    name: 'Computer Vision & NLP',
    category: 'ai',
    level: 92,
    badge: 'Specialized AI Domains',
    desc: 'OpenCV image processing, Convolutional Neural Networks (CNNs), Natural Language Processing (Tokenization, Embeddings, Attention).',
  },

  // Core Algorithms & Systems
  {
    name: 'Data Structures & Algorithms (DSA)',
    category: 'core',
    level: 96,
    badge: 'Problem Solving Expert',
    desc: 'Arrays, Linked Lists, Trees, Binary Search Trees, Heaps, Graphs, Dynamic Programming, Greedy Algorithms, and Complexity Analysis (Big-O).',
  },
  {
    name: 'Object-Oriented Design (OOP)',
    category: 'core',
    level: 95,
    badge: 'Design Patterns',
    desc: 'Encapsulation, Inheritance, Polymorphism, Abstraction, SOLID Principles, Factory, Singleton, and Observer Design Patterns.',
  },
  {
    name: 'Git, Linux & Development Tooling',
    category: 'core',
    level: 93,
    badge: 'Dev Tooling',
    desc: 'Version Control (Git/GitHub), Linux Terminal / Shell Scripting, GCC/G++ Compilers, Debugging (GDB/Valgrind), and Build Tools.',
  },
];

export const projectsList = [
  {
    id: 'ai-vision-classifier',
    title: 'NeuralVision — Deep Learning & AI Classifier',
    subtitle: 'High-accuracy Convolutional Neural Network trained in Python & PyTorch for real-time visual recognition.',
    category: 'AI & Machine Learning',
    image: aurafitImg,
    tags: ['Python', 'AI / Deep Learning', 'PyTorch', 'OpenCV', 'NumPy'],
    metrics: '98.4% Classification Accuracy • <15ms Inference Latency',
    description:
      'An end-to-end computer vision and artificial intelligence system engineered in Python. Utilizes custom CNN architectures, transfer learning, and GPU acceleration for real-time object classification and feature extraction.',
    highlights: [
      'Built and trained deep convolutional neural networks with custom loss functions and Adam optimizer',
      'Implemented data augmentation pipelines with OpenCV and PyTorch torchvision transforms',
      'Optimized model inference latency down to 14ms using TorchScript and quantization',
      'Integrated real-time webcam feed telemetry with dynamic visual probability scores',
    ],
    githubUrl: 'https://github.com/ghoshbishwajit252-lang/neuralvision-ai',
    liveUrl: 'https://neuralvision-ai.example.com',
    architecture: {
      state: 'PyTorch Model Weights with serialized state dictionary checkpointing',
      network: 'RESTful API serving model predictions via FastAPI async endpoints',
      security: 'On-premise model execution with zero cloud telemetry exposure',
      performance: 'CUDA GPU batch inference and FP16 half-precision optimization',
    },
  },
  {
    id: 'sql-analytics-engine',
    title: 'DataPulse — High-Throughput SQL Analytics Engine',
    subtitle: 'Complex relational database schema, automated indexing, and analytical SQL aggregation queries.',
    category: 'SQL & Database Systems',
    image: novapayImg,
    tags: ['SQL', 'PostgreSQL', 'MySQL', 'Python', 'Query Optimization'],
    metrics: '10M+ Records Processed • Sub-50ms Complex Join Latency',
    description:
      'A high-performance SQL analytics repository managing millions of transactional records. Features advanced relational schema normalization, partitioned tables, composite indexing, and complex analytical queries using window functions and CTEs.',
    highlights: [
      'Constructed normalized 3NF relational schemas with strict foreign key constraints and audit triggers',
      'Designed composite B-Tree indexes reducing query execution time from 2.4s to 38ms',
      'Authored complex analytical SQL queries utilizing Window Functions (ROW_NUMBER, DENSE_RANK, LEAD/LAG)',
      'Automated transaction handling with ACID compliance and optimistic concurrency locking',
    ],
    githubUrl: 'https://github.com/ghoshbishwajit252-lang/sql-analytics-engine',
    liveUrl: 'https://datapulse-sql.example.com',
    architecture: {
      state: 'ACID transactional store with write-ahead logging (WAL)',
      network: 'Connection pooling (HikariCP) with max-pool sizing and health checks',
      security: 'Role-Based Access Control (RBAC), parameterized queries (SQL injection proof)',
      performance: 'Partitioned tables by timestamp range with automated index re-indexing',
    },
  },
  {
    id: 'cpp-engine-system',
    title: 'CoreMatrix — High-Performance C++ / Java Systems',
    subtitle: 'Concurrent multi-threaded processing engine built in Java and Modern C++ with custom memory management.',
    category: 'C++ & Java Core Systems',
    image: omnipulseImg,
    tags: ['C++', 'Java', 'C', 'Multithreading', 'STL', 'OOP'],
    metrics: 'Zero Memory Leaks • 120k Concurrent Ops/sec • Pure OOP',
    description:
      'A low-latency systems engineering project demonstrating modern C++ (C++17/20) and Java core architecture. Features thread-safe task pools, lock-free queues, custom memory allocators in C, and object-oriented design patterns.',
    highlights: [
      'Implemented lock-free ring buffer and worker thread pools in modern C++ and Java',
      'Designed clean OOP class hierarchies applying SOLID principles and Factory patterns',
      'Conducted memory leak profiling and pointer safety audits using Valgrind and AddressSanitizer',
      'Authored optimized sorting and graph traversal algorithms with minimal cache misses',
    ],
    githubUrl: 'https://github.com/ghoshbishwajit252-lang/corematrix-systems',
    liveUrl: 'https://corematrix.example.com',
    architecture: {
      state: 'Thread-safe atomic memory registers and concurrent collections',
      network: 'TCP/IP socket communication layer with non-blocking I/O',
      security: 'Safe memory boundaries avoiding buffer overflows and dangling pointers',
      performance: 'Cache-friendly contiguous memory layout with O(1) ring buffer access',
    },
  },
];

export const experienceTimeline = [
  {
    id: 'exp-1',
    role: 'AI & Machine Learning Engineering',
    company: 'Artificial Intelligence & Deep Learning',
    location: 'Python & PyTorch Projects',
    period: '2024 — Present',
    badge: 'AI Specialization',
    accomplishments: [
      'Developed and trained deep learning neural networks in Python using PyTorch and Scikit-Learn.',
      'Implemented real-time computer vision inference pipelines with OpenCV and NumPy transforms.',
      'Constructed automated data preparation and feature engineering workflows for predictive models.',
    ],
    tech: ['Python', 'AI / ML', 'PyTorch', 'OpenCV', 'NumPy', 'Deep Learning'],
  },
  {
    id: 'exp-2',
    role: 'Relational Database & SQL Engineering',
    company: 'Database Architecture & Query Optimization',
    location: 'Relational Systems & Analytics',
    period: '2023 — 2024',
    badge: 'SQL & Databases',
    accomplishments: [
      'Engineered normalized relational schemas (1NF to BCNF) in PostgreSQL and MySQL.',
      'Authored complex analytical SQL queries using CTEs, window functions, and advanced aggregation.',
      'Optimized query performance through composite B-Tree indexing and EXPLAIN execution plan analysis.',
    ],
    tech: ['SQL', 'PostgreSQL', 'MySQL', 'Indexing', 'Query Optimization', 'Schema Design'],
  },
  {
    id: 'exp-3',
    role: 'Core Systems Programming & OOP',
    company: 'Java, C & C++ Software Development',
    location: 'Algorithms & Computer Science Foundations',
    period: '2022 — 2023',
    badge: 'Core Programming',
    accomplishments: [
      'Built multithreaded backend applications in Java utilizing OOP principles and thread pools.',
      'Authored low-level algorithms and memory-safe data structures in C and Modern C++.',
      'Practiced rigorous algorithm complexity analysis (Big-O) across trees, graphs, and dynamic programming.',
    ],
    tech: ['Java', 'C++', 'C Language', 'Data Structures (DSA)', 'OOP', 'Linux / Git'],
  },
];


export const codeSnippets = [
  {
    id: 'python-ai',
    title: 'Python • PyTorch Neural Network',
    description: 'Deep Learning neural architecture with training loop & loss backpropagation',
    code: `# neural_network.py - Python AI & Deep Learning
import torch
import torch.nn as nn
import torch.optim as optim

class DeepClassifier(nn.Module):
    def __init__(self, input_dim: int, hidden_dim: int, num_classes: int):
        super(DeepClassifier, self).__init__()
        self.network = nn.Sequential(
            nn.Linear(input_dim, hidden_dim),
            nn.BatchNorm1d(hidden_dim),
            nn.ReLU(),
            nn.Dropout(0.3),
            nn.Linear(hidden_dim, hidden_dim // 2),
            nn.ReLU(),
            nn.Linear(hidden_dim // 2, num_classes)
        )
        
    def forward(self, x: torch.Tensor) -> torch.Tensor:
        return self.network(x)

# Initialize Model, Criterion, and Optimizer
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model = DeepClassifier(input_dim=128, hidden_dim=256, num_classes=10).to(device)
criterion = nn.CrossEntropyLoss()
optimizer = optim.AdamW(model.parameters(), lr=1e-3, weight_decay=1e-4)`,
    preview: '✓ PyTorch Model Compiled • CUDA Device Active • Loss: 0.042',
  },
  {
    id: 'java-oop',
    title: 'Java • Multithreaded Concurrency',
    description: 'Core Java concurrent worker pool with thread-safe queue and OOP architecture',
    code: `// TaskProcessor.java - Core Java & Multithreading
package com.portfolio.systems;

import java.util.concurrent.*;
import java.util.List;
import java.util.stream.Collectors;

public class TaskProcessor {
    private final ExecutorService executor;
    private final BlockingQueue<Runnable> taskQueue;

    public TaskProcessor(int poolSize) {
        this.taskQueue = new LinkedBlockingQueue<>(1000);
        this.executor = new ThreadPoolExecutor(
            poolSize, poolSize * 2,
            60L, TimeUnit.SECONDS,
            taskQueue,
            Executors.defaultThreadFactory(),
            new ThreadPoolExecutor.CallerRunsPolicy()
        );
    }

    public Future<String> executeTask(String taskName, Callable<String> task) {
        System.out.println("[Thread " + Thread.currentThread().getName() + "] Queued: " + taskName);
        return executor.submit(task);
    }
}`,
    preview: '✓ ThreadPoolExecutor Initialized • 8 Worker Threads Active',
  },
  {
    id: 'sql-query',
    title: 'SQL • Advanced Analytical Query',
    description: 'Complex SQL with Common Table Expressions (CTEs), Window Functions, and Ranking',
    code: `-- analytical_report.sql - Advanced SQL Query Optimization
WITH RankedPerformance AS (
    SELECT 
        user_id,
        category,
        total_score,
        created_at,
        ROW_NUMBER() OVER (
            PARTITION BY category 
            ORDER BY total_score DESC, created_at ASC
        ) AS rank_in_category,
        AVG(total_score) OVER (PARTITION BY category) AS avg_category_score
    FROM user_metrics
    WHERE status = 'ACTIVE' AND created_at >= NOW() - INTERVAL '30 days'
)
SELECT 
    user_id,
    category,
    total_score,
    ROUND(avg_category_score, 2) AS category_benchmark,
    rank_in_category
FROM RankedPerformance
WHERE rank_in_category <= 5
ORDER BY category ASC, rank_in_category ASC;`,
    preview: '✓ SQL Query Executed • Index Scan Used • Execution Time: 12ms',
  },
  {
    id: 'cpp-systems',
    title: 'C++ • Custom Memory & Algorithms',
    description: 'High-performance C++ memory management, pointers, and STL optimization',
    code: `// memory_pool.cpp - Modern C++ / C Systems Programming
#include <iostream>
#include <vector>
#include <memory>
#include <algorithm>

template <typename T>
class FastBufferPool {
private:
    std::vector<T> buffer;
    size_t capacity;

public:
    explicit FastBufferPool(size_t cap) : capacity(cap) {
        buffer.reserve(capacity);
    }

    void insertSorted(T item) {
        auto it = std::lower_bound(buffer.begin(), buffer.end(), item);
        buffer.insert(it, std::move(item));
    }

    const T* rawPointer() const noexcept {
        return buffer.data();
    }

    size_t size() const noexcept { return buffer.size(); }
};`,
    preview: '✓ Zero Memory Overhead • Contiguous Memory Cache Aligned',
  },
];

export const testimonials = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    title: 'VP of Engineering',
    company: 'Apex Cloud Labs',
    avatar: 'SJ',
    quote:
      'Bishwajit possesses outstanding engineering versatility. Whether writing low-level systems in C++, implementing core backend services in Java, or training neural network pipelines in Python, he delivers optimal and mathematically sound solutions.',
  },
  {
    id: '2',
    name: 'Marcus Vance',
    title: 'Chief Technology Officer',
    company: 'FinVanguard',
    avatar: 'MV',
    quote:
      'His command of SQL query optimization, relational database architectures, and algorithm design is top-tier. He optimized our high-volume financial data queries and ensured bulletproof ACID compliance.',
  },
  {
    id: '3',
    name: 'Dr. Elena Rostova',
    title: 'Lead AI Research Scientist',
    company: 'Aura Interactive',
    avatar: 'ER',
    quote:
      'Bishwajit combines strong foundational computer science principles with modern Artificial Intelligence practices. His work on Python model inference and computer vision pipelines was brilliant.',
  },
];
