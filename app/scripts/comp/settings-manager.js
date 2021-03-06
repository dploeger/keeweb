const Backbone = require('backbone');
const Locale = require('./../util/locale');
const FeatureDetector = require('../util/feature-detector');

const appleThemes = {
    macdark: 'setGenThemeMacDark'
};

const extraThemes = FeatureDetector.isMac || FeatureDetector.isiOS ? appleThemes : {};

const SettingsManager = {
    neutralLocale: null,
    activeLocale: 'en',

    allLocales: {
        'en': 'English',
        'de-DE': 'Deutsch',
        'fr-FR': 'Français'
    },

    allThemes: {
        fb: 'setGenThemeFb',
        db: 'setGenThemeDb',
        sd: 'setGenThemeSd',
        sl: 'setGenThemeSl',
        wh: 'setGenThemeWh',
        te: 'setGenThemeTe',
        hc: 'setGenThemeHc',
        ...extraThemes
    },

    customLocales: {},

    setBySettings(settings) {
        if (settings.get('theme')) {
            this.setTheme(settings.get('theme'));
        }
        this.setFontSize(settings.get('fontSize'));
        const locale = settings.get('locale');
        try {
            if (locale) {
                this.setLocale(settings.get('locale'));
            } else {
                this.setLocale(this.getBrowserLocale());
            }
        } catch (ex) {}
    },

    setTheme(theme) {
        _.forEach(document.body.classList, cls => {
            if (/^th\-/.test(cls)) {
                document.body.classList.remove(cls);
            }
        });
        document.body.classList.add(this.getThemeClass(theme));
        const metaThemeColor = document.head.querySelector('meta[name=theme-color]');
        if (metaThemeColor) {
            metaThemeColor.content = window.getComputedStyle(document.body).backgroundColor;
        }
    },

    getThemeClass(theme) {
        return 'th-' + theme;
    },

    setFontSize(fontSize) {
        const defaultFontSize = FeatureDetector.isMobile ? 14 : 12;
        document.documentElement.style.fontSize = defaultFontSize + (fontSize || 0) * 2 + 'px';
    },

    setLocale(loc) {
        if (!loc || loc === this.activeLocale) {
            return;
        }
        let localeValues;
        if (loc !== 'en') {
            if (this.customLocales[loc]) {
                localeValues = this.customLocales[loc];
            } else {
                localeValues = require('../locales/' + loc + '.json');
            }
        }
        if (!this.neutralLocale) {
            this.neutralLocale = _.clone(Locale);
        }
        _.extend(Locale, this.neutralLocale, localeValues);
        this.activeLocale = loc;
        Backbone.trigger('set-locale', loc);
    },

    getBrowserLocale() {
        const language = (navigator.languages && navigator.languages[0]) || navigator.language;
        if (language && language.lastIndexOf('en', 0) === 0) {
            return 'en';
        }
        return language;
    }
};

module.exports = SettingsManager;
