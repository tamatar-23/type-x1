
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';

const Login = () => {
  const { signInWithGoogle, signInWithGithub } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Google sign-in failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGithubSignIn = async () => {
    setIsLoading(true);
    try {
      await signInWithGithub();
    } catch (error) {
      console.error('GitHub sign-in failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4" 
      style={{ backgroundColor: 'var(--theme-background)' }}
    >
      {/* Back button */}
      <Link 
        to="/" 
        className="absolute top-6 left-6 flex items-center gap-2 hover:opacity-80 transition-opacity"
        style={{ color: 'var(--theme-stats)' }}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to TypeFlow
      </Link>

      <div className="w-full max-w-md">
        <Tabs defaultValue="login" className="w-full">
          <TabsList 
            className="grid w-full grid-cols-2 mb-6"
            style={{ 
              backgroundColor: 'var(--theme-background)',
              borderColor: 'var(--theme-stats)'
            }}
          >
            <TabsTrigger 
              value="login"
              style={{ color: 'var(--theme-typebox)' }}
              className="data-[state=active]:bg-[var(--theme-title)] data-[state=active]:text-[var(--theme-background)]"
            >
              Login
            </TabsTrigger>
            <TabsTrigger 
              value="register"
              style={{ color: 'var(--theme-typebox)' }}
              className="data-[state=active]:bg-[var(--theme-title)] data-[state=active]:text-[var(--theme-background)]"
            >
              Register
            </TabsTrigger>
          </TabsList>

          {/* Login Tab */}
          <TabsContent value="login">
            <Card 
              style={{ 
                backgroundColor: 'var(--theme-background)',
                borderColor: 'var(--theme-stats)',
                color: 'var(--theme-typebox)'
              }}
            >
              <CardHeader className="text-center">
                <CardTitle style={{ color: 'var(--theme-title)' }}>Welcome back</CardTitle>
                <CardDescription style={{ color: 'var(--theme-stats)' }}>Sign in to your account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Social Login Buttons */}
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={handleGoogleSignIn}
                    disabled={isLoading}
                    style={{ 
                      borderColor: 'var(--theme-stats)',
                      color: 'var(--theme-typebox)',
                      backgroundColor: 'transparent'
                    }}
                  >
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Continue with Google
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={handleGithubSignIn}
                    disabled={isLoading}
                    style={{ 
                      borderColor: 'var(--theme-stats)',
                      color: 'var(--theme-typebox)',
                      backgroundColor: 'transparent'
                    }}
                  >
                    <Github className="w-4 h-4 mr-2" />
                    Continue with GitHub
                  </Button>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" style={{ borderColor: 'var(--theme-stats)' }} />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span 
                      className="px-2" 
                      style={{ 
                        backgroundColor: 'var(--theme-background)', 
                        color: 'var(--theme-stats)' 
                      }}
                    >
                      or
                    </span>
                  </div>
                </div>

                {/* Email/Password Form */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" style={{ color: 'var(--theme-typebox)' }}>Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="Enter your email"
                      style={{ 
                        backgroundColor: 'var(--theme-background)',
                        borderColor: 'var(--theme-stats)',
                        color: 'var(--theme-typebox)'
                      }}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password" style={{ color: 'var(--theme-typebox)' }}>Password</Label>
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="Enter your password"
                      style={{ 
                        backgroundColor: 'var(--theme-background)',
                        borderColor: 'var(--theme-stats)',
                        color: 'var(--theme-typebox)'
                      }}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="remember" />
                      <Label htmlFor="remember" className="text-sm" style={{ color: 'var(--theme-typebox)' }}>Remember me</Label>
                    </div>
                    <Link 
                      to="/forgot-password" 
                      className="text-sm hover:underline"
                      style={{ color: 'var(--theme-title)' }}
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <Button 
                    className="w-full"
                    style={{ 
                      backgroundColor: 'var(--theme-title)',
                      color: 'var(--theme-background)'
                    }}
                  >
                    Sign in
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Register Tab */}
          <TabsContent value="register">
            <Card 
              style={{ 
                backgroundColor: 'var(--theme-background)',
                borderColor: 'var(--theme-stats)',
                color: 'var(--theme-typebox)'
              }}
            >
              <CardHeader className="text-center">
                <CardTitle style={{ color: 'var(--theme-title)' }}>Create account</CardTitle>
                <CardDescription style={{ color: 'var(--theme-stats)' }}>Get started with TypeFlow</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Social Registration */}
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={handleGoogleSignIn}
                    disabled={isLoading}
                    style={{ 
                      borderColor: 'var(--theme-stats)',
                      color: 'var(--theme-typebox)',
                      backgroundColor: 'transparent'
                    }}
                  >
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Sign up with Google
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={handleGithubSignIn}
                    disabled={isLoading}
                    style={{ 
                      borderColor: 'var(--theme-stats)',
                      color: 'var(--theme-typebox)',
                      backgroundColor: 'transparent'
                    }}
                  >
                    <Github className="w-4 h-4 mr-2" />
                    Sign up with GitHub
                  </Button>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" style={{ borderColor: 'var(--theme-stats)' }} />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span 
                      className="px-2" 
                      style={{ 
                        backgroundColor: 'var(--theme-background)', 
                        color: 'var(--theme-stats)' 
                      }}
                    >
                      or
                    </span>
                  </div>
                </div>

                {/* Registration Form */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username" style={{ color: 'var(--theme-typebox)' }}>Username</Label>
                    <Input 
                      id="username" 
                      placeholder="Choose a username"
                      style={{ 
                        backgroundColor: 'var(--theme-background)',
                        borderColor: 'var(--theme-stats)',
                        color: 'var(--theme-typebox)'
                      }}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="reg-email" style={{ color: 'var(--theme-typebox)' }}>Email</Label>
                    <Input 
                      id="reg-email" 
                      type="email" 
                      placeholder="Enter your email"
                      style={{ 
                        backgroundColor: 'var(--theme-background)',
                        borderColor: 'var(--theme-stats)',
                        color: 'var(--theme-typebox)'
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="verify-email" style={{ color: 'var(--theme-typebox)' }}>Verify Email</Label>
                    <Input 
                      id="verify-email" 
                      type="email" 
                      placeholder="Confirm your email"
                      style={{ 
                        backgroundColor: 'var(--theme-background)',
                        borderColor: 'var(--theme-stats)',
                        color: 'var(--theme-typebox)'
                      }}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="reg-password" style={{ color: 'var(--theme-typebox)' }}>Password</Label>
                    <Input 
                      id="reg-password" 
                      type="password" 
                      placeholder="Create a password"
                      style={{ 
                        backgroundColor: 'var(--theme-background)',
                        borderColor: 'var(--theme-stats)',
                        color: 'var(--theme-typebox)'
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="verify-password" style={{ color: 'var(--theme-typebox)' }}>Verify Password</Label>
                    <Input 
                      id="verify-password" 
                      type="password" 
                      placeholder="Confirm your password"
                      style={{ 
                        backgroundColor: 'var(--theme-background)',
                        borderColor: 'var(--theme-stats)',
                        color: 'var(--theme-typebox)'
                      }}
                    />
                  </div>

                  <Button 
                    className="w-full"
                    style={{ 
                      backgroundColor: 'var(--theme-title)',
                      color: 'var(--theme-background)'
                    }}
                  >
                    Sign up
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Login;
