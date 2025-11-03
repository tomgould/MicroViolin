/**
 * MicroViolin.js v1.0.0
 * The world's smallest violin, now as a Service (SaaS)
 *
 * Enterprise-grade empathy delivery system for first-world problems.
 * ISO 9001 certified. GDPR compliant. Blockchain-ready.
 *
 * @license MIT
 * @author The Sympathy Team
 */

(function(window) {
    'use strict';

    // Configuration object (because we're PROFESSIONAL)
    const config = {
        audioEnabled: true,
        audioPath: 'Sad_Trombone.mp3',
        fadeInDuration: 500,
        violinSize: 'micro', // Options: nano, micro, mini, small (we only support micro)
        debug: false
    };

    // Our precious collection of violin memes
    const violinMemes = [
        'http://www.paperpetual.com/gifs/violin.gif',
        'https://media.giphy.com/media/10hfegXGKVRVNm/giphy.gif',
        'https://kevgrig.com/minis/violin.gif',
        'https://www.sikhphilosophy.net/images/smilies/sikhsmileys/munda-violin.gif',
    ];

    // Audio instance (singleton pattern because we're FANCY)
    let audioInstance = null;

    /**
     * Initializes the audio player
     * @private
     */
    function initAudio() {
        if (!audioInstance) {
            audioInstance = new Audio(config.audioPath);
            audioInstance.volume = 0.5; // We're not monsters
        }
    }

    /**
     * Plays the sad trombone sound
     * @private
     */
    function playSadTrombone() {
        if (!config.audioEnabled) return;

        try {
            initAudio();
            audioInstance.currentTime = 0;
            audioInstance.play().catch(err => {
                // Ironically, we can't play sad trombone for the sad trombone error
                if (config.debug) console.log('Failed to play sad trombone:', err);
            });
        } catch (err) {
            if (config.debug) console.log('Audio initialization failed:', err);
        }
    }

    /**
     * Gets a random violin meme from our extensive collection
     * @returns {string} URL of a violin meme
     * @private
     */
    function getRandomViolin() {
        const index = Math.floor(Math.random() * violinMemes.length);
        return violinMemes[index];
    }

    /**
     * Creates the violin display element
     * @param {string} imageUrl - URL of the violin image
     * @returns {HTMLElement} The violin container element
     * @private
     */
    function createViolinElement(imageUrl) {
        const container = document.createElement('div');
        container.className = 'micro-violin-container';
        container.style.cssText = `
            text-align: center;
            padding: 20px;
            opacity: 0;
            transition: opacity ${config.fadeInDuration}ms ease-in;
        `;

        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = 'The world\'s smallest violin';
        img.style.cssText = `
            max-width: 100%;
            height: auto;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        `;

        const caption = document.createElement('p');
        caption.style.cssText = `
            margin-top: 15px;
            font-family: 'Comic Sans MS', cursive, sans-serif;
            font-size: 18px;
            color: #666;
            font-style: italic;
        `;
        caption.textContent = '🎻 Here\'s the world\'s smallest violin, playing just for you 🎻';

        container.appendChild(img);
        container.appendChild(caption);

        // Fade in effect (because UX matters)
        setTimeout(() => {
            container.style.opacity = '1';
        }, 10);

        return container;
    }

    /**
     * Displays a random violin in the specified container
     * @param {string} containerId - ID of the container element
     * @public
     */
    function show(containerId) {
        const container = document.getElementById(containerId);

        if (!container) {
            console.error(`MicroViolin: Container with ID "${containerId}" not found. How ironic.`);
            return;
        }

        // Clear existing content
        container.innerHTML = '';

        // Get and display a random violin
        const violinUrl = getRandomViolin();
        const violinElement = createViolinElement(violinUrl);
        container.appendChild(violinElement);

        // Play the sad trombone
        playSadTrombone();
    }

    /**
     * Enables or disables the sad trombone audio
     * @param {boolean} enabled - Whether audio should be enabled
     * @public
     */
    function setAudioEnabled(enabled) {
        config.audioEnabled = !!enabled;
        if (config.debug) console.log(`MicroViolin: Audio ${enabled ? 'enabled' : 'disabled'}`);
    }

    /**
     * Checks if audio is currently enabled
     * @returns {boolean} Audio enabled state
     * @public
     */
    function isAudioEnabled() {
        return config.audioEnabled;
    }

    /**
     * Adds a new violin meme to the collection
     * @param {string} url - URL of the violin meme
     * @public
     */
    function addViolin(url) {
        if (typeof url === 'string' && url.length > 0) {
            violinMemes.push(url);
            if (config.debug) console.log('MicroViolin: Added new violin to collection');
        }
    }

    /**
     * Gets the current number of violins in the collection
     * @returns {number} Number of violin memes
     * @public
     */
    function getViolinCount() {
        return violinMemes.length;
    }

    // Console monitoring system (ENTERPRISE FEATURE)
    function initConsoleMonitoring() {
        // Store original console methods
        const originalError = console.error;
        const originalWarn = console.warn;

        // Override console.error
        console.error = function(...args) {
            playSadTrombone();
            originalError.apply(console, args);
        };

        // Override console.warn
        console.warn = function(...args) {
            playSadTrombone();
            originalWarn.apply(console, args);
        };

        // Global error handler
        window.addEventListener('error', function(event) {
            playSadTrombone();
        });

        // Unhandled promise rejection handler
        window.addEventListener('unhandledrejection', function(event) {
            playSadTrombone();
        });

        if (config.debug) console.log('MicroViolin: Console monitoring initialized');
    }

    // Initialize console monitoring on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initConsoleMonitoring);
    } else {
        initConsoleMonitoring();
    }

    // Public API (SOLID principles and all that jazz)
    window.MicroViolin = {
        show: show,
        setAudioEnabled: setAudioEnabled,
        isAudioEnabled: isAudioEnabled,
        addViolin: addViolin,
        getViolinCount: getViolinCount,
        version: '1.0.0'
    };

    // AMD support (because why not)
    if (typeof define === 'function' && define.amd) {
        define('MicroViolin', [], function() {
            return window.MicroViolin;
        });
    }

    // CommonJS support (gotta cover all bases)
    if (typeof module === 'object' && module.exports) {
        module.exports = window.MicroViolin;
    }

})(typeof window !== 'undefined' ? window : this);

