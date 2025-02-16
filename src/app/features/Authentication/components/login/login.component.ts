import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { globalValidator } from '../../../../shared/helpers/global-validators';
import { AuthService } from '../../services/auth.service';
import { LoginUser } from '../../models/login-user';
import { Router, RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, CarouselModule,NgFor],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder)
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)
  authForm!: FormGroup;
  isLoading: boolean = false;
  @Input() accountExist!: boolean;
  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  items = [
    { image: '/imgs/auth.png' },
    { image: '/imgs/auth.png' },
    { image: '/imgs/auth.png' }
  ];

  resMsg!: string;


  ngOnInit() {
    this.authForm = this.fb.group({
      email: [null, globalValidator.emailValidate],
      password: [null, globalValidator.passwordValidate],

    })
  }
  login() {
    console.log(this.authForm);
    if (this.authForm.invalid || this.isLoading) {
      this.authForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const user = ((this.authForm.value) as unknown) as LoginUser
    this.authService.login(user).subscribe({
      next: (res) => {
        console.log(res);
        this.isLoading = false;
        this.router.navigate(['/home'])

        // localStorage.setItem('token', res.token);
      },
      error: ({ error }) => {
        // console.log(err);
        this.resMsg = error.message
        this.isLoading = false;
      }
    })

  }


  customOptions: OwlOptions = {
    loop: true, // Enable infinite looping
    autoplay: true, // Enable autoplay
    autoplayTimeout: 2000, // Time between slides (3 seconds)
    autoplaySpeed: 1000, // Smooth transition (1 second)
    autoplayHoverPause: false, // Do not stop on hover
    smartSpeed: 1000, // Smooth transition when navigating
    slideTransition: 'linear', // Make the transition continuous
    mouseDrag: true, // Allow manual dragging
    dots: false, // Hide navigation dots
    nav: false, // Hide navigation arrows
    items: 1 // Show one item at a time
  }












}
