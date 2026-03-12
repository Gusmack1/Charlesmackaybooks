# Google Search Console – DNS Verification for charlesmackaybooks.com

## Status

- **Property:** https://charlesmackaybooks.com/ (URL prefix)
- **Verification code:** `google-site-verification=GuJLIULWrnOetGcEUeS_o43Iqknv6ptnbmQ4rn8Hy-s`
- **DNS provider:** Netlify (domains+netlify.netlify.com)

## Add the TXT record

1. Log in to [Netlify](https://app.netlify.com/).
2. Go to **Domain management** → **DNS** (or **Domains** → select your site → **DNS**).
3. Add a new DNS record:
   - **Type:** `TXT`
   - **Host/Name:** `@` (or leave blank for root)
   - **Value:** `google-site-verification=GuJLIULWrnOetGcEUeS_o43Iqknv6ptnbmQ4rn8Hy-s`
4. Save the record.
5. Wait 5–15 minutes for DNS propagation.
6. In [Google Search Console](https://search.google.com/search-console/ownership?resource_id=https%3A%2F%2Fcharlesmackaybooks.com%2F), open **Domain name provider** → **Verify**.

## Verify

After adding the record, run:

```powershell
Resolve-DnsName -Name charlesmackaybooks.com -Type TXT
```

You should see the `google-site-verification=...` record in the output.
