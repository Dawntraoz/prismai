<script lang="ts" setup>
import LogoPrismai from "@/components/LogoPrismai.vue";
import SettingsPreferences from "@/components/SettingsPreferences.vue";
</script>

<template>
  <Suspense>
    <main class="options">
      <header class="options__header">
        <LogoPrismai />
        <p class="options__brand">PrismAI</p>
        <p class="options__slogan">
          Your way to understand web content instantly using AI
        </p>
      </header>
      <div class="options__settings">
        <header>
          <h1>Settings</h1>
        </header>
        <SettingsPreferences />
      </div>
      <footer class="options__footer">
        <p>
          © 2025 - {{ new Date().getFullYear() }} PrismAI – Developed and
          designed by Alba Silvente (<a
            target="_blank"
            href="https://www.dawntraoz.com/"
            >@dawntraoz</a
          >) in The Netherlands
        </p>
      </footer>
    </main>
  </Suspense>
</template>

<style>
.options {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.options__header {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 16px;
  gap: 12px;
  border-bottom: 1px solid var(--prismai-main-gray-light);

  .prismai-logo {
    width: 40px;
    height: 32px;
  }

  .options__brand {
    font-family: "Gantari", sans-serif;
    font-size: 24px;
    font-weight: 500;
    margin: 0;
    background: var(--prismai-main-gradient);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .options__slogan {
    font-size: 16px;
    line-height: 19px;
  }
}

.options__settings {
  display: flex;
  flex-direction: column;
  max-width: 960px;
  gap: 24px;
  padding: 32px 24px;
  margin: 0 auto;

  h1 {
    font-size: 28px;
  }

  .prismai-preferences-section {
    h2 {
      font-size: 22px;
    }

    .prismai-preference__label {
      font-size: 18px;

      .prismai-preference__description {
        font-size: 14px;
      }
    }
  }
}

.options__footer {
  margin-top: auto;
  font-size: 14px;
  text-align: center;
  padding: 32px;
  color: var(--prismai-main-gray-dark);
}
</style>
