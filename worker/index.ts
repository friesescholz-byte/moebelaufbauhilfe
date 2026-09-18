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
            }
          }
        } else {
          const body = (await request.json()) as Record<string, unknown>;
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

        // 1. Verify Turnstile Token if provided or if secret key is present
        const secretKey =
          env.TURNSTILE_SECRET_KEY || "1x0000000000000000000000000000000AA"; // Cloudflare official test secret

        if (turnstileToken) {
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
        const targetEmail = env.NOTIFICATION_EMAIL || "friese.scholz@gmail.com";
        const emailSubject = `Neue Möbelaufbau-Anfrage von ${name} (${phone})`;
        const timestamp = new Date().toLocaleString("de-DE", { timeZone: "Europe/Berlin" });

        const emailHtml = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e293b; background: #f8fafc; padding: 24px; }
              .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
              .header { background: #0C647B; color: #ffffff; padding: 24px; text-align: center; }
              .content { padding: 28px; }
              .field { margin-bottom: 20px; }
              .label { font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin-bottom: 4px; }
              .value { font-size: 16px; font-weight: 600; color: #0f172a; }
              .message-box { background: #f1f5f9; padding: 16px; border-radius: 12px; font-weight: 500; white-space: pre-wrap; }
              .badge { display: inline-block; background: #e0f2fe; color: #0369a1; padding: 4px 10px; border-radius: 8px; font-size: 13px; font-weight: 700; }
              .footer { padding: 16px 24px; background: #f8fafc; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center; }
            </style>
          </head>
          <body>
            <div class="card">
              <div class="header">
                <h2 style="margin: 0; font-size: 22px;">Neuer Montageauftrag / Anfrage</h2>
                <div style="font-size: 14px; opacity: 0.9; margin-top: 4px;">Möbelaufbauhilfe Nienburg • von Nikolai</div>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">Kunde</div>
                  <div class="value">${name}</div>
                </div>
                <div class="field">
                  <div class="label">Telefonnummer</div>
                  <div class="value"><a href="tel:${phone}" style="color: #0C647B; text-decoration: none;">${phone}</a></div>
                </div>
                ${
                  email
                    ? `<div class="field">
                  <div class="label">E-Mail</div>
                  <div class="value"><a href="mailto:${email}" style="color: #0C647B; text-decoration: none;">${email}</a></div>
                </div>`
                    : ""
                }
                <div class="field">
                  <div class="label">Eingegangen am</div>
                  <div class="value">${timestamp}</div>
                </div>
                <div class="field">
                  <div class="label">Aufbau-Details & Möbelstücke</div>
                  <div class="message-box">${message}</div>
                </div>
                ${
                  photoNames.length > 0
                    ? `<div class="field">
                  <div class="label">Angehängte Fotos / Dokumente</div>
                  <div class="value">
                    ${photoNames.map((fn) => `<span class="badge" style="margin-right: 6px; margin-bottom: 6px;">📎 ${fn}</span>`).join(" ")}
                  </div>
                </div>`
                    : ""
                }
              </div>
              <div class="footer">
                Gesendet über das Kontaktformular von moebelaufbauhilfe.friese-scholz.workers.dev
              </div>
            </div>
          </body>
          </html>
        `;

        // 3. Attempt sending via Resend if API key is provided
        if (env.RESEND_API_KEY) {
          try {
            await fetch("https://api.resend.com/emails", {
              method: "POST",
              headers: {
                Authorization: `Bearer ${env.RESEND_API_KEY}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                from: "Möbelaufbauhilfe <onboarding@resend.dev>",
                to: [targetEmail],
                reply_to: email || undefined,
                subject: emailSubject,
                html: emailHtml,
              }),
            });
          } catch (resendErr) {
            console.error("Resend delivery error:", resendErr);
          }
        } else {
          // Attempt via MailChannels API
          try {
            await fetch("https://api.mailchannels.net/tx/v1/send", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                personalizations: [{ to: [{ email: targetEmail, name: "Scholz & Friese" }] }],
                from: {
                  email: "kontakt@moebelaufbauhilfe.friese-scholz.workers.dev",
                  name: "Möbelaufbauhilfe Nienburg",
                },
                reply_to: email ? { email, name } : undefined,
                subject: emailSubject,
                content: [{ type: "text/html", value: emailHtml }],
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
