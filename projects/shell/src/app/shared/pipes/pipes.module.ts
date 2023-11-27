import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { FilterPipe } from './filter.pipe';
import { DatePipe } from './date.pipe';
// import { SafeHtmlPipe } from './safe-html.pipe';
// import { OrganizationPipe } from './organization.pipe';
// import { UseCaseResolvePipe } from './use-case-resolve.pipe';
// import { FeedbackTopicPipe } from './feedback-topic.pipe';

@NgModule({
  declarations: [
    // FilterPipe, 
    DatePipe,
    // SafeHtmlPipe,
    // UseCaseResolvePipe,
    // OrganizationPipe,
    // FeedbackTopicPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    // FilterPipe,
    DatePipe,
    // SafeHtmlPipe,
    // UseCaseResolvePipe,
    // OrganizationPipe
  ]
})
export class PipesModule { }
