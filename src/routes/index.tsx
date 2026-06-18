import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import brideChild from "@/assets/bride-child.jpg";
import groomChild from "@/assets/groom-child.jpg";
import venue from "@/assets/venue.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Оля + Никита — 03.08.2026" },
      { name: "description", content: "Приглашение на свадьбу Оли и Никиты — 3 августа 2026" },
    ],
  }),
  component: Invitation,
});

// TODO: replace with your Google Apps Script Web App URL when ready
const RSVP_WEBHOOK_URL = "";

function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).style.animationDelay = `${delay}ms`;
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return (
    <div ref={ref} className="reveal">
      {children}
    </div>
  );
}

function Ornament() {
  return (
    <div className="flex items-center justify-center gap-3 text-mute" aria-hidden="true">
      <span className="h-px w-16 bg-line sm:w-24" />
      <svg width="28" height="10" viewBox="0 0 28 10" fill="none" className="opacity-70">
        <circle cx="14" cy="5" r="1.4" fill="currentColor" />
        <path d="M2 5 Q 8 1 14 5 T 26 5" stroke="currentColor" strokeWidth="0.6" fill="none" />
      </svg>
      <span className="h-px w-16 bg-line sm:w-24" />
    </div>
  );
}

function Polaroid({
  src,
  alt,
  caption,
  rotate,
}: {
  src: string;
  alt: string;
  caption: string;
  rotate: string;
}) {
  return (
    <figure
      className="shadow-polaroid bg-paper p-3 pb-10 transition-transform duration-700 hover:rotate-0"
      style={{ transform: `rotate(${rotate})` }}
    >
      <img
        src={src}
        alt={alt}
        width={400}
        height={500}
        className="block h-72 w-56 object-cover grayscale-[10%] sm:h-80 sm:w-60"
      />
      <figcaption className="font-serif mt-3 text-center text-base italic text-charcoal">
        {caption}
      </figcaption>
    </figure>
  );
}

function Invitation() {
  return (
    <main className="text-foreground overflow-x-hidden">
      <Hero />
      <Intro />
      <Calendar />
      <Location />
      <Timeline />
      <DressCode />
      <Contacts />
      <Rsvp />
      <Closing />
    </main>
  );
}

function Hero() {
  return (
    <section className="relative px-6 pt-16 pb-24 sm:pt-20 sm:pb-32">
      <div className="mx-auto max-w-5xl text-center">
        <Reveal>
          <p className="font-sans text-mute mb-10 text-[0.7rem] tracking-[0.5em] uppercase">
            Однажды, много лет назад…
          </p>
        </Reveal>

        <div className="relative mb-12 flex items-end justify-center gap-4 sm:gap-16">
          <Reveal delay={150}>
            <Polaroid src={brideChild} alt="Оля в детстве" caption="Оля" rotate="-5deg" />
          </Reveal>
          <Reveal delay={350}>
            <Polaroid src={groomChild} alt="Никита в детстве" caption="Никита" rotate="4deg" />
          </Reveal>
        </div>



        <Reveal delay={500}>
          <h1 className="font-serif text-charcoal text-5xl leading-[1.05] tracking-tight sm:text-7xl md:text-8xl">
            <span className="italic">Оля</span>
            <span className="text-accent mx-4 inline-block align-middle text-3xl sm:text-5xl">
              &amp;
            </span>
            <span className="italic">Никита</span>
          </h1>
        </Reveal>

        <Reveal delay={700}>
          <div className="mt-12 mb-6">
            <Ornament />
          </div>
        </Reveal>

        <Reveal delay={800}>
          <div className="flex items-center justify-center gap-6 sm:gap-10">
            <DateBlock label="день" value="03" />
            <Sep />
            <DateBlock label="месяц" value="08" />
            <Sep />
            <DateBlock label="год" value="2026" />
          </div>
        </Reveal>

        <Reveal delay={900}>
          <p className="font-sans text-mute mt-8 text-xs tracking-[0.4em] uppercase">
            Приглашаем вас на нашу свадьбу
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function DateBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-serif text-charcoal text-4xl sm:text-6xl">{value}</span>
      <span className="font-sans text-mute mt-2 text-[0.6rem] tracking-[0.3em] uppercase">
        {label}
      </span>
    </div>
  );
}

function Sep() {
  return <span className="text-line font-serif text-3xl sm:text-5xl">/</span>;
}

function SectionTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="mb-12 text-center">
      <p className="font-sans text-accent mb-4 text-[0.65rem] tracking-[0.5em] uppercase">
        {kicker}
      </p>
      <h2 className="font-serif text-charcoal text-4xl italic sm:text-5xl">{title}</h2>
      <div className="mt-6">
        <Ornament />
      </div>
    </div>
  );
}

function Intro() {
  return (
    <section className="px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <SectionTitle kicker="Дорогие гости" title="Несколько слов" />
        </Reveal>
        <Reveal delay={150}>
          <p className="font-serif text-charcoal/90 text-xl leading-relaxed sm:text-2xl">
            В этот особенный день мы хотим разделить с вами радость нашего союза. Ваше
            присутствие — самый ценный подарок, и мы будем счастливы провести этот вечер в кругу
            самых близких людей.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Location() {
  return (
    <section className="px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <SectionTitle kicker="Место" title="Где мы встретимся" />
        </Reveal>

        <div className="grid items-center gap-10 md:grid-cols-2">
          <Reveal delay={150}>
            <div className="bg-paper shadow-card overflow-hidden rounded-2xl">
              <img
                src={venue}
                alt="Площадка"
                loading="lazy"
                width={1280}
                height={800}
                className="block h-72 w-full object-cover sm:h-96"
              />
            </div>
          </Reveal>
          <Reveal delay={300}>
            <div className="bg-paper shadow-card rounded-2xl p-8 sm:p-10">
              <p className="font-sans text-accent text-[0.65rem] tracking-[0.4em] uppercase">
                Загородный клуб
              </p>
              <h3 className="font-serif text-charcoal mt-3 text-3xl italic sm:text-4xl">
                Villa Ambra
              </h3>
              <div className="bg-line my-6 h-px w-12" />
              <p className="font-sans text-mute text-sm leading-relaxed">
                Московская область, посёлок Лесной, 12
                <br />
                Сбор гостей в 15:30
              </p>
              <a
                href="https://yandex.ru/maps"
                target="_blank"
                rel="noreferrer noopener"
                className="font-sans text-charcoal hover:text-accent mt-8 inline-flex items-center gap-2 border-b border-line pb-1 text-xs tracking-[0.3em] uppercase transition-colors"
              >
                Открыть карту
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const TIMELINE = [
  { time: "16:00", title: "Сбор гостей", desc: "Аперитив на террасе" },
  { time: "17:00", title: "Церемония", desc: "В саду под открытым небом" },
  { time: "18:30", title: "Банкет", desc: "Ужин, тосты, танцы" },
  { time: "23:00", title: "Финал вечера", desc: "Фейерверк и пожелания" },
];

function Timeline() {
  return (
    <section className="px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <SectionTitle kicker="Программа" title="План дня" />
        </Reveal>
        <ol className="relative">
          <div className="bg-line absolute top-0 bottom-0 left-1/2 hidden w-px -translate-x-1/2 sm:block" />
          {TIMELINE.map((item, i) => (
            <Reveal key={item.title} delay={i * 120}>
              <li
                className={`relative mb-10 grid items-center gap-4 sm:mb-14 sm:grid-cols-2 sm:gap-12 ${
                  i % 2 === 0 ? "" : "sm:[&>*:first-child]:order-2"
                }`}
              >
                <div className={`${i % 2 === 0 ? "sm:text-right" : "sm:text-left"} text-center`}>
                  <span className="font-serif text-charcoal text-4xl italic sm:text-5xl">
                    {item.time}
                  </span>
                </div>
                <div className={`${i % 2 === 0 ? "sm:text-left" : "sm:text-right"} text-center`}>
                  <h3 className="font-serif text-charcoal text-2xl sm:text-3xl">{item.title}</h3>
                  <p className="font-sans text-mute mt-2 text-sm">{item.desc}</p>
                </div>
                <span className="bg-accent absolute top-1/2 left-1/2 hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full sm:block" />
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

const SWATCHES = [
  { name: "Айвори", color: "#f3ece1" },
  { name: "Песочный", color: "#d9c9ae" },
  { name: "Шалфей", color: "#b3b89e" },
  { name: "Терракота", color: "#b87858" },
  { name: "Графит", color: "#4a4540" },
];

function DressCode() {
  return (
    <section className="px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <SectionTitle kicker="Дресс-код" title="Палитра вечера" />
        </Reveal>
        <Reveal delay={150}>
          <p className="font-sans text-mute mx-auto mb-12 max-w-xl text-sm leading-relaxed">
            Мы будем благодарны, если ваш образ поддержит общую палитру торжества. Нейтральные,
            тёплые, природные тона.
          </p>
        </Reveal>
        <Reveal delay={300}>
          <div className="flex flex-wrap items-end justify-center gap-6 sm:gap-10">
            {SWATCHES.map((s) => (
              <div key={s.name} className="flex flex-col items-center">
                <span
                  className="h-20 w-20 rounded-full shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05),0_10px_24px_-12px_rgba(60,50,40,0.3)] sm:h-24 sm:w-24"
                  style={{ background: s.color }}
                  aria-label={s.name}
                />
                <span className="font-sans text-mute mt-3 text-[0.65rem] tracking-[0.3em] uppercase">
                  {s.name}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Rsvp() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [attending, setAttending] = useState<"yes" | "no">("yes");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") || ""),
      attending: String(fd.get("attending") || ""),
      guests: String(fd.get("guests") || ""),
      diet: String(fd.get("diet") || ""),
      comment: String(fd.get("comment") || ""),
      submittedAt: new Date().toISOString(),
    };

    if (!RSVP_WEBHOOK_URL) {
      console.info("RSVP payload (no webhook configured):", payload);
      setStatus("ok");
      (e.target as HTMLFormElement).reset();
      setAttending("yes");
      return;
    }

    setStatus("sending");
    try {
      await fetch(RSVP_WEBHOOK_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setStatus("ok");
      (e.target as HTMLFormElement).reset();
      setAttending("yes");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  return (
    <section id="rsvp" className="px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-xl">
        <Reveal>
          <SectionTitle kicker="Анкета гостя" title="Подтверждение" />
        </Reveal>

        <Reveal delay={150}>
          <form
            onSubmit={onSubmit}
            className="bg-paper shadow-card space-y-6 rounded-2xl p-8 sm:p-10"
          >
            <Field label="Имя и фамилия">
              <input
                name="name"
                required
                maxLength={120}
                className="border-line focus:border-accent w-full border-b bg-transparent py-2 outline-none transition-colors"
              />
            </Field>

            <Field label="Сможете ли присутствовать?">
              <div className="flex gap-3">
                {(["yes", "no"] as const).map((v) => (
                  <label
                    key={v}
                    className={`font-sans flex-1 cursor-pointer rounded-full border py-3 text-center text-xs tracking-[0.3em] uppercase transition-all ${
                      attending === v
                        ? "border-charcoal bg-charcoal text-paper"
                        : "border-line text-mute hover:border-charcoal/40"
                    }`}
                  >
                    <input
                      type="radio"
                      name="attending"
                      value={v === "yes" ? "Да" : "Нет"}
                      className="sr-only"
                      checked={attending === v}
                      onChange={() => setAttending(v)}
                    />
                    {v === "yes" ? "Да" : "Нет"}
                  </label>
                ))}
              </div>
            </Field>

            <Field label="Количество гостей">
              <input
                name="guests"
                type="number"
                min={1}
                max={6}
                defaultValue={1}
                className="border-line focus:border-accent w-full border-b bg-transparent py-2 outline-none transition-colors"
              />
            </Field>

            <Field label="Пищевые ограничения">
              <input
                name="diet"
                maxLength={200}
                placeholder="вегетарианство, аллергии…"
                className="border-line focus:border-accent placeholder:text-mute/50 w-full border-b bg-transparent py-2 outline-none transition-colors"
              />
            </Field>

            <Field label="Комментарий">
              <textarea
                name="comment"
                rows={3}
                maxLength={500}
                className="border-line focus:border-accent w-full resize-none border-b bg-transparent py-2 outline-none transition-colors"
              />
            </Field>

            <button
              type="submit"
              disabled={status === "sending"}
              className="bg-charcoal text-paper hover:bg-charcoal/85 mt-4 w-full rounded-full py-4 text-xs tracking-[0.4em] uppercase transition-colors disabled:opacity-50"
            >
              {status === "sending" ? "Отправляем…" : "Отправить"}
            </button>

            {status === "ok" && (
              <p className="font-serif text-accent text-center text-lg italic">
                Спасибо! Ваш ответ получен.
              </p>
            )}
            {status === "error" && (
              <p className="font-sans text-center text-sm text-red-700">
                Что-то пошло не так. Попробуйте ещё раз.
              </p>
            )}
          </form>
        </Reveal>

        <Reveal delay={300}>
          <p className="font-sans text-mute mt-6 text-center text-xs tracking-[0.2em]">
            Просим ответить до 1 июля 2026
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="font-sans text-mute mb-2 block text-[0.65rem] tracking-[0.3em] uppercase">
        {label}
      </span>
      {children}
    </label>
  );
}

function Closing() {
  return (
    <section className="px-6 pt-10 pb-24">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <Ornament />
        </Reveal>
        <Reveal delay={150}>
          <p className="font-serif text-charcoal mt-8 text-2xl italic sm:text-3xl">
            С нетерпением ждём встречи с вами
          </p>
        </Reveal>
        <Reveal delay={250}>
          <p className="font-serif text-mute mt-6 text-lg">Оля &amp; Никита · 03.08.2026</p>
        </Reveal>
      </div>
    </section>
  );
}

function Calendar() {
  const weeks: (number | null)[][] = [
    [null, null, null, null, null, 1, 2],
    [3, 4, 5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14, 15, 16],
    [17, 18, 19, 20, 21, 22, 23],
    [24, 25, 26, 27, 28, 29, 30],
    [31, null, null, null, null, null, null],
  ];
  const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

  return (
    <section className="relative px-6 py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(120,100,80,0.5) 0, transparent 40%), radial-gradient(circle at 80% 70%, rgba(140,120,90,0.4) 0, transparent 45%)",
        }}
      />
      <div className="relative mx-auto max-w-xl">
        <Reveal>
          <SectionTitle kicker="Дата" title="Мы ждём вас" />
        </Reveal>

        <Reveal delay={150}>
          <div className="bg-paper shadow-card rounded-3xl p-8 sm:p-12">
            <div className="text-center">
              <p className="font-sans text-accent text-[0.65rem] tracking-[0.5em] uppercase">
                Август
              </p>
              <p className="font-serif text-charcoal mt-1 text-3xl italic">2026</p>
            </div>

            <div className="mt-8 grid grid-cols-7 gap-y-2 text-center">
              {days.map((d) => (
                <span
                  key={d}
                  className="font-sans text-mute text-[0.6rem] tracking-[0.2em] uppercase"
                >
                  {d}
                </span>
              ))}
              {weeks.flat().map((day, i) => {
                const isWedding = day === 3;
                return (
                  <span
                    key={i}
                    className={`font-serif relative mx-auto flex h-9 w-9 items-center justify-center text-base sm:h-10 sm:w-10 ${
                      day ? "text-charcoal" : "text-transparent"
                    }`}
                  >
                    {isWedding && (
                      <span
                        aria-hidden="true"
                        className="border-accent absolute inset-0 rounded-full border"
                        style={{ transform: "rotate(-6deg) scale(1.05)" }}
                      />
                    )}
                    <span className={isWedding ? "text-accent italic" : ""}>{day ?? "."}</span>
                  </span>
                );
              })}
            </div>

            <div className="mt-8">
              <Ornament />
            </div>
            <p className="font-serif text-charcoal mt-6 text-center text-lg italic sm:text-xl">
              До встречи на нашей свадьбе — 03 / 08 / 2026
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Contacts() {
  const people = [
    { role: "Невеста", name: "Оля", phone: "+7 XXX XXX-XX-XX" },
    { role: "Жених", name: "Никита", phone: "+7 XXX XXX-XX-XX" },
  ];
  return (
    <section className="px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <SectionTitle kicker="Связь" title="Контакты" />
        </Reveal>
        <Reveal delay={150}>
          <p className="font-sans text-mute mx-auto mb-12 max-w-xl text-center text-sm leading-relaxed">
            Если у вас появятся вопросы, вы всегда можете связаться с нами.
          </p>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2 sm:gap-10">
          {people.map((p, i) => (
            <Reveal key={p.name} delay={250 + i * 120}>
              <div className="bg-paper shadow-card rounded-2xl p-8 text-center sm:p-10">
                <p className="font-sans text-accent text-[0.6rem] tracking-[0.4em] uppercase">
                  {p.role}
                </p>
                <h3 className="font-serif text-charcoal mt-3 text-3xl italic">{p.name}</h3>
                <div className="bg-line mx-auto my-5 h-px w-10" />
                <a
                  href={`tel:${p.phone.replace(/\s|-/g, "")}`}
                  className="font-sans text-charcoal hover:text-accent text-sm tracking-[0.2em] transition-colors"
                >
                  {p.phone}
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

