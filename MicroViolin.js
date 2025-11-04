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
        'https://media0.giphy.com/media/KZSUN7FKBZrm2WHDdX/giphy.gif',
        'https://media0.giphy.com/media/13A7YlLvYVDnmU/giphy.gif',
        'https://media0.giphy.com/media/d0sWibpAwneSI/giphy.gif',
        'https://media0.giphy.com/media/sbCdjSJEGghGM/giphy.gif',
        'https://media0.giphy.com/media/CLbGZ9GQbaznhqjRkE/giphy.gif',
        'https://media0.giphy.com/media/gXhBZfzijya76/giphy.gif',
        'https://media0.giphy.com/media/WQxCOg6ezpfRkwAyA7/giphy.gif',
        'https://media0.giphy.com/media/2rANNgAlPZcFW/giphy.gif',
        'https://media0.giphy.com/media/c2Sc2TMfKbX7W/giphy.gif',
        'https://media0.giphy.com/media/ApgJQ015dHoPxBgNYr/giphy.gif',
        'https://media0.giphy.com/media/10OKEWqz72UW7C/giphy.gif',
        'https://media0.giphy.com/media/fs2SSoIdEmsi4/giphy.gif',
        'https://media0.giphy.com/media/13Cys1xa3cZGRa/giphy.gif',
        'https://media0.giphy.com/media/SkhPpSCNFANLa/giphy.gif',
        'https://media0.giphy.com/media/oFk101f74JtGE/giphy.gif',
        'https://media0.giphy.com/media/ARW8yiJ2oiExXIZhXd/giphy.gif',
        'https://media0.giphy.com/media/9uITZ8f9Q12dYhQGGl/giphy.gif',
        'https://media0.giphy.com/media/iJ8CxvHRj1uw1KWEF8/giphy.gif',
        'https://media0.giphy.com/media/dNzPAUWqVIaqs/giphy.gif',
        'https://media0.giphy.com/media/LSk5aGh2WYL6g/giphy.gif',
        'https://media.tenor.com/KgaNE2deR7UAAAAC/violin-tiny.gif',
        'https://media.tenor.com/qV5B151tIZMAAAAC/fiddle-mr-krabs.gif',
        'https://media.tenor.com/8_rf9sCPLp8AAAAC/sup-daily-twitch.gif',
        'https://media.tenor.com/TBgbN1oZQpsAAAAC/worlds-smallest-violin.gif',
        'https://media.tenor.com/x_LpZ_rJomsAAAAC/reservoir-dogs-steve-buscemi.gif',
        'https://media.tenor.com/-2OI43_bz7kAAAAC/pepe-sad-pepe-frog-sad.gif',
        'https://media.tenor.com/mUQF6-h9PpMAAAAC/playing-violin-taylor-davis.gif',
        'https://media.tenor.com/xJkSDeGQlVoAAAAC/hanini-hanini-with-violin.gif',
        'https://media.tenor.com/HhnvJt--JPkAAAAC/violin-tiny.gif',
        'https://media.tenor.com/CSITQibp6qcAAAAC/sad-upset.gif',
        'https://media.tenor.com/_m-ekztGJ2wAAAAC/tiny-violin-mr-krabs.gif',
        'https://media.tenor.com/5oZQ3_22YtcAAAAC/actorindie-worlds-smallest-violin.gif',
        'https://media.tenor.com/n7TRLCfiROEAAAAC/violin-tiny.gif',
        'https://media.tenor.com/JEfjq4-iAIcAAAAC/playing-violin-taylor-davis.gif',
        'https://media.tenor.com/1tc5CpPe-agAAAAC/corporate-clash-toontown-corporate-clash.gif',
        'https://media.tenor.com/rYH0LtIrqq4AAAAC/lebron-james-smallest-violin.gif',
        'https://media.tenor.com/8elpD9Rger4AAAAC/little-einsteins-violin.gif',
        'https://media.tenor.com/PRcIVg2VeaAAAAAC/kamen-rider-kiva-otoya-kurenai.gif',
        'https://media.tenor.com/YIGg3avGKzoAAAAC/worlds-smallest-violin.gif',
        'https://media.tenor.com/cU0r22RZJoYAAAAC/playing-violin-taylor-davis.gif',
        'https://media0.giphy.com/media/PV20uW90pfZSSr26eJ/giphy.gif',
        'https://media0.giphy.com/media/4MHv5aIo6SI2A/giphy.gif',
        'https://media0.giphy.com/media/jlqJieWthmFZSpsHhe/giphy.gif',
        'https://media0.giphy.com/media/IRQiiaLzbeKuWyuY6N/giphy.gif',
        'https://media0.giphy.com/media/10hfegXGKVRVNm/giphy.gif',
        'https://media0.giphy.com/media/xUOwGbj5wjgzmaRY0o/giphy.gif',
        'https://media0.giphy.com/media/26FmQl6iR51m9542c/giphy.gif',
        'https://media.tenor.com/kTpKc3zCIZYAAAAC/spongebob-squarepants-mr-crabs.gif',
        'https://media.tenor.com/t-AIXF6YQaUAAAAC/sup-daily-twitch.gif',
        'https://media.tenor.com/39YNs_swHgkAAAAC/mr-krabs-so-sad-chat.gif',
        'https://media.tenor.com/u52u9ry2a4wAAAAC/thank-you-rob-landes.gif',
        'https://media.tenor.com/8ity-sguKdIAAAAC/twoset-violin-twoset.gif',
        'https://media.tenor.com/Chg9-UbpIe8AAAAC/peque%C3%B1o-viol%C3%ADn-mar%C3%ADa-sandner.gif',
        'https://media.tenor.com/oQOKSygw4G0AAAAC/thumbs-up-rob-landes.gif',
        'https://media.tenor.com/8EEQ-IpstVcAAAAC/violin-tiny.gif',
        'https://media0.giphy.com/media/2uUsqRPPYesi4/giphy.gif',
        'https://media0.giphy.com/media/Yk47pE89zdMaI/giphy.gif',
        'https://media0.giphy.com/media/747QxjsVC4lHkTbP1d/giphy.gif',
        'https://media0.giphy.com/media/CkulhgggRftfi/giphy.gif',
        'https://media0.giphy.com/media/6CZhoXhtis1LM5Zkfl/giphy.gif',
        'https://media.tenor.com/qFOocnb-G0YAAAAC/sad-upset.gif',
        'https://media.tenor.com/H7mWUc7p184AAAAC/mr-krabs-smallest-violin.gif',
        'https://media.tenor.com/N_d2VlV7bhQAAAAC/mr-krabs-i-like-money.gif',
        'https://media.tenor.com/AEhwrqbIEeoAAAAC/ajr-oko.gif',
        'https://media.tenor.com/3Q4FzqhzaJMAAAAC/ajr-oko.gif',
        'https://media.tenor.com/jbQ1MsgFJBsAAAAC/ajr-oko.gif',
        'https://media.tenor.com/3U_J6Vx7v7kAAAAC/ajr-ryan-met.gif',
        'https://media.tenor.com/vvPXYEj1GPcAAAAC/ajr-oko.gif',
        'https://media.tenor.com/vDGVtrAJ1zAAAAAC/aww-so.gif',
        'https://media.tenor.com/zjqBlO7z9HMAAAAC/ajr-oko.gif',
        'https://media.tenor.com/qVYr2NXcHVIAAAAC/ajr-oko.gif',
        'https://media.tenor.com/HrkwIeW5IfoAAAAC/sad.gif',
        'https://media.tenor.com/XapdX0HdR3cAAAAC/sponge-bob-mr-krabs.gif',
        'https://media.tenor.com/HXgkPtiRRRYAAAAC/vagrant-queen-vagrants.gif',
        'https://media0.giphy.com/media/57litq5puloCk/giphy.gif',
        'https://media0.giphy.com/media/KbTNbjRki4W8sAORJ8/giphy.gif',
        'https://media0.giphy.com/media/3o84UfVLcV3hpRSuSQ/giphy.gif',
        'https://media0.giphy.com/media/tOhAD8TJqXnYQ/giphy.gif',
        'https://media0.giphy.com/media/XA9i7IZ96hE5O/giphy.gif',
        'https://media0.giphy.com/media/sIHj7Sm43H30s/giphy.gif',
        'https://media0.giphy.com/media/l2a8oapqbUhlanPK0m/giphy.gif',
        'https://media0.giphy.com/media/10h3idv6iEAzyo/giphy.gif',
        'https://media0.giphy.com/media/QTCVpQ2ABno08/giphy.gif',
        'https://media0.giphy.com/media/YqbxXKDjzvniySsxmR/giphy.gif',
        'https://media0.giphy.com/media/ICfBtjgl5gSXK/giphy.gif',
        'https://media0.giphy.com/media/NYKnGyoVh3vYA/giphy.gif',
        'https://media0.giphy.com/media/kV5RlJgIHIuC4/giphy.gif',
        'https://media0.giphy.com/media/3o6Ei2qReFhKkTtO92/giphy.gif',
        'https://media0.giphy.com/media/LrsaNJZfUSRUWlY5uu/giphy.gif',
        'https://media.tenor.com/DWC-SFTs7BkAAAAC/worlds-smallest-violin.gif',
        'https://media.tenor.com/b0RQuIjeE0EAAAAC/playing-violin-taylor-davis.gif',
        'https://media.tenor.com/VF77DKvkn_oAAAAC/solace-taylor-davis.gif',
        'https://media.tenor.com/Po-B05MXAO4AAAAC/violin-tiny.gif',
        'https://media.tenor.com/g8rQNpS3H90AAAAC/bunny-violin.gif',
        'https://media0.giphy.com/media/LwhnvcW8OCAt7sGOGA/giphy.gif',
        'https://media0.giphy.com/media/eBPKx8Aa0lwOGb4k2J/giphy.gif',
        'https://media0.giphy.com/media/3o85xBvTpbahi80sRW/giphy.gif',
        'https://media0.giphy.com/media/dflCzHzbzPEvkKfx6I/giphy.gif',
        'https://media0.giphy.com/media/4JEHyYKmDq9VdaZQAa/giphy.gif',
        'https://media0.giphy.com/media/XUaFTiLzoUO4WnuEtf/giphy.gif',
        'https://media0.giphy.com/media/ehVHGCPITWFhYsMrRG/giphy.gif',
        'https://media0.giphy.com/media/cu5iXgXqcsaOe6xiiV/giphy.gif',
        'https://media0.giphy.com/media/ljRC0iF5857128ik5V/giphy.gif',
        'https://media0.giphy.com/media/suggmZEUbayYVvMqnA/giphy.gif',
        'https://media0.giphy.com/media/pzNFARYdOWjStrRptw/giphy.gif',
        'https://media0.giphy.com/media/5zkDXMbwJ7OiUT9vyn/giphy.gif',
        'https://media0.giphy.com/media/26Ff7orsXgmfiYN9K/giphy.gif',
        'https://media.tenor.com/YfQklqfLy5EAAAAC/coragem-o-c%C3%A3o-covarde-tocando-violino.gif',
        'https://media.tenor.com/MpbWl2bwXjIAAAAC/violin-taylor-davis.gif',
        'https://media.tenor.com/WKRQFSySL34AAAAC/lindsey-stirling-what-about-me.gif',
        'https://media.tenor.com/XeSiIMIReJAAAAAC/playing-violin-so.gif',
        'https://media.tenor.com/T4LINEnxZ9UAAAAC/playing-violin-rob-landes.gif',
        'https://media.tenor.com/TzXMeA5tJE8AAAAC/playing-violin-hermit.gif',
        'https://media.tenor.com/56E29i02ESUAAAAC/playing-violin-taylor-davis.gif',
        'https://media.tenor.com/lYb_nKiTlCwAAAAC/playing-violin-rob-landes.gif',
        'https://media.tenor.com/nB0kGuizvh0AAAAC/ricky-berwick-freaking-out.gif',
        'https://media.tenor.com/3HxugNcIXBYAAAAC/playing-violin-taylor-davis.gif',
        'https://media.tenor.com/mlze3X2uj-oAAAAC/chinu-gifgari.gif',
        'https://media.tenor.com/7Mj6T0QNzigAAAAC/playing-violin-070shake.gif',
        'https://media.tenor.com/ZGHipjN-4N4AAAAC/playing-violin-taylor-davis.gif',
        'https://media.tenor.com/0oj9qhEIXEMAAAAC/playing-violin-taylor-davis.gif',
        'https://media0.giphy.com/media/62L0mFC1qqV7H6aTHF/giphy.gif',
        'https://media0.giphy.com/media/pCUKTpM9JTJrOGCQR7/giphy.gif',
        'https://media.tenor.com/ZmeuDyR4qZAAAAAC/play-violin-violin.gif',
        'https://media.tenor.com/GJZiq0dSvd0AAAAC/do-you-you-know.gif',
        'https://media.tenor.com/tjx93QsA6VcAAAAC/playing-violin-taylor-davis.gif',
        'https://media.tenor.com/ft3m1zF-8aoAAAAC/playing-violin-taylor-davis.gif',
        'https://media.tenor.com/Uz7HGduBh58AAAAC/playing-violin-taylor-davis.gif',
        'https://media.tenor.com/bhFU2RLjn9EAAAAC/jimihendrix-playing-violin.gif',
        'https://media.tenor.com/B-c1hFtvpAQAAAAC/playing-violin-rob-landes.gif',
        'https://media0.giphy.com/media/IhGwYlCgBOww0/giphy.gif',
        'https://media.tenor.com/ta7_8vBxzwYAAAAC/violin-playing.gif',
        'https://media.tenor.com/98AmmBjtL_8AAAAC/omori-omori-sunny.gif',
        'https://media.tenor.com/_y6VhZ4OBxQAAAAC/darren-chen-violin.gif',
        'https://media.tenor.com/L2BUkt8Dm3YAAAAC/alan-violin-swag.gif',
        'https://media.tenor.com/6L6dB366WOwAAAAC/tina-guo-violin.gif',
        'https://media.tenor.com/vDeKCrKmQ04AAAAC/twoset-twoset-violin.gif',
        'https://media.tenor.com/qbCnJkGyCSgAAAAC/sugizo-x-japan.gif',
        'https://media.tenor.com/HCxFQuw2t6oAAAAC/twoset-twoset-violin.gif',
        'https://media.tenor.com/bcvK_rU5voEAAAAC/anime-piano.gif',
        'https://media.tenor.com/9arIgz7MmeAAAAAC/lindsey-stirling-whatever.gif',
        'https://media.tenor.com/fP9_N14woucAAAAC/dreadfull-dreadfulltaless.gif',
        'https://media.tenor.com/sP9skAgQwqQAAAAC/tiny-violin-tiny-violin-microscope.gif',
        'https://media.tenor.com/zCFBQJ3iYyEAAAAC/twoset-twoset-violin.gif',
        'https://media.tenor.com/46sObHEDMbMAAAAC/actually-rob-landes.gif',
        'https://media.tenor.com/Chi7OWn2z9AAAAAC/shigatsu-wa-kimi-no-uso-your-lie-in-april.gif',
        'https://media.tenor.com/w2_N4UXKn3YAAAAC/2birdsband-jasonleety.gif',
        'https://media.tenor.com/CFv7_n96QEQAAAAC/shigatsu-wa-kimi-no-uso-your-lie-in-april.gif',
        'https://media.tenor.com/KHd4j6RDy_UAAAAC/soogyu-txt.gif',
        'https://media.tenor.com/pfRUCx8dhX4AAAAC/twoset-twoset-violin.gif',
        'https://media.tenor.com/9a07MZscF9sAAAAC/violin-taylor-davis.gif',
        'https://media.tenor.com/JAeHM_2RGoEAAAAC/candles-pengu.gif',
        'https://media.tenor.com/89PAS7F-djwAAAAC/playing-violin-rob-landes.gif',
        'https://media.tenor.com/3gVndEB31IAAAAAC/solace-taylor-davis.gif',
        'https://media.tenor.com/NcnSYUzk8IwAAAAC/gunslinger-girl-violin.gif',
        'https://media.tenor.com/tuKipTpj31kAAAAC/girl-with-violin-thunder.gif',
        'https://media0.giphy.com/media/j25gsQvCYgomoVSjM4/giphy.gif',
        'https://media0.giphy.com/media/fG3wbPKsNeWPT8cPVp/giphy.gif',
        'https://media0.giphy.com/media/APdBTcVKQXO2VqAOvE/giphy.gif',
        'https://media0.giphy.com/media/beWrNE2H7lA77rSP7q/giphy.gif',
        'https://media0.giphy.com/media/P3mJMhY6yacbQ134Kf/giphy.gif',
        'https://media0.giphy.com/media/4HrMwdB3dBwH82CQgE/giphy.gif',
        'https://media0.giphy.com/media/zuO0ZBkdrufs3SZjEW/giphy.gif',
        'https://media0.giphy.com/media/98MaHVwJOmWMz4cz1K/giphy.gif',
        'https://media0.giphy.com/media/WWVYgSIna4Bs4/giphy.gif',
        'https://media0.giphy.com/media/VrcucT74UiM2k/giphy.gif',
        'https://media0.giphy.com/media/PR7J3rrNCrFE4/giphy.gif',
        'https://media0.giphy.com/media/2SWfigZfH9lkEsc5j6/giphy.gif',
        'https://media0.giphy.com/media/DP9CYPGFkXNNm/giphy.gif',
        'https://media0.giphy.com/media/FoTnoLAPbqhDa7lt97/giphy.gif',
        'https://media.tenor.com/HexB5Iw95goAAAAC/chicago-med-natalie-manning.gif',
        'https://media.tenor.com/GhxgBClTBjIAAAAC/omori-meme.gif',
        'https://media.tenor.com/Mr0MuzJ-lgEAAAAC/anime-tv-show.gif',
        'https://media.tenor.com/_Ua7RP055bAAAAAC/tocando-got-talent-espa%C3%B1a.gif',
        'https://media.tenor.com/NPbOfsPqlWcAAAAC/playing-violin-taylor-davis.gif',
        'https://media.tenor.com/ZZmSiScPGFYAAAAC/playing-violin-rob-landes.gif',
        'https://media.tenor.com/isVzMjgb7SMAAAAC/murata-violino-gif.gif',
        'https://media.tenor.com/l-f-UPhQXnMAAAAC/lindsey-stirling-ocean.gif',
        'https://media.tenor.com/D4TFESTlcVMAAAAC/anya-anya-forger.gif',
        'https://media.tenor.com/EoSvMlR4FUkAAAAC/no-toco-got-talent-espa%C3%B1a.gif',
        'https://media.tenor.com/UBXVIY9zrb0AAAAC/lindsey-stirling-slay.gif',
        'https://media.tenor.com/Qsfi8l7W8AYAAAAC/playing-violin-taylor-davis.gif',
        'https://media.tenor.com/Y8DPkyyLuocAAAAC/playing-a-violin-eddy-chen.gif',
        'https://media0.giphy.com/media/glVlBZi7GWg6Bpcj5e/giphy.gif',
        'https://media0.giphy.com/media/l0IsGB4DkkcP4GEo0/giphy.gif',
        'https://media0.giphy.com/media/2vGkpF4z3Um1zgtKse/giphy.gif',
        'https://media.tenor.com/mhXuBtURZCkAAAAC/spongebob-squarepants-nickelodeon.gif',
        'https://media.tenor.com/XIHS154v6nIAAAAC/do-you-know-what-this-is-know-what.gif',
        'https://media.tenor.com/dszCUe9-UbQAAAAC/violin-pony.gif',
        'https://media.tenor.com/0kDgy9bQXKIAAAAC/tiny-violin-violin.gif',
        'https://media.tenor.com/sM0OwfAJTBcAAAAC/i-understand-i-know-the-meaning.gif',
        'https://media.tenor.com/y9HeYBBh84cAAAAC/poor-thing-you.gif',
        'https://media.tenor.com/myTMoCTZ1HsAAAAC/playing-violin-rob-landes.gif',
        'https://media.tenor.com/M3O99bdt7D8AAAAC/advanced-rob-landes.gif',
        'https://media.tenor.com/2vMuckOJMSgAAAAC/playing-violin-rob-landes.gif',
        'https://media.tenor.com/o9UuG0bX-rsAAAAC/sympathy-no.gif',
        'https://media.tenor.com/239vQ6vPBL8AAAAC/bluey-chilli.gif',
        'https://media.tenor.com/_x0pdQHrprsAAAAC/sebastian-sarcasm.gif',
        'https://media.tenor.com/xFtBVAmSqesAAAAC/clown-fools-world.gif',
        'https://media.tenor.com/UQixnUoopPYAAAAC/crying-jane-levy.gif',
        'https://media.tenor.com/jFbVZahwnNUAAAAC/salem-cats.gif',
        'https://media.tenor.com/ZKKYGF8C5YYAAAAC/spongebob-squarepants-mr-krabs.gif',
        'https://media.tenor.com/83QF99TeKcgAAAAC/sad-violin.gif',
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

