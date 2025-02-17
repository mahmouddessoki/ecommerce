import { Component, inject } from '@angular/core';
import { FeatureRedirectService } from '../../../../core/services/feature-redirect.service';

@Component({
  selector: 'app-wishlist',
  imports: [],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent {
  private readonly featureRedirectService = inject(FeatureRedirectService)
    ngOnInit() {
      this.featureRedirectService.verifyLogin()
    }

}
