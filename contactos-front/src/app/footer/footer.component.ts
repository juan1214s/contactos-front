import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

public instagram(){
  window.open('https://www.instagram.com/manuels128069/')
  }

public facebook(){
  window.open('https://www.facebook.com/profile.php?id=100004214712749')
}

public linken(){
  window.open('https://www.linkedin.com/in/juan-manuel-sanchez-9b2414216/')
}


}
