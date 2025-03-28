
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from '@/components/Layout';
import { BarChart, PieChart, BookOpen, ArrowRight, Calendar, Video, Clock } from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  // Mock data for dashboard
  const mockData = {
    completedInterviews: 7,
    practiceTime: 124, // minutes
    questionsAnswered: 32,
    recentSessions: [
      {
        id: 1,
        role: "Software Engineer",
        date: "May 8, 2023",
        questions: 5,
        duration: 18, // minutes
        confidence: "medium"
      },
      {
        id: 2,
        role: "Product Manager",
        date: "May 5, 2023",
        questions: 6,
        duration: 22, // minutes
        confidence: "high"
      },
      {
        id: 3,
        role: "UX Designer",
        date: "April 28, 2023",
        questions: 4,
        duration: 15, // minutes
        confidence: "medium"
      }
    ],
    strengths: ["Technical knowledge", "Clear explanation", "Structured answers"],
    improvements: ["Eye contact", "Reducing filler words", "Body language", "Pace of speaking"]
  };

  return (
    <Layout>
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-interview-blue mb-2">Your Dashboard</h1>
            <p className="text-interview-darkGray">
              Track your progress and review your interview performance
            </p>
          </div>
          <Button asChild className="mt-4 md:mt-0">
            <Link to="/interview">Practice Interview</Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <div className="bg-interview-lightPurple/10 p-3 rounded-full">
                  <Video className="h-5 w-5 text-interview-purple" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-interview-blue">{mockData.completedInterviews}</h3>
              <p className="text-interview-darkGray">Completed Interviews</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <div className="bg-interview-lightPurple/10 p-3 rounded-full">
                  <Clock className="h-5 w-5 text-interview-purple" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-interview-blue">{mockData.practiceTime} min</h3>
              <p className="text-interview-darkGray">Total Practice Time</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <div className="bg-interview-lightPurple/10 p-3 rounded-full">
                  <BookOpen className="h-5 w-5 text-interview-purple" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-interview-blue">{mockData.questionsAnswered}</h3>
              <p className="text-interview-darkGray">Questions Answered</p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="overview" className="mb-10" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sessions">Recent Sessions</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your most recent interview practice sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {mockData.recentSessions.slice(0, 2).map((session) => (
                    <div key={session.id} className="flex justify-between items-center">
                      <div className="flex items-start">
                        <div className="bg-interview-gray p-3 rounded-lg mr-4">
                          <Calendar className="h-5 w-5 text-interview-blue" />
                        </div>
                        <div>
                          <h4 className="font-medium text-interview-blue">{session.role} Interview</h4>
                          <p className="text-sm text-interview-darkGray">{session.date} • {session.questions} questions</p>
                        </div>
                      </div>
                      <Button variant="ghost" className="text-interview-purple hover:text-interview-purple/80 hover:bg-interview-purple/10">
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Strengths</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {mockData.strengths.map((strength, index) => (
                      <li key={index} className="flex items-center">
                        <div className="text-green-500 mr-3">•</div>
                        <p className="text-interview-darkGray">{strength}</p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Areas for Improvement</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {mockData.improvements.map((improvement, index) => (
                      <li key={index} className="flex items-center">
                        <div className="text-interview-purple mr-3">•</div>
                        <p className="text-interview-darkGray">{improvement}</p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="sessions">
            <Card>
              <CardHeader>
                <CardTitle>Recent Interview Sessions</CardTitle>
                <CardDescription>Review your past practice sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {mockData.recentSessions.map((session) => (
                    <div key={session.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium text-interview-blue">{session.role} Interview</h4>
                          <p className="text-sm text-interview-darkGray">{session.date}</p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          session.confidence === 'high' 
                            ? 'bg-green-100 text-green-700' 
                            : session.confidence === 'medium'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                        }`}>
                          {session.confidence === 'high' 
                            ? 'High Confidence' 
                            : session.confidence === 'medium'
                              ? 'Medium Confidence'
                              : 'Low Confidence'}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-interview-gray rounded-lg p-3">
                          <p className="text-sm text-interview-darkGray">Questions</p>
                          <p className="font-medium text-interview-blue">{session.questions}</p>
                        </div>
                        <div className="bg-interview-gray rounded-lg p-3">
                          <p className="text-sm text-interview-darkGray">Duration</p>
                          <p className="font-medium text-interview-blue">{session.duration} minutes</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="text-interview-purple border-interview-purple/20 hover:bg-interview-purple/10">
                        View Details
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="performance">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Confidence Trend</CardTitle>
                    <CardDescription>Your confidence level over time</CardDescription>
                  </div>
                  <BarChart className="h-5 w-5 text-interview-darkGray" />
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center bg-interview-gray/50 rounded-lg">
                    <p className="text-interview-darkGray italic">Chart visualization would appear here</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Expression Analysis</CardTitle>
                    <CardDescription>Breakdown of your facial expressions</CardDescription>
                  </div>
                  <PieChart className="h-5 w-5 text-interview-darkGray" />
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center bg-interview-gray/50 rounded-lg">
                    <p className="text-interview-darkGray italic">Chart visualization would appear here</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="recommendations">
            <Card>
              <CardHeader>
                <CardTitle>Personalized Recommendations</CardTitle>
                <CardDescription>Based on your interview performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="bg-interview-gray p-4 rounded-lg">
                    <h4 className="font-medium text-interview-blue mb-2">Work on Eye Contact and Body Language</h4>
                    <p className="text-interview-darkGray mb-4">
                      Our analysis shows you tend to look away from the camera frequently. Try to maintain more consistent eye contact to convey confidence.
                    </p>
                    <Button variant="outline" size="sm" className="text-interview-purple border-interview-purple/20 hover:bg-interview-purple/10">
                      View Exercise
                    </Button>
                  </div>
                  
                  <div className="bg-interview-gray p-4 rounded-lg">
                    <h4 className="font-medium text-interview-blue mb-2">Reduce Filler Words</h4>
                    <p className="text-interview-darkGray mb-4">
                      Practice speaking more deliberately to reduce the use of filler words like "um," "uh," and "like."
                    </p>
                    <Button variant="outline" size="sm" className="text-interview-purple border-interview-purple/20 hover:bg-interview-purple/10">
                      View Exercise
                    </Button>
                  </div>
                  
                  <div className="bg-interview-gray p-4 rounded-lg">
                    <h4 className="font-medium text-interview-blue mb-2">Practice STAR Technique</h4>
                    <p className="text-interview-darkGray mb-4">
                      For behavioral questions, structure your answers using the Situation, Task, Action, Result framework.
                    </p>
                    <Button variant="outline" size="sm" className="text-interview-purple border-interview-purple/20 hover:bg-interview-purple/10">
                      View Exercise
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="bg-interview-blue text-white rounded-lg overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-4">Ready to Keep Improving?</h2>
            <p className="mb-6 text-white/80">
              Practice makes perfect. Continue to refine your interview skills with more sessions.
            </p>
            <Button asChild size="lg" variant="secondary" className="bg-white text-interview-blue hover:bg-gray-100">
              <Link to="/interview">Start a New Practice Session <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
