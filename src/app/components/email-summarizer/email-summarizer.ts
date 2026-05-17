import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { EmailSummaryService } from '../../services/email-summary.service';

const sampleEmail = `Hi team,

I wanted to share an update after today's client call. Northstar Retail approved the revised homepage direction and wants the first clickable prototype by Friday afternoon. They were happy with the cleaner product comparison section, but asked us to simplify the pricing copy and remove the technical language from the checkout notes.

Maya will send the final brand images tomorrow morning. Ahmed will update the component copy once the images arrive. Please keep the current analytics tags in place because the marketing team needs them for the campaign report next week.

The only blocker is legal approval for the testimonial section. I will follow up with Priya today and share the answer in Slack. If legal does not approve it by Thursday noon, we should hide that section for the prototype.

Thanks,
Sarah`;

@Component({
  selector: 'app-email-summarizer',
  imports: [CommonModule, FormsModule],
  templateUrl: './email-summarizer.html',
  styleUrl: './email-summarizer.css',
})
export class EmailSummarizer {
  private readonly emailSummaryService = inject(EmailSummaryService);

  email = signal('');
  summary = signal<string[]>([]);
  error = signal('');
  isLoading = signal(false);

  useSampleEmail(): void {
    this.email.set(sampleEmail);
    this.summary.set([]);
    this.error.set('');
  }

  summarize(): void {
    const emailText = this.email().trim();

    if (!emailText) {
      this.error.set('Please paste an email or use the sample email first.');
      this.summary.set([]);
      return;
    }

    this.isLoading.set(true);
    this.error.set('');
    this.summary.set([]);

    this.emailSummaryService
      .summarize(emailText)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (response) => this.summary.set(response.summary),
        error: () => {
          this.error.set('Something went wrong while creating the summary.');
        },
      });
  }
}
