import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BookOpen,
  User,
  Home,
  ArrowRight,
  GraduationCap,
  Award,
  Clock,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

export default function Dashboard() {
  const { profile, user } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 w-full flex flex-col items-center"
    >
      {/* Enhanced Welcome Section */}
      <motion.div variants={itemVariants} className="text-center mb-8 w-full max-w-5xl mx-auto">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl blur-3xl"></div>
          <div className="relative bg-gradient-to-br from-card to-card/80 backdrop-blur-sm rounded-2xl border border-border/50 shadow-xl p-8">
            <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-2xl mx-auto mb-4 shadow-lg shadow-primary/25">
              <BookOpen className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
              Welcome to Team Blitzer Learning
            </h1>
            <p className="text-xl text-muted-foreground mb-3">
              Hello, {profile?.full_name?.split(' ')[0] || user?.email?.split('@')[0] || 'Student'}! 👋
            </p>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Your gateway to racing engineering excellence and continuous learning
            </p>
            
            {/* Welcome Stats */}
            <div className="flex items-center justify-center gap-8 mt-6 text-sm">
              <div className="text-center">
                <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                <span className="text-muted-foreground">Online</span>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-primary">0</div>
                <span className="text-muted-foreground">Courses</span>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-green-600">0</div>
                <span className="text-muted-foreground">Completed</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Quick Actions */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10"></div>
          <CardContent className="relative p-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <Home className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="mb-3 text-xl">Main Website</CardTitle>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              Visit the Team Blitzer CUET homepage and explore our achievements, gallery, and team information
            </p>
            <Button asChild className="w-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25">
              <Link to="/">
                <Home className="h-4 w-4 mr-2" />
                Go to Website
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-green-500/10"></div>
          <CardContent className="relative p-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <GraduationCap className="h-10 w-10 text-green-600" />
            </div>
            <CardTitle className="mb-3 text-xl">Learning Hub</CardTitle>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              Access racing engineering courses, tutorials, and educational resources
            </p>
            <Button variant="outline" className="w-full border-green-500/20 text-green-600 hover:bg-green-500/10 hover:border-green-500/40">
              <BookOpen className="h-4 w-4 mr-2" />
              Coming Soon
            </Button>
          </CardContent>
        </Card>

        <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-blue-500/10"></div>
          <CardContent className="relative p-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <User className="h-10 w-10 text-blue-600" />
            </div>
            <CardTitle className="mb-3 text-xl">My Profile</CardTitle>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              Manage your account settings, personal information, and preferences
            </p>
            <Button variant="outline" asChild className="w-full border-blue-500/20 text-blue-600 hover:bg-blue-500/10 hover:border-blue-500/40">
              <Link to="/dashboard/profile">
                <User className="h-4 w-4 mr-2" />
                View Profile
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Enhanced Quick Stats */}
      <motion.div variants={itemVariants} className="max-w-3xl mx-auto">
        <Card className="relative overflow-hidden border-0 shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10"></div>
          <CardHeader className="relative text-center pb-4">
            <CardTitle className="flex items-center justify-center gap-3 text-2xl">
              <div className="p-2 bg-primary/10 rounded-xl">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              Account Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <div className="grid grid-cols-2 gap-8 text-center">
              <div className="space-y-3">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl mx-auto shadow-lg">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <p className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">0</p>
                  <p className="text-sm text-muted-foreground font-medium">Completed Courses</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-2xl mx-auto shadow-lg">
                  <Clock className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-green-600">0</p>
                  <p className="text-sm text-muted-foreground font-medium">Learning Hours</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

    </motion.div>
  );
}
