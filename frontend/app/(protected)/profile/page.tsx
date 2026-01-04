
"use client";

import React, { useState } from "react";
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

export default function ProfilePage() {
  const { loading, full_name, email, phone, bio, college, location, degree, passing_year, avatar_url, user } = useProfileData();
  const { refreshUser } = useAuth();
  const [updating, setUpdating] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState<any>({});
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

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
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className="container mx-auto py-10 px-4 md:px-8 max-w-5xl animate-in fade-in duration-500">
      
      {/* Header / Cover Area */}
      <div className="relative mb-20 md:mb-24">
         <div className="h-48 md:h-64 w-full rounded-xl bg-gradient-to-r from-neutral-900 to-neutral-800 relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] opacity-20"></div>
         </div>
         
         {/* Profile Avatar & Actions */}
         <div className="absolute -bottom-16 left-6 md:left-10 flex items-end gap-6 group">
            <div className="relative">
                <Avatar className="h-32 w-32 md:h-40 md:w-40 border-4 border-background shadow-xl">
                    <AvatarImage src={previewUrl || avatar_url} alt={full_name} className="object-cover" />
                    <AvatarFallback className="text-4xl bg-secondary text-secondary-foreground">{initials}</AvatarFallback>
                </Avatar>
                {updating && (
                     <label htmlFor="avatar-upload" className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 hover:opacity-100 transition-opacity cursor-pointer text-white">
                        <Camera className="h-8 w-8" />
                        <input id="avatar-upload" type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                     </label>
                )}
            </div>
            
            <div className="mb-4 hidden md:block">
                <h1 className="text-3xl font-bold">{full_name || "User"}</h1>
            </div>
         </div>

         <div className="absolute bottom-4 right-6 md:right-10 flex gap-2">
            {updating ? (
                <>
                    <Button variant="ghost" className="backdrop-blur-sm bg-background/50 text-destructive hover:bg-destructive/10" onClick={handleCancelEdit} disabled={saving}>
                        <X className="h-4 w-4" /> 
                    </Button>
                    <Button className="" onClick={handleSave} disabled={saving}>
                        {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Check className="mr-2 h-4 w-4" />}
                        Save
                    </Button>
                </>
            ) : (
                <Button variant="outline" className="backdrop-blur-sm bg-background/50" onClick={handleStartEdit}>
                    <Edit2 className="mr-2 h-4 w-4" /> Edit Profile
                </Button>
            )}
         </div>
      </div>

      <div className="md:hidden mb-8 px-2">
         <h1 className="text-2xl font-bold">{full_name || "User"}</h1>
         <p className="text-muted-foreground">{email}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Column: Personal Info */}
        <div className="col-span-1 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>About</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                     {updating ? (
                         <Textarea 
                            name="bio"
                            placeholder="Tell us about yourself..." 
                            value={formData.bio} 
                            onChange={handleInputChange} 
                            className="min-h-[100px]"
                         />
                     ) : (
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {bio || "No bio added yet. Tell us about yourself!"}
                        </p>
                     )}
                     
                     <Separator />
                     
                     <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{location || "Location not set"}</span>
                     </div>
                     <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="truncate">{email}</span>
                     </div>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle>Education</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="flex gap-3">
                        <div className="mt-1 bg-primary/10 p-2 rounded-md h-fit">
                             <GraduationCap className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <p className="font-medium">{college || "University not set"}</p>
                            <p className="text-sm text-muted-foreground">{degree || "Degree"}</p>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                                <Calendar className="h-3 w-3" />
                                <span>Class of {passing_year || "N/A"}</span>
                            </div>
                        </div>
                     </div>
                </CardContent>
            </Card>
        </div>

        {/* Right Column: Stats / Activity / Edit Form */}
        <div className="col-span-1 md:col-span-2 space-y-6">
            
            {/* Stats Cards (Static for now) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="flex flex-col items-center justify-center p-6">
                        <span className="text-3xl font-bold">12</span>
                        <span className="text-sm text-muted-foreground">Courses</span>
                    </CardContent>
                </Card>
                <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="flex flex-col items-center justify-center p-6">
                        <span className="text-3xl font-bold">85%</span>
                        <span className="text-sm text-muted-foreground">Avg. Score</span>
                    </CardContent>
                </Card>
                <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="flex flex-col items-center justify-center p-6">
                        <span className="text-3xl font-bold">124</span>
                        <span className="text-sm text-muted-foreground">Hours Studied</span>
                    </CardContent>
                </Card>
            </div>

             <Card>
                <CardHeader>
                    <CardTitle>Profile Details</CardTitle>
                    <CardDescription>Manage your personal information</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                             <Label>Full Name</Label>
                             <Input 
                                name="full_name"
                                value={updating ? formData.full_name : (full_name || "")} 
                                onChange={handleInputChange} 
                                readOnly={!updating} 
                                className={!updating ? "bg-muted/50" : ""} 
                             />
                        </div>
                        <div className="space-y-2">
                             <Label>College / University</Label>
                             <Input 
                                name="college"
                                value={updating ? formData.college : (college || "")} 
                                onChange={handleInputChange} 
                                readOnly={!updating} 
                                className={!updating ? "bg-muted/50" : ""} 
                             />
                        </div>
                         <div className="space-y-2">
                             <Label>Degree</Label>
                             <Input 
                                name="degree"
                                value={updating ? formData.degree : (degree || "")} 
                                onChange={handleInputChange} 
                                readOnly={!updating} 
                                className={!updating ? "bg-muted/50" : ""} 
                             />
                        </div>
                        <div className="space-y-2">
                             <Label>Location</Label>
                             <Input 
                                name="location"
                                value={updating ? formData.location : (location || "")} 
                                onChange={handleInputChange} 
                                readOnly={!updating} 
                                className={!updating ? "bg-muted/50" : ""} 
                             />
                        </div>
                         <div className="space-y-2">
                             <Label>Passing Year</Label>
                             <Input 
                                name="passing_year"
                                type="number"
                                value={updating ? formData.passing_year : (passing_year || "")} 
                                onChange={handleInputChange} 
                                readOnly={!updating} 
                                className={!updating ? "bg-muted/50" : ""} 
                             />
                        </div>
                    </div>
                </CardContent>
            </Card>

        </div>
      </div>
    </div>
  );
}
