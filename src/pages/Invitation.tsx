import { useEffect, useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";

const brideChild = "/images/olya.jpg";
const groomChild = "/images/nikita.jpg";
const venue = "/images/venue-8milya.jpg";






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

function SectionDivider() {
  return (
    <div className="px-6 py-4" aria-hidden="true">
      <div className="mx-auto flex max-w-md items-center justify-center gap-4 text-mute/60">
        <span className="h-px flex-1 bg-gradient-to-r from-transparent to-line" />
        <svg width="46" height="14" viewBox="0 0 46 14" fill="none" className="opacity-80">
          <path
            d="M2 7 Q 11 1 20 7 T 38 7"
            stroke="currentColor"
            strokeWidth="0.7"
            fill="none"
          />
          <circle cx="23" cy="7" r="1.6" fill="currentColor" />
          <circle cx="6" cy="7" r="0.9" fill="currentColor" opacity="0.5" />
          <circle cx="40" cy="7" r="0.9" fill="currentColor" opacity="0.5" />
        </svg>
        <span className="h-px flex-1 bg-gradient-to-l from-transparent to-line" />
      </div>
    </div>
  );
}

function Polaroid({
  src,
  alt,
  caption,
  rotate,
  mobileRotate,
}: {
  src: string;
  alt: string;
  caption: ReactNode;
  rotate: string;
  mobileRotate?: string;
}) {
  const style = {
    "--polaroid-rotate": rotate,
    "--polaroid-mobile-rotate": mobileRotate ?? rotate,
  } as CSSProperties;

  return (
    <figure
      className="polaroid-card shadow-polaroid bg-paper w-[clamp(6.75rem,35vw,9rem)] p-[clamp(0.4rem,1.8vw,0.5rem)] pb-[clamp(0.75rem,3.5vw,1rem)] transition-transform duration-700 hover:rotate-0 sm:w-52 sm:p-3 sm:pb-5"
      style={style}
    >
      <div className="aspect-[3/4] w-full overflow-hidden">
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
        />
      </div>
      <figcaption
        className="font-hand mt-1 px-0.5 pb-0.5 text-center text-[clamp(0.68rem,3vw,0.875rem)] leading-[1.05] text-charcoal/80 sm:mt-2 sm:px-1 sm:pb-1 sm:text-base sm:leading-tight"
        style={{ transform: "rotate(-2deg)" }}
      >
        {caption}
      </figcaption>
    </figure>
  );
}

export default function Invitation() {
  return (
    <main className="text-foreground overflow-x-hidden">
      <Hero />
      <SectionDivider />
      <Intro />
      <SectionDivider />
      <Calendar />
      <SectionDivider />
      <Location />
      <SectionDivider />
      <Timeline />
      <SectionDivider />
      <DressCode />
      <SectionDivider />
      <Wishes />
      <SectionDivider />
      <Contacts />
      <SectionDivider />
      <Rsvp />
      <Closing />
    </main>
  );
}

function Hero() {
  return (
    <section className="relative px-4 pt-14 pb-14 sm:px-6 sm:pt-20 sm:pb-20">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="font-sans text-charcoal mb-12 text-center text-[0.7rem] tracking-[0.55em] uppercase sm:mb-16 sm:text-xs">
            <span className="text-accent">W</span>edding{" "}
            <span className="text-accent">D</span>ay
          </p>
        </Reveal>

        <div className="mx-auto grid w-full max-w-[23rem] grid-cols-[minmax(0,1fr)_1.5rem_minmax(0,1fr)] items-center gap-0 sm:max-w-none sm:grid-cols-[1fr_auto_1fr] sm:gap-10">
          <Reveal delay={150}>
            <div className="flex min-w-0 justify-end pr-1 sm:pr-0">
              <Polaroid
                src={brideChild}
                alt="Оля в детстве"
                caption={
                  <>
                    — интересно, кто<br />будет моим мужем,<br />когда я вырасту?
                  </>
                }
                rotate="-6deg"
                mobileRotate="-3deg"
              />
            </div>
          </Reveal>

          <Reveal delay={300}>
            <div className="font-serif text-mute/70 flex min-w-0 flex-col items-center gap-1 text-lg italic sm:gap-2 sm:text-4xl">
              <span>03</span>
              <span>08</span>
              <span>26</span>
            </div>
          </Reveal>

          <Reveal delay={450}>
            <div className="flex min-w-0 justify-start pl-1 sm:pl-0">
              <Polaroid
                src={groomChild}
                alt="Никита в детстве"
                caption="— им буду я ♡"
                rotate="5deg"
                mobileRotate="3deg"
              />
            </div>
          </Reveal>
        </div>

        <Reveal delay={650}>
          <h1 className="font-serif text-charcoal mt-14 text-center text-3xl tracking-[0.08em] uppercase sm:mt-16 sm:text-6xl md:text-7xl">
            <span>Оля</span>
            <span className="text-accent mx-3 inline-block align-middle text-xl sm:mx-6 sm:text-3xl">
              ✦
            </span>
            <span>Никита</span>
          </h1>
        </Reveal>

        <Reveal delay={800}>
          <p className="font-sans text-mute mt-8 text-center text-xs tracking-[0.4em] uppercase">
            Приглашаем вас на нашу свадьбу
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function SectionTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="mb-10 text-center">
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
    <section className="px-6 py-12 sm:py-16">
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
    <section className="px-6 py-12 sm:py-16">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <SectionTitle kicker="Место" title="Где мы встретимся" />
        </Reveal>

        <div className="grid items-center gap-10 md:grid-cols-2">
          <Reveal delay={150}>
            <div className="bg-paper shadow-card overflow-hidden rounded-2xl">
              <img
                src={venue}
                alt="Загородный комплекс 8 миля"
                loading="lazy"
                className="block h-72 w-full object-cover sm:h-96"
              />
            </div>
          </Reveal>
          <Reveal delay={300}>
            <div className="bg-paper shadow-card rounded-2xl p-8 sm:p-10">
              <p className="font-sans text-accent text-[0.65rem] tracking-[0.4em] uppercase">
                Загородный комплекс
              </p>
              <h3 className="font-serif text-charcoal mt-3 text-3xl italic sm:text-4xl">
                «8 Миля»
              </h3>
              <div className="bg-line my-6 h-px w-12" />
              <p className="font-sans text-mute text-sm leading-relaxed">
                Самарская область, Тольятти
                <br />
                М-5 «Урал», 977-й километр
              </p>
              <a
                href="https://yandex.ru/maps/-/CTEAnO3O"
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
  { time: "15:15", title: "Сбор гостей" },
  { time: "16:00", title: "Церемония" },
  { time: "17:00", title: "Банкет" },
  { time: "23:00", title: "Финал вечера" },
];

function Timeline() {
  return (
    <section className="px-6 py-12 sm:py-16">
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
  { name: "Бежевый", color: "#e3d2b8" },
  { name: "Песочный", color: "#d9c9ae" },
  { name: "Розовый", color: "#e8c8c4" },
  { name: "Нежно-голубой", color: "#c4dae8" },
  { name: "Нежно-желтый", color: "#f3ebc4" },
  { name: "Сиреневый", color: "#d8c4e8" },
  { name: "Шалфей", color: "#b3b89e" },
  { name: "Графит", color: "#4a4540" },
];

function DressCode() {
  return (
    <section className="px-6 py-12 sm:py-16">
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

function Wishes() {
  return (
    <section className="px-6 py-12 sm:py-16">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <SectionTitle kicker="Подарки" title="Пожелания" />
        </Reveal>
        <Reveal delay={150}>
          <div className="bg-paper shadow-card rounded-2xl p-8 sm:p-10">
            <p className="font-serif text-charcoal/90 text-lg leading-relaxed italic sm:text-xl">
              Мы очень любим цветы, но ещё больше — музыку. Поэтому, если вы пожелаете, можете
              подарить виниловую пластинку для нашей коллекции вместо букета цветов. Мы будем
              счастливы!
            </p>
            <div className="mt-6">
              <Ornament />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const ALCOHOL_OPTIONS = [
  "Шампанское",
  "Белое вино",
  "Красное вино",
  "Водка",
  "Виски",
  "Коньяк",
  "Не пью алкоголь",
];

function Rsvp() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [attending, setAttending] = useState<"yes" | "no">("yes");
  const [guests, setGuests] = useState<number>(1);
  const [alcohol, setAlcohol] = useState<string[]>([]);

  function toggleAlcohol(option: string) {
    setAlcohol((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option],
    );
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const guestNames: string[] = [];
    for (let i = 2; i <= guests; i++) {
      const v = String(fd.get(`guest_${i}`) || "").trim();
      if (v) guestNames.push(v);
    }
    const payload = {
      name: String(fd.get("name") || ""),
      attending: String(fd.get("attending") || ""),
      guests: Number(fd.get("guests") || guests) || 1,
      guest_names: guestNames,
      diet: String(fd.get("diet") || "") || null,
      alcohol,
      comment: String(fd.get("comment") || "") || null,
      submitted_at: new Date().toISOString(),
    };

    setStatus("sending");
    const { error } = await supabase.from("rsvp_responses").insert(payload);
    if (error) {
      console.error("RSVP insert failed:", error);
      setStatus("error");
      return;
    }
    setStatus("ok");
    form.reset();
    setAttending("yes");
    setGuests(1);
    setAlcohol([]);
  }


  return (
    <section id="rsvp" className="px-6 py-12 sm:py-16">
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
                value={guests}
                onChange={(e) => {
                  const n = Math.max(1, Math.min(6, Number(e.target.value) || 1));
                  setGuests(n);
                }}
                className="border-line focus:border-accent w-full border-b bg-transparent py-2 outline-none transition-colors"
              />
            </Field>

            {guests > 1 && (
              <div className="space-y-4 rounded-xl border border-line/70 bg-cream/40 p-5">
                <p className="font-sans text-mute text-[0.65rem] tracking-[0.3em] uppercase">
                  Имена остальных гостей
                </p>
                {Array.from({ length: guests - 1 }).map((_, i) => (
                  <Field key={i} label={`Гость ${i + 2}`}>
                    <input
                      name={`guest_${i + 2}`}
                      required
                      maxLength={120}
                      placeholder="Имя и фамилия"
                      className="border-line focus:border-accent placeholder:text-mute/50 w-full border-b bg-transparent py-2 outline-none transition-colors"
                    />
                  </Field>
                ))}
              </div>
            )}

            <Field label="Пищевые ограничения">
              <input
                name="diet"
                maxLength={200}
                placeholder="вегетарианство, аллергии…"
                className="border-line focus:border-accent placeholder:text-mute/50 w-full border-b bg-transparent py-2 outline-none transition-colors"
              />
            </Field>

            <Field label="Ваши предпочтения по алкоголю">
              <div className="mt-2 flex flex-wrap gap-2">
                {ALCOHOL_OPTIONS.map((opt) => {
                  const active = alcohol.includes(opt);
                  return (
                    <button
                      type="button"
                      key={opt}
                      onClick={() => toggleAlcohol(opt)}
                      className={`font-sans cursor-pointer rounded-full border px-4 py-2 text-xs tracking-[0.15em] transition-all ${
                        active
                          ? "border-charcoal bg-charcoal text-paper"
                          : "border-line text-mute hover:border-charcoal/40"
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
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
            Просим ответить до 15 июля 2026
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
    <section className="relative px-6 py-12 sm:py-16">
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
              <p className="font-serif text-charcoal text-3xl tracking-[0.25em] uppercase sm:text-4xl">
                Август
              </p>
              <p className="font-sans text-mute mt-2 text-[0.7rem] tracking-[0.4em] uppercase">
                2026
              </p>
            </div>

            <div className="mt-8 grid grid-cols-7 gap-y-3 text-center">
              {days.map((d) => (
                <span
                  key={d}
                  className="font-sans text-mute text-[0.7rem] font-medium tracking-[0.2em] uppercase"
                >
                  {d}
                </span>
              ))}
              {weeks.flat().map((day, i) => {
                const isWedding = day === 3;
                return (
                  <span
                    key={i}
                    className={`font-serif relative mx-auto flex h-10 w-10 items-center justify-center text-xl sm:h-12 sm:w-12 sm:text-2xl ${
                      day ? "text-charcoal" : "text-transparent"
                    }`}
                  >
                    {isWedding && (
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 60 60"
                        className="absolute inset-[-6px] h-[calc(100%+12px)] w-[calc(100%+12px)]"
                      >
                        <ellipse
                          cx="30"
                          cy="30"
                          rx="24"
                          ry="22"
                          fill="none"
                          stroke="#c0392b"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeDasharray="170 12"
                          strokeDashoffset="-4"
                          transform="rotate(-12 30 30)"
                        />
                      </svg>
                    )}
                    <span className="relative">{day ?? "."}</span>
                  </span>
                );
              })}
            </div>

            <div className="mt-10">
              <Ornament />
            </div>
            <p className="font-serif text-charcoal mt-6 text-center text-lg italic sm:text-xl">
              Не пропустите важное событие этого лета — день нашей свадьбы!
            </p>
            <p className="font-serif text-accent mt-3 text-center text-2xl tracking-[0.15em] sm:text-3xl">
              03.08.2026
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Contacts() {
  const people = [
    { role: "Невеста", name: "Оля", phone: "+7 937 663-84-15", tel: "+79376638415" },
    { role: "Жених", name: "Никита", phone: "+7 937 232-88-44", tel: "+79372328844" },
  ];
  return (
    <section className="px-6 py-12 sm:py-16">
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
                  href={`tel:${p.tel}`}
                  className="font-serif text-charcoal hover:text-accent text-xl tracking-[0.05em] transition-colors sm:text-2xl"
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
