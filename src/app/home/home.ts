import { Component, signal } from '@angular/core';
// Import the sub-sections that make up your landing page
import { HowItWorks } from '../how-it-works/how-it-works';
import { FinalCta } from '../final-cta/final-cta';
import { Chat } from '../chat/chat';

@Component({
  selector: 'app-home',
  standalone: true,
  // You must include these so Angular recognizes the tags in home.html
  imports: [
    HowItWorks, 
    FinalCta, 
    Chat
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  // Signal to handle the visibility of the Gemini AI Chat overlay
  isChatOpen = signal(false);

  /**
   * Toggles the Gemini AI Chat window open or closed
   */
  toggleChat() {
    this.isChatOpen.update(val => !val);
  }
}