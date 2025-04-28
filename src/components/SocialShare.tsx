
import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Mail, 
  Share2, 
  WhatsApp,
  Copy
} from 'lucide-react';

interface SocialShareProps {
  title: string;
  url: string;
}

const SocialShare = ({ title, url }: SocialShareProps) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      name: 'Facebook',
      icon: <Facebook className="w-4 h-4" />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      name: 'Twitter',
      icon: <Twitter className="w-4 h-4" />,
      url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="w-4 h-4" />,
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
    },
    {
      name: 'WhatsApp',
      icon: <WhatsApp className="w-4 h-4" />,
      url: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    },
    {
      name: 'Email',
      icon: <Mail className="w-4 h-4" />,
      url: `mailto:?subject=${encodedTitle}&body=Check%20this%20out:%20${encodedUrl}`,
    },
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      // You can add a toast notification here if you want
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <span className="flex items-center gap-2 text-gray-600">
        <Share2 className="w-4 h-4" />
        Share:
      </span>
      {shareLinks.map((link) => (
        <Button
          key={link.name}
          variant="outline"
          size="sm"
          onClick={() => window.open(link.url, '_blank')}
          className="flex items-center gap-2"
        >
          {link.icon}
        </Button>
      ))}
      <Button
        variant="outline"
        size="sm"
        onClick={copyToClipboard}
        className="flex items-center gap-2"
      >
        <Copy className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default SocialShare;
