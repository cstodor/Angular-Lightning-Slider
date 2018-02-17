import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { SliderService } from './slider.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  screenSize: number;
  imagesList: any[];
  numberOfCardsVisible = 1;
  currentSlideIndex = 0;
  currentSlideAmount = 0;
  mainSlideButtons: Array<number> = [];
  @ViewChild('mainSlidesList') private mainSlidesRef: ElementRef;
  @ViewChild('mainSlideControls') private mainControlsRef: ElementRef;

  constructor(
    private renderer: Renderer2,
    private ss: SliderService
  ) {
    this.getImages();
    // this.styleNavButtons(this.currentSlideIndex);
  }

  ngOnInit(): void { }

  getImages(): void {
    this.ss.getImages(1)
      .subscribe((res) => {
        this.imagesList = res;
        this.calculateNumOfSlides();
      });
  }

  calculateNumOfSlides(): void {
    for (let index = 0; index < this.imagesList.length; index++) {
      this.mainSlideButtons.push(index);
    }
  }

  styleNavButtons(slideIndex: number): void {
    const buttonsArray = this.mainControlsRef.nativeElement.children;
    const currentSlideNavBtn = this.mainControlsRef.nativeElement.children[slideIndex];
    for (let index = 0; index < buttonsArray.length; index++) {
      const element = buttonsArray[index];
      this.renderer.setStyle(element, 'background', '#c62828');
      if (index === slideIndex) {
        this.renderer.setStyle(currentSlideNavBtn, 'background', 'black');
      }
    }
  }

  slideToPage(slideIndex: number) {
    const slideCont = this.mainSlidesRef.nativeElement;
    const oneSlideAmount = 100;
    if (slideIndex === 0) {
      // Slide Right
      this.renderer.setAttribute(slideCont, 'style', 'left: 0%');
      this.currentSlideAmount = 0;
      this.currentSlideIndex = slideIndex;
      this.styleNavButtons(slideIndex);
    } else if (this.currentSlideIndex > slideIndex) {
      const slideIndexDiff = this.currentSlideIndex - slideIndex;
      this.renderer.setAttribute(slideCont, 'style', 'left:' + (this.currentSlideAmount + (oneSlideAmount * slideIndexDiff)) + '%');
      this.currentSlideAmount = (this.currentSlideAmount + (oneSlideAmount * slideIndexDiff));
      this.currentSlideIndex = slideIndex;
      this.styleNavButtons(slideIndex);
    } else if (this.currentSlideIndex < slideIndex) {
      // Slide Left
      const slideIndexDiff = slideIndex - this.currentSlideIndex;
      this.renderer.setAttribute(slideCont, 'style', 'left:' + (this.currentSlideAmount - (oneSlideAmount * slideIndexDiff)) + '%');
      this.currentSlideAmount = (this.currentSlideAmount - (oneSlideAmount * slideIndexDiff));
      this.currentSlideIndex = slideIndex;
      this.styleNavButtons(slideIndex);
    }
  }

}
