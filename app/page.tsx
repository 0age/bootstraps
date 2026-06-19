"use client";

import { useState, type FormEvent } from "react";
import styles from "./page.module.css";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success"; message: string }
  | { kind: "error"; message: string };

export default function Home() {
  const [suggestion, setSuggestion] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!suggestion.trim()) {
      setStatus({ kind: "error", message: "Please enter a suggestion." });
      return;
    }

    setStatus({ kind: "submitting" });

    try {
      const res = await fetch("/api/suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          suggestion: suggestion.trim(),
          name: name.trim(),
          email: email.trim(),
        }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!res.ok) {
        setStatus({
          kind: "error",
          message:
            data.error ?? "Something went wrong. Please try again later.",
        });
        return;
      }

      setStatus({
        kind: "success",
        message: "Thanks! Your suggestion has been sent to the factory. 🛠️",
      });
      setSuggestion("");
      setName("");
      setEmail("");
    } catch {
      setStatus({
        kind: "error",
        message: "Network error. Please check your connection and try again.",
      });
    }
  }

  const submitting = status.kind === "submitting";

  return (
    <main className={styles.main}>
      <section className={styles.card}>
        <h1 className={styles.title}>🥾 bootstraps suggestion box</h1>
        <p className={styles.subtitle}>
          Got an idea for a feature? Drop it below. Suggestions are forwarded to
          the Auto factory, which spins up an agent to build them.
        </p>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="suggestion">
              Suggestion
            </label>
            <textarea
              id="suggestion"
              className={styles.textarea}
              rows={5}
              required
              placeholder="What should bootstraps build next?"
              value={suggestion}
              onChange={(e) => setSuggestion(e.target.value)}
              disabled={submitting}
            />
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="name">
                Name <span className={styles.optional}>(optional)</span>
              </label>
              <input
                id="name"
                className={styles.input}
                type="text"
                placeholder="Ada Lovelace"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={submitting}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="email">
                Email <span className={styles.optional}>(optional)</span>
              </label>
              <input
                id="email"
                className={styles.input}
                type="email"
                placeholder="ada@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={submitting}
              />
            </div>
          </div>

          <button
            className={styles.button}
            type="submit"
            disabled={submitting}
          >
            {submitting ? "Sending…" : "Send suggestion"}
          </button>

          {status.kind === "success" && (
            <p className={`${styles.status} ${styles.success}`} role="status">
              {status.message}
            </p>
          )}
          {status.kind === "error" && (
            <p className={`${styles.status} ${styles.error}`} role="alert">
              {status.message}
            </p>
          )}
        </form>

        <p className={styles.footer}>
          Built with bootstraps — caffeine, vibes, and good intentions. ⚡
        </p>
      </section>
    </main>
  );
}
