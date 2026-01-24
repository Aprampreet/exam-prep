
"use client";

import React, { useState,useEffect } from "react";
import { useProfileData } from "@/Data/profileData";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Loader2, MapPin, GraduationCap, Calendar, Mail, Phone, Edit2, Check, X, Camera } from "lucide-react";
import { updateProfile } from "@/lib/api";
import { useAuth } from "@/lib/context/AuthContext";
import { Textarea } from "@/components/ui/textarea";
import { getProfileTabs } from "@/lib/api";

export default function ProfilePage() {
  const { loading, full_name, email, phone_number, bio, college, location, degree, passing_year, avatar_url } = useProfileData();
  const { refreshUser } = useAuth();
  const [updating, setUpdating] = useState(false);
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
    });
    setPreviewUrl(null);
    setAvatarFile(null);
    setUpdating(true);
  };

  const handleCancelEdit = () => {
    setUpdating(false);
    setFormData({});
    setAvatarFile(null);
    setPreviewUrl(null);
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
      setUpdating(false);
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

  return (
    <div className="container mx-auto py-10 px-4 md:px-8 max-w-6xl animate-in fade-in duration-500">
      
      {/* Profile Header */}
      <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-6 mb-12 p-8 rounded-3xl bg-gradient-to-br from-background via-muted/30 to-muted/50 border shadow-sm">
         <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative group">
                <Avatar className="h-32 w-32 md:h-40 md:w-40 border-4 border-background shadow-2xl ring-2 ring-border/20">
                    <AvatarImage src={previewUrl || avatar_url} alt={full_name} className="object-cover" />
                    <AvatarFallback className="text-4xl bg-primary/10 text-primary font-bold">{initials}</AvatarFallback>
                </Avatar>
                {updating && (
                     <label htmlFor="avatar-upload" className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer text-white backdrop-blur-sm">
                        <Camera className="h-8 w-8" />
                        <input id="avatar-upload" type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                     </label>
                )}
            </div>
            
            <div className="text-center md:text-left space-y-2">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                    {full_name || "User"}
                </h1>
                <div className="flex flex-col md:flex-row items-center gap-3 text-muted-foreground">
                    <div className="flex items-center gap-1.5 bg-background/50 px-3 py-1 rounded-full border border-border/50">
                        <Mail className="h-3.5 w-3.5" />
                        <span className="text-sm font-medium">{email}</span>
                    </div>
                    {phone_number && (
                         <div className="flex items-center gap-1.5 bg-background/50 px-3 py-1 rounded-full border border-border/50">
                            <Phone className="h-3.5 w-3.5" />
                            <span className="text-sm font-medium">{phone_number}</span>
                        </div>
                    )}
                </div>
            </div>
         </div>

         <div className="flex gap-2">
            {updating ? (
                <div className="flex items-center gap-2 bg-background/80 backdrop-blur-sm p-1.5 rounded-full border shadow-sm">
                    <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full" onClick={handleCancelEdit} disabled={saving}>
                        <X className="h-4 w-4" /> 
                    </Button>
                    <Button size="sm" className="rounded-full px-4" onClick={handleSave} disabled={saving}>
                        {saving ? <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" /> : <Check className="mr-2 h-3.5 w-3.5" />}
                        Save Changes
                    </Button>
                </div>
            ) : (
                <Button variant="outline" className="rounded-full border-primary/20 hover:bg-primary/5 hover:text-primary hover:border-primary/50 transition-all shadow-sm" onClick={handleStartEdit}>
                    <Edit2 className="mr-2 h-3.5 w-3.5" /> Edit Profile
                </Button>
            )}
         </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
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
        
        {/* Left Column: Personal Bio & Contact */}
        <div className="lg:col-span-1 space-y-6">
            <Card className="border shadow-none bg-background/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-lg">About Me</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                     {updating ? (
                         <Textarea 
                            name="bio"
                            placeholder="Tell us about yourself..." 
                            value={formData.bio} 
                            onChange={handleInputChange} 
                            className="min-h-[120px] resize-none bg-white/50"
                         />
                     ) : (
                        <p className="text-sm text-muted-foreground leading-relaxed italic">
                            "{bio || "No bio added yet."}"
                        </p>
                     )}
                     
                     <Separator className="my-4" />
                     
                     <div className="space-y-3">
                         <div className="flex items-center gap-3">
                            <div className="bg-muted p-2 rounded-full">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                            </div>
                            {updating ? (
                                <Input 
                                    name="location"
                                    placeholder="City, Country"
                                    value={formData.location} 
                                    onChange={handleInputChange} 
                                    className="h-8 text-sm"
                                />
                            ) : (
                                <span className="text-sm font-medium">{location || "Location not set"}</span>
                            )}
                         </div>
                     </div>
                </CardContent>
            </Card>
        </div>

        {/* Right Column: Academic & Details */}
        <div className="lg:col-span-2 space-y-6">
             <Card className="border shadow-none bg-background/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-lg">Academic Information</CardTitle>
                    <CardDescription>Your educational background</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                             <Label className="text-xs uppercase text-muted-foreground font-semibold">College / University</Label>
                             {updating ? (
                                 <Input 
                                    name="college"
                                    value={formData.college} 
                                    onChange={handleInputChange} 
                                 />
                             ) : (
                                 <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/30 border border-border/50">
                                     <GraduationCap className="h-5 w-5 text-primary/70" />
                                     <span className="font-medium">{college || "Not Set"}</span>
                                 </div>
                             )}
                        </div>

                         <div className="space-y-2">
                             <Label className="text-xs uppercase text-muted-foreground font-semibold">Degree / Major</Label>
                             {updating ? (
                                 <Input 
                                    name="degree"
                                    value={formData.degree} 
                                    onChange={handleInputChange} 
                                 />
                             ) : (
                                 <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/30 border border-border/50">
                                     <GraduationCap className="h-5 w-5 text-primary/70" />
                                     <span className="font-medium">{degree || "Not Set"}</span>
                                 </div>
                             )}
                        </div>

                        <div className="space-y-2">
                             <Label className="text-xs uppercase text-muted-foreground font-semibold">Passing Year</Label>
                             {updating ? (
                                 <Input 
                                    name="passing_year"
                                    type="number"
                                    value={formData.passing_year} 
                                    onChange={handleInputChange} 
                                 />
                             ) : (
                                 <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/30 border border-border/50">
                                     <Calendar className="h-5 w-5 text-primary/70" />
                                     <span className="font-medium">{passing_year || "Not Set"}</span>
                                 </div>
                             )}
                        </div>
                        
                        <div className="space-y-2">
                             <Label className="text-xs uppercase text-muted-foreground font-semibold">Full Name</Label>
                              {updating ? (
                                 <Input 
                                    name="full_name"
                                    value={formData.full_name} 
                                    onChange={handleInputChange} 
                                 />
                             ) : (
                                 <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/30 border border-border/50">
                                    <span className="font-medium">{full_name || "Not Set"}</span>
                                 </div>
                             )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
