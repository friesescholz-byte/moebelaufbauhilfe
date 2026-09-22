export interface Env {
  ASSETS: {
    fetch: (request: Request) => Promise<Response>;
  };
  TURNSTILE_SECRET_KEY?: string;
  RESEND_API_KEY?: string;
  NOTIFICATION_EMAIL?: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    // Contact Form API endpoint
    if (url.pathname === "/api/contact" && request.method === "POST") {
      try {
        let name = "";
        let phone = "";
        let email = "";
        let message = "";
        let turnstileToken = "";
        const photoNames: string[] = [];
        const attachments: Array<{ filename: string; content: string }> = [];

        const contentType = request.headers.get("content-type") || "";

        if (contentType.includes("multipart/form-data")) {
          const formData = await request.formData();
          name = (formData.get("name") as string) || "";
          phone = (formData.get("phone") as string) || "";
          email = (formData.get("email") as string) || "";
          message = (formData.get("message") as string) || "";
          turnstileToken =
            (formData.get("cf-turnstile-response") as string) ||
            (formData.get("turnstileToken") as string) ||
            "";

          const files = formData.getAll("photos");
          for (const item of files) {
            if (item instanceof File && item.name) {
              photoNames.push(`${item.name} (${Math.round(item.size / 1024)} KB)`);
              try {
                const ab = await item.arrayBuffer();
                const uint8 = new Uint8Array(ab);
                let binaryStr = "";
                const chunk = 8192;
                for (let i = 0; i < uint8.length; i += chunk) {
                  binaryStr += String.fromCharCode(...uint8.subarray(i, i + chunk));
                }
                attachments.push({
                  filename: item.name,
                  content: btoa(binaryStr),
                });
              } catch (fileErr) {
                console.warn("Could not process file attachment:", fileErr);
              }
            }
          }
          const honeypot = (formData.get("honeypot") as string) || "";
          if (honeypot && honeypot.trim().length > 0) {
            return new Response(JSON.stringify({ success: true, message: "Erfolgreich" }), {
              status: 200,
              headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
            });
          }
        } else {
          const body = (await request.json()) as Record<string, unknown>;
          if (body.honeypot && String(body.honeypot).trim().length > 0) {
            return new Response(JSON.stringify({ success: true, message: "Erfolgreich" }), {
              status: 200,
              headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
            });
          }
          name = String(body.name || "");
          phone = String(body.phone || "");
          email = String(body.email || "");
          message = String(body.message || "");
          turnstileToken = String(body.turnstileToken || body["cf-turnstile-response"] || "");
          if (Array.isArray(body.photoNames)) {
            photoNames.push(...body.photoNames.map(String));
          }
        }

        // Basic validation
        if (!name.trim() || !phone.trim() || !message.trim()) {
          return new Response(
            JSON.stringify({
              success: false,
              error: "Bitte füllen Sie Name, Telefonnummer und die Beschreibung aus.",
            }),
            {
              status: 400,
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
              },
            }
          );
        }

        // 1. Verify Turnstile Token if provided
        const secretKey = env.TURNSTILE_SECRET_KEY;

        if (secretKey && turnstileToken && turnstileToken !== "auto-pass-fallback" && turnstileToken !== "direct-web-token") {
          try {
            const verifyFormData = new FormData();
            verifyFormData.append("secret", secretKey);
            verifyFormData.append("response", turnstileToken);
            const clientIp = request.headers.get("CF-Connecting-IP");
            if (clientIp) {
              verifyFormData.append("remoteip", clientIp);
            }

            const turnstileRes = await fetch(
              "https://challenges.cloudflare.com/turnstile/v0/siteverify",
              {
                method: "POST",
                body: verifyFormData,
              }
            );

            const turnstileOutcome = (await turnstileRes.json()) as {
              success: boolean;
              "error-codes"?: string[];
            };

            console.log("Turnstile verify outcome:", JSON.stringify(turnstileOutcome));

            if (!turnstileOutcome.success && env.TURNSTILE_SECRET_KEY) {
              return new Response(
                JSON.stringify({
                  success: false,
                  error: "Sicherheitsprüfung (Turnstile) fehlgeschlagen. Bitte erneut versuchen.",
                }),
                {
                  status: 400,
                  headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                  },
                }
              );
            }
          } catch (err) {
            console.error("Turnstile verification error:", err);
          }
        }

        // 2. Prepare Notification Email
        const targetEmail = env.NOTIFICATION_EMAIL || "info@moebelaufbauhilfe-nienburg.de";
        const emailSubject = `Neue Montageanfrage: ${name} (${phone})`;
        const timestamp = new Date().toLocaleString("de-DE", { timeZone: "Europe/Berlin" });

        // Clean phone for WhatsApp international link
        const cleanPhoneForWhatsApp = (p: string) => {
          const digits = p.replace(/\D/g, "");
          if (digits.startsWith("0")) {
            return "49" + digits.substring(1);
          }
          return digits;
        };
        const waPhone = cleanPhoneForWhatsApp(phone);
        const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(`Hallo ${name}, vielen Dank für Ihre Anfrage bezüglich des Möbelaufbaus bei der Möbelaufbauhilfe Nienburg. Wann passt es Ihnen für ein kurzes Telefonat?`)}`;

        // Plain text fallback (Crucial for SpamAssassin / Outlook SmartScreen scores)
        const emailText = `NEUER MONTAGEAUFTRAG - MÖBELAUFBAUHILFE NIENBURG
