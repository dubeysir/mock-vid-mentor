
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, BarChart, LineChart, Palette, TrendingUp, Megaphone } from 'lucide-react';
import jobRoles from '@/data/jobRoles';

const getIcon = (iconName) => {
  switch (iconName) {
    case 'Code':
      return <Code className="h-5 w-5" />;
    case 'BarChart':
      return <BarChart className="h-5 w-5" />;
    case 'LineChart':
      return <LineChart className="h-5 w-5" />;
    case 'Palette':
      return <Palette className="h-5 w-5" />;
    case 'Megaphone':
      return <Megaphone className="h-5 w-5" />;
    case 'TrendingUp':
      return <TrendingUp className="h-5 w-5" />;
    default:
      return <Code className="h-5 w-5" />;
  }
};

const InterviewSelection = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(null);
  
  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };
  
  const handleStartInterview = () => {
    if (selectedRole) {
      navigate(`/interview-session/${selectedRole.id}`);
    }
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-interview-blue mb-4">Select Your Job Role</h1>
        <p className="text-interview-darkGray max-w-2xl mx-auto">
          Choose the role you're interviewing for, and we'll provide tailored questions for your practice session.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {jobRoles.map((role) => (
          <Card 
            key={role.id} 
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedRole?.id === role.id 
                ? 'border-2 border-interview-purple ring-2 ring-interview-purple/20' 
                : 'border border-gray-200'
            }`}
            onClick={() => handleRoleSelect(role)}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="bg-interview-lightPurple/10 rounded-full p-2">
                  {getIcon(role.icon)}
                </div>
                {selectedRole?.id === role.id && (
                  <div className="w-6 h-6 rounded-full bg-interview-purple flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                )}
              </div>
              <CardTitle className="text-xl text-interview-blue">{role.title}</CardTitle>
              <CardDescription>{role.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-interview-darkGray">
                {role.questions.length} practice questions
              </p>
            </CardContent>
            <CardFooter className="pt-0">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-interview-purple hover:text-interview-purple/80 hover:bg-interview-purple/10 p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRoleSelect(role);
                }}
              >
                View details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="flex justify-center">
        <Button 
          onClick={handleStartInterview} 
          disabled={!selectedRole}
          size="lg"
          className="min-w-[200px]"
        >
          Start Interview <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
      
      {selectedRole && (
        <div className="mt-12 bg-interview-gray p-6 rounded-lg animate-fade-in">
          <h2 className="text-xl font-bold text-interview-blue mb-4">Sample Questions for {selectedRole.title}</h2>
          <ul className="space-y-3">
            {selectedRole.questions.slice(0, 3).map((question, index) => (
              <li key={index} className="flex items-start">
                <div className="text-interview-purple mr-3 mt-1">•</div>
                <p className="text-interview-darkGray">{question}</p>
              </li>
            ))}
          </ul>
          <p className="text-sm text-interview-purple mt-4">
            ...and {selectedRole.questions.length - 3} more questions in the full interview
          </p>
        </div>
      )}
    </div>
  );
};

export default InterviewSelection;
