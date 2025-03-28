
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from "@/components/ui/button";
import { ArrowRight, Camera, BarChart, CheckCircle } from 'lucide-react';

const Index = () => {
  return (
    <Layout>
      <div className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-interview-blue mb-6 max-w-3xl">
            Ace Your Next Interview with AI-Powered Practice
          </h1>
          <p className="text-interview-darkGray text-lg max-w-2xl mb-8">
            Practice interviews with real-time feedback on your expressions, body language, and delivery. Improve your confidence and get hired faster.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" className="text-base py-6 px-8">
              <Link to="/interview">
                Start Your Free Practice <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-interview-gray rounded-lg p-6">
            <div className="bg-interview-lightPurple/10 rounded-full p-3 w-14 h-14 flex items-center justify-center mb-4">
              <Camera className="text-interview-purple h-7 w-7" />
            </div>
            <h3 className="text-xl font-bold text-interview-blue mb-2">
              Record Your Answers
            </h3>
            <p className="text-interview-darkGray">
              Practice answering common interview questions for your industry while we record your responses.
            </p>
          </div>
          
          <div className="bg-interview-gray rounded-lg p-6">
            <div className="bg-interview-lightPurple/10 rounded-full p-3 w-14 h-14 flex items-center justify-center mb-4">
              <BarChart className="text-interview-purple h-7 w-7" />
            </div>
            <h3 className="text-xl font-bold text-interview-blue mb-2">
              Get AI Feedback
            </h3>
            <p className="text-interview-darkGray">
              Our AI analyzes your facial expressions, confidence level, and delivery to provide personalized feedback.
            </p>
          </div>
          
          <div className="bg-interview-gray rounded-lg p-6">
            <div className="bg-interview-lightPurple/10 rounded-full p-3 w-14 h-14 flex items-center justify-center mb-4">
              <CheckCircle className="text-interview-purple h-7 w-7" />
            </div>
            <h3 className="text-xl font-bold text-interview-blue mb-2">
              Track Improvement
            </h3>
            <p className="text-interview-darkGray">
              See your progress over time and focus on specific areas to improve your interview performance.
            </p>
          </div>
        </div>
        
        {/* How It Works Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-interview-blue text-center mb-10">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-interview-lightPurple text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-medium text-interview-blue mb-2">
                Select Your Job Role
              </h3>
              <p className="text-interview-darkGray">
                Choose from various job roles to get tailored interview questions specific to your industry.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-interview-lightPurple text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-medium text-interview-blue mb-2">
                Record Your Response
              </h3>
              <p className="text-interview-darkGray">
                Use your webcam to record yourself answering each question within the time limit.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-interview-lightPurple text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-medium text-interview-blue mb-2">
                Review AI Feedback
              </h3>
              <p className="text-interview-darkGray">
                Get instant analysis on your expressions, confidence, and suggestions for improvement.
              </p>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="bg-interview-purple/10 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-interview-blue mb-4">
            Ready to improve your interview skills?
          </h2>
          <p className="text-interview-darkGray mb-6 max-w-2xl mx-auto">
            Join thousands of job seekers who have improved their interview performance and landed their dream jobs.
          </p>
          <Button asChild size="lg">
            <Link to="/interview">
              Start Practicing Now <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
