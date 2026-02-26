import { Helmet } from "react-helmet";

function SEO({ title, description }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Social Sharing */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />

      {/* Theme Color */}
      <meta name="theme-color" content="#00ffd5" />
    </Helmet>
  );
}

export default SEO;
