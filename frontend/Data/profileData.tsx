
"use client";

import { useEffect, useState } from "react";
import { getProfile } from "@/lib/api";

export const useProfileData = () => {
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState<any>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getProfile();
                setProfile(data);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    return { loading, ...profile };
};