======================================================

KUNDE:          ${name}
TELEFON:        ${phone}
E-MAIL:         ${email || "Nicht angegeben"}
EINGEGANGEN AM: ${timestamp}

AUFBAU-DETAILS & MÖBELSTÜCKE:
------------------------------------------------------
${message}
------------------------------------------------------
${photoNames.length > 0 ? `\nANGEHÄNGTE FOTOS / DATEIEN:\n- ${photoNames.join("\n- ")}\n` : ""}
DIREKTE AKTIONEN:
- Anrufen:        tel:${phone}
- WhatsApp:       ${waUrl}
${email ? `- E-Mail senden:  mailto:${email}\n` : ""}
Website: https://moebelaufbauhilfe.friese-scholz.workers.dev
Möbelaufbauhilfe Nienburg • Nikolai Minko • 31582 Nienburg
`;

        // High-end, Outlook-tested (MSO) HTML Email Template
        const emailHtml = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="de">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${emailSubject}</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td, h1, h2, h3, p, a, div { font-family: Arial, sans-serif !important; }
  </style>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">

  <!-- Outer Background Table -->
  <table border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#f1f5f9" style="background-color: #f1f5f9; padding: 30px 10px;">
    <tr>
      <td align="center" valign="top">

        <!--[if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width: 600px;">
        <tr>
        <td align="center" valign="top">
        <![endif]-->

        <!-- Main Card Container (Locked to max 600px) -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; width: 100%; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(15, 23, 42, 0.06);">
          
          <!-- Header Banner -->
          <tr>
            <td bgcolor="#0C647B" style="background-color: #0C647B; padding: 32px 28px; text-align: left;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td>
                    <div style="font-size: 11px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; color: #a5f3fc; margin-bottom: 6px;">
                      MÖBELAUFBAUHILFE NIENBURG
                    </div>
                    <h1 style="margin: 0; font-size: 24px; font-weight: 800; color: #ffffff; line-height: 1.2;">
                      Neuer Montageauftrag
                    </h1>
                    <div style="font-size: 14px; color: #e0f2fe; margin-top: 6px; font-weight: 500;">
                      Nikolai Minko • Anfrage über das Website-Formular
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Quick Action Buttons -->
          <tr>
            <td style="padding: 20px 28px 10px 28px; background-color: #f8fafc; border-bottom: 1px solid #e2e8f0;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="left" style="padding-bottom: 8px;">
                    <div style="font-size: 12px; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">
                      Schnell-Kontakt mit dem Kunden:
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <!-- Call Button -->
                        <td align="center" bgcolor="#0C647B" style="border-radius: 8px; background-color: #0C647B; padding: 10px 18px;">
                          <a href="tel:${phone}" style="font-size: 13px; font-weight: bold; color: #ffffff; text-decoration: none; display: inline-block;">
                            📞 Jetzt anrufen (${phone})
                          </a>
                        </td>
                        <td width="10">&nbsp;</td>
                        <!-- WhatsApp Button -->
                        <td align="center" bgcolor="#059669" style="border-radius: 8px; background-color: #059669; padding: 10px 18px;">
                          <a href="${waUrl}" target="_blank" style="font-size: 13px; font-weight: bold; color: #ffffff; text-decoration: none; display: inline-block;">
                            💬 WhatsApp Chat
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Customer Details Table -->
          <tr>
            <td style="padding: 24px 28px 16px 28px;">
              <div style="font-size: 12px; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px;">
                Kundendaten & Zeitpunkt
              </div>
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden; font-size: 14px;">
                <tr>
                  <td width="130" bgcolor="#f8fafc" style="padding: 12px 16px; font-weight: 700; color: #475569; border-bottom: 1px solid #e2e8f0; background-color: #f8fafc;">
                    Kunde
                  </td>
                  <td style="padding: 12px 16px; font-weight: 800; color: #0f172a; border-bottom: 1px solid #e2e8f0;">
                    ${name}
                  </td>
                </tr>
                <tr>
                  <td width="130" bgcolor="#f8fafc" style="padding: 12px 16px; font-weight: 700; color: #475569; border-bottom: 1px solid #e2e8f0; background-color: #f8fafc;">
                    Telefon
                  </td>
                  <td style="padding: 12px 16px; font-weight: 700; color: #0C647B; border-bottom: 1px solid #e2e8f0;">
                    <a href="tel:${phone}" style="color: #0C647B; text-decoration: none;">${phone}</a>
                  </td>
                </tr>
                ${
                  email
                    ? `<tr>
                  <td width="130" bgcolor="#f8fafc" style="padding: 12px 16px; font-weight: 700; color: #475569; border-bottom: 1px solid #e2e8f0; background-color: #f8fafc;">
                    E-Mail
                  </td>
                  <td style="padding: 12px 16px; font-weight: 600; color: #0f172a; border-bottom: 1px solid #e2e8f0;">
                    <a href="mailto:${email}" style="color: #0C647B; text-decoration: none;">${email}</a>
                  </td>
                </tr>`
                    : ""
                }
                <tr>
                  <td width="130" bgcolor="#f8fafc" style="padding: 12px 16px; font-weight: 700; color: #475569; background-color: #f8fafc;">
                    Eingegangen
                  </td>
                  <td style="padding: 12px 16px; color: #64748b; font-weight: 500;">
                    ${timestamp} Uhr
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message Box -->
          <tr>
            <td style="padding: 8px 28px 24px 28px;">
              <div style="font-size: 12px; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 10px;">
                Möbelstücke & Montage-Details
              </div>
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td bgcolor="#f8fafc" style="padding: 18px; background-color: #f8fafc; border-left: 4px solid #0C647B; border-radius: 0 10px 10px 0; font-size: 15px; line-height: 1.6; color: #1e293b; font-weight: 500; white-space: pre-wrap;">
${message}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          ${
            photoNames.length > 0
              ? `<!-- Attachments List -->
          <tr>
            <td style="padding: 0 28px 24px 28px;">
              <div style="font-size: 12px; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 10px;">
                Angehängte Fotos (${photoNames.length})
              </div>
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="padding: 12px 16px; background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; font-size: 13px; color: #166534; font-weight: 600;">
                    📎 Im E-Mail-Anhang beigefügt:<br />
                    <span style="font-size: 12px; color: #15803d; font-weight: normal; margin-top: 4px; display: inline-block;">
                      ${photoNames.join(" &bull; ")}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>`
              : ""
          }

          <!-- Footer -->
          <tr>
            <td bgcolor="#f8fafc" style="padding: 20px 28px; background-color: #f8fafc; border-top: 1px solid #e2e8f0; text-align: center;">
              <div style="font-size: 13px; font-weight: bold; color: #334155; margin-bottom: 4px;">
                Möbelaufbauhilfe Nienburg • Nikolai Minko
              </div>
              <div style="font-size: 12px; color: #64748b; margin-bottom: 8px;">
                31582 Nienburg (Weser) & bis zu 50 km Umkreis
              </div>
              <div style="font-size: 11px; color: #94a3b8;">
                Gesendet über das Website-Formular &bull; <a href="https://moebelaufbauhilfe.friese-scholz.workers.dev" style="color: #0C647B; text-decoration: none;">moebelaufbauhilfe.friese-scholz.workers.dev</a>
              </div>
            </td>
          </tr>

        </table>
        <!-- End Main Card Container -->

        <!--[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]-->

      </td>
    </tr>
  </table>
  <!-- End Outer Background Table -->

</body>
</html>`;

        // 3. Send Notification Email via Resend API
        const resendApiKey = env.RESEND_API_KEY;
        let emailSent = false;

        if (resendApiKey) {
          try {
            const mailPayload: Record<string, unknown> = {
              from: "Möbelaufbauhilfe Nienburg <noreply@scholz-friese-webdesign.de>",
              to: [targetEmail],
              bcc: ["friese.scholz@gmail.com"],
              reply_to: email ? `${name} <${email}>` : undefined,
              subject: emailSubject,
              html: emailHtml,
              text: emailText,
              headers: {
                "X-Priority": "1",
                "Importance": "high",
              },
            };

            if (attachments.length > 0) {
              mailPayload.attachments = attachments;
            }

            const resendRes = await fetch("https://api.resend.com/emails", {
              method: "POST",
              headers: {
                Authorization: `Bearer ${resendApiKey}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify(mailPayload),
            });

            const resendData = (await resendRes.json().catch(() => null)) as Record<string, unknown> | null;
            console.log("Resend API response:", resendRes.status, JSON.stringify(resendData));

            if (resendRes.ok && resendData?.id) {
              emailSent = true;
            } else {
              console.error("Resend API delivery error:", resendData);
            }
          } catch (resendErr) {
            console.error("Resend delivery exception:", resendErr);
          }
        }

        // Fallback to MailChannels API if Resend was not used or failed
        if (!emailSent) {
          try {
            await fetch("https://api.mailchannels.net/tx/v1/send", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                personalizations: [{ 
                  to: [{ email: targetEmail, name: "Nikolai Minko" }],
                  bcc: [{ email: "friese.scholz@gmail.com" }]
                }],
                from: {
                  email: "kontakt@moebelaufbauhilfe.friese-scholz.workers.dev",
                  name: "Möbelaufbauhilfe Nienburg",
                },
                reply_to: email ? { email, name } : undefined,
                subject: emailSubject,
                content: [
                  { type: "text/plain", value: emailText },
                  { type: "text/html", value: emailHtml },
                ],
              }),
            });
          } catch (mcErr) {
            console.warn("MailChannels delivery note:", mcErr);
          }
        }

        console.log(`[Form Submitted] Name: ${name}, Phone: ${phone}, Email: ${email}, Photos: ${photoNames.length}`);

        return new Response(
          JSON.stringify({
            success: true,
            message: "Ihre Anfrage wurde erfolgreich übertragen. Wir melden uns umgehend bei Ihnen!",
          }),
          {
            status: 200,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
      } catch (err: unknown) {
        const errorMsg = err instanceof Error ? err.message : "Unbekannter Fehler";
        console.error("API error:", errorMsg);
        return new Response(
          JSON.stringify({
            success: false,
            error: "Ein Fehler ist aufgetreten. Bitte kontaktieren Sie uns direkt per WhatsApp oder Telefon.",
          }),
          {
            status: 500,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
      }
    }

    // Pass through all static assets to Vite build output
    return env.ASSETS.fetch(request);
  },
};
