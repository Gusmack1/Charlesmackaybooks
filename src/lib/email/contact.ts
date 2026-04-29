// Contact form email — single source of truth.
// Renders the message Charles & Angus receive at info@charlesmackaybooks.com
// when a visitor submits the /contact form. Plain-text + minimal HTML, warm tone,
// no em or en dashes anywhere in customer-facing copy.

export interface ContactEmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: string; // ISO string
  ipHint?: string;     // optional, for spam triage
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function renderContactSubject(d: ContactEmailData): string {
  const cleaned = d.subject.trim().slice(0, 160);
  return `[Contact] ${cleaned}`;
}

export function renderContactText(d: ContactEmailData): string {
  const sep = '----------------------------------------------------------------------';
  const lines: string[] = [];
  lines.push(`Subject: ${renderContactSubject(d)}`, '');
  lines.push(sep, 'NEW MESSAGE FROM CHARLESMACKAYBOOKS.COM', sep, '');
  lines.push(`From: ${d.name} <${d.email}>`);
  lines.push(`Topic: ${d.subject}`);
  lines.push(`Sent: ${d.submittedAt}`);
  if (d.ipHint) lines.push(`IP hint: ${d.ipHint}`);
  lines.push('', sep, 'MESSAGE', sep, '');
  lines.push(d.message, '');
  lines.push(sep, '');
  lines.push('Reply directly to this email to respond. The visitor address is set as');
  lines.push('reply_to so your reply will go to them, not back to orders@.');
  lines.push('');
  lines.push('Cheers,', 'Charles & Angus');
  return lines.join('\n');
}

export function renderContactHtml(d: ContactEmailData): string {
  const subject = renderContactSubject(d);
  const messageHtml = escapeHtml(d.message).replace(/\n/g, '<br>');
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(subject)}</title>
  </head>
  <body style="margin:0; padding:0; background:#f7f3ea; font-family:Arial, Helvetica, sans-serif; color:#1a2a44;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f7f3ea;">
      <tr><td align="center" style="padding:24px 12px;">
        <table role="presentation" width="640" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:640px; background:#ffffff; border:1px solid #e6dfce;">
          <tr><td style="background:#1a2a44; padding:20px 28px;">
            <p style="margin:0; font-family:Georgia, 'Times New Roman', serif; font-size:20px; line-height:26px; color:#C8A951;">Charles MacKay Books</p>
            <p style="margin:4px 0 0 0; font-size:13px; line-height:18px; color:#f7f3ea;">New contact form message</p>
          </td></tr>
          <tr><td style="padding:24px 28px 8px 28px;">
            <p style="margin:0 0 6px 0; font-size:14px; line-height:21px; color:#5a6172;">From</p>
            <p style="margin:0 0 16px 0; font-size:16px; line-height:22px; color:#1a2a44;"><strong>${escapeHtml(d.name)}</strong> &lt;<a href="mailto:${escapeHtml(d.email)}" style="color:#1a2a44;">${escapeHtml(d.email)}</a>&gt;</p>
            <p style="margin:0 0 6px 0; font-size:14px; line-height:21px; color:#5a6172;">Topic</p>
            <p style="margin:0 0 16px 0; font-size:16px; line-height:22px; color:#1a2a44;">${escapeHtml(d.subject)}</p>
            <p style="margin:0 0 6px 0; font-size:14px; line-height:21px; color:#5a6172;">Sent</p>
            <p style="margin:0 0 16px 0; font-size:14px; line-height:21px; color:#1a2a44;">${escapeHtml(d.submittedAt)}${d.ipHint ? ` &middot; IP hint ${escapeHtml(d.ipHint)}` : ''}</p>
          </td></tr>
          <tr><td style="padding:8px 28px 0 28px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-top:1px solid #e6dfce; font-size:0; line-height:0;">&nbsp;</td></tr></table></td></tr>
          <tr><td style="padding:20px 28px 8px 28px;">
            <h2 style="margin:0 0 12px 0; font-family:Georgia, 'Times New Roman', serif; font-size:18px; line-height:24px; font-weight:normal; color:#1a2a44;">Message</h2>
            <div style="background:#f7f3ea; border:1px solid #e6dfce; border-radius:4px; padding:16px 18px; font-size:15px; line-height:22px; color:#1a2a44; white-space:pre-wrap;">${messageHtml}</div>
          </td></tr>
          <tr><td style="padding:24px 28px 28px 28px;">
            <p style="margin:0 0 12px 0; font-size:14px; line-height:21px; color:#5a6172;">Reply directly to this email to respond. The visitor address is set as reply_to, so your reply goes to them, not back to orders@.</p>
            <p style="margin:0; font-family:Georgia, 'Times New Roman', serif; font-size:15px; line-height:22px; color:#1a2a44;">Cheers,<br>Charles &amp; Angus</p>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;
}

export function renderContact(d: ContactEmailData): { subject: string; html: string; text: string } {
  return {
    subject: renderContactSubject(d),
    html: renderContactHtml(d),
    text: renderContactText(d),
  };
}
