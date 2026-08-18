import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'K.C. Site',
  tagline: 'Terraform + ArgoCD 的 GitOps 基礎架構實作紀錄',

  favicon: 'img/favicon.png',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://kittychen913.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/gitops-demo-docs/',

  // GitHub pages deployment config.
  organizationName: 'KittyChen913', // Usually your GitHub org/user name.
  projectName: 'gitops-demo-docs', // Usually your repo name.

  // 死連結一律讓建置失敗，由 CI 擋下，不讓壞連結上線。
  // onBrokenAnchors 預設只有 'warn' —— 標題錨點失效時建置照樣成功、照樣上線，
  // 而改標題正是最容易讓錨點失效的動作，故一併提升為 'throw'。
  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',

  // 站上內容為繁體中文，需正確輸出 <html lang="zh-Hant">，
  // 否則影響 SEO、螢幕閱讀器發音，瀏覽器也會一直跳出翻譯提示。
  i18n: {
    defaultLocale: 'zh-Hant',
    locales: ['zh-Hant'],
  },

  plugins: ['docusaurus-plugin-image-zoom'],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // 刻意不設 editUrl —— 不提供「編輯此頁」連結。
          // Docusaurus 只在 editUrl 有值時才渲染該連結，留空即為停用。
        },
        // 註解掉不等於停用，會套用預設值並產生空的 /blog 頁面，需顯式關閉。
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // 社群平台分享預覽圖。Docusaurus 會自動補上 url + baseUrl 組成絕對網址。
    // 注意：多數平台以 1200x630 橫式呈現，此為 500x500 方形圖，兩側會被裁切。
    image: 'img/kc-avatar.png',
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'GitOps Demo',
      logo: {
        alt: 'Kitty Chen (K.C.)',
        src: 'img/logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          href: 'https://github.com/KittyChen913/gitops-demo-docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `
        <div class="footer__title" style="margin-bottom: 0.75rem;">Kitty Chen (K.C.)</div>
        <div style="margin-bottom: 1rem;">
          <a class="footer__link-item" href="https://github.com/KittyChen913" target="_blank" rel="noopener noreferrer">GitHub</a>
          <span class="footer__link-separator">·</span>
          <a class="footer__link-item" href="https://www.linkedin.com/in/kitty-chen-b9a29315b/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <span class="footer__link-separator">·</span>
          <a class="footer__link-item" href="https://www.dotblogs.com.tw/fire" target="_blank" rel="noopener noreferrer">點部落 Blog</a>
        </div>
        <div style="margin-bottom: 0.75rem;">GitOps Demo — Infrastructure &amp; GitOps Documentation</div>
        <div>© ${new Date().getFullYear()} Kitty Chen</div>
      `,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.vsDark,
      additionalLanguages: ['powershell', 'hcl'],
    },
    zoom: {
      selector: '.markdown img',
      background: {
        light: 'rgb(255, 255, 255)',
        dark: 'rgb(50, 50, 50)',
      },
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
