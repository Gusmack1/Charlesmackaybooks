'use client';

import { useState } from 'react';

interface Comment {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: Date;
  institution?: string;
  expertise?: string;
}

interface CommentSystemProps {
  postSlug: string;
  postTitle: string;
}

export default function CommentSystem({ postSlug, postTitle }: CommentSystemProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [institution, setInstitution] = useState('');
  const [expertise, setExpertise] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!message.trim()) newErrors.message = 'Comment is required';
    if (message.trim().length < 20) newErrors.message = 'Comment must be at least 20 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Create new comment
      const newComment: Comment = {
        id: Date.now().toString(),
        name,
        email,
        message,
        timestamp: new Date(),
        institution: institution || undefined,
        expertise: expertise || undefined
      };

      // Add to local state (in production, this would save to database)
      setComments(prev => [newComment, ...prev]);

      // Send email notification to Charles
      const emailBody = `
New Comment on "${postTitle}"

Post: ${postSlug}
From: ${name} (${email})
${institution ? `Institution: ${institution}` : ''}
${expertise ? `Expertise: ${expertise}` : ''}

Comment:
${message}

---
Posted on Charles MacKay Aviation Books website
Time: ${new Date().toLocaleString()}
      `.trim();

      const subject = `New Comment: ${postTitle}`;
      const mailto = `mailto:charlese1mackay@hotmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

      // Open email client (silent for comment notification)
      window.open(mailto, '_blank');

      // Reset form
      setName('');
      setEmail('');
      setInstitution('');
      setExpertise('');
      setMessage('');
      setErrors({});
      setIsFormOpen(false);

    } catch (error) {
      console.error('Error submitting comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    return timestamp.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="mt-12 border-t border-gray-200 pt-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900">
            Aviation Discussion ({comments.length})
          </h3>
          <button
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="bg-[#2a384a] text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
          >
            {isFormOpen ? 'Cancel' : '💬 Join Discussion'}
          </button>
        </div>

        {/* Comment Form */}
        {isFormOpen && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
            <h4 className="text-lg font-semibold mb-4">Share Your Aviation Knowledge</h4>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {setName(e.target.value); if (errors.name) setErrors(prev => ({...prev, name: ''}));}}
                    disabled={isSubmitting}
                    className={`w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                      errors.name ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                    } ${isSubmitting ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                    placeholder="Your name"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Email *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {setEmail(e.target.value); if (errors.email) setErrors(prev => ({...prev, email: ''}));}}
                    disabled={isSubmitting}
                    className={`w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                      errors.email ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                    } ${isSubmitting ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                    placeholder="your.email@domain.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  <p className="text-xs text-gray-500 mt-1">Email won't be displayed publicly</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Institution (Optional)</label>
                  <input
                    type="text"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    disabled={isSubmitting}
                    className={`w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      isSubmitting ? 'bg-gray-100 cursor-not-allowed' : ''
                    }`}
                    placeholder="University, Museum, Organization"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Area of Expertise (Optional)</label>
                  <input
                    type="text"
                    value={expertise}
                    onChange={(e) => setExpertise(e.target.value)}
                    disabled={isSubmitting}
                    className={`w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      isSubmitting ? 'bg-gray-100 cursor-not-allowed' : ''
                    }`}
                    placeholder="WWI Aviation, Pilot Training, etc."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Your Comment *</label>
                <textarea
                  value={message}
                  onChange={(e) => {setMessage(e.target.value); if (errors.message) setErrors(prev => ({...prev, message: ''}));}}
                  disabled={isSubmitting}
                  rows={4}
                  className={`w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                    errors.message ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                  } ${isSubmitting ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                  placeholder="Share your insights, corrections, additional information, or questions about this aviation topic..."
                />
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                <p className="text-xs text-gray-400 mt-1">{message.length}/20 characters minimum</p>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition-colors"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-4 py-2 rounded transition-colors font-medium ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed text-gray-200'
                      : 'bg-[#2a384a] text-white hover:bg-gray-800'
                  }`}
                >
                  {isSubmitting ? 'Posting...' : 'Post Comment'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Comments List */}
        <div className="space-y-6">
          {comments.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <div className="text-4xl mb-4">✈️</div>
              <p className="text-lg font-medium">Be the first to join the discussion!</p>
              <p className="text-sm">Share your aviation knowledge and insights about this topic.</p>
            </div>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold text-gray-900">{comment.name}</h4>
                      {comment.institution && (
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          {comment.institution}
                        </span>
                      )}
                      {comment.expertise && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                          {comment.expertise}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{formatTimestamp(comment.timestamp)}</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{comment.message}</p>
              </div>
            ))
          )}
        </div>

        {/* Guidelines */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 mb-2">Discussion Guidelines</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Share factual information and cite sources when possible</li>
            <li>• Respect different perspectives and maintain professional discourse</li>
            <li>• Focus on aviation history, technical details, and educational content</li>
            <li>• Charles MacKay may respond to comments and correct any historical inaccuracies</li>
          </ul>
        </div>
      </div>
    </div>
  );
}