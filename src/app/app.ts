import { Component } from '@angular/core';
import { EmailSummarizer } from './components/email-summarizer/email-summarizer';

@Component({
  selector: 'app-root',
  imports: [EmailSummarizer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
