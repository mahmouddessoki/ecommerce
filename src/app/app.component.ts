import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
    private readonly cookie = inject(CookieService)

    ngOnInit() {
      this.cookie.set('test',"ahmed")
      console.log(this.cookie.get('test'));
    }

}
