
import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from '@/components/Layout';
import { Smile, Meh, Frown, ArrowRight, ChevronDown, ChevronUp, BarChart } from 'lucide-react';
import jobRoles from '@/data/jobRoles';

const getConfidenceIcon = (level) => {
  switch (level) {
    case 'high':
      return <Smile className="h-8 w-8 text-green-500" />;
    case 'medium':
      return <Meh className="h-8 w-8 text-yellow-500" />;
    case 'low':
      return <Frown className="h-8 w-8 text-red-500" />;
    default:
      return <Meh className="h-8 w-8 text-yellow-500" />;
  }
};

const Results = () => {
  const { roleId, questionIndex } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  const [question, setQuestion] = useState('');
  const [analysisData, setAnalysisData] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  
  useEffect(() => {
    // Get role info
    const selectedRole = jobRoles.find(r => r.id === roleId);
    if (selectedRole) {
      setRole(selectedRole);
      
      // Try to get question from location state or from role data
      if (location.state?.question) {
        setQuestion(location.state.question);
      } else if (selectedRole.questions[parseInt(questionIndex)]) {
        setQuestion(selectedRole.questions[parseInt(questionIndex)]);
      }
      
      // Get analysis data from location state
      if (location.state?.expressions) {
        setAnalysisData(location.state.expressions);
      } else {
        // If no data, generate mock data (in a real app, you'd retrieve this from storage)
        setAnalysisData({
          confidence: 'medium',
          smile: 'medium',
          neutral: 'medium',
          summary: 'You appeared somewhat neutral during your answer, with occasional positive expressions. Working on more consistent engagement would improve your interview presence.',
          tips: [
            'Try to show more enthusiasm throughout your answer',
            'Practice varying your expressions to match your content',
            'Remember to smile at appropriate moments',
            'Maintain eye contact with the camera'
          ],
          rawData: {
            neutral: 0.65,
            happy: 0.2,
            sad: 0.05,
            angry: 0.02,
            fearful: 0.03,
            disgusted: 0.01,
            surprised: 0.04
          }
        });
      }
    } else {
      // If role not found, redirect
      navigate('/interview');
    }
  }, [roleId, questionIndex, location, navigate]);
  
  const handleContinue = () => {
    // Navigate to next question or to dashboard if finished
    const nextQuestionIndex = parseInt(questionIndex) + 1;
    if (role && nextQuestionIndex < role.questions.length) {
      navigate(`/interview-session/${roleId}`);
    } else {
      navigate('/dashboard');
    }
  };
  
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };
  
  // Return loading state if not loaded yet
  if (!role || !analysisData) {
    return (
      <Layout>
        <div className="container mx-auto px-6 py-12 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-interview-blue mb-3">Your Performance Analysis</h1>
          <p className="text-interview-darkGray max-w-2xl mx-auto">
            Based on your facial expressions and body language during your answer
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-xl">
                Question: <span className="font-normal">{question}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="text-lg font-medium text-interview-blue mb-4">Analysis Summary</h3>
              <p className="text-interview-darkGray mb-6">
                {analysisData.summary}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-interview-gray rounded-lg p-4 flex items-center">
                  <div className="mr-4">
                    {getConfidenceIcon(analysisData.confidence)}
                  </div>
                  <div>
                    <p className="text-sm text-interview-darkGray">Confidence Level</p>
                    <p className="font-medium text-interview-blue capitalize">{analysisData.confidence}</p>
                  </div>
                </div>
                
                <div className="bg-interview-gray rounded-lg p-4 flex items-center">
                  <div className="mr-4">
                    {getConfidenceIcon(analysisData.smile)}
                  </div>
                  <div>
                    <p className="text-sm text-interview-darkGray">Smile Factor</p>
                    <p className="font-medium text-interview-blue capitalize">{analysisData.smile}</p>
                  </div>
                </div>
                
                <div className="bg-interview-gray rounded-lg p-4 flex items-center">
                  <div className="mr-4">
                    {getConfidenceIcon(analysisData.neutral === 'high' ? 'low' : (analysisData.neutral === 'low' ? 'high' : 'medium'))}
                  </div>
                  <div>
                    <p className="text-sm text-interview-darkGray">Expressiveness</p>
                    <p className="font-medium text-interview-blue capitalize">
                      {analysisData.neutral === 'high' ? 'Low' : (analysisData.neutral === 'low' ? 'High' : 'Medium')}
                    </p>
                  </div>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                onClick={toggleDetails} 
                className="w-full justify-between mb-6"
              >
                <span className="flex items-center">
                  <BarChart className="mr-2 h-5 w-5" />
                  {showDetails ? 'Hide Detailed Analysis' : 'Show Detailed Analysis'}
                </span>
                {showDetails ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </Button>
              
              {showDetails && analysisData.rawData && (
                <div className="animate-slide-up mb-6">
                  <h3 className="text-lg font-medium text-interview-blue mb-4">Expression Breakdown</h3>
                  <div className="space-y-4">
                    {Object.entries(analysisData.rawData).map(([expression, value]) => (
                      <div key={expression} className="space-y-1">
                        <div className="flex justify-between">
                          <p className="text-sm text-interview-darkGray capitalize">{expression}</p>
                          <p className="text-sm text-interview-darkGray">{Math.round(value * 100)}%</p>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-interview-purple rounded-full h-2" 
                            style={{ width: `${Math.round(value * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div>
                <h3 className="text-lg font-medium text-interview-blue mb-4">Areas for Improvement</h3>
                <ul className="space-y-3">
                  {analysisData.tips.map((tip, index) => (
                    <li key={index} className="flex">
                      <div className="text-interview-purple mr-3">•</div>
                      <p className="text-interview-darkGray">{tip}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Next Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-interview-darkGray mb-6">
                Improve your performance by practicing regularly and applying the feedback from each session.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="bg-interview-lightPurple/10 rounded-full p-2 mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-interview-purple">
                      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                      <line x1="12" x2="12" y1="19" y2="22"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-interview-blue">Practice More Questions</h4>
                    <p className="text-sm text-interview-darkGray">Continue with additional questions to build your confidence</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-interview-lightPurple/10 rounded-full p-2 mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-interview-purple">
                      <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
                      <line x1="12" x2="12" y1="8" y2="16"/>
                      <line x1="8" x2="16" y1="12" y2="12"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-interview-blue">Review Your Dashboard</h4>
                    <p className="text-sm text-interview-darkGray">Track your progress and identify patterns in your performance</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-interview-lightPurple/10 rounded-full p-2 mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-interview-purple">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                      <path d="M12 17h.01"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-interview-blue">Access Resources</h4>
                    <p className="text-sm text-interview-darkGray">Check out our guides for interview strategies and tips</p>
                  </div>
                </div>
              </div>
              
              <Button onClick={handleContinue} className="w-full">
                Continue <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Results;
