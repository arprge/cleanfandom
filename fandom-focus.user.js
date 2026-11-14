// ==UserScript==
// @name         CleanFandom
// @namespace    https://github.com/arprge/cleanfandom
// @version      4.1.0
// @description  Restore Fandom to a clean, readable, and distraction-free layout.
// @author       Alan
// @match        *://*.fandom.com/*
// @run-at       document-start
// @grant        none
// @license      MIT
// @icon         https://www.fandom.com/favicon.ico
// @homepageURL  https://github.com/arprge/cleanfandom
// @supportURL   https://github.com/arprge/cleanfandom/issues
// @updateURL    https://github.com/arprge/cleanfandom/raw/refs/heads/main/fandom-focus.user.js
// @downloadURL  https://github.com/arprge/cleanfandom/raw/refs/heads/main/fandom-focus.user.js
// ==/UserScript==

(() => {
    'use strict';

    const STYLE_ID = 'fandom-focus-styles';

    const focusCSS = `
        /* 1. Hide left explore rail, right rail, 2026 rail toggle, modals, ads, and floating video */
        #global-explore-navigation,
        .page__right-rail,
        [class*="right-rail-toggle"],
        #onetrust-consent-sdk,
        #age-gate,
        [class*="AgeGateDialog-module_modal"],
        [class*="AgeGateDialog-module_overlay"],
        .notifications-placeholder,
        .top-ads-container,
        .bottom-ads-container,
        .ad-slot-placeholder,
        .gpt-ad,
        .featured-video__wrapper,
        #connatix_player,
        .cnx-main-container,
        #WikiaBar,
        .mcf-wrapper,
        .global-footer {
            display: none !important;
            min-height: 0 !important;
            height: 0 !important;
            padding: 0 !important;
            margin: 0 !important;
        }

        /* 2. Prevent hidden consent/age-gate modals from locking scroll (preserve sticky elements) */
        html:not(.ve-active),
        body:not(.ve-active) {
            overflow-y: auto !important;
        }

        /* 3. Reclaim layout width and remove left-navigation offset */
        body.f2-page:not(.article-editor-body):not(.no-global-nav),
        .main-container,
        .app-wrapper,
        .base-layout-wrapper {
            margin-left: 0 !important;
        }

        .main-container {
            width: 100% !important;
        }

        .app-wrapper {
            max-width: none !important;
        }

        .resizable-container {
            max-width: min(1280px, 94vw) !important;
            width: 100% !important;
            margin: 0 auto !important;
        }

        /* 4. Fix community header background scaling */
        .fandom-community-header__background.fullScreen {
            width: 100% !important;
        }

        .fandom-community-header__background.fitCenter {
            background-size: cover !important;
        }

        /* 5. Collapse empty right-rail grid column outside VisualEditor */
        html:not(.ve-active) .page.has-right-rail {
            grid-template-columns: minmax(0, 1fr) !important;
            column-gap: 0 !important;
        }
    `;

    function injectStyles() {
        if (document.getElementById(STYLE_ID)) return;

        const style = document.createElement('style');
        style.id = STYLE_ID;
        style.textContent = focusCSS;
        (document.head || document.documentElement).appendChild(style);
    }

    injectStyles();

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectStyles, { once: true });
    }
})();
