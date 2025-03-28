
import Layout from '@/components/Layout';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-interview-blue mb-4">About MockVid</h1>
          <p className="text-xl text-interview-darkGray max-w-3xl mx-auto">
            Our mission is to help job seekers prepare for interviews with confidence through AI-powered mock interviews and feedback.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
          <div>
            <h2 className="text-2xl font-bold text-interview-blue mb-6">Our Story</h2>
            <p className="text-interview-darkGray mb-4">
              MockVid was born from a simple observation: even the most qualified candidates struggle with interview anxiety and presentation skills, often failing to showcase their true potential.
            </p>
            <p className="text-interview-darkGray mb-4">
              Our founder, after conducting hundreds of interviews, noticed that technical skills were only part of the equation. Confidence, communication, and non-verbal cues were equally important but harder to practice.
            </p>
            <p className="text-interview-darkGray">
              We built MockVid to bridge this gap, combining advanced facial recognition technology with industry-specific interview questions to create a platform where candidates can practice and receive objective feedback on both their answers and presentation.
            </p>
          </div>
          
          <div className="flex items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
              alt="Team working"
              className="rounded-lg shadow-lg max-w-full h-auto"
            />
          </div>
        </div>
        
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-interview-blue mb-8 text-center">How We're Different</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg">
              <CardContent className="pt-6">
                <div className="bg-interview-lightPurple/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-interview-purple">
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                    <line x1="12" x2="12" y1="19" y2="22"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-interview-blue mb-3">AI Expression Analysis</h3>
                <p className="text-interview-darkGray">
                  Our proprietary AI doesn't just analyze your answers – it reads your facial expressions, tone, and body language to provide holistic feedback.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-lg">
              <CardContent className="pt-6">
                <div className="bg-interview-lightPurple/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-interview-purple">
                    <line x1="4" x2="20" y1="12" y2="12"/>
                    <line x1="4" x2="20" y1="6" y2="6"/>
                    <line x1="4" x2="20" y1="18" y2="18"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-interview-blue mb-3">Role-Specific Questions</h3>
                <p className="text-interview-darkGray">
                  Practice with questions tailored to your specific job role and industry, updated regularly to match current hiring trends.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-lg">
              <CardContent className="pt-6">
                <div className="bg-interview-lightPurple/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-interview-purple">
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
                    <path d="m9 12 2 2 4-4"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-interview-blue mb-3">Actionable Improvement Plans</h3>
                <p className="text-interview-darkGray">
                  Get personalized recommendations and exercises to improve your weak areas, not just generic feedback.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold text-interview-blue mb-8 text-center">Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Alex Johnson",
                role: "Founder & CEO",
                bio: "Former HR director with 10+ years of experience in technical recruiting.",
                avatar: "AJ"
              },
              {
                name: "Sarah Chen",
                role: "Lead AI Engineer",
                bio: "Specialist in facial recognition technology and expression analysis.",
                avatar: "SC"
              },
              {
                name: "Michael Rodriguez",
                role: "Career Coach",
                bio: "Certified career coach who has helped 500+ professionals land their dream jobs.",
                avatar: "MR"
              }
            ].map((member, index) => (
              <Card key={index} className="border-none shadow-lg">
                <CardContent className="pt-6 flex flex-col items-center text-center">
                  <Avatar className="w-24 h-24 mb-4">
                    <AvatarFallback className="bg-interview-purple text-white text-xl">
                      {member.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-bold text-interview-blue">{member.name}</h3>
                  <p className="text-interview-purple font-medium mb-2">{member.role}</p>
                  <p className="text-interview-darkGray">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
