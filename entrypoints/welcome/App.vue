<template>
  <main class="welcome-page">
    <header class="welcome-page__hero">
      <div class="welcome-page__logo">
        <LogoPrismai />
        <p class="welcome-page__brand">PrismAI</p>
      </div>
      <h1 class="welcome-page__title">
        Unlock deeper meaning in everything you read
      </h1>
      <p class="welcome-page__subtitle">
        PrismAI is your personal reading assistant. Get instant word
        definitions, quick summaries, and seamless translations for any text on
        any page—all powered by secure, in-browser AI.
      </p>
      <div class="welcome-page__actions">
        <a href="#get-started" type="button" class="white">See how it works</a>
        <button @click="openOptions" type="button">
          Configure <IconSettings color="#ffffff" />
        </button>
      </div>
    </header>

    <section class="welcome-page__features">
      <h2>A smarter way to read the web</h2>
      <div class="welcome-page__flex">
        <article v-for="feature in coreFeatures" class="welcome-page__quote">
          <span><component :is="feature.icon" width="16" height="16" /></span>
          <header>
            <h3>{{ feature.title }}</h3>
            <p>
              {{ feature.description }}
            </p>
          </header>
        </article>

        <article v-for="feature in features" class="welcome-page__card">
          <img :src="feature.image" :alt="feature.imageAlt" />
          <component :is="feature.icon" />
          <header>
            <h3>{{ feature.title }}</h3>
            <p>
              {{ feature.description }}
            </p>
          </header>
        </article>
      </div>
    </section>

    <section id="get-started" class="welcome-page__get-started">
      <h2>Get started in 3 simple steps</h2>
      <div class="welcome-page__flex triple">
        <article v-for="step in steps" class="welcome-page__quote">
          <span>{{ step.number }} 1</span>
          <header>
            <h3>{{ step.title }} Highlight text</h3>
            <p>
              {{ step.description }} Select any word or paragraph on any
              website.
            </p>
          </header>
        </article>
      </div>
      <img
        class="welcome-page__demo"
        src="/prismai-demo.png"
        alt="PrismAI behavior showcase in GIF format"
      />
    </section>

    <section class="welcome-page__faq">
      <header>
        <h2>Everything you need to know</h2>
        <p>Have questions? We have the answers.</p>
      </header>

      <div class="welcome-page__accordions">
        <article
          v-for="(faq, index) in faqs"
          @click="accordionOpen[index] = !accordionOpen[index]"
          class="welcome-page__question"
          :class="{ open: accordionOpen[index] }"
        >
          <h4>{{ faq.question }}</h4>
          <p v-if="accordionOpen[index]">
            {{ faq.answer }}
          </p>
        </article>
      </div>
    </section>

    <footer class="welcome-page__footer">
      <p>
        © 2025 - {{ new Date().getFullYear() }} PrismAI – Developed and designed
        by Alba Silvente (<a target="_blank" href="https://www.dawntraoz.com/"
          >@dawntraoz</a
        >) in The Netherlands
      </p>
    </footer>
  </main>
</template>

<script setup lang="ts">
import {
  IconSettings,
  IconMagGlass,
  IconSummary,
  IconTranslate,
  IconShield,
  IconSparkles,
} from "@/components/icons";
import LogoPrismai from "@/components/LogoPrismai.vue";

const coreFeatures = [
  {
    title: "AI Enhancement",
    description:
      "Never get stuck on a word or lost in a long article again. PrismAI gives you the AI tools to comprehend any web content faster and more effectively, right in your browser.",
    icon: IconSparkles,
  },
  {
    title: "Private & secure",
    description:
      "PrismAI processes everything locally using built-in browser AI. No data ever leaves your machine, ensuring complete privacy. It even works offline.",
    icon: IconShield,
  },
];

const features = [
  {
    title: "Explore Words",
    description:
      "Curious about a word? Just highlight it. PrismAI instantly gives you a clear definition and deeper context using the Prompt API, so you never lose your reading flow.",
    image: "/prismai-word-showcase.png",
    imageAlt: "PrismAI word selection showcase",
    icon: IconMagGlass,
  },
  {
    title: "Quick Summaries",
    description:
      "Turn dense articles and long reports into key takeaways. PrismAI gets you the core message in seconds, so you can decide what’s worth a deeper read.",
    image: "/prismai-summary-showcase.png",
    imageAlt: "PrismAI sentence selection summarise action showcase",
    icon: IconSummary,
  },
  {
    title: "Smart Translation",
    description:
      "Read any website, no matter the language. Get accurate, seamless translations for words or entire paragraphs right where you are, without switching tabs.",
    image: "/prismai-translation-showcase.png",
    imageAlt: "PrismAI sentence selection translate action showcase",
    icon: IconTranslate,
  },
];

const steps = [
  {
    number: "1",
    title: "Highlight text",
    description: "Select any word or paragraph on any website.",
  },
  {
    number: "2",
    title: "Choose your action",
    description: "PrismAI's context menu instantly appears.",
  },
  {
    number: "3",
    title: "Get your insight",
    description:
      "Click usage, summarise, or translate to get an immediate answer.",
  },
];

