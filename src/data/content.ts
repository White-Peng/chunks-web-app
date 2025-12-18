import type { Story, Chunk, Article, RelatedTopic, DailyGoalOption, Quiz } from '@/types'

// Daily goal options
export const DailyGoalOptions: DailyGoalOption[] = [
  {
    id: 'deep-dive',
    title: 'I am ready to deep dive',
    subtitle: 'Full focus mode with six story chunks',
  },
  {
    id: 'chill',
    title: 'I want to chill in bed',
    subtitle: 'A lighter reading session curated for you',
  },
]

// Generate chunks for a story
function generateChunksFor(title: string, imageUrl: string): Chunk[] {
  return [
    {
      id: 1,
      title: 'Key Insight #1',
      content: `Discover the fundamental concepts behind ${title}. This chunk explores the basics and sets the foundation for deeper understanding.`,
      imageUrl: imageUrl,
    },
    {
      id: 2,
      title: 'Historical Context',
      content: `Learn about the evolution and background of ${title}. Understanding the past helps illuminate the present.`,
      imageUrl: imageUrl,
    },
    {
      id: 3,
      title: 'Expert Perspective',
      content: `Industry leaders share their insights on ${title}. Gain valuable knowledge from those at the forefront.`,
      imageUrl: imageUrl,
    },
    {
      id: 4,
      title: 'Real-World Application',
      content: `See how ${title} manifests in everyday life. Practical examples that bring theory to reality.`,
      imageUrl: imageUrl,
    },
    {
      id: 5,
      title: 'Future Trends',
      content: `Explore what's next for ${title}. Predictions and emerging patterns that shape tomorrow.`,
      imageUrl: imageUrl,
    },
    {
      id: 6,
      title: 'Deep Dive',
      content: `An in-depth exploration of the most fascinating aspects of ${title}. For those who want to go further.`,
      imageUrl: imageUrl,
    },
  ]
}

// Generate quiz questions for a story
function generateQuizFor(title: string): Quiz {
  return {
    questions: [
      {
        id: 1,
        question: `What is a key fundamental concept behind ${title}?`,
        options: [
          'Understanding surface-level details only',
          'Exploring basics and setting a foundation for deeper understanding',
          'Ignoring historical context',
          'Focusing only on future predictions',
        ],
        correctAnswerIndex: 1,
        explanation:
          'The first chunk emphasized learning the fundamentals to support deeper exploration.',
      },
      {
        id: 2,
        question: `Why is historical context important for ${title}?`,
        options: [
          'It is not important at all',
          'It only matters for academic purposes',
          'Understanding the past helps illuminate the present',
          'History has no connection to current topics',
        ],
        correctAnswerIndex: 2,
        explanation: 'Knowing how the topic evolved clarifies why it matters today.',
      },
      {
        id: 3,
        question: `What do expert perspectives provide regarding ${title}?`,
        options: [
          'Only theoretical knowledge',
          'Valuable insights from people at the forefront',
          'Outdated information',
          'Unverified opinions',
        ],
        correctAnswerIndex: 1,
        explanation: 'Experts share lived experience and forward-looking opinions.',
      },
      {
        id: 4,
        question: 'How does real-world application enhance understanding?',
        options: [
          'It makes topics more confusing',
          'It is irrelevant to learning',
          'It brings theory to reality through practical examples',
          'It only applies to specific industries',
        ],
        correctAnswerIndex: 2,
        explanation:
          'Seeing an idea in practice helps connect abstract concepts to daily life.',
      },
      {
        id: 5,
        question: `What is valuable about exploring future trends in ${title}?`,
        options: [
          'Nothing, only the past matters',
          'Understanding predictions and emerging patterns that shape tomorrow',
          'Future trends are always wrong',
          'It creates unnecessary speculation',
        ],
        correctAnswerIndex: 1,
        explanation: 'Trends indicate where the topic may head next so you can prepare.',
      },
    ]
  }
}

