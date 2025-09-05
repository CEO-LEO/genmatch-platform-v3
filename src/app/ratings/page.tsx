'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Star, 
  MessageSquare, 
  CheckCircle, 
  Clock,
  User,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';

export default function RatingsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const taskId = searchParams.get('taskId');
  
  const [ratings, setRatings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showRatingForm, setShowRatingForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState('');
  const [category, setCategory] = useState('QUALITY');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Disable page by redirecting immediately per product policy
  if (typeof window !== 'undefined') {
    router.replace('/dashboard');
  }
  return null;
}
