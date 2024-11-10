import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class PaymentPageComponent {
  paymentForm: FormGroup;
  selectedCard: string = '';
  
  constructor(private fb: FormBuilder) {
    this.paymentForm = this.fb.group({
      cardNumber: [''],
      cardName: [''],
      expiryDate: [''],
      cvv: ['']
    });
  }

  onSubmit() {
    console.log('Payment submitted:', this.paymentForm.value);
    // Add payment processing logic here
  }

  // Detect card type based on first digits
  detectCardType(event: any) {
    const number = event.target.value.replace(/\s/g, '');
    if (number.startsWith('34') || number.startsWith('37')) {
      this.selectedCard = 'amex';
    } else if (number.startsWith('4')) {
      this.selectedCard = 'visa';
    } else if (number.startsWith('5')) {
      this.selectedCard = 'mastercard';
    } else {
      this.selectedCard = '';
    }
    this.formatCardNumber(event);
  }

  // Format card number with spaces
  formatCardNumber(event: any) {
    let value = event.target.value.replace(/\s/g, '');
    if (value.length > 0) {
      value = value.match(new RegExp('.{1,4}', 'g')).join(' ');
    }
    event.target.value = value;
  }
}