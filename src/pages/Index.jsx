
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Layout from '@/components/Layout';
import { ArrowRight, Video, CheckCircle, Shield } from 'lucide-react';

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-interview-blue to-interview-lightBlue text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptMC0xMnY2aDZ2LTZoLTZ6bTEyIDEydjZoNnYtNmgtNnptMC0xMnY2aDZ2LTZoLTZ6bS0yNCAwdjZoNnYtNmgtNnptMCAxMnY2aDZ2LTZoLTZ6bS0xMi0xMnY2aDZ2LTZoLTZ6bTAgMTJ2Nmg2di02aC02eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Master Your Interview Skills with AI-Powered Feedback
              </h1>
              <p className="text-xl mb-8 text-gray-100">
                Record practice interviews, get real-time facial expression analysis, and receive personalized feedback to ace your next job interview.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="text-md">
                  <Link to="/interview">Start Practicing <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-md bg-white/10 hover:bg-white/20 text-white border-white/20">
                  <Link to="/about">Learn More</Link>
                </Button>
              </div>
            </div>
            
            <div className="md:w-2/5">
              <div className="relative">
                <div className="bg-interview-purple/20 backdrop-blur-sm rounded-lg p-1 animate-pulse-light">
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1560439514-4e9645039924?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                      alt="Interview Practice"
                      className="w-full object-cover"
                    />
                    <div className="p-6 bg-white">
                      <div className="flex items-center text-interview-purple mb-4">
                        <Video className="h-5 w-5 mr-2" />
                        <span className="font-medium">Practice Session</span>
                      </div>
                      <h3 className="text-interview-blue text-lg font-bold mb-2">Software Engineer Interview</h3>
                      <p className="text-interview-darkGray text-sm mb-4">Technical questions focused on algorithms and problem-solving skills</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-interview-darkGray">12 questions</span>
                        <span className="text-sm font-medium text-interview-purple">25 min</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-interview-purple text-white p-3 rounded-full shadow-lg">
                  <CheckCircle className="h-6 w-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-interview-blue mb-4">How It Works</h2>
            <p className="text-interview-darkGray text-xl max-w-2xl mx-auto">
              Our platform provides a comprehensive solution to help you prepare for any interview
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="bg-interview-gray rounded-lg p-6 text-center hover:shadow-md transition-shadow">
              <div className="bg-interview-lightPurple/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-interview-purple h-8 w-8">
                  <path d="M16 6H3a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h13"/>
                  <path d="M18 10h5"/>
                  <path d="M21 6v8"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-interview-blue mb-3">Choose Your Role</h3>
              <p className="text-interview-darkGray">
                Select from a variety of job roles and industries tailored to your career path
              </p>
            </div>
            
            <div className="bg-interview-gray rounded-lg p-6 text-center hover:shadow-md transition-shadow">
              <div className="bg-interview-lightPurple/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-interview-purple h-8 w-8">
                  <path d="M23 7v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h18a2 2 0 0 1 2 2z"/>
                  <path d="M12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-interview-blue mb-3">Record Your Answers</h3>
              <p className="text-interview-darkGray">
                Answer interview questions on camera just like in a real interview setting
              </p>
            </div>
            
            <div className="bg-interview-gray rounded-lg p-6 text-center hover:shadow-md transition-shadow">
              <div className="bg-interview-lightPurple/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-interview-purple h-8 w-8">
                  <path d="M2.5 18a5.5 5.5 0 0 1 5.5-5.5h4"/>
                  <path d="M2.5 6a5.5 5.5 0 0 0 5.5 5.5h9"/>
                  <path d="m15 10 5-5-5-5v10Z"/>
                  <path d="m15 19 5-5-5-5v10Z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-interview-blue mb-3">Get AI Feedback</h3>
              <p className="text-interview-darkGray">
                Receive detailed feedback on your facial expressions, confidence level, and areas for improvement
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 animated-gradient text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Ace Your Next Interview?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of job seekers who have improved their interview skills with MockVid
          </p>
          <Button asChild size="lg" variant="secondary" className="bg-white text-interview-blue hover:bg-gray-100">
            <Link to="/interview">Start Your Free Practice</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
