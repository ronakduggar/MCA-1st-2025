import Head from "next/head";

export default function SEO({
  title,
  description = "A small Todo app built for MCA course — stores items in your browser.",
  url = "",
  image = "",
  type = "website",
  children,
}) {
  const siteName = "MCA Next";
  const fullTitle = title ? `${title} | ${siteName}` : siteName;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: url || undefined,
    description,
  };

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      {url && <meta property="og:url" content={url} />}
      {image && <meta property="og:image" content={image} />}

      {/* Twitter */}
      <meta
        name="twitter:card"
        content={image ? "summary_large_image" : "summary"}
      />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}

      {/* Canonical fallback */}
      {url && <link rel="canonical" href={url} />}

      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {children}
    </Head>
  );
}
