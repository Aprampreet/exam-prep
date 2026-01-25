
"use client";

import React, { useState, useEffect } from "react";
import { useProfileData } from "@/Data/profileData";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Loader2, MapPin, GraduationCap, Calendar, Mail, Phone, Edit2, Check, X, Camera, User, BookOpen, Clock } from "lucide-react";
import { updateProfile } from "@/lib/api";
import { useAuth } from "@/lib/context/AuthContext";
import { Textarea } from "@/components/ui/textarea";
import { getProfileTabs } from "@/lib/api";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function ProfilePage() {
  const { loading, full_name, email, phone_number, bio, college, location, degree, passing_year, avatar_url } = useProfileData();
  const { refreshUser } = useAuth();
  
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState<any>({});
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [stats, setStats] = useState<any>({});

  const loadData = async () => {
      try {
        const [statsData] = await Promise.all([
            getProfileTabs()
        ]);
        setStats(statsData);
      } catch (error) {
        console.error("Failed to load dashboard data", error);
      }
    };

    useEffect(() => {
      loadData();
    }, []);

  const handleStartEdit = () => {
    setFormData({
      full_name: full_name || "",
      bio: bio || "",
      college: college || "",
      location: location || "",
      degree: degree || "",
      passing_year: passing_year || "",
      phone_number: phone_number || "",
    });
    setPreviewUrl(null);
    setAvatarFile(null);
    setIsSheetOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const dataToSend = new FormData();
      Object.keys(formData).forEach(key => {
         if (formData[key] !== null) {
             dataToSend.append(key, formData[key]); 
         }
      });
      
      if (avatarFile) {
        dataToSend.append("avatar", avatarFile);
      }

      await updateProfile(dataToSend);
      await refreshUser(); 
      setIsSheetOpen(false);
    } catch (error) {
      console.error("Failed to update profile", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[80vh] w-full items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  const initials = (full_name || email || "U")
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  // Calculate generic profile completion
  const requiredFields = [full_name, bio, college, location, degree, phone_number];
  const filledFields = requiredFields.filter(Boolean).length;
  const completionPercentage = Math.round((filledFields / requiredFields.length) * 100);

  return (
    <div className="container mx-auto py-10 px-4 md:px-8 max-w-7xl animate-in fade-in duration-500">
      
      {/* Profile Header Card */}
      <div className="relative mb-10">
        <div className="bg-card rounded-3xl border shadow-sm overflow-hidden">
             {/* Simple Banner */}
             <div className="h-32 md:h-48 bg-muted/50 w-full relative">
                 <div className="absolute inset-0 bg-[radial-gradient(#00000010_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>
             </div>
             
             <div className="px-8 pb-8">
                 <div className="relative flex flex-col md:flex-row gap-6 items-end -mt-16 md:-mt-20 z-10">
                    <Avatar className="h-32 w-32 md:h-40 md:w-40 border-4 border-card shadow-xl">
                        <AvatarImage src={avatar_url} alt={full_name} className="object-cover" />
                        <AvatarFallback className="text-4xl bg-muted text-muted-foreground font-bold">{initials}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 space-y-2 mb-2 text-center md:text-left">
                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                                {full_name || "User Profile"}
                            </h1>
                            <Badge variant="secondary" className="w-fit mx-auto md:mx-0 rounded-full px-3">Student Account</Badge>
                        </div>
                        <p className="text-muted-foreground">{bio || "Welcome to your personal dashboard."}</p>
                        
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-muted-foreground pt-1">
                            <div className="flex items-center gap-1.5">
                                <Mail className="h-4 w-4" /> {email}
                            </div>
                            {location && (
                                <div className="flex items-center gap-1.5">
                                    <MapPin className="h-4 w-4" /> {location}
                                </div>
                            )}
                             {college && (
                                <div className="flex items-center gap-1.5">
                                    <GraduationCap className="h-4 w-4" /> {college}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex gap-2 w-full md:w-auto mt-4 md:mt-0">
                       <Button onClick={handleStartEdit} className="w-full md:w-auto gap-2 shadow-sm">
                            <Edit2 className="h-4 w-4" /> Edit Profile
                       </Button>
                    </div>
                 </div>
             </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <div className="flex items-center justify-between mb-6">
            <TabsList className="bg-muted/50 p-1">
                <TabsTrigger value="overview" className="px-6">Overview</TabsTrigger>
                <TabsTrigger value="history" className="px-6">History</TabsTrigger>
                <TabsTrigger value="settings" className="px-6">Settings</TabsTrigger>
            </TabsList>
            
             <Button variant="outline" size="sm" onClick={loadData} disabled={loading} className="hidden md:flex">
                <Loader2 className={`mr-2 h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
                Refresh Data
            </Button>
        </div>

        <TabsContent value="overview" className="space-y-8 animate-in fade-in duration-500">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="bg-gradient-to-br from-blue-500/5 to-purple-500/5 border-primary/10 hover:border-primary/20 transition-all hover:shadow-md group">
                        <CardContent className="flex flex-col items-center justify-center p-6">
                            <span className="text-4xl font-bold text-foreground group-hover:scale-110 transition-transform duration-500">{stats.total_sessions || 0}</span>
                            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider mt-2">Total Sessions</span>
                        </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-emerald-500/5 to-teal-500/5 border-primary/10 hover:border-primary/20 transition-all hover:shadow-md group">
                        <CardContent className="flex flex-col items-center justify-center p-6">
                            <span className="text-4xl font-bold text-foreground group-hover:scale-110 transition-transform duration-500">{stats.avg_mcq_score || 0}%</span>
                            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider mt-2">Avg. MCQ Score</span>
                        </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-orange-500/5 to-red-500/5 border-primary/10 hover:border-primary/20 transition-all hover:shadow-md group">
                        <CardContent className="flex flex-col items-center justify-center p-6">
                            <span className="text-4xl font-bold text-foreground group-hover:scale-110 transition-transform duration-500">{Math.round((stats.avg_short_score || 0) * 10) / 10}</span>
                            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider mt-2">Short Answer Avg.</span>
                        </CardContent>
                    </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left Column: Stats & Completion */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg font-medium">Profile Completion</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-end justify-between mb-2">
                                <span className="text-3xl font-bold">{completionPercentage}%</span>
                                <span className="text-xs text-muted-foreground mb-1">Set up your account</span>
                            </div>
                            <Progress value={completionPercentage} className="h-2" />
                            <p className="text-xs text-muted-foreground mt-3">
                                Complete your profile to unlock verified badges and improved recommendations.
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Detailed Info */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="h-full border-none shadow-none bg-transparent">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-6 rounded-2xl border bg-card/60 space-y-4">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                        <User className="h-5 w-5" />
                                    </div>
                                    <h3 className="font-semibold text-lg">Personal Details</h3>
                                </div>
                                <Separator />
                                <div className="grid gap-4">
                                    <div className="grid gap-1">
                                        <span className="text-xs font-medium text-muted-foreground uppercase">Display Name</span>
                                        <span className="font-medium">{full_name || "N/A"}</span>
                                    </div>
                                    <div className="grid gap-1">
                                        <span className="text-xs font-medium text-muted-foreground uppercase">Bio</span>
                                        <p className="text-sm leading-relaxed text-muted-foreground">{bio || "No bio description."}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 rounded-2xl border bg-card/60 space-y-4">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                        <GraduationCap className="h-5 w-5" />
                                    </div>
                                    <h3 className="font-semibold text-lg">Academic Info</h3>
                                </div>
                                <Separator />
                                <div className="grid gap-4">
                                    <div className="grid gap-1">
                                        <span className="text-xs font-medium text-muted-foreground uppercase">Institution</span>
                                        <span className="font-medium">{college || "N/A"}</span>
                                    </div>
                                    <div className="grid gap-1">
                                        <span className="text-xs font-medium text-muted-foreground uppercase">Degree</span>
                                        <span className="font-medium">{degree || "N/A"}</span>
                                    </div>
                                    <div className="grid gap-1">
                                        <span className="text-xs font-medium text-muted-foreground uppercase">Passing Year</span>
                                        <span className="font-medium">{passing_year || "N/A"}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </TabsContent>

        <TabsContent value="history">
            <Card className="min-h-[300px] flex flex-col items-center justify-center text-muted-foreground border-dashed">
                <Clock className="h-10 w-10 mb-4 opacity-20" />
                <p>Session history feature coming soon.</p>
            </Card>
        </TabsContent>
        
        <TabsContent value="settings">
             <Card className="min-h-[300px] flex flex-col items-center justify-center text-muted-foreground border-dashed">
                <div className="p-4 rounded-full bg-muted mb-4"><User className="h-6 w-6" /></div>
                <p>Account settings coming soon.</p>
            </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Profile Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="overflow-y-auto w-full sm:max-w-md">
          <SheetHeader className="mb-6">
            <SheetTitle>Edit Profile</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when you're done.
            </SheetDescription>
          </SheetHeader>
          
          <div className="space-y-6 p-10">
             <div className="flex flex-col items-center gap-4">
                  <div className="relative group cursor-pointer">
                      <Avatar className="h-24 w-24">
                          <AvatarImage src={previewUrl || avatar_url} />
                          <AvatarFallback>{initials}</AvatarFallback>
                      </Avatar>
                      <label htmlFor="sheet-avatar-upload" className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-white">
                          <Camera className="h-6 w-6" />
                          <input id="sheet-avatar-upload" type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                      </label>
                  </div>
                  <span className="text-xs text-muted-foreground">Click to change photo</span>
             </div>

             <div className="space-y-4">
                 <div className="space-y-2">
                     <Label>Full Name</Label>
                     <Input name="full_name" value={formData.full_name} onChange={handleInputChange} />
                 </div>
                 
                 <div className="space-y-2">
                     <Label>Bio</Label>
                     <Textarea name="bio" value={formData.bio} onChange={handleInputChange} className="resize-none h-20" />
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                         <Label>Phone</Label>
                         <Input name="phone_number" value={formData.phone_number} onChange={handleInputChange} />
                     </div>
                     <div className="space-y-2">
                         <Label>Location</Label>
                         <Input name="location" value={formData.location} onChange={handleInputChange} />
                     </div>
                 </div>

                 <div className="space-y-2">
                     <Label>College / University</Label>
                     <Input name="college" value={formData.college} onChange={handleInputChange} />
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                         <Label>Degree</Label>
                         <Input name="degree" value={formData.degree} onChange={handleInputChange} />
                     </div>
                     <div className="space-y-2">
                         <Label>Year</Label>
                         <Input name="passing_year" type="number" value={formData.passing_year} onChange={handleInputChange} />
                     </div>
                 </div>
             </div>
          </div>

          <SheetFooter className="mt-8">
             <Button variant="outline" onClick={() => setIsSheetOpen(false)} disabled={saving}>Cancel</Button>
             <Button onClick={handleSave} disabled={saving}>
                {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
             </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
