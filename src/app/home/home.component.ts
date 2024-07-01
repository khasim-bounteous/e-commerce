import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  items = [
    {
      imageURL: 'https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2018/12/women-fashion-free-img.jpg',
      title: '20% Off On Tank Tops',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac dictum.'
    },
    {
      imageURL: 'https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2018/12/men-fashion-free-img.jpg',
      title: 'Latest Eyewear For You',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac dictum.'
    },
    {
      imageURL: 'https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2018/12/footwear-free-img.jpg',
      title: 'Lets Lorem Suit Up!',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac dictum.'
    }
  ];
}
