import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  type?: 'website' | 'article';
  name?: string;
  image?: string;
  keywords?: string;
}

export const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  canonical, 
  type = 'website', 
  name = 'Gamersology', 
  image = 'https://i.postimg.cc/Df5sxZM9/Chat-GPT-Image-Nov-5-2025-07-13-29-PM-(1).png',
  keywords
}) => {
  const siteUrl = 'https://gamersology.com';
  const url = canonical ? `${siteUrl}${canonical}` : siteUrl;
  const fullTitle = `${title} | Gamersology`;

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={name} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Structured Data (JSON-LD) for Rich Snippets */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": type === 'article' ? 'Article' : 'WebSite',
          "name": name,
          "url": url,
          "description": description,
          "image": image,
          "publisher": {
            "@type": "Organization",
            "name": "Gamersology",
            "logo": {
              "@type": "ImageObject",
              "url": "https://i.postimg.cc/Df5sxZM9/Chat-GPT-Image-Nov-5-2025-07-13-29-PM-(1).png"
            }
          }
        })}
      </script>
    </Helmet>
  );
};
