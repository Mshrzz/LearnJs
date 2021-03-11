'use strict';

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import smoothScrolling from './modules/smoothScrolling';
import tabs from './modules/tabs';
import slider from './modules/slider';
import regExps from './modules/regExps';
import calculator from './modules/calculator';
import ourTeamChangePhoto from './modules/ourTeamChangePhoto';
import sendForm from './modules/sendForm';
    
// Timer
countTimer('19 mar 2021 20:00:00');
// Menu    
toggleMenu();
// Popup
togglePopUp();
// Scroll
smoothScrolling();
//  Tabs
tabs();
// Slider
slider();
// regular expressions
regExps();
// Calculator
calculator(100);
// Our team block
ourTeamChangePhoto();
// send-AJAX-form
sendForm();