// Sample stories with chunks and quiz
export const SampleStories: Story[] = [
  {
    id: 1,
    title: 'The Future of AI',
    description:
      'Explore the cutting-edge developments in artificial intelligence and how they are shaping our world.',
    imageUrl:
      'https://images.unsplash.com/photo-1568952433726-3896e3881c65?auto=format&fit=crop&w=1080&q=80',
    chunks: generateChunksFor('The Future of AI', 'https://images.unsplash.com/photo-1568952433726-3896e3881c65?auto=format&fit=crop&w=1080&q=80'),
    quiz: generateQuizFor('The Future of AI'),
    relatedTopics: ['Machine Learning', 'Neural Networks', 'Deep Learning', 'Automation'],
  },
  {
    id: 2,
    title: 'Hidden Gems of Southeast Asia',
    description:
      'Discover breathtaking destinations, local cultures, and unforgettable experiences across Southeast Asia.',
    imageUrl:
      'https://images.unsplash.com/photo-1528543606781-2f6e6857f318?auto=format&fit=crop&w=1080&q=80',
    chunks: generateChunksFor('Hidden Gems of Southeast Asia', 'https://images.unsplash.com/photo-1528543606781-2f6e6857f318?auto=format&fit=crop&w=1080&q=80'),
    quiz: generateQuizFor('Hidden Gems of Southeast Asia'),
    relatedTopics: ['Travel Tips', 'Cultural Experiences', 'Local Cuisine', 'Adventure'],
  },
  {
    id: 3,
    title: 'The Art of Modern Cuisine',
    description:
      'Explore culinary innovations and food trends that are revolutionizing how we eat.',
    imageUrl:
      'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1080&q=80',
    chunks: generateChunksFor('The Art of Modern Cuisine', 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1080&q=80'),
    quiz: generateQuizFor('The Art of Modern Cuisine'),
    relatedTopics: ['Molecular Gastronomy', 'Food Science', 'Sustainable Cooking', 'Chef Techniques'],
  },
  {
    id: 4,
    title: 'Music That Moves Us',
    description:
      'Learn about emerging artists and the sounds that define our generation.',
    imageUrl:
      'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=1080&q=80',
    chunks: generateChunksFor('Music That Moves Us', 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=1080&q=80'),
    quiz: generateQuizFor('Music That Moves Us'),
    relatedTopics: ['Music Production', 'Genre Evolution', 'Concert Culture', 'Streaming Era'],
  },
  {
    id: 5,
    title: 'Abstract Expressions',
    description:
      'Explore the vibrant world of contemporary art and digital installations.',
    imageUrl:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1080&q=80',
    chunks: generateChunksFor('Abstract Expressions', 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1080&q=80'),
    quiz: generateQuizFor('Abstract Expressions'),
    relatedTopics: ['Digital Art', 'NFTs', 'Gallery Scene', 'Art History'],
  },
]

// Generate articles for a story
export function generateArticles(story: Story): Article[] {
  const slug = story.title.toLowerCase().replace(/\s+/g, '-')
  return [
    {
      title: `The Complete Guide to ${story.title}`,
      url: `https://example.com/articles/${slug}`,
      source: 'Tech Insights',
      date: 'November 28, 2024',
    },
    {
      title: `Understanding ${story.title}: Expert Analysis`,
      url: `https://medium.com/@expert/${slug}`,
      source: 'Medium',
      date: 'November 25, 2024',
    },
    {
      title: `${story.title} in Practice: Real-World Applications`,
      url: `https://research.org/papers/${slug}`,
      source: 'Research Institute',
      date: 'November 20, 2024',
    },
  ]
}

// Generate related topics for a story
export function generateRelatedTopics(story: Story): RelatedTopic[] {
  return [
    {
      id: 1,
      title: `Advanced Concepts in ${story.title}`,
      description: 'Dive deeper into complex aspects and expert-level insights',
      category: 'Deep Dive',
      readTime: '12 min',
      imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
      trending: true,
    },
    {
      id: 2,
      title: `The Future of ${story.title}`,
      description: 'Emerging trends and predictions shaping tomorrow',
      category: 'Trends',
      readTime: '8 min',
      imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80',
      trending: true,
    },
    {
      id: 3,
      title: 'Case Studies and Success Stories',
      description: 'Real-world examples of implementation and impact',
      category: 'Case Study',
      readTime: '10 min',
      imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    },
    {
      id: 4,
      title: 'Common Misconceptions Explained',
      description: 'Debunking myths and clarifying confusion',
      category: 'Education',
      readTime: '6 min',
      imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80',
    },
    {
      id: 5,
      title: 'Expert Interviews and Insights',
      description: 'Perspectives from industry leaders and pioneers',
      category: 'Interview',
      readTime: '15 min',
      imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80',
    },
    {
      id: 6,
      title: "Beginner's Guide to Related Topics",
      description: 'Start your journey with foundational knowledge',
      category: 'Guide',
      readTime: '9 min',
      imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
    },
  ]
}
