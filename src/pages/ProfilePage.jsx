import React from 'react';
import { User, Trophy, Target, Clock, Award } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const { state } = useAuth();
  const { user } = state;

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getPerformanceLevel = (averageScore) => {
    if (averageScore >= 90) return { level: 'Quiz Master', color: 'text-purple-600', bgColor: 'bg-purple-100' };
    if (averageScore >= 75) return { level: 'Knowledge Expert', color: 'text-green-600', bgColor: 'bg-green-100' };
    if (averageScore >= 60) return { level: 'Knowledge Seeker', color: 'text-blue-600', bgColor: 'bg-blue-100' };
    if (averageScore >= 40) return { level: 'Knowledge Apprentice', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
    return { level: 'Beginner', color: 'text-gray-600', bgColor: 'bg-gray-100' };
  };

  const performance = getPerformanceLevel(user.averageScore);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-8">
            <div className="flex items-center">
              <div className="bg-white rounded-full p-4 mr-6">
                <User className="w-12 h-12 text-purple-600" />
              </div>
              <div className="text-white">
                <h1 className="text-3xl font-bold">{user.username}</h1>
                <p className="text-purple-200">{user.email}</p>
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-2 ${performance.bgColor} ${performance.color}`}>
                  <Award className="w-4 h-4 mr-1" />
                  {performance.level}
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Quiz Statistics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-purple-50 p-6 rounded-lg text-center">
                <Trophy className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-purple-700">{user.totalScore}</div>
                <div className="text-sm text-purple-600">Total Score</div>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg text-center">
                <Target className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-blue-700">{user.gamesPlayed}</div>
                <div className="text-sm text-blue-600">Games Played</div>
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg text-center">
                <Award className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-green-700">{user.averageScore.toFixed(1)}%</div>
                <div className="text-sm text-green-600">Average Score</div>
              </div>
              
              <div className="bg-yellow-50 p-6 rounded-lg text-center">
                <Trophy className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-yellow-700">{user.bestScore}</div>
                <div className="text-sm text-yellow-600">Best Score</div>
              </div>
            </div>

            {/* Account Information */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Information</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Member Since:</span>
                  <span className="font-medium">{formatDate(user.createdAt)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Played:</span>
                  <span className="font-medium">{formatDate(user.lastPlayed)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium">{user.email}</span>
                </div>
              </div>
            </div>

            {/* Achievements Section */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Achievements</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`p-4 rounded-lg border-2 ${user.gamesPlayed >= 1 ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>
                  <div className="flex items-center">
                    <Trophy className={`w-6 h-6 mr-3 ${user.gamesPlayed >= 1 ? 'text-green-600' : 'text-gray-400'}`} />
                    <div>
                      <div className="font-medium">First Quiz</div>
                      <div className="text-sm text-gray-600">Complete your first quiz</div>
                    </div>
                  </div>
                </div>
                
                <div className={`p-4 rounded-lg border-2 ${user.gamesPlayed >= 10 ? 'border-blue-200 bg-blue-50' : 'border-gray-200 bg-gray-50'}`}>
                  <div className="flex items-center">
                    <Target className={`w-6 h-6 mr-3 ${user.gamesPlayed >= 10 ? 'text-blue-600' : 'text-gray-400'}`} />
                    <div>
                      <div className="font-medium">Quiz Enthusiast</div>
                      <div className="text-sm text-gray-600">Complete 10 quizzes</div>
                    </div>
                  </div>
                </div>
                
                <div className={`p-4 rounded-lg border-2 ${user.averageScore >= 80 ? 'border-purple-200 bg-purple-50' : 'border-gray-200 bg-gray-50'}`}>
                  <div className="flex items-center">
                    <Award className={`w-6 h-6 mr-3 ${user.averageScore >= 80 ? 'text-purple-600' : 'text-gray-400'}`} />
                    <div>
                      <div className="font-medium">High Achiever</div>
                      <div className="text-sm text-gray-600">Maintain 80% average score</div>
                    </div>
                  </div>
                </div>
                
                <div className={`p-4 rounded-lg border-2 ${user.bestScore >= 500 ? 'border-yellow-200 bg-yellow-50' : 'border-gray-200 bg-gray-50'}`}>
                  <div className="flex items-center">
                    <Trophy className={`w-6 h-6 mr-3 ${user.bestScore >= 500 ? 'text-yellow-600' : 'text-gray-400'}`} />
                    <div>
                      <div className="font-medium">Score Master</div>
                      <div className="text-sm text-gray-600">Score 500+ points in a single quiz</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;