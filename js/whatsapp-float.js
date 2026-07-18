/**
 * ============================================================
 * FLOATING WHATSAPP BUTTON – Vomwe Group
 * Automatically injects a premium WhatsApp button into any page
 * ============================================================
 */

(function() {
    'use strict';

    // ----- CONFIGURATION -----
    const CONFIG = {
        phoneNumber: '254708987746',           // WhatsApp number (without +)
        defaultMessage: 'Hello Vomwe Group, I\'d like to inquire about your security services.',
        buttonSize: '60px',
        buttonColor: '#25d366',
        buttonHoverColor: '#1ebe5c',
        shadowColor: 'rgba(37, 211, 102, 0.35)',
        position: 'bottom-right',               // 'bottom-right' or 'bottom-left'
        offset: '20px',
        animationDuration: '2.5s',
        zIndex: 999,
    };

    // ----- PREVENT DUPLICATE BUTTONS -----
    if (document.querySelector('.whatsapp-float-injected')) {
        return;
    }

    // ----- CREATE BUTTON ELEMENT -----
    const button = document.createElement('a');
    button.className = 'whatsapp-float-injected';
    button.href = `https://wa.me/${CONFIG.phoneNumber}?text=${encodeURIComponent(CONFIG.defaultMessage)}`;
    button.target = '_blank';
    button.rel = 'noopener noreferrer';
    button.setAttribute('aria-label', 'Chat on WhatsApp');

    // ----- BUTTON STYLES -----
    const style = document.createElement('style');
    style.textContent = `
        /* ============================================================
           FLOATING WHATSAPP BUTTON – Injected Styles
           ============================================================ */
        .whatsapp-float-injected {
            position: fixed;
            ${CONFIG.position === 'bottom-right' ? 'right' : 'left'}: ${CONFIG.offset};
            bottom: ${CONFIG.offset};
            z-index: ${CONFIG.zIndex};
            display: flex;
            align-items: center;
            justify-content: center;
            width: ${CONFIG.buttonSize};
            height: ${CONFIG.buttonSize};
            background: ${CONFIG.buttonColor};
            border-radius: 50%;
            box-shadow: 0 6px 30px ${CONFIG.shadowColor};
            transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
            text-decoration: none;
            animation: whatsappFloatBounce ${CONFIG.animationDuration} infinite ease-in-out;
        }

        .whatsapp-float-injected:hover {
            transform: scale(1.06);
            box-shadow: 0 8px 40px rgba(37, 211, 102, 0.5);
            background: ${CONFIG.buttonHoverColor};
        }

        .whatsapp-float-injected svg {
            width: 60%;
            height: 60%;
            fill: #ffffff;
            display: block;
        }

        /* -- Bounce Animation -- */
        @keyframes whatsappFloatBounce {
            0%, 100% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-6px);
            }
        }

        /* -- Reduced Motion -- */
        @media (prefers-reduced-motion: reduce) {
            .whatsapp-float-injected {
                animation: none !important;
            }
            .whatsapp-float-injected:hover {
                transform: none !important;
            }
        }

        /* -- Mobile Adjustments -- */
        @media (max-width: 768px) {
            .whatsapp-float-injected {
                width: calc(${CONFIG.buttonSize} * 0.85);
                height: calc(${CONFIG.buttonSize} * 0.85);
                ${CONFIG.position === 'bottom-right' ? 'right' : 'left'}: calc(${CONFIG.offset} * 0.6);
                bottom: calc(${CONFIG.offset} * 0.6);
            }
        }

        @media (max-width: 480px) {
            .whatsapp-float-injected {
                width: calc(${CONFIG.buttonSize} * 0.7);
                height: calc(${CONFIG.buttonSize} * 0.7);
                ${CONFIG.position === 'bottom-right' ? 'right' : 'left'}: calc(${CONFIG.offset} * 0.4);
                bottom: calc(${CONFIG.offset} * 0.4);
            }
        }
    `;

    // ----- ADD SVG ICON -----
    button.innerHTML = `
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.032 21.965c-1.113 0-2.196-.253-3.162-.724l-.286-.146-3.124 1.024 1.067-3.044-.186-.316A9.707 9.707 0 0 1 2.275 12.63c0-5.396 4.359-9.795 9.711-9.795 5.352 0 9.711 4.399 9.711 9.795 0 5.396-4.359 9.795-9.711 9.795zm0-17.62c-4.328 0-7.851 3.539-7.851 7.884 0 1.383.36 2.739 1.045 3.93l.197.339-.683 1.947 2.007-.654.325.189a7.835 7.835 0 0 0 3.96 1.039c4.328 0 7.851-3.539 7.851-7.884 0-4.345-3.523-7.884-7.851-7.884z"/>
            <path d="M16.234 13.542c-.231-.115-1.367-.676-1.579-.753-.212-.077-.366-.115-.52.115s-.597.753-.732.908-.27.173-.501.058c-.231-.115-.974-.359-1.856-1.145-.686-.612-1.15-1.368-1.285-1.598-.135-.231-.015-.356.101-.471.104-.104.231-.269.347-.404.115-.135.154-.231.231-.384.077-.154.038-.288-.019-.404-.058-.115-.52-1.252-.713-1.714-.189-.455-.38-.37-.52-.381-.135-.012-.289-.012-.443-.012-.154 0-.404.058-.616.288-.211.231-.808.789-.808 1.925s.827 2.234.943 2.388c.115.154 1.628 2.486 3.944 3.486.551.238.982.385 1.317.493.553.17 1.057.146 1.456.089.444-.064 1.367-.558 1.559-1.096.193-.538.193-1.001.135-1.097-.058-.096-.212-.154-.443-.269z"/>
        </svg>
    `;

    // ----- INJECT STYLES AND BUTTON -----
    document.head.appendChild(style);
    document.body.appendChild(button);

})();