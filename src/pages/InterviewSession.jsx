import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import Layout from '@/components/Layout';
import { Play, Pause, SkipForward, Camera, Clock } from 'lucide-react';
import jobRoles from '@/data/jobRoles';
import * as faceapi from 'face-api.js';

const InterviewSession = () => {
  const { roleId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [role, setRole] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [recording, setRecording] = useState(false);
  const [stream, setStream] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const [faceExpressions, setFaceExpressions] = useState([]);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [facialRecognitionEnabled, setFacialRecognitionEnabled] = useState(true);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const expressionIntervalRef = useRef(null);
  
  // Find selected role from jobRoles data
  useEffect(() => {
    const selectedRole = jobRoles.find(r => r.id === roleId);
    if (selectedRole) {
      setRole(selectedRole);
    } else {
      // If role not found, redirect to interview selection
      toast({
        title: "Role not found",
        description: "Please select a valid job role",
        variant: "destructive"
      });
      navigate('/interview');
    }
  }, [roleId, navigate, toast]);
  
  // Load face-api models
  useEffect(() => {
    const loadModels = async () => {
      try {
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
          faceapi.nets.faceExpressionNet.loadFromUri('/models')
        ]);
        setModelsLoaded(true);
        console.log('Face API models loaded');
      } catch (error) {
        console.error('Error loading models:', error);
        setFacialRecognitionEnabled(false);
        setModelsLoaded(true); // Still mark as loaded even though we're disabling the feature
        toast({
          title: "Facial recognition unavailable",
          description: "We'll continue without expression analysis",
          variant: "default"
        });
      }
    };
    
    loadModels();
    
    return () => {
      if (expressionIntervalRef.current) {
        clearInterval(expressionIntervalRef.current);
      }
    };
  }, [toast]);
  
  // Handle video stream setup
  useEffect(() => {
    const setupCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: "user" }, 
          audio: true 
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          setStream(mediaStream);
          
          const recorder = new MediaRecorder(mediaStream);
          setMediaRecorder(recorder);
          
          // Set up face detection once video is playing
          videoRef.current.onplay = () => {
            if (canvasRef.current && modelsLoaded && facialRecognitionEnabled) {
              const displaySize = { 
                width: videoRef.current.videoWidth, 
                height: videoRef.current.videoHeight 
              };
              faceapi.matchDimensions(canvasRef.current, displaySize);
              
              // Start face detection
              if (expressionIntervalRef.current) {
                clearInterval(expressionIntervalRef.current);
              }
              
              expressionIntervalRef.current = setInterval(async () => {
                if (videoRef.current && canvasRef.current) {
                  try {
                    const detections = await faceapi
                      .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
                      .withFaceExpressions();
                    
                    if (detections && detections[0] && detections[0].expressions) {
                      setFaceExpressions(prev => [...prev, detections[0].expressions]);
                      
                      // Draw detections and expressions
                      const resizedDetections = faceapi.resizeResults(detections, displaySize);
                      canvasRef.current.getContext('2d').clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                      faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
                      faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections);
                    }
                  } catch (error) {
                    console.error('Face detection error:', error);
                    // If we encounter an error during detection, disable the feature
                    if (expressionIntervalRef.current) {
                      clearInterval(expressionIntervalRef.current);
                    }
                    setFacialRecognitionEnabled(false);
                  }
                }
              }, 500);
            }
          };
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        toast({
          title: "Camera access denied",
          description: "Please allow camera and microphone access to use this feature",
          variant: "destructive"
        });
      }
    };
    
    if (modelsLoaded) {
      setupCamera();
    }
    
    return () => {
      // Cleanup function
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (expressionIntervalRef.current) {
        clearInterval(expressionIntervalRef.current);
      }
    };
  }, [modelsLoaded, toast, facialRecognitionEnabled]);
  
  const startRecording = () => {
    if (mediaRecorder && !recording) {
      setRecording(true);
      setFaceExpressions([]);
      
      // Start 3 second countdown
      let count = 3;
      setCountdown(count);
      
      const countdownInterval = setInterval(() => {
        count--;
        setCountdown(count);
        
        if (count === 0) {
          clearInterval(countdownInterval);
          
          // Start actual recording
          const chunks = [];
          mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
          mediaRecorder.onstop = () => {
            const blob = new Blob(chunks, { type: 'video/webm' });
            // In a real app, you would save this blob or upload it
            console.log("Recording stopped, video blob created:", blob);
            
            // Analyze expressions
            const expressionSummary = analyzeExpressions(faceExpressions);
            
            // Navigate to results page with expression data
            navigate(`/results/${roleId}/${currentQuestionIndex}`, { 
              state: { 
                expressions: expressionSummary,
                question: role.questions[currentQuestionIndex]
              }
            });
          };
          
          mediaRecorder.start();
          setCountdown(null);
        }
      }, 1000);
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorder && recording && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
      setRecording(false);
    }
  };
  
  const skipQuestion = () => {
    // Continue recording if already recording
    if (currentQuestionIndex < role.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      
      toast({
        title: "Question Changed",
        description: "Moved to the next question. Recording will continue until you stop it manually.",
        variant: "default"
      });
    } else {
      // End of questions but don't stop recording
      toast({
        title: "Last Question",
        description: "This is the last question. You can stop recording when you're ready.",
        variant: "default"
      });
    }
  };
  
  // Analyze facial expressions to give feedback
  const analyzeExpressions = (expressions) => {
    if (!facialRecognitionEnabled || !expressions || expressions.length === 0) {
      return {
        confidence: 'medium',
        smile: 'medium',
        neutral: 'medium',
        summary: 'Facial expression analysis was not available for this recording.',
        tips: ['Ensure your face is clearly visible', 'Try to face the camera directly', 'Practice with confident expressions']
      };
    }
    
    // Calculate average values for each expression
    const total = expressions.reduce((acc, curr) => {
      Object.keys(curr).forEach(key => {
        acc[key] = (acc[key] || 0) + curr[key];
      });
      return acc;
    }, {});
    
    const count = expressions.length;
    const averages = {};
    Object.keys(total).forEach(key => {
      averages[key] = total[key] / count;
    });
    
    // Determine confidence level
    let confidence = 'medium';
    if (averages.neutral > 0.7) {
      confidence = 'low';
    } else if (averages.happy > 0.3) {
      confidence = 'high';
    }
    
    // Generate tips based on expression analysis
    const tips = [];
    if (averages.neutral > 0.7) {
      tips.push('Try to show more enthusiasm and engagement');
      tips.push('Smile more to build rapport with interviewers');
    }
    if (averages.sad > 0.2 || averages.fearful > 0.2) {
      tips.push('Work on projecting more confidence');
      tips.push('Practice positive visualization techniques before interviews');
    }
    if (averages.angry > 0.1) {
      tips.push('Be mindful of appearing frustrated or tense');
    }
    if (tips.length === 0) {
      tips.push('Continue maintaining a balanced expression');
      tips.push('Practice varying your expressions to match content');
    }
    
    return {
      confidence,
      smile: averages.happy > 0.3 ? 'high' : (averages.happy > 0.1 ? 'medium' : 'low'),
      neutral: averages.neutral > 0.7 ? 'high' : (averages.neutral > 0.4 ? 'medium' : 'low'),
      summary: generateSummary(averages),
      tips,
      rawData: averages
    };
  };
  
  const generateSummary = (expressionData) => {
    if (!facialRecognitionEnabled) {
      return "Facial expression analysis was not available for this recording.";
    }
    
    if (expressionData.neutral > 0.7) {
      return "You appeared quite neutral throughout your answer, which might be perceived as lack of enthusiasm.";
    } else if (expressionData.happy > 0.3) {
      return "You showed good enthusiasm and positive expressions, which helps build rapport with interviewers.";
    } else if (expressionData.sad > 0.2 || expressionData.fearful > 0.2) {
      return "You appeared somewhat anxious or uncertain during your answer, which might affect the perception of your confidence.";
    } else {
      return "Your expressions were balanced, showing appropriate engagement with the question.";
    }
  };

  // Return loading state if role not loaded yet
  if (!role) {
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
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-interview-blue mb-2">
                {role.title} Interview Practice
              </h1>
              <div className="flex items-center text-interview-darkGray mb-4">
                <Clock className="h-4 w-4 mr-2" />
                <span>Question {currentQuestionIndex + 1} of {role.questions.length}</span>
              </div>
              <Progress value={(currentQuestionIndex / role.questions.length) * 100} className="h-2" />
            </div>
            
            <Card className="mb-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-medium text-interview-blue mb-1">Current Question:</h2>
                <p className="text-interview-darkGray text-lg">
                  {role.questions[currentQuestionIndex]}
                </p>
              </CardContent>
            </Card>
            
            <div className="video-container mb-6 relative">
              <video 
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full rounded-lg bg-gray-100"
              />
              <canvas 
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-full"
              />
              
              {countdown !== null && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
                  <div className="text-white text-6xl font-bold animate-pulse">
                    {countdown}
                  </div>
                </div>
              )}
              
              {recording && (
                <div className="recording-indicator">
                  <div className="recording-dot animate-pulse"></div>
                  <span>Recording</span>
                </div>
              )}
            </div>
            
            <div className="flex flex-wrap gap-3 justify-center mb-6">
              {!recording ? (
                <Button onClick={startRecording} size="lg" className="min-w-[160px]">
                  <Play className="mr-2 h-5 w-5" /> Start Recording
                </Button>
              ) : (
                <Button onClick={stopRecording} variant="destructive" size="lg" className="min-w-[160px]">
                  <Pause className="mr-2 h-5 w-5" /> Stop Recording
                </Button>
              )}
              <Button onClick={skipQuestion} variant="outline" size="lg">
                <SkipForward className="mr-2 h-5 w-5" /> Next Question
              </Button>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-interview-blue mb-4">Interview Tips</h2>
                <ul className="space-y-3">
                  <li className="flex">
                    <div className="text-interview-purple mr-3">•</div>
                    <p className="text-interview-darkGray">Maintain eye contact with the camera</p>
                  </li>
                  <li className="flex">
                    <div className="text-interview-purple mr-3">•</div>
                    <p className="text-interview-darkGray">Speak clearly and at a moderate pace</p>
                  </li>
                  <li className="flex">
                    <div className="text-interview-purple mr-3">•</div>
                    <p className="text-interview-darkGray">Use the STAR method for behavioral questions</p>
                  </li>
                  <li className="flex">
                    <div className="text-interview-purple mr-3">•</div>
                    <p className="text-interview-darkGray">Show enthusiasm through facial expressions</p>
                  </li>
                  <li className="flex">
                    <div className="text-interview-purple mr-3">•</div>
                    <p className="text-interview-darkGray">Take a moment to gather your thoughts if needed</p>
                  </li>
                </ul>
                
                <div className="mt-8 p-4 bg-interview-gray rounded-lg">
                  <h3 className="font-semibold text-interview-blue mb-2">Remember</h3>
                  <p className="text-interview-darkGray text-sm">
                    This is a practice session. It's okay to make mistakes and learn from them. Your recordings and analyses will help you improve over time.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default InterviewSession;
