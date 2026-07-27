const MEASUREMENT_ID = "G-PDECYVLZLB";

const tagBootstrap = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('set', {
  page_location: window.location.origin + window.location.pathname,
  page_path: window.location.pathname
});
gtag('set', 'ads_data_redaction', true);
`;

const tagConfiguration = `
gtag('js', new Date());
gtag('config', '${MEASUREMENT_ID}', {
  send_page_view: false,
  allow_google_signals: false,
  allow_ad_personalization_signals: false
});
window.__cwlGoogleTagConfigured = true;
`;

export function GoogleTag() {
  if (process.env.NODE_ENV !== "production") return null;

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: tagBootstrap }}
        id="cwl-ga-bootstrap"
      />
      <script
        async
        data-cwl-google-tag="true"
        src={`https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`}
      />
      <script
        dangerouslySetInnerHTML={{ __html: tagConfiguration }}
        id="cwl-ga-config"
      />
    </>
  );
}
