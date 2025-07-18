export const quizCategories = [
  {
    id: 'general',
    name: 'General Knowledge',
    icon: 'Lightbulb',
    description: 'Test your general knowledge across various topics',
    apiId: 9
  },
  {
    id: 'science',
    name: 'Science & Nature',
    icon: 'Flasks',
    description: 'Explore the wonders of science and nature',
    apiId: 17
  },
  {
    id: 'history',
    name: 'History',
    icon: 'History',
    description: 'Journey through time with historical questions',
    apiId: 23
  },
  {
    id: 'geography',
    name: 'Geography',
    icon: 'Globe',
    description: 'Test your knowledge of world geography',
    apiId: 22
  },
  {
    id: 'sports',
    name: 'Sports',
    icon: 'Trophy',
    description: 'Challenge yourself with sports trivia',
    apiId: 21
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    icon: 'MusicNote',
    description: 'Movies, music, TV shows and more',
    apiId: 11
  },
  {
    id: 'books',
    name: 'Books',
    icon: 'BookOpen',
    description: 'Literature and famous books',
    apiId: 10
  },
  {
    id: 'computers',
    name: 'Computers',
    icon: 'Gamepad2',
    description: 'Technology and computer science',
    apiId: 18
  },
  {
    id: 'mythology',
    name: 'Mythology',
    icon: 'book-a',
    description: 'Test you knowledge of Mythology',
    apiId: 20
  },
  {
    id: 'politics',
    name: 'Politics',
    icon: 'vote',
    description: 'Test you knowledge of Politics',
    apiId: 24
  }
];

// categories.js

// const CATEGORY_API_URL = 'https://opentdb.com/api_category.php';

// // A list of category names to exclude (all Entertainment-related ones)
// const EXCLUDED_CATEGORIES = [
//   'Entertainment: Books',
//   'Entertainment: Film',
//   'Entertainment: Music',
//   'Entertainment: Musicals & Theatres',
//   'Entertainment: Television',
//   'Entertainment: Video Games',
//   'Entertainment: Board Games',
//   'Entertainment: Comics',
//   'Entertainment: Japanese Anime & Manga',
//   'Entertainment: Cartoon & Animations'
// ];



// // Utility to convert category name to a simple ID string
// const formatId = (name) => {
//   return name.toLowerCase().split(':')[0].trim().replace(/\s+/g, '-');
// };

// // Utility to generate a placeholder icon and description
// const getCategoryMeta = (name, id) => {
//   return {
//     icon: 'Lightbulb', // Default icon — you can customize based on name or id
//     description: `Test your knowledge in ${name.toLowerCase()}`,
//   };
// };

// // Fetch, filter and format categories
// export async function quizCategories() {
//   try {
//     const res = await fetch(CATEGORY_API_URL);
//     const data = await res.json();

//     const categories = data.trivia_categories
//       .filter((cat) => !EXCLUDED_CATEGORIES.includes(cat.name))
//       .map((cat) => {
//         const meta = getCategoryMeta(cat.name, cat.id);
//         return {
//           id: formatId(cat.name),
//           name: cat.name,
//           icon: meta.icon,
//           description: meta.description,
//           apiId: cat.id,
//         };
//       });

//     return categories;
//   } catch (error) {
//     console.error('Failed to fetch categories:', error);
//     return [];
//   }
// }
