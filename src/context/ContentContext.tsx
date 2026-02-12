import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

// Define types based on our data.json structure
interface HeaderData {
    logoLight: string;
    logoDark: string;
    links: { label: string; url: string }[];
}

interface HeroData {
    videoUrl: string;
    posterUrl: string;
    titleLine1: string;
    titleLine2: string;
}

interface WorkItem {
    id: number;
    title: string;
    category: string;
    image: string;
    link: string;
}

interface SiteData {
    header: HeaderData;
    hero: HeroData;
    works: WorkItem[];
}

interface ContentContextType {
    data: SiteData | null;
    loading: boolean;
    error: string | null;
    refreshData: () => Promise<void>;
    updateData: (newData: SiteData) => Promise<void>;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider = ({ children }: { children: ReactNode }) => {
    const [data, setData] = useState<SiteData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:8000/api/content/');
            setData(response.data);
            setError(null);
        } catch (err) {
            console.error('Failed to fetch content:', err);
            setError('Failed to load site content');
        } finally {
            setLoading(false);
        }
    };

    const updateData = async (_newData: SiteData) => {
        // For Django CMS, we use the Admin panel
        console.warn("Please use Django Admin to update content: http://localhost:8000/admin");
        toast.info("Please use Django Admin to update content");
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <ContentContext.Provider value={{ data, loading, error, refreshData: fetchData, updateData }}>
            {children}
        </ContentContext.Provider>
    );
};

export const useContent = () => {
    const context = useContext(ContentContext);
    if (context === undefined) {
        throw new Error('useContent must be used within a ContentProvider');
    }
    return context;
};