const faqs = [
  {
    question: "Is my reading data private?",
    answer:
      "Absolutely. PrismAI uses your browser's built-in AI, meaning all processing happens on your device. Nothing is sent to a server, and your data remains 100% private.",
  },
  {
    question: "Which browsers does PrismAI support?",
    answer:
      "Currently, PrismAI is available for Chrome. We are working on expanding to more browsers soon.",
  },
  {
    question: "Can I customize what appears in the menu?",
    answer:
      "Yes! In the extension settings, you can choose which actions (define, usage, summarize, translate, etc) you want to see for quick access.",
  },
  {
    question: "Is PrismAI free to use?",
    answer: "Yes, the core features of PrismAI are completely free.",
  },
];

const accordionOpen = ref(Array(faqs.length).fill(false));

const openOptions = () => {
  browser.runtime.openOptionsPage();
};
</script>

<style scoped>
.welcome-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  img {
    max-width: 100%;
    height: auto;
  }

  .welcome-page__hero {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 120px 24px;
    gap: 24px;
    text-align: center;
    color: var(--prismai-main-white);
    background: var(--prismai-main-gradient);

    .welcome-page__title,
    .welcome-page__subtitle,
    .welcome-page__actions {
      max-width: 640px;
    }

    .welcome-page__title {
      font-size: 48px;
      line-height: 64.8px;
      font-weight: 600;
    }

    .welcome-page__subtitle {
      font-size: 20px;
      line-height: 28px;
      color: var(--prismai-main-gray-light);
    }

    .welcome-page__actions {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      gap: 24px;

      a,
      button {
        width: fit-content;
        display: flex;
        align-items: center;
        gap: 10px;
      }
    }
  }

  .welcome-page__logo {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 12px;

    .prismai-logo {
      width: 40px;
      height: 32px;
    }

    .welcome-page__brand {
      font-family: "Gantari", sans-serif;
      font-size: 24px;
      font-weight: 500;
      margin: 0;
    }
  }

  .welcome-page__features,
  .welcome-page__get-started,
  .welcome-page__faq {
    width: 100%;
    max-width: 902px;
    margin: 0 auto;
    padding: 64px 24px 0;

    h2 {
      font-size: 32px;
      font-weight: 600;
      text-align: center;
      padding-bottom: 36px;
    }

    h3 {
      font-size: 18px;
      font-weight: 600;
      padding-bottom: 6px;
    }

    h4 {
      font-size: 16px;
      font-weight: 500;
    }

    p {
      font-size: 14px;
      color: var(--prismai-main-gray-dark);
    }
  }

  .welcome-page__flex {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: stretch;
    gap: 16px;

    &.triple {
      .welcome-page__quote {
        width: calc(33.333% - 16px - (2 * 24px));
      }
    }
  }

  .welcome-page__quote {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: calc(50% - 16px - (2 * 24px));
    gap: 10px;
    padding: 16px 24px;
    border-left: 1px solid var(--prismai-main-gray-light);

    span {
      display: flex;
      padding: 10px;
      border-radius: 40px;
      background: var(--prismai-main-gray-lighter);

      &:not(:has(> svg)) {
        font-size: 16px;
        font-weight: 600;
        color: var(--prismai-primary-color-dark);
        padding: 6px 11px;
      }
    }
  }

  .welcome-page__card {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    width: calc(33.333% - 16px - (2 * 24px));
    padding: 24px;

    border-radius: 8px;
    border: 1px solid var(--prismai-main-gray-light);
    background: var(--prismai-main-gray-lighter);
  }

  .welcome-page__demo {
    border: 1px solid var(--prismai-main-gray-light);
    border-radius: 8px;
    margin: 16px auto 0;
  }

  .welcome-page__faq {
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 100px;

    header {
      width: 50%;
    }

    h2 {
      text-align: left;
      padding-bottom: 12px;
    }

    .welcome-page__accordions {
      width: calc(50% - 2px - (2 * 16px));
      padding: 8px 16px;
      background-color: var(--prismai-main-gray-lighter);
      border: 1px solid var(--prismai-main-gray-light);
      border-radius: 8px;

      .welcome-page__question {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 12px 6px 12px 40px;
        cursor: pointer;

        &::before {
          content: "＋";
          position: absolute;
          top: 6px;
          left: 0;
          font-size: 24px;
          line-height: 24px;
          padding: 4px;
          color: var(--prismai-primary-color-dark);
        }

        &.open::before {
          content: "－";
        }

        &:not(:last-child) {
          border-bottom: 1px solid var(--prismai-main-gray-light);
        }
      }
    }
  }

  .welcome-page__footer {
    margin-top: auto;
    font-size: 14px;
    text-align: center;
    padding: 40px;
    color: var(--prismai-main-gray-light);
    background-color: var(--prismai-main-black);
  }
}
</style>
