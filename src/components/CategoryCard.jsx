import React from 'react';
import { FlaskRound as Flasks, History, Music as MusicNote, Globe, Trophy, Gamepad2, BookOpen, Lightbulb,Vote,BookA} from 'lucide-react';

const CategoryCard = ({ category, onSelect }) => {
  // Map category icon string to component
  const getIcon = () => {
    switch (category.icon) {
      case 'Flasks':
        return <Flasks className="h-8 w-8 mb-2" />;
      case 'History':
        return <History className="h-8 w-8 mb-2" />;
      case 'MusicNote':
        return <MusicNote className="h-8 w-8 mb-2" />;
      case 'Globe':
        return <Globe className="h-8 w-8 mb-2" />;
      case 'Trophy':
        return <Trophy className="h-8 w-8 mb-2" />;
      case 'Gamepad2':
        return <Gamepad2 className="h-8 w-8 mb-2" />;
      case 'BookOpen':
        return <BookOpen className="h-8 w-8 mb-2" />;
      case 'Lightbulb':
        return <Lightbulb className="h-8 w-8 mb-2" />;
      case 'vote':
        return <Vote className="h-8 w-8 mb-2" />;
      case 'book-a':
        return <BookA className="h-8 w-8 mb-2" />;
      default:
        return <Lightbulb className="h-8 w-8 mb-2" />;
    }
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-md p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 hover:border-purple-300 border-2 border-transparent"
      onClick={() => onSelect(category)}
    >
      <div className="flex flex-col items-center text-center">
        <div className="bg-purple-100 p-3 rounded-full text-purple-700 mb-4">
          {getIcon()}
        </div>
        <h3 className="text-lg font-semibold mb-2 text-gray-800">{category.name}</h3>
        <p className="text-sm text-gray-600">{category.description}</p>
        <div className="mt-4 px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
          Trivia Questions
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;